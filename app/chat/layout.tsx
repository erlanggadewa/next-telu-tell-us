import {ReactNode} from 'react'
import {Header} from "@/components/header";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex flex-col flex-1">{children}</main>
        </div>
    )
}
