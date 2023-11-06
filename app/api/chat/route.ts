import { auth } from '@/auth'
import { appConfig } from '@/config'
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData
} from 'ai'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/resources'
import { OpenAiService } from '@/lib/openai-service'

const api = `${appConfig.apiUrl}/chat`

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
  const { messages } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const data: ChatResponse = (await axios.post(api, { messages })).data
  const { bodyGenerateMsg, dataPoints, citationIds } = data

  const finalMsg = await new OpenAiService().chatClient.chat.completions.create(
    bodyGenerateMsg
  )

  const appendData = new experimental_StreamData()
  appendData.append(dataPoints)
  appendData.append(citationIds)

  const stream = OpenAIStream(finalMsg as any, {
    experimental_streamData: true,
    onFinal(completion) {
      appendData.close()
    },
    onCompletion: completion => {}
  })

  return new StreamingTextResponse(stream, {}, appendData)
}
