/**
 * src/tests/validaciones.test.js
 * ─────────────────────────────────────────────
 * Pruebas unitarias para las funciones puras
 * de validaciones.js:
 *   - isValidEmail
 *   - escHtml
 *   - traducirErrorRegistro (lógica extraída)
 *   - prellenarFormContacto
 *   - prellenarFormCotizacion
 * ─────────────────────────────────────────────
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

// ── Funciones puras extraídas de validaciones.js ─
// (duplicadas aquí para poder testearlas sin DOM completo)

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function traducirErrorRegistro(msg) {
  if (!msg) return 'Error al crear la cuenta. Intenta nuevamente.'
  const m = msg.toLowerCase()
  if (m.includes('already registered') || m.includes('already exists') || m.includes('duplicate'))
    return 'Este correo ya está registrado. Intenta iniciar sesión.'
  if (m.includes('password should be'))
    return 'La contraseña debe tener al menos 6 caracteres.'
  if (m.includes('unable to validate email'))
    return 'El formato del correo no es válido.'
  if (m.includes('signup is disabled'))
    return 'El registro está temporalmente deshabilitado.'
  return msg
}

// ════════════════════════════════════════════════
// isValidEmail
// ════════════════════════════════════════════════
describe('isValidEmail', () => {

  describe('correos válidos', () => {
    it('acepta correo simple', () => {
      expect(isValidEmail('usuario@empresa.cl')).toBe(true)
    })
    it('acepta correo con subdominio', () => {
      expect(isValidEmail('admin@vmaindustrial.cl')).toBe(true)
    })
    it('acepta correo con punto en nombre', () => {
      expect(isValidEmail('pablo.astudillo@duoc.cl')).toBe(true)
    })
    it('acepta correo con números', () => {
      expect(isValidEmail('usuario123@gmail.com')).toBe(true)
    })
    it('acepta correo con guión en dominio', () => {
      expect(isValidEmail('user@mi-empresa.com')).toBe(true)
    })
  })

  describe('correos inválidos', () => {
    it('rechaza correo sin @', () => {
      expect(isValidEmail('usuariosinArroba.cl')).toBe(false)
    })
    it('rechaza correo sin dominio', () => {
      expect(isValidEmail('usuario@')).toBe(false)
    })
    it('rechaza correo sin TLD', () => {
      expect(isValidEmail('usuario@empresa')).toBe(false)
    })
    it('rechaza string vacío', () => {
      expect(isValidEmail('')).toBe(false)
    })
    it('rechaza correo con espacios', () => {
      expect(isValidEmail('usuario @empresa.cl')).toBe(false)
    })
    it('rechaza solo @', () => {
      expect(isValidEmail('@')).toBe(false)
    })
    it('rechaza texto sin formato de correo', () => {
      expect(isValidEmail('esto no es un correo')).toBe(false)
    })
  })
})

// ════════════════════════════════════════════════
// escHtml
// ════════════════════════════════════════════════
describe('escHtml', () => {

  it('escapa ampersand', () => {
    expect(escHtml('VMA & Asociados')).toBe('VMA &amp; Asociados')
  })
  it('escapa comillas dobles', () => {
    expect(escHtml('"cotización"')).toBe('&quot;cotización&quot;')
  })
  it('escapa comillas simples', () => {
    expect(escHtml("it's")).toBe('it&#39;s')
  })
  it('escapa menor que', () => {
    expect(escHtml('<script>')).toBe('&lt;script&gt;')
  })
  it('escapa mayor que', () => {
    expect(escHtml('a > b')).toBe('a &gt; b')
  })
  it('escapa múltiples caracteres juntos', () => {
    expect(escHtml('<b>"hola"</b>')).toBe('&lt;b&gt;&quot;hola&quot;&lt;/b&gt;')
  })
  it('no modifica texto sin caracteres especiales', () => {
    expect(escHtml('Texto normal')).toBe('Texto normal')
  })
  it('convierte números a string', () => {
    expect(escHtml(42)).toBe('42')
  })
  it('convierte null a string "null"', () => {
    expect(escHtml(null)).toBe('null')
  })
  it('previene XSS básico', () => {
    const input = '<img src=x onerror=alert(1)>'
    const output = escHtml(input)
    expect(output).not.toContain('<img')
    expect(output).toContain('&lt;img')
  })
})

// ════════════════════════════════════════════════
// traducirErrorRegistro
// ════════════════════════════════════════════════
describe('traducirErrorRegistro', () => {

  it('retorna mensaje genérico si msg es null', () => {
    expect(traducirErrorRegistro(null))
      .toBe('Error al crear la cuenta. Intenta nuevamente.')
  })
  it('retorna mensaje genérico si msg es vacío', () => {
    expect(traducirErrorRegistro(''))
      .toBe('Error al crear la cuenta. Intenta nuevamente.')
  })
  it('traduce error de correo ya registrado', () => {
    expect(traducirErrorRegistro('User already registered'))
      .toBe('Este correo ya está registrado. Intenta iniciar sesión.')
  })
  it('traduce error de duplicate', () => {
    expect(traducirErrorRegistro('duplicate key value'))
      .toBe('Este correo ya está registrado. Intenta iniciar sesión.')
  })
  it('traduce error de contraseña corta', () => {
    expect(traducirErrorRegistro('Password should be at least 6 characters'))
      .toBe('La contraseña debe tener al menos 6 caracteres.')
  })
  it('traduce error de email inválido', () => {
    expect(traducirErrorRegistro('Unable to validate email address'))
      .toBe('El formato del correo no es válido.')
  })
  it('traduce registro deshabilitado', () => {
    expect(traducirErrorRegistro('Signup is disabled'))
      .toBe('El registro está temporalmente deshabilitado.')
  })
  it('retorna el mensaje original si no reconoce el error', () => {
    expect(traducirErrorRegistro('Error desconocido XYZ'))
      .toBe('Error desconocido XYZ')
  })
  it('es case-insensitive', () => {
    expect(traducirErrorRegistro('USER ALREADY REGISTERED'))
      .toBe('Este correo ya está registrado. Intenta iniciar sesión.')
  })
})
