import {ChatMessage} from '@/components/chat-message'
import {type Message} from 'ai'
import {UseChatHelpers} from "ai/react/dist";

export interface ChatList {
    messages: Message[],
    isLoading?: boolean,
    id?: string,
    setInput?: UseChatHelpers['setInput']
}

export function ChatList({messages, isLoading, setInput}: ChatList) {
    if (!messages.length) return null
    return (
        <div className="relative max-w-3xl px-4 mx-auto xl:max-w-4xl">
            {messages.map((message, index) => (
                <div key={index}>
                    <ChatMessage
                        setInput={setInput}
                        message={message}
                        isLoading={isLoading && messages.length - 1 === index && message.role !== 'user'}/>
                </div>
            ))}
        </div>
    )
}
