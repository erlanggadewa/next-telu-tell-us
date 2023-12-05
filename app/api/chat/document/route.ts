import { CitationSource } from '@/app/api/chat/route'
import { appConfig } from '@/config'
import { OpenAiService } from '@/lib/openai-service'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/resources'

const api = `${appConfig.apiUrl}/chat/citation`

interface ChatResponse {
  dataPoints: string[]
  citationSource: CitationSource[]
  bodyGenerateMsg: {
    model: string
    messages: ChatCompletionMessageParam[]
    temperature: number
    n: number
    stream: boolean
  }
}

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, citationId } = json

  const data: ChatResponse = (
    await axios.post(api, {
      messages,
      citationId,
      context: { suggest_followup_questions: false }
    })
  ).data
  const { bodyGenerateMsg } = data

  const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
    bodyGenerateMsg
  )

  const stream = OpenAIStream(finalMsg as any)

  return new StreamingTextResponse(stream)
}
