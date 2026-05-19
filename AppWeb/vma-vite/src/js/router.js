/* =============================================
   VMA INDUSTRIAL – router.js
   Responsabilidad: Navegación SPA entre páginas
   y toggle del menú móvil.
   ============================================= */

/* -----------------------------------------------
   RUTAS PROTEGIDAS
   Define qué páginas requieren qué condición.
   La función retorna true si el acceso está
   permitido, false si debe redirigirse.
----------------------------------------------- */
const rutasProtegidas = {
  'page-admin':            () => typeof window.isAdmin      === 'function' && window.isAdmin(),
  'page-trabajador':       () => typeof window.isTrabajador === 'function' && window.isTrabajador(),
  'page-mis-cotizaciones': () => window.authState?.loggedIn === true,
  'page-cotizacion':       () => true,   // accesible para todos, pero pre-llena si logueado
}

/* -----------------------------------------------
   NAVEGACIÓN SPA
----------------------------------------------- */
function showPage(id) {

  // ── Verificar acceso a rutas protegidas ──────
  if (rutasProtegidas[id] !== undefined) {
    const tieneAcceso = rutasProtegidas[id]()
    if (!tieneAcceso) {
      // Redirigir a login si no está autenticado,
      // o al inicio si no tiene el rol requerido
      const destino = window.authState?.loggedIn ? 'page-inicio' : 'page-login'
      _navegarA(destino)
      if (typeof window.showToast === 'function') {
        const msg = window.authState?.loggedIn
          ? '⛔ No tienes permisos para acceder a esa sección.'
          : '🔒 Debes iniciar sesión para acceder a esa sección.'
        window.showToast(msg)
      }
      return
    }
  }

  _navegarA(id)

  // ── Inicializadores por página ───────────────
  if (id === 'page-productos') {
    initProductos()
  }

  if (id === 'page-cotizacion') {
    setTimeout(() => {
      if (typeof window.prellenarFormContacto === 'function') {
        window.prellenarFormContacto()
      }
    }, 100)
  }
}

/* -----------------------------------------------
   NAVEGACIÓN INTERNA (sin verificación de acceso)
   Usada por el propio router y por auth.js al
   redirigir tras login/logout.
----------------------------------------------- */
function _navegarA(id) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))

  // Mostrar la página destino
  const target = document.getElementById(id)
  if (target) {
    target.classList.add('active')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Actualizar nav activo
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id)
  })

  // Cerrar menú móvil
  const navMobile = document.querySelector('.nav-mobile')
  if (navMobile) navMobile.classList.remove('open')
}

/* -----------------------------------------------
   HAMBURGER
----------------------------------------------- */
document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.nav-mobile').classList.toggle('open')
})

/* -----------------------------------------------
   ESTADO DE FILTROS DE CATÁLOGO
----------------------------------------------- */
const state = {
  activeCat: null,
  activeSub: null,
  filterCat: '',
  filterSub: ''
}

window.showPage  = showPage
window._navegarA = _navegarA   // expuesto para auth.js (login/logout sin re-verificar permisos)
window.state     = state
