import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Login() {
  const { handleLogin, isAdmin, isTrabajador } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ correo: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
    if (loginError) setLoginError('')
  }

  function validar() {
    const errs = {}
    if (!isValidEmail(form.correo)) errs.correo = 'Ingrese un correo válido.'
    if (!form.password) errs.password = 'Ingrese su contraseña.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setLoginError('')

    const { ok, mensaje } = await handleLogin(form.correo.trim(), form.password)

    setLoading(false)

    if (!ok) {
      setLoginError(mensaje)
      return
    }

    showToast(`✅ Bienvenido`)
    if (isAdmin()) navigate('/')
    else if (isTrabajador()) navigate('/trabajador')
    else navigate('/')
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Iniciar <span>sesión</span></h2>
          <p>Ingresa con tu cuenta VMA Industrial</p>
        </div>

        <div className="form-body">
          {loginError && (
            <div className="error-banner" style={{ display: 'block', marginBottom: '1rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="login-correo">Correo electrónico</label>
              <input
                id="login-correo"
                name="correo"
                type="email"
                placeholder="correo@empresa.cl"
                value={form.correo}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.correo && <div className="form-error show">{errors.correo}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="login-pass">Contraseña</label>
              <input
                id="login-pass"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && <div className="form-error show">{errors.password}</div>}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Ingresando...' : '🔐 Ingresar'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.9rem', color: 'var(--gris-texto)' }}>
            ¿No tienes cuenta? <Link to="/registro" style={{ color: 'var(--verde)', fontWeight: 600 }}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
