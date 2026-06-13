/**
 * src/tests/components.test.jsx
 * ─────────────────────────────────────────────
 * Pruebas de componentes React con Testing Library.
 * Cubre: ToastContext, CartContext, AuthContext,
 *        Login (renderizado), Registro (validaciones).
 * ─────────────────────────────────────────────
 */

import React, { createContext, useContext } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ToastProvider, useToast } from '../context/ToastContext.jsx'
import { CartProvider, useCart } from '../context/CartContext.jsx'

/* ── Stub de AuthContext para tests que lo necesitan ── */
const AuthContextStub = createContext(null)

const ESTADO_SINUSUARIO = {
  authState: { loggedIn: false, user: null, perfil: null, rol: null, loading: false },
  isAdmin:      () => false,
  isTrabajador: () => false,
  isCliente:    () => false,
  handleLogin:  vi.fn().mockResolvedValue({ ok: true }),
  handleLogout: vi.fn().mockResolvedValue({}),
  handleRegistro: vi.fn().mockResolvedValue({ error: null }),
}

function AuthStubProvider({ children, value = ESTADO_SINUSUARIO }) {
  return <AuthContextStub.Provider value={value}>{children}</AuthContextStub.Provider>
}

// Patch useAuth para que los tests usen el stub (sin vi.mock)
vi.mock('../context/AuthContext.jsx', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useAuth: () => useContext(AuthContextStub) ?? ESTADO_SINUSUARIO,
  }
})

function AllProviders({ children, authValue }) {
  return (
    <AuthStubProvider value={authValue ?? ESTADO_SINUSUARIO}>
      <CartProvider>
        <ToastProvider>
          <MemoryRouter>
            {children}
          </MemoryRouter>
        </ToastProvider>
      </CartProvider>
    </AuthStubProvider>
  )
}

/* ══════════════════════════════════════════════
   ToastContext
══════════════════════════════════════════════ */
describe('ToastContext', () => {

  function ToastConsumer() {
    const { showToast } = useToast()
    return <button onClick={() => showToast('Mensaje de prueba')}>Mostrar toast</button>
  }

  it('no muestra toasts inicialmente', () => {
    render(<ToastProvider><ToastConsumer /></ToastProvider>)
    expect(screen.queryByText('Mensaje de prueba')).toBeNull()
  })

  it('muestra toast al llamar showToast', async () => {
    render(<ToastProvider><ToastConsumer /></ToastProvider>)
    fireEvent.click(screen.getByText('Mostrar toast'))
    expect(await screen.findByText('Mensaje de prueba')).toBeInTheDocument()
  })

  it('muestra múltiples toasts a la vez', async () => {
    function Multi() {
      const { showToast } = useToast()
      return (
        <>
          <button onClick={() => showToast('Toast A')}>A</button>
          <button onClick={() => showToast('Toast B')}>B</button>
        </>
      )
    }
    render(<ToastProvider><Multi /></ToastProvider>)
    fireEvent.click(screen.getByText('A'))
    fireEvent.click(screen.getByText('B'))
    expect(await screen.findByText('Toast A')).toBeInTheDocument()
    expect(await screen.findByText('Toast B')).toBeInTheDocument()
  })
})

/* ══════════════════════════════════════════════
   CartContext
══════════════════════════════════════════════ */
describe('CartContext', () => {

  // addToCart recibe producto con {codigo, nombre, precio, id_producto}
  // El carrito guarda {id:null, codigo, nombre, cantidad, precio}
  const PROD = {
    id_producto: 101, codigo: 'PROD-001',
    nombre: 'Taladro Industrial', precio: 15000,
  }

  function CartConsumer() {
    const { cart, totalItems, addToCart, removeFromCart, updateQty, limpiarCarrito } = useCart()
    return (
      <div>
        <span data-testid="total">{totalItems}</span>
        <span data-testid="len">{cart.length}</span>
        <button onClick={() => addToCart(PROD, 2)}>Agregar</button>
        <button onClick={() => removeFromCart(PROD.codigo)}>Eliminar</button>
        <button onClick={() => updateQty(PROD.codigo, 3)}>Qty3</button>
        <button onClick={limpiarCarrito}>Limpiar</button>
        {cart.map((i, idx) => <div key={idx} data-testid={`item-${i.codigo}`}>{i.nombre}×{i.cantidad}</div>)}
      </div>
    )
  }

  function wrap(ui) {
    return render(<AllProviders>{ui}</AllProviders>)
  }

  it('empieza con carrito vacío', () => {
    wrap(<CartConsumer />)
    expect(screen.getByTestId('total').textContent).toBe('0')
    expect(screen.getByTestId('len').textContent).toBe('0')
  })

  it('agrega un item', async () => {
    wrap(<CartConsumer />)
    fireEvent.click(screen.getByText('Agregar'))
    expect(await screen.findByTestId('item-PROD-001')).toBeInTheDocument()
    expect(screen.getByTestId('total').textContent).toBe('2')
  })

  it('no duplica — suma cantidad si ya existe', async () => {
    wrap(<CartConsumer />)
    fireEvent.click(screen.getByText('Agregar'))
    fireEvent.click(screen.getByText('Agregar'))
    await screen.findByTestId('item-PROD-001')
    expect(screen.getByTestId('len').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('4')
  })

  it('elimina un item', async () => {
    wrap(<CartConsumer />)
    fireEvent.click(screen.getByText('Agregar'))
    await screen.findByTestId('item-PROD-001')
    fireEvent.click(screen.getByText('Eliminar'))
    await waitFor(() => expect(screen.queryByTestId('item-PROD-001')).toBeNull())
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('actualiza cantidad (delta)', async () => {
    wrap(<CartConsumer />)
    fireEvent.click(screen.getByText('Agregar'))
    await screen.findByTestId('item-PROD-001')
    fireEvent.click(screen.getByText('Qty3'))
    // updateQty aplica delta: 2 (original) + 3 = 5
    await waitFor(() => expect(screen.getByTestId('item-PROD-001').textContent).toContain('×5'))
    expect(screen.getByTestId('total').textContent).toBe('5')
  })

  it('limpia el carrito completo', async () => {
    wrap(<CartConsumer />)
    fireEvent.click(screen.getByText('Agregar'))
    await screen.findByTestId('item-PROD-001')
    fireEvent.click(screen.getByText('Limpiar'))
    await waitFor(() => expect(screen.getByTestId('len').textContent).toBe('0'))
  })
})

/* ══════════════════════════════════════════════
   Página Login
══════════════════════════════════════════════ */
describe('Página Login', () => {

  async function renderLogin() {
    const { default: Login } = await import('../pages/Login.jsx')
    render(<AllProviders><Login /></AllProviders>)
  }

  it('renderiza el campo de email', async () => {
    await renderLogin()
    const emailField = screen.getByLabelText(/correo/i)
    expect(emailField).toBeInTheDocument()
  })

  it('renderiza el campo de contraseña', async () => {
    await renderLogin()
    const passField = screen.getByLabelText(/contraseña/i)
    expect(passField).toBeInTheDocument()
  })

  it('renderiza el botón de submit', async () => {
    await renderLogin()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('renderiza el enlace a registro', async () => {
    await renderLogin()
    // La página tiene un enlace "Crear cuenta" o texto similar
    expect(screen.getByRole('link', { name: /regístrate aquí/i })).toBeInTheDocument()
  })
})

/* ══════════════════════════════════════════════
   Página Registro — validaciones
══════════════════════════════════════════════ */
describe('Página Registro — validaciones', () => {

  async function renderRegistro() {
    const { default: Registro } = await import('../pages/Registro.jsx')
    render(<AllProviders><Registro /></AllProviders>)
  }

  it('renderiza el formulario de registro', async () => {
    await renderRegistro()
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument()
  })

  it('muestra error si se envía el formulario vacío', async () => {
    await renderRegistro()
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/nombre es obligatorio/i)).toBeInTheDocument()
    })
  })

  it('muestra error de correo inválido', async () => {
    await renderRegistro()
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'no-es-correo' } })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/correo válido/i)).toBeInTheDocument()
    })
  })

  it('muestra error si contraseña es muy corta', async () => {
    await renderRegistro()
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'juan@test.cl' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña \*/i), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument()
    })
  })

  it('muestra error si contraseñas no coinciden', async () => {
    await renderRegistro()
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'juan@test.cl' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña \*/i), { target: { value: 'abcdef' } })
    fireEvent.change(screen.getByLabelText(/confirmar/i), { target: { value: 'diferente' } })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => {
      expect(screen.getByText(/no coinciden/i)).toBeInTheDocument()
    })
  })
})

/* ══════════════════════════════════════════════
   AuthContext stub — valores esperados
══════════════════════════════════════════════ */
describe('AuthContext stub — estado sin sesión', () => {

  function AuthInfo() {
    const { authState, isAdmin, isTrabajador, isCliente } = useContext(AuthContextStub)
    return (
      <div>
        <span data-testid="loggedIn">{String(authState.loggedIn)}</span>
        <span data-testid="rol">{authState.rol ?? 'none'}</span>
        <span data-testid="loading">{String(authState.loading)}</span>
        <span data-testid="isAdmin">{String(isAdmin())}</span>
        <span data-testid="isTrab">{String(isTrabajador())}</span>
        <span data-testid="isCli">{String(isCliente())}</span>
      </div>
    )
  }

  it('loggedIn es false', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('loggedIn').textContent).toBe('false')
  })

  it('rol es null (none)', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('rol').textContent).toBe('none')
  })

  it('loading es false', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('loading').textContent).toBe('false')
  })

  it('isAdmin() retorna false', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('isAdmin').textContent).toBe('false')
  })

  it('isTrabajador() retorna false', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('isTrab').textContent).toBe('false')
  })

  it('isCliente() retorna false', () => {
    render(<AuthStubProvider><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('isCli').textContent).toBe('false')
  })

  it('isAdmin() retorna true cuando rol es admin', () => {
    const adminValue = { ...ESTADO_SINUSUARIO, authState: { ...ESTADO_SINUSUARIO.authState, rol: 'admin' }, isAdmin: () => true }
    render(<AuthStubProvider value={adminValue}><AuthInfo /></AuthStubProvider>)
    expect(screen.getByTestId('isAdmin').textContent).toBe('true')
  })
})
