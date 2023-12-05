import React from 'react';

const LoadingPage = ({ size = 100 }: { size?: number }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] h-screen w-screen bg-white">
            <div className="flex h-full items-center justify-center">
                <div
                    style={{ width: `${size}px`, height: `${size}px` }}
                    className="animate-spin"
                >
                    <div className="h-full w-full rounded-[50%] border-4 border-b-red-700 border-t-red-500"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;