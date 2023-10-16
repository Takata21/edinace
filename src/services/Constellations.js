let cachedData = null // Variable para almacenar en caché los datos

export async function getAllConstellations({ search }) {
  try {
    if (!cachedData) {
      const module = await import('../assets/Constellations.json')
      cachedData = module.default
    }
    if (search) {
      const foundConstellations = cachedData.filter((constellation) =>
        constellation.name.toLowerCase().startsWith(search.toLowerCase())
      )
      return foundConstellations
    } else {
      const cleanedConstellations = cachedData.map((constellation) => {
        return {
          name: constellation.name,
          id: constellation.id,
          surface: constellation.surface,
          NGCObjects: constellation.NGCObjects,
          caldwellObjects: constellation.caldwellObjects,
          numberOfStars: constellation.numberOfStars,
        }
      })
      return cleanedConstellations
    }
  } catch (error) {
    console.error('Error while loading constellations:', error)
    return []
  }
}
