'use client'

import * as React from 'react'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {ThemeProviderProps} from 'next-themes/dist/types'
import {SessionProvider} from "next-auth/react";

import {TooltipProvider} from '@/components/ui/tooltip'

export function Providers({children, ...props}: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <SessionProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SessionProvider>
        </NextThemesProvider>
    )
}
