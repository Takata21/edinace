import Link from 'next/link'
import { useState } from 'react'
import { CardSkeleton } from '@/components/CardSkeleton'
export function ConstellationCard({ constellation, id }) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <Link
      href={`./${constellation.toLowerCase().replace(/\s+/g, '-')}?id=${id}`}
      className="h-56 group xl:flex-grow"
    >
      <div className="relative h-full font-semibold tracking-wider text-white uppercase font-Bellefair">
        {isLoading && <CardSkeleton />}
        <img
          src={`/images/constellations/${constellation}.webp`}
          alt={`${constellation} constellation`}
          loading="lazy"
          className="w-full h-full"
          onLoad={() => setIsLoading((prev) => !prev)}
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center m-auto text-xl transition duration-500 ease-in group-hover:bg-black/50">
          <h5 className="transition duration-500 ease-in group-hover:scale-150 font-Bellefair">
            {!isLoading && constellation}
          </h5>
        </div>
      </div>
    </Link>
  )
}
