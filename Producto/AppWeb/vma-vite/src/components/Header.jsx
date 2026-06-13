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
    <header className="header">
      {/* Barra superior */}
      <div className="topbar">
        <span>📞 +56 9 9689 3504</span>
        <span>✉️ contacto@vmaindustrial.cl</span>
        <span>Lun-Vie 8:30–18:00</span>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/logo-vma.png" alt="VMA Retail Industrial" style={{ height: '48px', width: 'auto', display: 'block' }} />
        </div>

        {/* Links desktop */}
        <div className="nav-links">
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</a>
          <a onClick={() => navigate('/nosotros')} style={{ cursor: 'pointer' }}>Quiénes somos</a>
          <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Nuestros productos</a>
          <a onClick={() => navigate('/contacto')} style={{ cursor: 'pointer' }}>Contáctenos</a>
        </div>

        {/* Acciones desktop */}
        <div className="nav-actions">
          {!loggedIn ? (
            <>
              <button className="btn-outline" id="nav-btn-registro" onClick={() => navigate('/registro')}>Registrarse</button>
              <button className="btn-primary" id="nav-btn-login" onClick={() => navigate('/login')}>Iniciar sesión</button>
            </>
          ) : (
            <div id="nav-user-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="nav-user-nombre">👤 {perfil?.nombre || perfil?.email}</span>
              <span className="nav-user-rol">{rol}</span>
              {isAdmin() && (
                <button className="btn-outline" id="nav-btn-admin" onClick={() => navigate('/admin')}>Panel Admin</button>
              )}
              {isTrabajador() && (
                <button className="btn-outline" id="nav-btn-trabajador" onClick={() => navigate('/trabajador')}>Mi Panel</button>
              )}
              {isCliente() && (
                <button className="btn-outline" id="nav-btn-mis-cot" onClick={() => navigate('/mis-cotizaciones')}>Mis Cotizaciones</button>
              )}
              <button className="btn-logout" id="btn-cerrar-sesion" onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
          )}

          {/* Botón carrito */}
          <button className="btn-cart" id="btn-cart" onClick={onOpenCart} aria-label="Carrito">
            🛒
            <span className="cart-badge" id="cart-count">{totalItems > 0 ? totalItems : ''}</span>
          </button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <a onClick={() => { navigate('/'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Inicio</a>
        <a onClick={() => { navigate('/nosotros'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Quiénes somos</a>
        <a onClick={() => { navigate('/productos'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Nuestros productos</a>
        <a onClick={() => { navigate('/contacto'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Contáctenos</a>
        {!loggedIn ? (
          <>
            <a id="nav-btn-registro-mob" onClick={() => { navigate('/registro'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Registrarse</a>
            <a id="nav-btn-login-mob" onClick={() => { navigate('/login'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Iniciar sesión</a>
          </>
        ) : (
          <div id="nav-user-info-mob">
            <span className="nav-user-nombre-mob">👤 {perfil?.nombre || perfil?.email} ({rol})</span>
            {isAdmin() && <a id="nav-btn-admin-mob" onClick={() => { navigate('/admin'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Panel Admin</a>}
            {isTrabajador() && <a id="nav-btn-trabajador-mob" onClick={() => { navigate('/trabajador'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Mi Panel</a>}
            {isCliente() && <a id="nav-btn-mis-cot-mob" onClick={() => { navigate('/mis-cotizaciones'); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Mis Cotizaciones</a>}
            <a id="btn-cerrar-sesion-mob" onClick={() => { cerrarSesion(); setMenuOpen(false) }} style={{ cursor: 'pointer' }}>Cerrar sesión</a>
          </div>
        )}
      </div>
    </header>
  )
}
