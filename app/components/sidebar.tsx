import SignoutButton from '@/app/components/signout-button'
import TellUs from '@/assets/images/tell-us.png'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { HomeIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

const routes = [
  {
    path: '/',
    name: 'My Tell-US',
    icon: <HomeIcon width={20} height={20} className="mr-3" />
  },
  {
    path: '/chat',
    name: 'Tell-US Search',
    icon: <MagnifyingGlassIcon width={20} height={20} className="mr-3" />
  },
  {
    path: '/chat/catalog',
    name: 'Chat Catalog',
    icon: <MagnifyingGlassIcon width={20} height={20} className="mr-3" />
  }
]

const Sidebar = async () => {
  const session = await auth()
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''
  return (
    <div className="lg:bg-gradient-to-b lg:from-[#ED1E28] lg:to-red-900 w-full h-screen lg:flex lg:flex-col lg:justify-between hidden">
      <div>
        <Image
          className="m-auto my-16"
          src={TellUs}
          alt="logo tell-us"
          width={200}
        />
        <div className="ml-10">
          <h2 className="pl-5 text-xl font-bold text-white uppercase">Menu</h2>
          <ul className="mt-4 space-y-4">
            {routes.map((route, index) => (
              <li
                key={index}
                className={cn(
                  'rounded-l-full',
                  pathname == route.path
                    ? 'bg-white'
                    : 'text-white hover:bg-white duration-75 hover:text-black'
                )}
              >
                <Link
                  href={route.path}
                  className="flex items-center w-full px-5 py-3 font-semibold"
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
        <div className="flex items-center justify-evenly">
          <img
            className="rounded-full"
            src={`https://ui-avatars.com/api/?name=${session?.user.name}`}
            alt="avatar"
          />
          <div className="space-y-2">
            <p className="text-sm text-white">{session?.user.name}</p>
            <SignoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
