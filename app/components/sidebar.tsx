'use client'

import TellUs from '@/assets/images/tell-us.png'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  {
    path: '/',
    name: 'My Tell-US',
    icon: <HomeIcon width={20} height={20} className="mr-3" />
  },
  {
    path: '/chat',
    name: 'Tell-US Chat',
    icon: <MagnifyingGlassIcon width={20} height={20} className="mr-3" />
  },
  {
    path: '/chat/catalog',
    name: 'Search Catalog',
    icon: <MagnifyingGlassIcon width={20} height={20} className="mr-3" />
  }
]

const Sidebar = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  return (
    <div className="fixed inset-0 grid w-full grid-cols-3 lg:relative lg:block lg:grid-cols-none">
      <div className="flex flex-col justify-between w-full h-[100dvh] col-span-2 overflow-auto shadow-md bg-gradient-to-r from-red-600 to-red-700">
        <div>
          <Image
            className="m-auto my-16"
            src={TellUs}
            alt="logo tell-us"
            width={200}
          />
          <div className="ml-10">
            <h2 className="pl-5 text-xl font-bold text-white uppercase">
              Menu
            </h2>
            <ul className="mt-4 space-y-4 font-semibold">
              {routes.map((route, index) => (
                <li
                  key={index}
                  className={cn(
                    'rounded-l-full',
                    pathname == route.path
                      ? 'bg-white'
                      : 'text-white hover:bg-white hover:text-black delay-75 '
                  )}
                >
                  <Link
                    href={route.path}
                    className="flex items-center w-full px-5 py-3"
                  >
                    {route.icon}
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container py-10 space-y-3">
          <div className="flex items-center">
            <img
              className="w-12 rounded-full"
              src={`https://ui-avatars.com/api/?name=${session?.user.name}`}
              alt="avatar"
            />
            <div className="ml-6 space-y-2">
              <p className="text-sm text-white">{session?.user.name}</p>
              <Button
                onClick={() => signOut()}
                className="text-black bg-white rounded-lg hover:bg-opacity-70 hover:bg-white"
                full
              >
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-gray-400 rounded-md lg:hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 "></div>
    </div>
  )
}

export default Sidebar
