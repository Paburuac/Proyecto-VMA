export default function Nosotros() {
  return (
    <>
      <div className="about-hero">
        <h1>Quiénes <span>somos</span></h1>
        <p>Más de 20 años siendo el puente entre la industria chilena y las mejores soluciones en gases, soldadura y seguridad.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Nuestra historia</h2>
          <p>VMA Industrial nació con la misión de proveer soluciones industriales de calidad a empresas de todos los sectores. Como agente autorizado Indura, ofrecemos el respaldo de la marca líder en gases industriales de Chile.</p>
          <p>A lo largo de los años hemos construido relaciones sólidas con nuestros clientes, entendiéndolos no solo como compradores sino como socios estratégicos cuya continuidad operacional depende de nuestro servicio.</p>
          <p>Nuestro catálogo abarca más de 1.400 productos en categorías que van desde gases industriales y medicinales hasta equipos de soldadura, herramientas, elementos de protección personal y servicios especializados.</p>
          <a href="#/contacto"><button className="btn-primary" style={{ marginTop: '1rem' }}>Contáctanos</button></a>
        </div>
        <div className="about-img-placeholder">🏭</div>
      </div>

      <section className="section section-alt">
        <div className="section-header">
          <h2>Nuestros valores</h2>
          <div className="divider"></div>
        </div>
        <div className="values-grid">
          <div className="value-card"><div className="v-icon">🎯</div><h3>Compromiso</h3><p>Nos comprometemos con la satisfacción de cada cliente, respondiendo con prontitud y responsabilidad.</p></div>
          <div className="value-card"><div className="v-icon">✅</div><h3>Calidad</h3><p>Solo trabajamos con productos certificados que cumplen los más altos estándares de la industria.</p></div>
          <div className="value-card"><div className="v-icon">🤝</div><h3>Confianza</h3><p>Relaciones a largo plazo basadas en la transparencia y la honestidad en cada transacción.</p></div>
          <div className="value-card"><div className="v-icon">💡</div><h3>Innovación</h3><p>Actualizamos continuamente nuestro catálogo para ofrecer las últimas soluciones del mercado.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Nuestro equipo</h2>
          <p>Profesionales comprometidos con tu industria</p>
          <div className="divider"></div>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo">👨‍💼</div>
            <div className="team-info"><h3>Gerente General</h3><div className="role">Dirección Ejecutiva</div></div>
          </div>
          <div className="team-card">
            <div className="team-photo">👩‍💼</div>
            <div className="team-info"><h3>Jefa Comercial</h3><div className="role">Ventas y Relaciones Comerciales</div></div>
          </div>
          <div className="team-card">
            <div className="team-photo">👨‍🔧</div>
            <div className="team-info"><h3>Jefe Técnico</h3><div className="role">Asesoría Técnica y Soporte</div></div>
          </div>
        </div>
      </section>
    </>
  )
}
