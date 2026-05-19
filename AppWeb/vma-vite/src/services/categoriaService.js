/**
 * src/services/categoriaService.js
 * ─────────────────────────────────────────────
 * Servicio dedicado a operaciones sobre la tabla `categoria`.
 * Separado de productoService.js para mantener SRP
 * (Single Responsibility Principle) cuando el módulo crezca.
 *
 * Tabla: categoria
 *   - id_categoria    (int, PK)
 *   - nombre_categoria (varchar)
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   obtenerCategorias()
   Retorna todas las categorías ordenadas.
───────────────────────────────────────────── */
export async function obtenerCategorias() {
  const { data, error } = await supabase
    .from('categoria')
    .select('id_categoria, nombre_categoria')
    .order('nombre_categoria', { ascending: true })

  if (error) {
    console.error('[VMA] obtenerCategorias() error:', error)
    return { data: null, error }
  }

  console.log('[VMA] obtenerCategorias() →', data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   obtenerCategoriaPorId(id)
───────────────────────────────────────────── */
export async function obtenerCategoriaPorId(id) {
  const { data, error } = await supabase
    .from('categoria')
    .select('id_categoria, nombre_categoria')
    .eq('id_categoria', id)
    .single()

  if (error) {
    console.error('[VMA] obtenerCategoriaPorId() error:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

/* ─────────────────────────────────────────────
   FUTURO: crearCategoria, actualizarCategoria,
   eliminarCategoria → requieren RLS configurado
   en Supabase para roles admin.
───────────────────────────────────────────── */
