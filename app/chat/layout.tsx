import {ReactNode} from 'react'
import {Header} from "@/components/header";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <main className="flex flex-col flex-1">{children}</main>
        </>
    )
}
