import {auth} from '@/auth'
import {appConfig} from '@/config'
import {
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData
} from 'ai'
import axios from 'axios'
import {ChatCompletionMessageParam} from 'openai/resources'
import {OpenAiService} from '@/lib/openai-service'

const api = `${appConfig.apiUrl}/chat/citation`

interface ChatResponse {
    dataPoints: string[]
    citationIds: string[]
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
    const {messages, citationId} = json
    const userId = (await auth())?.user.id

    if (!userId) {
        return new Response('Unauthorized', {
            status: 401
        })
    }

    const context = {
        suggest_followup_questions: false,
        semantic_ranker: true,
        temperature: 0.7,
        retrieval_mode: "hybrid",
        semantic_captions: false,
        prompt_template: null,
        prompt_template_prefix: null,
        prompt_template_suffix: null
    }
    const data: ChatResponse = (await axios.post(api, {citationId, context, messages})).data
    const {bodyGenerateMsg, dataPoints, citationIds} = data

    const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
        bodyGenerateMsg
    )

    const stream = OpenAIStream(finalMsg as any, {
        onFinal(completion) {
        },
        onCompletion: completion => {
        }
    })

    return new StreamingTextResponse(stream)
}
