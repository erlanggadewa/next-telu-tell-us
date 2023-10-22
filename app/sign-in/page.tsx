import {Metadata} from "next";
import Image from "next/image";
import {UserAuthForm} from "@/components/user-auth-form";
import {redirect} from "next/navigation";
import { auth } from '@/auth'

import PutiImage from "../../assets/images/puti.png";
import TellUs from "../../assets/images/tell-us.png";
import Vector from "../../assets/images/vector.png";
import Ellipse from "../../assets/images/ellipse.png";
import GedungRektorat from "../../assets/images/gedung-rektorat.png";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication.",
};

export default async function AuthenticationPage() {
    const session = await auth()
    if (session?.user) {
        redirect('/')
    }
    return (
        <div
            className="container h-screen md:grid lg:max-w-none lg:grid-cols-5 lg:px-0 lg:bg-gradient-to-b lg:from-[#ED1E28] lg:to-red-900">
            <div
                className="absolute inset-0 hidden lg:block w-full h-full opacity-10 bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url(${GedungRektorat.src})`,
                }}
            />

            <div
                className="h-screen flex justify-between items-center flex-col col-span-2 lg:bg-white lg:rounded-tr-[45px] lg:drop-shadow-2xl">
                <div/>
                <div className="mx-auto flex flex-col sm:w-[500px] lg:w-[400px] space-y-6">
                    <div className="flex flex-col space-y-10 ">
                        <h1 className="text-4xl font-semibold md:font-bold tracking-tight">
                            Halo Telutizen!
                            <br/>
                            Selamat Datang
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Single Sign On <span className="font-bold">(SSO)</span> login
                        </p>
                    </div>
                    <UserAuthForm/>
                </div>
                <footer className="flex flex-col md:flex-row items-center mb-10">
                    Powered By: <Image className="md:ml-3 mt-4 md:mt-0" src={PutiImage}
                                       alt="Direktorat Pusat Teknologi Informasi Universitas Telkom"/>
                </footer>
            </div>

            <div
                className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex lg:items-center lg:justify-center col-span-3">
                <div className="text-center space-y-6 z-10">
                    <Image className="m-auto" src={TellUs} alt="logo tell-us" width={350}/>
                    <h3 className="text-xl italic">Your gateway to academic excellence</h3>
                </div>
                <div className="absolute w-full h-full inset-0">
                    <Image className="absolute top-8 left-8" src={Vector} alt="vector"/>
                    <Image className="absolute top-0 right-0" src={Ellipse} alt="vector" width={75}/>
                    <Image className="absolute bottom-8 right-8" src={Vector} alt="vector"/>
                </div>
            </div>
        </div>
    );
}
