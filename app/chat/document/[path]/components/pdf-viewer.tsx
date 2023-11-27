'use client'

import {appConfig} from '@/config'
import axios from 'axios'
import {MutableRefObject, useEffect, useRef, useState} from 'react'
import {bl} from "@upstash/redis/zmscore-10fd3773";

const PdfViewer = ({
                       path,
                       summary,
                   }: {
    path: string
    summary: string,
}) => {
    const iframeRef = useRef() as MutableRefObject<HTMLIFrameElement>
    const jumlahKata = summary.split(' ').length

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
            <iframe ref={iframeRef} title={path} className="w-full h-[70vh]"/>
            {/*<div className="flex items-center justify-between gap-4 m-4 mx-10">*/}
            {/*    <div className="flex items-center">*/}
            {/*        {[...Array(totalRating)].map((_, index) => index < rating ? (*/}
            {/*                <StarFilledIcon className='text-yellow-500' key={index}/>*/}
            {/*            ) : <StarIcon className='text-yellow-500' key={index}/>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex items-center justify-between gap-4 m-4 mx-10">*/}
            {/*    <div className="flex items-center gap-2" onClick={() => {*/}
            {/*    }}>*/}
            {/*        <InfoCircledIcon className='text-gray-600'/>*/}
            {/*        <p>Lihat Informasi</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex gap-2">*/}
            {/*        <div className="flex items-center gap-2">*/}
            {/*            <HeartIcon*/}
            {/*                className={cn('text-gray-600 cursor-pointer')}*/}
            {/*            />*/}
            {/*            <p>123</p>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center gap-2">*/}
            {/*            <DownloadIcon/>*/}
            {/*            <p>456</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Separator/>*/}
            <div className="container">
                <h1 className="mt-4 font-bold text-center text-md">{path}</h1>
                <p className="mt-2 mb-4 text-sm text-justify">
                    {summary}
                    <span className="font-semibold text-gray-500 text-md">({jumlahKata} kata)</span>
                </p>
            </div>
        </div>
    )
}

export default PdfViewer
