/**
 * src/services/cotizacionService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a Supabase para cotizaciones.
 *
 * Tabla: cotizaciones
 *   id, usuario_id, nombre, empresa, email,
 *   telefono, mensaje, productos_solicitados (JSONB),
 *   estado, created_at, updated_at
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   enviarCotizacion(datos)
   Inserta una nueva cotización.

   datos: {
     nombre, empresa, email, telefono, mensaje,
     productos_solicitados: [ { codigo, nombre, cantidad, precio } ]
   }
───────────────────────────────────────────── */
export async function enviarCotizacion(datos) {
  try {
    // Si el usuario está logueado, obtener su usuario_id
    let usuarioId = null
    if (window.authState?.loggedIn && window.authState?.perfil?.id) {
      usuarioId = window.authState.perfil.id
    }

    const payload = {
      usuario_id:            usuarioId,
      nombre:                datos.nombre.trim(),
      empresa:               datos.empresa?.trim() || null,
      email:                 datos.email.trim().toLowerCase(),
      telefono:              datos.telefono?.trim() || null,
      mensaje:               datos.mensaje?.trim() || null,
      productos_solicitados: datos.productos_solicitados || [],
      estado:                'pendiente',
    }

    const { data, error } = await supabase
      .from('cotizaciones')
      .insert(payload)
      .select('id')
      .single()

    if (error) {
      console.error('[VMA Cotizacion] enviarCotizacion error:', error.message)
      return { data: null, error }
    }

    console.log('[VMA Cotizacion] cotización enviada – id:', data.id)

    // Llamar Edge Function para notificar por email (sin bloquear)
    fetch('https://hlyjfkybecuicgtefooj.supabase.co/functions/v1/notificar-cotizacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id:                    data.id,
        nombre:                payload.nombre,
        empresa:               payload.empresa,
        email:                 payload.email,
        telefono:              payload.telefono,
        mensaje:               payload.mensaje,
        productos_solicitados: payload.productos_solicitados,
      }),
    }).catch(err => console.warn('[VMA Email] No se pudo notificar:', err))

    return { data, error: null }

  } catch (err) {
    console.error('[VMA Cotizacion] enviarCotizacion excepción:', err)
    return { data: null, error: err }
  }
}

/* ─────────────────────────────────────────────
   obtenerMisCotizaciones()
   Retorna las cotizaciones del usuario logueado.
───────────────────────────────────────────── */
export async function obtenerMisCotizaciones() {
  try {
    const usuarioId = window.authState?.perfil?.id
    if (!usuarioId) return { data: [], error: null }

    const { data, error } = await supabase
      .from('cotizaciones')
      .select('id, nombre, empresa, email, telefono, mensaje, estado, precio_final, productos_solicitados, created_at')
      .eq('usuario_id', usuarioId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[VMA Cotizacion] obtenerMisCotizaciones error:', error.message)
      return { data: null, error }
    }

    return { data, error: null }

  } catch (err) {
    console.error('[VMA Cotizacion] obtenerMisCotizaciones excepción:', err)
    return { data: null, error: err }
  }
}

/* ─────────────────────────────────────────────
   obtenerTodasCotizaciones()
   Solo para admin y trabajador.
   Retorna todas las cotizaciones con datos del
   usuario que las envió.
───────────────────────────────────────────── */
export async function obtenerTodasCotizaciones() {
  try {
    const { data, error } = await supabase
      .from('cotizaciones')
      .select(`
        id,
        nombre,
        empresa,
        email,
        telefono,
        mensaje,
        productos_solicitados,
        estado,
        precio_final,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[VMA Cotizacion] obtenerTodasCotizaciones error:', error.message)
      return { data: null, error }
    }

    return { data, error: null }

  } catch (err) {
    console.error('[VMA Cotizacion] obtenerTodasCotizaciones excepción:', err)
    return { data: null, error: err }
  }
}

/* ─────────────────────────────────────────────
   actualizarConPrecioFinal(id, precioFinal)
   Solo para admin y trabajador.
   Marca la cotización como 'respondida' y guarda
   el precio final acordado (CLP entero).
───────────────────────────────────────────── */
export async function actualizarConPrecioFinal(id, precioFinal) {
  try {
    const { error } = await supabase
      .from('cotizaciones')
      .update({
        estado:       'respondida',
        precio_final: precioFinal,
        updated_at:   new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('[VMA Cotizacion] actualizarConPrecioFinal error:', error.message)
      return { error }
    }

    console.log('[VMA Cotizacion] cotización respondida con precio – id:', id, 'precio:', precioFinal)
    return { error: null }

  } catch (err) {
    console.error('[VMA Cotizacion] actualizarConPrecioFinal excepción:', err)
    return { error: err }
  }
}

/* ─────────────────────────────────────────────
   responderCotizacion(id, productosConPrecios, precioFinal)
   Guarda precio por producto y precio total.
   productosConPrecios: array con campo precio_respondido agregado.
───────────────────────────────────────────── */
export async function responderCotizacion(id, productosConPrecios, precioFinal) {
  try {
    const { error } = await supabase
      .from('cotizaciones')
      .update({
        estado:                'respondida',
        precio_final:          precioFinal,
        productos_solicitados: productosConPrecios,
        updated_at:            new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('[VMA Cotizacion] responderCotizacion error:', error.message)
      return { error }
    }

    return { error: null }
  } catch (err) {
    console.error('[VMA Cotizacion] responderCotizacion excepción:', err)
    return { error: err }
  }
}

/* ─────────────────────────────────────────────
   actualizarEstado(id, nuevoEstado)
   Solo para admin y trabajador.
   nuevoEstado: 'pendiente' | 'revisada' | 'respondida'
───────────────────────────────────────────── */
export async function actualizarEstado(id, nuevoEstado) {
  try {
    const { error } = await supabase
      .from('cotizaciones')
      .update({
        estado:     nuevoEstado,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('[VMA Cotizacion] actualizarEstado error:', error.message)
      return { error }
    }

    console.log('[VMA Cotizacion] estado actualizado – id:', id, '→', nuevoEstado)
    return { error: null }

  } catch (err) {
    console.error('[VMA Cotizacion] actualizarEstado excepción:', err)
    return { error: err }
  }
}
