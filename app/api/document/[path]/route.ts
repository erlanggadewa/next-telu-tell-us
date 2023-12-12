import {NextRequest, NextResponse} from "next/server";
import {appConfig} from "@/config";

export const GET = async (req: NextRequest, {params}: { params: { path: string } }) => {
    const blob = await (await fetch(`${appConfig.apiUrl}/blob-storage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: params.path
        })
    })).blob()
  return new NextResponse(blob)
}