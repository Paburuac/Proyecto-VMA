/**
 * src/tests/cotizacionService.test.js
 * ─────────────────────────────────────────────
 * Pruebas unitarias para cotizacionService.js:
 *   - enviarCotizacion
 *   - obtenerMisCotizaciones
 *   - actualizarEstado
 * ─────────────────────────────────────────────
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { enviarCotizacion, obtenerMisCotizaciones, actualizarEstado } from '../services/cotizacionService.js'
import { supabase } from '../services/supabase.js'

const datosCotizacionValidos = {
  nombre:   'Juan Pérez',
  empresa:  'Empresa SA',
  email:    'juan@empresa.cl',
  telefono: '+56912345678',
  mensaje:  'Necesito cotización de productos',
  productos_solicitados: [
    { codigo: '001', nombre: 'Taladro', cantidad: 2, precio: '15000' }
  ],
}

describe('cotizacionService', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    // Estado por defecto: no logueado
    global.window.authState = { loggedIn: false, perfil: null }
  })

  // ════════════════════════════════════════════
  // enviarCotizacion
  // ════════════════════════════════════════════
  describe('enviarCotizacion', () => {

    it('envía cotización correctamente como visitante', async () => {
      supabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
      })

      const result = await enviarCotizacion(datosCotizacionValidos)
      expect(result.error).toBeNull()
      expect(result.data.id).toBe(1)
    })

    it('envía cotización con usuario_id si el usuario está logueado', async () => {
      global.window.authState = {
        loggedIn: true,
        perfil:   { id: 42, nombre: 'Admin', email: 'admin@vma.cl' },
      }

      let payloadInsertado = null
      supabase.from.mockReturnValue({
        insert: vi.fn((payload) => { payloadInsertado = payload; return { select: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: { id: 2 }, error: null }) } }),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: { id: 2 }, error: null }),
      })

      const result = await enviarCotizacion(datosCotizacionValidos)
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla al insertar', async () => {
      const errorFalso = new Error('insert error')
      supabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: errorFalso }),
      })

      const result = await enviarCotizacion(datosCotizacionValidos)
      expect(result.error).toBe(errorFalso)
      expect(result.data).toBeNull()
    })

    it('asigna estado "pendiente" por defecto', async () => {
      let payloadCapturado = null
      supabase.from.mockReturnValue({
        insert: vi.fn((p) => {
          payloadCapturado = p
          return {
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: { id: 3 }, error: null }),
          }
        }),
      })

      await enviarCotizacion(datosCotizacionValidos)
      expect(payloadCapturado?.estado).toBe('pendiente')
    })

    it('incluye productos_solicitados en el payload', async () => {
      let payloadCapturado = null
      supabase.from.mockReturnValue({
        insert: vi.fn((p) => {
          payloadCapturado = p
          return {
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: { id: 4 }, error: null }),
          }
        }),
      })

      await enviarCotizacion(datosCotizacionValidos)
      expect(payloadCapturado?.productos_solicitados).toHaveLength(1)
    })

    it('convierte email a lowercase', async () => {
      let payloadCapturado = null
      supabase.from.mockReturnValue({
        insert: vi.fn((p) => {
          payloadCapturado = p
          return {
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: { id: 5 }, error: null }),
          }
        }),
      })

      await enviarCotizacion({ ...datosCotizacionValidos, email: 'JUAN@EMPRESA.CL' })
      expect(payloadCapturado?.email).toBe('juan@empresa.cl')
    })
  })

  // ════════════════════════════════════════════
  // obtenerMisCotizaciones
  // ════════════════════════════════════════════
  describe('obtenerMisCotizaciones', () => {

    it('retorna array vacío si el usuario no está logueado', async () => {
      global.window.authState = { loggedIn: false, perfil: null }
      const result = await obtenerMisCotizaciones()
      expect(result.data).toEqual([])
      expect(result.error).toBeNull()
    })

    it('retorna cotizaciones del usuario logueado', async () => {
      global.window.authState = { loggedIn: true, perfil: { id: 10 } }
      const mockData = [
        { id: 1, nombre: 'Juan', estado: 'pendiente' },
        { id: 2, nombre: 'Juan', estado: 'respondida' },
      ]
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq:     vi.fn().mockReturnThis(),
        order:  vi.fn().mockResolvedValue({ data: mockData, error: null }),
      })

      const result = await obtenerMisCotizaciones()
      expect(result.data).toHaveLength(2)
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla', async () => {
      global.window.authState = { loggedIn: true, perfil: { id: 10 } }
      const errorFalso = new Error('query error')
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq:     vi.fn().mockReturnThis(),
        order:  vi.fn().mockResolvedValue({ data: null, error: errorFalso }),
      })

      const result = await obtenerMisCotizaciones()
      expect(result.error).toBe(errorFalso)
    })
  })

  // ════════════════════════════════════════════
  // actualizarEstado
  // ════════════════════════════════════════════
  describe('actualizarEstado', () => {

    it('actualiza estado a "revisada" correctamente', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        update: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await actualizarEstado(1, 'revisada')
      expect(result.error).toBeNull()
    })

    it('actualiza estado a "respondida" correctamente', async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null })
      supabase.from.mockReturnValue({
        update: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await actualizarEstado(1, 'respondida')
      expect(result.error).toBeNull()
    })

    it('retorna error si Supabase falla al actualizar estado', async () => {
      const errorFalso = new Error('update error')
      const eqMock = vi.fn().mockResolvedValue({ error: errorFalso })
      supabase.from.mockReturnValue({
        update: vi.fn(() => ({ eq: eqMock })),
      })

      const result = await actualizarEstado(1, 'revisada')
      expect(result.error).toBe(errorFalso)
    })
  })
})
