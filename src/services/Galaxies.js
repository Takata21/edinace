let cachedData = null //
export async function getAllGalaxies({ search }) {
  try {
    if (!cachedData) {
      const module = await import('../assets/Galaxies.json')
      cachedData = module.default
    }
    if (search) {
      const foundGalaxies = cachedData.filter((galaxy) =>
        galaxy.galaxy.original.toLowerCase().startsWith(search.toLowerCase())
      )
      return foundGalaxies
    } else {
      return cachedData
    }
  } catch (error) {
    console.error('Error while loading galaxies:', error)
    return []
  }
}
