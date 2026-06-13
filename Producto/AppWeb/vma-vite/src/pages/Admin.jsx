import { useState, useEffect, useCallback } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import {
  obtenerMetricas,
  obtenerCotizaciones,
  actualizarEstadoCotizacion,
  eliminarCotizacion,
  obtenerUsuarios,
  actualizarRolUsuario,
  toggleActivoUsuario,
  obtenerProductosAdmin,
  obtenerCategoriasAdmin,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  obtenerReporteProductosMasCotizados,
  obtenerReporteStock,
} from '../services/adminService.js'
import { responderCotizacion } from '../services/cotizacionService.js'

const esc = (s) => String(s ?? '')

const BADGE_COT = {
  pendiente:  'admin-badge-warn',
  revisada:   'admin-badge-info',
  respondida: 'admin-badge-ok',
}

const TABS = [
  { id: 'dashboard',    label: '📊 Dashboard' },
  { id: 'cotizaciones', label: '📋 Cotizaciones' },
  { id: 'usuarios',     label: '👥 Usuarios' },
  { id: 'productos',    label: '📦 Productos' },
  { id: 'categorias',   label: '🏷️ Categorías' },
  { id: 'reportes',     label: '📈 Reportes' },
]

/* ══════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════ */
function TabDashboard({ onIrA }) {
  const [data, setData] = useState(null)
  const [loading, setL] = useState(true)

  useEffect(() => {
    obtenerMetricas().then(({ data }) => { setData(data); setL(false) })
  }, [])

  if (loading) return <div className="admin-loading">⚙️ Cargando métricas...</div>
  if (!data)   return <div className="admin-error">Error al cargar métricas.</div>

  const kpis = [
    { num: data.pendientes,        label: 'Cotizaciones pendientes', cls: 'admin-kpi-warn' },
    { num: data.revisadas,         label: 'En revisión',             cls: 'admin-kpi-info' },
    { num: data.respondidas,       label: 'Respondidas',             cls: 'admin-kpi-ok' },
    { num: data.totalCotizaciones, label: 'Total cotizaciones',      cls: 'admin-kpi-neutral' },
    { num: data.totalUsuarios,     label: 'Usuarios registrados',    cls: 'admin-kpi-neutral' },
    { num: data.usuariosActivos,   label: 'Usuarios activos',        cls: 'admin-kpi-ok' },
    { num: data.totalProductos,    label: 'Productos en catálogo',   cls: 'admin-kpi-neutral' },
    { num: data.totalCategorias,   label: 'Categorías',              cls: 'admin-kpi-neutral' },
  ]

  return (
    <div id="admin-dashboard-content">
      <div className="admin-kpi-grid">
        {kpis.map(k => (
          <div key={k.label} className={`admin-kpi ${k.cls}`}>
            <div className="admin-kpi-num">{k.num}</div>
            <div className="admin-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-accesos">
        <h3>Accesos rápidos</h3>
        <div className="admin-accesos-grid">
          <button className="admin-acceso-btn" onClick={() => onIrA('cotizaciones')}>
            <span className="admin-acceso-icon">📋</span>
            <span>Ver cotizaciones</span>
            {data.pendientes > 0 && <span className="admin-badge-warn">{data.pendientes} pendientes</span>}
          </button>
          <button className="admin-acceso-btn" onClick={() => onIrA('usuarios')}>
            <span className="admin-acceso-icon">👥</span><span>Gestionar usuarios</span>
          </button>
          <button className="admin-acceso-btn" onClick={() => onIrA('productos')}>
            <span className="admin-acceso-icon">📦</span><span>Gestionar productos</span>
          </button>
          <button className="admin-acceso-btn" onClick={() => onIrA('reportes')}>
            <span className="admin-acceso-icon">📊</span><span>Ver reportes</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MODAL GENÉRICO
══════════════════════════════════════════════════ */
function AdminModal({ title, children, onClose }) {
  return (
    <div id="admin-modal" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal-box">
        <div className="admin-modal-head">
          <h3>{title}</h3>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">{children}</div>
      </div>
    </div>
  )
}

/* ── Modal ver productos de cotización ─────────── */
function ModalVerProductos({ cot, onClose }) {
  const prods = cot.productos_solicitados || []
  return (
    <AdminModal title={`Productos — Cotización #${cot.id}`} onClose={onClose}>
      <p><strong>Cliente:</strong> {esc(cot.nombre)} / {esc(cot.empresa) || '—'}</p>
      <p><strong>Mensaje:</strong> {esc(cot.mensaje) || '—'}</p>
      <p><strong>Productos solicitados:</strong></p>
      <ul className="admin-prod-list">
        {prods.length > 0
          ? prods.map((p, i) => <li key={i}><strong>[{esc(p.codigo)}]</strong> {esc(p.nombre)} × {p.cantidad || 1}</li>)
          : <li>Sin productos especificados</li>
        }
      </ul>
    </AdminModal>
  )
}

/* ── Modal responder cotización (precio por ítem) ── */
function ModalResponderAdmin({ cot, onClose, onConfirmar }) {
  const prods = cot.productos_solicitados || []
  const [precios, setPrecios] = useState(() => prods.map(p => p.precio_respondido || ''))
  const [saving, setSaving] = useState(false)

  const total = precios.reduce((s, p, i) => s + (parseInt(p, 10) || 0) * (prods[i]?.cantidad || 1), 0)

  async function handleConfirmar() {
    if (total <= 0) return
    setSaving(true)
    const productosActualizados = prods.map((p, i) => ({
      ...p, precio_respondido: parseInt(precios[i], 10) || null,
    }))
    await onConfirmar(cot.id, productosActualizados, total)
    setSaving(false)
  }

  return (
    <AdminModal title={`Responder Cotización #${cot.id}`} onClose={onClose}>
      <p style={{ marginBottom: '.75rem', color: '#445', fontSize: '.9rem', lineHeight: 1.5 }}>
        Ingresa el <strong>precio unitario</strong> para cada producto. El total se calcula automáticamente.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
          <thead>
            <tr style={{ background: '#f0f4fa', textAlign: 'left' }}>
              {['Código', 'Producto', 'Cant.', 'Precio unit. (CLP)', 'Subtotal'].map(h => (
                <th key={h} style={{ padding: '.5rem .6rem', fontSize: '.78rem', color: '#667' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prods.length === 0
              ? <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: '#aaa' }}>Sin productos</td></tr>
              : prods.map((p, i) => {
                  const sub = (parseInt(precios[i], 10) || 0) * (p.cantidad || 1)
                  return (
                    <tr key={i}>
                      <td style={{ padding: '.5rem .6rem', fontSize: '.82rem', color: '#555' }}>{esc(p.codigo) || '—'}</td>
                      <td style={{ padding: '.5rem .6rem', fontSize: '.82rem' }}>{esc(p.nombre) || 'Producto'}</td>
                      <td style={{ padding: '.5rem .6rem', textAlign: 'center', fontSize: '.82rem' }}>{p.cantidad || 1}</td>
                      <td style={{ padding: '.5rem .4rem' }}>
                        <input
                          type="number" min="0" step="1" placeholder="0"
                          value={precios[i]}
                          onChange={e => setPrecios(prev => { const n = [...prev]; n[i] = e.target.value; return n })}
                          style={{ width: '110px', padding: '.35rem .5rem', border: '2px solid #d0d7e2', borderRadius: '6px', fontSize: '.88rem' }}
                        />
                      </td>
                      <td style={{ padding: '.5rem .6rem', textAlign: 'right', fontSize: '.82rem', fontWeight: 600, color: '#1a7cdd' }}>
                        {sub > 0 ? '$' + sub.toLocaleString('es-CL') : '—'}
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '.75rem', padding: '.75rem 0', borderTop: '2px solid #e8edf4', marginBottom: '1rem' }}>
        <span style={{ fontSize: '.9rem', color: '#667' }}>Total cotización:</span>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a7cdd' }}>
          ${total.toLocaleString('es-CL')}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
        <button className="admin-btn admin-btn-ok" disabled={total <= 0 || saving} onClick={handleConfirmar}>
          {saving ? 'Guardando...' : '✅ Confirmar y responder'}
        </button>
        <button className="admin-btn" onClick={onClose}>Cancelar</button>
      </div>
    </AdminModal>
  )
}

/* ══════════════════════════════════════════════════
   TAB COTIZACIONES
══════════════════════════════════════════════════ */
function TabCotizaciones() {
  const { showToast } = useToast()
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setL]   = useState(true)
  const [filtro, setFiltro] = useState('')
  const [modalVer, setModalVer]   = useState(null)
  const [modalResp, setModalResp] = useState(null)

  const cargar = useCallback(async (f) => {
    setL(true)
    const { data } = await obtenerCotizaciones(f)
    setCotizaciones(data || [])
    setL(false)
  }, [])

  useEffect(() => { cargar(filtro) }, [filtro])

  async function cambiarEstado(id, nuevoEstado) {
    if (nuevoEstado === 'respondida') {
      const cot = cotizaciones.find(c => c.id === id)
      if (cot) { setModalResp(cot); return }
    }
    const { error } = await actualizarEstadoCotizacion(id, nuevoEstado)
    if (error) { showToast('❌ Error al actualizar estado.'); return }
    showToast(`✅ Cotización #${id} → ${nuevoEstado}`)
    setCotizaciones(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c))
  }

  async function handleEliminar(id) {
    if (!confirm(`¿Eliminar cotización #${id}? Esta acción no se puede deshacer.`)) return
    const { error } = await eliminarCotizacion(id)
    if (error) { showToast('❌ Error al eliminar.'); return }
    showToast(`🗑️ Cotización #${id} eliminada.`)
    setCotizaciones(prev => prev.filter(c => c.id !== id))
  }

  async function handleConfirmarPrecio(id, productos, total) {
    const { error } = await responderCotizacion(id, productos, total)
    if (error) { showToast('❌ Error al guardar.'); return }
    setCotizaciones(prev => prev.map(c => c.id === id
      ? { ...c, estado: 'respondida', precio_final: total, productos_solicitados: productos }
      : c))
    setModalResp(null)
    showToast(`✅ Cotización #${id} respondida — $${total.toLocaleString('es-CL')}`)
  }

  function exportarExcel() {
    if (cotizaciones.length === 0) { showToast('⚠️ No hay cotizaciones para exportar.'); return }
    if (typeof XLSX === 'undefined') { showToast('❌ Librería Excel no disponible.'); return }
    const filas = cotizaciones.map(c => ({
      'N°': c.id,
      'Fecha': new Date(c.created_at).toLocaleDateString('es-CL'),
      'Nombre': c.nombre || '', 'Empresa': c.empresa || '', 'Email': c.email || '', 'Teléfono': c.telefono || '',
      'Productos': (c.productos_solicitados || []).map(p => `${p.nombre || p.codigo || '?'} x${p.cantidad || 1}`).join(' | ') || '(sin productos)',
      'Estado': c.estado || '', 'Mensaje': c.mensaje || '',
    }))
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(filas)
    ws['!cols'] = [{ wch: 6 }, { wch: 12 }, { wch: 22 }, { wch: 20 }, { wch: 26 }, { wch: 14 }, { wch: 50 }, { wch: 12 }, { wch: 30 }]
    XLSX.utils.book_append_sheet(wb, ws, 'Cotizaciones')
    XLSX.writeFile(wb, `VMA-Cotizaciones-${new Date().toLocaleDateString('es-CL').replace(/\//g, '-')}.xlsx`)
    showToast('✅ Excel descargado correctamente.')
  }

  function exportarPDF() {
    if (cotizaciones.length === 0) { showToast('⚠️ No hay cotizaciones para exportar.'); return }
    if (typeof window.jspdf === 'undefined') { showToast('❌ Librería PDF no disponible.'); return }
    const { jsPDF } = window.jspdf
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' })
    const AZUL = [0, 59, 92], VERDE = [132, 189, 0], BLANCO = [255, 255, 255], GRIS_CL = [244, 246, 248]
    const W = doc.internal.pageSize.getWidth()
    const H = doc.internal.pageSize.getHeight()

    doc.setFillColor(...AZUL); doc.rect(0, 0, W, 28, 'F')
    doc.setFillColor(...VERDE); doc.rect(0, 26, W, 2.5, 'F')
    doc.setTextColor(...BLANCO)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.text('VMA INDUSTRIAL', 14, 12)
    const titulo = `Reporte de Cotizaciones${filtro ? ` — ${filtro}` : ''}`
    doc.setFontSize(11); doc.text(titulo, W - 14 - doc.getTextWidth(titulo), 12)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8)
    const hoy = new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
    doc.text(hoy, W - 14 - doc.getTextWidth(hoy), 19)
    const totTxt = `Total: ${cotizaciones.length} cotización${cotizaciones.length !== 1 ? 'es' : ''}`
    doc.text(totTxt, W - 14 - doc.getTextWidth(totTxt), 24)

    const cols = [
      { x: 14, label: '#' }, { x: 26, label: 'Fecha' }, { x: 48, label: 'Nombre' },
      { x: 86, label: 'Empresa' }, { x: 124, label: 'Email' }, { x: 176, label: 'Items' }, { x: 194, label: 'Estado' },
    ]
    let y = 34; const rowH = 7
    const drawHeader = () => {
      doc.setFillColor(...AZUL); doc.rect(14, y, W - 28, rowH, 'F')
      doc.setTextColor(...BLANCO); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5)
      cols.forEach(c => doc.text(c.label, c.x + 1, y + 4.8)); y += rowH
    }
    drawHeader()

    const estadoColor = { pendiente: [224, 123, 0], revisada: [0, 100, 180], respondida: [50, 150, 50] }
    cotizaciones.forEach((c, i) => {
      if (y + rowH > H - 16) { doc.addPage(); y = 14; drawHeader() }
      if (i % 2 === 0) { doc.setFillColor(...GRIS_CL); doc.rect(14, y, W - 28, rowH, 'F') }
      doc.setTextColor(30, 30, 30); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.2)
      doc.text(String(c.id), cols[0].x + 1, y + 4.8)
      doc.text(new Date(c.created_at).toLocaleDateString('es-CL'), cols[1].x + 1, y + 4.8)
      doc.text((c.nombre || '').substring(0, 22), cols[2].x + 1, y + 4.8)
      doc.text((c.empresa || '—').substring(0, 22), cols[3].x + 1, y + 4.8)
      doc.text((c.email || '').substring(0, 30), cols[4].x + 1, y + 4.8)
      doc.text(String((c.productos_solicitados || []).length), cols[5].x + 5, y + 4.8)
      const color = estadoColor[c.estado] || [85, 94, 106]
      doc.setFillColor(...color); doc.roundedRect(cols[6].x + 1, y + 1.5, 20, 4, 1, 1, 'F')
      doc.setTextColor(...BLANCO); doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5)
      doc.text((c.estado || '').toUpperCase(), cols[6].x + 11, y + 4.5, { align: 'center' })
      y += rowH
    })

    const pages = doc.internal.getNumberOfPages()
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p)
      doc.setFillColor(...AZUL); doc.rect(0, H - 10, W, 10, 'F')
      doc.setFillColor(...VERDE); doc.rect(0, H - 10, W, 1.5, 'F')
      doc.setTextColor(...BLANCO); doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
      doc.text('VMA Industrial —', 14, H - 4)
      const pTxt = `Página ${p} de ${pages}`
      doc.text(pTxt, W - 14 - doc.getTextWidth(pTxt), H - 4)
    }
    doc.save(`VMA-Cotizaciones-${new Date().toLocaleDateString('es-CL').replace(/\//g, '-')}.pdf`)
    showToast('✅ PDF descargado correctamente.')
  }

  return (
    <div id="admin-cotizaciones-content">
      <div className="admin-toolbar" style={{ flexWrap: 'wrap', gap: '.5rem' }}>
        <div className="admin-filtros-wrap">
          {[['', 'Todas'], ['pendiente', 'Pendiente'], ['revisada', 'Revisada'], ['respondida', 'Respondida']].map(([val, label]) => (
            <button key={val} className={`admin-filter-btn${filtro === val ? ' active' : ''}`} onClick={() => setFiltro(val)}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.5rem', marginLeft: 'auto' }}>
          <button className="admin-btn admin-btn-info" onClick={exportarExcel}>📊 Excel</button>
          <button className="admin-btn admin-btn-neutral" onClick={exportarPDF}>📄 PDF</button>
        </div>
      </div>

      {loading
        ? <div className="admin-loading">⚙️ Cargando cotizaciones...</div>
        : cotizaciones.length === 0
          ? <div className="admin-empty">📭 No hay cotizaciones con este filtro.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>#</th><th>Fecha</th><th>Nombre</th><th>Empresa</th><th>Email</th><th>Teléfono</th><th>Productos</th><th>Estado</th><th>Precio</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {cotizaciones.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{new Date(c.created_at).toLocaleDateString('es-CL')}</td>
                      <td>{esc(c.nombre)}</td>
                      <td>{esc(c.empresa) || '—'}</td>
                      <td>{esc(c.email)}</td>
                      <td>{esc(c.telefono) || '—'}</td>
                      <td>
                        <button className="admin-btn-sm admin-btn-info" onClick={() => setModalVer(c)}>
                          Ver {(c.productos_solicitados || []).length} items
                        </button>
                      </td>
                      <td><span className={BADGE_COT[c.estado] || 'admin-badge-warn'}>{c.estado}</span></td>
                      <td style={{ fontWeight: c.precio_final ? 700 : 400, color: c.precio_final ? '#1a7cdd' : '#aaa' }}>
                        {c.precio_final ? '$' + Number(c.precio_final).toLocaleString('es-CL') : '—'}
                      </td>
                      <td className="admin-acciones">
                        <select className="admin-select-estado" value={c.estado} onChange={e => cambiarEstado(c.id, e.target.value)}>
                          <option value="pendiente">Pendiente</option>
                          <option value="revisada">Revisada</option>
                          <option value="respondida">Respondida</option>
                        </select>
                        <button className="admin-btn-sm admin-btn-danger" onClick={() => handleEliminar(c.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      }

      {modalVer  && <ModalVerProductos cot={modalVer} onClose={() => setModalVer(null)} />}
      {modalResp && <ModalResponderAdmin cot={modalResp} onClose={() => setModalResp(null)} onConfirmar={handleConfirmarPrecio} />}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TAB USUARIOS
══════════════════════════════════════════════════ */
function TabUsuarios() {
  const { showToast } = useToast()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setL] = useState(true)

  async function cargar() {
    setL(true)
    const { data } = await obtenerUsuarios()
    setUsuarios(data || [])
    setL(false)
  }

  useEffect(() => { cargar() }, [])

  async function handleRol(usuarioId, rolId) {
    const { error } = await actualizarRolUsuario(usuarioId, parseInt(rolId))
    if (error) { showToast('❌ Error al cambiar rol.'); return }
    showToast(`✅ Rol actualizado → ${{ 1: 'admin', 2: 'trabajador', 3: 'cliente' }[rolId]}`)
    cargar()
  }

  async function handleToggle(usuarioId, nuevoEstado) {
    const { error } = await toggleActivoUsuario(usuarioId, nuevoEstado)
    if (error) { showToast('❌ Error al actualizar estado.'); return }
    showToast(`✅ Usuario ${nuevoEstado ? 'activado' : 'desactivado'}`)
    cargar()
  }

  if (loading) return <div className="admin-loading">⚙️ Cargando usuarios...</div>

  return (
    <div id="admin-usuarios-content">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>#</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Rol actual</th><th>Cambiar rol</th><th>Estado</th><th>Registro</th></tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{esc(u.nombre) || '—'}</td>
                <td>{esc(u.email) || '—'}</td>
                <td>{esc(u.telefono) || '—'}</td>
                <td><span className={`admin-badge-rol admin-rol-${u.roles?.nombre || 'cliente'}`}>{u.roles?.nombre || 'cliente'}</span></td>
                <td>
                  <select className="admin-select-estado" value={u.rol_id} onChange={e => handleRol(u.id, e.target.value)}>
                    <option value="1">Admin</option>
                    <option value="2">Trabajador</option>
                    <option value="3">Cliente</option>
                  </select>
                </td>
                <td>
                  <button className={`admin-btn-sm ${u.activo ? 'admin-btn-ok' : 'admin-btn-danger'}`} onClick={() => handleToggle(u.id, !u.activo)}>
                    {u.activo ? '✅ Activo' : '❌ Inactivo'}
                  </button>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   FORM PRODUCTO (crear / editar)
══════════════════════════════════════════════════ */
const PROD_VACIO = { codigo: '', descripcion: '', id_categoria: '', precio: '', stock: '', distribuidor: '', imagen_url: '' }

function FormProducto({ editando, categorias, onGuardar, onCancelar }) {
  const [form, setForm] = useState(() => editando
    ? { codigo: editando.codigo || '', descripcion: editando.descripcion || '', id_categoria: editando.id_categoria || '',
        precio: editando.precio || '', stock: editando.stock || '', distribuidor: editando.distribuidor || '', imagen_url: editando.imagen_url || '' }
    : { ...PROD_VACIO }
  )
  const [previewOk, setPreviewOk] = useState(!!editando?.imagen_url)

  function cambio(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  return (
    <div id="admin-form-producto" className="admin-form-box">
      <h4 id="admin-form-prod-title">{editando ? `Editar producto #${editando.id_producto}` : 'Nuevo producto'}</h4>
      <div className="admin-form-grid">
        {[['codigo', 'Código', 'text', 'Ej: 12345'],
          ['descripcion', 'Descripción *', 'text', 'Nombre del producto'],
          ['precio', 'Precio', 'number', '0'],
          ['stock', 'Stock', 'text', 'Ej: 50'],
          ['distribuidor', 'Distribuidor', 'text', 'Nombre del distribuidor']
        ].map(([name, label, type, ph]) => (
          <div key={name} className="admin-form-row">
            <label>{label}</label>
            <input type={type} name={name} placeholder={ph} value={form[name]} onChange={cambio}
              min={type === 'number' ? '0' : undefined} step={type === 'number' ? '0.01' : undefined} />
          </div>
        ))}

        <div className="admin-form-row">
          <label>Categoría *</label>
          <select name="id_categoria" value={form.id_categoria} onChange={cambio}>
            <option value="">Seleccionar...</option>
            {categorias.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</option>)}
          </select>
        </div>

        <div className="admin-form-row" style={{ gridColumn: '1 / -1' }}>
          <label>URL de imagen</label>
          <input type="url" name="imagen_url" placeholder="https://ejemplo.com/imagen.jpg"
            value={form.imagen_url}
            onChange={e => { cambio(e); setPreviewOk(e.target.value.startsWith('http')) }}
          />
          {previewOk && form.imagen_url && (
            <div id="prod-imagen-preview" style={{ marginTop: '0.5rem' }}>
              <img src={form.imagen_url} alt="Preview" style={{ maxHeight: '100px', borderRadius: '6px', border: '1px solid var(--gris-medio)', objectFit: 'cover' }} />
              <button type="button"
                onClick={() => { setForm(f => ({ ...f, imagen_url: '' })); setPreviewOk(false) }}
                style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.78rem', background: 'none', border: 'none', color: '#cc3333', cursor: 'pointer' }}>
                ✕ Quitar imagen
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="admin-form-actions">
        <button className="admin-btn admin-btn-ok" onClick={() => onGuardar(form, editando?.id_producto || null)}>💾 Guardar</button>
        <button className="admin-btn admin-btn-neutral" onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TAB PRODUCTOS
══════════════════════════════════════════════════ */
function TabProductos() {
  const { showToast } = useToast()
  const [productos, setProductos]   = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setL]     = useState(true)
  const [busqueda, setBusq] = useState('')
  const [editando, setEditando] = useState(undefined) // undefined=oculto, null=nuevo, obj=editar

  async function cargar() {
    setL(true)
    const [p, c] = await Promise.all([obtenerProductosAdmin(), obtenerCategoriasAdmin()])
    setProductos(p.data || [])
    setCategorias(c.data || [])
    setL(false)
  }

  useEffect(() => { cargar() }, [])

  async function handleGuardar(form, id) {
    if (!form.descripcion.trim()) { showToast('❌ La descripción es obligatoria.'); return }
    if (!form.id_categoria)       { showToast('❌ Selecciona una categoría.'); return }

    const campos = {
      codigo:       form.codigo.trim() || null,
      descripcion:  form.descripcion.trim(),
      id_categoria: parseInt(form.id_categoria),
      precio:       parseFloat(form.precio) || null,
      stock:        form.stock.trim() || null,
      distribuidor: form.distribuidor.trim() || null,
      imagen_url:   form.imagen_url.trim() || null,
    }

    const { error } = id ? await actualizarProducto(id, campos) : await crearProducto(campos)
    if (error) { showToast('❌ Error al guardar: ' + error.message); return }
    showToast(id ? '✅ Producto actualizado.' : '✅ Producto creado.')
    setEditando(undefined)
    cargar()
  }

  async function handleEliminar(id) {
    if (!confirm(`¿Eliminar el producto #${id}? Esta acción no se puede deshacer.`)) return
    const { error } = await eliminarProducto(id)
    if (error) { showToast('❌ Error al eliminar.'); return }
    showToast('🗑️ Producto eliminado.')
    cargar()
  }

  const q = busqueda.toLowerCase()
  const filtrados = q
    ? productos.filter(p => p.descripcion?.toLowerCase().includes(q) || p.codigo?.toLowerCase().includes(q))
    : productos

  return (
    <div id="admin-productos-content">
      <div className="admin-toolbar">
        <input type="text" className="admin-search" placeholder="🔍 Buscar por nombre o código..."
          value={busqueda} onChange={e => setBusq(e.target.value)} />
        <button className="admin-btn admin-btn-ok" onClick={() => setEditando(null)}>+ Nuevo producto</button>
      </div>

      {editando !== undefined && (
        <FormProducto editando={editando} categorias={categorias} onGuardar={handleGuardar} onCancelar={() => setEditando(undefined)} />
      )}

      {loading
        ? <div className="admin-loading">⚙️ Cargando productos...</div>
        : (
          <div id="admin-tabla-productos">
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Código</th><th>Descripción</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Distribuidor</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {filtrados.map(p => (
                    <tr key={p.id_producto}>
                      <td>{esc(p.codigo) || '—'}</td>
                      <td>{esc(p.descripcion)}</td>
                      <td>{esc(p.categoria?.nombre_categoria) || '—'}</td>
                      <td>{p.precio != null ? '$' + Number(p.precio).toLocaleString('es-CL') : '—'}</td>
                      <td>{esc(p.stock) || '—'}</td>
                      <td>{esc(p.distribuidor) || '—'}</td>
                      <td className="admin-acciones">
                        <button className="admin-btn-sm admin-btn-info" onClick={() => setEditando(p)}>✏️</button>
                        <button className="admin-btn-sm admin-btn-danger" onClick={() => handleEliminar(p.id_producto)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-table-footer">Mostrando {filtrados.length} de {productos.length} productos</div>
          </div>
        )
      }
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TAB CATEGORÍAS
══════════════════════════════════════════════════ */
function TabCategorias() {
  const { showToast } = useToast()
  const [categorias, setCategorias] = useState([])
  const [loading, setL]    = useState(true)
  const [nueva, setNueva]  = useState('')
  const [editandoId, setEditandoId]   = useState(null)
  const [editNombre, setEditNombre]   = useState('')

  async function cargar() {
    setL(true)
    const { data } = await obtenerCategoriasAdmin()
    setCategorias(data || [])
    setL(false)
  }

  useEffect(() => { cargar() }, [])

  async function handleCrear() {
    if (!nueva.trim()) { showToast('❌ Ingresa un nombre para la categoría.'); return }
    const { error } = await crearCategoria(nueva.trim())
    if (error) { showToast('❌ Error: ' + error.message); return }
    showToast('✅ Categoría creada.')
    setNueva('')
    cargar()
  }

  async function handleGuardar(id) {
    if (!editNombre.trim()) { showToast('❌ El nombre no puede estar vacío.'); return }
    const { error } = await actualizarCategoria(id, editNombre.trim())
    if (error) { showToast('❌ Error: ' + error.message); return }
    showToast('✅ Categoría actualizada.')
    setEditandoId(null)
    cargar()
  }

  async function handleEliminar(id) {
    if (!confirm('¿Eliminar esta categoría? Solo es posible si no tiene productos asociados.')) return
    const { error } = await eliminarCategoria(id)
    if (error) { showToast('❌ ' + error.message); return }
    showToast('🗑️ Categoría eliminada.')
    cargar()
  }

  return (
    <div id="admin-categorias-content">
      <div className="admin-form-box">
        <h4>Nueva categoría</h4>
        <div className="admin-form-inline">
          <input type="text" className="admin-input-inline" placeholder="Nombre de la categoría"
            value={nueva} onChange={e => setNueva(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCrear()} />
          <button className="admin-btn admin-btn-ok" onClick={handleCrear}>+ Agregar</button>
        </div>
      </div>

      {loading
        ? <div className="admin-loading">⚙️ Cargando categorías...</div>
        : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>#</th><th>Nombre</th><th>Acciones</th></tr></thead>
              <tbody>
                {categorias.map(c => (
                  <tr key={c.id_categoria}>
                    <td>{c.id_categoria}</td>
                    <td>
                      {editandoId === c.id_categoria
                        ? <input type="text" className="admin-input-edit" value={editNombre}
                            onChange={e => setEditNombre(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleGuardar(c.id_categoria)}
                            autoFocus />
                        : esc(c.nombre_categoria)
                      }
                    </td>
                    <td className="admin-acciones">
                      {editandoId === c.id_categoria
                        ? <>
                            <button className="admin-btn-sm admin-btn-ok" onClick={() => handleGuardar(c.id_categoria)}>💾 Guardar</button>
                            <button className="admin-btn-sm admin-btn-neutral" onClick={() => setEditandoId(null)}>Cancelar</button>
                          </>
                        : <>
                            <button className="admin-btn-sm admin-btn-info" onClick={() => { setEditandoId(c.id_categoria); setEditNombre(c.nombre_categoria) }}>✏️ Editar</button>
                            <button className="admin-btn-sm admin-btn-danger" onClick={() => handleEliminar(c.id_categoria)}>🗑️</button>
                          </>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TAB REPORTES
══════════════════════════════════════════════════ */
function TabReportes() {
  const [ranking, setRanking] = useState([])
  const [stock, setStock]     = useState({})
  const [loading, setL]       = useState(true)

  useEffect(() => {
    Promise.all([obtenerReporteProductosMasCotizados(), obtenerReporteStock()])
      .then(([r, s]) => { setRanking(r.data || []); setStock(s.data || {}); setL(false) })
  }, [])

  if (loading) return <div className="admin-loading">⚙️ Generando reportes...</div>

  const sinStock   = stock.sinStock   || []
  const stockBajo  = stock.stockBajo  || []
  const stockMedio = stock.stockMedio || []
  const suficiente = stock.suficiente || []

  return (
    <div id="admin-reportes-content">
      <div className="admin-reporte-bloque">
        <h3>📊 Resumen — productos más cotizados</h3>
        {ranking.length === 0
          ? <p className="admin-empty">Sin datos suficientes todavía.</p>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Pos.</th><th>Código</th><th>Producto</th><th>Veces cotizado</th></tr></thead>
                <tbody>
                  {ranking.map((p, i) => (
                    <tr key={i}>
                      <td><strong>#{i + 1}</strong></td>
                      <td>{esc(p.codigo) || '—'}</td>
                      <td>{esc(p.nombre) || '—'}</td>
                      <td><span className="admin-badge-info">{p.total}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      <div className="admin-reporte-bloque">
        <h3>📦 Estado del stock</h3>
        <div className="admin-kpi-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { num: sinStock.length,   label: 'Sin stock',         cls: 'admin-kpi-danger' },
            { num: stockBajo.length,  label: 'Stock bajo (≤5)',    cls: 'admin-kpi-warn' },
            { num: stockMedio.length, label: 'Stock medio (6-20)', cls: 'admin-kpi-info' },
            { num: suficiente.length, label: 'Stock suficiente',   cls: 'admin-kpi-ok' },
          ].map(k => (
            <div key={k.label} className={`admin-kpi ${k.cls}`}>
              <div className="admin-kpi-num">{k.num}</div>
              <div className="admin-kpi-label">{k.label}</div>
            </div>
          ))}
        </div>

        {sinStock.length > 0 && (
          <>
            <h4 style={{ margin: '1.5rem 0 0.5rem', color: '#cc3333' }}>⚠️ Productos sin stock</h4>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
                <tbody>
                  {sinStock.slice(0, 20).map((p, i) => (
                    <tr key={i}><td>{esc(p.codigo) || '—'}</td><td>{esc(p.descripcion)}</td><td>{esc(p.categoria?.nombre_categoria) || '—'}</td><td><span className="admin-badge-danger">0</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {stockBajo.length > 0 && (
          <>
            <h4 style={{ margin: '1.5rem 0 0.5rem', color: '#e07b00' }}>⚠️ Productos con stock bajo (≤5 unidades)</h4>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
                <tbody>
                  {stockBajo.slice(0, 20).map((p, i) => (
                    <tr key={i}><td>{esc(p.codigo) || '—'}</td><td>{esc(p.descripcion)}</td><td>{esc(p.categoria?.nombre_categoria) || '—'}</td><td><span className="admin-badge-warn">{p.stockNum}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PÁGINA ADMIN
══════════════════════════════════════════════════ */
export default function Admin() {
  const [tab, setTab] = useState('dashboard')

  return (
    <section id="page-admin" className="vma-page">
      <div className="admin-container">
        <h2 className="admin-titulo">Panel de Administración</h2>

        <div className="admin-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`admin-tab-btn${tab === t.id ? ' active' : ''}`} data-tab={t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {tab === 'dashboard'    && <TabDashboard onIrA={setTab} />}
          {tab === 'cotizaciones' && <TabCotizaciones />}
          {tab === 'usuarios'     && <TabUsuarios />}
          {tab === 'productos'    && <TabProductos />}
          {tab === 'categorias'   && <TabCategorias />}
          {tab === 'reportes'     && <TabReportes />}
        </div>
      </div>
    </section>
  )
}
