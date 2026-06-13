import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { obtenerMisCotizaciones } from '../services/cotizacionService.js'
import { supabase } from '../services/supabase.js'

const BADGE = {
  pendiente:  { cls: 'mc-badge-warn', label: '⏳ Pendiente' },
  revisada:   { cls: 'mc-badge-info', label: '🔍 En revisión' },
  respondida: { cls: 'mc-badge-ok',   label: '✅ Respondida' },
}

function formatFecha(iso) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
}
function formatHora(iso) {
  return new Date(iso).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
}

/* ── Tarjeta ─────────────────────────────────── */
function Tarjeta({ c, onVerDetalle, onDescargarPDF, onIniciarPago }) {
  const prods = c.productos_solicitados || []
  const resumen = prods.length > 0
    ? prods.slice(0, 3).map(p => p.nombre || p.codigo || 'Producto').join(', ') +
      (prods.length > 3 ? ` y ${prods.length - 3} más...` : '')
    : 'Sin productos especificados'
  const badge = BADGE[c.estado] || BADGE.pendiente

  return (
    <div className="mc-tarjeta" id={`mc-card-${c.id}`}>
      <div className="mc-tarjeta-header">
        <div className="mc-tarjeta-id">
          <span className="mc-num">#{c.id}</span>
          <span className={badge.cls}>{badge.label}</span>
        </div>
        <div className="mc-tarjeta-fecha">
          <span>📅 {formatFecha(c.created_at)}</span>
          <span className="mc-hora">🕐 {formatHora(c.created_at)}</span>
        </div>
      </div>

      <div className="mc-tarjeta-body">
        <div className="mc-info-row">
          <span className="mc-info-label">Empresa</span>
          <span className="mc-info-val">{c.empresa || '—'}</span>
        </div>
        <div className="mc-info-row">
          <span className="mc-info-label">Productos</span>
          <span className="mc-info-val mc-prods-resumen">{resumen}</span>
        </div>
        {c.precio_final > 0 && (
          <div className="mc-info-row mc-precio-row">
            <span className="mc-info-label">Precio acordado</span>
            <span className="mc-info-val mc-precio-final">${Number(c.precio_final).toLocaleString('es-CL')}</span>
          </div>
        )}
        {c.mensaje && (
          <div className="mc-info-row">
            <span className="mc-info-label">Mensaje</span>
            <span className="mc-info-val mc-mensaje">{c.mensaje}</span>
          </div>
        )}
      </div>

      <div className="mc-tarjeta-footer">
        <span className="mc-prod-count">📦 {prods.length} producto{prods.length !== 1 ? 's' : ''}</span>
        <div className="mc-acciones">
          <button className="mc-btn mc-btn-detail" onClick={() => onVerDetalle(c)}>🔍 Ver detalle</button>
          <button className="mc-btn mc-btn-pdf"    onClick={() => onDescargarPDF(c)}>⬇️ Descargar PDF</button>
          {c.precio_final > 0 && (
            <button className="mc-btn mc-btn-pagar" onClick={() => onIniciarPago(c)}>
              💳 Pagar ${Number(c.precio_final).toLocaleString('es-CL')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Modal de detalle ────────────────────────── */
function DetalleModal({ c, onClose, onDescargarPDF, onIniciarPago }) {
  if (!c) return null
  const prods = c.productos_solicitados || []
  const badge = BADGE[c.estado] || BADGE.pendiente
  const estadosDone = { pendiente: ['pendiente'], revisada: ['pendiente','revisada'], respondida: ['pendiente','revisada','respondida'] }
  const done = estadosDone[c.estado] || []

  return (
    <div id="mc-modal" style={{ display: 'flex' }} className="visible" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="mc-modal-content">
        <div className="mc-modal-header">
          <h3 id="mc-modal-title">
            Cotización <strong>#{c.id}</strong> &nbsp;<span className={badge.cls}>{badge.label}</span>
          </h3>
          <button className="mc-modal-close" onClick={onClose}>✕</button>
        </div>

        <div id="mc-modal-body" className="mc-detalle">
          {/* Datos solicitante */}
          <div className="mc-detalle-seccion">
            <h4 className="mc-detalle-titulo">📋 Datos de la solicitud</h4>
            <div className="mc-detalle-grid">
              {[['Nombre', c.nombre], ['Empresa', c.empresa], ['Email', c.email], ['Teléfono', c.telefono]].map(([label, val]) => (
                <div key={label} className="mc-detalle-item">
                  <span className="mc-detalle-label">{label}</span>
                  <span className="mc-detalle-val">{val || '—'}</span>
                </div>
              ))}
              <div className="mc-detalle-item mc-detalle-full">
                <span className="mc-detalle-label">Fecha de envío</span>
                <span className="mc-detalle-val">
                  {new Date(c.created_at).toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
              {c.precio_final > 0 && (
                <div className="mc-detalle-item mc-detalle-full">
                  <span className="mc-detalle-label">Precio final acordado</span>
                  <span className="mc-detalle-val mc-precio-acordado">${Number(c.precio_final).toLocaleString('es-CL')}</span>
                </div>
              )}
              {c.mensaje && (
                <div className="mc-detalle-item mc-detalle-full">
                  <span className="mc-detalle-label">Mensaje adicional</span>
                  <span className="mc-detalle-val mc-mensaje-det">{c.mensaje}</span>
                </div>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="mc-detalle-seccion">
            <h4 className="mc-detalle-titulo">📦 Productos solicitados</h4>
            {prods.length === 0 ? (
              <p className="mc-empty-prods">No se especificaron productos.</p>
            ) : (
              <div className="mc-prod-table-wrap">
                <table className="mc-prod-table">
                  <thead>
                    <tr>
                      <th>#</th><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio unit.</th>
                      {c.estado === 'respondida' && <><th className="mc-th-respondido">P. acordado</th><th className="mc-th-respondido">Subtotal</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {prods.map((p, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td className="mc-prod-cod">{p.codigo || '—'}</td>
                        <td>{p.nombre || 'Producto sin nombre'}</td>
                        <td className="mc-prod-cant">{p.cantidad || 1}</td>
                        <td className="mc-prod-precio">{p.precio && p.precio !== 'Consultar' ? `$${Number(p.precio).toLocaleString('es-CL')}` : 'A consultar'}</td>
                        {c.estado === 'respondida' && (
                          <>
                            <td className="mc-prod-precio mc-precio-acordado-cell">{p.precio_respondido ? `$${Number(p.precio_respondido).toLocaleString('es-CL')}` : '—'}</td>
                            <td className="mc-prod-precio mc-precio-acordado-cell" style={{ fontWeight: 600 }}>{p.precio_respondido ? `$${(Number(p.precio_respondido) * (p.cantidad||1)).toLocaleString('es-CL')}` : '—'}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="mc-detalle-seccion">
            <h4 className="mc-detalle-titulo">📊 Estado de la solicitud</h4>
            <div className="mc-timeline">
              <div className={`mc-tl-step${done.includes('pendiente') ? ' done' : ''}`}><div className="mc-tl-dot"/><div className="mc-tl-label">Recibida</div></div>
              <div className={`mc-tl-line${done.includes('revisada') ? ' done' : ''}`}/>
              <div className={`mc-tl-step${done.includes('revisada') ? ' done' : ''}`}><div className="mc-tl-dot"/><div className="mc-tl-label">En revisión</div></div>
              <div className={`mc-tl-line${done.includes('respondida') ? ' done' : ''}`}/>
              <div className={`mc-tl-step${done.includes('respondida') ? ' done' : ''}`}><div className="mc-tl-dot"/><div className="mc-tl-label">Respondida</div></div>
            </div>
            <p className="mc-estado-msg">
              {c.estado === 'pendiente' && '⏳ Tu solicitud fue recibida y está en cola de revisión. Te contactaremos pronto.'}
              {c.estado === 'revisada'  && '🔍 Nuestro equipo está analizando tu solicitud. Pronto recibirás una respuesta.'}
              {c.estado === 'respondida' && '✅ Esta cotización fue respondida. Si no recibiste respuesta, contáctanos.'}
            </p>
          </div>
        </div>

        <div className="mc-modal-footer">
          {c.precio_final > 0 && (
            <button className="mc-btn mc-btn-pagar mc-btn-lg" onClick={() => { onIniciarPago(c); onClose() }}>
              💳 Pagar ${Number(c.precio_final).toLocaleString('es-CL')}
            </button>
          )}
          <button className="mc-btn mc-btn-pdf mc-btn-lg" onClick={() => { onDescargarPDF(c); onClose() }}>⬇️ Descargar PDF</button>
          <button className="mc-btn mc-btn-neutral mc-btn-lg" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

/* ── Página principal ────────────────────────── */
export default function MisCotizaciones() {
  const { authState } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtro, setFiltro] = useState('todas')
  const [detalle, setDetalle] = useState(null)

  useEffect(() => {
    obtenerMisCotizaciones(authState.perfil?.id).then(({ data, error }) => {
      setLoading(false)
      if (error) { setError(error); return }
      setCotizaciones(data || [])
    })
  }, [])

  const descargarPDF = useCallback((c) => {
    if (typeof window.jspdf === 'undefined') { showToast('❌ Error al cargar la librería PDF.'); return }
    const { jsPDF } = window.jspdf
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const AZUL=[0,59,92], VERDE=[132,189,0], GRIS=[85,94,106], BLANCO=[255,255,255], GRIS_CL=[244,246,248]
    const W = doc.internal.pageSize.getWidth()
    let y = 0

    doc.setFillColor(...AZUL); doc.rect(0,0,W,38,'F')
    doc.setFillColor(...VERDE); doc.rect(0,36,W,3,'F')
    doc.setTextColor(...BLANCO)
    doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.text('VMA INDUSTRIAL',14,16)
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.text('Gases industriales · Soldaduras · Equipos de seguridad',14,29)
    doc.setFont('helvetica','bold'); doc.setFontSize(11)
    const numText=`Cotización N° ${c.id}`; doc.text(numText,W-14-doc.getTextWidth(numText),18)
    doc.setFont('helvetica','normal'); doc.setFontSize(8)
    const fechaStr=new Date(c.created_at).toLocaleDateString('es-CL',{day:'2-digit',month:'long',year:'numeric'})
    doc.text(fechaStr,W-14-doc.getTextWidth(fechaStr),26)
    const estadoLabel={pendiente:'PENDIENTE',revisada:'EN REVISIÓN',respondida:'RESPONDIDA'}[c.estado]||c.estado.toUpperCase()
    const estadoColor={pendiente:[224,123,0],revisada:[0,100,180],respondida:[50,150,50]}[c.estado]||AZUL
    doc.setFillColor(...estadoColor); doc.roundedRect(W-54,29,40,6,1,1,'F')
    doc.setTextColor(...BLANCO); doc.setFont('helvetica','bold'); doc.setFontSize(7.5)
    doc.text(estadoLabel,W-34,33.2,{align:'center'})
    y=48

    doc.setFillColor(...GRIS_CL); doc.roundedRect(14,y,W-28,6,1,1,'F')
    doc.setTextColor(...AZUL); doc.setFont('helvetica','bold'); doc.setFontSize(9)
    doc.text('DATOS DEL SOLICITANTE',18,y+4.2); y+=10

    const campos=[['Nombre',c.nombre||'—'],['Empresa',c.empresa||'—'],['Email',c.email||'—'],['Teléfono',c.telefono||'—']]
    doc.setFont('helvetica','normal'); doc.setFontSize(9)
    campos.forEach(([label,val],i)=>{
      const col=i%2===0?14:W/2+2
      if(i%2===0&&i>0)y+=10
      doc.setTextColor(...GRIS); doc.setFont('helvetica','bold'); doc.text(label+':',col,y)
      doc.setTextColor(30,30,30); doc.setFont('helvetica','normal')
      doc.text(val,col+doc.getTextWidth(label+': '),y)
    }); y+=14

    if(c.mensaje){
      doc.setTextColor(...GRIS); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('Mensaje:',14,y); y+=5
      doc.setTextColor(30,30,30); doc.setFont('helvetica','normal')
      const lineas=doc.splitTextToSize(c.mensaje,W-28); doc.text(lineas,14,y); y+=lineas.length*5+6
    }

    doc.setFillColor(...GRIS_CL); doc.roundedRect(14,y,W-28,6,1,1,'F')
    doc.setTextColor(...AZUL); doc.setFont('helvetica','bold'); doc.setFontSize(9)
    doc.text('PRODUCTOS SOLICITADOS',18,y+4.2); y+=10

    const prods=c.productos_solicitados||[]
    if(prods.length===0){
      doc.setTextColor(...GRIS); doc.setFont('helvetica','italic'); doc.setFontSize(9)
      doc.text('No se especificaron productos en esta cotización.',14,y); y+=10
    } else {
      const cols={num:14,cod:20,nom:50,cant:158,precio:174},thH=7
      doc.setFillColor(...AZUL); doc.rect(14,y,W-28,thH,'F')
      doc.setTextColor(...BLANCO); doc.setFont('helvetica','bold'); doc.setFontSize(8)
      doc.text('#',cols.num,y+4.8); doc.text('Código',cols.cod,y+4.8)
      doc.text('Descripción',cols.nom,y+4.8); doc.text('Cant.',cols.cant,y+4.8,{align:'right'})
      doc.text('Precio ref.',cols.precio,y+4.8); y+=thH
      prods.forEach((p,i)=>{
        if(i%2===0){doc.setFillColor(250,251,252); doc.rect(14,y,W-28,7,'F')}
        doc.setTextColor(30,30,30); doc.setFont('helvetica','normal'); doc.setFontSize(8)
        doc.text(String(i+1),cols.num,y+4.8); doc.text(p.codigo||'—',cols.cod,y+4.8)
        doc.text((p.nombre||'Producto sin nombre').substring(0,100),cols.nom,y+4.8)
        doc.text(String(p.cantidad||1),cols.cant,y+4.8,{align:'right'})
        const pStr=p.precio&&p.precio!=='Consultar'?'$'+Number(p.precio).toLocaleString('es-CL'):'A consultar'
        doc.text(pStr,cols.precio,y+4.8); y+=7
      })
      doc.setDrawColor(...AZUL); doc.setLineWidth(0.3); doc.line(14,y,W-14,y); y+=8
    }

    y+=6
    doc.setFillColor(...GRIS_CL); doc.roundedRect(14,y,W-28,18,2,2,'F')
    doc.setTextColor(...GRIS); doc.setFont('helvetica','italic'); doc.setFontSize(8)
    doc.text('ℹ️  Los precios indicados son de referencia. El valor final será confirmado por nuestro equipo.',18,y+6)
    doc.text('Para consultas, contáctenos a través del sitio web o por teléfono.',18,y+12)

    const pH=doc.internal.pageSize.getHeight()
    doc.setFillColor(...AZUL); doc.rect(0,pH-14,W,14,'F')
    doc.setFillColor(...VERDE); doc.rect(0,pH-14,W,2,'F')
    doc.setTextColor(...BLANCO); doc.setFont('helvetica','normal'); doc.setFontSize(7.5)
    doc.text('VMA Industrial —',14,pH-5)
    const gen=`Generado el ${new Date().toLocaleDateString('es-CL')} a las ${new Date().toLocaleTimeString('es-CL',{hour:'2-digit',minute:'2-digit'})}`
    doc.text(gen,W-14-doc.getTextWidth(gen),pH-5)
    doc.save(`VMA-Cotizacion-${c.id}.pdf`)
    showToast('✅ PDF descargado correctamente.')
  }, [showToast])

  const iniciarPago = useCallback(async (c) => {
    if (!c?.precio_final) return
    showToast('⏳ Iniciando pago...')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) { showToast('❌ Debes iniciar sesión para pagar.'); return }
      const resp = await fetch('https://hlyjfkybecuicgtefooj.supabase.co/functions/v1/crear-transaccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cotizacion_id: c.id }),
      })
      const data = await resp.json()
      if (!resp.ok || !data.url || !data.token_ws) { showToast('❌ Error al iniciar el pago. Intenta nuevamente.'); return }
      window.location.href = `${data.url}?token_ws=${data.token_ws}`
    } catch (err) {
      showToast('❌ Error al conectar con el servidor de pago.')
    }
  }, [showToast])

  const filtradas = filtro === 'todas' ? cotizaciones : cotizaciones.filter(c => c.estado === filtro)
  const cnt = (estado) => cotizaciones.filter(c => c.estado === estado).length

  if (loading) return (
    <section className="vma-page"><div className="mc-loading"><div className="mc-spinner"/><p>Cargando tus cotizaciones...</p></div></section>
  )
  if (error) return (
    <section className="vma-page"><div className="mc-error">❌ Error al cargar tus cotizaciones. Intenta de nuevo más tarde.</div></section>
  )

  return (
    <section id="page-mis-cotizaciones" className="vma-page">
      <div className="mc-container">
        <h2 className="mc-titulo">Mis Cotizaciones</h2>

        {/* Filtros */}
        <div id="mc-filtros-wrap">
          <div className="mc-filtros">
            {[['todas','Todas',cotizaciones.length],['pendiente','Pendientes',cnt('pendiente')],['revisada','En revisión',cnt('revisada')],['respondida','Respondidas',cnt('respondida')]].map(([val,label,n]) => (
              <button key={val} className={`mc-filtro-btn${filtro===val?' active':''}`} onClick={() => setFiltro(val)}>
                {label} <span className="mc-badge">{n}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div id="mc-content">
          {filtradas.length === 0 ? (
            <div className="mc-empty">
              <div className="mc-empty-icon">📋</div>
              <p>{filtro==='todas'?'📭 Aún no has enviado ninguna cotización.':filtro==='pendiente'?'✅ No tienes cotizaciones pendientes.':filtro==='revisada'?'No tienes cotizaciones en revisión.':'Aún no tienes cotizaciones respondidas.'}</p>
              {filtro==='todas' && <button className="mc-btn-nueva" onClick={() => navigate('/cotizacion')}>➕ Solicitar cotización</button>}
            </div>
          ) : (
            <>
              <div className="mc-lista">
                {filtradas.map(c => (
                  <Tarjeta key={c.id} c={c} onVerDetalle={setDetalle} onDescargarPDF={descargarPDF} onIniciarPago={iniciarPago} />
                ))}
              </div>
              <div className="mc-nueva-wrap">
                <button className="mc-btn-nueva" onClick={() => navigate('/cotizacion')}>➕ Nueva cotización</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal detalle */}
      {detalle && (
        <DetalleModal c={detalle} onClose={() => setDetalle(null)} onDescargarPDF={descargarPDF} onIniciarPago={iniciarPago} />
      )}
    </section>
  )
}
