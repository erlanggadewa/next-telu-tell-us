import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import OpenAI from 'openai'
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions'

export const runtime = 'edge'

const resource = process.env.AZURE_RESOURCE_GROUP
const modelType = process.env.AZURE_MODEL_TYPE
const modelName = process.env
  .AZURE_MODEL_NAME as ChatCompletionCreateParamsBase['model']

const apiKey = process.env.AZURE_OPENAI_API_KEY
if (!apiKey) {
  throw new Error('AZURE_OPENAI_API_KEY is missing from the environment.')
}

const openai = new OpenAI({
  apiKey,
  baseURL: `https://${resource}.openai.azure.com/openai/deployments/${modelType}`,
  defaultQuery: { 'api-version': '2023-06-01-preview' },
  defaultHeaders: { 'api-key': apiKey }
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const res = await openai.chat.completions.create({
    model: modelName,
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res['response'], {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
