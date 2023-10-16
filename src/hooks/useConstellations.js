import { useState, useEffect, useCallback } from 'react'
import { getAllConstellations } from '../services/Constellations'

export function useConstellations({ search, sort }) {
  const [constellations, setConstellations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const getConstellations = useCallback(
    async ({ search }) => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllConstellations({ search } || '')
        const sortedData = sortConstellations({ data, sort })
        setConstellations(sortedData)
      } catch (error) {
        setError('Error while fetching constellations')
        setConstellations([])
        console.error('Error while fetching constellations:', error)
      } finally {
        setLoading(false)
      }
    },
    [sort]
  )

  useEffect(() => {
    getConstellations({ search })
  }, [sort, search])

  function sortConstellations({ sort, data }) {
    const sorted = [...data]
    if (!sorted) return []
    if (sort === '' || sort === 'all') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'surface') {
      sorted.sort((a, b) => {
        const surfaceA = parseFloat(
          a.surface
            .match(/posición\s+(\d+(?:,\d+)?)/)?.[1]
            ?.replace(',', '.') || null
        )
        const surfaceB = parseFloat(
          b.surface
            .match(/posición\s+(\d+(?:,\d+)?)/)?.[1]
            ?.replace(',', '.') || null
        )

        return surfaceA - surfaceB
      })
    } else if (sort === 'ngc') {
      sorted.sort((a, b) => parseFloat(b.NGCObjects) - parseFloat(a.NGCObjects))
    } else if (sort === 'caldwell') {
      sorted.sort(
        (a, b) => parseFloat(b.caldwellObjects) - parseFloat(a.caldwellObjects)
      )
    }
    return sorted
  }
  return {
    constellations,
    loading,
    error,
    getConstellations,
  }
}
