import {UseChatHelpers} from 'ai/react'

import {Button} from '@/components/ui/button'
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import Mascot from "@/assets/svg/mascot.svg";

interface WelcomeProps extends Pick<UseChatHelpers, 'setInput'> {
    exampleMessages: { heading: string, message: string }[]
}

export function WelcomeComponent({setInput, exampleMessages}: WelcomeProps) {
    return (
        <div className="text-center">
            <Image className="mx-auto" src={Mascot} alt="Maskot"/>
            <h1 className="mb-2 text-2xl font-semibold">
                Robot AI Tell-US Search
            </h1>
            <Separator className="my-4 md:my-4"/>
            <p className="mb-2 leading-normal text-muted-foreground">
                Mulailah bertanya untuk mencari sumber referensi artikel anda.
            </p>
            <p className="leading-normal text-md font-semibold">
                Contoh Pertanyaan:
            </p>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-center lg:space-x-3 lg:space-y-0 space-y-3">
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
