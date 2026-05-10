/**
 * src/services/productoService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a datos para el catálogo VMA.
 * Todas las consultas a Supabase pasan por aquí.
 *
 * Tablas en uso:
 *   producto  → id_producto, codigo, descripcion, id_categoria,
 *               precio, distribuidor, stock
 *   categoria → id_categoria, nombre_categoria
 *
 * Cada función retorna: { data, error, loading }
 * El componente que la llama decide qué hacer con cada estado.
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   CONSULTA BASE reutilizable
   Incluye la relación categoria para evitar
   duplicar el select en cada función.
───────────────────────────────────────────── */
const PRODUCTO_SELECT = `
  id_producto,
  codigo,
  descripcion,
  precio,
  distribuidor,
  stock,
  categoria (
    id_categoria,
    nombre_categoria
  )
`

/* ─────────────────────────────────────────────
   obtenerProductos()
   Retorna todos los productos con su categoría.
───────────────────────────────────────────── */
export async function obtenerProductos() {
  const { data, error } = await supabase
    .from('producto')
    .select(PRODUCTO_SELECT)
    .order('descripcion', { ascending: true })

  if (error) {
    console.error('[VMA] obtenerProductos() error:', error)
    return { data: null, error }
  }

  console.log('[VMA] obtenerProductos() →', data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   obtenerCategorias()
   Retorna todas las categorías, ordenadas por nombre.
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
   obtenerProductosPorCategoria(nombreCategoria)
   Filtra productos cuya categoría coincide con
   el nombre dado (case-insensitive usando ilike).
───────────────────────────────────────────── */
export async function obtenerProductosPorCategoria(nombreCategoria) {
  // Primero obtenemos el id de la categoría por nombre
  const { data: catData, error: catError } = await supabase
    .from('categoria')
    .select('id_categoria')
    .ilike('nombre_categoria', nombreCategoria)
    .single()

  if (catError || !catData) {
    console.error('[VMA] obtenerProductosPorCategoria() – categoría no encontrada:', nombreCategoria, catError)
    return { data: null, error: catError || new Error('Categoría no encontrada') }
  }

  const { data, error } = await supabase
    .from('producto')
    .select(PRODUCTO_SELECT)
    .eq('id_categoria', catData.id_categoria)
    .order('descripcion', { ascending: true })

  if (error) {
    console.error('[VMA] obtenerProductosPorCategoria() error:', error)
    return { data: null, error }
  }

  console.log(`[VMA] obtenerProductosPorCategoria(${nombreCategoria}) →`, data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   buscarProductos(texto)
   Búsqueda de texto libre en descripcion y codigo.
   Usa ilike para búsqueda case-insensitive.
───────────────────────────────────────────── */
export async function buscarProductos(texto) {
  if (!texto || texto.trim().length === 0) {
    return obtenerProductos()
  }

  const termino = texto.trim()

  const { data, error } = await supabase
    .from('producto')
    .select(PRODUCTO_SELECT)
    .or(`descripcion.ilike.%${termino}%,codigo.ilike.%${termino}%`)
    .order('descripcion', { ascending: true })

  if (error) {
    console.error('[VMA] buscarProductos() error:', error)
    return { data: null, error }
  }

  console.log(`[VMA] buscarProductos("${termino}") →`, data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   obtenerProductoPorCodigo(codigo)
   Para abrir el modal de detalle de un producto.
───────────────────────────────────────────── */
export async function obtenerProductoPorCodigo(codigo) {
  const { data, error } = await supabase
    .from('producto')
    .select(PRODUCTO_SELECT)
    .eq('codigo', codigo)
    .single()

  if (error) {
    console.error('[VMA] obtenerProductoPorCodigo() error:', error)
    return { data: null, error }
  }

  console.log('[VMA] obtenerProductoPorCodigo() →', data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   construirCatalogo(productos)
   Transforma el array plano de Supabase en la
   estructura anidada { Categoria: { Sub: [...] } }
   que espera el resto del frontend.

   Mientras no haya tabla subcategoria en Supabase,
   todos los productos caen en subcategoría "General".
   Cuando se agregue subcategoria al schema, actualizar
   aquí el campo correspondiente.
───────────────────────────────────────────── */
export function construirCatalogo(productos) {
  const catalogo = {}

  productos.forEach(prod => {
    // Nombre de categoría desde la relación
    const cat = prod.categoria?.nombre_categoria || 'Sin Categoría'

    // TODO: cuando exista tabla subcategoria, reemplazar 'General' por
    //       prod.subcategoria?.nombre_subcategoria
    const sub = 'General'

    if (!catalogo[cat]) catalogo[cat] = {}
    if (!catalogo[cat][sub]) catalogo[cat][sub] = []

    catalogo[cat][sub].push({
      // Mantener mismos campos que esperan productos.js y carrito.js
      codigo:      String(prod.codigo  ?? ''),
      nombre:      prod.descripcion    ?? '',
      distribuidor: prod.distribuidor  ?? '',
      stock:       String(prod.stock   ?? ''),
      precio:      prod.precio != null ? String(prod.precio) : 'Consultar',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Producto industrial de alta calidad.',
      imagen:      `media/productos/${cat.toLowerCase().replace(/\s+/g, '-')}/placeholder.jpg`,
      // Campos extra de Supabase (disponibles para uso futuro)
      id_producto: prod.id_producto,
      id_categoria: prod.categoria?.id_categoria,
    })
  })

  return catalogo
}
