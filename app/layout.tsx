import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { appConfig } from '@/config'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: appConfig.appName,
    template: `%s - ${appConfig.appName}`
  },
  description: appConfig.appName,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/system.png',
    shortcut: '/system.png',
    apple: '/system.png'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex flex-col min-h-screen h-auto overflow-x-hidden">{children}</div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
