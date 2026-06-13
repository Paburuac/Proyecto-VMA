import { useState, useEffect } from 'react'
import { obtenerVariantes } from '../services/productoService.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductModal({ producto, cat, sub, catalogo, onClose }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [variantes, setVariantes] = useState([])
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)
  const [loadingVariantes, setLoadingVariantes] = useState(false)

  useEffect(() => {
    if (!producto) return
    setQty(1)
    setVarianteSeleccionada(null)

    if (producto.tiene_variantes) {
      setLoadingVariantes(true)
      obtenerVariantes(producto.id_producto).then(({ data }) => {
        setVariantes(data || [])
        setLoadingVariantes(false)
      })
    } else {
      setVariantes([])
    }
  }, [producto])

  if (!producto) return null

  const productoActivo = varianteSeleccionada
    ? { ...producto, codigo: varianteSeleccionada.codigo, precio: varianteSeleccionada.precio ?? producto.precio }
    : producto

  const relacionados = catalogo?.[cat]?.[sub]?.filter(p => p.codigo !== producto.codigo).slice(0, 3) || []

  function handleAddToCart() {
    addToCart(productoActivo, qty)
    onClose()
  }

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-badge">{cat} &gt; {sub}</div>

        <div className="modal-body">
          <div className="modal-img">
              {productoActivo.imagen_url
                ? <img
                    src={productoActivo.imagen_url}
                    alt={productoActivo.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
                    onError={e => { e.target.parentElement.innerHTML = '<span style="font-size:4rem">📦</span>' }}
                  />
                : <span style={{ fontSize: '4rem' }}>📦</span>}
          </div>

          <div className="modal-details">
            <h2 id="modal-title">{productoActivo.nombre}</h2>
            <div className="modal-meta">
              <span>Código: <strong id="modal-codigo">{productoActivo.codigo}</strong></span>
              {productoActivo.distribuidor && <span> · Distribuidor: <strong>{productoActivo.distribuidor}</strong></span>}
              {productoActivo.stock && <span> · Stock: <strong>{productoActivo.stock}</strong></span>}
            </div>

            <p id="modal-desc" style={{ margin: '1rem 0', color: 'var(--gris-texto)' }}>{productoActivo.descripcion}</p>

            <div className="modal-precio-wrap">
              <span className="modal-precio-label">Precio:</span>
              <span id="modal-precio" className="modal-precio-valor">{productoActivo.precio}</span>
            </div>

            {/* Selector de variantes */}
            {producto.tiene_variantes && (
              <div id="modal-medidas-wrap" style={{ margin: '1rem 0' }}>
                <div className="modal-medida-label">Medida / Variante</div>
                <select
                  id="modal-medida-select"
                  className="modal-medida-select"
                  disabled={loadingVariantes}
                  value={varianteSeleccionada?.codigo || producto.codigo}
                  onChange={e => {
                    const v = variantes.find(v => v.codigo === e.target.value)
                    setVarianteSeleccionada(v || null)
                  }}
                >
                  {loadingVariantes
                    ? <option>Cargando variantes…</option>
                    : variantes.map(v => (
                        <option key={v.codigo} value={v.codigo}>
                          {v.label_variante || v.codigo}
                        </option>
                      ))}
                </select>
              </div>
            )}

            {/* Cantidad */}
            <div className="modal-qty-wrap">
              <button id="qty-minus" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <input id="modal-qty" type="number" value={qty} min="1" readOnly />
              <button id="qty-plus" onClick={() => setQty(q => q + 1)}>+</button>
            </div>

            <button id="modal-add-cart" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleAddToCart}>
              + Agregar al carrito
            </button>
          </div>
        </div>

        {/* Productos relacionados */}
        {relacionados.length > 0 && (
          <div className="modal-relacionados">
            <h4>Productos relacionados</h4>
            <div id="rel-grid" className="rel-grid">
              {relacionados.map(p => (
                <div key={p.codigo} className="rel-item" onClick={() => { onClose(); setTimeout(() => {}, 100) }}>
                  {p.imagen_url
                    ? <img src={p.imagen_url} alt={p.nombre} style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '4px' }} onError={e => e.target.style.display = 'none'} />
                    : <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>📦</div>}
                  <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p.nombre.substring(0, 30)}{p.nombre.length > 30 ? '…' : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
