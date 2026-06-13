import { useState } from 'react'
import ProductCard from './ProductCard.jsx'

const CAT_ICONS = {
  'Gases': '⚗️', 'Soldaduras': '🔧', 'Herramientas': '🔨',
  'Accesorios': '⚙️', 'Calzado de Seguridad': '👢',
  'Cuidados Personales': '🧴', 'Limpieza': '🧹', 'Ropa': '🦺', 'Servicio': '🛠️',
}

function SubBloque({ sub, productos, cat, onOpenModal }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="sub-bloque" data-sub={sub}>
      <div className={`sub-header${collapsed ? ' collapsed' : ''}`} onClick={() => setCollapsed(c => !c)}>
        <h3>{sub}</h3>
        <span className="sub-count">{productos.length} producto{productos.length !== 1 ? 's' : ''}</span>
        <span className="sub-toggle">▼</span>
      </div>
      {!collapsed && (
        <div className="sub-body">
          <div className="prod-grid">
            {productos.map(p => (
              <ProductCard key={p.codigo} producto={p} cat={cat} sub={sub} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CatBloque({ cat, subcats, onOpenModal }) {
  const [collapsed, setCollapsed] = useState(false)
  const total = Object.values(subcats).reduce((s, a) => s + a.length, 0)

  return (
    <div className="cat-bloque" data-cat={cat}>
      <div className={`cat-header${collapsed ? ' collapsed' : ''}`} onClick={() => setCollapsed(c => !c)}>
        <span>{CAT_ICONS[cat] || '📦'}</span>
        <h2>{cat}</h2>
        <span className="cat-total">{total} producto{total !== 1 ? 's' : ''}</span>
        <span className="cat-toggle">▼</span>
      </div>
      {!collapsed && (
        <div className="cat-body">
          {Object.keys(subcats).sort().map(sub => (
            subcats[sub].length > 0 && (
              <SubBloque key={sub} sub={sub} productos={subcats[sub]} cat={cat} onOpenModal={onOpenModal} />
            )
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductGrid({ catalogo, filterCat, filterSub, filtrarProductos, searching, search, onOpenModal, onLimpiarBusqueda }) {
  if (searching) {
    return (
      <div id="productos-container" style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-texto)' }}>
        <div className="search-spinner" />
        <p>Buscando <strong>"{search}"</strong>…</p>
      </div>
    )
  }

  const cats = filterCat ? [filterCat] : Object.keys(catalogo).sort()
  let totalVisible = 0
  const bloques = []

  cats.forEach(cat => {
    if (!catalogo[cat]) return
    const subs = filterSub ? { [filterSub]: catalogo[cat][filterSub] || [] } : catalogo[cat]
    const subsFiltrados = {}
    Object.keys(subs).sort().forEach(sub => {
      const filtrados = filtrarProductos(subs[sub] || [])
      if (filtrados.length > 0) {
        subsFiltrados[sub] = filtrados
        totalVisible += filtrados.length
      }
    })
    if (Object.keys(subsFiltrados).length > 0) {
      bloques.push(<CatBloque key={cat} cat={cat} subcats={subsFiltrados} onOpenModal={onOpenModal} />)
    }
  })

  return (
    <div id="productos-container">
      {search && (
        <div className="search-resumen">
          🔍 <strong>{totalVisible}</strong> resultado{totalVisible !== 1 ? 's' : ''} para "<em>{search}</em>"
          &nbsp;·&nbsp;
          <button onClick={onLimpiarBusqueda} className="search-limpiar-btn">✕ Limpiar búsqueda</button>
        </div>
      )}
      {bloques.length === 0
        ? (
          <div className="no-results">
            <div className="icon">🔍</div>
            <h3>Sin resultados</h3>
            <p>No se encontraron productos con los filtros actuales.</p>
          </div>
        )
        : bloques}
    </div>
  )
}
