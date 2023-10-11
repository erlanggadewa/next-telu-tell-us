import {kv} from '@vercel/kv'
import {OpenAIStream, StreamingTextResponse} from 'ai'

import {auth} from '@/auth'
import {nanoid} from '@/lib/utils'
import {OpenAIClient, AzureKeyCredential} from '@azure/openai'
import {ChatCompletionCreateParamsBase} from 'openai/resources/chat/completions'
import {setLogLevel} from "@azure/logger";

export const runtime = 'edge'

const openAIResource = process.env.AZURE_OPENAI_RESOURCE_NAME
const deployName = process.env.AZURE_OPENAI_DEPLOY_NAME || ""
const modelName = process.env
    .AZURE_OPENAI_MODEL_NAME as ChatCompletionCreateParamsBase['model']
const cognitifResource = process.env.AZURE_COGNITIF_RESOURCE_NAME
const cognitifIndex = process.env.AZURE_COGNITIF_INDEX

const openAIApiKey = process.env.AZURE_OPENAI_API_KEY
if (!openAIApiKey) {
    throw new Error('AZURE_OPENAI_API_KEY is missing from the environment.')
}
const cognitifApiKey = process.env.AZURE_COGNITIF_API_KEY
if (!cognitifApiKey) {
    throw new Error('AZURE_OPENAI_API_KEY is missing from the environment.')
}

setLogLevel("info");

const openai = new OpenAIClient(`https://${openAIResource}.openai.azure.com/`, new AzureKeyCredential(openAIApiKey));

export async function POST(req: Request) {
    const json = await req.json()
    const {messages, previewToken} = json
    const userId = (await auth())?.user.id

    if (!userId) {
        return new Response('Unauthorized', {
            status: 401
        })
    }

    const res = openai.listChatCompletions(deployName, messages, {
        model: modelName,
        temperature: 0.7,
        stream: true,
        maxTokens: 128,
        azureExtensionOptions: {
            extensions: [{
                type: "AzureCognitiveSearch",
                parameters: {
                    endpoint: `https://${cognitifResource}.search.windows.net`,
                    key: cognitifApiKey,
                    indexName: cognitifIndex,
                }
            }]
        }
    })
    // @ts-ignore
    const stream = OpenAIStream(res, {
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
