"use client"

import {appConfig} from "@/config";

export interface DocumentPageProps {
    params: {
        path: string
    }
}

const DocumentPage = ({params}: DocumentPageProps) => {
    return (
        <div>
            <iframe title="tes" src={`${appConfig.apiUrl}/blob-storage/${params.path}`}/>
        </div>
    );
};

export default DocumentPage;