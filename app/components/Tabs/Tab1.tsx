import React from 'react';
import {Separator} from "@/components/ui/separator";

const data = [
    {
        category: 'teknologi',
        data: [
            {
                title: 'KriDela: Mengembangkan Aplikai Jual Beli Kriya di Desa Oebola Dalam NTT Berbasis Web',
                author: 'Annisa Ayu Nurarifa',
                type: 'Proyek Akhir',
                studyProgram: 'D3 Rekayasa Perangkat Lunak Aplikasi',
                classOf: 2020,
                category: 'Bisnis Teknologi'
            },
            {
                title: 'Pengembangan Model Problem Investigate Based Learning pada Mata Kuliah Data Mining',
                author: 'Zayed Marwan',
                type: 'Disertasi',
                studyProgram: 'S3 Informatika',
                classOf: 2019,
                category: 'Pendidikan Teknologi'
            },
            {
                title: 'ByTani: Merancang dan Membangun Aplikasi Jual Beli Hasil Tani Berbasis Web',
                author: 'ByTani Tim',
                type: 'Skripsi',
                studyProgram: 'D3 Rekayasa Perangkat Lunak Aplikasi',
                classOf: 2020,
                category: 'Teknologi'
            },
        ],
    },
    {
        category: 'bisnis',
        data: [
            {
                title: 'KriDela: Mengembangkan Aplikai Jual Beli Kriya di Desa Oebola Dalam NTT Berbasis Web',
                author: 'Annisa Ayu Nurarifa',
                type: 'Proyek Akhir',
                studyProgram: 'D3 Rekayasa Perangkat Lunak Aplikasi',
                classOf: 2020,
                category: 'Bisnis Teknologi'
            },
            {
                title: 'Pengembangan Model Problem Investigate Based Learning pada Mata Kuliah Data Mining',
                author: 'Zayed Marwan',
                type: 'Disertasi',
                studyProgram: 'S3 Informatika',
                classOf: 2019,
                category: 'Pendidikan Teknologi'
            },
            {
                title: 'ByTani: Merancang dan Membangun Aplikasi Jual Beli Hasil Tani Berbasis Web',
                author: 'ByTani Tim',
                type: 'Skripsi',
                studyProgram: 'D3 Rekayasa Perangkat Lunak Aplikasi',
                classOf: 2020,
                category: 'Teknologi'
            }
        ],
    },
]


const Card = ({data}: {
    data: {
        title: string,
        type: string,
        author: string,
        classOf: number,
        category: string,
        studyProgram: string
    }
}) => {
    const {title, author, classOf, studyProgram, category, type} = data
    return <div className="flex items-center justify-center lg:w-[32%] border rounded px-6 py-3 gap-3">
        <img className="basis-1/3 w-full bg-red-800" src="/" alt={title}/>
        <div className="basis-2/3 space-y-1">
            <h4 className="uppercase font-semibold tex-md">{type}</h4>
            <h5 className="text-sm font-semibold">{category}</h5>
            <p className="text-sm font-bold">{title}</p>
            <p className="text-xs">{author}</p>
            <p className="text-xs">{studyProgram} ({classOf})</p>
        </div>
    </div>
}

const Tab1 = ({title, subTitle}: {
    title: string,
    subTitle: string,
}) => {
    return (
        <div className="w-full container space-y-4 py-6">
            <h2 className="uppercase text-2xl font-bold mt-6">{title}</h2>
            <p className="text-muted-foreground">{subTitle}</p>
            <Separator className="bg-muted-foreground w-full"/>
            <div className="text-left">
                {data.map((e, index) =>
                    <div key={index} className="mt-5">
                        <h3 className="text-xl font-bold uppercase">{e.category}</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {e.data.map((e2, index2) => <Card key={index2} data={e2}/>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tab1;