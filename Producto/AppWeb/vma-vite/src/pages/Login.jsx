import { useState } from 'react'
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
    <section id="page-login" className="page active">
      <div className="form-container">
        <h2>Iniciar sesión</h2>

        {loginError && (
          <div id="login-error-msg" className="error-banner" style={{ display: 'block' }}>
            {loginError}
          </div>
        )}

        <form id="form-login" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-correo">Correo electrónico</label>
            <input
              id="login-correo"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.correo && <span id="err-login-correo" className="error-msg show">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="login-pass">Contraseña</label>
            <input
              id="login-pass"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <span id="err-login-pass" className="error-msg show">{errors.password}</span>}
          </div>

          <button id="btn-login-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </section>
  )
}
