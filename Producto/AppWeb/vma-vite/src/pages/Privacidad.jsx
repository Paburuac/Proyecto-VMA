import { useNavigate } from 'react-router-dom'

export default function Privacidad() {
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
        {/* Header */}
        <div style={{
          background: 'var(--azul)',
          padding: '2rem 2.5rem',
        }}>
          <h1 style={{ color: 'var(--blanco)', fontSize: '1.6rem', margin: 0 }}>
            Política de <span style={{ color: 'var(--verde)' }}>Privacidad</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            Última actualización: junio de 2025
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem 2.5rem', color: 'var(--azul)', lineHeight: '1.8', fontSize: '0.95rem' }}>

          <p>
            VMA Retail Industrial SpA (en adelante, <strong>"VMA Industrial"</strong>), con domicilio en
            la Región de Valparaíso, Chile, es responsable del tratamiento de los datos personales
            recopilados a través del sitio web <strong>vmaindustrial.cl</strong>. La presente política
            se rige por la <strong>Ley N° 19.628</strong> sobre Protección de la Vida Privada de Chile.
          </p>

          <h2 style={h2Style}>1. Datos que recopilamos</h2>
          <p>Al usar nuestro sitio, podemos recopilar los siguientes datos personales:</p>
          <ul style={ulStyle}>
            <li><strong>Datos de registro:</strong> nombre completo, correo electrónico y teléfono.</li>
            <li><strong>Datos de cotización:</strong> nombre, empresa, correo, teléfono y descripción de la solicitud.</li>
            <li><strong>Datos de pago:</strong> procesados directamente por <strong>Transbank S.A.</strong> VMA Industrial no almacena datos de tarjetas de crédito o débito.</li>
            <li><strong>Datos de navegación:</strong> dirección IP y páginas visitadas, con fines estadísticos y de seguridad.</li>
          </ul>

          <h2 style={h2Style}>2. Finalidad del tratamiento</h2>
          <p>Los datos recopilados se utilizan exclusivamente para:</p>
          <ul style={ulStyle}>
            <li>Gestionar el registro y autenticación de usuarios en la plataforma.</li>
            <li>Procesar y responder solicitudes de cotización.</li>
            <li>Facilitar el pago de cotizaciones a través de Transbank Webpay Plus.</li>
            <li>Enviar comunicaciones relacionadas con la cotización solicitada.</li>
            <li>Mejorar la experiencia de uso del sitio web.</li>
          </ul>

          <h2 style={h2Style}>3. Comunicación de datos a terceros</h2>
          <p>
            VMA Industrial no vende ni cede datos personales a terceros con fines comerciales.
            Los datos pueden ser compartidos únicamente con:
          </p>
          <ul style={ulStyle}>
            <li><strong>Transbank S.A.:</strong> para el procesamiento seguro de pagos en línea.</li>
            <li><strong>Supabase Inc.:</strong> proveedor de base de datos e infraestructura en la nube, bajo acuerdos de confidencialidad.</li>
            <li>Autoridades competentes, cuando la ley así lo exija.</li>
          </ul>

          <h2 style={h2Style}>4. Seguridad de los datos</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger sus datos personales contra
            acceso no autorizado, pérdida o divulgación. Las contraseñas se almacenan de forma
            cifrada y las comunicaciones se realizan bajo protocolo HTTPS.
          </p>

          <h2 style={h2Style}>5. Derechos del titular</h2>
          <p>
            De acuerdo con la Ley N° 19.628, usted tiene derecho a <strong>acceder, rectificar,
            cancelar y oponerse</strong> al tratamiento de sus datos personales. Para ejercer estos
            derechos, escríbanos a:
          </p>
          <p style={{
            background: 'var(--gris-claro)',
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radio)',
            borderLeft: '4px solid var(--verde)',
            margin: '1rem 0',
          }}>
            ✉ <strong>contacto@vmaindustrial.cl</strong><br />
            📍 Región de Valparaíso, Chile
          </p>
          <p>Responderemos su solicitud dentro de un plazo no superior a <strong>15 días hábiles</strong>.</p>

          <h2 style={h2Style}>6. Cookies</h2>
          <p>
            El sitio puede utilizar cookies de sesión para mantener su estado de autenticación.
            No se usan cookies de rastreo publicitario de terceros.
          </p>

          <h2 style={h2Style}>7. Modificaciones a esta política</h2>
          <p>
            VMA Industrial se reserva el derecho de actualizar esta política cuando sea necesario.
            Cualquier cambio sustancial será comunicado mediante aviso en el sitio web.
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

const h2Style = {
  color: 'var(--azul)',
  fontSize: '1.05rem',
  fontWeight: 700,
  marginTop: '1.8rem',
  marginBottom: '0.5rem',
  borderBottom: '2px solid var(--verde)',
  paddingBottom: '0.3rem',
  display: 'inline-block',
}

const ulStyle = {
  paddingLeft: '1.4rem',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
}
