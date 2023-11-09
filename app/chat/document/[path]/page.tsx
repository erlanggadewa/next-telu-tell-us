"use client"

import {appConfig} from "@/config";
import {v4 as uuid} from "uuid";
import {Chat} from "./components/chat";
import {MutableRefObject, useEffect, useRef} from "react";

export interface DocumentPageProps {
    params: {
        path: string
    },
    searchParams?: {
        citationId: string
    }
}

const DocumentPage = async ({params, searchParams}: DocumentPageProps) => {
    const id = uuid()
    const iframeRef = useRef() as MutableRefObject<HTMLIFrameElement>
    useEffect(() => {
        fetch(`${appConfig.apiUrl}/blob-storage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filename: decodeURI(params.path)
            })
        })
            .then(r => r.blob())
            .then(b => iframeRef.current.src = URL.createObjectURL(b))
            .catch(e => console.error(e))
    }, []);
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <iframe ref={iframeRef} title={decodeURI(params.path)} className="w-full h-screen"/>
            </div>
            <div className="col-span-3">
                <Chat id={id} citationId={searchParams?.citationId}/>
            </div>
        </div>
    );
};

export default DocumentPage;