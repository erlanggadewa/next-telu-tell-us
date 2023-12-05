import { Message } from 'ai'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { ChatMessageActions } from '@/components/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { CitationSource } from '@/app/api/chat/route'
import TellUsIcon from '@/assets/svg/system.svg'
import Loading from '@/components/loading'
import { UseChatHelpers } from 'ai/react/dist'
import Link from 'next/link'
import { PluggableList } from 'react-markdown/lib/react-markdown'

export interface ChatMessageProps {
  message: Message
  disableAction?: boolean
  isLoading?: boolean
  setInput?: UseChatHelpers['setInput']
  disableClickCitation?: boolean
  disableFollowupQuestions?: boolean
  citationSources?: CitationSource[]
}

export function ChatMessage({
  message,
  disableAction,
  setInput,
  isLoading,
  citationSources,
  disableClickCitation,
  disableFollowupQuestions,
  ...props
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'group relative mb-4 flex items-start max-w-xl',
        message.role === 'user'
          ? 'flex-row-reverse w-fit ml-auto'
          : '2xl:-ml-12'
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
          <IconUser />
        ) : (
          <Image src={TellUsIcon} alt="Tell Us Icon" />
        )}
      </div>
      <div
        className={cn(
          'flex-1 px-1 space-y-2 overflow-hidden',
          message.role === 'user' ? 'mr-3' : 'ml-3'
        )}
      >
        {isLoading && message.role !== 'user' ? (
          <Loading />
        ) : (
          <div className="rounded-lg border bg-[#F6F6F6] px-4 py-3 shadow">
            {message.role === 'user' ? (
              message.content
            ) : (
              <MemoizedReactMarkdown
                className="prose text-justify break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                remarkPlugins={[remarkGfm, remarkMath]}
                skipHtml={true}
                rehypePlugins={[rehypeRaw] as PluggableList}
                components={{
                  a: ({ children, href }) => {
                    return (
                      <Link href={href || ''} legacyBehavior passHref>
                        <a
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          {children}
                        </a>
                      </Link>
                    )
                  },
                  ol: ({ children }) => {
                    return (
                      <ol className="flex flex-col gap-4 my-2">{children}</ol>
                    )
                  },
                  p: ({ children }) => {
                    return (
                      <pre className="font-sans whitespace-pre-wrap last:mb-0">
                        {children}
                      </pre>
                    )
                  }
                }}
              >
                {message.content}
              </MemoizedReactMarkdown>
            )}
          </div>
        )}
        {!disableAction && message.role !== 'user' && !isLoading && (
          <ChatMessageActions message={message} />
        )}
      </div>
    </div>
  )
}
