export function formatCoordinates(j2000Ra, j2000Dec) {
  // Conversión de Ascensión Recta
  const raHours = Math.floor(j2000Ra)
  const raMinutes = Math.floor((j2000Ra - raHours) * 60)
  const raSeconds = (j2000Ra - raHours - raMinutes / 60) * 3600
  const formattedRa = `${raHours}h ${raMinutes}m ${raSeconds.toFixed(2)}s`

  // Conversión de Declinación
  const decDeg = Math.floor(j2000Dec)
  const decMinutes = Math.floor((j2000Dec - decDeg) * 60)
  const decSeconds = (j2000Dec - decDeg - decMinutes / 60) * 3600
  const formattedDec = `${decDeg > 0 ? '+' : '-'}${Math.abs(
    decDeg
  )}° ${decMinutes}' ${decSeconds.toFixed(2)}"`

  return `${formattedRa}, ${formattedDec}`
}

export function formatGeographicCoordinates(longitude, latitude) {
  const lonDeg = Math.floor(Math.abs(longitude))
  const lonMinutes = Math.floor((Math.abs(longitude) - lonDeg) * 60)
  const lonSeconds = (
    (Math.abs(longitude) - lonDeg - lonMinutes / 60) *
    3600
  ).toFixed(1)
  const lonDirection = longitude >= 0 ? 'E' : 'W'
  const formattedLon = `${lonDirection} ${lonDeg}° ${lonMinutes}' ${lonSeconds}"`

  const latDeg = Math.floor(Math.abs(latitude))
  const latMinutes = Math.floor((Math.abs(latitude) - latDeg) * 60)
  const latSeconds = (
    (Math.abs(latitude) - latDeg - latMinutes / 60) *
    3600
  ).toFixed(1)
  const latDirection = latitude >= 0 ? 'N' : 'S'
  const formattedLat = `${latDirection} ${latDeg}° ${latMinutes}' ${latSeconds}"`

  return `${formattedLat}, ${formattedLon} `
}

export function convertAge(age) {
  const days = Math.floor(age)
  const decimalPart = age - days

  const hours = Math.floor(decimalPart * 24)
  const minutes = Math.floor((decimalPart * 24 - hours) * 60)

  return {
    days,
    hours,
    minutes,
  }
}

export function getLunarPhaseDescription(phasePercentage) {
  const fixPercentage = phasePercentage / 100
  const phaseMap = [
    { range: [0.0, 0.01], description: { es: 'Luna Nueva', en: 'New Moon' } },
    {
      range: [0.01, 0.24],
      description: { es: 'Luna Creciente', en: 'Waxing Crescent' },
    },
    {
      range: [0.24, 0.49],
      description: { es: 'Cuarto Creciente', en: 'First Quarter' },
    },
    {
      range: [0.49, 0.74],
      description: { es: 'Luna Gibosa Creciente', en: 'Waxing Gibbous' },
    },
    { range: [0.74, 1.0], description: { es: 'Luna Llena', en: 'Full Moon' } },
    {
      range: [0.99, 0.74],
      description: { es: ' luna gibosa menguante', en: 'Waning Gibbous' },
    },
    {
      range: [0.74, 0.49],
      description: { es: 'Cuarto Menguante', en: 'Last Quarter' },
    },
    {
      range: [0.49, 0.24],
      description: { es: 'luna menguante', en: 'Waning Crescent' },
    },
  ]

  const matchedPhase = phaseMap.find(
    (phase) =>
      fixPercentage >= phase.range[0] && fixPercentage <= phase.range[1]
  )

  return matchedPhase
    ? matchedPhase.description
    : { es: 'Fase Desconocida', en: 'Unknown Phase' }
}

export function formatEclipseDate({ calendarDate, type = 'short' }) {
  return calendarDate
    ? new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: type,
        day: 'numeric',
      }).format(new Date(calendarDate))
    : null
}

export function convertMinutesToHMS(minutes) {
  if (isNaN(minutes)) {
    return 'Invalid input'
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = Math.floor(minutes % 60)
  const seconds = Math.floor((remainingMinutes % 1) * 60)

  return `${hours} h ${remainingMinutes} m ${seconds} s`
}

export async function findNextEclipses() {
  try {
    const data = await import('../assets/NextEclipse.json')
    const eclipseData = data.default // Accede a los datos del módulo

    const currentDate = new Date()

    const closestType1Eclipse = eclipseData
      .filter(
        (eclipse) =>
          eclipse.type === 1 && new Date(eclipse.calendar_date) > currentDate
      )
      .sort((a, b) => new Date(a.calendar_date) - new Date(b.calendar_date))[0]

    const closestType2Eclipse = eclipseData
      .filter(
        (eclipse) =>
          eclipse.type === 2 && new Date(eclipse.calendar_date) > currentDate
      )
      .sort((a, b) => new Date(a.calendar_date) - new Date(b.calendar_date))[0]

    return [closestType1Eclipse, closestType2Eclipse]
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error)
    return []
  }
}
