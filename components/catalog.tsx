'use client'

import OwlImg from '@/assets/images/owl.png'

import Image from 'next/image'
import Link from 'next/link'
import SkeletonCardComponent from './skeleton-card'

export type CatalogDataType = {
  judul: string
  subjek: string
  author: string
  jeniskatalog: number
  tahunterbit: number
  publisher_name: string
  publisher_city: string
  link: string
}

export type CatalogType = {
  category: string
  data: CatalogDataType[]
}

const Card = ({
  data
}: {
  data: {
    judul: string
    subjek: string
    author: string
    jeniskatalog: number
    tahunterbit: number
    publisher_name: string
    publisher_city: string
    link: string
  }
}) => {
  const {
    judul,
    author,
    subjek,
    jeniskatalog,
    link,
    publisher_city,
    publisher_name,
    tahunterbit
  } = data
  return (
    <div className="flex flex-col items-stretch justify-between h-full text-gray-700 bg-gray-100 shadow-md ring ring-gray-300 bg-clip-border rounded-xl">
      <div>
        <div className="relative mx-4 mt-4 overflow-hidden text-white bg-white shadow-lg bg-clip-border rounded-xl shadow-gray-500/40">
          <Image
            src={OwlImg}
            alt={judul}
            className="max-w-[9rem] m-auto p-6 rounded"
          />
        </div>
        <div className="flex flex-col justify-between px-6 mt-6 ">
          <p className="block font-sans text-base antialiased font-bold leading-snug tracking-normal capitalize ">
            {subjek.toLowerCase()}
          </p>

          <p className="block mt-2 font-sans text-base antialiased font-semibold leading-relaxed capitalize text-inherit ">
            {judul.toLowerCase()}
          </p>
          <p className="block mt-2 font-sans text-sm antialiased leading-relaxed capitalize text-inherit ">
            {author.toLowerCase()} ({tahunterbit})
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 mt-4">
        <Link target="_blank" href={link} className="">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-500 text-white shadow-md shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            More Detail
          </button>
        </Link>
      </div>
    </div>
  )
}

const Catalog = ({
  data,
  isLoading
}: {
  data: CatalogDataType[]
  isLoading: boolean
}) => {
  return (
    <div className="container w-full py-6 space-y-4">
      <div className="mt-4 mb-8">
        <h2 className="text-2xl font-bold uppercase ">
          Rekomendasi untuk anda
        </h2>
        <p className="font-semibold text-gray-600">
          Rekomendasi bacaan di Open Library Telkom University yang dapat anda
          baca
        </p>
      </div>
      {/* <Separator className="w-full bg-gray-300 " /> */}
      <div className="grid gap-3 text-left md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {!isLoading
          ? data?.map(e => <Card data={e} key={e.judul} />)
          : new Array(3)
              .fill(null)
              .map((e, i) => <SkeletonCardComponent key={i} />)}
      </div>
    </div>
  )
}

export default Catalog
