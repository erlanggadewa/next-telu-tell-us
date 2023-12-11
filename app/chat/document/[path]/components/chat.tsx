'use client'

import { useChat, type Message } from 'ai/react'

import { ChatMessage } from '@/app/chat/components/chat-message'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import FetchingChatComponent from '@/components/fetching-chat'
import WelcomeModalChat from '@/components/modal-welcome-chat'
import { Separator } from '@/components/ui/separator'
import { WelcomeComponent } from '@/components/welcome'
import { cn } from '@/lib/utils'
import { ComponentProps, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ChatPanel } from './chat-panel'

export interface ChatProps extends ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  citationId?: string[]
}

const exampleMessages = [
  {
    heading: 'Berikan saya ringkasan dari dokumen ini',
    message: `Berikan saya ringkasan dari dokumen ini`
  },
  {
    heading: 'Apa latar belakang dokumen ini?',
    message: 'Apa latar belakang dokumen ini?'
  },
  {
    heading: 'Jelaskan pendahuluan dokumen ini',
    message: `Jelaskan pendahuluan dokumen ini`
  }
]

export function Chat({
  id,
  initialMessages,
  citationId,
  className
}: ChatProps) {
  const [isFetching, setIsFetching] = useState(false)

  const { messages, append, reload, stop, isLoading, input, setInput, data } =
    useChat({
      initialMessages,
      id,
      api: '/api/chat/document',
      body: { id, citationId },
      onResponse: response => {
        setIsFetching(false)
        if (response.status !== 200) toast.error(response.statusText)
      },
      onError: error => {
        setIsFetching(false)
        toast.error(error.message)
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        <div className="max-w-3xl px-4 mx-auto">
          <WelcomeModalChat
            title={'Tell-Us Chat Document'}
            description={
              'Fitur obrolan dengan robot Tell-Us memungkinkan anda untuk mengajukan pertanyaan dan menerima jawaban berdasarkan sumber dokumen yang telah anda pilih sebelumnya. Dengan memanfaatkan dokumen yang sudah ditentukan, chatbot ini bisa memberikan jawaban yang relevan sesuai dengan konteks dokumen yang telah dipilih sebelumnya.'
            }
          />
          <WelcomeComponent
            setInput={setInput}
            exampleMessages={exampleMessages}
            title={'Tell-Us Chat Document'}
          />
          <Separator className="my-4 md:my-4" />
          <ChatMessage
            disableAction
            message={{
              role: 'system',
              content:
                'Selamat datang di **Tell-US Chat Document!** Saya siap membantu menjawab pertanyaan yang anda ajukan berdasarkan dokumen yang telah anda pilih. Apa yang ingin anda tanyakan hari ini?',
              id: '1'
            }}
            setInput={setInput}
          />
        </div>
        <div className="relative max-w-3xl px-4 mx-auto">
          {messages.length ? (
            <>
              {messages.map((message, index) => (
                <div key={index}>
                  <ChatMessage
                    setInput={setInput}
                    message={message}
                    isLoading={
                      (isLoading && messages.length - 1 === index) ||
                      index === 0
                    }
                    disableFollowupQuestions
                    disableClickCitation
                  />
                </div>
              ))}
              <ChatScrollAnchor trackVisibility={isLoading} />
            </>
          ) : null}
          {isFetching && <FetchingChatComponent isFetching={isFetching} />}
        </div>
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
        setIsFetching={setIsFetching}
      />
    </>
  )
}
