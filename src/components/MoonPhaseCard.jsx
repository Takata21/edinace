import { fetchMoonPhases } from '@/services/Moon'
import { convertAge, getLunarPhaseDescription } from '@/utils/astronomyUtils'
import Link from 'next/link'
export async function MoonPhaseCard() {
  const moon = await fetchMoonPhases()
  const phase = getLunarPhaseDescription(moon.age)
  const { days, hours, minutes } = convertAge(moon.age)

  return (
    <article className="relative flex justify-between p-3 bg-white border border-gray-200 rounded-lg shadow xl:gap-5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center gap-5 capitalize dark:text-white">
        <h5 className="text-xl font-bold">Fase lunar</h5>
        <div className="relative h-full my-5 min-h-[150px] min-w-[150px]">
          <img
            src={`images/moon/${phase.en.replace(/\s+/g, '')}.png`}
            alt={moon?.image.alt_text}
            width={150}
            height={150}
          />
        </div>

        <span className="text-lg font-bold">{phase.es}</span>
      </div>
      <div className="">
        <div className="flex items-center justify-between gap-10 mb-8 xl:gap-5">
          <span className="text-[#6e7884] font-medium">Ángulo</span>

          <p className="text-[#a4b0c0] font-semibold">{moon?.posangle}°</p>
        </div>

        <div className="flex justify-between gap-10 mb-8 xl:gap-5">
          <span className="text-[#6e7884] font-medium">Fase</span>

          <p className="text-[#a4b0c0] font-semibold">{moon?.phase} %</p>
        </div>
        <div className="flex items-center justify-between gap-10 mb-8 xl:gap-5 ">
          <span className="text-[#6e7884] font-medium">Edad </span>

          <p className="text-[#a4b0c0] font-semibold">{`${days}d ${hours}h ${minutes}m`}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 self-end text-white link-gradient">
        <Link
          href="/moon-phases"
          className="block px-6 py-3 font-semibold uppercase"
        >
          Ver Más
        </Link>
      </div>
    </article>
  )
}
