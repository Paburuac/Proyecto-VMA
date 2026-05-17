/**
 * src/tests/carritoService.test.js
 * ─────────────────────────────────────────────
 * Pruebas unitarias para carritoService.js:
 *   - agregarItem (nuevo item / item existente)
 *   - actualizarCantidad (positivo / cero / negativo)
 *   - eliminarItem
 *   - vaciarCarrito
 *   - fusionarCarrito
 * ─────────────────────────────────────────────
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as carritoService from '../services/carritoService.js'
import { supabase } from '../services/supabase.js'

describe('carritoService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ════════════════════════════════════════════
  // agregarItem
  // ════════════════════════════════════════════
  describe('agregarItem', () => {

    it('inserta un nuevo item cuando no existe en el carrito', async () => {
      // El .single() simula que no existe el item
      supabase.from.mockReturnValue({
        select:  vi.fn().mockReturnThis(),
        eq:      vi.fn().mockReturnThis(),
        single:  vi.fn().mockResolvedValue({ data: null, error: null }),
        insert:  vi.fn().mockResolvedValue({ error: null }),
        update:  vi.fn().mockReturnThis(),
      })

      const result = await carritoService.agregarItem(1, 101, 2)
      expect(result.error).toBeNull()
    })

    it('actualiza cantidad cuando el item ya existe', async () => {
      const updateMock = vi.fn().mockReturnThis()
      const eqMock     = vi.fn().mockResolvedValue({ error: null })

      supabase.from.mockReturnValue({
        select:  vi.fn().mockReturnThis(),
        eq:      vi.fn().mockReturnThis(),
        single:  vi.fn().mockResolvedValue({ data: { id: 5, cantidad: 3 }, error: null }),
        update:  vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.agregarItem(1, 101, 2)
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla al insertar', async () => {
      const errorFalso = new Error('insert failed')
      supabase.from.mockReturnValue({
        select:  vi.fn().mockReturnThis(),
        eq:      vi.fn().mockReturnThis(),
        single:  vi.fn().mockResolvedValue({ data: null, error: null }),
        insert:  vi.fn().mockResolvedValue({ error: errorFalso }),
      })

      const result = await carritoService.agregarItem(1, 999, 1)
      expect(result.error).toBe(errorFalso)
    })
  })

  // ════════════════════════════════════════════
  // actualizarCantidad
  // ════════════════════════════════════════════
  describe('actualizarCantidad', () => {

    it('actualiza la cantidad correctamente con valor positivo', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        update: vi.fn(() => ({ eq: eqMock })),
        delete: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.actualizarCantidad(5, 3)
      expect(result.error).toBeNull()
    })

    it('elimina el item cuando la nueva cantidad es 0', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
        update: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.actualizarCantidad(5, 0)
      expect(result.error).toBeNull()
    })

    it('elimina el item cuando la nueva cantidad es negativa', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
        update: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.actualizarCantidad(5, -1)
      expect(result.error).toBeNull()
    })
  })

  // ════════════════════════════════════════════
  // eliminarItem
  // ════════════════════════════════════════════
  describe('eliminarItem', () => {

    it('elimina un item correctamente', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.eliminarItem(10)
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla al eliminar', async () => {
      const errorFalso = new Error('delete failed')
      const eqMock = vi.fn().mockResolvedValue({ error: errorFalso })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.eliminarItem(10)
      expect(result.error).toBe(errorFalso)
    })
  })

  // ════════════════════════════════════════════
  // vaciarCarrito
  // ════════════════════════════════════════════
  describe('vaciarCarrito', () => {

    it('vacía el carrito de un usuario correctamente', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.vaciarCarrito(1)
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla al vaciar', async () => {
      const errorFalso = new Error('vaciar failed')
      const eqMock = vi.fn().mockResolvedValue({ error: errorFalso })
      supabase.from.mockReturnValue({
        delete: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await carritoService.vaciarCarrito(1)
      expect(result.error).toBe(errorFalso)
    })
  })

  // ════════════════════════════════════════════
  // fusionarCarrito
  // ════════════════════════════════════════════
  describe('fusionarCarrito', () => {

    it('retorna sin error si itemsEnMemoria está vacío', async () => {
      const result = await carritoService.fusionarCarrito(1, [])
      expect(result.error).toBeNull()
    })

    it('retorna sin error si itemsEnMemoria es null', async () => {
      const result = await carritoService.fusionarCarrito(1, null)
      expect(result.error).toBeNull()
    })

    it('llama a agregarItem por cada item en memoria', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        select:  vi.fn().mockReturnThis(),
        eq:      vi.fn().mockReturnThis(),
        single:  vi.fn().mockResolvedValue({ data: null, error: null }),
        insert:  vi.fn().mockResolvedValue({ error: null }),
      })

      const items = [
        { producto_id: 101, cantidad: 2 },
        { producto_id: 102, cantidad: 1 },
        { producto_id: 103, cantidad: 3 },
      ]

      const result = await carritoService.fusionarCarrito(1, items)
      expect(result.error).toBeNull()
      // Supabase.from debe haberse llamado al menos una vez por item
      expect(supabase.from).toHaveBeenCalledWith('carrito_items')
    })
  })
})
