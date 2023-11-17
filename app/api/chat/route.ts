import {appConfig} from '@/config'
import {
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData
} from 'ai'
import axios from 'axios'
import {ChatCompletionMessageParam} from 'openai/resources'
import {OpenAiService} from '@/lib/openai-service'
import {NextRequest} from "next/server";
import {auth} from "@/auth";

const api = `${appConfig.apiUrl}/chat`

export type CitationSource = {
    citationSource: {
        citationId: string
    }[]
}

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

export async function POST(req: NextRequest) {
    const json = await req.json()
    const {messages} = json
    const userId = (await auth())?.user.id

    if (!userId) {
        return new Response('Unauthorized', {
            status: 401
        })
    }

    const data: ChatResponse = (await axios.post(api, {messages})).data
    const {bodyGenerateMsg, dataPoints, citationSource} = data

    const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
        bodyGenerateMsg
    )

    const appendData = new experimental_StreamData()
    appendData.append({dataPoints, citationSource})

    const stream = OpenAIStream(finalMsg as any, {
        experimental_streamData: true,
        onFinal: () => appendData.close()
    })

    return new StreamingTextResponse(stream, {}, appendData)
}
