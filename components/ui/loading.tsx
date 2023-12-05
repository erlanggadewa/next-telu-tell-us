import { ReactNode } from 'react'

function LoadingSectionSpinnerComponent({
  size = 100,
  children
}: {
  size?: number
  children: ReactNode
}) {
  return (
    <div className="z-[9999999]">
      <div className="flex flex-col items-center justify-center h-full gap-4 m-10 ">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="animate-spin"
        >
          <div className="h-full w-full rounded-[50%] border-4 border-b-red-700 border-t-red-500"></div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default LoadingSectionSpinnerComponent
