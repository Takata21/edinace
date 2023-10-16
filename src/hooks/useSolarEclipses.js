import { useState, useEffect } from 'react'
import { getAllSolarEclipses } from '../services/SolarEclipses'
import {
  SOLAR_ECLIPSE_PARTIAL,
  SOLAR_ECLIPSE_ANNULAR,
  SOLAR_ECLIPSE_TOTAL,
  SOLAR_ECLIPSE_HYBRID,
} from '../assets/constant'
export function useSolarEclipses({ filter }) {
  const [eclipses, setEclipses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const getEclipses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllSolarEclipses()
      const sortedData = filterEclipses({ data, filter })
      setEclipses(sortedData)
    } catch (error) {
      setError('Error while fetching solar eclipses')
      setEclipses([])
      console.error('Error while fetching solar eclipses:', error)
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

    if (filter === SOLAR_ECLIPSE_PARTIAL) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === SOLAR_ECLIPSE_PARTIAL
      )
    } else if (filter === SOLAR_ECLIPSE_ANNULAR) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === SOLAR_ECLIPSE_ANNULAR
      )
    } else if (filter === SOLAR_ECLIPSE_TOTAL) {
      filtered = filtered.filter(
        (eclipse) =>
          eclipse.ecl_type.trim().substring(0) === SOLAR_ECLIPSE_TOTAL
      )
    } else if (filter === SOLAR_ECLIPSE_HYBRID) {
      filtered = filtered.filter((eclipse) => {
        return eclipse.ecl_type.trim().substring(0) === SOLAR_ECLIPSE_HYBRID
      })
    }

    return filtered
  }

  return {
    eclipses,
    loading,
    error,
  }
}
