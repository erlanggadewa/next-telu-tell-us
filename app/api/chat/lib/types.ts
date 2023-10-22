import OpenAI from 'openai'

export type MessageRole = 'system' | 'user' | 'assistant' | 'function'

export interface Message {
  role: MessageRole
  content: string
}

export interface HistoryMessage {
  role: MessageRole
  content: string
}

export type ApproachContext = {
  retrieval_mode?: 'hybrid' | 'text' | 'vectors'
  semantic_ranker?: boolean
  semantic_captions?: boolean
  top?: number
  temperature?: number
  prompt_template?: string
  prompt_template_prefix?: string
  prompt_template_suffix?: string
  exclude_category?: string
}

export type OpenAiService = {
  openai: OpenAI
}

export type ChatApproachContext = {
  suggest_followup_questions?: boolean
  semantic_ranker?: boolean
  top?: number
  temperature?: number
  exclude_category?: string
  retrieval_mode?: 'hybrid' | 'text' | 'vectors'
  semantic_captions?: boolean
  prompt_template?: string
  prompt_template_prefix?: string
  prompt_template_suffix?: string
}
