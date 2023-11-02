import {appConfig} from "@/config";
import {v4 as uuid} from "uuid";
import {ChatDocument} from "@/components/chat-document";

export interface DocumentPageProps {
    params: {
        path: string
    }
}

const DocumentPage = ({params}: DocumentPageProps) => {
    const id = uuid()
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <iframe title="tes" className="w-full h-screen" src={`${appConfig.apiUrl}/blob-storage/${params.path}`}/>
            </div>
            <div className="col-span-3">
                <ChatDocument id={id}/>
            </div>
        </div>
    );
};

export default DocumentPage;