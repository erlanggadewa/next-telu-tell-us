import { cn } from '@/lib/utils'

function LoadingDotComponent({
  widthAndHeightClass
}: {
  widthAndHeightClass?: string
}) {
  return (
    <div className="loading-screen">
      <div
        className={cn('w-full h-full dot', widthAndHeightClass ?? 'w-4 h-4')}
      ></div>
      <div
        className={cn('w-full h-full dot', widthAndHeightClass ?? 'w-4 h-4')}
      ></div>
      <div
        className={cn('w-full h-full dot', widthAndHeightClass ?? 'w-4 h-4')}
      ></div>
      <div
        className={cn('w-full h-full dot', widthAndHeightClass ?? 'w-4 h-4')}
      ></div>
      <div
        className={cn('w-full h-full dot', widthAndHeightClass ?? `w-4 h-4`)}
      ></div>
    </div>
  )
}

export default LoadingDotComponent
