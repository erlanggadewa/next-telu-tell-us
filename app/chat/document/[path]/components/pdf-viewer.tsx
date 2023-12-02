'use client'

import {appConfig} from '@/config'
import {MutableRefObject, useEffect, useRef} from 'react'
import {HeartIcon, InfoCircledIcon, StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {DialogPortal} from "@radix-ui/react-dialog";

const PdfViewer = ({
                       path,
                       summary,
                   }: {
    path: string
    summary: string,
}) => {
    const iframeRef = useRef() as MutableRefObject<HTMLIFrameElement>
    const jumlahKata = summary.split(' ').length
    const totalRating = 5
    const rating = 3

    useEffect(() => {
        fetch(`${appConfig.apiUrl}/blob-storage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: path
            })
        })
            .then(r => r.blob())
            .then(b => (iframeRef.current.src = URL.createObjectURL(b)))
            .catch(e => console.error(e))
    }, [path])

    return (
        <div className="sticky top-16">
            <Dialog>
                <h1 className="text-lg text-center font-semibold my-3 mx-4 overflow-auto">{path}</h1>
                <iframe ref={iframeRef} title={path} className="w-full h-[70vh]"/>
                <div className="flex justify-between">
                    <div className="flex items-center m-4">
                        {[...Array(totalRating)].map((_, index) => index < rating ? (
                                <StarFilledIcon className='text-yellow-500' key={index}/>
                            ) : <StarIcon className='text-yellow-500' key={index}/>
                        )}
                    </div>
                    <div className="flex gap-4 m-4">
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <InfoCircledIcon className='text-gray-600'/>
                                <p>Lihat Informasi</p>
                            </div>
                        </DialogTrigger>
                        <div className="flex items-center gap-2">
                            <HeartIcon
                                className={cn('text-gray-600 cursor-pointer')}
                            />
                            <p>Sukai</p>
                        </div>
                    </div>
                </div>
                <Separator/>
                <DialogPortal>
                    <DialogContent>
                        <DialogTitle>Ringkasan</DialogTitle>
                        <DialogDescription>{summary} ({jumlahKata} kata)</DialogDescription>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </div>
    )
}

export default PdfViewer
