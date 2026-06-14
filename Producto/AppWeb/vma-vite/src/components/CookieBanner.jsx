import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('vma_cookies_ok')) setVisible(true)
  }, [])

  function aceptar() {
    localStorage.setItem('vma_cookies_ok', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: 'var(--azul)',
      color: 'var(--blanco)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      boxShadow: '0 -4px 16px rgba(0,0,0,0.2)',
      fontSize: '0.88rem',
      lineHeight: 1.5,
    }}>
      <p style={{ margin: 0, flex: 1, minWidth: '200px' }}>
        🍪 Usamos cookies de sesión para mantener tu inicio de sesión.
        No usamos cookies publicitarias. Ver nuestra{' '}
        <span
          onClick={() => navigate('/privacidad')}
          style={{ color: 'var(--verde)', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
        >
          Política de privacidad
        </span>.
      </p>
      <button
        onClick={aceptar}
        style={{
          background: 'var(--verde)',
          color: 'var(--blanco)',
          border: 'none',
          borderRadius: 'var(--radio)',
          padding: '0.5rem 1.4rem',
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontSize: '0.88rem',
        }}
      >
        Entendido
      </button>
    </div>
  )
}
