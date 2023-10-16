let cachedData = null //
export async function getAllLunarEclipses() {
  try {
    if (!cachedData) {
      const module = await import('../assets/lunarEclipses.json')
      cachedData = module.default
    }
    return cachedData
  } catch (error) {
    console.error('Error while loading galaxies:', error)
    return []
  }
}
