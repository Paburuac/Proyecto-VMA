export default function ProductCard({ producto, cat, sub, onOpenModal }) {
  const { codigo, nombre, precio, imagen_url, tiene_variantes } = producto

  return (
    <div className="prod-card" onClick={() => onOpenModal(producto, cat, sub)}>
      <div className="prod-img" style={{ position: 'relative', overflow: 'hidden' }}>
        {imagen_url
          ? <img
              src={imagen_url}
              alt={nombre}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
          : null}
        <span
          className="prod-img-fallback"
          style={{ display: imagen_url ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '2rem' }}
        >
          📦
        </span>
      </div>
      <div className="prod-info">
        <div className="prod-codigo">#{codigo}</div>
        <div className="prod-nombre">{nombre}</div>
        {tiene_variantes && <div className="prod-variantes-badge">Múltiples medidas disponibles</div>}
        <div className="prod-precio">Precio: {precio}</div>
        <button
          className="prod-btn-add"
          onClick={e => { e.stopPropagation(); onOpenModal(producto, cat, sub) }}
        >
          {tiene_variantes ? 'Ver medidas' : '+ Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
