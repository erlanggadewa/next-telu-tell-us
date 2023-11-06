'use client'

import { useChat, type Message } from 'ai/react'

import { ChatList } from '@/components/chat-list'
import { ChatMessage } from '@/components/chat-message'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { Separator } from '@/components/ui/separator'
import { WelcomeComponent } from '@/components/welcome'
import { appConfig } from '@/config'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { toast } from 'react-hot-toast'

import { useState } from 'react'
import { IconStar, IconHeart } from '@tabler/icons-react'
import PDFViewer from '@/components/ui/pdf-viewer'
import Image from "next/image"
import Views from '@/assets/svg/views.svg'
import Download from '@/assets/svg/download.svg'
import Info from '@/assets/svg/info.svg'
import Feedback from '@/assets/svg/feedback.svg'
import Clipboard from '@/assets/svg/clipboard.svg'

export interface ChatProps extends ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string,
}

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

export function Chat({ id, initialMessages, className }: ChatProps) {
    const [rating, setRating] = useState(3)
    const totalRating = 5
    const [views, setViews] = useState(0)
    const [download, setDownload] = useState(0)
    const [isClicked, setIsclicked] = useState(false)
    const handleClick = () => {
        setIsclicked(!isClicked)
    }
    const { messages, append, reload, stop, isLoading, input, setInput, data } =
        useChat({
            initialMessages,
            id,
            body: { id },
            onResponse: response => {
                if (response.status !== 200) toast.error(response.statusText)
            }
        })
    const PdfInformation = ({ src, alt, text, onClick }: { src: string | null; alt: string; text: number | string; onClick?: () => void }) => (
        <div className="flex flex-row items-center mx-0">
            {src && <Image src={src} alt={alt} />}
            {onClick ? (
                <button onClick={onClick} className="ml-2" style={{ cursor: 'pointer' }}>
                    {text}
                </button>
            ) : (
                <p className="ml-2">{text}</p>
            )}
        </div>
    )
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Text copied to clipboard')
    }
    return (
        <>
            <div className="flex">
                {/* Left Side */}
                <div className="flex-1 w-1/2">
                    <PDFViewer />
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-4 m-4 mx-10">
                            <div className="flex items-center">
                                {[...Array(totalRating)].map((_, index) => (
                                    <IconStar
                                        key={index}
                                        className={`text-yellow-500 ${index < rating ? "fill-yellow-500" : ""
                                            }`}
                                    />
                                ))}
                                <PdfInformation src={null} alt="Rating" text={rating} /><span>/5</span>
                            </div>
                            <PdfInformation src={Views} alt="Views" text={views} />
                            <PdfInformation src={Download} alt="Download" text={download} />
                        </div>
                        <div className="flex justify-between items-center gap-4 m-4 mx-10">
                            <PdfInformation src={Info} alt="Info" text="Lihat Informasi" onClick={() => { }} />
                            <div className="flex items-center">
                                <IconHeart
                                    onClick={handleClick}
                                    className={`text-gray-600 cursor-pointer ${isClicked ? "fill-rose-500 text-rose-500" : ""}`}
                                />
                                <PdfInformation src={null} alt="Like" text="Sukai" />
                            </div>
                            <PdfInformation src={Feedback} alt="Feedback" text="Umpan Balik" onClick={() => { }} />
                        </div>

                    </div>
                    <div className="border border-solid border-gray-300 w-full"></div>
                    <h1 className="text-xl font-bold text-center mt-4 mx-12">KriDela: Mengembangkan Aplikasi Jual Beli Kriya di Desa Oebola Dalam NTT Berbasis Web</h1>
                    <p className="text-md text-justify mt-2 mx-14"><span id="textToCopy">Dilatarbelakangi dengan penjualan hasil kriya belum maksimal karena masih dilakukan secara konvensional. Oleh karena itu diciptakan aplikasi Kridela multifungsi yang dapat menyelesaikan berbagai aspek permasalahan di sektor kriya.</span><span className='text-gray-500 text-md font-semibold'> (28/50 kata)</span></p>
                    <div className="flex justify-end mx-12 my-3">
                        <button onClick={() => {
                            const element = document.getElementById("textToCopy")
                            if (element) {
                                copyToClipboard(element.innerText)
                            }
                        }} className="p-2 transition">
                            <Image src={Clipboard} alt="Copy Text" />
                        </button>
                    </div>
                </div>
                {/* Vertical Divider */}
                <div className="border border-solid border-gray-300 h-auto"></div>
                {/* Right Side */}
                <div className="flex-1">
                    <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                        <div className="max-w-3xl px-4 mx-auto xl:max-w-4xl">
                            <WelcomeComponent setInput={setInput} exampleMessages={exampleMessages} />
                            <Separator className="my-4 md:my-4" />
                            <ChatMessage
                                noAction
                                message={{
                                    role: 'system',
                                    content:
                                        'Selamat datang di **Tell-US Search!** Saya akan membantu kamu menjawab pertanyaan apa pun yang kamu tanyakan. Apa yang ingin kamu tanyakan hari ini?',
                                    id: '1'
                                }}
                                setInput={setInput}
                            />
                        </div>
                        {messages.length ? (
                            <>
                                <ChatList
                                    messages={messages}
                                    id={id}
                                    isLoading={isLoading}
                                    setInput={setInput}
                                    type="chat"
                                />
                                <ChatScrollAnchor trackVisibility={isLoading} />
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

                </div>
                {/* <div className="flex">
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
                </div> */}
            </div>
        </>
    )
}
