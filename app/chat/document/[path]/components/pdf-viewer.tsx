'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import SkeletonPdfComponent from '@/components/ui/skeleton-pdf'
import { appConfig } from '@/config'
import { DialogPortal } from '@radix-ui/react-dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

const PdfViewer = ({ path, summary }: { path: string; summary: string }) => {
  const iframeRef = useRef() as MutableRefObject<HTMLIFrameElement>
  const jumlahKata = summary.split(' ').length
  const [isLoadingPdf, setLoadingPdf] = useState(false)

  useEffect(() => {
    setLoadingPdf(true)
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
      .finally(() => setLoadingPdf(false))
      .catch(e => console.error(e))
  }, [path])

  return (
    <div className="h-[calc(100dvh-64px)] sticky top-[64px]">
      <div className="flex flex-col h-full">
        <Dialog>
          <div className="flex justify-between">
            <div className="flex gap-4 m-4">
              <h1 className="mx-3 overflow-auto text-base font-semibold text-center">
                {path}
              </h1>
              <DialogTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer ">
                  <InfoCircledIcon className="w-8 h-8 text-gray-600" />
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
          {isLoadingPdf ? (
            <SkeletonPdfComponent />
          ) : (
            <iframe
              ref={iframeRef}
              title={path}
              className="w-full h-full min-h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PdfViewer
