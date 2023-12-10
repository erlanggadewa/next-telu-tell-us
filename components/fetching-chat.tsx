import TellUsIcon from '@/assets/svg/system.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { VscBook } from 'react-icons/vsc'
import LoadingDotComponent from './loading-dot'

function FetchingChatComponent({ isFetching }: { isFetching: boolean }) {
  return (
    <>
      <div
        className={cn(
          'group relative mb-4 flex items-start max-w-xl 2xl:-ml-12'
        )}
      >
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow bg-white p-1'
          )}
        >
          <Image src={TellUsIcon} alt="Tell Us Icon" />
        </div>
        <div
          className={cn(
            'flex flex-col px-1 space-y-2 overflow-hidden ml-3  justify-center'
          )}
        >
          {isFetching && (
            <p className="font-semibold text-gray-700 animate-fade animate-infinite animate-ease-out animate-alternate-reverse">
              <div className="flex items-center justify-center gap-2 px-2 py-1 font-sans text-sm font-semibold text-blue-900 uppercase rounded-md select-none whitespace-nowrap bg-blue-500/20">
                <VscBook className="w-5 h-5" />
                <span className="text-center">Mencari Informasi</span>
              </div>
            </p>
          )}
          {isFetching && <LoadingDotComponent />}
        </div>
      </div>
    </>
  )
}

export default FetchingChatComponent
