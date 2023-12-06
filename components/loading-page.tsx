import Mascot from '@/assets/images/mascot.webp'

import Image from 'next/image'
import LoadingDotComponent from './loading-dot'

function LoadingFullComponent({ size = 100 }: { size?: number }) {
  return (
    // <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] h-screen w-screen bg-transparent">
    //   <div className="flex items-center justify-center h-full">
    //     <div
    //       style={{ width: `${size}px`, height: `${size}px` }}
    //       className="animate-spin"
    //     >
    //       <div className="h-full w-full rounded-[50%] border-4 border-b-red-700 border-t-red-500"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] h-screen w-screen bg-white">
      <div className="flex flex-col items-center justify-center h-full">
        <Image className="w-24 mx-auto " src={Mascot} alt="Maskot" />
        <LoadingDotComponent widthAndHeightClass="w-6 h-6" />
      </div>
    </div>
  )
}

export default LoadingFullComponent
