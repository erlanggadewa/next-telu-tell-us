'use client'

import {useChat, type Message} from 'ai/react'

import {ChatList} from '@/components/chat-list'
import {ChatPanel} from '@/components/chat-panel'
import {ChatScrollAnchor} from '@/components/chat-scroll-anchor'
import {EmptyScreen} from '@/components/empty-screen'
import {cn} from '@/lib/utils'
import {toast} from 'react-hot-toast'
import {ComponentProps} from "react";
import {ChatMessage} from "@/components/chat-message";

export interface ChatProps extends ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

export function Chat({id, initialMessages, className}: ChatProps) {
    const {messages, append, reload, stop, isLoading, input, setInput, data} =
        useChat({
            initialMessages,
            id,
            body: {
                id,
            },
            onResponse: (response) => {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            }
        })
    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                {/*<EmptyScreen setInput={setInput}/>*/}
                <div className="mx-auto max-w-2xl px-4">
                    <ChatMessage noAction message={{role: 'system', content: "Selamat datang di **Tell-US Search!** Saya akan membantu kamu menjawab pertanyaan apa pun yang kamu tanyakan. Apa yang ingin kamu tanyakan hari ini?", id: '1'}} />
                </div>
                {messages.length ? (
                    <>
                        <ChatList messages={messages}/>
                        <ChatScrollAnchor trackVisibility={isLoading}/>
                    </>
                ) : ''}
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
