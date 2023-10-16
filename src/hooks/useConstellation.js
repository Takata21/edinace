import { useEffect } from 'react'
import { useConstellationStore } from '../store/Constellation'

export function useConstellation({ id }) {
  const { constellationData, loading, messageError, fetchConstellationData } =
    useConstellationStore()
  useEffect(() => {
    fetchConstellationData(id)
  }, [id])
  return { loading, constellationData, messageError }
}
