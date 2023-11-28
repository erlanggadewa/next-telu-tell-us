"use client"

import {Root, Trigger, List, Content} from "@radix-ui/react-tabs";
import {Separator} from "@/components/ui/separator";
import '@/assets/css/tab.css'
import {createElement} from "react";
import {cn} from "@/lib/utils";

type TabProps = {
    id: string,
    name: string,
    content: () => JSX.Element,
    default?: boolean
}
const Tab = ({data}: { data: TabProps[] }) => {
    return (
        <Root defaultValue={data.find(tab => tab.default)?.id} className="mt-4 mx-auto text-center w-fit">
            <List className="bg-white flex rounded-xl shadow-xl border justify-center items-center">
                {data.map((tab, index) => (<>
                        <Trigger value={tab.id}
                                 key={index}
                                 className={cn("TabsTrigger px-6 py-1 font-semibold",
                                     index === 0 ? 'rounded-l-xl' : '',
                                     index === data.length - 1 ? 'rounded-r-xl' : ''
                                 )}>{tab.name}</Trigger>
                        {index !== data.length - 1 && <Separator orientation="vertical" className="h-5"/>}
                    </>
                ))}
            </List>
            {data.map((tab, index) => (
                <Content value={tab.id} key={index}>
                    {createElement(tab.content)}
                </Content>
            ))}
        </Root>
    );
};

export default Tab;