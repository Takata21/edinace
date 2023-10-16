'use client'

import { GalaxiesCard } from '@/components/GalaxiesCard'
import { Loader } from '@/components/Loader/Loader'
import SearchForm from '@/components/SearchForm'
import { useGalaxies } from '@/hooks/useGalaxies'
import { useSearch } from '@/hooks/useSearch'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

export default function Galaxies() {
  const { search, searchError, setSearch } = useSearch()
  const { getGalaxies, galaxies, loading } = useGalaxies({ search })

  const debounceGetConstellations = useCallback(
    debounce((search) => {
      getGalaxies({ search })
    }, 300),
    [getGalaxies]
  )
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetConstellations(newSearch)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    getGalaxies({ search })
  }
  return (
    <div className="p-5">
      <section>
        <SearchForm
          search={search}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchError={searchError}
        />
      </section>
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center justify-center w-full min-h-screen gap-5 p-5 dark:bg-[#18202b]"
        data-test-id="galaxies"
      >
        {loading ? (
          <div className="relative h-full">
            <Loader />
          </div>
        ) : galaxies?.length > 0 ? (
          galaxies.map((galaxy) => (
            <GalaxiesCard
              key={galaxy.id}
              galaxy={galaxy.galaxy.original}
              id={galaxy.id}
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
