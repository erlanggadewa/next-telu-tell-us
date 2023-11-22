import { auth } from '@/auth'
import { appConfig } from '@/config'
import axios from 'axios'
import { NextApiRequest } from 'next'
import { ChatCompletionMessageParam } from 'openai/resources'

const api = `${appConfig.apiUrl}/cognitive-search/summary`

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

export async function GET(req: NextApiRequest) {
  const { citationId } = req.query
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const data: ChatResponse = (await axios.get(api + '/' + citationId)).data
  return data
}
