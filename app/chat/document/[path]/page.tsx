import {appConfig} from "@/config";
import {v4 as uuid} from "uuid";
import {Chat} from "./components/chat";

export interface DocumentPageProps {
    params: {
        path: string
    },
    searchParams?: {
        citationId: string
    }
}

const DocumentPage = ({params, searchParams}: DocumentPageProps) => {
    const id = uuid()
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <iframe title="tes" className="w-full h-screen"
                        src={`${appConfig.apiUrl}/blob-storage/${params.path}`}/>
            </div>
            <div className="col-span-3">
                <Chat id={id} citationId={searchParams?.citationId}/>
            </div>
        </div>
    );
};

export default DocumentPage;