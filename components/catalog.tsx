'use client'

import LogoSystem from '@/assets/svg/system.svg'
import LoadingSectionComponent from '@/components/ui/loading'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

type CatalogDataType = {
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
    <Link
      target="_blank"
      href={link}
      className="flex items-center justify-center w-full gap-3 px-4 py-3 border rounded"
    >
      <Image src={LogoSystem} alt={judul} className="p-6 rounded w-28" />
      <div className="w-full space-y-1">
        <h4 className="font-semibold uppercase tex-md">{subjek}</h4>
        <h5 className="text-sm font-semibold">{jeniskatalog}</h5>
        <p className="text-xs">{author}</p>
        <p className="text-xs">
          {publisher_name} ({tahunterbit})
        </p>
      </div>
    </Link>
  )
}

const Catalog = ({
  data,
  isLoading
}: {
  data: CatalogType[]
  isLoading: boolean
}) => {
  return !isLoading ? (
    <div className="container w-full py-6 space-y-4">
      <div className="mt-4 mb-8">
        <h2 className="text-2xl font-bold uppercase ">
          Rekomendasi untuk anda
        </h2>
        <p className="font-semibold text-gray-600">
          Rekomendasi buku tugas akhir yang paling disukai
        </p>
      </div>
      <Separator className="w-full bg-gray-300 " />
      <div className="text-left">
        {data?.map(e => (
          <div key={e.category} className="mt-5">
            <h3 className="text-xl font-bold uppercase">{e.category}</h3>
            <div className="grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3">
              {e.data.map((e2: any) => (
                <Card key={e2.category} data={e2} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <LoadingSectionComponent>Loading...</LoadingSectionComponent>
  )
}

export default Catalog
