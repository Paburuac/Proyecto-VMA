/**
 * src/js/panelTrabajador.js
 * ─────────────────────────────────────────────
 * Panel de gestión de cotizaciones para el rol
 * "trabajador". Permite ver, filtrar y cambiar
 * el estado de todas las cotizaciones.
 *
 * Solo accesible si authState.rol === 'trabajador'
 * ─────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════
   ESTADO LOCAL
═══════════════════════════════════════════════ */
const twState = {
  cotizaciones: [],
  filtro:       'todas',   // 'todas' | 'pendiente' | 'revisada' | 'respondida'
  busqueda:     '',
  cargando:     false,
}

/* ═══════════════════════════════════════════════
   INICIALIZAR
═══════════════════════════════════════════════ */
export async function initPanelTrabajador() {
  if (!window.authState?.loggedIn || window.authState?.rol !== 'trabajador') {
    showPage('page-inicio')
    return
  }
  await twCargarCotizaciones()
}
window.initPanelTrabajador = initPanelTrabajador

/* ═══════════════════════════════════════════════
   CARGA DE DATOS
═══════════════════════════════════════════════ */
async function twCargarCotizaciones() {
  const cont = document.getElementById('tw-content')
  if (!cont) return

  twState.cargando = true
  cont.innerHTML = `
    <div class="tw-loading">
      <div class="tw-spinner"></div>
      <p>Cargando cotizaciones...</p>
    </div>
  `

  const { data, error } = await window.cotizacionService.obtenerTodasCotizaciones()

  twState.cargando = false

  if (error) {
    cont.innerHTML = `<div class="tw-error">❌ Error al cargar cotizaciones. Intenta de nuevo.</div>`
    return
  }

  twState.cotizaciones = data || []
  twRenderFiltros()
  twRenderTabla()
}

/* ═══════════════════════════════════════════════
   RENDER — FILTROS Y MÉTRICAS
═══════════════════════════════════════════════ */
function twRenderFiltros() {
  const wrap = document.getElementById('tw-filtros-wrap')
  if (!wrap) return

  const total       = twState.cotizaciones.length
  const pendientes  = twState.cotizaciones.filter(c => c.estado === 'pendiente').length
  const revisadas   = twState.cotizaciones.filter(c => c.estado === 'revisada').length
  const respondidas = twState.cotizaciones.filter(c => c.estado === 'respondida').length

  wrap.innerHTML = `
    <!-- Métricas rápidas -->
    <div class="tw-metricas">
      <div class="tw-metrica tw-m-total">
        <span class="tw-m-num">${total}</span>
        <span class="tw-m-label">Total</span>
      </div>
      <div class="tw-metrica tw-m-pend">
        <span class="tw-m-num">${pendientes}</span>
        <span class="tw-m-label">Pendientes</span>
      </div>
      <div class="tw-metrica tw-m-rev">
        <span class="tw-m-num">${revisadas}</span>
        <span class="tw-m-label">En revisión</span>
      </div>
      <div class="tw-metrica tw-m-resp">
        <span class="tw-m-num">${respondidas}</span>
        <span class="tw-m-label">Respondidas</span>
      </div>
    </div>

    <!-- Filtros + Buscador -->
    <div class="tw-controles">
      <div class="tw-filtros">
        <button class="tw-filtro-btn ${twState.filtro === 'todas'      ? 'active' : ''}" onclick="twFiltrar('todas')">Todas</button>
        <button class="tw-filtro-btn tw-warn ${twState.filtro === 'pendiente'  ? 'active' : ''}" onclick="twFiltrar('pendiente')">⏳ Pendientes</button>
        <button class="tw-filtro-btn tw-info ${twState.filtro === 'revisada'   ? 'active' : ''}" onclick="twFiltrar('revisada')">🔍 En revisión</button>
        <button class="tw-filtro-btn tw-ok   ${twState.filtro === 'respondida' ? 'active' : ''}" onclick="twFiltrar('respondida')">✅ Respondidas</button>
      </div>
      <input
        type="search"
        class="tw-buscador"
        placeholder="🔍 Buscar por nombre, empresa o email..."
        value="${escHtml(twState.busqueda)}"
        oninput="twBuscar(this.value)"
      >
    </div>
  `
}

/* ═══════════════════════════════════════════════
   RENDER — TABLA
═══════════════════════════════════════════════ */
function twRenderTabla() {
  const cont = document.getElementById('tw-content')
  if (!cont) return

  let filtradas = twState.filtro === 'todas'
    ? [...twState.cotizaciones]
    : twState.cotizaciones.filter(c => c.estado === twState.filtro)

  if (twState.busqueda.trim()) {
    const q = twState.busqueda.toLowerCase()
    filtradas = filtradas.filter(c =>
      (c.nombre  || '').toLowerCase().includes(q) ||
      (c.empresa || '').toLowerCase().includes(q) ||
      (c.email   || '').toLowerCase().includes(q)
    )
  }

  if (filtradas.length === 0) {
    cont.innerHTML = `
      <div class="tw-empty">
        <div class="tw-empty-icon">📋</div>
        <p>${twState.busqueda ? 'No hay resultados para tu búsqueda.' : 'No hay cotizaciones en esta categoría.'}</p>
      </div>
    `
    return
  }

  cont.innerHTML = `
    <div class="tw-table-wrap">
      <table class="tw-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Empresa</th>
            <th>Productos</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${filtradas.map(c => twRenderFila(c)).join('')}
        </tbody>
      </table>
    </div>
    <div class="tw-table-footer">
      Mostrando ${filtradas.length} de ${twState.cotizaciones.length} cotizaciones
    </div>
  `
}

function twRenderFila(c) {
  const prods = c.productos_solicitados || []
  const fecha = new Date(c.created_at).toLocaleDateString('es-CL', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
  const badgeClass = {
    pendiente:  'tw-badge-warn',
    revisada:   'tw-badge-info',
    respondida: 'tw-badge-ok',
  }[c.estado] || 'tw-badge-warn'

  const badgeLabel = {
    pendiente:  '⏳ Pendiente',
    revisada:   '🔍 En revisión',
    respondida: '✅ Respondida',
  }[c.estado] || c.estado

  const resumenProds = prods.length > 0
    ? `${prods.length} producto${prods.length !== 1 ? 's' : ''}`
    : '—'

  return `
    <tr id="tw-fila-${c.id}">
      <td class="tw-td-id">#${c.id}</td>
      <td>
        <div class="tw-cliente-nombre">${escHtml(c.nombre || '—')}</div>
        <div class="tw-cliente-email">${escHtml(c.email || '')}</div>
      </td>
      <td>${escHtml(c.empresa || '—')}</td>
      <td class="tw-td-prods">${resumenProds}</td>
      <td class="tw-td-fecha">${fecha}</td>
      <td><span class="${badgeClass}">${badgeLabel}</span></td>
      <td class="tw-td-acciones">
        <button class="tw-btn tw-btn-detail" onclick="twVerDetalle(${c.id})" title="Ver detalle">
          🔍
        </button>
        ${c.estado !== 'revisada' && c.estado !== 'respondida' ? `
        <button class="tw-btn tw-btn-revisar" onclick="twCambiarEstado(${c.id}, 'revisada')" title="Marcar en revisión">
          🔍 Revisar
        </button>` : ''}
        ${c.estado !== 'respondida' ? `
        <button class="tw-btn tw-btn-responder" onclick="twMostrarFormResponder(${c.id})" title="Marcar como respondida">
          ✅ Responder
        </button>` : ''}
        ${c.estado === 'respondida' ? `
        <button class="tw-btn tw-btn-reabrir" onclick="twCambiarEstado(${c.id}, 'pendiente')" title="Reabrir">
          ↩️ Reabrir
        </button>` : ''}
      </td>
    </tr>
  `
}

/* ═══════════════════════════════════════════════
   CAMBIAR ESTADO
═══════════════════════════════════════════════ */
window.twCambiarEstado = async function(id, nuevoEstado) {
  const labels = { revisada: 'en revisión', respondida: 'respondida', pendiente: 'pendiente' }

  const { error } = await window.cotizacionService.actualizarEstado(id, nuevoEstado)

  if (error) {
    showToast('❌ Error al actualizar el estado.')
    return
  }

  // Actualizar estado local
  const cot = twState.cotizaciones.find(c => c.id === id)
  if (cot) cot.estado = nuevoEstado

  showToast(`✅ Cotización #${id} marcada como ${labels[nuevoEstado]}.`)
  twRenderFiltros()
  twRenderTabla()
}

/* ═══════════════════════════════════════════════
   MODAL DE DETALLE
═══════════════════════════════════════════════ */
window.twVerDetalle = function(id) {
  const c = twState.cotizaciones.find(x => x.id === id)
  if (!c) return

  const prods   = c.productos_solicitados || []
  const fecha   = new Date(c.created_at).toLocaleDateString('es-CL', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  })
  const badgeClass = { pendiente: 'tw-badge-warn', revisada: 'tw-badge-info', respondida: 'tw-badge-ok' }[c.estado] || 'tw-badge-warn'
  const badgeLabel = { pendiente: '⏳ Pendiente', revisada: '🔍 En revisión', respondida: '✅ Respondida' }[c.estado] || c.estado

  document.getElementById('tw-modal-title').innerHTML =
    `Cotización <strong>#${c.id}</strong> &nbsp;<span class="${badgeClass}">${badgeLabel}</span>`

  document.getElementById('tw-modal-body').innerHTML = `
    <div class="tw-detalle">

      <div class="tw-detalle-seccion">
        <h4 class="tw-detalle-titulo">📋 Datos del cliente</h4>
        <div class="tw-detalle-grid">
          <div class="tw-detalle-item">
            <span class="tw-detalle-label">Nombre</span>
            <span class="tw-detalle-val">${escHtml(c.nombre || '—')}</span>
          </div>
          <div class="tw-detalle-item">
            <span class="tw-detalle-label">Empresa</span>
            <span class="tw-detalle-val">${escHtml(c.empresa || '—')}</span>
          </div>
          <div class="tw-detalle-item">
            <span class="tw-detalle-label">Email</span>
            <span class="tw-detalle-val">
              <a href="mailto:${escHtml(c.email || '')}">${escHtml(c.email || '—')}</a>
            </span>
          </div>
          <div class="tw-detalle-item">
            <span class="tw-detalle-label">Teléfono</span>
            <span class="tw-detalle-val">
              ${c.telefono ? `<a href="tel:${escHtml(c.telefono)}">${escHtml(c.telefono)}</a>` : '—'}
            </span>
          </div>
          <div class="tw-detalle-item tw-detalle-full">
            <span class="tw-detalle-label">Fecha de envío</span>
            <span class="tw-detalle-val">${fecha}</span>
          </div>
          ${c.mensaje ? `
          <div class="tw-detalle-item tw-detalle-full">
            <span class="tw-detalle-label">Mensaje</span>
            <span class="tw-detalle-val tw-mensaje-det">${escHtml(c.mensaje)}</span>
          </div>` : ''}
        </div>
      </div>

      <div class="tw-detalle-seccion">
        <h4 class="tw-detalle-titulo">📦 Productos solicitados</h4>
        ${prods.length === 0
          ? '<p class="tw-empty-prods">No se especificaron productos.</p>'
          : `<div class="tw-prod-table-wrap">
              <table class="tw-prod-table">
                <thead>
                  <tr><th>#</th><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio ref.</th></tr>
                </thead>
                <tbody>
                  ${prods.map((p, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td class="tw-prod-cod">${escHtml(p.codigo || '—')}</td>
                      <td>${escHtml(p.nombre || 'Sin nombre')}</td>
                      <td class="tw-prod-cant">${p.cantidad || 1}</td>
                      <td class="tw-prod-precio">${
                        p.precio && p.precio !== 'Consultar'
                          ? '$' + Number(p.precio).toLocaleString('es-CL')
                          : 'A consultar'
                      }</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
        }
      </div>

      <div class="tw-detalle-seccion">
        <h4 class="tw-detalle-titulo">🔄 Cambiar estado</h4>
        <div class="tw-estado-acciones">
          <button class="tw-btn tw-btn-revisar tw-btn-lg ${c.estado === 'revisada' ? 'disabled' : ''}"
            onclick="twCambiarEstado(${c.id}, 'revisada');twCerrarModal()"
            ${c.estado === 'revisada' || c.estado === 'respondida' ? 'disabled' : ''}>
            🔍 Marcar en revisión
          </button>
          <button class="tw-btn tw-btn-responder tw-btn-lg ${c.estado === 'respondida' ? 'disabled' : ''}"
            onclick="twMostrarFormResponder(${c.id})"
            ${c.estado === 'respondida' ? 'disabled' : ''}>
            ✅ Marcar como respondida
          </button>
          <button class="tw-btn tw-btn-reabrir tw-btn-lg"
            onclick="twCambiarEstado(${c.id}, 'pendiente');twCerrarModal()"
            ${c.estado === 'pendiente' ? 'disabled' : ''}>
            ↩️ Reabrir
          </button>
        </div>
      </div>

    </div>

    <div class="tw-modal-footer">
      <button class="tw-btn tw-btn-neutral tw-btn-lg" onclick="twCerrarModal()">Cerrar</button>
    </div>
  `

  const modal = document.getElementById('tw-modal')
  modal.style.display = 'flex'
  requestAnimationFrame(() => modal.classList.add('visible'))
}

window.twCerrarModal = function() {
  const modal = document.getElementById('tw-modal')
  modal.classList.remove('visible')
  setTimeout(() => { modal.style.display = 'none' }, 220)
}

/* ═══════════════════════════════════════════════
   FORMULARIO RESPONDER (con precio final)
═══════════════════════════════════════════════ */
window.twMostrarFormResponder = function(id) {
  const c = twState.cotizaciones.find(x => x.id === id)
  if (!c) return

  document.getElementById('tw-modal-title').innerHTML =
    `Responder Cotización <strong>#${c.id}</strong>`

  document.getElementById('tw-modal-body').innerHTML = `
    <div class="tw-detalle">
      <div class="tw-detalle-seccion">
        <h4 class="tw-detalle-titulo">💰 Precio final acordado</h4>
        <p style="margin-bottom:1.25rem;color:#556;font-size:.95rem;line-height:1.5">
          Ingresa el monto total que pagará el cliente. Este valor aparecerá en su panel
          y habilitará el botón de pago con Transbank Webpay Plus.
        </p>
        <div>
          <label style="display:block;margin-bottom:.5rem;font-weight:600;font-size:.9rem;color:#003B5C">
            Monto (CLP)
          </label>
          <input
            type="number"
            id="tw-precio-input"
            min="1"
            step="1"
            placeholder="Ej: 150000"
            value="${c.precio_final || ''}"
            style="width:100%;padding:.65rem .9rem;border:2px solid #d0d7e2;border-radius:8px;
                   font-size:1rem;outline:none;transition:border-color .2s"
            onfocus="this.style.borderColor='#003B5C'"
            onblur="this.style.borderColor='#d0d7e2'"
            onkeydown="if(event.key==='Enter')twConfirmarRespuesta(${c.id})"
          >
        </div>
      </div>
    </div>
    <div class="tw-modal-footer">
      <button class="tw-btn tw-btn-responder tw-btn-lg" onclick="twConfirmarRespuesta(${c.id})">
        ✅ Confirmar y marcar como respondida
      </button>
      <button class="tw-btn tw-btn-neutral tw-btn-lg" onclick="twCerrarModal()">
        Cancelar
      </button>
    </div>
  `

  const modal = document.getElementById('tw-modal')
  modal.style.display = 'flex'
  requestAnimationFrame(() => modal.classList.add('visible'))
  setTimeout(() => document.getElementById('tw-precio-input')?.focus(), 150)
}

window.twConfirmarRespuesta = async function(id) {
  const input  = document.getElementById('tw-precio-input')
  const precio = parseInt(input?.value || '0', 10)

  if (!precio || precio <= 0) {
    showToast('⚠️ Ingresa un precio válido mayor a $0.')
    input?.focus()
    return
  }

  if (input) input.disabled = true

  const { error } = await window.cotizacionService.actualizarConPrecioFinal(id, precio)

  if (error) {
    showToast('❌ Error al actualizar la cotización.')
    if (input) input.disabled = false
    return
  }

  const cot = twState.cotizaciones.find(c => c.id === id)
  if (cot) { cot.estado = 'respondida'; cot.precio_final = precio }

  showToast(`✅ Cotización #${id} respondida — Precio: $${precio.toLocaleString('es-CL')}`)
  twCerrarModal()
  twRenderFiltros()
  twRenderTabla()
}

/* ═══════════════════════════════════════════════
   FILTRO Y BÚSQUEDA
═══════════════════════════════════════════════ */
window.twFiltrar = function(filtro) {
  twState.filtro = filtro
  twRenderFiltros()
  twRenderTabla()
}

window.twBuscar = function(val) {
  twState.busqueda = val
  twRenderTabla()
}

window.twRecargar = async function() {
  await twCargarCotizaciones()
  showToast('🔄 Cotizaciones actualizadas.')
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
