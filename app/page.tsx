import Tab from '@/app/components/Tab'
import Sidebar from '@/app/components/sidebar'
import Robot from '@/assets/svg/robot.svg'
import Image from 'next/image'

const Page = () => {
  return (
    <div className="grid grid-cols-5">
      <Sidebar />
      <div className="container max-h-screen col-span-5 overflow-auto lg:col-span-4">
        <div className="w-full p-10 mt-8 text-center text-white bg-gradient-to-b from-red-600 to-red-700 rounded-xl">
          <Image className="mx-auto" src={Robot} alt="Maskot" />
          <h1 className="my-3 text-2xl font-semibold">
            Mau mulai aktivitas apa hari ini?
          </h1>
          <p className="px-16 mb-4 font-medium leading-normal">
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
  )
}

export default Page
