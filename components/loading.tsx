import LoadingGif from '@/assets/gif/loading.gif'
import Image from 'next/image'

const Loading = () => {
  return <Image className="w-44" src={LoadingGif} alt="loading..." />
}

export default Loading
