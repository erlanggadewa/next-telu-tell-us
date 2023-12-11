import { UseChatHelpers } from 'ai/react'

import Mascot from '@/assets/images/mascot.webp'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface WelcomeProps extends Pick<UseChatHelpers, 'setInput'> {
  title: string
  exampleMessages: { heading: string; message: string }[]
}

export function WelcomeComponent({
  title,
  setInput,
  exampleMessages
}: WelcomeProps) {
  return (
    <div className="text-center">
      <Image className="w-24 mx-auto " src={Mascot} alt="Maskot" />
      <h1 className="mt-5 mb-2 text-2xl font-semibold">{title}</h1>
      <Separator className="my-4 md:my-4" />
      <p className="mb-2 leading-normal text-muted-foreground">
        Mulailah bertanya untuk mencari sumber referensi artikel anda.
      </p>
      <p className="font-semibold leading-normal text-md">Contoh Pertanyaan:</p>
      <div className="flex flex-col items-center justify-center mt-4 space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
        {exampleMessages.map((message, index) => (
          <Button
            key={index}
            variant="secondary"
            full
            className="h-auto p-0 text-base bg-[#F6F6F6] px-4 py-3 border shadow max-w-md"
            onClick={() => setInput(message.message)}
          >
            {message.heading}
          </Button>
        ))}
      </div>
    </div>
  )
}
