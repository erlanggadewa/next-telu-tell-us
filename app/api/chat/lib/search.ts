import { SearchClient } from '@azure/search-documents'
import { appConfig } from '../../../config'
import { parseBoolean, removeNewlines } from '../util/string'
import { AzureService } from './azure-service'
import { OpenAiService } from './openai-service'
import { ApproachContext } from './types'
export interface SearchDocumentsResult {
  query: string
  results: string[]
  content: string
}

export class SearchCognitiveService {
  search: SearchClient<any>
  openai: OpenAiService
  embeddingModel: string
  sourcePageField: string
  contentField: string

  constructor() {
    this.search = new AzureService().search
    this.openai = new OpenAiService()
    this.embeddingModel = appConfig.azureOpenAiEmbeddingModel
    this.sourcePageField = appConfig.kbFieldsSourcePage
    this.contentField = appConfig.kbFieldsContent
  }

  async searchDocuments(
    query?: string,
    context: ApproachContext = {}
  ): Promise<SearchDocumentsResult> {
    const hasText = ['text', 'hybrid', undefined].includes(
      context?.retrieval_mode
    )
    const hasVectors = ['vectors', 'hybrid', undefined].includes(
      context?.retrieval_mode
    )
    const useSemanticCaption =
      parseBoolean(context?.semantic_captions) && hasText
    const top = context?.top ? Number(context?.top) : 3
    const excludeCategory: string | undefined = context?.exclude_category
    const filter = excludeCategory
      ? `category ne '${excludeCategory.replace("'", "''")}'`
      : undefined

    // If retrieval mode includes vectors, compute an embedding for the query
    let queryVector
    if (hasVectors) {
      const openAiEmbeddings = this.openai.getEmbeddings()

      const result = await openAiEmbeddings.create({
        model: this.embeddingModel,
        input: query!
      })
      queryVector = result.data[0].embedding
    }

    // Only keep the text query if the retrieval mode uses text, otherwise drop it
    const queryText = hasText ? query : ''

    // Use semantic L2 reranker if requested and if retrieval mode is text or hybrid (vectors + text)
    const searchResults = await this.search.search(queryText, {
      filter,
      queryType: 'full',
      top
    })

    const results: string[] = []
    if (useSemanticCaption) {
      for await (const result of searchResults.results) {
        // TODO: ensure typings
        const document = result as any
        const captions = document['@search.captions']
        const captionsText = captions?.map((c: any) => c.text).join(' . ')
        results.push(
          `${document[this.sourcePageField]}: ${removeNewlines(captionsText)}`
        )
      }
    } else {
      for await (const result of searchResults.results) {
        // TODO: ensure typings
        const document = result.document as any
        results.push(
          `${document[this.sourcePageField]}: ${removeNewlines(
            document[this.contentField]
          )}`
        )
      }
    }
    const content = results.join('\n')
    return {
      query: queryText ?? '',
      results,
      content
    }
  }
}
