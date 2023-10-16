import { useEffect, useState } from 'react'
import { getMoon } from '../services/Moon'
import { convertAge } from '../utils/astronomyUtils'

export function useMoon() {
  const [moonPhases, setMoonPhases] = useState(null)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getMoonPhase = async () => {
      try {
        setLoading(true)
        const phase = await getMoon()
        setMoonPhases(phase)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getMoonPhase()
  }, [])

  const { days, hours, minutes } = convertAge(moonPhases?.age)
  return { loading, moonPhases, days, hours, minutes }
}
