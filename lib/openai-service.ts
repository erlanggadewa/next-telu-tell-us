import OpenAI from 'openai'
import { appConfig } from '@/config'

export class OpenAiService {
  chatClient: OpenAI

  constructor() {
    const openAiUrl = `https://${appConfig.azureOpenAiService}.openai.azure.com/`
    const commonOptions = {
      apiKey: appConfig.azureOpenAiKey,
      defaultQuery: { 'api-version': appConfig.azureOpenAiApiVersion },
      defaultHeaders: { 'api-key': appConfig.azureOpenAiKey }
    }

    this.chatClient = new OpenAI({
      ...commonOptions,
      baseURL: `${openAiUrl}/openai/deployments/${appConfig.azureOpenAiChatGptDeployment}`
    })
  }
}
