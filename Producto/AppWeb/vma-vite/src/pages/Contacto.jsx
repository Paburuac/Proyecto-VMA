export default function Contacto() {
  return (
    <>
      <div className="about-hero">
        <h1>Contáct<span>enos</span></h1>
        <p>Estamos disponibles para atenderte y resolver tus consultas.</p>
      </div>
      <div className="section" style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 2rem' }}>
        <div className="contacto-info">
          <h2 style={{ marginBottom: '1.5rem' }}>Información de contacto</h2>
          <p style={{ color: 'var(--gris-texto)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Contamos con dos sucursales para atenderte. WhatsApp compartido: <strong>+56 9 9689 3504</strong>
          </p>

          <h3 style={{ color: 'var(--azul)', margin: '1.5rem 0 1rem' }}>VMA Concón</h3>
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-text"><h4>Dirección</h4><p>Calle Doce 505, Esquina Santa Margarita<br />Concón, Región de Valparaíso</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-text"><h4>Teléfono</h4><p>32 281 7419<br />32 317 9583</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉</div>
            <div className="info-text"><h4>Correo</h4><p>ventas@vmaindustrial.cl</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">🕐</div>
            <div className="info-text"><h4>Horario</h4><p>Lunes – Martes: 09:00 – 18:00 hrs<br />Miércoles – Viernes: 09:00 – 17:00 hrs</p></div>
          </div>

          <h3 style={{ color: 'var(--azul)', margin: '2rem 0 1rem' }}>VMA San Felipe</h3>
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-text"><h4>Dirección</h4><p>Chacabuco 602, Esquina Navarro<br />San Felipe, Región de Valparaíso</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-text"><h4>Teléfono</h4><p>34 251 8634<br />34 253 5039</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉</div>
            <div className="info-text"><h4>Correo</h4><p>sanfelipe@vmaindustrial.cl</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon">🕐</div>
            <div className="info-text"><h4>Horario</h4><p>Lunes – Martes: 08:00 – 13:00 / 14:30 – 18:30 hrs<br />Miércoles – Viernes: 08:00 – 13:00 / 14:30 – 17:30 hrs</p></div>
          </div>
        </div>
      </div>
    </>
  )
}
