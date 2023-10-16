'use client'

import { solarEclipseTypesOptions } from '@/assets/constant'
import { EclipseCard } from '@/components/EclipseCard'
import { Loader } from '@/components/Loader/Loader'
import SortSelect from '@/components/SortSelect'
import { useSolarEclipses } from '@/hooks/useSolarEclipses'
import { useState } from 'react'

export default function SolarEclipses() {
  const [filter, setFilter] = useState('')
  // eslint-disable-next-line no-unused-vars
  const { eclipses, error, loading } = useSolarEclipses({ filter })
  const handleSortChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div className="py-5">
      <section className="mx-5 mb-5">
        <h2 className="text-xl font-semibold ">Eclipses Solares</h2>
        <SortSelect
          filter={filter}
          handleSortChange={handleSortChange}
          options={solarEclipseTypesOptions}
          title="Filtrar"
        />
        <h3 className="font-semibold">Totales: {eclipses?.length}</h3>
      </section>

      {loading ? (
        <div className="relative flex w-full min-h-[calc(100vh-80px)]">
          <Loader />
        </div>
      ) : (
        <div className=" justify-center grid gap-5 xl:gap-10 px-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] min-h-[calc(100vh-380px)]">
          {eclipses?.map((eclipse) => {
            return <EclipseCard key={eclipse.seq_num} eclipse={eclipse} />
          })}
        </div>
      )}
    </div>
  )
}
