"use client"

import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {appConfig} from "@/config";
import {DownloadIcon, HeartIcon, InfoCircledIcon, StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

const PdfViewer = ({path}: { path: string }) => {
    const iframeRef = useRef() as MutableRefObject<HTMLIFrameElement>
    const [rating, setRating] = useState(3)
    const totalRating = 5

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
            .then(b => iframeRef.current.src = URL.createObjectURL(b))
            .catch(e => console.error(e))
    }, []);
    return (
        <div>
            <iframe ref={iframeRef} title={path} className="w-full h-screen"/>
            <div className="flex justify-between items-center gap-4 m-4 mx-10">
                <div className="flex items-center">
                    {[...Array(totalRating)].map((_, index) => index < rating ? (
                            <StarFilledIcon className='text-yellow-500' key={index}/>
                        ) : <StarIcon className='text-yellow-500' key={index}/>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 m-4 mx-10">
                <div className="flex items-center gap-2" onClick={() => {
                }}>
                    <InfoCircledIcon className='text-gray-600'/>
                    <p>Lihat Informasi</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <HeartIcon
                            className={cn('text-gray-600 cursor-pointer')}
                        />
                        <p>0</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DownloadIcon/>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <Separator/>
            <h1 className="text-xl font-bold text-center mt-4 mx-12">{path}</h1>
            <p className="text-md text-justify mt-2 mx-14"><span id="textToCopy">Dilatarbelakangi dengan penjualan hasil kriya belum maksimal karena masih dilakukan secara konvensional. Oleh karena itu diciptakan aplikasi Kridela multifungsi yang dapat menyelesaikan berbagai aspek permasalahan di sektor kriya.</span><span
                className='text-gray-500 text-md font-semibold'>(28/50 kata)</span></p>
        </div>
    );
};

export default PdfViewer;