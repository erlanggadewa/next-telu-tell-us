import { auth } from '@/auth'
import {nanoid, OpenAIStream, StreamingTextResponse} from 'ai'
import { ChatApproach } from './lib/chat-read-retrieve-read'
import {kv} from "@vercel/kv";

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const chatApproach = new ChatApproach()
  const finalMsg = await chatApproach.baseRun(messages, {
    suggest_followup_questions: true,
    retrieval_mode: 'text'
  })

  const stream = OpenAIStream(finalMsg, {
    async onCompletion(completion) {
    //     const title = json.messages[0].content.substring(0, 100)
    //     const id = json.id ?? nanoid()
    //     const createdAt = Date.now()
    //     const path = `/chat/${id}`
    //     const payload = {
    //       id,
    //       title,
    //       userId,
    //       createdAt,
    //       path,
    //       messages: [
    //         ...messages,
    //         {
    //           content: completion,
    //           role: 'assistant'
    //         }
    //       ]
    //     }
    //     await kv.hmset(`chat:${id}`, payload)
    //     await kv.zadd(`user:chat:${userId}`, {
    //       score: createdAt,
    //       member: `chat:${id}`
    //     })
    }
  })

  return new StreamingTextResponse(stream)
}
