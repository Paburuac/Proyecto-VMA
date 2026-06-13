import { useState } from 'react'
import { useCatalogo } from '../hooks/useCatalogo.js'
import Sidebar from '../components/Sidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'

export default function Catalogo() {
  const {
    catalogo, loading, error, searching,
    search, filterCat, filterSub, soloConImagen,
    setFilterCat, setFilterSub, setSoloConImagen,
    handleSearch, limpiarBusqueda, filtrarProductos,
  } = useCatalogo()

  const [modalProducto, setModalProducto] = useState(null)
  const [modalCat, setModalCat] = useState('')
  const [modalSub, setModalSub] = useState('')

  function openModal(producto, cat, sub) {
    setModalProducto(producto)
    setModalCat(cat)
    setModalSub(sub)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setModalProducto(null)
    document.body.style.overflow = ''
  }

  function handleSelectCat(cat) {
    if (filterCat === cat && !filterSub) {
      setFilterCat('')
    } else {
      setFilterCat(cat)
    }
    setFilterSub('')
  }

  function handleSelectSub(cat, sub) {
    setFilterCat(cat)
    setFilterSub(sub)
  }

  const subcats = filterCat && catalogo[filterCat] ? Object.keys(catalogo[filterCat]).sort() : []

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-texto)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</div>
        <p style={{ fontWeight: 600 }}>Cargando catálogo desde Supabase...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#cc3333' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
        <h3>No se pudo conectar con Supabase</h3>
        <p style={{ fontSize: '.9rem', maxWidth: '400px', margin: '0 auto', color: '#555' }}>
          {error?.message || 'Error desconocido'}
        </p>
      </div>
    )
  }

  return (
    <section id="page-productos" className="page active">
      <div className="productos-layout">
        {/* Sidebar */}
        <Sidebar
          catalogo={catalogo}
          filterCat={filterCat}
          filterSub={filterSub}
          onSelectCat={handleSelectCat}
          onSelectSub={handleSelectSub}
        />

        {/* Contenido principal */}
        <div className="productos-main">
          {/* Toolbar */}
          <div className="prod-toolbar">
            <input
              id="search-prod"
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="search-input"
            />

            <select
              id="filter-cat"
              value={filterCat}
              onChange={e => { setFilterCat(e.target.value); setFilterSub('') }}
            >
              <option value="">Todas las categorías</option>
              {Object.keys(catalogo).sort().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              id="filter-sub"
              value={filterSub}
              disabled={!filterCat}
              onChange={e => setFilterSub(e.target.value)}
            >
              <option value="">Todas las subcategorías</option>
              {subcats.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
              <input
                id="filter-con-imagen"
                type="checkbox"
                checked={soloConImagen}
                onChange={e => setSoloConImagen(e.target.checked)}
              />
              Solo con imagen
            </label>
          </div>

          {/* Grid de productos */}
          <ProductGrid
            catalogo={catalogo}
            filterCat={filterCat}
            filterSub={filterSub}
            filtrarProductos={filtrarProductos}
            searching={searching}
            search={search}
            onOpenModal={openModal}
            onLimpiarBusqueda={limpiarBusqueda}
          />
        </div>
      </div>

      {/* Modal */}
      {modalProducto && (
        <ProductModal
          producto={modalProducto}
          cat={modalCat}
          sub={modalSub}
          catalogo={catalogo}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
