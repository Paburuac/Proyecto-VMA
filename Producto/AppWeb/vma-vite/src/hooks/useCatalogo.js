import { useState, useEffect, useCallback, useRef } from 'react'
import { obtenerProductos, construirCatalogo, buscarProductos } from '../services/productoService.js'

export function useCatalogo() {
  const [catalogo, setCatalogo] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterSub, setFilterSub] = useState('')
  const [soloConImagen, setSoloConImagen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)

  const debounceRef = useRef(null)

  useEffect(() => {
    obtenerProductos().then(({ data, error }) => {
      if (error || !data) { setError(error); setLoading(false); return }
      setCatalogo(construirCatalogo(data))
      setLoading(false)
    })
  }, [])

  const handleSearch = useCallback((texto) => {
    setSearch(texto)
    clearTimeout(debounceRef.current)

    if (!texto.trim()) {
      setSearchResults(null)
      setSearching(false)
      return
    }

    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      const { data, error } = await buscarProductos(texto)
      if (!error && data) setSearchResults(construirCatalogo(data))
      setSearching(false)
    }, 350)
  }, [])

  const limpiarBusqueda = useCallback(() => {
    setSearch('')
    setSearchResults(null)
    setSearching(false)
    clearTimeout(debounceRef.current)
  }, [])

  const catalogoActivo = searchResults ?? catalogo

  const filtrarProductos = useCallback((productos) => {
    let result = productos
    if (soloConImagen) result = result.filter(p => p.imagen_url)
    return result
  }, [soloConImagen])

  return {
    catalogo: catalogoActivo,
    loading, error, searching,
    search, filterCat, filterSub, soloConImagen,
    setFilterCat, setFilterSub, setSoloConImagen,
    handleSearch, limpiarBusqueda, filtrarProductos,
  }
}
