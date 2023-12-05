'use client'

import { useChat, type Message } from 'ai/react'

import { CitationSource } from '@/app/api/chat/route'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { Separator } from '@/components/ui/separator'
import { WelcomeComponent } from '@/components/welcome'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { toast } from 'react-hot-toast'
import { ChatMessage } from './chat-message'

export interface ChatProps extends ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  api?: string
}

const exampleMessages = [
  {
    heading: 'Berikan 3 contoh tugas akhir bertema teknologi',
    message: `Berikan 3 contoh tugas akhir bertema teknologi`
  },
  {
    heading: 'Artikel mengenai web programming',
    message: 'Artikel mengenai web programming'
  },
  {
    heading: 'Rekomendasi tugas akhir tentang e-commerce',
    message: `Rekomendasi tugas akhir tentang e-commerce`
  }
]

type Citation = {
  dataPoints: string[]
  citationSource: CitationSource[]
}

export function Chat({ id, initialMessages, className, api }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput, data } =
    useChat({
      initialMessages,
      id,
      api,
      body: { id },
      onResponse: response => {
        if (response.status !== 200) toast.error(response.statusText)
      },
      onError: error => toast.error(error.message)
    })
  const citation: Citation[] = (data as Citation[]) || []
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        <div className="max-w-3xl px-4 mx-auto xl:max-w-4xl">
          <WelcomeComponent
            setInput={setInput}
            exampleMessages={exampleMessages}
          />
          <Separator className="my-4 md:my-4" />
          <ChatMessage
            disableAction
            message={{
              role: 'system',
              content:
                'Selamat datang di **Tell-US Search!** Saya akan membantu kamu menjawab pertanyaan apa pun yang kamu tanyakan. Apa yang ingin kamu tanyakan hari ini?',
              id: '1'
            }}
            setInput={setInput}
          />
        </div>
        {messages.length ? (
          <>
            <div className="relative max-w-3xl px-4 mx-auto xl:max-w-4xl">
              {messages.map((message, index) => (
                <div key={index}>
                  <ChatMessage
                    key={message.id}
                    setInput={setInput}
                    message={message}
                    citationSources={
                      message.role === 'assistant'
                        ? citation?.[Math.floor(index / 2)]?.citationSource
                        : []
                    }
                    isLoading={
                      (isLoading && messages.length - 1 === index) ||
                      index === 0
                    }
                  />
                </div>
              ))}
            </div>
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          ''
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
