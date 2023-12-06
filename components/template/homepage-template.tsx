'use client'

import Tab from '@/app/components/Tab'
import Sidebar from '@/app/components/sidebar'
import Robot from '@/assets/svg/robot.svg'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@uidotdev/usehooks'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const HomepageTemplate = () => {
  const [isActive, setIsActive] = useState(true)
  const size = useWindowSize()
  useEffect(() => {
    if (size.width ?? 0 > 1024) setIsActive(true)
  }, [size])
  return (
    <>
      <div
        className={cn(
          'z-50 w-64 fixed top-0 left-0 bottom-0 hidden h-screen',
          isActive ? 'lg:block' : 'lg:hidden block'
        )}
      >
        <Sidebar />
      </div>
      <div
        className={cn(
          'px-6 my-4 ml-0 overflow-y-auto',
          isActive ? 'lg:ml-64' : 'lg:ml-0'
        )}
      >
        <div className="w-full">
          <div className="fixed z-[9999] top-7 right-10">
            <button
              onClick={() => setIsActive(!isActive)}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 my-3 text-sm text-gray-500 bg-gray-100 border-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none ring-gray-400 ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="w-full p-6 text-center text-white lg:mt-3 lg:p-10 rounded-xl bg-gradient-to-b from-red-600 to-red-700">
            <Image className="mx-auto" src={Robot} alt="Maskot" />
            <h1 className="my-3 text-2xl font-semibold">
              Mau mulai aktivitas apa hari ini?
            </h1>
            <p className="mb-4 leading-normal lg:px-16">
              Bergabunglah dengan ratusan mahasiswa, dosen dan peneliti untuk
              segera menjawab pertanyaan dan memahami penelitian dengan AI.
            </p>
            {/*<div className="relative flex mx-auto text-black shadow-xl bg-background rounded-xl lg:w-4/5">*/}
            {/*    <select className="px-3 py-2 border-r-2 rounded-l-xl basis-1/5 ">*/}
            {/*        <option selected disabled>Pencarian Ai anda</option>*/}
            {/*    </select>*/}
            {/*    <input className="w-full px-3 py-2 rounded-r-xl basis-4/5"*/}
            {/*           placeholder="Cari aktivitas atau konten yang anda inginkan"/>*/}
            {/*    <div className="absolute right-3 top-1">*/}
            {/*        <MagnifyingGlassIcon width={30} height={30}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>
          <Tab />
        </div>
      </div>
    </>
  )
}

export default HomepageTemplate
