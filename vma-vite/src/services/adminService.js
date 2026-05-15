/**
 * src/services/adminService.js
 * ─────────────────────────────────────────────
 * Capa de acceso a Supabase para el panel admin.
 * Incluye operaciones sobre: cotizaciones, usuarios,
 * productos, categorías y métricas del dashboard.
 *
 * Solo debe ser llamado cuando window.authState.rol === 'admin'
 * ─────────────────────────────────────────────
 */

import { supabase } from './supabase.js'

/* ═══════════════════════════════════════════════
   DASHBOARD — métricas generales
═══════════════════════════════════════════════ */

export async function obtenerMetricas() {
  try {
    const [cotizaciones, usuarios, productos, categorias] = await Promise.all([
      supabase.from('cotizaciones').select('id, estado', { count: 'exact' }),
      supabase.from('usuarios').select('id, activo', { count: 'exact' }),
      supabase.from('producto').select('id_producto', { count: 'exact' }),
      supabase.from('categoria').select('id_categoria', { count: 'exact' }),
    ])

    const totalCotizaciones  = cotizaciones.data?.length ?? 0
    const pendientes         = cotizaciones.data?.filter(c => c.estado === 'pendiente').length ?? 0
    const revisadas          = cotizaciones.data?.filter(c => c.estado === 'revisada').length ?? 0
    const respondidas        = cotizaciones.data?.filter(c => c.estado === 'respondida').length ?? 0
    const totalUsuarios      = usuarios.data?.length ?? 0
    const usuariosActivos    = usuarios.data?.filter(u => u.activo).length ?? 0
    const totalProductos     = productos.data?.length ?? 0
    const totalCategorias    = categorias.data?.length ?? 0

    return {
      data: { totalCotizaciones, pendientes, revisadas, respondidas, totalUsuarios, usuariosActivos, totalProductos, totalCategorias },
      error: null
    }
  } catch (err) {
    console.error('[VMA Admin] obtenerMetricas error:', err)
    return { data: null, error: err }
  }
}

/* ═══════════════════════════════════════════════
   COTIZACIONES
═══════════════════════════════════════════════ */

export async function obtenerCotizaciones(filtroEstado = '') {
  try {
    let query = supabase
      .from('cotizaciones')
      .select('id, nombre, empresa, email, telefono, mensaje, productos_solicitados, estado, created_at, usuario_id')
      .order('created_at', { ascending: false })

    if (filtroEstado) query = query.eq('estado', filtroEstado)

    const { data, error } = await query
    if (error) { console.error('[VMA Admin] obtenerCotizaciones error:', error.message); return { data: null, error } }
    return { data, error: null }
  } catch (err) {
    console.error('[VMA Admin] obtenerCotizaciones excepción:', err)
    return { data: null, error: err }
  }
}

export async function actualizarEstadoCotizacion(id, nuevoEstado) {
  try {
    const { error } = await supabase
      .from('cotizaciones')
      .update({ estado: nuevoEstado, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) { console.error('[VMA Admin] actualizarEstado error:', error.message); return { error } }
    console.log('[VMA Admin] cotización', id, '→', nuevoEstado)
    return { error: null }
  } catch (err) {
    console.error('[VMA Admin] actualizarEstado excepción:', err)
    return { error: err }
  }
}

export async function eliminarCotizacion(id) {
  try {
    const { error } = await supabase.from('cotizaciones').delete().eq('id', id)
    if (error) { console.error('[VMA Admin] eliminarCotizacion error:', error.message); return { error } }
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

/* ═══════════════════════════════════════════════
   USUARIOS
═══════════════════════════════════════════════ */

export async function obtenerUsuarios() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, auth_user_id, nombre, email, telefono, activo, rol_id, created_at, roles(id, nombre)')
      .order('created_at', { ascending: false })

    if (error) { console.error('[VMA Admin] obtenerUsuarios error:', error.message); return { data: null, error } }
    return { data, error: null }
  } catch (err) {
    console.error('[VMA Admin] obtenerUsuarios excepción:', err)
    return { data: null, error: err }
  }
}

export async function actualizarRolUsuario(usuarioId, nuevoRolId) {
  try {
    const { error } = await supabase
      .from('usuarios')
      .update({ rol_id: nuevoRolId, updated_at: new Date().toISOString() })
      .eq('id', usuarioId)

    if (error) { console.error('[VMA Admin] actualizarRol error:', error.message); return { error } }
    console.log('[VMA Admin] usuario', usuarioId, '→ rol_id', nuevoRolId)
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

export async function toggleActivoUsuario(usuarioId, activo) {
  try {
    const { error } = await supabase
      .from('usuarios')
      .update({ activo, updated_at: new Date().toISOString() })
      .eq('id', usuarioId)

    if (error) { console.error('[VMA Admin] toggleActivo error:', error.message); return { error } }
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

/* ═══════════════════════════════════════════════
   PRODUCTOS
═══════════════════════════════════════════════ */

export async function obtenerProductosAdmin() {
  try {
    const { data, error } = await supabase
      .from('producto')
      // ✅ imagen_url agregada al SELECT
      .select('id_producto, codigo, descripcion, precio, stock, distribuidor, imagen_url, id_categoria, categoria(id_categoria, nombre_categoria)')
      .order('descripcion', { ascending: true })

    if (error) { console.error('[VMA Admin] obtenerProductos error:', error.message); return { data: null, error } }
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function crearProducto(producto) {
  try {
    const { data, error } = await supabase
      .from('producto')
      .insert(producto)
      .select()
      .single()

    if (error) { console.error('[VMA Admin] crearProducto error:', error.message); return { data: null, error } }
    console.log('[VMA Admin] producto creado:', data.id_producto)
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function actualizarProducto(id, campos) {
  try {
    const { error } = await supabase
      .from('producto')
      .update(campos)
      .eq('id_producto', id)

    if (error) { console.error('[VMA Admin] actualizarProducto error:', error.message); return { error } }
    console.log('[VMA Admin] producto actualizado:', id)
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

export async function eliminarProducto(id) {
  try {
    const { error } = await supabase.from('producto').delete().eq('id_producto', id)
    if (error) { console.error('[VMA Admin] eliminarProducto error:', error.message); return { error } }
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

/* ═══════════════════════════════════════════════
   CATEGORÍAS
═══════════════════════════════════════════════ */

export async function obtenerCategoriasAdmin() {
  try {
    const { data, error } = await supabase
      .from('categoria')
      .select('id_categoria, nombre_categoria')
      .order('nombre_categoria', { ascending: true })

    if (error) { console.error('[VMA Admin] obtenerCategorias error:', error.message); return { data: null, error } }
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function crearCategoria(nombre) {
  try {
    const { data, error } = await supabase
      .from('categoria')
      .insert({ nombre_categoria: nombre.trim() })
      .select()
      .single()

    if (error) { console.error('[VMA Admin] crearCategoria error:', error.message); return { data: null, error } }
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function actualizarCategoria(id, nombre) {
  try {
    const { error } = await supabase
      .from('categoria')
      .update({ nombre_categoria: nombre.trim() })
      .eq('id_categoria', id)

    if (error) { console.error('[VMA Admin] actualizarCategoria error:', error.message); return { error } }
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

export async function eliminarCategoria(id) {
  try {
    // Verificar que no tenga productos asociados
    const { data: prods } = await supabase
      .from('producto')
      .select('id_producto')
      .eq('id_categoria', id)
      .limit(1)

    if (prods?.length > 0) {
      return { error: new Error('No se puede eliminar: la categoría tiene productos asociados.') }
    }

    const { error } = await supabase.from('categoria').delete().eq('id_categoria', id)
    if (error) { console.error('[VMA Admin] eliminarCategoria error:', error.message); return { error } }
    return { error: null }
  } catch (err) {
    return { error: err }
  }
}

/* ═══════════════════════════════════════════════
   REPORTES — lógica equivalente al módulo Python
═══════════════════════════════════════════════ */

export async function obtenerReporteProductosMasCotizados() {
  try {
    const { data: cotizaciones, error } = await supabase
      .from('cotizaciones')
      .select('productos_solicitados')

    if (error) return { data: null, error }

    // Procesar el JSONB de cada cotización (equivalente a analizador.py)
    const conteo = {}
    cotizaciones.forEach(c => {
      const productos = c.productos_solicitados || []
      productos.forEach(p => {
        const key = p.codigo || p.nombre
        if (!conteo[key]) conteo[key] = { nombre: p.nombre, codigo: p.codigo, total: 0 }
        conteo[key].total += (p.cantidad || 1)
      })
    })

    const ranking = Object.values(conteo)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)

    return { data: ranking, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function obtenerReporteStock() {
  try {
    const { data, error } = await supabase
      .from('producto')
      .select('id_producto, codigo, descripcion, stock, categoria(nombre_categoria)')
      .order('stock', { ascending: true })

    if (error) return { data: null, error }

    // Clasificar stock (equivalente a analizador.py)
    const clasificado = data.map(p => {
      const stock = parseInt(p.stock) || 0
      let estadoStock = 'suficiente'
      if (stock === 0)       estadoStock = 'sin_stock'
      else if (stock <= 5)   estadoStock = 'stock_bajo'
      else if (stock <= 20)  estadoStock = 'stock_medio'
      return { ...p, stockNum: stock, estadoStock }
    })

    return {
      data: {
        todos:      clasificado,
        sinStock:   clasificado.filter(p => p.estadoStock === 'sin_stock'),
        stockBajo:  clasificado.filter(p => p.estadoStock === 'stock_bajo'),
        stockMedio: clasificado.filter(p => p.estadoStock === 'stock_medio'),
        suficiente: clasificado.filter(p => p.estadoStock === 'suficiente'),
      },
      error: null
    }
  } catch (err) {
    return { data: null, error: err }
  }
}
