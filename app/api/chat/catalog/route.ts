import {appConfig} from '@/config'
import {OpenAiService} from '@/lib/openai-service'
import {
    OpenAIStream,
    StreamingTextResponse,
} from 'ai'
import axios from 'axios'
import {NextRequest} from 'next/server'
import {ChatCompletionCreateParamsNonStreaming} from "openai/src/resources/chat/completions";

export async function POST(req: NextRequest) {
    const json = await req.json()
    const {messages, id} = json

    const data: ChatCompletionCreateParamsNonStreaming = (await axios.post<ChatCompletionCreateParamsNonStreaming>(`${appConfig.apiUrl}/chat/catalog`, {
        id,
        messages,
        context: {
            context: {
                semantic_ranker: false,
                semantic_captions: false,
                stream: false,
                top: 5,
            },
        }
    })).data

    const finalMsg = await new OpenAiService().chatClient.chat.completions.create(data)

    const stream = OpenAIStream(finalMsg as any)

    return new StreamingTextResponse(stream)
}
