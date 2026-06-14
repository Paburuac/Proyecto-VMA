import { useNavigate } from 'react-router-dom'

export default function Terminos() {
  const navigate = useNavigate()

  return (
    <div style={{ background: 'var(--gris-claro)', minHeight: '80vh', padding: '3rem 1rem' }}>
      <div style={{
        maxWidth: '820px',
        margin: '0 auto',
        background: 'var(--blanco)',
        borderRadius: 'var(--radio-lg)',
        boxShadow: 'var(--sombra)',
        overflow: 'hidden',
      }}>
        <div style={{ background: 'var(--azul)', padding: '2rem 2.5rem' }}>
          <h1 style={{ color: 'var(--blanco)', fontSize: '1.6rem', margin: 0 }}>
            Términos y <span style={{ color: 'var(--verde)' }}>Condiciones</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            Última actualización: junio de 2025
          </p>
        </div>

        <div style={{ padding: '2rem 2.5rem', color: 'var(--azul)', lineHeight: '1.8', fontSize: '0.95rem' }}>

          <p>
            Los presentes términos y condiciones regulan el uso del sitio web <strong>vmaindustrial.cl</strong>,
            operado por <strong>VMA Retail Industrial SpA</strong>, RUT 77.XXX.XXX-X, con domicilio en
            la Región de Valparaíso, Chile.
          </p>

          <h2 style={h2}>1. Uso del sitio</h2>
          <p>
            El acceso y uso de este sitio implica la aceptación de estos términos. El sitio está destinado
            a personas naturales o jurídicas interesadas en adquirir productos industriales. Queda
            prohibido el uso del sitio para fines ilícitos o que contravengan la legislación chilena.
          </p>

          <h2 style={h2}>2. Cotizaciones</h2>
          <p>
            Las solicitudes de cotización enviadas a través del sitio son <strong>no vinculantes</strong> hasta
            que VMA Industrial emita una cotización formal aceptada por ambas partes. Los precios
            indicados en el catálogo son referenciales y pueden variar sin previo aviso.
          </p>

          <h2 style={h2}>3. Pagos en línea</h2>
          <p>
            Los pagos se procesan a través de <strong>Transbank Webpay Plus</strong>, plataforma certificada
            por la industria financiera chilena. VMA Industrial no almacena datos de tarjetas de
            crédito o débito. El comprobante de pago es emitido directamente por Transbank.
          </p>

          <h2 style={h2}>4. Despacho y retiro</h2>
          <p>
            Los productos pueden ser retirados en nuestras sucursales de <strong>Concón</strong> y{' '}
            <strong>San Felipe</strong>. Las condiciones de despacho a domicilio se coordinan directamente
            con el cliente según disponibilidad y ubicación.
          </p>

          <h2 style={h2}>5. Garantías y devoluciones</h2>
          <p>
            Los productos cuentan con garantía legal conforme a la <strong>Ley N° 19.496</strong> de
            Protección al Consumidor. Para hacer efectiva una garantía o solicitar una devolución,
            contactar a <strong>ventas@vmaindustrial.cl</strong> dentro de los plazos legales.
          </p>

          <h2 style={h2}>6. Propiedad intelectual</h2>
          <p>
            Los contenidos del sitio (textos, imágenes, logotipo, diseño) son propiedad de
            VMA Retail Industrial SpA y están protegidos por la Ley N° 17.336 de Propiedad Intelectual.
            Queda prohibida su reproducción sin autorización escrita.
          </p>

          <h2 style={h2}>7. Limitación de responsabilidad</h2>
          <p>
            VMA Industrial no se hace responsable por interrupciones del servicio, errores de
            conectividad o daños derivados del uso del sitio fuera de su control. La información
            del catálogo es de carácter referencial.
          </p>

          <h2 style={h2}>8. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia
            será sometida a los tribunales ordinarios de justicia de la ciudad de Valparaíso.
          </p>

          <h2 style={h2}>9. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos:
          </p>
          <p style={{
            background: 'var(--gris-claro)',
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radio)',
            borderLeft: '4px solid var(--verde)',
          }}>
            ✉ <strong>contacto@vmaindustrial.cl</strong><br />
            📞 +56 9 9689 3504
          </p>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gris-borde)', textAlign: 'center' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'var(--verde)',
                color: 'var(--blanco)',
                border: 'none',
                borderRadius: 'var(--radio)',
                padding: '0.7rem 2rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const h2 = {
  color: 'var(--azul)',
  fontSize: '1.05rem',
  fontWeight: 700,
  marginTop: '1.8rem',
  marginBottom: '0.5rem',
  borderBottom: '2px solid var(--verde)',
  paddingBottom: '0.3rem',
  display: 'inline-block',
}
