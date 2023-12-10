'use client'

import { useChat, type Message } from 'ai/react'

import { CitationSource } from '@/app/api/chat/route'
import { ChatMessage } from '@/components/chat-message'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { Separator } from '@/components/ui/separator'
import { WelcomeComponent } from '@/components/welcome'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { toast } from 'react-hot-toast'
import WelcomeModalChat from './modal-welcome-chat'

export interface ChatProps extends ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  api?: string
}

const exampleMessages = [
  {
    heading: 'Apa itu Igracias?',
    message: `Apa itu Igracias?`
  },
  {
    heading: 'Apa itu microservice?',
    message: 'Apa itu microservice?'
  },
  {
    heading: 'Kelebihan microservice?',
    message: `Kelebihan microservice?`
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
      <WelcomeModalChat
        title={'Tell-Us Chat'}
        description={
          'Fitur obrolan dengan robot Tell-Us memungkinkan pengguna untuk mengajukan pertanyaan dan menerima jawaban dari sumber dataset yang tersedia di OpenLibrary Telkom University. Tak hanya memberikan jawaban, tapi juga menyertakan kutipan atau referensi dalam responsnya. Selain itu, chatbot ini mampu memberikan rekomendasi pertanyaan terkait berdasarkan topik yang sedang dibahas.'
        }
      />
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
                'Selamat datang di **Tell-US Search!** Saya siap membantu menjawab pertanyaan dengan pengetahuan yang saya peroleh dari Open Library Telkom University. Apa yang ingin kamu tanyakan hari ini?',
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
                    isLoading={isLoading && messages?.length - 1 === index}
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
