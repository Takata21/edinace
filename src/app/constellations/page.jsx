'use client'
import { ConstellationFilterOptions } from '@/assets/constant'
import { ConstellationCard } from '@/components/ConstellationCard'
import { Loader } from '@/components/Loader/Loader'
import SearchForm from '@/components/SearchForm'
import SortSelect from '@/components/SortSelect'
import { useConstellations } from '@/hooks/useConstellations'
import { useSearch } from '@/hooks/useSearch'
import debounce from 'just-debounce-it'
import { useState, useCallback } from 'react'
export default function Constellations() {
  const [sort, setSort] = useState('')
  // eslint-disable-next-line no-unused-vars
  const { searchError, search, setSearch } = useSearch()
  const { constellations, loading, getConstellations } = useConstellations({
    search,
    sort,
  })

  const debounceGetConstellations = useCallback(
    debounce((search) => {
      getConstellations({ search })
    }, 300),
    [getConstellations]
  )
  const handleSortChange = (event) => {
    setSort(event.target.value)
    getConstellations({ search })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    getConstellations({ search })
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetConstellations(newSearch)
  }

  return (
    <div className="p-5">
      <section className="">
        <SearchForm
          search={search}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchError={searchError}
        />
        <SortSelect
          filter={sort}
          handleSortChange={handleSortChange}
          options={ConstellationFilterOptions}
        />
      </section>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center justify-center w-full min-h-screen gap-5  dark:bg-[#18202b]"
        data-test-id="constellations"
      >
        {loading ? (
          <div className="relative h-full">
            <Loader />
          </div>
        ) : constellations?.length > 0 ? (
          constellations.map((constellation) => (
            <ConstellationCard
              key={constellation.id}
              constellation={constellation.name}
              id={constellation.id}
            />
          ))
        ) : (
          <h2 className="flex justify-center w-full mx- col-span-full">
            No hay resultados para su búsqueda
          </h2>
        )}
      </div>
    </div>
  )
}
