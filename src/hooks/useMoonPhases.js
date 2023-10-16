import { useState, useEffect } from 'react'
import { getMoon } from '../services/Moon'

export function useMoon() {
  const [dateTimeValue, setDateTimeValue] = useState(
    new Date().toISOString().slice(0, 16)
  )
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const moonData = await getMoon(dateTimeValue || new Date())
        setData(moonData)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateTimeValue])
  return {
    isLoading,
    error,
    data,
    dateTimeValue,
    setDateTimeValue,
  }
}
