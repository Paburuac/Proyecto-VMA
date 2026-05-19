/**
 * src/tests/setup.js
 * ─────────────────────────────────────────────
 * Configuración global para todas las pruebas Vitest.
 * Se ejecuta antes de cada archivo de test.
 * ─────────────────────────────────────────────
 */

import { vi } from 'vitest'

// ── Mock global de Supabase ──────────────────
// Evita que los tests hagan llamadas reales a la BD
vi.mock('../services/supabase.js', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq:     vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      order:  vi.fn().mockResolvedValue({ data: [], error: null }),
      or:     vi.fn().mockResolvedValue({ data: [], error: null }),
      ilike:  vi.fn().mockReturnThis(),
    })),
    auth: {
      signInWithPassword: vi.fn(),
      signOut:            vi.fn(),
      signUp:             vi.fn(),
      getSession:         vi.fn(),
      onAuthStateChange:  vi.fn(),
    },
    storage: {
      from: vi.fn(() => ({
        upload:       vi.fn(),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: 'https://ejemplo.com/img.jpg' } })),
        remove:       vi.fn(),
      })),
    },
  },
}))

// ── Variables globales del navegador ─────────
global.window = global.window || {}
global.window.authState = {
  loggedIn: false,
  user:     null,
  perfil:   null,
  rol:      null,
}
global.window.isAdmin      = () => global.window.authState.rol === 'admin'
global.window.isTrabajador = () => global.window.authState.rol === 'trabajador'
global.window.isCliente    = () => global.window.authState.rol === 'cliente'
global.window.showToast    = vi.fn()
global.window.showPage     = vi.fn()
global.window._navegarA    = vi.fn()
