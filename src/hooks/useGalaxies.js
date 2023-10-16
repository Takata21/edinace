import { useState, useEffect } from 'react'
import { getAllGalaxies } from '../services/Galaxies'

export function useGalaxies({ search }) {
  const [galaxies, setGalaxies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const getGalaxies = async ({ search }) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllGalaxies({ search } || '')
      setGalaxies(data)
    } catch (error) {
      setError('Error while fetching Galaxies')
      setGalaxies([])
      console.error('Error while fetching Galaxies:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getGalaxies({ search })
  }, [search])

  return {
    galaxies,
    loading,
    error,
    getGalaxies,
  }
}
