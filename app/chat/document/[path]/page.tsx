import {appConfig} from "@/config";
import {v4 as uuid} from "uuid";
import {Chat} from "./components/chat";

export interface DocumentPageProps {
    params: {
        path: string,
    },
    searchParams?: {
        citationId: string
    }
}

const DocumentPage = ({params, searchParams}: DocumentPageProps) => {
    const id = uuid()
    return (
        <div className="grid grid-cols-5 gap-4 relative">
            <div className="col-span-2">
                <iframe title="tes" className="w-full h-screen sticky bottom-0"
                        src={`${appConfig.apiUrl}/blob-storage/${params.path}`}/>
            </div>
            <div className="col-span-3">
                <Chat api="/api/chat/document" id={id} body={{citationId: searchParams?.citationId}}/>
            </div>
        </div>
    );
};

export default DocumentPage;