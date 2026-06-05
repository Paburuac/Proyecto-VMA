/**
 * src/services/productoService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a datos para el catálogo VMA.
 * Todas las consultas a Supabase pasan por aquí.
 *
 * Tablas en uso:
 *   producto  → id_producto, codigo, descripcion, id_categoria,
 *               precio, distribuidor, stock, imagen_url,
 *               tiene_variantes, id_padre, label_variante
 *   categoria → id_categoria, nombre_categoria
 *
 * Cada función retorna: { data, error }
 * El componente que la llama decide qué hacer con cada estado.
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ─────────────────────────────────────────────
   CONSULTA BASE reutilizable
   Solo trae productos padre (id_padre IS NULL).
   Las variantes se cargan bajo demanda con
   obtenerVariantes(idPadre).
───────────────────────────────────────────── */

const PRODUCTO_SELECT = `
  id_producto,
  codigo,
  descripcion,
  precio,
  distribuidor,
  stock,
  imagen_url,
  tiene_variantes,
  id_padre,
  label_variante,
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
    .is('id_padre', null)
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
    .is('id_padre', null)
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

  // Dividir en palabras individuales (ignorar espacios extra)
  const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0)

  // Construir query base
  let query = supabase
    .from('producto')
    .select(PRODUCTO_SELECT)
    .is('id_padre', null)
    .order('descripcion', { ascending: true })

  // Cada palabra debe aparecer en descripcion O en codigo (AND entre palabras)
  // Ej: "casco evo" → (desc ILIKE %casco% OR cod ILIKE %casco%)
  //                AND (desc ILIKE %evo%   OR cod ILIKE %evo%)
  for (const palabra of palabras) {
    query = query.or(`descripcion.ilike.%${palabra}%,codigo.ilike.%${palabra}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('[VMA] buscarProductos() error:', error)
    return { data: null, error }
  }

  console.log(`[VMA] buscarProductos("${texto}") [${palabras.length} palabras] →`, data)
  return { data, error: null }
}

/* ─────────────────────────────────────────────
   obtenerVariantes(idPadre)
   Retorna todas las variantes de un producto padre,
   ordenadas por label_variante.
   Incluye al padre mismo como primera opción.
───────────────────────────────────────────── */

export async function obtenerVariantes(idPadre) {
  const { data, error } = await supabase
    .from('producto')
    .select('id_producto, codigo, label_variante, precio, stock')
    .or(`id_producto.eq.${idPadre},id_padre.eq.${idPadre}`)
    .order('label_variante', { ascending: true })

  if (error) {
    console.error('[VMA] obtenerVariantes() error:', error)
    return { data: null, error }
  }

  console.log(`[VMA] obtenerVariantes(${idPadre}) →`, data)
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
───────────────────────────────────────────── */

export function construirCatalogo(productos) {
  const catalogo = {}

  productos.forEach(prod => {
    const cat = prod.categoria?.nombre_categoria || 'Sin Categoría'

    // TODO: cuando exista tabla subcategoria, reemplazar 'General' por
    // prod.subcategoria?.nombre_subcategoria
    const sub = 'General'

    if (!catalogo[cat])       catalogo[cat]      = {}
    if (!catalogo[cat][sub])  catalogo[cat][sub] = []

    catalogo[cat][sub].push({
      codigo:          String(prod.codigo ?? ''),
      nombre:          prod.descripcion ?? '',
      distribuidor:    prod.distribuidor ?? '',
      stock:           String(prod.stock ?? ''),
      precio:          prod.precio != null ? String(prod.precio) : 'Consultar',
      descripcion:     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Producto industrial de alta calidad.',
      imagen_url:      prod.imagen_url || null,
      // Campos de variantes
      tiene_variantes: prod.tiene_variantes ?? false,
      label_variante:  prod.label_variante ?? null,
      id_padre:        prod.id_padre ?? null,
      // Campos extra de Supabase
      id_producto:     prod.id_producto,
      id_categoria:    prod.categoria?.id_categoria,
    })
  })

  return catalogo
}
