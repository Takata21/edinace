export function getPhysicalData(text) {
  if (text.length === 0) {
    console.log('vacio')
    return
  }

  const lines = text.split('\n')

  // Crear un objeto para almacenar las propiedades y valores
  const properties = {}

  let stopParsing = false // Variable para detener la búsqueda

  // Recorrer las líneas y extraer las propiedades y valores
  lines.forEach((line) => {
    // Verificar si la línea contiene "Ephemeris / API_USER"
    if (line.includes('Ephemeris / API_USER')) {
      stopParsing = true // Establecer la bandera para detener la búsqueda
      return // Salir del bucle
    }

    // Si no se ha encontrado la línea de detención, procesar la línea normalmente
    if (!stopParsing) {
      // Usar una expresión regular para buscar líneas con el formato "Nombre de la propiedad = Valor"
      const match = line.match(/^(.*?)\s*=\s*(.*?)\s*$/)
      if (match) {
        const propertyName = match[1].trim()
        const propertyValue = match[2].trim()
        properties[propertyName] = propertyValue
      }
    }
  })
  return properties
}
export function getEphemerisInfo(text) {
  const dataString = extractContentBetweenMarkers({
    text,
    startMarker: 'Ephemeris /',
    endMarker: 'Table format',
  })

  // Split the text into lines
  const lines = dataString.split('\n')
  console.log(lines)

  // Create an array to store the values
  const valuesArray = []

  // Iterate over each line
  for (const line of lines) {
    // Split the line into key and value using ':'
    const parts = line.split(/:(?![^{]*})/)
    if (parts.length === 2) {
      const value = parts[1].trim()
      valuesArray.push(value)
    }
  }
  return valuesArray
}
export function csvToObjectArray(info) {
  const csv = extractContentBetweenMarkers({
    text: info,
    startMarker: '$$SOE\n',
    endMarker: '$$EOE',
  })
  const lines = csv.split('\n')
  const headers = lines[0].split(',').map((header) => header.trim())
  const data = []
  const columnNames = [
    'date',
    'raIcrf',
    'decIcrf',
    'ApMag',
    'sBrt',
    'delta',
    'delDot',
    'sotr',
    'r',
    'sto',
    'cnst',
    'tkt',
  ]

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',').map((cell) => cell.trim())

    // Comprueba si la fila actual está vacía (todos los valores son vacíos o comas)
    if (currentLine.every((value) => value === '' || value === ',')) {
      continue // Omite la fila vacía
    }

    const rowData = {}

    for (let j = 0, dataIndex = 0; j < headers.length; j++) {
      // Omitir las columnas 2 y 3 (segunda y tercera columna)
      if (j !== 1 && j !== 2) {
        // Asigna los nombres de las claves según columnNames
        const value = currentLine[j]

        // Verifica si el valor contiene una coma y un espacio
        if (value.includes(', ')) {
          rowData[columnNames[dataIndex]] = value
          if (columnNames[dataIndex] === 'tkt') {
            rowData[columnNames[dataIndex]] = crypto.randomUUID()
          }
        } else {
          // Si no contiene una coma y un espacio, toma el valor completo
          rowData[columnNames[dataIndex]] = value
          if (columnNames[dataIndex] === 'tkt') {
            rowData[columnNames[dataIndex]] = crypto.randomUUID()
          }
        }

        dataIndex++
      }
    }

    data.push(rowData)
  }

  return data
}

export function extractContentBetweenMarkers({ text, startMarker, endMarker }) {
  // Encuentra el índice de inicio del primer marcador
  const startIndex = text.indexOf(startMarker)

  // Encuentra el índice de inicio del segundo marcador, comenzando desde el índice de inicio del primer marcador
  const endIndex = text.indexOf(endMarker, startIndex)

  // Verifica si ambos marcadores existen
  if (startIndex === -1 || endIndex === -1) {
    return null // Si no se encuentran los marcadores, devuelve null
  }

  // Extrae todo el contenido entre los dos marcadores sin incluir el marcador final
  const contentBetweenMarkers = text.substring(
    startIndex + startMarker.length,
    endIndex
  )

  return contentBetweenMarkers
}
