import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '3rem 1rem',
      color: 'var(--azul)',
    }}>
      <div style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '1rem' }}>404</div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>Página no encontrada</h1>
      <p style={{ color: 'var(--gris-texto)', maxWidth: '380px', marginBottom: '2rem', lineHeight: 1.6 }}>
        La página que buscas no existe o fue movida. Puedes volver al inicio o explorar nuestro catálogo.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'var(--azul)',
            color: 'var(--blanco)',
            border: 'none',
            borderRadius: 'var(--radio)',
            padding: '0.7rem 1.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          ← Volver al inicio
        </button>
        <button
          onClick={() => navigate('/productos')}
          style={{
            background: 'var(--verde)',
            color: 'var(--blanco)',
            border: 'none',
            borderRadius: 'var(--radio)',
            padding: '0.7rem 1.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Ver catálogo
        </button>
      </div>
    </div>
  )
}
