'use client'

import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {ThemeProviderProps} from 'next-themes/dist/types'
import {SessionProvider} from "next-auth/react";

import {TooltipProvider} from '@/components/ui/tooltip'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient()

export function Providers({children, ...props}: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>{children}</TooltipProvider>
                </QueryClientProvider>
            </SessionProvider>
        </NextThemesProvider>
    )
}
