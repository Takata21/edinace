import { useEffect } from 'react'
import { useGalaxyStore } from '../store/Galaxies'
export function useGalaxy(id) {
  const { galaxyInfo, loading, messageError, fetchGalaxyInfo } =
    useGalaxyStore()
  useEffect(() => {
    fetchGalaxyInfo(id)
  }, [id])

  return { galaxyInfo, loading, messageError }
}
