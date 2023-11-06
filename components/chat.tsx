'use client'

import {useChat, type Message} from 'ai/react'

import {ChatMessage} from '@/components/chat-message'
import {ChatPanel} from '@/components/chat-panel'
import {ChatScrollAnchor} from '@/components/chat-scroll-anchor'
import {Separator} from '@/components/ui/separator'
import {WelcomeComponent} from '@/components/welcome'
import {cn} from '@/lib/utils'
import {ComponentProps} from 'react'
import {toast} from 'react-hot-toast'

export interface ChatProps extends ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string,
}

const exampleMessages = [
    {
        heading: 'Berikan 3 contoh tugas akhir bertema teknologi',
        message: `Berikan 3 contoh tugas akhir bertema teknologi`
    },
    {
        heading: 'Darimana sumber-sumber tugas akhir berasal',
        message: 'Darimana sumber-sumber tugas akhir berasal'
    },
    {
        heading: 'Rekomendasi tugas akhir tentang e-commerce',
        message: `Rekomendasi tugas akhir tentang e-commerce`
    }
]

export function Chat({id, initialMessages, className}: ChatProps) {
    const {messages, append, reload, stop, isLoading, input, setInput, data} =
        useChat({
            initialMessages,
            id,
            body: {id},
            onResponse: response => {
                if (response.status !== 200) toast.error(response.statusText)
            }
        })
    const [dataPoints, citationIds] = data || []
    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                <div className="max-w-3xl px-4 mx-auto xl:max-w-4xl">
                    <WelcomeComponent setInput={setInput} exampleMessages={exampleMessages}/>
                    <Separator className="my-4 md:my-4"/>
                    <ChatMessage
                        noAction
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
                                        setInput={setInput}
                                        message={message}
                                        isLoading={isLoading && messages.length - 1 === index && message.role !== 'user'}
                                        citationIds={citationIds}
                                    />
                                </div>
                            ))}
                        </div>
                        <ChatScrollAnchor trackVisibility={isLoading}/>
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
