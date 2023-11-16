import { auth } from '@/auth'
import { appConfig } from '@/config'
import { OpenAiService } from '@/lib/openai-service'
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData
} from 'ai'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/resources'

const api = `${appConfig.apiUrl}/chat`

interface ChatResponse {
  dataPoints: string[]
  citationSource: {
    citationId: string
    sourcePage: string
    sourceFile: string
  }[]
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
  const { messages } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const data: ChatResponse = (await axios.post(api, { messages })).data
  const { bodyGenerateMsg, dataPoints, citationSource } = data

  const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
    bodyGenerateMsg
  )

  const appendData = new experimental_StreamData()
  appendData.append({ dataPoints, citationSource })

  const stream = OpenAIStream(finalMsg as any, {
    experimental_streamData: true,
    onFinal: () => appendData.close()
  })

  return new StreamingTextResponse(stream, {}, appendData)
}
