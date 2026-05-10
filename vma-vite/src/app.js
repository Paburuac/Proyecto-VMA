/**
 * src/app.js
 * ─────────────────────────────────────────────
 * Entry point de Vite para VMA Industrial.
 *
 * Responsabilidades:
 *  1. Cargar productos y categorías desde Supabase.
 *  2. Construir la variable global `catalogo` que
 *     esperan productos.js, carrito.js y main-legacy.js.
 *  3. Inicializar la app una vez los datos están listos.
 *  4. Mostrar estado de carga y errores al usuario.
 * ─────────────────────────────────────────────
 */

import { obtenerProductos, obtenerCategorias, construirCatalogo } from './services/productoService.js'

// ─── Estado de la aplicación ────────────────
let appState = {
  loading: true,
  error:   null,
  data:    null,
}

// ─── Funciones de UI de carga ────────────────
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

  // Carga paralela: productos y categorías al mismo tiempo
  const [productosResult, categoriasResult] = await Promise.all([
    obtenerProductos(),
    obtenerCategorias(),
  ])

  // Manejo de errores
  if (productosResult.error) {
    appState.loading = false
    appState.error   = productosResult.error
    mostrarError(productosResult.error)
    return
  }

  const productos   = productosResult.data    // array plano de Supabase
  const categorias  = categoriasResult.data   // array de categorías (puede ser null si hay error no crítico)

  // Log de confirmación (prueba temporal visible en consola)
  console.log('[VMA] ✅ Productos cargados desde Supabase:', productos)
  console.log('[VMA] ✅ Categorías cargadas desde Supabase:', categorias)
  console.log(`[VMA] Total productos: ${productos.length}`)

  // Construir la estructura anidada que espera el resto del frontend
  const catalogoDesdeSupabase = construirCatalogo(productos)
  console.log('[VMA] Catálogo construido:', catalogoDesdeSupabase)

  // Exponer como variable global para compatibilidad con productos.js,
  // carrito.js y main.js (que leen `catalogo` como global).
  // El shim en index.html mapea `catalogo` → window._catalogoData via setter.
  window.catalogo = catalogoDesdeSupabase

  // Actualizar estado
  appState.loading = false
  appState.error   = null
  appState.data    = { productos, categorias, catalogo: catalogoDesdeSupabase }

  // Inicializar la app con los datos listos
  inicializarApp()
}

// ─── Inicialización de la app ─────────────────
function inicializarApp() {
  // renderCatGrid() está definida en src/js/main.js (legacy)
  // lee window.catalogo que ya está disponible
  if (typeof renderCatGrid === 'function') {
    renderCatGrid()
  }

  // Si el usuario llegó directo a la página de productos,
  // inicializar también ese módulo
  if (typeof initProductos === 'function') {
    const paginaProductos = document.getElementById('page-productos')
    if (paginaProductos?.classList.contains('active')) {
      initProductos()
    }
  }
}

// ─── Arrancar cuando el DOM esté listo ────────
document.addEventListener('DOMContentLoaded', () => {
  cargarDatos()
})

// ─── Exportar estado para debugging ───────────
export { appState }
