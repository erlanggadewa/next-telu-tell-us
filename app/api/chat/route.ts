import { appConfig } from '@/config'
import { OpenAiService } from '@/lib/openai-service'
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData
} from 'ai'
import axios from 'axios'
import { NextRequest } from 'next/server'
import { ChatCompletionMessageParam } from 'openai/resources'

export type CitationSource = {
  citationId: string
  sourcePage: string
  sourceFile: string
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
  const { messages, id } = json

  const data: ChatResponse = (
    await axios.post(`${appConfig.apiUrl}/chat`, {
      id,
      messages,
      context: {
        retrieval_mode: 'hybrid',
        semantic_ranker: true,
        semantic_captions: false,
        top: 5,
        stream: true,
        suggest_followup_questions: true
      }
    })
  ).data
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
