'use client'

import Sidebar from '@/app/components/sidebar'
import Robot from '@/assets/images/robot.webp'
import Catalog from '@/components/catalog'
import { appConfig } from '@/config'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@uidotdev/usehooks'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import { v4 as uuid } from 'uuid'

const getCatalog = async ([search, limit]: [string, number]) => {
  const id = uuid()
  try {
    return (
      await axios.post(`${appConfig.apiUrl}/catalog/homepage`, {
        id,
        query: `artikel atau buku ${search}`,
        context: {
          semantic_ranker: true,
          retrieval_mode: 'text',
          top: limit
        }
      })
    ).data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const HomepageTemplate = () => {
  const [isActive, setIsActive] = useState(true)
  const [search, setSearch] = useState(
    'Karya Ilmiah - Skripsi (S1) - Reference'
  )
  const [tempSearch, setTempSearch] = useState('')
  const [limit, setLimit] = useState(6)
  const [limitInputUser, setLimitInputuser] = useState(limit)
  const size = useWindowSize()

  useEffect(() => {
    if (size.width ?? 0 > 1024) setIsActive(true)
  }, [size])

  const { data: dataTab1, isLoading: isLoadingTab1 } = useSWR(
    [search, limit],
    getCatalog
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempSearch(event.target.value)
  }

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
          'px-6 py-6 ml-0 overflow-y-auto h-screen ',
          isActive ? 'lg:ml-64' : 'lg:ml-0'
        )}
      >
        <div className="w-full">
          <div className="fixed z-[9999] top-7 right-14">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="w-full p-6 text-center text-white lg:p-10 rounded-xl bg-gradient-to-b from-red-600 to-red-700">
            <Image className="w-20 mx-auto" src={Robot} alt="Maskot" />
            <h1 className="my-3 text-2xl font-semibold">
              Mau mulai aktivitas apa hari ini?
            </h1>
            <p className="mb-4 leading-normal lg:px-16">
              Bergabunglah dengan ratusan mahasiswa, dosen dan peneliti untuk
              segera menjawab pertanyaan dan memahami penelitian dengan AI.
            </p>

            <div className="relative flex flex-col mx-auto text-black shadow-xl md:flex-row bg-background rounded-xl lg:w-4/5">
              <select
                className="px-3 py-2 font-sans font-semibold border-r-2 rounded-t-xl md:rounded-tr-none rounded-l-xl basis-1/5 outline-0"
                onChange={event =>
                  setLimitInputuser(+event.currentTarget.value)
                }
                defaultValue="disabledOption"
              >
                <option value="disabledOption" defaultChecked={true} disabled>
                  Total Pencarian Ai
                </option>
                {[3, 6, 9, 12, 15].map(e => (
                  <option key={e} value={e}>
                    {e} Pencarian
                  </option>
                ))}
              </select>
              <div className="relative w-full">
                <input
                  onChange={handleChange}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      setSearch(tempSearch)
                      setLimit(limitInputUser)
                    }
                  }}
                  className="w-full px-3 py-2 focus:outline-0 rounded-b-xl md:rounded-r-xl basis-4/5 "
                  placeholder="Cari aktivitas atau konten yang anda inginkan"
                />
                <button
                  onClick={() => {
                    setSearch(tempSearch)
                    setLimit(limitInputUser)
                  }}
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-600 rounded-lg md:rounded-e-lg border-2 border-white focus:bg-red-600 "
                >
                  <svg
                    className="w-4 h-4 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 text-center">
            <div className="flex items-center justify-center w-full mx-auto bg-white border shadow-xl rounded-xl">
              <Catalog data={dataTab1} isLoading={isLoadingTab1} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomepageTemplate
