import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import LogoSystem from "@/assets/svg/system.svg";
import Image from "next/image";

type CatalogDataType = {
    judul: string,
    subjek: string,
    author: string,
    jeniskatalog: number,
    tahunterbit: number,
    publisher_name: string,
    publisher_city: string,
    link: string
}

export type CatalogType = {
    category: string,
    data: CatalogDataType[]
}

const Card = ({data}: {
    data: {
        judul: string,
        subjek: string,
        author: string,
        jeniskatalog: number,
        tahunterbit: number,
        publisher_name: string,
        publisher_city: string,
        link: string
    }
}) => {
    const {judul, author, subjek, jeniskatalog, link, publisher_city, publisher_name, tahunterbit} = data
    return <Link target="_blank" href={link}
                 className="flex items-center justify-center lg:w-[32%] border rounded px-4 py-3 gap-3">
        <Image src={LogoSystem} alt={judul} className="w-28 bg-red-800 p-6 rounded"/>
        <div className="w-full space-y-1">
            <h4 className="uppercase font-semibold tex-md">{subjek}</h4>
            <h5 className="text-sm font-semibold">{jeniskatalog}</h5>
            <p className="text-xs">{author}</p>
            <p className="text-xs">{publisher_name} ({tahunterbit})</p>
        </div>
    </Link>
}

const Catalog = ({data, isLoading}: { data: CatalogType[], isLoading: boolean }) => {
    return (
        <div className="w-full container space-y-4 py-6">
            <h2 className="uppercase text-2xl font-bold mt-6">Rekomendasi untuk anda</h2>
            <p className="text-muted-foreground">Rekomendasi buku tugas akhir yang paling disukai</p>
            <Separator className="bg-muted-foreground w-full"/>
            <div className="text-left">
                {data?.map((e) =>
                    <div key={e.category} className="mt-5">
                        <h3 className="text-xl font-bold uppercase">{e.category}</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {e.data.map((e2: any) =>
                                <Card key={e2.category} data={e2}/>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;