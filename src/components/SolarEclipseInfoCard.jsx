import Link from 'next/link'
export function SolarEclipseInfoCard({ info }) {
  return (
    <article className="relative flex justify-between p-3 bg-white border border-gray-200 rounded-lg shadow xl:gap-5 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center gap-5 capitalize dark:text-white mxd:max-w-[150px]">
        <h5 className="text-lg font-bold">Proximo Eclipse Solar </h5>
        <div className="relative h-full my-5 min-h-[150px] min-w-[150px]">
          <img
            src={
              info?.type === 1
                ? 'images/eclipse-solar.jpg'
                : 'images/moonEclipse.webp'
            }
            alt="solar eclipse images"
            className="rounded-full"
            width={150}
            height={150}
          />
        </div>

        <span className="text-lg font-bold ">{info?.elipseType}</span>
      </div>
      <div className="">
        <div className="flex items-center justify-between gap-10 mb-8 xl:gap-5">
          <span className="text-[#6e7884] font-medium">Fecha</span>

          <p className="text-[#a4b0c0] font-medium">{info?.calendar_date}</p>
        </div>
        <div className="flex justify-between gap-10 mb-8 xl:gap-5">
          <span className="text-[#6e7884] font-medium">Hora</span>

          <p className="text-[#a4b0c0] font-semibold">
            {info?.td_of_greatest_eclipse}
          </p>
        </div>
        <div className="flex items-center justify-between gap-10 mb-8 xl:gap-5 ">
          <span className="text-[#6e7884] font-medium">Duración </span>

          <p className="text-[#a4b0c0] font-semibold">{info?.duration}</p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 self-end text-white link-gradient">
        <Link
          href="/moon-phases"
          className="block px-6 py-3 font-semibold uppercase "
        >
          Ver Más
        </Link>
      </div>
    </article>
  )
}
