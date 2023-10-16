import { useState, useRef, useEffect } from 'react'

export function useSearch() {
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setSearchError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setSearchError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setSearchError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setSearchError(null)
  }, [search])

  return { search, setSearch, searchError }
}
