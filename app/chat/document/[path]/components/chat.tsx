'use client'

import {useChat, type Message} from 'ai/react'

import {ChatMessage} from '@/components/chat-message'
import {ChatPanel} from './chat-panel'
import {ChatScrollAnchor} from '@/components/chat-scroll-anchor'
import {Separator} from '@/components/ui/separator'
import {WelcomeComponent} from '@/components/welcome'
import {cn} from '@/lib/utils'
import {ComponentProps} from 'react'
import {toast} from 'react-hot-toast'

export interface ChatProps extends ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string,
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

export function Chat({id, initialMessages, citationId, className}: ChatProps) {
    const {messages, append, reload, stop, isLoading, input, setInput, data} =
        useChat({
            initialMessages,
            id,
            api: '/api/chat/document',
            body: {id, citationId},
            onResponse: response => {
                if (response.status !== 200) toast.error(response.statusText)
            },
            onError: (error) => toast.error(error.message)
        })
    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                <div className="max-w-3xl px-4 mx-auto">
                    <WelcomeComponent setInput={setInput} exampleMessages={exampleMessages}/>
                    <Separator className="my-4 md:my-4"/>
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
                        <div className="relative max-w-3xl px-4 mx-auto">
                            {messages.map((message, index) => (
                                <div key={index}>
                                    <ChatMessage
                                        setInput={setInput}
                                        message={message}
                                        isLoading={isLoading && messages.length - 1 === index || index === 0}
                                        disableFollowupQuestions
                                        disableClickCitation
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
