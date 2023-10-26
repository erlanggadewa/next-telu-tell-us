'use client'

import {useChat, type Message} from 'ai/react'

import {ChatList} from '@/components/chat-list'
import {ChatMessage} from '@/components/chat-message'
import {ChatPanel} from '@/components/chat-panel'
import {ChatScrollAnchor} from '@/components/chat-scroll-anchor'
import {cn} from '@/lib/utils'
import {ComponentProps} from 'react'
import {toast} from 'react-hot-toast'
import {WelcomeComponent} from "@/components/welcome";
import {Separator} from "@/components/ui/separator";

export interface ChatProps extends ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

export function Chat({id, initialMessages, className}: ChatProps) {
    const {messages, append, reload, stop, isLoading, input, setInput, data} =
        useChat({
            initialMessages,
            id,
            body: {id},
            onResponse: response => {
                if (response.status === 401) toast.error(response.statusText)
            }
        })
    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                <div className="max-w-3xl px-4 mx-auto xl:max-w-4xl">
                    <WelcomeComponent setInput={setInput}/>
                    <Separator className="my-4 md:my-4"/>
                    <ChatMessage
                        noAction
                        message={{
                            role: 'system',
                            content:
                                'Selamat datang di **Tell-US Search!** Saya akan membantu kamu menjawab pertanyaan apa pun yang kamu tanyakan. Apa yang ingin kamu tanyakan hari ini?',
                            id: '1'
                        }}
                        setInput={setInput}/>
                </div>
                {messages.length ? (
                    <>
                        <ChatList messages={messages} id={id} isLoading={isLoading} setInput={setInput}/>
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
