import {Message} from 'ai'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {ChatMessageActions} from '@/components/chat-message-actions'
import {MemoizedReactMarkdown} from '@/components/markdown'
import {CodeBlock} from '@/components/ui/codeblock'
import {IconUser} from '@/components/ui/icons'
import {cn} from '@/lib/utils'
import Image from 'next/image'

import TellUsIcon from '@/assets/svg/system.svg'
import {parseAnswer} from '@/components/text-parser'
import {Button} from '@/components/ui/button'
import {useMemo} from 'react'
import {PluggableList} from 'react-markdown/lib/react-markdown'
import {UseChatHelpers} from "ai/react/dist";
import Link from "next/link";

export interface ChatMessageProps {
    message: Message
    disableAction?: boolean
    isLoading?: boolean
    setInput?: UseChatHelpers['setInput']
    disableClickCitation?: boolean
    disableFollowupQuestions?: boolean,
    citationIds?: { citationId: string }[]
}

export function ChatMessage({
                                message,
                                disableAction,
                                setInput,
                                isLoading,
                                citationIds,
                                disableClickCitation,
                                disableFollowupQuestions,
                                ...props
                            }: ChatMessageProps) {
    const {result, citations, followupQuestions} = useMemo(
        () => message.role !== 'user' ? parseAnswer(message.content, (path) => {
        }) : {result: message.content, citations: [], followupQuestions: []},
        [message]
    )
    return (
        <div
            className={cn(
                'group relative mb-4 flex items-start max-w-xl',
                message.role === 'user' ? 'flex-row-reverse w-fit ml-auto' : 'md:-ml-12'
            )}
            {...props}
        >
            <div
                className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    message.role === 'user' ? 'bg-background' : 'bg-white p-1'
                )}
            >
                {message.role === 'user' ? (
                    <IconUser/>
                ) : (
                    <Image src={TellUsIcon} alt="Tell Us Icone"/>
                )}
            </div>
            <div
                className={cn(
                    'flex-1 px-1 space-y-2 overflow-hidden',
                    message.role === 'user' ? 'mr-3' : 'ml-3'
                )}
            >
                {isLoading ? 'Menelusuri...' : ''}
                <div className="rounded-lg border bg-[#F6F6F6] px-4 py-3 shadow">
                    {message.role === 'user'
                        ? result
                        : <MemoizedReactMarkdown
                            className="prose text-justify break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            skipHtml={true}
                            rehypePlugins={[rehypeRaw] as PluggableList}
                            components={{
                                p: ({children}) => {
                                    return <p className="mb-2 last:mb-0">{children}</p>
                                },
                                code: ({node, inline, className, children, ...props}) => {
                                    if (children.length) {
                                        if (children[0] == '▍') return (
                                            <span className="mt-1 cursor-default animate-pulse">▍</span>)

                                        children[0] = (children[0] as string).replace('`▍`', '▍')
                                    }

                                    const match = /language-(\w+)/.exec(className || '')

                                    if (inline) return (<code className={className} {...props}>{children}</code>)

                                    return (
                                        <CodeBlock
                                            key={Math.random()}
                                            language={(match && match[1]) || ''}
                                            value={String(children).replace(/\n$/, '')}
                                            {...props}
                                        />
                                    )
                                }
                            }}
                        >
                            {result}
                        </MemoizedReactMarkdown>
                    }
                    {citations.length > 0 && (
                        <div>
                            Citations:
                            {citations.map((x, i) => (
                                disableClickCitation ?
                                    <Button
                                        key={i}
                                        variant="red"
                                        full
                                        className="my-1 h-fit hover:bg-red-700"
                                    >{`${++i}. ${x}`}</Button> :
                                    <Link href={{
                                        pathname: `/chat/document/${x}`,
                                        query: {
                                            citationId: citationIds?.[i].citationId
                                        }
                                    }} key={i} target="_blank">
                                        <Button
                                            variant="red"
                                            full
                                            className="my-1 h-fit hover:bg-red-700"
                                        >{`${++i}. ${x}`}</Button>
                                    </Link>
                            ))}
                        </div>
                    )}

                    {!disableFollowupQuestions && followupQuestions.length > 0 && (
                        <div>
                            Follow-up questions:
                            {followupQuestions.map((x, i) => (
                                <Button onClick={async (e) => {
                                    e.preventDefault()
                                    if (setInput) setInput(x)
                                }} key={i} full className="my-1 bg-gray-700 h-fit">
                                    {x}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
                {!disableAction && message.role !== 'user' && (
                    <ChatMessageActions message={message}/>
                )}
            </div>
        </div>
    )
}
