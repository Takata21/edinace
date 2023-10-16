import { useEffect } from 'react'
import { useEclipses } from '../store/Eclipses'
import { SOLAR_ECLIPSE } from '../assets/constant'
export function useEclipse({ id, eclipseType }) {
  const {
    solarEclipseInfo,
    lunarEclipseInfo,
    loading,
    messageError,
    getSolarEclipseInfo,
    getLunarEclipseInfo,
  } = useEclipses()

  useEffect(() => {
    if (eclipseType === SOLAR_ECLIPSE) {
      getSolarEclipseInfo({ id })
    } else {
      getLunarEclipseInfo({ id })
    }
  }, [id])
  const eclipseInfo =
    eclipseType === SOLAR_ECLIPSE ? solarEclipseInfo : lunarEclipseInfo

  return { eclipseInfo, loading, messageError }
}
