import Mascot from '@/assets/images/mascot.webp'
import Image from 'next/image'
import LoadingDotComponent from './loading-dot'

function LoadingSectionMaskotComponent({ size = 100 }: { size?: number }) {
  return (
    <div className="z-[9999999]">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="flex flex-col items-center justify-center h-full gap-4 m-10 "
      >
        <Image className="w-24 mx-auto" src={Mascot} alt="Maskot" />
        <LoadingDotComponent widthAndHeightClass="w-6 h-6" />
      </div>
    </div>
  )
}

export default LoadingSectionMaskotComponent
