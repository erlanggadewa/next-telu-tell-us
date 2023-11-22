import PdfViewer from '@/app/chat/document/[path]/components/pdf-viewer'
import {v4 as uuid} from 'uuid'
import {Chat} from './components/chat'
import axios from "axios";
import {appConfig} from "@/config";

export interface DocumentPageProps {
    params: {
        path: string
    }
    searchParams?: {
        citationId: string
    }
}

const getSummary = async (citationId?: string) => {
    if (!citationId) return ''
    return (await axios.get(appConfig.apiUrl + '/cognitive-search/summary/' + citationId)).data
}

const DocumentPage = async ({params, searchParams}: DocumentPageProps) => {
    const id = uuid()
    const summary = await getSummary(searchParams?.citationId)
    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
                <PdfViewer
                    path={decodeURI(params.path)}
                    summary={summary}
                />
            </div>
            <div className="h-full col-span-3">
                <Chat id={id} citationId={searchParams?.citationId}/>
            </div>
        </div>
    )
}
export default DocumentPage
