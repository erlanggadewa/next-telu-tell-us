import { auth } from '@/auth'
import { setLogLevel } from '@azure/logger'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { appConfig } from '../config'
import { ChatApproach } from './lib/chat-read-retrieve-read'

export const runtime = 'edge'

setLogLevel('warning')

const openai = new OpenAIClient(
  `https://${appConfig.azureOpenAiService}.openai.azure.com/`,
  new AzureKeyCredential(appConfig.azureOpenAiKey)
)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, approach, previewToken, cognitif } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const chatApproach = new ChatApproach()
  const finalMsg = await chatApproach.baseRun(messages, approach)

  // @ts-ignore
  const stream = OpenAIStream(finalMsg, {
    async onCompletion(completion) {
      //   const title = json.messages[0].content.substring(0, 100)
      //   const id = json.id ?? nanoid()
      //   const createdAt = Date.now()
      //   const path = `/chat/${id}`
      //   const payload = {
      //     id,
      //     title,
      //     userId,
      //     createdAt,
      //     path,
      //     messages: [
      //       ...messages,
      //       {
      //         content: completion,
      //         role: 'assistant'
      //       }
      //     ]
      //   }
      //   await kv.hmset(`chat:${id}`, payload)
      //   await kv.zadd(`user:chat:${userId}`, {
      //     score: createdAt,
      //     member: `chat:${id}`
      //   })
    }
  })

  return new StreamingTextResponse(stream)
}
