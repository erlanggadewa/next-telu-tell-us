import {auth} from '@/auth'
import {appConfig} from '@/config'
import {
    OpenAIStream,
    StreamingTextResponse,
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

    const data: ChatResponse = (await axios.post(api, {messages, citationId})).data
    const {bodyGenerateMsg} = data

    const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
        bodyGenerateMsg
    )

    const stream = OpenAIStream(finalMsg as any)

    return new StreamingTextResponse(stream)
}