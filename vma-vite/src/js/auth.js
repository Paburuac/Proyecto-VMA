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
  loggedIn: false,
  user:     null,
  perfil:   null,
  rol:      null,
}
window.authState = authState

/* ─────────────────────────────────────────────
   HELPERS DE ROL
───────────────────────────────────────────── */
function isAdmin()      { return authState.rol === 'admin' }
function isTrabajador() { return authState.rol === 'trabajador' }
function isCliente()    { return authState.rol === 'cliente' }

window.isAdmin          = isAdmin
window.isTrabajador     = isTrabajador
window.isCliente        = isCliente
window.registrarCliente = registrarCliente

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

    // Botón Panel Admin — solo visible para admin
    const btnAdmin    = document.getElementById('nav-btn-admin')
    const btnAdminMob = document.getElementById('nav-btn-admin-mob')
    if (btnAdmin)    btnAdmin.style.display    = isAdmin() ? 'flex' : 'none'
    if (btnAdminMob) btnAdminMob.style.display = isAdmin() ? 'block' : 'none'

    if (btnLogin)    btnLogin.style.display    = 'none'
    if (btnRegistro) btnRegistro.style.display = 'none'

    if (userInfo) {
      userInfo.style.display = 'flex'
      userInfo.innerHTML = `
        <span class="nav-user-nombre">👤 ${escHtmlSafe(nombre)}</span>
        <span class="nav-user-rol">${escHtmlSafe(rol)}</span>
        <button class="btn-logout" id="btn-cerrar-sesion">Cerrar sesión</button>
      `
      document.getElementById('btn-cerrar-sesion')
        ?.addEventListener('click', handleLogout)
    }

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
    const _btnAdmin    = document.getElementById('nav-btn-admin')
    const _btnAdminMob = document.getElementById('nav-btn-admin-mob')
    if (_btnAdmin)    _btnAdmin.style.display    = 'none'
    if (_btnAdminMob) _btnAdminMob.style.display = 'none'
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
   Carga perfil y actualiza UI.
   Retorna true si todo salió bien.
───────────────────────────────────────────── */
async function manejarSesion(user, itemsEnMemoria = []) {
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

  // Cargar y fusionar carrito desde Supabase
  if (typeof window.cargarCarritoDesdeSupabase === 'function') {
    await window.cargarCarritoDesdeSupabase(itemsEnMemoria)
  }

  return true
}

/* ─────────────────────────────────────────────
   handleLogin()
   Fuente única de verdad para el login manual.
   onAuthStateChange está desactivado para SIGNED_IN
   — toda la lógica pasa por aquí.
───────────────────────────────────────────── */
async function handleLogin(email, password) {
  limpiarLoginError()
  setLoginLoading(true)

  // Snapshot del carrito en memoria antes del login
  const itemsEnMemoria = typeof cart !== 'undefined' ? [...cart] : []

  const { data, error } = await login(email, password)

  if (error) {
    setLoginLoading(false)
    mostrarLoginError(traducirErrorAuth(error.message))
    return
  }

  // Pasar los items en memoria directamente a manejarSesion
  const ok = await manejarSesion(data.user, itemsEnMemoria)

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

  authState.loggedIn = false
  authState.user     = null
  authState.perfil   = null
  authState.rol      = null

  if (typeof window.limpiarCarritoLocal === 'function') {
    window.limpiarCarritoLocal()
  }

  actualizarHeaderUI()
  showPage('page-inicio')
  showToast('👋 Sesión cerrada correctamente.')
}
window.handleLogout = handleLogout

/* ─────────────────────────────────────────────
   inicializarAuth()
   Verifica sesión existente al cargar la página.
   Llamado desde src/app.js ANTES de cargar catálogo.
───────────────────────────────────────────── */
export async function inicializarAuth() {
  const { data, error } = await getSession()

  if (error || !data?.session) {
    actualizarHeaderUI()
    return
  }

  // Hay sesión activa — cargar perfil sin items en memoria
  // (al recargar no hay carrito en memoria todavía)
  await manejarSesion(data.session.user, [])
}

/* ─────────────────────────────────────────────
   ESCUCHAR CAMBIOS DE SESIÓN EN TIEMPO REAL
   Solo maneja SIGNED_OUT y TOKEN_REFRESHED.
   SIGNED_IN lo maneja handleLogin directamente
   para evitar doble ejecución de manejarSesion.
───────────────────────────────────────────── */
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('[VMA Auth] onAuthStateChange →', event)

  // SIGNED_IN lo ignora completamente — handleLogin e inicializarAuth
  // ya lo manejan con control total del flujo
  if (event === 'SIGNED_IN') {
    console.log('[VMA Auth] SIGNED_IN ignorado — manejado por handleLogin/inicializarAuth')
    return
  }

  if (event === 'SIGNED_OUT') {
    authState.loggedIn = false
    authState.user     = null
    authState.perfil   = null
    authState.rol      = null
    if (typeof window.limpiarCarritoLocal === 'function') {
      window.limpiarCarritoLocal()
    }
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