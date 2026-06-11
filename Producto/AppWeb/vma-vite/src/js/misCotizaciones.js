/**
 * src/js/misCotizaciones.js
 * ─────────────────────────────────────────────
 * Vista "Mis Cotizaciones" para el cliente.
 * Muestra historial, estado y detalle de cada
 * cotización enviada. Permite descargar PDF.
 *
 * Solo accesible si el usuario está logueado.
 * ─────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════
   ESTADO LOCAL
═══════════════════════════════════════════════ */
const mcState = {
  cotizaciones: [],
  filtro: 'todas',   // 'todas' | 'pendiente' | 'revisada' | 'respondida'
  cargando: false,
}

/* ═══════════════════════════════════════════════
   INICIALIZAR
═══════════════════════════════════════════════ */
export async function initMisCotizaciones() {
  if (!window.authState?.loggedIn) {
    showPage('page-login')
    return
  }
  await cargarMisCotizaciones()
}
window.initMisCotizaciones = initMisCotizaciones

/* ═══════════════════════════════════════════════
   CARGA DE DATOS
═══════════════════════════════════════════════ */
async function cargarMisCotizaciones() {
  const cont = document.getElementById('mc-content')
  if (!cont) return

  mcState.cargando = true
  cont.innerHTML = `
    <div class="mc-loading">
      <div class="mc-spinner"></div>
      <p>Cargando tus cotizaciones...</p>
    </div>
  `

  const { data, error } = await window.cotizacionService.obtenerMisCotizaciones()

  mcState.cargando = false

  if (error) {
    cont.innerHTML = `<div class="mc-error">❌ Error al cargar tus cotizaciones. Intenta de nuevo más tarde.</div>`
    return
  }

  mcState.cotizaciones = data || []
  renderContador()
  renderLista()
}

/* ═══════════════════════════════════════════════
   RENDER — CONTADOR DE ESTADOS
═══════════════════════════════════════════════ */
function renderContador() {
  const wrap = document.getElementById('mc-filtros-wrap')
  if (!wrap) return

  const total      = mcState.cotizaciones.length
  const pendientes = mcState.cotizaciones.filter(c => c.estado === 'pendiente').length
  const revisadas  = mcState.cotizaciones.filter(c => c.estado === 'revisada').length
  const respondidas= mcState.cotizaciones.filter(c => c.estado === 'respondida').length

  wrap.innerHTML = `
    <div class="mc-filtros">
      <button class="mc-filtro-btn ${mcState.filtro === 'todas'      ? 'active' : ''}" onclick="mcFiltrar('todas')">
        Todas <span class="mc-badge">${total}</span>
      </button>
      <button class="mc-filtro-btn mc-warn ${mcState.filtro === 'pendiente'  ? 'active' : ''}" onclick="mcFiltrar('pendiente')">
        Pendientes <span class="mc-badge">${pendientes}</span>
      </button>
      <button class="mc-filtro-btn mc-info ${mcState.filtro === 'revisada'   ? 'active' : ''}" onclick="mcFiltrar('revisada')">
        En revisión <span class="mc-badge">${revisadas}</span>
      </button>
      <button class="mc-filtro-btn mc-ok ${mcState.filtro === 'respondida' ? 'active' : ''}" onclick="mcFiltrar('respondida')">
        Respondidas <span class="mc-badge">${respondidas}</span>
      </button>
    </div>
  `
}

/* ═══════════════════════════════════════════════
   RENDER — LISTA DE COTIZACIONES
═══════════════════════════════════════════════ */
function renderLista() {
  const cont = document.getElementById('mc-content')
  if (!cont) return

  const filtradas = mcState.filtro === 'todas'
    ? mcState.cotizaciones
    : mcState.cotizaciones.filter(c => c.estado === mcState.filtro)

  if (filtradas.length === 0) {
    const msgs = {
      todas:       '📭 Aún no has enviado ninguna cotización.',
      pendiente:   '✅ No tienes cotizaciones pendientes.',
      revisada:    'No tienes cotizaciones en revisión.',
      respondida:  'Aún no tienes cotizaciones respondidas.',
    }
    cont.innerHTML = `
      <div class="mc-empty">
        <div class="mc-empty-icon">📋</div>
        <p>${msgs[mcState.filtro] || 'Sin resultados.'}</p>
        ${mcState.filtro === 'todas'
          ? `<button class="mc-btn-nueva" onclick="showPage('page-cotizacion')">➕ Solicitar cotización</button>`
          : ''}
      </div>
    `
    return
  }

  cont.innerHTML = `
    <div class="mc-lista">
      ${filtradas.map(c => renderTarjeta(c)).join('')}
    </div>
    <div class="mc-nueva-wrap">
      <button class="mc-btn-nueva" onclick="showPage('page-cotizacion')">➕ Nueva cotización</button>
    </div>
  `
}

/* ─── Tarjeta individual ─── */
function renderTarjeta(c) {
  const prods    = c.productos_solicitados || []
  const fecha    = new Date(c.created_at).toLocaleDateString('es-CL', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const hora     = new Date(c.created_at).toLocaleTimeString('es-CL', {
    hour: '2-digit', minute: '2-digit'
  })
  const badgeClass = { pendiente: 'mc-badge-warn', revisada: 'mc-badge-info', respondida: 'mc-badge-ok' }[c.estado] || 'mc-badge-warn'
  const badgeLabel = { pendiente: '⏳ Pendiente', revisada: '🔍 En revisión', respondida: '✅ Respondida' }[c.estado] || c.estado

  const resumenProds = prods.length > 0
    ? prods.slice(0, 3).map(p => escHtml(p.nombre || p.codigo || 'Producto')).join(', ') +
      (prods.length > 3 ? ` y ${prods.length - 3} más...` : '')
    : 'Sin productos especificados'

  return `
    <div class="mc-tarjeta" id="mc-card-${c.id}">
      <div class="mc-tarjeta-header">
        <div class="mc-tarjeta-id">
          <span class="mc-num">#${c.id}</span>
          <span class="${badgeClass}">${badgeLabel}</span>
        </div>
        <div class="mc-tarjeta-fecha">
          <span>📅 ${fecha}</span>
          <span class="mc-hora">🕐 ${hora}</span>
        </div>
      </div>

      <div class="mc-tarjeta-body">
        <div class="mc-info-row">
          <span class="mc-info-label">Empresa</span>
          <span class="mc-info-val">${escHtml(c.empresa || '—')}</span>
        </div>
        <div class="mc-info-row">
          <span class="mc-info-label">Productos</span>
          <span class="mc-info-val mc-prods-resumen">${escHtml(resumenProds)}</span>
        </div>
        ${c.precio_final > 0 ? `
        <div class="mc-info-row mc-precio-row">
          <span class="mc-info-label">Precio acordado</span>
          <span class="mc-info-val mc-precio-final">$${Number(c.precio_final).toLocaleString('es-CL')}</span>
        </div>` : ''}
        ${c.mensaje ? `
        <div class="mc-info-row">
          <span class="mc-info-label">Mensaje</span>
          <span class="mc-info-val mc-mensaje">${escHtml(c.mensaje)}</span>
        </div>` : ''}
      </div>

      <div class="mc-tarjeta-footer">
        <span class="mc-prod-count">📦 ${prods.length} producto${prods.length !== 1 ? 's' : ''}</span>
        <div class="mc-acciones">
          <button class="mc-btn mc-btn-detail" onclick="mcVerDetalle(${c.id})">
            🔍 Ver detalle
          </button>
          <button class="mc-btn mc-btn-pdf" onclick="mcDescargarPDF(${c.id})">
            ⬇️ Descargar PDF
          </button>
          ${c.precio_final > 0 ? `
          <button class="mc-btn mc-btn-pagar" onclick="mcIniciarPago(${c.id})">
            💳 Pagar $${Number(c.precio_final).toLocaleString('es-CL')}
          </button>` : ''}
        </div>
      </div>
    </div>
  `
}

/* ═══════════════════════════════════════════════
   MODAL DE DETALLE
═══════════════════════════════════════════════ */
window.mcVerDetalle = function(id) {
  const c = mcState.cotizaciones.find(x => x.id === id)
  if (!c) return

  const prods   = c.productos_solicitados || []
  const fecha   = new Date(c.created_at).toLocaleDateString('es-CL', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  })
  const badgeClass = { pendiente: 'mc-badge-warn', revisada: 'mc-badge-info', respondida: 'mc-badge-ok' }[c.estado] || 'mc-badge-warn'
  const badgeLabel = { pendiente: '⏳ Pendiente', revisada: '🔍 En revisión', respondida: '✅ Respondida' }[c.estado] || c.estado

  const modal = document.getElementById('mc-modal')
  document.getElementById('mc-modal-title').innerHTML =
    `Cotización <strong>#${c.id}</strong> &nbsp;<span class="${badgeClass}">${badgeLabel}</span>`

  document.getElementById('mc-modal-body').innerHTML = `
    <div class="mc-detalle">
      <!-- Info del solicitante -->
      <div class="mc-detalle-seccion">
        <h4 class="mc-detalle-titulo">📋 Datos de la solicitud</h4>
        <div class="mc-detalle-grid">
          <div class="mc-detalle-item">
            <span class="mc-detalle-label">Nombre</span>
            <span class="mc-detalle-val">${escHtml(c.nombre || '—')}</span>
          </div>
          <div class="mc-detalle-item">
            <span class="mc-detalle-label">Empresa</span>
            <span class="mc-detalle-val">${escHtml(c.empresa || '—')}</span>
          </div>
          <div class="mc-detalle-item">
            <span class="mc-detalle-label">Email</span>
            <span class="mc-detalle-val">${escHtml(c.email || '—')}</span>
          </div>
          <div class="mc-detalle-item">
            <span class="mc-detalle-label">Teléfono</span>
            <span class="mc-detalle-val">${escHtml(c.telefono || '—')}</span>
          </div>
          <div class="mc-detalle-item mc-detalle-full">
            <span class="mc-detalle-label">Fecha de envío</span>
            <span class="mc-detalle-val">${fecha}</span>
          </div>
          ${c.precio_final > 0 ? `
          <div class="mc-detalle-item mc-detalle-full">
            <span class="mc-detalle-label">Precio final acordado</span>
            <span class="mc-detalle-val mc-precio-acordado">$${Number(c.precio_final).toLocaleString('es-CL')}</span>
          </div>` : ''}
          ${c.mensaje ? `
          <div class="mc-detalle-item mc-detalle-full">
            <span class="mc-detalle-label">Mensaje adicional</span>
            <span class="mc-detalle-val mc-mensaje-det">${escHtml(c.mensaje)}</span>
          </div>` : ''}
        </div>
      </div>

      <!-- Productos solicitados -->
      <div class="mc-detalle-seccion">
        <h4 class="mc-detalle-titulo">📦 Productos solicitados</h4>
        ${prods.length === 0
          ? '<p class="mc-empty-prods">No se especificaron productos.</p>'
          : `<div class="mc-prod-table-wrap">
              <table class="mc-prod-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unit.</th>
                    ${c.estado === 'respondida' ? '<th class="mc-th-respondido">Precio acordado</th><th class="mc-th-respondido">Subtotal</th>' : ''}
                  </tr>
                </thead>
                <tbody>
                  ${prods.map((p, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td class="mc-prod-cod">${escHtml(p.codigo || '—')}</td>
                      <td>${escHtml(p.nombre || 'Producto sin nombre')}</td>
                      <td class="mc-prod-cant">${p.cantidad || 1}</td>
                      <td class="mc-prod-precio">${
                        p.precio && p.precio !== 'Consultar'
                          ? '$' + Number(p.precio).toLocaleString('es-CL')
                          : 'A consultar'
                      }</td>
                      ${c.estado === 'respondida' ? `
                      <td class="mc-prod-precio mc-precio-acordado-cell">
                        ${p.precio_respondido ? '$' + Number(p.precio_respondido).toLocaleString('es-CL') : '—'}
                      </td>
                      <td class="mc-prod-precio mc-precio-acordado-cell" style="font-weight:600">
                        ${p.precio_respondido ? '$' + (Number(p.precio_respondido) * (p.cantidad||1)).toLocaleString('es-CL') : '—'}
                      </td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
        }
      </div>

      <!-- Estado timeline -->
      <div class="mc-detalle-seccion">
        <h4 class="mc-detalle-titulo">📊 Estado de la solicitud</h4>
        <div class="mc-timeline">
          <div class="mc-tl-step ${['pendiente','revisada','respondida'].includes(c.estado) ? 'done' : ''}">
            <div class="mc-tl-dot"></div>
            <div class="mc-tl-label">Recibida</div>
          </div>
          <div class="mc-tl-line ${['revisada','respondida'].includes(c.estado) ? 'done' : ''}"></div>
          <div class="mc-tl-step ${['revisada','respondida'].includes(c.estado) ? 'done' : ''}">
            <div class="mc-tl-dot"></div>
            <div class="mc-tl-label">En revisión</div>
          </div>
          <div class="mc-tl-line ${c.estado === 'respondida' ? 'done' : ''}"></div>
          <div class="mc-tl-step ${c.estado === 'respondida' ? 'done' : ''}">
            <div class="mc-tl-dot"></div>
            <div class="mc-tl-label">Respondida</div>
          </div>
        </div>
        ${c.estado === 'pendiente' ? `
          <p class="mc-estado-msg">⏳ Tu solicitud fue recibida y está en cola de revisión. Te contactaremos pronto.</p>
        ` : c.estado === 'revisada' ? `
          <p class="mc-estado-msg">🔍 Nuestro equipo está analizando tu solicitud. Pronto recibirás una respuesta.</p>
        ` : `
          <p class="mc-estado-msg mc-respondida-msg">✅ Esta cotización fue respondida. Si no recibiste respuesta, contáctanos al 
            <a href="tel:+56" onclick="showPage('page-contacto');mcCerrarModal()">+56 ...</a>.
          </p>
        `}
      </div>
    </div>

    <div class="mc-modal-footer">
      ${c.precio_final > 0 ? `
      <button class="mc-btn mc-btn-pagar mc-btn-lg" onclick="mcIniciarPago(${c.id});mcCerrarModal()">
        💳 Pagar $${Number(c.precio_final).toLocaleString('es-CL')}
      </button>` : ''}
      <button class="mc-btn mc-btn-pdf mc-btn-lg" onclick="mcDescargarPDF(${c.id});mcCerrarModal()">
        ⬇️ Descargar PDF
      </button>
      <button class="mc-btn mc-btn-neutral mc-btn-lg" onclick="mcCerrarModal()">
        Cerrar
      </button>
    </div>
  `

  modal.style.display = 'flex'
  requestAnimationFrame(() => modal.classList.add('visible'))
}

window.mcCerrarModal = function() {
  const modal = document.getElementById('mc-modal')
  modal.classList.remove('visible')
  setTimeout(() => { modal.style.display = 'none' }, 220)
}

/* ═══════════════════════════════════════════════
   FILTRO
═══════════════════════════════════════════════ */
window.mcFiltrar = function(filtro) {
  mcState.filtro = filtro
  renderContador()
  renderLista()
}

/* ═══════════════════════════════════════════════
   DESCARGA PDF — jsPDF vía CDN
═══════════════════════════════════════════════ */
window.mcDescargarPDF = function(id) {
  const c = mcState.cotizaciones.find(x => x.id === id)
  if (!c) return

  // Verificar que jsPDF esté cargado
  if (typeof window.jspdf === 'undefined') {
    showToast('❌ Error al cargar la librería PDF. Intenta de nuevo.')
    return
  }

  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const AZUL    = [0, 59, 92]
  const VERDE   = [132, 189, 0]
  const GRIS    = [85, 94, 106]
  const BLANCO  = [255, 255, 255]
  const GRIS_CL = [244, 246, 248]

  const W = doc.internal.pageSize.getWidth()
  let y = 0

  // ── HEADER ──────────────────────────────────
  doc.setFillColor(...AZUL)
  doc.rect(0, 0, W, 38, 'F')

  doc.setFillColor(...VERDE)
  doc.rect(0, 36, W, 3, 'F')

  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('VMA INDUSTRIAL', 14, 16)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('', 14, 23)
  doc.text('Gases industriales · Soldaduras · Equipos de seguridad', 14, 29)

  // Número de cotización (derecha)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  const numText = `Cotización N° ${c.id}`
  const numW    = doc.getTextWidth(numText)
  doc.text(numText, W - 14 - numW, 18)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const fechaStr = new Date(c.created_at).toLocaleDateString('es-CL', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const fW = doc.getTextWidth(fechaStr)
  doc.text(fechaStr, W - 14 - fW, 26)

  // Estado
  const estadoLabel = { pendiente: 'PENDIENTE', revisada: 'EN REVISIÓN', respondida: 'RESPONDIDA' }[c.estado] || c.estado.toUpperCase()
  const estadoColor = { pendiente: [224, 123, 0], revisada: [0, 100, 180], respondida: [50, 150, 50] }[c.estado] || AZUL
  doc.setFillColor(...estadoColor)
  doc.roundedRect(W - 54, 29, 40, 6, 1, 1, 'F')
  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.text(estadoLabel, W - 34, 33.2, { align: 'center' })

  y = 48

  // ── DATOS DEL SOLICITANTE ──────────────────
  doc.setFillColor(...GRIS_CL)
  doc.roundedRect(14, y, W - 28, 6, 1, 1, 'F')
  doc.setTextColor(...AZUL)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('DATOS DEL SOLICITANTE', 18, y + 4.2)
  y += 10

  const campos = [
    ['Nombre',   c.nombre   || '—'],
    ['Empresa',  c.empresa  || '—'],
    ['Email',    c.email    || '—'],
    ['Teléfono', c.telefono || '—'],
  ]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  campos.forEach(([label, val], i) => {
    const col = i % 2 === 0 ? 14 : W / 2 + 2
    if (i % 2 === 0 && i > 0) y += 10

    doc.setTextColor(...GRIS)
    doc.setFont('helvetica', 'bold')
    doc.text(label + ':', col, y)

    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'normal')
    const labelW = doc.getTextWidth(label + ': ')
    doc.text(val, col + labelW, y)
  })

  y += 14

  // Mensaje (si existe)
  if (c.mensaje) {
    doc.setTextColor(...GRIS)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Mensaje:', 14, y)
    y += 5

    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'normal')
    const lineas = doc.splitTextToSize(c.mensaje, W - 28)
    doc.text(lineas, 14, y)
    y += lineas.length * 5 + 6
  }

  // ── PRODUCTOS SOLICITADOS ──────────────────
  doc.setFillColor(...GRIS_CL)
  doc.roundedRect(14, y, W - 28, 6, 1, 1, 'F')
  doc.setTextColor(...AZUL)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('PRODUCTOS SOLICITADOS', 18, y + 4.2)
  y += 10

  const prods = c.productos_solicitados || []

  if (prods.length === 0) {
    doc.setTextColor(...GRIS)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('No se especificaron productos en esta cotización.', 14, y)
    y += 10
  } else {
    // Cabecera de tabla
    const cols = { num: 14, cod: 20, nom: 50, cant: 158, precio: 174 }
    const thH  = 7

    doc.setFillColor(...AZUL)
    doc.rect(14, y, W - 28, thH, 'F')
    doc.setTextColor(...BLANCO)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text('#',            cols.num,   y + 4.8)
    doc.text('Código',       cols.cod,   y + 4.8)
    doc.text('Descripción',  cols.nom,   y + 4.8)
    doc.text('Cant.',        cols.cant,  y + 4.8, { align: 'right' })
    doc.text('Precio ref.',  cols.precio, y + 4.8)
    y += thH

    // Filas
    prods.forEach((p, i) => {
      const rowH = 7
      if (i % 2 === 0) {
        doc.setFillColor(250, 251, 252)
        doc.rect(14, y, W - 28, rowH, 'F')
      }

      doc.setTextColor(30, 30, 30)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)

      doc.text(String(i + 1),             cols.num,   y + 4.8)
      doc.text(p.codigo || '—',           cols.cod,   y + 4.8)

      // Truncar nombre si es muy largo
      const nomMax  = 100
      const nomText = (p.nombre || 'Producto sin nombre').substring(0, nomMax)
      doc.text(nomText,                   cols.nom,   y + 4.8)
      doc.text(String(p.cantidad || 1),   cols.cant,  y + 4.8, { align: 'right' })

      const precioStr = p.precio && p.precio !== 'Consultar'
        ? '$' + Number(p.precio).toLocaleString('es-CL')
        : 'A consultar'
      doc.text(precioStr,                 cols.precio, y + 4.8)

      y += rowH
    })

    // Línea inferior tabla
    doc.setDrawColor(...AZUL)
    doc.setLineWidth(0.3)
    doc.line(14, y, W - 14, y)
    y += 8
  }

  // ── NOTA AL PIE ───────────────────────────
  y += 6
  doc.setFillColor(...GRIS_CL)
  doc.roundedRect(14, y, W - 28, 18, 2, 2, 'F')
  doc.setTextColor(...GRIS)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.text('ℹ️  Los precios indicados son de referencia. El valor final será confirmado por nuestro equipo.', 18, y + 6)
  doc.text('Para consultas, contáctenos a través del sitio web o por teléfono.', 18, y + 12)

  // ── FOOTER ────────────────────────────────
  const pageH = doc.internal.pageSize.getHeight()
  doc.setFillColor(...AZUL)
  doc.rect(0, pageH - 14, W, 14, 'F')
  doc.setFillColor(...VERDE)
  doc.rect(0, pageH - 14, W, 2, 'F')

  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.text('VMA Industrial —', 14, pageH - 5)

  const generado = `Generado el ${new Date().toLocaleDateString('es-CL')} a las ${new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}`
  const genW = doc.getTextWidth(generado)
  doc.text(generado, W - 14 - genW, pageH - 5)

  // ── GUARDAR ───────────────────────────────
  doc.save(`VMA-Cotizacion-${c.id}.pdf`)
  showToast('✅ PDF descargado correctamente.')
}

/* ═══════════════════════════════════════════════
   PAGO CON TRANSBANK
═══════════════════════════════════════════════ */
window.mcIniciarPago = async function(id) {
  const c = mcState.cotizaciones.find(x => x.id === id)
  if (!c || !c.precio_final) return

  showToast('⏳ Iniciando pago...')

  try {
    const { data: { session } } = await window.supabaseClient.auth.getSession()
    const token = session?.access_token
    if (!token) { showToast('❌ Debes iniciar sesión para pagar.'); return }

    const resp = await fetch('https://hlyjfkybecuicgtefooj.supabase.co/functions/v1/crear-transaccion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ cotizacion_id: c.id }),
    })

    const data = await resp.json()
    if (!resp.ok || !data.url || !data.token_ws) {
      console.error('[VMA Pago] crear-transaccion error:', data)
      showToast('❌ Error al iniciar el pago. Intenta nuevamente.')
      return
    }

    window.location.href = `${data.url}?token_ws=${data.token_ws}`

  } catch (err) {
    console.error('[VMA Pago] mcIniciarPago excepción:', err)
    showToast('❌ Error al conectar con el servidor de pago.')
  }
}

/* ═══════════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════════ */
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
