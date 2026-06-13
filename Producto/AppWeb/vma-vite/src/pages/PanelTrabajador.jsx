import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { obtenerTodasCotizaciones, actualizarEstado, actualizarConPrecioFinal } from '../services/cotizacionService.js'

const BADGE = {
  pendiente:  { cls: 'tw-badge-warn', label: '⏳ Pendiente' },
  revisada:   { cls: 'tw-badge-info', label: '🔍 En revisión' },
  respondida: { cls: 'tw-badge-ok',   label: '✅ Respondida' },
}

/* ── Modal Detalle ─────────────────────────────── */
function ModalDetalle({ c, onClose, onCambiarEstado, onResponder }) {
  if (!c) return null
  const prods = c.productos_solicitados || []
  const badge = BADGE[c.estado] || BADGE.pendiente
  const fecha = new Date(c.created_at).toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div id="tw-modal" style={{ display: 'flex' }} className="visible" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="tw-modal-content">
        <div className="tw-modal-header">
          <h3 id="tw-modal-title">
            Cotización <strong>#{c.id}</strong> &nbsp;<span className={badge.cls}>{badge.label}</span>
          </h3>
          <button className="tw-modal-close" onClick={onClose}>✕</button>
        </div>

        <div id="tw-modal-body" className="tw-detalle">
          {/* Datos cliente */}
          <div className="tw-detalle-seccion">
            <h4 className="tw-detalle-titulo">📋 Datos del cliente</h4>
            <div className="tw-detalle-grid">
              {[['Nombre', c.nombre], ['Empresa', c.empresa]].map(([l, v]) => (
                <div key={l} className="tw-detalle-item">
                  <span className="tw-detalle-label">{l}</span>
                  <span className="tw-detalle-val">{v || '—'}</span>
                </div>
              ))}
              <div className="tw-detalle-item">
                <span className="tw-detalle-label">Email</span>
                <span className="tw-detalle-val">
                  {c.email ? <a href={`mailto:${c.email}`}>{c.email}</a> : '—'}
                </span>
              </div>
              <div className="tw-detalle-item">
                <span className="tw-detalle-label">Teléfono</span>
                <span className="tw-detalle-val">
                  {c.telefono ? <a href={`tel:${c.telefono}`}>{c.telefono}</a> : '—'}
                </span>
              </div>
              <div className="tw-detalle-item tw-detalle-full">
                <span className="tw-detalle-label">Fecha de envío</span>
                <span className="tw-detalle-val">{fecha}</span>
              </div>
              {c.mensaje && (
                <div className="tw-detalle-item tw-detalle-full">
                  <span className="tw-detalle-label">Mensaje</span>
                  <span className="tw-detalle-val tw-mensaje-det">{c.mensaje}</span>
                </div>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="tw-detalle-seccion">
            <h4 className="tw-detalle-titulo">📦 Productos solicitados</h4>
            {prods.length === 0 ? (
              <p className="tw-empty-prods">No se especificaron productos.</p>
            ) : (
              <div className="tw-prod-table-wrap">
                <table className="tw-prod-table">
                  <thead><tr><th>#</th><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio ref.</th></tr></thead>
                  <tbody>
                    {prods.map((p, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td className="tw-prod-cod">{p.codigo || '—'}</td>
                        <td>{p.nombre || 'Sin nombre'}</td>
                        <td className="tw-prod-cant">{p.cantidad || 1}</td>
                        <td className="tw-prod-precio">{p.precio && p.precio !== 'Consultar' ? `$${Number(p.precio).toLocaleString('es-CL')}` : 'A consultar'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cambiar estado */}
          <div className="tw-detalle-seccion">
            <h4 className="tw-detalle-titulo">🔄 Cambiar estado</h4>
            <div className="tw-estado-acciones">
              <button
                className="tw-btn tw-btn-revisar tw-btn-lg"
                disabled={c.estado === 'revisada' || c.estado === 'respondida'}
                onClick={() => { onCambiarEstado(c.id, 'revisada'); onClose() }}
              >🔍 Marcar en revisión</button>
              <button
                className="tw-btn tw-btn-responder tw-btn-lg"
                disabled={c.estado === 'respondida'}
                onClick={() => onResponder(c)}
              >✅ Marcar como respondida</button>
              <button
                className="tw-btn tw-btn-reabrir tw-btn-lg"
                disabled={c.estado === 'pendiente'}
                onClick={() => { onCambiarEstado(c.id, 'pendiente'); onClose() }}
              >↩️ Reabrir</button>
            </div>
          </div>
        </div>

        <div className="tw-modal-footer">
          <button className="tw-btn tw-btn-neutral tw-btn-lg" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

/* ── Modal Responder ───────────────────────────── */
function ModalResponder({ c, onClose, onConfirmar }) {
  const [precio, setPrecio] = useState(c?.precio_final || '')
  const [loading, setLoading] = useState(false)

  async function handleConfirmar() {
    const val = parseInt(precio, 10)
    if (!val || val <= 0) return
    setLoading(true)
    await onConfirmar(c.id, val)
    setLoading(false)
  }

  if (!c) return null

  return (
    <div id="tw-modal" style={{ display: 'flex' }} className="visible" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="tw-modal-content">
        <div className="tw-modal-header">
          <h3>Responder Cotización <strong>#{c.id}</strong></h3>
          <button className="tw-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="tw-detalle">
          <div className="tw-detalle-seccion">
            <h4 className="tw-detalle-titulo">💰 Precio final acordado</h4>
            <p style={{ marginBottom: '1.25rem', color: '#556', fontSize: '.95rem', lineHeight: 1.5 }}>
              Ingresa el monto total que pagará el cliente. Este valor aparecerá en su panel y habilitará el botón de pago con Transbank.
            </p>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.9rem', color: '#003B5C' }}>Monto (CLP)</label>
              <input
                id="tw-precio-input"
                type="number"
                min="1"
                step="1"
                placeholder="Ej: 150000"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleConfirmar()}
                autoFocus
                style={{ width: '100%', padding: '.65rem .9rem', border: '2px solid #d0d7e2', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>
        <div className="tw-modal-footer">
          <button className="tw-btn tw-btn-responder tw-btn-lg" disabled={loading || !precio || Number(precio) <= 0} onClick={handleConfirmar}>
            {loading ? 'Guardando...' : '✅ Confirmar y marcar como respondida'}
          </button>
          <button className="tw-btn tw-btn-neutral tw-btn-lg" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

/* ── Fila de tabla ─────────────────────────────── */
function FilaCotizacion({ c, onVerDetalle, onCambiarEstado, onResponder }) {
  const prods = c.productos_solicitados || []
  const fecha = new Date(c.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const badge = BADGE[c.estado] || BADGE.pendiente

  return (
    <tr id={`tw-fila-${c.id}`}>
      <td className="tw-td-id">#{c.id}</td>
      <td>
        <div className="tw-cliente-nombre">{c.nombre || '—'}</div>
        <div className="tw-cliente-email">{c.email || ''}</div>
      </td>
      <td>{c.empresa || '—'}</td>
      <td className="tw-td-prods">{prods.length > 0 ? `${prods.length} producto${prods.length !== 1 ? 's' : ''}` : '—'}</td>
      <td className="tw-td-fecha">{fecha}</td>
      <td><span className={badge.cls}>{badge.label}</span></td>
      <td className="tw-td-acciones">
        <button className="tw-btn tw-btn-detail" onClick={() => onVerDetalle(c)} title="Ver detalle">🔍</button>
        {c.estado !== 'revisada' && c.estado !== 'respondida' && (
          <button className="tw-btn tw-btn-revisar" onClick={() => onCambiarEstado(c.id, 'revisada')} title="Marcar en revisión">🔍 Revisar</button>
        )}
        {c.estado !== 'respondida' && (
          <button className="tw-btn tw-btn-responder" onClick={() => onResponder(c)} title="Responder">✅ Responder</button>
        )}
        {c.estado === 'respondida' && (
          <button className="tw-btn tw-btn-reabrir" onClick={() => onCambiarEstado(c.id, 'pendiente')} title="Reabrir">↩️ Reabrir</button>
        )}
      </td>
    </tr>
  )
}

/* ── Página principal ──────────────────────────── */
export default function PanelTrabajador() {
  const { showToast } = useToast()
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtro, setFiltro] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [detalle, setDetalle] = useState(null)
  const [responder, setResponder] = useState(null)

  const cargar = useCallback(async (silencioso = false) => {
    if (!silencioso) setLoading(true)
    const { data, error } = await obtenerTodasCotizaciones()
    setLoading(false)
    if (error) { setError(error); return }
    setCotizaciones(data || [])
    if (silencioso) showToast('🔄 Cotizaciones actualizadas.')
  }, [showToast])

  useEffect(() => { cargar() }, [])

  const cambiarEstado = useCallback(async (id, nuevoEstado) => {
    const labels = { revisada: 'en revisión', respondida: 'respondida', pendiente: 'pendiente' }
    const { error } = await actualizarEstado(id, nuevoEstado)
    if (error) { showToast('❌ Error al actualizar el estado.'); return }
    setCotizaciones(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c))
    showToast(`✅ Cotización #${id} marcada como ${labels[nuevoEstado]}.`)
  }, [showToast])

  const confirmarRespuesta = useCallback(async (id, precio) => {
    const { error } = await actualizarConPrecioFinal(id, precio)
    if (error) { showToast('❌ Error al actualizar la cotización.'); return }
    setCotizaciones(prev => prev.map(c => c.id === id ? { ...c, estado: 'respondida', precio_final: precio } : c))
    showToast(`✅ Cotización #${id} respondida — Precio: $${precio.toLocaleString('es-CL')}`)
    setResponder(null)
  }, [showToast])

  const cnt = (estado) => cotizaciones.filter(c => c.estado === estado).length

  let filtradas = filtro === 'todas' ? [...cotizaciones] : cotizaciones.filter(c => c.estado === filtro)
  if (busqueda.trim()) {
    const q = busqueda.toLowerCase()
    filtradas = filtradas.filter(c =>
      (c.nombre  || '').toLowerCase().includes(q) ||
      (c.empresa || '').toLowerCase().includes(q) ||
      (c.email   || '').toLowerCase().includes(q)
    )
  }

  if (loading) return (
    <section className="page active"><div className="tw-loading"><div className="tw-spinner"/><p>Cargando cotizaciones...</p></div></section>
  )
  if (error) return (
    <section className="page active"><div className="tw-error">❌ Error al cargar cotizaciones. Intenta de nuevo.</div></section>
  )

  return (
    <section id="page-trabajador" className="page active">
      <div className="tw-container">
        <div className="tw-header-row">
          <h2 className="tw-titulo">Panel de Cotizaciones</h2>
          <button className="tw-btn tw-btn-recargar" onClick={() => cargar(true)}>🔄 Actualizar</button>
        </div>

        {/* Métricas */}
        <div id="tw-filtros-wrap">
          <div className="tw-metricas">
            {[['tw-m-total','Total',cotizaciones.length],['tw-m-pend','Pendientes',cnt('pendiente')],['tw-m-rev','En revisión',cnt('revisada')],['tw-m-resp','Respondidas',cnt('respondida')]].map(([cls,label,n]) => (
              <div key={cls} className={`tw-metrica ${cls}`}>
                <span className="tw-m-num">{n}</span>
                <span className="tw-m-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Filtros + búsqueda */}
          <div className="tw-controles">
            <div className="tw-filtros">
              {[['todas','Todas'],['pendiente','⏳ Pendientes'],['revisada','🔍 En revisión'],['respondida','✅ Respondidas']].map(([val,label]) => (
                <button key={val} className={`tw-filtro-btn${filtro===val?' active':''}`} onClick={() => setFiltro(val)}>{label}</button>
              ))}
            </div>
            <input
              type="search"
              className="tw-buscador"
              placeholder="🔍 Buscar por nombre, empresa o email..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla */}
        <div id="tw-content">
          {filtradas.length === 0 ? (
            <div className="tw-empty">
              <div className="tw-empty-icon">📋</div>
              <p>{busqueda ? 'No hay resultados para tu búsqueda.' : 'No hay cotizaciones en esta categoría.'}</p>
            </div>
          ) : (
            <>
              <div className="tw-table-wrap">
                <table className="tw-table">
                  <thead>
                    <tr><th>#</th><th>Cliente</th><th>Empresa</th><th>Productos</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {filtradas.map(c => (
                      <FilaCotizacion key={c.id} c={c} onVerDetalle={setDetalle} onCambiarEstado={cambiarEstado} onResponder={setResponder} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tw-table-footer">Mostrando {filtradas.length} de {cotizaciones.length} cotizaciones</div>
            </>
          )}
        </div>
      </div>

      {/* Modal detalle */}
      {detalle && !responder && (
        <ModalDetalle c={detalle} onClose={() => setDetalle(null)} onCambiarEstado={cambiarEstado} onResponder={c => { setDetalle(null); setResponder(c) }} />
      )}

      {/* Modal responder */}
      {responder && (
        <ModalResponder c={responder} onClose={() => setResponder(null)} onConfirmar={confirmarRespuesta} />
      )}
    </section>
  )
}
