export interface AppConfig {
  appName: string,
  azureStorageAccount: string
  azureStorageContainer: string
  azureSearchService: string
  azureSearchIndex: string
  azureOpenAiService: string
  azureOpenAiChatGptDeployment: string
  azureOpenAiChatGptModel: string
  azureOpenAiEmbeddingDeployment: string
  azureOpenAiEmbeddingModel: string
  kbFieldsContent: string
  kbFieldsSourcePage: string
  allowedOrigins: string
  azureOpenAiKey: string
  azureCognitiveKey: string
  azureOpenAiApiVersion: string
}

export const appConfig: AppConfig = {
  azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT || '',
  azureStorageContainer: process.env.AZURE_STORAGE_CONTAINER || '',
  azureSearchService: process.env.AZURE_SEARCH_SERVICE || '',
  azureSearchIndex: process.env.AZURE_SEARCH_INDEX || '',
  azureOpenAiService: process.env.AZURE_OPENAI_SERVICE || '',
  azureOpenAiChatGptDeployment:
    process.env.AZURE_OPENAI_CHATGPT_DEPLOYMENT || '',
  azureOpenAiChatGptModel:
    process.env.AZURE_OPENAI_CHATGPT_MODEL || 'gpt-35-turbo',
  azureOpenAiEmbeddingDeployment:
    process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT || '',
  azureOpenAiEmbeddingModel:
    process.env.AZURE_OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
  kbFieldsContent: process.env.KB_FIELDS_CONTENT || 'content',
  kbFieldsSourcePage: process.env.KB_FIELDS_SOURCEPAGE || 'sourcepage',
  allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
  azureOpenAiKey: process.env.AZURE_OPENAI_API_KEY || '',
  azureCognitiveKey: process.env.AZURE_COGNITIF_API_KEY || '',
  azureOpenAiApiVersion: process.env.AZURE_OPENAI_API_VERSION || '2023-05-15',
  appName: process.env.NEXT_PUBLIC_APP_NAME || ''
}
