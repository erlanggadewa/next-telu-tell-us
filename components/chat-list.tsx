import { ChatMessage } from '@/components/chat-message'
import { type Message } from 'ai'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative max-w-3xl px-4 mx-auto xl:max-w-4xl">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  )
}
