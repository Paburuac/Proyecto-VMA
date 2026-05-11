/**
 * src/services/carritoService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a Supabase para el carrito.
 * Todas las operaciones reciben usuario_id
 * (el id de la tabla usuarios, no el auth_user_id).
 *
 * Tabla: carrito_items
 *   id, usuario_id, producto_id, cantidad,
 *   created_at, updated_at
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   obtenerCarrito(usuarioId)
   Trae todos los items del carrito del usuario,
   incluyendo datos del producto para mostrar
   nombre, código y precio.
───────────────────────────────────────────── */
export async function obtenerCarrito(usuarioId) {
  const { data, error } = await supabase
    .from('carrito_items')
    .select(`
      id,
      cantidad,
      producto (
        id_producto,
        codigo,
        descripcion,
        precio
      )
    `)
    .eq('usuario_id', usuarioId)
    .order('id', { ascending: true })

  if (error) {
    console.error('[VMA Carrito] obtenerCarrito error:', error.message)
    return { data: null, error }
  }

  console.log('[VMA Carrito] carrito cargado:', data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   agregarItem(usuarioId, productoId, cantidad)
   Inserta o incrementa cantidad (upsert).
───────────────────────────────────────────── */
export async function agregarItem(usuarioId, productoId, cantidad = 1) {
  // Verificar si ya existe el item
  const { data: existing } = await supabase
    .from('carrito_items')
    .select('id, cantidad')
    .eq('usuario_id', usuarioId)
    .eq('producto_id', productoId)
    .single()

  if (existing) {
    // Ya existe → incrementar cantidad
    const nuevaCantidad = existing.cantidad + cantidad
    const { error } = await supabase
      .from('carrito_items')
      .update({ cantidad: nuevaCantidad, updated_at: new Date().toISOString() })
      .eq('id', existing.id)

    if (error) {
      console.error('[VMA Carrito] agregarItem update error:', error.message)
      return { error }
    }
  } else {
    // No existe → insertar
    const { error } = await supabase
      .from('carrito_items')
      .insert({ usuario_id: usuarioId, producto_id: productoId, cantidad })

    if (error) {
      console.error('[VMA Carrito] agregarItem insert error:', error.message)
      return { error }
    }
  }

  console.log('[VMA Carrito] item agregado – productoId:', productoId, 'cantidad:', cantidad)
  return { error: null }
}

/* ─────────────────────────────────────────────
   actualizarCantidad(itemId, nuevaCantidad)
   Actualiza la cantidad de un item por su id.
   Si cantidad <= 0 lo elimina.
───────────────────────────────────────────── */
export async function actualizarCantidad(itemId, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    return eliminarItem(itemId)
  }

  const { error } = await supabase
    .from('carrito_items')
    .update({ cantidad: nuevaCantidad, updated_at: new Date().toISOString() })
    .eq('id', itemId)

  if (error) {
    console.error('[VMA Carrito] actualizarCantidad error:', error.message)
    return { error }
  }

  return { error: null }
}

/* ─────────────────────────────────────────────
   eliminarItem(itemId)
   Elimina un item por su id de carrito_items.
───────────────────────────────────────────── */
export async function eliminarItem(itemId) {
  const { error } = await supabase
    .from('carrito_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('[VMA Carrito] eliminarItem error:', error.message)
    return { error }
  }

  console.log('[VMA Carrito] item eliminado – id:', itemId)
  return { error: null }
}

/* ─────────────────────────────────────────────
   vaciarCarrito(usuarioId)
   Elimina todos los items del usuario.
   Útil al completar una cotización.
───────────────────────────────────────────── */
export async function vaciarCarrito(usuarioId) {
  const { error } = await supabase
    .from('carrito_items')
    .delete()
    .eq('usuario_id', usuarioId)

  if (error) {
    console.error('[VMA Carrito] vaciarCarrito error:', error.message)
    return { error }
  }

  console.log('[VMA Carrito] carrito vaciado – usuarioId:', usuarioId)
  return { error: null }
}

/* ─────────────────────────────────────────────
   fusionarCarrito(usuarioId, itemsEnMemoria)
   Toma los items que el visitante tenía en
   memoria (antes de registrarse/loguearse) y los
   fusiona con los que ya tiene en Supabase.
   Si el producto ya existe, suma las cantidades.

   itemsEnMemoria: array de { producto_id, cantidad }
───────────────────────────────────────────── */
export async function fusionarCarrito(usuarioId, itemsEnMemoria) {
  if (!itemsEnMemoria || itemsEnMemoria.length === 0) return { error: null }

  console.log('[VMA Carrito] fusionando', itemsEnMemoria.length, 'items en memoria')

  for (const item of itemsEnMemoria) {
    await agregarItem(usuarioId, item.producto_id, item.cantidad)
  }

  return { error: null }
}
