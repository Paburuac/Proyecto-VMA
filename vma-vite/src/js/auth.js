/**
 * src/js/auth.js
 * ─────────────────────────────────────────────
 * Estado global de autenticación y funciones
 * de UI relacionadas con el usuario logueado.
 * ─────────────────────────────────────────────
 */

import { login, logout, getSession, cargarPerfil, registrarCliente } from '../services/authService.js'
import { supabase } from '../services/supabase.js'

/* ─────────────────────────────────────────────
   ESTADO GLOBAL DE AUTH
───────────────────────────────────────────── */
const authState = {
  loggedIn:       false,
  user:           null,
  perfil:         null,
  rol:            null,
  _procesando:    false,  // evita que handleLogin y onAuthStateChange se pisen
}
window.authState = authState

/* ─────────────────────────────────────────────
   HELPERS DE ROL
───────────────────────────────────────────── */
function isAdmin()       { return authState.rol === 'admin' }
function isTrabajador()  { return authState.rol === 'trabajador' }
function isCliente()     { return authState.rol === 'cliente' }

window.isAdmin         = isAdmin
window.isTrabajador    = isTrabajador
window.isCliente       = isCliente
window.registrarCliente = registrarCliente  // usado por validaciones.js

/* ─────────────────────────────────────────────
   ACTUALIZAR UI DEL HEADER
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

    // ── Desktop ──────────────────────────────
    if (btnLogin)    btnLogin.style.display    = 'none'
    if (btnRegistro) btnRegistro.style.display = 'none'

    if (userInfo) {
      userInfo.style.display = 'flex'
      userInfo.innerHTML = `
        <span class="nav-user-nombre">👤 ${escHtmlSafe(nombre)}</span>
        <span class="nav-user-rol">${escHtmlSafe(rol)}</span>
        <button class="btn-logout" id="btn-cerrar-sesion">Cerrar sesión</button>
      `
      // addEventListener en lugar de onclick inline — evita problemas
      // cuando el botón se regenera dinámicamente
      document.getElementById('btn-cerrar-sesion')
        ?.addEventListener('click', handleLogout)
    }

    // ── Móvil ─────────────────────────────────
    if (btnLoginMob) btnLoginMob.style.display = 'none'
    if (btnRegMob)   btnRegMob.style.display   = 'none'

    if (userInfoMob) {
      userInfoMob.style.display = 'block'
      userInfoMob.innerHTML = `
        <span class="nav-user-nombre-mob">👤 ${escHtmlSafe(nombre)} (${escHtmlSafe(rol)})</span>
        <a id="btn-cerrar-sesion-mob" style="cursor:pointer">Cerrar sesión</a>
      `
      document.getElementById('btn-cerrar-sesion-mob')
        ?.addEventListener('click', handleLogout)
    }

  } else {
    // ── Sin sesión: restaurar botones normales ─
    if (btnLogin)    btnLogin.style.display    = ''
    if (btnRegistro) btnRegistro.style.display = ''
    if (userInfo)    userInfo.style.display    = 'none'

    if (btnLoginMob) btnLoginMob.style.display = ''
    if (btnRegMob)   btnRegMob.style.display   = ''
    if (userInfoMob) userInfoMob.style.display = 'none'
  }
}

/* ─────────────────────────────────────────────
   HELPERS INTERNOS
───────────────────────────────────────────── */
function escHtmlSafe(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function mostrarLoginError(mensaje) {
  const el = document.getElementById('login-error-msg')
  if (el) { el.textContent = mensaje; el.style.display = 'block' }
}

function limpiarLoginError() {
  const el = document.getElementById('login-error-msg')
  if (el) { el.textContent = ''; el.style.display = 'none' }
}

function setLoginLoading(loading) {
  const btn = document.getElementById('btn-login-submit')
  if (!btn) return
  btn.disabled    = loading
  btn.textContent = loading ? 'Ingresando...' : 'Ingresar'
}

/* ─────────────────────────────────────────────
   MANEJAR SESIÓN
   Carga el perfil y actualiza el estado global.
   Retorna true si todo salió bien.
───────────────────────────────────────────── */
async function manejarSesion(user) {
  const { data: perfil, error, inactivo } = await cargarPerfil(user.id)

  if (inactivo) {
    await logout()
    mostrarLoginError('Tu cuenta está desactivada. Contacta al administrador.')
    return false
  }

  if (error || !perfil) {
    await logout()
    mostrarLoginError(error?.message || 'No se pudo cargar el perfil del usuario.')
    return false
  }

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
   Usa _procesando para evitar que onAuthStateChange
   duplique la carga del perfil simultáneamente.
───────────────────────────────────────────── */
async function handleLogin(email, password) {
  limpiarLoginError()
  setLoginLoading(true)
  authState._procesando = true   // bloquear onAuthStateChange durante este flujo

  const { data, error } = await login(email, password)

  if (error) {
    authState._procesando = false
    setLoginLoading(false)
    mostrarLoginError(traducirErrorAuth(error.message))
    return
  }

  const ok = await manejarSesion(data.user)

  authState._procesando = false
  setLoginLoading(false)

  if (ok) {
    document.getElementById('form-login')?.reset()
    limpiarLoginError()
    showPage('page-inicio')
    showToast(`✅ Bienvenido, ${authState.perfil.nombre || authState.perfil.email}`)
  }
}
window.handleLogin = handleLogin

/* ─────────────────────────────────────────────
   handleLogout()
───────────────────────────────────────────── */
async function handleLogout() {
  await logout()

  authState.loggedIn    = false
  authState.user        = null
  authState.perfil      = null
  authState.rol         = null
  authState._procesando = false

  actualizarHeaderUI()
  showPage('page-inicio')
  showToast('👋 Sesión cerrada correctamente.')
}
window.handleLogout = handleLogout

/* ─────────────────────────────────────────────
   inicializarAuth()
   Verifica sesión existente al cargar la página.
   Llamado desde src/app.js.
───────────────────────────────────────────── */
export async function inicializarAuth() {
  const { data, error } = await getSession()

  if (error || !data?.session) {
    actualizarHeaderUI()
    return
  }

  authState._procesando = true
  await manejarSesion(data.session.user)
  authState._procesando = false
}

/* ─────────────────────────────────────────────
   ESCUCHAR CAMBIOS DE SESIÓN EN TIEMPO REAL
   Solo actúa si _procesando es false, para no
   duplicar la carga del perfil cuando handleLogin
   o inicializarAuth ya lo están haciendo.
───────────────────────────────────────────── */
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('[VMA Auth] onAuthStateChange →', event)

  if (event === 'SIGNED_IN' && session?.user) {
    // Si handleLogin o inicializarAuth ya están procesando, ignorar
    if (authState._procesando) {
      console.log('[VMA Auth] onAuthStateChange SIGNED_IN ignorado (ya procesando)')
      return
    }
    // Solo llega aquí si el SIGNED_IN viene de otra pestaña o token refresh
    await manejarSesion(session.user)
  }

  if (event === 'SIGNED_OUT') {
    authState.loggedIn    = false
    authState.user        = null
    authState.perfil      = null
    authState.rol         = null
    authState._procesando = false
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
  if (m.includes('invalid login credentials') || m.includes('invalid credentials'))
    return 'Correo o contraseña incorrectos.'
  if (m.includes('email not confirmed'))
    return 'Debes confirmar tu correo electrónico antes de iniciar sesión.'
  if (m.includes('too many requests'))
    return 'Demasiados intentos. Espera unos minutos e intenta nuevamente.'
  if (m.includes('user not found'))
    return 'No existe una cuenta con ese correo.'
  return msg
}
