import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <>
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src="/logo-vma.png" alt="VMA Retail Industrial" style={{ height: '44px', width: 'auto', display: 'block', borderRadius: '6px', padding: '4px 8px', background: 'var(--blanco)' }} />
            </div>
            <p>Proveedor líder de gases industriales, soldaduras, herramientas y equipos de seguridad en Chile. Más de 20 años al servicio de la industria.</p>
          </div>
          <div className="footer-col">
            <h4>Navegación</h4>
            <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Inicio</a>
            <a onClick={() => navigate('/nosotros')} style={{ cursor: 'pointer' }}>Quiénes somos</a>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Nuestros productos</a>
            <a onClick={() => navigate('/contacto')} style={{ cursor: 'pointer' }}>Contáctenos</a>
          </div>
          <div className="footer-col">
            <h4>Categorías</h4>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Gases Industriales</a>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Soldaduras</a>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Herramientas</a>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Accesorios</a>
            <a onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>Ver todo</a>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <a>📞 +56 9 9689 3504</a>
            <a>✉ contacto@vmaindustrial.cl</a>
            <a>📍 Concón y San Felipe, Chile</a>
            <a>🕐 Lun–Vie 8:30–18:00</a>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <a
                href="https://www.instagram.com/vmaindustrial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: 'var(--blanco)', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/vmaindustrial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: 'var(--blanco)', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VMA Industrial. Todos los derechos reservados.</span>
          <span style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a onClick={() => navigate('/privacidad')} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}>Política de privacidad</a>
            <a onClick={() => navigate('/terminos')} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}>Términos y condiciones</a>
          </span>
        </div>
      </footer>
      <div className="footer-verde-bar"></div>
    </>
  )
}
