import { auth } from '@/auth'
import { appConfig } from '@/config'
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData
} from 'ai'
import axios from 'axios'
import { ChatCompletionMessageParam } from 'openai/resources'
import { OpenAiService } from './lib/openai-service'

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

  // Instantiate the StreamData. It works with all API providers.
  const appendData = new experimental_StreamData()
  appendData.append({ dataPoints, citationIds })

  // @ts-ignore
  const stream = OpenAIStream(finalMsg, {
    // IMPORTANT! until this is stable, you must explicitly opt in to supporting streamData.
    experimental_streamData: true,
    onFinal(completion) {
      // IMPORTANT! you must close StreamData manually or the response will never finish.
      appendData.close()
    },
    onCompletion: completion => {}
  })

  return new StreamingTextResponse(stream, {}, appendData)
}
