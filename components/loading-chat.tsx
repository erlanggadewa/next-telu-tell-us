import LoadingGif from '@/assets/gif/loading.gif'
import Image from 'next/image'

const LoadingChatComponent = () => {
  return <Image className="w-44" src={LoadingGif} alt="loading..." />
}

export default LoadingChatComponent
