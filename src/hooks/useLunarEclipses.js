import { useState, useEffect } from 'react'
import { getAllLunarEclipses } from '../services/LunarEclipses'
import {
  LUNAR_ECLIPSE_PENUMBRAL,
  LUNAR_ECLIPSE_PARCIAL,
  LUNAR_ECLIPSE_TOTAL,
} from '../assets/constant'
export function useLunarEclipses({ filter }) {
  const [eclipses, setEclipses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const getEclipses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllLunarEclipses()
      const sortedData = filterEclipses({ data, filter })
      setEclipses(sortedData)
    } catch (error) {
      setError('Error while fetching lunar eclipses')
      setEclipses([])
      console.error('Error while fetching lunar eclipses:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getEclipses()
  }, [filter])
  const filterEclipses = ({ filter, data }) => {
    let filtered = [...data] // Crea una copia del array data

    if (!filtered) return []

    if (filter === LUNAR_ECLIPSE_PENUMBRAL) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === LUNAR_ECLIPSE_PENUMBRAL
      )
    } else if (filter === LUNAR_ECLIPSE_PARCIAL) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === LUNAR_ECLIPSE_PARCIAL
      )
    } else if (filter === LUNAR_ECLIPSE_TOTAL) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === LUNAR_ECLIPSE_TOTAL
      )
    }

    return filtered
  }

  return {
    eclipses,
    loading,
    error,
  }
}
