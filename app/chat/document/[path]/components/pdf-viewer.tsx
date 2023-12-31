'use client'

import SkeletonPdfComponent from '@/components/skeleton-pdf'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'
import {DialogPortal} from '@radix-ui/react-dialog'
import {InfoCircledIcon} from '@radix-ui/react-icons'
import {useState} from 'react'

const PdfViewer = ({path, summary}: { path: string; summary: string }) => {
    const jumlahKata = summary.split(' ').length
    const [isLoadingPdf, setLoadingPdf] = useState(false)

    return (
        <div className="h-[calc(100dvh-64px)] z-1 sticky top-[64px]">
            <div className="flex flex-col h-full">
                <Dialog>
                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4 m-4">
                            <h1 className="mx-3 overflow-auto text-base font-semibold text-center">
                                {path}
                            </h1>
                            <DialogTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer ">
                                    <InfoCircledIcon className="w-8 h-8 text-gray-600"/>
                                </div>
                            </DialogTrigger>
                        </div>
                    </div>

                    <DialogPortal>
                        <DialogContent>
                            <DialogTitle>Ringkasan</DialogTitle>
                            <DialogDescription className="text-justify">
                                {summary} ({jumlahKata} Kata)
                            </DialogDescription>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>

                <div className="h-full">
                    {isLoadingPdf && <SkeletonPdfComponent/>}
                    <iframe
                        src={'/api/document/' + path}
                        title={path}
                        className={cn('w-full h-full min-h-full', isLoadingPdf && 'hidden')}
                    />
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
