import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        {/* {session?.user ? (
          <Sidebar>
            <Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={session?.user?.id} />
            </Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
            <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />
          </Link>
        )} */}
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
        <a href="/">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-600"
          >
            <AiFillHome />
            <span className="ml-1">Home</span>
          </button>
        </a>
      </div>
    </header>
  )
}
