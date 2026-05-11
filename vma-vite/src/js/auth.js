/**
 * src/js/auth.js
 * ─────────────────────────────────────────────
 * Estado global de autenticación y funciones
 * de UI relacionadas con el usuario logueado.
 *
 * Expone en window:
 *   window.authState       → estado actual del usuario
 *   window.handleLogin()   → llamado desde el form HTML
 *   window.handleLogout()  → llamado desde el botón de la nav
 *   window.isAdmin()       → true si rol es "admin"
 *   window.isTrabajador()  → true si rol es "trabajador"
 *   window.isCliente()     → true si rol es "cliente"
 * ─────────────────────────────────────────────
 */

import { login, logout, getSession, cargarPerfil } from '../services/authService.js'

/* ─────────────────────────────────────────────
   ESTADO GLOBAL DE AUTH
   Accesible desde cualquier script como window.authState
───────────────────────────────────────────── */
const authState = {
  loggedIn:  false,
  user:      null,   // objeto de Supabase Auth
  perfil:    null,   // fila de tabla usuarios
  rol:       null,   // string: "admin" | "trabajador" | "cliente"
}
window.authState = authState

/* ─────────────────────────────────────────────
   HELPERS DE ROL
───────────────────────────────────────────── */
function isAdmin()       { return authState.rol === 'admin' }
function isTrabajador()  { return authState.rol === 'trabajador' }
function isCliente()     { return authState.rol === 'cliente' }

window.isAdmin      = isAdmin
window.isTrabajador = isTrabajador
window.isCliente    = isCliente

/* ─────────────────────────────────────────────
   ACTUALIZAR UI DEL HEADER
   Muestra nombre + rol cuando está logueado,
   o los botones de login/registro cuando no.
───────────────────────────────────────────── */
function actualizarHeaderUI() {
  const btnLogin    = document.getElementById('nav-btn-login')
  const btnRegistro = document.getElementById('nav-btn-registro')
  const userInfo    = document.getElementById('nav-user-info')
  const btnLoginMob = document.getElementById('nav-btn-login-mob')
  const btnRegMob   = document.getElementById('nav-btn-registro-mob')
  const userInfoMob = document.getElementById('nav-user-info-mob')

  if (authState.loggedIn && authState.perfil) {
    const nombre = authState.perfil.nombre || authState.perfil.email
    const rol    = authState.rol || ''

    // Desktop
    if (btnLogin)    btnLogin.style.display    = 'none'
    if (btnRegistro) btnRegistro.style.display = 'none'
    if (userInfo) {
      userInfo.style.display = 'flex'
      userInfo.innerHTML = `
        <span class="nav-user-nombre">👤 ${escHtmlSafe(nombre)}</span>
        <span class="nav-user-rol">${escHtmlSafe(rol)}</span>
        <button class="btn-logout" onclick="handleLogout()">Cerrar sesión</button>
      `
    }

    // Móvil
    if (btnLoginMob)    btnLoginMob.style.display    = 'none'
    if (btnRegMob)      btnRegMob.style.display      = 'none'
    if (userInfoMob) {
      userInfoMob.style.display = 'block'
      userInfoMob.innerHTML = `
        <span class="nav-user-nombre-mob">👤 ${escHtmlSafe(nombre)} (${escHtmlSafe(rol)})</span>
        <a onclick="handleLogout()">Cerrar sesión</a>
      `
    }

  } else {
    // Sin sesión: mostrar botones normales
    if (btnLogin)    btnLogin.style.display    = ''
    if (btnRegistro) btnRegistro.style.display = ''
    if (userInfo)    userInfo.style.display    = 'none'

    if (btnLoginMob)    btnLoginMob.style.display    = ''
    if (btnRegMob)      btnRegMob.style.display      = ''
    if (userInfoMob)    userInfoMob.style.display    = 'none'
  }
}

/* Helper local para escaping (main.js la expone también, pero auth.js
   puede cargarse antes, así que definimos una copia defensiva) */
function escHtmlSafe(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/* ─────────────────────────────────────────────
   MOSTRAR ERROR EN FORMULARIO LOGIN
───────────────────────────────────────────── */
function mostrarLoginError(mensaje) {
  const el = document.getElementById('login-error-msg')
  if (el) {
    el.textContent = mensaje
    el.style.display = 'block'
  }
}

function limpiarLoginError() {
  const el = document.getElementById('login-error-msg')
  if (el) {
    el.textContent = ''
    el.style.display = 'none'
  }
}

/* ─────────────────────────────────────────────
   MOSTRAR / OCULTAR SPINNER EN BOTÓN LOGIN
───────────────────────────────────────────── */
function setLoginLoading(loading) {
  const btn = document.getElementById('btn-login-submit')
  if (!btn) return
  btn.disabled    = loading
  btn.textContent = loading ? 'Ingresando...' : 'Ingresar'
}

/* ─────────────────────────────────────────────
   MANEJAR SESIÓN: guarda estado y actualiza UI
───────────────────────────────────────────── */
async function manejarSesion(user) {
  const { data: perfil, error, inactivo } = await cargarPerfil(user.id)

  if (inactivo) {
    // Usuario desactivado: hacer logout inmediato
    await logout()
    mostrarLoginError('Tu cuenta está desactivada. Contacta al administrador.')
    return false
  }

  if (error || !perfil) {
    await logout()
    mostrarLoginError(error?.message || 'No se pudo cargar el perfil del usuario.')
    return false
  }

  // Poblar estado global
  authState.loggedIn = true
  authState.user     = user
  authState.perfil   = perfil
  authState.rol      = perfil.roles?.nombre || null

  actualizarHeaderUI()
  return true
}

/* ─────────────────────────────────────────────
   handleLogin()
   Llamado desde el submit del form-login.
   Conectado al formulario en index.html mediante
   el listener en la sección FORMULARIO LOGIN.
───────────────────────────────────────────── */
async function handleLogin(email, password) {
  limpiarLoginError()
  setLoginLoading(true)

  const { data, error } = await login(email, password)

  if (error) {
    setLoginLoading(false)
    // Traducir mensajes comunes de Supabase al español
    const msg = traducirErrorAuth(error.message)
    mostrarLoginError(msg)
    return
  }

  const ok = await manejarSesion(data.user)
  setLoginLoading(false)

  if (ok) {
    // Limpiar form y redirigir al inicio
    document.getElementById('form-login')?.reset()
    limpiarLoginError()
    showPage('page-inicio')
    showToast(`✅ Bienvenido, ${authState.perfil.nombre || authState.perfil.email}`)
  }
}
window.handleLogin = handleLogin

/* ─────────────────────────────────────────────
   handleLogout()
   Llamado desde el botón "Cerrar sesión" en nav.
───────────────────────────────────────────── */
async function handleLogout() {
  await logout()

  // Limpiar estado global
  authState.loggedIn = false
  authState.user     = null
  authState.perfil   = null
  authState.rol      = null

  actualizarHeaderUI()
  showPage('page-inicio')
  showToast('👋 Sesión cerrada correctamente.')
}
window.handleLogout = handleLogout

/* ─────────────────────────────────────────────
   inicializarAuth()
   Verifica si hay sesión activa al cargar la app.
   Llamado desde src/app.js al inicio.
───────────────────────────────────────────── */
export async function inicializarAuth() {
  const { data, error } = await getSession()

  if (error || !data?.session) {
    actualizarHeaderUI()  // mostrar botones de login
    return
  }

  await manejarSesion(data.session.user)
}

/* ─────────────────────────────────────────────
   ESCUCHAR CAMBIOS DE SESIÓN EN TIEMPO REAL
   (ej: token expirado, cierre desde otra pestaña)
───────────────────────────────────────────── */
import { supabase } from '../services/supabase.js'

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('[VMA Auth] onAuthStateChange →', event)

  if (event === 'SIGNED_IN' && session?.user) {
    await manejarSesion(session.user)
  }

  if (event === 'SIGNED_OUT') {
    authState.loggedIn = false
    authState.user     = null
    authState.perfil   = null
    authState.rol      = null
    actualizarHeaderUI()
  }

  if (event === 'TOKEN_REFRESHED') {
    console.log('[VMA Auth] token renovado automáticamente')
  }
})

/* ─────────────────────────────────────────────
   TRADUCCIÓN DE ERRORES DE SUPABASE AUTH
───────────────────────────────────────────── */
function traducirErrorAuth(msg) {
  if (!msg) return 'Error desconocido al iniciar sesión.'
  const m = msg.toLowerCase()
  if (m.includes('invalid login credentials') || m.includes('invalid credentials')) {
    return 'Correo o contraseña incorrectos.'
  }
  if (m.includes('email not confirmed')) {
    return 'Debes confirmar tu correo electrónico antes de iniciar sesión.'
  }
  if (m.includes('too many requests')) {
    return 'Demasiados intentos. Espera unos minutos e intenta nuevamente.'
  }
  if (m.includes('user not found')) {
    return 'No existe una cuenta con ese correo.'
  }
  return msg
}
