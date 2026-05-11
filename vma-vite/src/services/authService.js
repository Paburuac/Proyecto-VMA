/**
 * src/services/authService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a Supabase Auth para VMA Industrial.
 * Maneja login, logout, sesión persistente y carga
 * del perfil + rol desde la tabla `usuarios`.
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   login(email, password)
───────────────────────────────────────────── */
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('[VMA Auth] login error:', error.message)
      return { data: null, error }
    }
    console.log('[VMA Auth] login correcto – uid:', data.user.id)
    return { data, error: null }
  } catch (err) {
    console.error('[VMA Auth] login excepción:', err)
    return { data: null, error: err }
  }
}

/* ─────────────────────────────────────────────
   logout()
───────────────────────────────────────────── */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('[VMA Auth] logout error:', error.message)
      return { error }
    }
    console.log('[VMA Auth] logout correcto')
    return { error: null }
  } catch (err) {
    console.error('[VMA Auth] logout excepción:', err)
    return { error: err }
  }
}

/* ─────────────────────────────────────────────
   getSession()
───────────────────────────────────────────── */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('[VMA Auth] getSession error:', error.message)
      return { data: null, error }
    }
    if (data.session) {
      console.log('[VMA Auth] sesión detectada – uid:', data.session.user.id)
    } else {
      console.log('[VMA Auth] sin sesión activa')
    }
    return { data, error: null }
  } catch (err) {
    console.error('[VMA Auth] getSession excepción:', err)
    return { data: null, error: err }
  }
}

/* ─────────────────────────────────────────────
   cargarPerfil(userId)
   Hace dos consultas simples en lugar de join
   anidado, para evitar el error:
   "Cannot coerce the result to a single JSON object"
   que ocurre cuando PostgREST no reconoce la
   foreign key como relación navegable.
───────────────────────────────────────────── */
export async function cargarPerfil(userId) {
  try {
    // 1. Obtener perfil del usuario por auth_user_id
    const { data: perfil, error: errorPerfil } = await supabase
      .from('usuarios')
      .select('id, auth_user_id, nombre, email, telefono, activo, rol_id')
      .eq('auth_user_id', userId)
      .single()

    if (errorPerfil) {
      console.error('[VMA Auth] cargarPerfil – error al buscar usuario:', errorPerfil.message)
      return { data: null, error: errorPerfil }
    }

    if (!perfil) {
      const err = new Error('Usuario autenticado sin perfil asociado')
      console.error('[VMA Auth]', err.message)
      return { data: null, error: err }
    }

    // Validar cuenta activa
    if (perfil.activo === false) {
      const err = new Error('Tu cuenta está desactivada. Contacta al administrador.')
      console.error('[VMA Auth]', err.message)
      return { data: null, error: err, inactivo: true }
    }

    // 2. Obtener el rol por rol_id (consulta separada, sin join anidado)
    const { data: rol, error: errorRol } = await supabase
      .from('roles')
      .select('id, nombre, descripcion')
      .eq('id', perfil.rol_id)
      .single()

    if (errorRol) {
      console.warn('[VMA Auth] no se pudo cargar el rol:', errorRol.message)
      // No bloqueante: el usuario puede seguir logueado sin rol definido
    }

    // Devolver la misma estructura que espera auth.js: perfil.roles.nombre
    const perfilCompleto = {
      ...perfil,
      roles: rol ?? null,
    }

    console.log('[VMA Auth] perfil cargado:', perfilCompleto.nombre, '| rol:', rol?.nombre)
    return { data: perfilCompleto, error: null }

  } catch (err) {
    console.error('[VMA Auth] cargarPerfil excepción:', err)
    return { data: null, error: err }
  }
}