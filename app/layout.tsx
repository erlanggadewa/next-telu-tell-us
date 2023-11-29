import {Metadata} from 'next'

import {Toaster} from 'react-hot-toast'

import {appConfig} from '@/config'
import '@/app/globals.css'
import {Providers} from '@/components/providers'
import {TailwindIndicator} from '@/components/tailwind-indicator'
import {fontMono, fontSans} from '@/lib/fonts'
import {cn} from '@/lib/utils'
import {ReactNode} from 'react'

export const metadata: Metadata = {
    title: {
        default: appConfig.appName,
        template: `%s - ${appConfig.appName}`
    },
    description: appConfig.appName,
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: 'white'},
        {media: '(prefers-color-scheme: dark)', color: 'black'}
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="id" suppressHydrationWarning>
        <head/>
        <body
            className={cn(
                'font-sans antialiased',
                fontSans.variable,
                fontMono.variable
            )}
        >
        <Toaster/>
        <Providers attribute="class" defaultTheme="light" enableSystem>
            <div className="flex flex-col min-h-screen">
                {children}
            </div>
            <TailwindIndicator/>
        </Providers>
        </body>
        </html>
    )
}
