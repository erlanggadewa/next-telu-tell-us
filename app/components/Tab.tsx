"use client"

import TabComponent from '@/components/ui/tab'
import Tab1 from "@/app/components/Tabs/Tab1";

const data = [
    {
        id: 1,
        name: 'Rekomendasi Buku',
        content: () => <Tab1 title='Rekomendasi Untuk Anda' subTitle="Rekomendasi buku tugas akhir paling disukai"/>,
        default: true
    },
    {
        id: 2,
        name: 'Tell-US Search',
        content: () => <Tab1 title='Rekomendasi Untuk Anda' subTitle="Rekomendasi buku tugas akhir paling disukai"/>,
    },
    {
        id: 3,
        name: 'Tell-US Summary',
        content: () => <Tab1 title='Rekomendasi Untuk Anda' subTitle="Rekomendasi buku tugas akhir paling disukai"/>,
    },
]
const Tab = () => {
    return (
        <TabComponent data={data} />
    );
};

export default Tab;