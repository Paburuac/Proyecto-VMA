/**
 * src/tests/router.test.js
 * ─────────────────────────────────────────────
 * Pruebas unitarias para router.js:
 *   - Protección de rutas según rol
 *   - Redirección correcta al intentar acceso no autorizado
 *   - Toast informativo al bloquear acceso
 *   - Navegación libre a páginas públicas
 * ─────────────────────────────────────────────
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

// ── Lógica del router extraída para testing ───
// (misma lógica que router.js, sin dependencia del DOM)

function crearRouter(authState, navegarA, showToast) {

  const rutasProtegidas = {
    'page-admin':            () => authState.rol === 'admin',
    'page-trabajador':       () => authState.rol === 'trabajador',
    'page-mis-cotizaciones': () => authState.loggedIn === true,
  }

  function showPage(id) {
    if (rutasProtegidas[id] !== undefined) {
      const tieneAcceso = rutasProtegidas[id]()
      if (!tieneAcceso) {
        const destino = authState.loggedIn ? 'page-inicio' : 'page-login'
        navegarA(destino)
        const msg = authState.loggedIn
          ? '⛔ No tienes permisos para acceder a esa sección.'
          : '🔒 Debes iniciar sesión para acceder a esa sección.'
        showToast(msg)
        return false  // acceso denegado
      }
    }
    navegarA(id)
    return true  // acceso permitido
  }

  return { showPage }
}

// ════════════════════════════════════════════════
// Tests
// ════════════════════════════════════════════════
describe('Router — Protección de rutas', () => {

  let navegarA
  let showToast
  let authState

  beforeEach(() => {
    navegarA  = vi.fn()
    showToast = vi.fn()
    // Estado por defecto: sin sesión
    authState = { loggedIn: false, rol: null }
  })

  // ── Sin sesión ───────────────────────────────
  describe('usuario sin sesión', () => {

    it('bloquea acceso a page-admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-admin')
      expect(resultado).toBe(false)
    })

    it('redirige a page-login al intentar acceder a page-admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(navegarA).toHaveBeenCalledWith('page-login')
    })

    it('muestra toast de login requerido al bloquear page-admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(showToast).toHaveBeenCalledWith('🔒 Debes iniciar sesión para acceder a esa sección.')
    })

    it('bloquea acceso a page-trabajador sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-trabajador')
      expect(resultado).toBe(false)
      expect(navegarA).toHaveBeenCalledWith('page-login')
    })

    it('bloquea acceso a page-mis-cotizaciones sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-mis-cotizaciones')
      expect(resultado).toBe(false)
      expect(navegarA).toHaveBeenCalledWith('page-login')
    })

    it('permite acceso a page-inicio sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-inicio')
      expect(resultado).toBe(true)
      expect(navegarA).toHaveBeenCalledWith('page-inicio')
    })

    it('permite acceso a page-productos sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-productos')
      expect(resultado).toBe(true)
    })

    it('permite acceso a page-contacto sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-contacto')
      expect(resultado).toBe(true)
    })

    it('permite acceso a page-login sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-login')
      expect(resultado).toBe(true)
    })

    it('permite acceso a page-registro sin sesión', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-registro')
      expect(resultado).toBe(true)
    })
  })

  // ── Con sesión pero rol cliente ──────────────
  describe('usuario logueado con rol cliente', () => {

    beforeEach(() => {
      authState = { loggedIn: true, rol: 'cliente' }
    })

    it('bloquea acceso a page-admin con rol cliente', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-admin')
      expect(resultado).toBe(false)
    })

    it('redirige a page-inicio (no page-login) al bloquear page-admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(navegarA).toHaveBeenCalledWith('page-inicio')
    })

    it('muestra toast de sin permisos (no de login requerido)', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(showToast).toHaveBeenCalledWith('⛔ No tienes permisos para acceder a esa sección.')
    })

    it('bloquea acceso a page-trabajador con rol cliente', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-trabajador')
      expect(resultado).toBe(false)
    })

    it('permite acceso a page-mis-cotizaciones con sesión activa', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-mis-cotizaciones')
      expect(resultado).toBe(true)
      expect(showToast).not.toHaveBeenCalled()
    })
  })

  // ── Con sesión y rol admin ───────────────────
  describe('usuario logueado con rol admin', () => {

    beforeEach(() => {
      authState = { loggedIn: true, rol: 'admin' }
    })

    it('permite acceso a page-admin con rol admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-admin')
      expect(resultado).toBe(true)
      expect(navegarA).toHaveBeenCalledWith('page-admin')
    })

    it('no muestra toast al admin accediendo a page-admin', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(showToast).not.toHaveBeenCalled()
    })

    it('permite acceso a todas las páginas públicas', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      expect(showPage('page-inicio')).toBe(true)
      expect(showPage('page-productos')).toBe(true)
      expect(showPage('page-contacto')).toBe(true)
    })
  })

  // ── Con sesión y rol trabajador ──────────────
  describe('usuario logueado con rol trabajador', () => {

    beforeEach(() => {
      authState = { loggedIn: true, rol: 'trabajador' }
    })

    it('permite acceso a page-trabajador con rol trabajador', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-trabajador')
      expect(resultado).toBe(true)
    })

    it('bloquea acceso a page-admin con rol trabajador', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      const resultado = showPage('page-admin')
      expect(resultado).toBe(false)
    })

    it('redirige a page-inicio al bloquear page-admin para trabajador', () => {
      const { showPage } = crearRouter(authState, navegarA, showToast)
      showPage('page-admin')
      expect(navegarA).toHaveBeenCalledWith('page-inicio')
    })
  })
})
