import {UseChatHelpers} from 'ai/react'

import {Button} from '@/components/ui/button'
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import Mascot from "@/assets/svg/mascot.svg";

const exampleMessages = [
    {
        heading: 'Berikan 3 contoh tugas akhir bertema teknologi',
        message: `Berikan 3 contoh tugas akhir bertema teknologi`
    },
    {
        heading: 'Darimana sumber-sumber tugas akhir berasal',
        message: 'Darimana sumber-sumber tugas akhir berasal'
    },
    {
        heading: 'Rekomendasi tugas akhir tentang e-commerce',
        message: `Rekomendasi tugas akhir tentang e-commerce`
    }
]

export function WelcomeComponent({setInput}: Pick<UseChatHelpers, 'setInput'>) {
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
            <div className="mt-4 flex flex-row items-center justify-center space-x-3">
                {exampleMessages.map((message, index) => (
                    <Button
                        key={index}
                        variant="secondary"
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
