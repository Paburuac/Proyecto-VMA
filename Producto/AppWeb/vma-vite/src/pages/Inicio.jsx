import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerCategorias } from '../services/categoriaService.js'

export default function Inicio() {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    obtenerCategorias().then(({ data }) => {
      if (data) setCategorias(data.slice(0, 9))
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge"></div>
          <h1>Tu proveedor industrial<br /><span>de confianza</span></h1>
          <p>Gases industriales, soldaduras, herramientas y equipos de seguridad para la industria chilena. Atención personalizada y stock garantizado.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/productos')}>Ver catálogo completo</button>
            <button className="btn-secondary" onClick={() => navigate('/cotizacion')}>Solicitar cotización</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">1.400+</div><div className="stat-label">Productos</div></div>
        <div className="stat-item"><div className="stat-num">9</div><div className="stat-label">Categorías</div></div>
        <div className="stat-item"><div className="stat-num">20+</div><div className="stat-label">Años de experiencia</div></div>
        <div className="stat-item"><div className="stat-num">500+</div><div className="stat-label">Clientes activos</div></div>
      </div>

      {/* Categorías */}
      {categorias.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Nuestras categorías</h2>
            <p>Encuentra todo lo que necesitas para tu industria</p>
            <div className="divider"></div>
          </div>
          <div className="cat-grid" id="cat-grid-inicio">
            {categorias.map(cat => (
              <div
                key={cat.id_categoria}
                className="cat-card"
                onClick={() => navigate('/productos')}
                style={{ cursor: 'pointer' }}
              >
                <div className="cat-icon">📦</div>
                <div className="cat-name">{cat.nombre_categoria}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Por qué elegirnos */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>¿Por qué elegirnos?</h2>
          <p>Más de dos décadas siendo el socio industrial de nuestros clientes</p>
          <div className="divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <div className="feature-text">
              <h3>Despacho a todo Chile</h3>
              <p>Red de distribución nacional con tiempos de entrega óptimos para mantener tu operación funcionando.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-text">
              <h3>Asesoría técnica especializada</h3>
              <p>Equipo profesional disponible para orientarte en la selección correcta de productos y soluciones.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <div className="feature-text">
              <h3>Atención a empresas</h3>
              <p>Planes de suministro periódico, facturación y condiciones especiales para clientes corporativos.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <div className="feature-text">
              <h3>Respuesta rápida</h3>
              <p>Cotizaciones en 24 horas hábiles y atención prioritaria para urgencias industriales.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">
              <h3>Seguridad garantizada</h3>
              <p>Todos nuestros productos cumplen normativas de seguridad industrial vigentes en Chile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2>¿Listo para cotizar?</h2>
        <p>Contáctanos hoy y obtén una propuesta personalizada para tu empresa.</p>
        <button className="btn-primary" onClick={() => navigate('/cotizacion')}>Cotizar ahora</button>
      </div>
    </>
  )
}
