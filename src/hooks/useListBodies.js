import { useState, useEffect } from 'react'
import { getTargetBodies } from '../services/TargetBodies'
export function useListBodies() {
  const [majorBodies, setMajorBodies] = useState('The Sun and Planets')
  const [bodyList, setBodyList] = useState([])

  useEffect(() => {
    async function getBodyList(target) {
      try {
        const bodies = await getTargetBodies()
        const bodiesList = bodies.list
        const filterBodies = bodiesList.filter(
          (body) => body.label.toLowerCase() === majorBodies.toLocaleLowerCase()
        )
        setBodyList(filterBodies[0])
      } catch (error) {
        console.error('Error al obtener la lista de cuerpos:', error)
      }
    }

    getBodyList(majorBodies)
  }, [majorBodies])

  // We add a function to change the main body
  const changeMajorBody = (newMajorBody) => {
    setMajorBodies(newMajorBody)
  }

  // We return the state and the function to change the main body
  return { majorBodies, bodyList, changeMajorBody }
}
