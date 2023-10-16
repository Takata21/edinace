export async function fetchMoonPhases(
  dateTimeValue = new Date().toISOString().slice(0, 16)
) {
  const date = dateTimeValue
  const API_URL = 'https://svs.gsfc.nasa.gov/api/dialamoon'

  try {
    const response = await fetch(`${API_URL}/${date}`)

    if (!response.ok) {
      throw new Error('Failed to fetch data.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error', error)
    throw new Error('Failed to fetch data.')
  }
}
