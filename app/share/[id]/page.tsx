import {type Metadata} from 'next'
import {notFound} from 'next/navigation'

import {getSharedChat} from '@/app/actions'
import {FooterText} from '@/components/footer'
import {formatDate} from '@/lib/utils'
import {ChatMessage} from "@/components/chat-message";

export const runtime = 'edge'
export const preferredRegion = 'home'

interface SharePageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({
                                           params
                                       }: SharePageProps): Promise<Metadata> {
    const chat = await getSharedChat(params.id)

    return {
        title: chat?.title.slice(0, 50) ?? 'Chat'
    }
}

export default async function SharePage({params}: SharePageProps) {
    const chat = await getSharedChat(params.id)

    if (!chat || !chat?.sharePath) notFound()
    return (
        <>
            <div className="flex-1 space-y-6">
                <div className="px-4 py-6 border-b bg-background md:px-6 md:py-8">
                    <div className="max-w-2xl mx-auto md:px-6">
                        <div className="space-y-1 md:-mx-8">
                            <h1 className="text-2xl font-bold">{chat.title}</h1>
                            <div className="text-sm text-muted-foreground">
                                {formatDate(chat.createdAt)} · {chat.messages.length} messages
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative max-w-3xl px-4 mx-auto xl:max-w-4xl">
                    {chat.messages.map((message, index) => (
                        <div key={index}>
                            <ChatMessage message={message}/>
                        </div>
                    ))}
                </div>
            </div>
            <FooterText className="py-8"/>
        </>
    )
}
