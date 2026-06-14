export default function Contacto() {
  return (
    <>
      <div className="about-hero">
        <h1>Contáct<span>enos</span></h1>
        <p>Estamos disponibles para atenderte y resolver tus consultas.</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 2rem' }}>

        {/* Sucursales en grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>

          {/* Concón */}
          <div>
            <h3 style={{ color: 'var(--azul)', marginBottom: '1rem', fontSize: '1.15rem', fontWeight: 700 }}>
              📍 VMA Concón
            </h3>
            <div className="info-item">
              <div className="info-icon">🏠</div>
              <div className="info-text"><h4>Dirección</h4><p>Calle Doce 505, Esquina Santa Margarita<br />Concón, Región de Valparaíso</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text"><h4>Teléfono</h4><p>32 281 7419 / 32 317 9583</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉</div>
              <div className="info-text"><h4>Correo</h4><p>ventas@vmaindustrial.cl</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div className="info-text"><h4>Horario</h4><p>Lun–Mar: 09:00–18:00 · Mié–Vie: 09:00–17:00</p></div>
            </div>
            {/* Mapa Concón */}
            <div style={{ marginTop: '1rem', borderRadius: 'var(--radio)', overflow: 'hidden', boxShadow: 'var(--sombra)' }}>
              <iframe
                title="VMA Concón"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Calle+Doce+505+Concón+Chile"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* San Felipe */}
          <div>
            <h3 style={{ color: 'var(--azul)', marginBottom: '1rem', fontSize: '1.15rem', fontWeight: 700 }}>
              📍 VMA San Felipe
            </h3>
            <div className="info-item">
              <div className="info-icon">🏠</div>
              <div className="info-text"><h4>Dirección</h4><p>Chacabuco 602, Esquina Navarro<br />San Felipe, Región de Valparaíso</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text"><h4>Teléfono</h4><p>34 251 8634 / 34 253 5039</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉</div>
              <div className="info-text"><h4>Correo</h4><p>sanfelipe@vmaindustrial.cl</p></div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕐</div>
              <div className="info-text"><h4>Horario</h4><p>Lun–Mar: 08:00–13:00 / 14:30–18:30<br />Mié–Vie: 08:00–13:00 / 14:30–17:30</p></div>
            </div>
            {/* Mapa San Felipe */}
            <div style={{ marginTop: '1rem', borderRadius: 'var(--radio)', overflow: 'hidden', boxShadow: 'var(--sombra)' }}>
              <iframe
                title="VMA San Felipe"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Chacabuco+602+San+Felipe+Chile"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div style={{
          marginTop: '3rem',
          background: 'var(--azul)',
          borderRadius: 'var(--radio-lg)',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ color: 'var(--blanco)' }}>
            <strong style={{ fontSize: '1rem' }}>¿Necesitas ayuda inmediata?</strong>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Escríbenos por WhatsApp, respondemos rápido.</p>
          </div>
          <a
            href="https://wa.me/56996893504?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20sus%20productos."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#fff',
              borderRadius: 'var(--radio)',
              padding: '0.65rem 1.4rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            💬 WhatsApp +56 9 9689 3504
          </a>
        </div>
      </div>
    </>
  )
}
