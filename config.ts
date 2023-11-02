export interface AppConfig {
    appName: string,
    azureOpenAiService: string
    azureOpenAiChatGptDeployment: string
    azureOpenAiKey: string
    azureOpenAiApiVersion: string
    apiUrl: string
}

export const appConfig: AppConfig = {
    azureOpenAiService: process.env.AZURE_OPENAI_SERVICE || '',
    azureOpenAiChatGptDeployment:
        process.env.AZURE_OPENAI_CHATGPT_DEPLOYMENT || '',
    azureOpenAiKey: process.env.AZURE_OPENAI_API_KEY || '',
    azureOpenAiApiVersion: process.env.AZURE_OPENAI_API_VERSION || '2023-05-15',
    appName: process.env.NEXT_PUBLIC_APP_NAME || '',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
}
