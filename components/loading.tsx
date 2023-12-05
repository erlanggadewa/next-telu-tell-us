import LoadingGif from '@/assets/gif/loading.gif';
import Image from "next/image";

const Loading = () => {
    return (
        <Image className="w-48" src={LoadingGif} alt="loading..."/>
    );
};

export default Loading;