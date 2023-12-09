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
  },
  openGraph: {
    title: 'Telkom University Tell us',
    description:
      'Robot AI Tell-US Search membantu menemukan e-book referensi proyek akhir, skripsi, tesis, maupun disertasi para alumni Telkom University dengan Teknologi Personalisasi Kecerdasan Buatan (AI) yang siap membantu kebutuhan sivitas Telkom University. Sumber informasi terafiliasi dengan Open Library Telkom University.',
    siteName: 'Telu Tell Us',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph.png'
      }
    ]
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
          <div className="relative flex flex-col h-auto min-h-[100dvh]">
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
