/**
 * src/services/authService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a Supabase Auth para VMA Industrial.
 * Maneja login, logout, sesión persistente y carga
 * del perfil + rol desde la tabla `usuarios`.
 *
 * Todas las funciones retornan { data, error } para
 * que el llamador decida qué mostrar al usuario.
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   login(email, password)
   Autentica con Supabase Auth.
   Retorna { data: { user, session }, error }
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
   Cierra sesión en Supabase Auth.
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
   Recupera la sesión activa (para persistencia
   al recargar la página).
   Retorna { data: { session }, error }
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
   Consulta la tabla `usuarios` filtrando por
   auth_user_id y trae el rol relacionado.
   Retorna { data: perfil, error }
───────────────────────────────────────────── */
export async function cargarPerfil(userId) {
  try {
    const { data: perfil, error } = await supabase
      .from('usuarios')
      .select(`
        id,
        auth_user_id,
        nombre,
        email,
        telefono,
        activo,
        roles (
          id,
          nombre,
          descripcion
        )
      `)
      .eq('auth_user_id', userId)
      .single()

    if (error) {
      console.error('[VMA Auth] cargarPerfil error:', error.message)
      return { data: null, error }
    }

    if (!perfil) {
      const err = new Error('Usuario autenticado sin perfil asociado')
      console.error('[VMA Auth]', err.message)
      return { data: null, error: err }
    }

    // Validar que el usuario esté activo
    if (perfil.activo === false) {
      const err = new Error('Tu cuenta está desactivada. Contacta al administrador.')
      console.error('[VMA Auth]', err.message)
      return { data: null, error: err, inactivo: true }
    }

    console.log('[VMA Auth] perfil cargado:', perfil.nombre, '| rol:', perfil.roles?.nombre)
    return { data: perfil, error: null }

  } catch (err) {
    console.error('[VMA Auth] cargarPerfil excepción:', err)
    return { data: null, error: err }
  }
}
