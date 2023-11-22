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
    }, [path]);

    return (
        <div className="sticky top-16">
            <iframe ref={iframeRef} title={path} className="w-full h-[70vh]"/>
            {/*<div className="flex justify-between items-center gap-4 m-4 mx-10">*/}
            {/*    <div className="flex items-center">*/}
            {/*        {[...Array(totalRating)].map((_, index) => index < rating ? (*/}
            {/*                <StarFilledIcon className='text-yellow-500' key={index}/>*/}
            {/*            ) : <StarIcon className='text-yellow-500' key={index}/>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex justify-between items-center gap-4 m-4 mx-10">*/}
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
            <h1 className="text-md font-bold text-center mt-4 mx-12">{path}</h1>
            <p className="text-sm text-justify mx-14 mt-2 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque, dolore exercitationem expedita qui ullam! Ab accusamus autem cumque, deleniti dolores iste labore nemo optio possimus quidem voluptas voluptates voluptatibus?
                <span
                className='text-gray-500 text-md font-semibold'>(50 kata)</span></p>
        </div>
    );
};

export default PdfViewer;