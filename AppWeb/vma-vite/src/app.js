/**
 * src/app.js
 * ─────────────────────────────────────────────
 * Entry point de Vite para VMA Industrial.
 *
 * Responsabilidades:
 *  1. Inicializar autenticación (sesión persistente).
 *  2. Cargar productos y categorías desde Supabase.
 *  3. Construir la variable global `catalogo`.
 *  4. Mostrar estados de carga y error.
 * ─────────────────────────────────────────────
 */

import { obtenerProductos, obtenerCategorias, construirCatalogo, buscarProductos } from './services/productoService.js'
import * as carritoService from './services/carritoService.js'
import * as cotizacionService from './services/cotizacionService.js'
import { inicializarAuth } from './js/auth.js'
import * as adminService from './services/adminService.js'
import './js/admin.js'
import './js/misCotizaciones.js'
import './js/panelTrabajador.js'

// Exponer carritoService globalmente para que carrito.js pueda usarlo
window.carritoService    = carritoService
window.cotizacionService = cotizacionService
window.adminService      = adminService
window.productoService   = { buscarProductos, construirCatalogo }
import './js/router.js'
import './js/productos.js'
import './js/carrito.js'
import './js/validaciones.js'
import './js/main.js'

// ─── Estado de la aplicación ────────────────
let appState = {
  loading: true,
  error:   null,
  data:    null,
}

// ─── UI de carga ────────────────────────────
function mostrarCargando() {
  const container = document.getElementById('productos-container')
  const sidebar   = document.getElementById('cat-sidebar')
  const catGrid   = document.getElementById('cat-grid-inicio')

  const html = `
    <div style="text-align:center;padding:3rem;color:var(--gris-texto)">
      <div style="font-size:2rem;margin-bottom:1rem;animation:spin 1s linear infinite;display:inline-block">⚙️</div>
      <p style="font-weight:600">Cargando catálogo desde Supabase...</p>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
  `
  if (container) container.innerHTML = html
  if (sidebar)   sidebar.innerHTML   = html
  if (catGrid)   catGrid.innerHTML   = html
}

function mostrarError(error) {
  console.error('[VMA] Error al cargar datos de Supabase:', error)

  const msg = `
    <div style="text-align:center;padding:3rem;color:#cc3333">
      <div style="font-size:2.5rem;margin-bottom:1rem">⚠️</div>
      <h3 style="margin-bottom:.5rem;color:#003B5C">No se pudo conectar con Supabase</h3>
      <p style="font-size:.9rem;max-width:400px;margin:0 auto;color:#555">
        ${error?.message || 'Error desconocido'}<br><br>
        Verifica que tu archivo <code>.env</code> tiene las credenciales correctas
        y que el proyecto Supabase está activo.
      </p>
    </div>
  `
  const container = document.getElementById('productos-container')
  const catGrid   = document.getElementById('cat-grid-inicio')
  if (container) container.innerHTML = msg
  if (catGrid)   catGrid.innerHTML   = msg
}

// ─── Carga de datos desde Supabase ───────────
async function cargarDatos() {
  mostrarCargando()

  const [productosResult, categoriasResult] = await Promise.all([
    obtenerProductos(),
    obtenerCategorias(),
  ])

  if (productosResult.error) {
    appState.loading = false
    appState.error   = productosResult.error
    mostrarError(productosResult.error)
    return
  }

  const productos  = productosResult.data
  const categorias = categoriasResult.data

  console.log('[VMA] ✅ Productos cargados desde Supabase:', productos)
  console.log('[VMA] ✅ Categorías cargadas desde Supabase:', categorias)
  console.log(`[VMA] Total productos: ${productos.length}`)

  const catalogoDesdeSupabase = construirCatalogo(productos)
  console.log('[VMA] Catálogo construido:', catalogoDesdeSupabase)

  // Exponer como global — el shim en index.html intercepta el setter
  window.catalogo = catalogoDesdeSupabase

  appState.loading = false
  appState.error   = null
  appState.data    = { productos, categorias, catalogo: catalogoDesdeSupabase }

  inicializarApp()
}

// ─── Inicialización de la app ─────────────────
function inicializarApp() {
  if (typeof renderCatGrid === 'function') {
    renderCatGrid()
  }

  if (typeof initProductos === 'function') {
    const paginaProductos = document.getElementById('page-productos')
    if (paginaProductos?.classList.contains('active')) {
      initProductos()
    }
  }
}

// ─── Arrancar ────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Verificar sesión existente PRIMERO (antes de mostrar UI)
  await inicializarAuth()

  // 2. Luego cargar el catálogo
  await cargarDatos()
})

export { appState }
