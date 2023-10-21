import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { appConfig } from '../../config'
import { OpenAiService } from './openai-service'
import { SearchCognitiveService } from './search'
import { ChatApproachContext, HistoryMessage, Message } from './types'

const SYSTEM_MESSAGE_CHAT_CONVERSATION = `Assistant helps the Consto Real Estate company customers with support questions regarding terms of service, privacy policy, and questions about support requests. Be brief in your answers.
Answer ONLY with the facts listed in the list of sources below. If there isn't enough information below, say you don't know. Do not generate answers that don't use the sources below. If asking a clarifying question to the user would help, ask the question.
For tabular information return it as an html table. Do not return markdown format. If the question is not in English, answer in the language used in the question.
Each source has a name followed by colon and the actual information, always include the source name for each fact you use in the response. Use square brackets to reference the source, e.g. [info1.txt]. Don't combine sources, list each source separately, e.g. [info1.txt][info2.pdf].
{follow_up_questions_prompt}
{injected_prompt}
`

const FOLLOW_UP_QUESTIONS_PROMPT_CONTENT = `Generate three very brief follow-up questions that the user would likely ask next about rentals.
Use double angle brackets to reference the questions, e.g. <<Am I allowed to invite friends for a party?>>.
Try not to repeat questions that have already been asked.
Only generate questions and do not generate any text before or after the questions, such as 'Next Questions'`

const QUERY_PROMPT_TEMPLATE = `Below is a history of the conversation so far, and a new question asked by the user that needs to be answered by searching in a knowledge base about terms of service, privacy policy, and questions about support requests.
Generate a search query based on the conversation and the new question.
Do not include cited source filenames and document names e.g info.txt or doc.pdf in the search query terms.
Do not include any text inside [] or <<>> in the search query terms.
Do not include any special characters like '+'.
If the question is not in English, translate the question to English before generating the search query.
If you cannot generate a search query, return just the number 0.
`

const QUERY_PROMPT_FEW_SHOTS: Message[] = [
  { role: 'user', content: 'What happens if a payment error occurs?' },
  { role: 'assistant', content: 'Show support for payment errors' },
  { role: 'user', content: 'can I get refunded if cannot travel?' },
  { role: 'assistant', content: 'Refund policy' }
]

export class ChatApproach {
  openAiChat: OpenAI.Chat
  searchService: SearchCognitiveService
  constructor() {
    this.openAiChat = new OpenAiService().getChat()
    this.searchService = new SearchCognitiveService()
  }
  async baseRun(history: HistoryMessage[], context: ChatApproachContext = {}) {
    const userQuery =
      'Generate search query for: ' + history[history.length - 1].content

    // STEP 1: Generate an optimized keyword search query based on the chat history and the last question
    // -----------------------------------------------------------------------
    const messages = this.getMessageHistory(
      history.splice(0, history.length - 1),
      userQuery
    )

    // translate query to english with match context
    const chatCompletion = await this.openAiChat.completions.create({
      model: appConfig.azureOpenAiChatGptModel,
      messages,
      temperature: 0,
      max_tokens: 32,
      n: 1
    })

    let queryText = chatCompletion.choices[0].message.content?.trim()
    if (queryText === '0') {
      // Use the last user input if we failed to generate a better query
      queryText = history[history.length - 1].content
    }

    // STEP 2: Retrieve relevant documents from the search index with the GPT optimized query
    // -----------------------------------------------------------------------

    const { query, results, content } =
      await this.searchService.searchDocuments(queryText)

    context.suggest_followup_questions = true

    const followUpQuestionsPrompt = context?.suggest_followup_questions
      ? FOLLOW_UP_QUESTIONS_PROMPT_CONTENT
      : ''

    // STEP 3: Generate a contextual and content specific answer using the search results and chat history
    // -----------------------------------------------------------------------
    // Allow client to replace the entire prompt, or to inject into the exiting prompt using >>>
    const promptOverride = context?.prompt_template
    let systemMessage: string
    if (promptOverride?.startsWith('>>>')) {
      systemMessage = SYSTEM_MESSAGE_CHAT_CONVERSATION.replace(
        '{follow_up_questions_prompt}',
        followUpQuestionsPrompt
      ).replace('{injected_prompt}', promptOverride.slice(3) + '\n')
    } else if (promptOverride) {
      systemMessage = SYSTEM_MESSAGE_CHAT_CONVERSATION.replace(
        '{follow_up_questions_prompt}',
        followUpQuestionsPrompt
      ).replace('{injected_prompt}', promptOverride)
    } else {
      systemMessage = SYSTEM_MESSAGE_CHAT_CONVERSATION.replace(
        '{follow_up_questions_prompt}',
        followUpQuestionsPrompt
      ).replace('{injected_prompt}', '')
    }

    const msgForGenerateAnswer = this.getMessageHistoryGenerateAnswer(
      systemMessage,
      history,
      query,
      content
    )
    console.log(
      '🚀 ~ file: chat-read-retrieve-read.ts:110 ~ ChatApproach ~ baseRun ~ msgForGenerateAnswer:',
      msgForGenerateAnswer
    )

    const finalMsg = await this.openAiChat.completions.create({
      model: appConfig.azureOpenAiChatGptModel,
      messages: msgForGenerateAnswer,
      temperature: Number(context?.temperature ?? 0.7),
      n: 1,
      stream: true
    })
    return finalMsg
  }

  protected getMessageHistory(
    history: HistoryMessage[],
    userQuery: string
  ): ChatCompletionMessageParam[] {
    const msgHistory: ChatCompletionMessageParam[] = [
      { role: 'system', content: QUERY_PROMPT_TEMPLATE },
      ...QUERY_PROMPT_FEW_SHOTS,
      ...history,
      { role: 'user', content: userQuery }
    ]

    return msgHistory
  }
  protected getMessageHistoryGenerateAnswer(
    systemMessage: string,
    history: HistoryMessage[],
    query: string,
    content: string
  ): ChatCompletionMessageParam[] {
    const msgHistory: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemMessage },
      ...QUERY_PROMPT_FEW_SHOTS,
      ...history,
      { role: 'user', content: `${query}\n\nSources:\n${content}}` }
    ]

    return msgHistory
  }
}
