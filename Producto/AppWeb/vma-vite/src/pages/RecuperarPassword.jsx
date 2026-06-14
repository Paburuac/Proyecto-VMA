import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function RecuperarPassword() {
  const { handleSolicitarReset } = useAuth()

  const [correo, setCorreo] = useState('')
  const [correoError, setCorreoError] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setCorreo(e.target.value)
    setCorreoError('')
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValidEmail(correo)) {
      setCorreoError('Ingrese un correo válido.')
      return
    }

    setLoading(true)
    const { error: err } = await handleSolicitarReset(correo.trim())
    setLoading(false)

    if (err) {
      setError('No se pudo enviar el correo. Intenta nuevamente.')
      return
    }

    setEnviado(true)
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Recuperar <span>contraseña</span></h2>
          <p>Te enviaremos un enlace para restablecer tu contraseña</p>
        </div>

        <div className="form-body">
          {enviado ? (
            <div className="success-msg show">
              ✅ Revisa tu correo electrónico. Te hemos enviado un enlace para restablecer tu contraseña. Si no lo ves, revisa la carpeta de spam.
            </div>
          ) : (
            <>
              {error && (
                <div className="error-banner" style={{ display: 'block', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <label htmlFor="rec-correo">Correo electrónico</label>
                  <input
                    id="rec-correo"
                    name="correo"
                    type="email"
                    placeholder="correo@empresa.cl"
                    value={correo}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {correoError && <div className="form-error show">{correoError}</div>}
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Enviando...' : '📧 Enviar enlace'}
                </button>
              </form>
            </>
          )}

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.9rem', color: 'var(--gris-texto)' }}>
            <Link to="/login" style={{ color: 'var(--verde)', fontWeight: 600 }}>Volver al inicio de sesión</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
