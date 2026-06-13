import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <>
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src="/logo-vma.png" alt="VMA Retail Industrial" style={{ height: '40px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
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
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 VMA Industrial. Todos los derechos reservados.</span>
          <span> · <a onClick={() => navigate('/privacidad')} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}>Política de privacidad</a></span>
          <span> · Región de Valparaíso, Chile</span>
        </div>
      </footer>
      <div className="footer-verde-bar"></div>
    </>
  )
}
