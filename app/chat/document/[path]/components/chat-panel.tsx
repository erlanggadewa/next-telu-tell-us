import { type UseChatHelpers } from 'ai/react'

import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { FooterText } from '@/components/footer'
import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconStop } from '@/components/ui/icons'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  setIsFetching
}: ChatPanelProps & { setIsFetching: (isFetching: boolean) => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-0 lg:grid lg:grid-cols-5 lg:gap-4">
      <div className="lg:col-span-2" />
      <div className="bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50% lg:col-span-3">
        <ButtonScrollToBottom />
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="flex items-center justify-center h-10">
            {isLoading ? (
              <Button
                variant="outline"
                onClick={() => {
                  setIsFetching(false)
                  return stop()
                }}
                className="bg-background"
              >
                <IconStop className="mr-2" />
                Stop generating
              </Button>
            ) : (
              messages?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsFetching(true)
                    return reload()
                  }}
                  className="bg-background"
                >
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
              )
            )}
          </div>
          <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
            <PromptForm
              onSubmit={async value => {
                setIsFetching(true)
                await append({
                  id,
                  content: value,
                  role: 'user'
                })
              }}
              input={input}
              setInput={setInput}
              isLoading={isLoading}
            />
            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
