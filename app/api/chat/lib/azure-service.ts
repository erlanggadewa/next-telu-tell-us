import { AzureKeyCredential, SearchClient } from '@azure/search-documents'
import { appConfig } from '../../../config'

export class AzureService {
  search: SearchClient<any>
  constructor() {
    // Use the current user identity to authenticate with Azure OpenAI, Cognitive Search and Blob Storage
    // (no secrets needed, just use 'az login' locally, and managed identity when deployed on Azure).
    // If you need to use keys, use separate AzureKeyCredential instances with the keys for each service
    const credential = new AzureKeyCredential(appConfig.azureCognitiveKey)

    // Set up Azure clients
    this.search = new SearchClient<any>(
      `https://${appConfig.azureSearchService}.search.windows.net`,
      appConfig.azureSearchIndex,
      credential
    )
  }
}
