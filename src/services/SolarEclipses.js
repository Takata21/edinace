let cachedData = null //
export async function getAllSolarEclipses() {
  try {
    if (!cachedData) {
      const module = await import('../assets/SolarEclipses.json')
      cachedData = module.default
    }
    return cachedData
  } catch (error) {
    console.error('Error while loading galaxies:', error)
    return []
  }
}
