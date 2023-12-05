'use client'

import Catalog, { CatalogType } from '@/components/catalog'
import { appConfig } from '@/config'
import axios from 'axios'
import useSWR from 'swr'
import { v4 as uuid } from 'uuid'

const getCatalog = async (category: string) => {
  const id = uuid()
  try {
    return (
      await axios.post(`${appConfig.apiUrl}/catalog/homepage`, {
        id,
        query: `artikel atau buku ${category}`,
        context: {
          retrieval_mode: 'text',
          top: 3
        }
      })
    ).data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const Tab = () => {
  const { data: dataTab1, isLoading: isLoadingTab1 } = useSWR(
    'catalog1',
    async () =>
      Promise.all([
        {
          category: 'Teknologi',
          data: await getCatalog('Teknologi')
        },
        {
          category: 'Bisnis',
          data: await getCatalog('Bisnis')
        }
      ])
  ) as { data: CatalogType[]; isLoading: boolean }
  // const {data: dataTab2, isLoading: isLoadingTab2} = useSWR('catalog2',
  //     async () => Promise.all([
  //         {
  //             category: 'Akuntansi',
  //             data: await getCatalog('Akuntansi')
  //         },
  //         {
  //             category: 'Sosial',
  //             data: await getCatalog('Sosial')
  //         }
  //     ])) as { data: CatalogType[], isLoading: boolean }
  // const {data: dataTab3, isLoading: isLoadingTab3} = useSWR('catalog3',
  //     async () => Promise.all([
  //         {
  //             category: 'Budaya',
  //             data: await getCatalog('Budaya')
  //         },
  //         {
  //             category: 'Politik',
  //             data: await getCatalog('Politik')
  //         }
  //     ])) as { data: CatalogType[], isLoading: boolean }
  return (
    <div className="w-full mt-4 text-center">
      <div className="flex items-center justify-center w-full mx-auto bg-white border shadow-xl rounded-xl">
        <Catalog data={dataTab1} isLoading={isLoadingTab1} />
      </div>
    </div>
    // <TabComponent data={[
    //     {
    //         id: 'catalog',
    //         name: 'Rekomendasi Buku',
    //         content: <Catalog data={dataTab1} isLoading={isLoadingTab1}/>,
    //         default: true
    //     },
    //     {
    //         id: 2,
    //         name: 'Tell-US Search',
    //         content: <Catalog data={dataTab2} isLoading={isLoadingTab2}/>,
    //     },
    //     {
    //         id: 3,
    //         name: 'Tell-US Summary',
    //         content: <Catalog data={dataTab3} isLoading={isLoadingTab3}/>,
    //     },
    // ]}/>
  )
}

export default Tab
