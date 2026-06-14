import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function traducirError(msg) {
  if (!msg) return 'Error al crear la cuenta. Intenta nuevamente.'
  const m = msg.toLowerCase()
  if (m.includes('already registered') || m.includes('already exists') || m.includes('duplicate'))
    return 'Este correo ya está registrado. Intenta iniciar sesión.'
  if (m.includes('password should be'))
    return 'La contraseña debe tener al menos 6 caracteres.'
  if (m.includes('unable to validate email'))
    return 'El formato del correo no es válido.'
  if (m.includes('signup is disabled'))
    return 'El registro está temporalmente deshabilitado.'
  return msg
}

export default function Registro() {
  const { handleRegistro } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ nombre: '', telefono: '', correo: '', password: '', password2: '' })
  const [errors, setErrors] = useState({})
  const [registroError, setRegistroError] = useState('')
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
    if (registroError) setRegistroError('')
  }

  function validar() {
    const errs = {}
    if (!form.nombre.trim())           errs.nombre    = 'El nombre es obligatorio.'
    if (!isValidEmail(form.correo))    errs.correo    = 'Ingrese un correo válido.'
    if (form.password.length < 6)      errs.password  = 'La contraseña debe tener al menos 6 caracteres.'
    if (form.password !== form.password2) errs.password2 = 'Las contraseñas no coinciden.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setRegistroError('')

    const { data, error } = await handleRegistro({
      nombre:   form.nombre.trim(),
      telefono: form.telefono.trim(),
      email:    form.correo.trim(),
      password: form.password,
    })

    setLoading(false)

    if (error) {
      setRegistroError(traducirError(error.message))
      return
    }

    setExito(true)
    // Si hay sesión activa → confirmación desactivada, redirigir al login
    // Si no hay sesión → confirmación por email activada, mostrar mensaje y NO redirigir
    if (data?.session) {
      setTimeout(() => navigate('/login'), 2500)
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Crear <span>cuenta</span></h2>
          <p>Únete a VMA Industrial</p>
        </div>

        <div className="form-body">
          {exito && (
            <div className="success-msg show">
              ✅ ¡Cuenta creada! Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión. Si no lo ves, revisa la carpeta de spam.
            </div>
          )}

          {registroError && (
            <div className="error-banner" style={{ display: 'block', marginBottom: '1rem' }}>
              {registroError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row two-col">
              <div>
                <label htmlFor="reg-nombre">Nombre completo *</label>
                <input id="reg-nombre" name="nombre" placeholder="Tu nombre completo" value={form.nombre} onChange={handleChange} autoComplete="name" />
                {errors.nombre && <div className="form-error show">{errors.nombre}</div>}
              </div>
              <div>
                <label htmlFor="reg-telefono">Teléfono</label>
                <input id="reg-telefono" name="telefono" placeholder="+56 9 XXXX XXXX" value={form.telefono} onChange={handleChange} autoComplete="tel" />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="reg-correo">Correo electrónico *</label>
              <input id="reg-correo" name="correo" type="email" placeholder="correo@empresa.cl" value={form.correo} onChange={handleChange} autoComplete="email" />
              {errors.correo && <div className="form-error show">{errors.correo}</div>}
            </div>

            <div className="form-row two-col">
              <div>
                <label htmlFor="reg-pass">Contraseña *</label>
                <input id="reg-pass" name="password" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} autoComplete="new-password" />
                {errors.password && <div className="form-error show">{errors.password}</div>}
              </div>
              <div>
                <label htmlFor="reg-pass2">Confirmar contraseña *</label>
                <input id="reg-pass2" name="password2" type="password" placeholder="Repite la contraseña" value={form.password2} onChange={handleChange} autoComplete="new-password" />
                {errors.password2 && <div className="form-error show">{errors.password2}</div>}
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creando cuenta...' : '✅ Crear cuenta'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.9rem', color: 'var(--gris-texto)' }}>
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--verde)', fontWeight: 600 }}>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
