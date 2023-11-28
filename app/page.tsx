import React from 'react';
import Sidebar from "@/app/components/sidebar";

const Page = () => {
    return (
        <div className="grid grid-cols-5">
            <Sidebar/>
            <div className="col-span-4"></div>
        </div>
    );
};

export default Page;