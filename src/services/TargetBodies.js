export function getTargetBodies() {
  return fetch('/TargetBody.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no se completó correctamente')
      }
      return response.json()
    })
    .catch((error) => {
      console.log(error)
    })
}
