"use client"

import {Root, Trigger, List, Content} from "@radix-ui/react-tabs";
import {Separator} from "@/components/ui/separator";
import TabStyle from '@/assets/css/Tab.module.css'
import {createElement, FunctionComponent, ReactNode} from "react";
import {cn} from "@/lib/utils";

type TabProps = {
    id: string|number,
    name: string,
    content: FunctionComponent,
    default?: boolean
}
const Tab = ({data}: { data: TabProps[] }) => {
    const tabDefault = data.find(tab => tab.default)?.id
    return (
        <Root defaultValue={""+tabDefault} className="mt-4 text-center w-full">
            <List className="bg-white flex rounded-xl shadow-xl border justify-center items-center w-fit mx-auto">
                {data.map((tab, index) => (<>
                        <Trigger value={""+tab.id}
                                 key={index}
                                 className={cn(
                                     TabStyle.TabsTrigger,
                                     index === 0 ? 'rounded-l-xl' : '',
                                     index === data.length - 1 ? 'rounded-r-xl' : ''
                                 )}>{tab.name}</Trigger>
                        {index !== data.length - 1 && <Separator orientation="vertical" className="h-5"/>}
                    </>
                ))}
            </List>
            {data.map((tab, index) => (
                <Content className="w-full border rounded-xl mt-4 shadow-xl mb-6" value={""+tab.id} key={tab.id}>
                    {createElement(tab.content)}
                </Content>
            ))}
        </Root>
    );
};

export default Tab;