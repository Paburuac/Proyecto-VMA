/**
 * src/tests/productoService.test.js
 * ─────────────────────────────────────────────
 * Pruebas unitarias para productoService.js:
 *   - construirCatalogo (función pura — sin Supabase)
 *   - obtenerProductos
 *   - buscarProductos
 *   - obtenerCategorias
 * ─────────────────────────────────────────────
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { construirCatalogo, buscarProductos, obtenerProductos, obtenerCategorias } from '../services/productoService.js'
import { supabase } from '../services/supabase.js'

// ════════════════════════════════════════════════
// construirCatalogo — función pura, no necesita mock
// ════════════════════════════════════════════════
describe('construirCatalogo', () => {

  const productosEjemplo = [
    {
      id_producto:  1,
      codigo:       '001',
      descripcion:  'Taladro industrial',
      precio:       15000,
      distribuidor: 'Indura',
      stock:        10,
      imagen_url:   null,
      categoria:    { id_categoria: 1, nombre_categoria: 'Herramientas' },
    },
    {
      id_producto:  2,
      codigo:       '002',
      descripcion:  'Martillo',
      precio:       5000,
      distribuidor: null,
      stock:        0,
      imagen_url:   'https://ejemplo.com/martillo.jpg',
      categoria:    { id_categoria: 1, nombre_categoria: 'Herramientas' },
    },
    {
      id_producto:  3,
      codigo:       '003',
      descripcion:  'Casco de seguridad',
      precio:       null,
      distribuidor: null,
      stock:        5,
      imagen_url:   null,
      categoria:    { id_categoria: 2, nombre_categoria: 'Seguridad' },
    },
  ]

  it('agrupa productos por categoría', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    expect(catalogo).toHaveProperty('Herramientas')
    expect(catalogo).toHaveProperty('Seguridad')
  })

  it('crea subcategoría General dentro de cada categoría', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    expect(catalogo['Herramientas']).toHaveProperty('General')
    expect(catalogo['Seguridad']).toHaveProperty('General')
  })

  it('agrupa correctamente los productos de una misma categoría', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    expect(catalogo['Herramientas']['General']).toHaveLength(2)
  })

  it('retorna precio como string "Consultar" si precio es null', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    const casco = catalogo['Seguridad']['General'][0]
    expect(casco.precio).toBe('Consultar')
  })

  it('retorna precio como string numérico si precio tiene valor', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    const taladro = catalogo['Herramientas']['General'].find(p => p.codigo === '001')
    expect(taladro.precio).toBe('15000')
  })

  it('asigna "Sin Categoría" a productos sin categoría', () => {
    const sinCategoria = [{
      id_producto: 99,
      codigo: '099',
      descripcion: 'Producto sin cat',
      precio: null,
      distribuidor: null,
      stock: null,
      imagen_url: null,
      categoria: null,
    }]
    const catalogo = construirCatalogo(sinCategoria)
    expect(catalogo).toHaveProperty('Sin Categoría')
  })

  it('preserva imagen_url cuando existe', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    const martillo = catalogo['Herramientas']['General'].find(p => p.codigo === '002')
    expect(martillo.imagen_url).toBe('https://ejemplo.com/martillo.jpg')
  })

  it('asigna null a imagen_url cuando no existe', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    const taladro = catalogo['Herramientas']['General'].find(p => p.codigo === '001')
    expect(taladro.imagen_url).toBeNull()
  })

  it('retorna objeto vacío con array de productos vacío', () => {
    const catalogo = construirCatalogo([])
    expect(Object.keys(catalogo)).toHaveLength(0)
  })

  it('convierte codigo a string aunque sea número', () => {
    const prod = [{
      id_producto: 1, codigo: 123, descripcion: 'Test',
      precio: null, distribuidor: null, stock: null,
      imagen_url: null, categoria: { id_categoria: 1, nombre_categoria: 'Test' }
    }]
    const catalogo = construirCatalogo(prod)
    expect(typeof catalogo['Test']['General'][0].codigo).toBe('string')
  })

  it('usa descripcion como nombre del producto', () => {
    const catalogo = construirCatalogo(productosEjemplo)
    const taladro = catalogo['Herramientas']['General'].find(p => p.codigo === '001')
    expect(taladro.nombre).toBe('Taladro industrial')
  })
})

// ════════════════════════════════════════════════
// obtenerProductos — con mock de Supabase
// ════════════════════════════════════════════════
describe('obtenerProductos', () => {

  beforeEach(() => { vi.clearAllMocks() })

  it('retorna lista de productos cuando Supabase responde OK', async () => {
    const mockData = [{ id_producto: 1, descripcion: 'Producto A', categoria: { nombre_categoria: 'Cat A' } }]
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: mockData, error: null }),
    })

    const result = await obtenerProductos()
    expect(result.error).toBeNull()
    expect(result.data).toEqual(mockData)
  })

  it('retorna error cuando Supabase falla', async () => {
    const errorFalso = new Error('DB error')
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: null, error: errorFalso }),
    })

    const result = await obtenerProductos()
    expect(result.error).toBe(errorFalso)
    expect(result.data).toBeNull()
  })
})

// ════════════════════════════════════════════════
// buscarProductos
// ════════════════════════════════════════════════
describe('buscarProductos', () => {

  beforeEach(() => { vi.clearAllMocks() })

  it('llama a obtenerProductos si el texto está vacío', async () => {
    const mockData = [{ id_producto: 1 }]
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: mockData, error: null }),
    })

    const result = await buscarProductos('')
    expect(result.data).toEqual(mockData)
  })

  it('llama a obtenerProductos si el texto es solo espacios', async () => {
    const mockData = []
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: mockData, error: null }),
    })

    const result = await buscarProductos('   ')
    expect(result.error).toBeNull()
  })

  it('filtra productos con texto de búsqueda válido', async () => {
    // buscarProductos encadena .is().order().or() — el mock debe ser thenable
    const mockData = [{ id_producto: 2, descripcion: 'Taladro' }]
    const mockResult = { data: mockData, error: null }
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      or:     vi.fn().mockReturnThis(),
      ilike:  vi.fn().mockReturnThis(),
      order:  vi.fn().mockReturnThis(),
      then:   (resolve) => Promise.resolve(mockResult).then(resolve),
      catch:  (reject)  => Promise.resolve(mockResult).catch(reject),
    }
    supabase.from.mockReturnValue(mockChain)

    const result = await buscarProductos('taladro')
    expect(result.data).toEqual(mockData)
    expect(result.error).toBeNull()
  })

  it('retorna error si Supabase falla en búsqueda', async () => {
    const errorFalso = new Error('search error')
    const mockResult = { data: null, error: errorFalso }
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      is:     vi.fn().mockReturnThis(),
      or:     vi.fn().mockReturnThis(),
      ilike:  vi.fn().mockReturnThis(),
      order:  vi.fn().mockReturnThis(),
      then:   (resolve) => Promise.resolve(mockResult).then(resolve),
      catch:  (reject)  => Promise.resolve(mockResult).catch(reject),
    }
    supabase.from.mockReturnValue(mockChain)

    const result = await buscarProductos('martillo')
    expect(result.error).toBe(errorFalso)
  })
})

// ════════════════════════════════════════════════
// obtenerCategorias
// ════════════════════════════════════════════════
describe('obtenerCategorias', () => {

  beforeEach(() => { vi.clearAllMocks() })

  it('retorna categorías correctamente', async () => {
    const mockCats = [
      { id_categoria: 1, nombre_categoria: 'Herramientas' },
      { id_categoria: 2, nombre_categoria: 'Seguridad' },
    ]
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: mockCats, error: null }),
    })

    const result = await obtenerCategorias()
    expect(result.data).toHaveLength(2)
    expect(result.error).toBeNull()
  })

  it('retorna error si Supabase falla', async () => {
    const errorFalso = new Error('cat error')
    supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order:  vi.fn().mockResolvedValue({ data: null, error: errorFalso }),
    })

    const result = await obtenerCategorias()
    expect(result.error).toBe(errorFalso)
  })
})
