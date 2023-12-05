import LogoSystem from '@/assets/svg/system.svg'
import Image from 'next/image'
import Link from 'next/link'

function CardCatalogComponent(data: {
  judul: string
  subjek: string
  author: string
  jeniskatalog: number
  tahunterbit: number
  publisher_name: string
  publisher_city: string
  link: string
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link target="_blank" href="#">
        <Image src={LogoSystem} alt={data.judul} className="p-6 rounded w-28" />

        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </Link>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.judul}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.author}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.jeniskatalog}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.subjek}
        </p>
        <a
          href={data.link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default CardCatalogComponent
