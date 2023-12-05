import Sidebar from "@/app/components/sidebar";
import Image from "next/image";
import Robot from "@/assets/svg/robot.svg";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import Tab from "@/app/components/Tab";
import Catalog from "@/components/catalog";

const Page = () => {
    return (
        <div className="grid grid-cols-5">
            <Sidebar />
            <div className="container col-span-5 lg:col-span-4 max-h-screen overflow-auto">
                <div className="mt-8 p-10 rounded-xl w-full bg-[#ED1E28] text-white text-center">
                    <Image className="mx-auto" src={Robot} alt="Maskot"/>
                    <h1 className="my-3 text-2xl font-semibold">
                        Mau mulai aktivitas apa hari ini?
                    </h1>
                    <p className="mb-4 px-16 leading-normal">
                        Bergabunglah dengan ratusan mahasiswa, dosen dan peneliti untuk segera menjawab pertanyaan dan
                        memahami penelitian dengan AI.
                    </p>
                    {/*<div className="relative bg-background text-black flex rounded-xl lg:w-4/5 mx-auto shadow-xl">*/}
                    {/*    <select className="rounded-l-xl basis-1/5 py-2 px-3 border-r-2 ">*/}
                    {/*        <option selected disabled>Pencarian Ai anda</option>*/}
                    {/*    </select>*/}
                    {/*    <input className="w-full rounded-r-xl basis-4/5 py-2 px-3"*/}
                    {/*           placeholder="Cari aktivitas atau konten yang anda inginkan"/>*/}
                    {/*    <div className="absolute right-3 top-1">*/}
                    {/*        <MagnifyingGlassIcon width={30} height={30}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <Tab />
            </div>
        </div>
    );
};

export default Page;