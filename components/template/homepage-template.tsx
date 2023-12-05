"use client"

import Sidebar from "@/app/components/sidebar";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import Robot from "@/assets/svg/robot.svg";
import {useState} from "react";
import {cn} from "@/lib/utils";
import Tab from "@/app/components/Tab";

const HomepageTemplate = () => {
    const [isActive, setIsActive] = useState(true)
    return (
        <>
            <div className={cn("z-50 w-64 fixed top-0 left-0 bottom-0 hidden h-screen", isActive ? 'lg:block' : 'lg:hidden block')}>
                <Sidebar/>
            </div>
            <div className={cn("px-6 mb-4 ml-0 overflow-y-auto", isActive ? 'lg:ml-64' : 'lg:ml-0 translate-x-64')}>
                <div className="w-full">
                    <button className="px-2 py-3 rounded mt-1" onClick={() => setIsActive(!isActive)}>
                        <HamburgerMenuIcon/>
                    </button>
                    <div className="lg:mt-3 lg:p-10 p-6 rounded-xl w-full bg-[#ED1E28] text-white text-center">
                        <Image className="mx-auto" src={Robot} alt="Maskot"/>
                        <h1 className="my-3 text-2xl font-semibold">
                            Mau mulai aktivitas apa hari ini?
                        </h1>
                        <p className="mb-4 lg:px-16 leading-normal">
                            Bergabunglah dengan ratusan mahasiswa, dosen dan peneliti untuk segera menjawab pertanyaan
                            dan
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
                    <Tab/>
                </div>
            </div>
        </>
    );
};

export default HomepageTemplate;