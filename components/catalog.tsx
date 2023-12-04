import axios from "axios";
import {appConfig} from "@/config";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {v4 as uuid} from "uuid";

const getCatalog = async (category: string) => {
    const id = uuid()
    try {
        return (await axios.post(`${appConfig.apiUrl}/catalog/homepage`, {
            id,
            query: `artikel atau buku ${category}`,
            context: {
                retrieval_mode: 'text',
                top: 3,
            }
        })).data;
    } catch (error: any) {
        throw new Error(error.message);
    }
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
                 className="flex items-center justify-center lg:w-[32%] border rounded px-6 py-3 gap-3">
        <img className="basis-1/3 w-full bg-red-800" src="/" alt={judul}/>
        <div className="basis-2/3 space-y-1">
            <h4 className="uppercase font-semibold tex-md">{subjek}</h4>
            <h5 className="text-sm font-semibold">{jeniskatalog}</h5>
            <p className="text-xs">{author}</p>
            <p className="text-xs">{publisher_name} ({tahunterbit})</p>
        </div>
    </Link>
}

const Catalog = async () => {
    const data = await Promise.all([
        {
            category: 'Teknologi',
            data: await getCatalog('Teknologi'),
        }, {
            category: 'Bisnis',
            data: await getCatalog('Bisnis'),
        }
    ])
    return (
        <div className="w-full container space-y-4 py-6">
            <h2 className="uppercase text-2xl font-bold mt-6">a</h2>
            <p className="text-muted-foreground">b</p>
            <Separator className="bg-muted-foreground w-full"/>
            <div className="text-left">
                {data.map((e) =>
                    <div key={e.category} className="mt-5">
                        <h3 className="text-xl font-bold uppercase">{e.category}</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {e.data?.map((e2: any) =>
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