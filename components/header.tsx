import { clearChats } from '@/app/actions'
import { auth } from '@/auth'
import { ClearHistory } from '@/components/clear-history'
import { Sidebar } from '@/components/sidebar'
import { SidebarFooter } from '@/components/sidebar-footer'
import { SidebarList } from '@/components/sidebar-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { IconNextChat, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import Link from 'next/link'
import { Suspense } from 'react'

export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        {/*{session?.user ? (*/}
        {/*  <Sidebar>*/}
        {/*    <Suspense fallback={<div className="flex-1 overflow-auto" />}>*/}
        {/*      <SidebarList userId={session?.user?.id} />*/}
        {/*    </Suspense>*/}
        {/*    <SidebarFooter>*/}
        {/*      <ThemeToggle />*/}
        {/*      <ClearHistory clearChats={clearChats} />*/}
        {/*    </SidebarFooter>*/}
        {/*  </Sidebar>*/}
        {/*) : (*/}
        {/*  <Link href="/" target="_blank" rel="nofollow">*/}
        {/*    <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />*/}
        {/*    <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />*/}
        {/*  </Link>*/}
        {/*)}*/}
        <div className="flex items-center">
          {/*<IconSeparator className="w-6 h-6 text-muted-foreground/50" />*/}
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/sign-in?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
