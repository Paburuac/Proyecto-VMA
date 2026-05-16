/**
 * src/js/admin.js
 * ─────────────────────────────────────────────
 * Lógica del Panel de Administración VMA Industrial.
 * Gestiona: Dashboard, Cotizaciones, Usuarios,
 * Productos, Categorías y Reportes.
 *
 * Solo accesible si window.authState.rol === 'admin'
 * ─────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════
   ESTADO LOCAL DEL PANEL
═══════════════════════════════════════════════ */
const adminState = {
  tabActiva:       'dashboard',
  cotizaciones:    [],
  usuarios:        [],
  productos:       [],
  categorias:      [],
  filtroCotizacion: '',
  busquedaProducto: '',
  editandoProducto: null,  // null o { id, datos }
}

/* ═══════════════════════════════════════════════
   INICIALIZAR PANEL
═══════════════════════════════════════════════ */
export async function initAdmin() {
  // Verificar que sea admin
  if (!window.isAdmin || !window.isAdmin()) {
    console.warn('[VMA Admin] Acceso denegado — rol no es admin')
    showPage('page-inicio')
    return
  }

  console.log('[VMA Admin] Panel iniciado')
  cambiarTab('dashboard')
}
window.initAdmin = initAdmin

/* ═══════════════════════════════════════════════
   NAVEGACIÓN DE TABS
═══════════════════════════════════════════════ */
function cambiarTab(tab) {
  adminState.tabActiva = tab

  // Activar botón de tab
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab)
  })

  // Mostrar sección
  document.querySelectorAll('.admin-section').forEach(s => {
    s.style.display = s.dataset.section === tab ? 'block' : 'none'
  })

  // Cargar datos de la tab
  const loaders = {
    dashboard:    cargarDashboard,
    cotizaciones: cargarCotizaciones,
    usuarios:     cargarUsuarios,
    productos:    cargarProductos,
    categorias:   cargarCategorias,
    reportes:     cargarReportes,
  }
  if (loaders[tab]) loaders[tab]()
}
window.adminCambiarTab = cambiarTab

/* ═══════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════ */
async function cargarDashboard() {
  const cont = document.getElementById('admin-dashboard-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Cargando métricas...</div>'

  const { data, error } = await window.adminService.obtenerMetricas()
  if (error || !data) { cont.innerHTML = '<div class="admin-error">Error al cargar métricas.</div>'; return }

  cont.innerHTML = `
    <div class="admin-kpi-grid">
      <div class="admin-kpi admin-kpi-warn">
        <div class="admin-kpi-num">${data.pendientes}</div>
        <div class="admin-kpi-label">Cotizaciones pendientes</div>
      </div>
      <div class="admin-kpi admin-kpi-info">
        <div class="admin-kpi-num">${data.revisadas}</div>
        <div class="admin-kpi-label">En revisión</div>
      </div>
      <div class="admin-kpi admin-kpi-ok">
        <div class="admin-kpi-num">${data.respondidas}</div>
        <div class="admin-kpi-label">Respondidas</div>
      </div>
      <div class="admin-kpi admin-kpi-neutral">
        <div class="admin-kpi-num">${data.totalCotizaciones}</div>
        <div class="admin-kpi-label">Total cotizaciones</div>
      </div>
      <div class="admin-kpi admin-kpi-neutral">
        <div class="admin-kpi-num">${data.totalUsuarios}</div>
        <div class="admin-kpi-label">Usuarios registrados</div>
      </div>
      <div class="admin-kpi admin-kpi-ok">
        <div class="admin-kpi-num">${data.usuariosActivos}</div>
        <div class="admin-kpi-label">Usuarios activos</div>
      </div>
      <div class="admin-kpi admin-kpi-neutral">
        <div class="admin-kpi-num">${data.totalProductos}</div>
        <div class="admin-kpi-label">Productos en catálogo</div>
      </div>
      <div class="admin-kpi admin-kpi-neutral">
        <div class="admin-kpi-num">${data.totalCategorias}</div>
        <div class="admin-kpi-label">Categorías</div>
      </div>
    </div>

    <div class="admin-dashboard-accesos">
      <h3>Accesos rápidos</h3>
      <div class="admin-accesos-grid">
        <button class="admin-acceso-btn" onclick="adminCambiarTab('cotizaciones')">
          <span class="admin-acceso-icon">📋</span>
          <span>Ver cotizaciones</span>
          ${data.pendientes > 0 ? `<span class="admin-badge-warn">${data.pendientes} pendientes</span>` : ''}
        </button>
        <button class="admin-acceso-btn" onclick="adminCambiarTab('usuarios')">
          <span class="admin-acceso-icon">👥</span>
          <span>Gestionar usuarios</span>
        </button>
        <button class="admin-acceso-btn" onclick="adminCambiarTab('productos')">
          <span class="admin-acceso-icon">📦</span>
          <span>Gestionar productos</span>
        </button>
        <button class="admin-acceso-btn" onclick="adminCambiarTab('reportes')">
          <span class="admin-acceso-icon">📊</span>
          <span>Ver reportes</span>
        </button>
      </div>
    </div>
  `
}

/* ═══════════════════════════════════════════════
   COTIZACIONES
═══════════════════════════════════════════════ */
async function cargarCotizaciones() {
  const cont = document.getElementById('admin-cotizaciones-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Cargando cotizaciones...</div>'

  const { data, error } = await window.adminService.obtenerCotizaciones(adminState.filtroCotizacion)
  if (error) { cont.innerHTML = '<div class="admin-error">Error al cargar cotizaciones.</div>'; return }

  adminState.cotizaciones = data || []
  renderTablaCotzaciones(cont)
}

function renderTablaCotzaciones(cont) {
  const data = adminState.cotizaciones
  if (data.length === 0) {
    cont.innerHTML = '<div class="admin-empty">📭 No hay cotizaciones con este filtro.</div>'
    return
  }

  const estadoBadge = (e) => {
    const map = { pendiente: 'admin-badge-warn', revisada: 'admin-badge-info', respondida: 'admin-badge-ok' }
    return `<span class="${map[e] || 'admin-badge-warn'}">${e}</span>`
  }

  cont.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>#</th><th>Fecha</th><th>Nombre</th><th>Empresa</th>
            <th>Email</th><th>Teléfono</th><th>Productos</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(c => `
            <tr>
              <td>${c.id}</td>
              <td>${new Date(c.created_at).toLocaleDateString('es-CL')}</td>
              <td>${escHtml(c.nombre || '')}</td>
              <td>${escHtml(c.empresa || '—')}</td>
              <td>${escHtml(c.email || '')}</td>
              <td>${escHtml(c.telefono || '—')}</td>
              <td>
                <button class="admin-btn-sm admin-btn-info" onclick="adminVerProductosCotizacion(${c.id})">
                  Ver ${(c.productos_solicitados || []).length} items
                </button>
              </td>
              <td>${estadoBadge(c.estado)}</td>
              <td class="admin-acciones">
                <select class="admin-select-estado" onchange="adminCambiarEstadoCotizacion(${c.id}, this.value)">
                  <option value="pendiente"  ${c.estado==='pendiente'  ? 'selected':''}>Pendiente</option>
                  <option value="revisada"   ${c.estado==='revisada'   ? 'selected':''}>Revisada</option>
                  <option value="respondida" ${c.estado==='respondida' ? 'selected':''}>Respondida</option>
                </select>
                <button class="admin-btn-sm admin-btn-danger" onclick="adminEliminarCotizacion(${c.id})">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

window.adminCambiarEstadoCotizacion = async function(id, nuevoEstado) {
  const { error } = await window.adminService.actualizarEstadoCotizacion(id, nuevoEstado)
  if (error) { showToast('❌ Error al actualizar estado.'); return }
  showToast(`✅ Cotización #${id} → ${nuevoEstado}`)
  const item = adminState.cotizaciones.find(c => c.id === id)
  if (item) item.estado = nuevoEstado
  const cont = document.getElementById('admin-cotizaciones-content')
  if (cont) renderTablaCotzaciones(cont)
}

window.adminEliminarCotizacion = async function(id) {
  if (!confirm(`¿Eliminar cotización #${id}? Esta acción no se puede deshacer.`)) return
  const { error } = await window.adminService.eliminarCotizacion(id)
  if (error) { showToast('❌ Error al eliminar.'); return }
  showToast(`🗑️ Cotización #${id} eliminada.`)
  adminState.cotizaciones = adminState.cotizaciones.filter(c => c.id !== id)
  const cont = document.getElementById('admin-cotizaciones-content')
  if (cont) renderTablaCotzaciones(cont)
}

window.adminVerProductosCotizacion = function(id) {
  const cot = adminState.cotizaciones.find(c => c.id === id)
  if (!cot) return
  const prods = cot.productos_solicitados || []
  const lista = prods.length > 0
    ? prods.map(p => `<li><strong>[${escHtml(p.codigo||'')}]</strong> ${escHtml(p.nombre||'')} × ${p.cantidad||1}</li>`).join('')
    : '<li>Sin productos especificados</li>'
  const modal = document.getElementById('admin-modal')
  document.getElementById('admin-modal-title').textContent = `Productos — Cotización #${id}`
  document.getElementById('admin-modal-body').innerHTML = `
    <p><strong>Cliente:</strong> ${escHtml(cot.nombre)} / ${escHtml(cot.empresa||'—')}</p>
    <p><strong>Mensaje:</strong> ${escHtml(cot.mensaje||'—')}</p>
    <p><strong>Productos solicitados:</strong></p>
    <ul class="admin-prod-list">${lista}</ul>
  `
  modal.style.display = 'flex'
}

window.adminFiltrarCotizaciones = function(estado) {
  adminState.filtroCotizacion = estado
  document.querySelectorAll('.admin-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.estado === estado))
  cargarCotizaciones()
}

/* ═══════════════════════════════════════════════
   USUARIOS
═══════════════════════════════════════════════ */
async function cargarUsuarios() {
  const cont = document.getElementById('admin-usuarios-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Cargando usuarios...</div>'

  const { data, error } = await window.adminService.obtenerUsuarios()
  if (error) { cont.innerHTML = '<div class="admin-error">Error al cargar usuarios.</div>'; return }

  adminState.usuarios = data || []

  cont.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr><th>#</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Rol actual</th><th>Cambiar rol</th><th>Estado</th><th>Registro</th></tr>
        </thead>
        <tbody>
          ${data.map(u => `
            <tr>
              <td>${u.id}</td>
              <td>${escHtml(u.nombre || '—')}</td>
              <td>${escHtml(u.email || '—')}</td>
              <td>${escHtml(u.telefono || '—')}</td>
              <td><span class="admin-badge-rol admin-rol-${u.roles?.nombre || 'cliente'}">${u.roles?.nombre || 'cliente'}</span></td>
              <td>
                <select class="admin-select-estado" onchange="adminCambiarRol(${u.id}, this.value)">
                  <option value="1" ${u.rol_id===1?'selected':''}>Admin</option>
                  <option value="2" ${u.rol_id===2?'selected':''}>Trabajador</option>
                  <option value="3" ${u.rol_id===3?'selected':''}>Cliente</option>
                </select>
              </td>
              <td>
                <button class="admin-btn-sm ${u.activo ? 'admin-btn-ok' : 'admin-btn-danger'}"
                  onclick="adminToggleActivo(${u.id}, ${!u.activo})">
                  ${u.activo ? '✅ Activo' : '❌ Inactivo'}
                </button>
              </td>
              <td>${new Date(u.created_at).toLocaleDateString('es-CL')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

window.adminCambiarRol = async function(usuarioId, nuevoRolId) {
  const { error } = await window.adminService.actualizarRolUsuario(usuarioId, parseInt(nuevoRolId))
  if (error) { showToast('❌ Error al cambiar rol.'); return }
  const rolNombre = { 1: 'admin', 2: 'trabajador', 3: 'cliente' }[nuevoRolId]
  showToast(`✅ Rol actualizado → ${rolNombre}`)
  cargarUsuarios()
}

window.adminToggleActivo = async function(usuarioId, nuevoEstado) {
  const { error } = await window.adminService.toggleActivoUsuario(usuarioId, nuevoEstado)
  if (error) { showToast('❌ Error al actualizar estado.'); return }
  showToast(`✅ Usuario ${nuevoEstado ? 'activado' : 'desactivado'}`)
  cargarUsuarios()
}

/* ═══════════════════════════════════════════════
   PRODUCTOS
═══════════════════════════════════════════════ */
async function cargarProductos() {
  const cont = document.getElementById('admin-productos-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Cargando productos...</div>'

  const [prodRes, catRes] = await Promise.all([
    window.adminService.obtenerProductosAdmin(),
    window.adminService.obtenerCategoriasAdmin(),
  ])

  adminState.productos  = prodRes.data  || []
  adminState.categorias = catRes.data   || []

  renderTablaProductos(cont)
}

function renderTablaProductos(cont) {
  const busq  = adminState.busquedaProducto.toLowerCase()
  const prods = busq
    ? adminState.productos.filter(p =>
        p.descripcion?.toLowerCase().includes(busq) ||
        p.codigo?.toLowerCase().includes(busq))
    : adminState.productos

  const catOpts = adminState.categorias.map(c =>
    `<option value="${c.id_categoria}">${escHtml(c.nombre_categoria)}</option>`
  ).join('')

  cont.innerHTML = `
    <div class="admin-toolbar">
      <input type="text" class="admin-search" placeholder="🔍 Buscar por nombre o código..."
        value="${escHtml(adminState.busquedaProducto)}"
        oninput="adminBuscarProducto(this.value)">
      <button class="admin-btn admin-btn-ok" onclick="adminAbrirFormProducto()">+ Nuevo producto</button>
    </div>

    <!-- Formulario crear/editar producto -->
    <div id="admin-form-producto" class="admin-form-box" style="display:none">
      <h4 id="admin-form-prod-title">Nuevo producto</h4>
      <div class="admin-form-grid">
        <div class="admin-form-row">
          <label>Código</label>
          <input type="text" id="prod-codigo" placeholder="Ej: 12345">
        </div>
        <div class="admin-form-row">
          <label>Descripción *</label>
          <input type="text" id="prod-descripcion" placeholder="Nombre del producto">
        </div>
        <div class="admin-form-row">
          <label>Categoría *</label>
          <select id="prod-categoria">${catOpts}</select>
        </div>
        <div class="admin-form-row">
          <label>Precio</label>
          <input type="number" id="prod-precio" placeholder="0" min="0" step="0.01">
        </div>
        <div class="admin-form-row">
          <label>Stock</label>
          <input type="text" id="prod-stock" placeholder="Ej: 50">
        </div>
        <div class="admin-form-row">
          <label>Distribuidor</label>
          <input type="text" id="prod-distribuidor" placeholder="Nombre del distribuidor">
        </div>
        <div class="admin-form-row" style="grid-column: 1 / -1">
          <label>URL de imagen</label>
          <input type="url" id="prod-imagen" placeholder="https://ejemplo.com/imagen.jpg" oninput="adminPreviewUrl(this.value)">
          <div id="prod-imagen-preview" style="margin-top:0.5rem;display:none">
            <img src="" alt="Preview" style="max-height:100px;border-radius:6px;border:1px solid var(--gris-medio);object-fit:cover">
            <button type="button" onclick="adminQuitarImagen()" style="display:block;margin-top:0.35rem;font-size:0.78rem;background:none;border:none;color:#cc3333;cursor:pointer">✕ Quitar imagen</button>
          </div>
        </div>
      </div>
      <div class="admin-form-actions">
        <button class="admin-btn admin-btn-ok"     onclick="adminGuardarProducto()">💾 Guardar</button>
        <button class="admin-btn admin-btn-neutral" onclick="adminCancelarFormProducto()">Cancelar</button>
      </div>
    </div>

    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr><th>Código</th><th>Descripción</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Distribuidor</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          ${prods.map(p => `
            <tr>
              <td>${escHtml(p.codigo || '—')}</td>
              <td>${escHtml(p.descripcion || '')}</td>
              <td>${escHtml(p.categoria?.nombre_categoria || '—')}</td>
              <td>${p.precio != null ? '$' + Number(p.precio).toLocaleString('es-CL') : '—'}</td>
              <td>${escHtml(String(p.stock || '—'))}</td>
              <td>${escHtml(p.distribuidor || '—')}</td>
              <td class="admin-acciones">
                <button class="admin-btn-sm admin-btn-info"   onclick="adminEditarProducto(${p.id_producto})">✏️</button>
                <button class="admin-btn-sm admin-btn-danger" onclick="adminEliminarProducto(${p.id_producto})">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="admin-table-footer">Mostrando ${prods.length} de ${adminState.productos.length} productos</div>
  `
}

// ── Preview de imagen por URL ─────────────────────────────────────────────────

function adminMostrarPreview(url) {
  const preview = document.getElementById('prod-imagen-preview')
  const img     = preview?.querySelector('img')
  if (!preview || !img) return
  img.src = url
  preview.style.display = 'block'
}

function adminOcultarPreview() {
  const preview = document.getElementById('prod-imagen-preview')
  if (preview) preview.style.display = 'none'
}

window.adminPreviewUrl = function(url) {
  if (url && url.startsWith('http')) { adminMostrarPreview(url) }
  else { adminOcultarPreview() }
}

window.adminQuitarImagen = function() {
  document.getElementById('prod-imagen').value = ''
  adminOcultarPreview()
}

window.adminBuscarProducto = function(val) {
  adminState.busquedaProducto = val
  const cont = document.getElementById('admin-productos-content')
  if (cont) renderTablaProductos(cont)
}

window.adminAbrirFormProducto = function() {
  adminState.editandoProducto = null
  document.getElementById('admin-form-prod-title').textContent = 'Nuevo producto'
  document.getElementById('prod-codigo').value       = ''
  document.getElementById('prod-descripcion').value  = ''
  document.getElementById('prod-precio').value       = ''
  document.getElementById('prod-stock').value        = ''
  document.getElementById('prod-distribuidor').value = ''
  document.getElementById('prod-imagen').value       = ''
  adminOcultarPreview()
  document.getElementById('admin-form-producto').style.display = 'block'
  document.getElementById('admin-form-producto').scrollIntoView({ behavior: 'smooth' })
}

window.adminEditarProducto = function(id) {
  const p = adminState.productos.find(x => x.id_producto === id)
  if (!p) return
  adminState.editandoProducto = id
  document.getElementById('admin-form-prod-title').textContent = `Editar producto #${id}`
  document.getElementById('prod-codigo').value       = p.codigo || ''
  document.getElementById('prod-descripcion').value  = p.descripcion || ''
  document.getElementById('prod-categoria').value    = p.id_categoria || ''
  document.getElementById('prod-precio').value       = p.precio || ''
  document.getElementById('prod-stock').value        = p.stock || ''
  document.getElementById('prod-distribuidor').value = p.distribuidor || ''
  const imgUrl = p.imagen_url || ''
  document.getElementById('prod-imagen').value = imgUrl
  if (imgUrl) { adminMostrarPreview(imgUrl) } else { adminOcultarPreview() }
  document.getElementById('admin-form-producto').style.display = 'block'
  document.getElementById('admin-form-producto').scrollIntoView({ behavior: 'smooth' })
}

window.adminCancelarFormProducto = function() {
  adminState.editandoProducto = null
  adminOcultarPreview()
  document.getElementById('admin-form-producto').style.display = 'none'
}

window.adminGuardarProducto = async function() {
  const descripcion  = document.getElementById('prod-descripcion').value.trim()
  const id_categoria = parseInt(document.getElementById('prod-categoria').value)

  if (!descripcion) { showToast('❌ La descripción es obligatoria.'); return }
  if (!id_categoria) { showToast('❌ Selecciona una categoría.'); return }

  const campos = {
    codigo:       document.getElementById('prod-codigo').value.trim() || null,
    descripcion,
    id_categoria,
    precio:       parseFloat(document.getElementById('prod-precio').value) || null,
    stock:        document.getElementById('prod-stock').value.trim() || null,
    distribuidor: document.getElementById('prod-distribuidor').value.trim() || null,
    imagen_url:   document.getElementById('prod-imagen').value.trim() || null,
  }

  let error
  if (adminState.editandoProducto) {
    ;({ error } = await window.adminService.actualizarProducto(adminState.editandoProducto, campos))
  } else {
    ;({ error } = await window.adminService.crearProducto(campos))
  }

  if (error) { showToast('❌ Error al guardar: ' + error.message); return }
  showToast(adminState.editandoProducto ? '✅ Producto actualizado.' : '✅ Producto creado.')
  adminCancelarFormProducto()
  cargarProductos()
}

window.adminEliminarProducto = async function(id) {
  if (!confirm(`¿Eliminar el producto #${id}? Esta acción no se puede deshacer.`)) return
  const { error } = await window.adminService.eliminarProducto(id)
  if (error) { showToast('❌ Error al eliminar.'); return }
  showToast('🗑️ Producto eliminado.')
  cargarProductos()
}

/* ═══════════════════════════════════════════════
   CATEGORÍAS
═══════════════════════════════════════════════ */
async function cargarCategorias() {
  const cont = document.getElementById('admin-categorias-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Cargando categorías...</div>'

  const { data, error } = await window.adminService.obtenerCategoriasAdmin()
  if (error) { cont.innerHTML = '<div class="admin-error">Error al cargar categorías.</div>'; return }

  adminState.categorias = data || []

  cont.innerHTML = `
    <div class="admin-form-box">
      <h4>Nueva categoría</h4>
      <div class="admin-form-inline">
        <input type="text" id="nueva-categoria-nombre" placeholder="Nombre de la categoría" class="admin-input-inline">
        <button class="admin-btn admin-btn-ok" onclick="adminCrearCategoria()">+ Agregar</button>
      </div>
    </div>

    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>#</th><th>Nombre</th><th>Acciones</th></tr></thead>
        <tbody>
          ${data.map(c => `
            <tr id="cat-row-${c.id_categoria}">
              <td>${c.id_categoria}</td>
              <td>
                <span id="cat-nombre-${c.id_categoria}">${escHtml(c.nombre_categoria)}</span>
                <input type="text" id="cat-input-${c.id_categoria}" value="${escHtml(c.nombre_categoria)}"
                  class="admin-input-edit" style="display:none"
                  onkeydown="if(event.key==='Enter') adminGuardarCategoria(${c.id_categoria})">
              </td>
              <td class="admin-acciones">
                <button class="admin-btn-sm admin-btn-info"    onclick="adminEditarCategoria(${c.id_categoria})">✏️ Editar</button>
                <button class="admin-btn-sm admin-btn-ok"      id="cat-btn-save-${c.id_categoria}" style="display:none"
                  onclick="adminGuardarCategoria(${c.id_categoria})">💾 Guardar</button>
                <button class="admin-btn-sm admin-btn-danger"  onclick="adminEliminarCategoria(${c.id_categoria})">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

window.adminCrearCategoria = async function() {
  const nombre = document.getElementById('nueva-categoria-nombre').value.trim()
  if (!nombre) { showToast('❌ Ingresa un nombre para la categoría.'); return }
  const { error } = await window.adminService.crearCategoria(nombre)
  if (error) { showToast('❌ Error: ' + error.message); return }
  showToast('✅ Categoría creada.')
  document.getElementById('nueva-categoria-nombre').value = ''
  cargarCategorias()
}

window.adminEditarCategoria = function(id) {
  document.getElementById(`cat-nombre-${id}`).style.display    = 'none'
  document.getElementById(`cat-input-${id}`).style.display     = 'inline-block'
  document.getElementById(`cat-btn-save-${id}`).style.display  = 'inline-block'
  document.getElementById(`cat-input-${id}`).focus()
}

window.adminGuardarCategoria = async function(id) {
  const nombre = document.getElementById(`cat-input-${id}`).value.trim()
  if (!nombre) { showToast('❌ El nombre no puede estar vacío.'); return }
  const { error } = await window.adminService.actualizarCategoria(id, nombre)
  if (error) { showToast('❌ Error: ' + error.message); return }
  showToast('✅ Categoría actualizada.')
  cargarCategorias()
}

window.adminEliminarCategoria = async function(id) {
  if (!confirm('¿Eliminar esta categoría? Solo es posible si no tiene productos asociados.')) return
  const { error } = await window.adminService.eliminarCategoria(id)
  if (error) { showToast('❌ ' + error.message); return }
  showToast('🗑️ Categoría eliminada.')
  cargarCategorias()
}

/* ═══════════════════════════════════════════════
   REPORTES
═══════════════════════════════════════════════ */
async function cargarReportes() {
  const cont = document.getElementById('admin-reportes-content')
  if (!cont) return
  cont.innerHTML = '<div class="admin-loading">⚙️ Generando reportes...</div>'

  const [rankingRes, stockRes] = await Promise.all([
    window.adminService.obtenerReporteProductosMasCotizados(),
    window.adminService.obtenerReporteStock(),
  ])

  const ranking = rankingRes.data || []
  const stock   = stockRes.data   || {}

  cont.innerHTML = `
    <!-- RESUMEN RÁPIDO -->
    <div class="admin-reporte-bloque">
      <h3>📊 Resumen — productos más cotizados</h3>
      ${ranking.length === 0
        ? '<p class="admin-empty">Sin datos suficientes todavía.</p>'
        : `<div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>Pos.</th><th>Código</th><th>Producto</th><th>Veces cotizado</th></tr></thead>
              <tbody>
                ${ranking.map((p, i) => `
                  <tr>
                    <td><strong>#${i + 1}</strong></td>
                    <td>${escHtml(p.codigo || '—')}</td>
                    <td>${escHtml(p.nombre || '—')}</td>
                    <td><span class="admin-badge-info">${p.total}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
      }
    </div>

    <!-- STOCK -->
    <div class="admin-reporte-bloque">
      <h3>📦 Estado del stock</h3>
      <div class="admin-kpi-grid" style="grid-template-columns:repeat(4,1fr)">
        <div class="admin-kpi admin-kpi-danger">
          <div class="admin-kpi-num">${(stock.sinStock  || []).length}</div>
          <div class="admin-kpi-label">Sin stock</div>
        </div>
        <div class="admin-kpi admin-kpi-warn">
          <div class="admin-kpi-num">${(stock.stockBajo || []).length}</div>
          <div class="admin-kpi-label">Stock bajo (≤5)</div>
        </div>
        <div class="admin-kpi admin-kpi-info">
          <div class="admin-kpi-num">${(stock.stockMedio|| []).length}</div>
          <div class="admin-kpi-label">Stock medio (6-20)</div>
        </div>
        <div class="admin-kpi admin-kpi-ok">
          <div class="admin-kpi-num">${(stock.suficiente|| []).length}</div>
          <div class="admin-kpi-label">Stock suficiente</div>
        </div>
      </div>

      ${(stock.sinStock || []).length > 0 ? `
        <h4 style="margin:1.5rem 0 0.5rem;color:#cc3333">⚠️ Productos sin stock</h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
            <tbody>
              ${(stock.sinStock || []).slice(0, 20).map(p => `
                <tr>
                  <td>${escHtml(p.codigo || '—')}</td>
                  <td>${escHtml(p.descripcion || '')}</td>
                  <td>${escHtml(p.categoria?.nombre_categoria || '—')}</td>
                  <td><span class="admin-badge-danger">0</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : ''
      }

      ${(stock.stockBajo || []).length > 0 ? `
        <h4 style="margin:1.5rem 0 0.5rem;color:#e07b00">⚠️ Productos con stock bajo (≤5 unidades)</h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
            <tbody>
              ${(stock.stockBajo || []).slice(0, 20).map(p => `
                <tr>
                  <td>${escHtml(p.codigo || '—')}</td>
                  <td>${escHtml(p.descripcion || '')}</td>
                  <td>${escHtml(p.categoria?.nombre_categoria || '—')}</td>
                  <td><span class="admin-badge-warn">${p.stockNum}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : ''
      }
    </div>
  `
}

/* ═══════════════════════════════════════════════
   MODAL GENÉRICO DEL PANEL
═══════════════════════════════════════════════ */
window.adminCerrarModal = function() {
  const m = document.getElementById('admin-modal')
  if (m) m.style.display = 'none'
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

/* ═══════════════════════════════════════════════
   EXPORTAR COTIZACIONES
═══════════════════════════════════════════════ */

/**
 * Retorna los datos visibles actualmente en la
 * tabla (respeta el filtro activo).
 */
function adminGetDatosExportar() {
  const filtro = adminState.filtroEstado || ''
  return filtro
    ? adminState.cotizaciones.filter(c => c.estado === filtro)
    : adminState.cotizaciones
}

/* ─── EXCEL ──────────────────────────────────── */
window.adminExportarExcel = function() {
  const data = adminGetDatosExportar()

  if (data.length === 0) {
    showToast('⚠️ No hay cotizaciones para exportar.')
    return
  }

  if (typeof XLSX === 'undefined') {
    showToast('❌ Error al cargar librería Excel. Intenta de nuevo.')
    return
  }

  // Armar filas
  const filas = data.map(c => {
    const prods = (c.productos_solicitados || [])
      .map(p => `${p.nombre || p.codigo || '?'} x${p.cantidad || 1}`)
      .join(' | ')

    return {
      'N°':          c.id,
      'Fecha':       new Date(c.created_at).toLocaleDateString('es-CL'),
      'Nombre':      c.nombre || '',
      'Empresa':     c.empresa || '',
      'Email':       c.email || '',
      'Teléfono':    c.telefono || '',
      'Productos':   prods || '(sin productos)',
      'Estado':      c.estado || '',
      'Mensaje':     c.mensaje || '',
    }
  })

  const wb  = XLSX.utils.book_new()
  const ws  = XLSX.utils.json_to_sheet(filas)

  // Anchos de columna
  ws['!cols'] = [
    { wch: 6 }, { wch: 12 }, { wch: 22 }, { wch: 20 },
    { wch: 26 }, { wch: 14 }, { wch: 50 }, { wch: 12 }, { wch: 30 },
  ]

  XLSX.utils.book_append_sheet(wb, ws, 'Cotizaciones')

  const fecha = new Date().toLocaleDateString('es-CL').replace(/\//g, '-')
  XLSX.writeFile(wb, `VMA-Cotizaciones-${fecha}.xlsx`)
  showToast('✅ Excel descargado correctamente.')
}

/* ─── PDF ────────────────────────────────────── */
window.adminExportarPDF = function() {
  const data = adminGetDatosExportar()

  if (data.length === 0) {
    showToast('⚠️ No hay cotizaciones para exportar.')
    return
  }

  if (typeof window.jspdf === 'undefined') {
    showToast('❌ Error al cargar librería PDF. Intenta de nuevo.')
    return
  }

  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' })

  const AZUL   = [0, 59, 92]
  const VERDE  = [132, 189, 0]
  const BLANCO = [255, 255, 255]
  const GRIS   = [85, 94, 106]
  const GRIS_CL= [244, 246, 248]

  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()

  // ── HEADER ──────────────────────────────────
  doc.setFillColor(...AZUL)
  doc.rect(0, 0, W, 28, 'F')
  doc.setFillColor(...VERDE)
  doc.rect(0, 26, W, 2.5, 'F')

  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('VMA INDUSTRIAL', 14, 12)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('Agente Autorizado Indura', 14, 18)

  // Título reporte
  const filtroLabel = adminState.filtroEstado
    ? `Estado: ${adminState.filtroEstado}`
    : 'Todas las cotizaciones'
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  const titulo = `Reporte de Cotizaciones — ${filtroLabel}`
  const tW = doc.getTextWidth(titulo)
  doc.text(titulo, W - 14 - tW, 12)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const fechaHoy = new Date().toLocaleDateString('es-CL', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const fW = doc.getTextWidth(fechaHoy)
  doc.text(fechaHoy, W - 14 - fW, 19)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const totalTxt = `Total: ${data.length} cotizaci${data.length !== 1 ? 'ones' : 'ón'}`
  const tTW = doc.getTextWidth(totalTxt)
  doc.text(totalTxt, W - 14 - tTW, 24)

  // ── TABLA ────────────────────────────────────
  const cols = {
    id:      { x: 14,  w: 12,  label: '#' },
    fecha:   { x: 26,  w: 22,  label: 'Fecha' },
    nombre:  { x: 48,  w: 38,  label: 'Nombre' },
    empresa: { x: 86,  w: 38,  label: 'Empresa' },
    email:   { x: 124, w: 52,  label: 'Email' },
    prods:   { x: 176, w: 18,  label: 'Items' },
    estado:  { x: 194, w: 24,  label: 'Estado' },
  }

  let y = 34
  const rowH = 7

  // Cabecera tabla
  doc.setFillColor(...AZUL)
  doc.rect(14, y, W - 28, rowH, 'F')
  doc.setTextColor(...BLANCO)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)

  Object.values(cols).forEach(col => {
    doc.text(col.label, col.x + 1, y + 4.8)
  })
  y += rowH

  // Filas
  const estadoColor = {
    pendiente:  [224, 123, 0],
    revisada:   [0, 100, 180],
    respondida: [50, 150, 50],
  }

  data.forEach((c, i) => {
    // Paginación
    if (y + rowH > H - 16) {
      doc.addPage()
      y = 14
      // Repetir cabecera
      doc.setFillColor(...AZUL)
      doc.rect(14, y, W - 28, rowH, 'F')
      doc.setTextColor(...BLANCO)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      Object.values(cols).forEach(col => doc.text(col.label, col.x + 1, y + 4.8))
      y += rowH
    }

    // Fondo alternado
    if (i % 2 === 0) {
      doc.setFillColor(...GRIS_CL)
      doc.rect(14, y, W - 28, rowH, 'F')
    }

    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.2)

    const fecha  = new Date(c.created_at).toLocaleDateString('es-CL')
    const nombre = (c.nombre || '').substring(0, 22)
    const empresa= (c.empresa || '—').substring(0, 22)
    const email  = (c.email || '').substring(0, 30)
    const prods  = String((c.productos_solicitados || []).length)

    doc.text(String(c.id),  cols.id.x + 1,      y + 4.8)
    doc.text(fecha,          cols.fecha.x + 1,   y + 4.8)
    doc.text(nombre,         cols.nombre.x + 1,  y + 4.8)
    doc.text(empresa,        cols.empresa.x + 1, y + 4.8)
    doc.text(email,          cols.email.x + 1,   y + 4.8)
    doc.text(prods,          cols.prods.x + 5,   y + 4.8)

    // Badge de estado
    const color = estadoColor[c.estado] || GRIS
    doc.setFillColor(...color)
    doc.roundedRect(cols.estado.x + 1, y + 1.5, 20, 4, 1, 1, 'F')
    doc.setTextColor(...BLANCO)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.text((c.estado || '').toUpperCase(), cols.estado.x + 11, y + 4.5, { align: 'center' })

    y += rowH
  })

  // ── FOOTER ──────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFillColor(...AZUL)
    doc.rect(0, H - 10, W, 10, 'F')
    doc.setFillColor(...VERDE)
    doc.rect(0, H - 10, W, 1.5, 'F')
    doc.setTextColor(...BLANCO)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('VMA Industrial — Agente Autorizado Indura', 14, H - 4)
    const pTxt = `Página ${p} de ${totalPages}`
    const pW   = doc.getTextWidth(pTxt)
    doc.text(pTxt, W - 14 - pW, H - 4)
  }

  const fechaArchivo = new Date().toLocaleDateString('es-CL').replace(/\//g, '-')
  doc.save(`VMA-Cotizaciones-${fechaArchivo}.pdf`)
  showToast('✅ PDF descargado correctamente.')
}
