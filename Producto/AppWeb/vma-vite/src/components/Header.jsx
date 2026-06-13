import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Header({ onOpenCart }) {
  const { authState, isAdmin, isTrabajador, isCliente, handleLogout } = useAuth()
  const { totalItems } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function cerrarSesion() {
    await handleLogout()
    showToast('👋 Sesión cerrada correctamente.')
    navigate('/')
  }

  const { loggedIn, perfil, rol } = authState

  return (
    <header id="header">
      {/* Barra superior */}
      <div className="header-top">
        📞 +56 9 9689 3504 &nbsp;|&nbsp; ✉ contacto@vmaindustrial.cl &nbsp;|&nbsp; Lun–Vie 8:30–18:00
      </div>

      {/* Navbar principal */}
      <div className="header-main">
        {/* Logo */}
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo-vma.png" alt="VMA Retail Industrial" style={{ height: '48px', width: 'auto', display: 'block' }} />
        </div>

        {/* Links desktop */}
        <nav className="nav-links">
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</a>
          <a onClick={() => navigate('/nosotros')} style={{ cursor: 'pointer' }}>Quiénes somos</a>
          <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Nuestros productos</a>
          <a onClick={() => navigate('/contacto')} style={{ cursor: 'pointer' }}>Contáctenos</a>

          {/* Links según sesión */}
          {loggedIn ? (
            <>
              <span className="nav-user-nombre" style={{ color: 'var(--blanco)', padding: '8px 10px', fontSize: '0.85rem' }}>
                👤 {perfil?.nombre || perfil?.email}
              </span>
              {isAdmin() && (
                <a onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>⚙️ Panel Admin</a>
              )}
              {isTrabajador() && (
                <a onClick={() => navigate('/trabajador')} style={{ cursor: 'pointer' }}>📋 Mi Panel</a>
              )}
              {isCliente() && (
                <a onClick={() => navigate('/mis-cotizaciones')} className="btn-mis-cot" style={{ cursor: 'pointer', display: 'inline-block' }}>📋 Mis Cotizaciones</a>
              )}
              <a onClick={cerrarSesion} className="btn-login" style={{ cursor: 'pointer' }}>Cerrar sesión</a>
            </>
          ) : (
            <>
              <a onClick={() => navigate('/registro')} className="btn-registro" style={{ cursor: 'pointer' }}>Registrarse</a>
              <a onClick={() => navigate('/login')} className="btn-login" style={{ cursor: 'pointer' }}>Iniciar sesión</a>
            </>
          )}

          {/* Carrito */}
          <button className="cart-btn" onClick={onOpenCart} aria-label="Carrito">
            🛒
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </nav>

        {/* Hamburger móvil */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>

      {/* Menú móvil */}
      <nav className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <a onClick={() => { navigate('/'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Inicio</a>
        <a onClick={() => { navigate('/nosotros'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Quiénes somos</a>
        <a onClick={() => { navigate('/productos'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Nuestros productos</a>
        <a onClick={() => { navigate('/contacto'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Contáctenos</a>
        {loggedIn ? (
          <>
            {isAdmin() && <a onClick={() => { navigate('/admin'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>⚙️ Panel Admin</a>}
            {isTrabajador() && <a onClick={() => { navigate('/trabajador'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>📋 Mi Panel</a>}
            {isCliente() && <a onClick={() => { navigate('/mis-cotizaciones'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>📋 Mis Cotizaciones</a>}
            <a onClick={() => { cerrarSesion(); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Cerrar sesión</a>
          </>
        ) : (
          <>
            <a onClick={() => { navigate('/registro'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Registrarse</a>
            <a onClick={() => { navigate('/login'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Iniciar sesión</a>
          </>
        )}
      </nav>
    </header>
  )
}
