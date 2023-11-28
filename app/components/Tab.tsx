"use client"

import TabComponent from '@/components/ui/tab'

const data = [
    {
        id: 'tab1',
        name: 'Rekomendasi Buku',
        content: () => <>Tab 1</>,
        default: true
    },
    {
        id: 'tab2',
        name: 'Tell-US Search',
        content: () => <>Tab 2</>,

    },
    {
        id: 'tab3',
        name: 'Tell-US Summary',
        content: () => <>Tab 3</>,
    },
    {
        id: 'tab4',
        name: 'Tell-US Summary',
        content: () => <>Tab 4</>,
    }
]
const Tab = () => {
    return (
        <TabComponent data={data} />
    );
};

export default Tab;