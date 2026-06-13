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

    const { error } = await handleRegistro({
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
    setTimeout(() => navigate('/login'), 2500)
  }

  return (
    <section id="page-registro" className="page active">
      <div className="form-container">
        <h2>Crear cuenta</h2>

        {exito && (
          <div id="success-registro" className="success-msg show">
            ✅ ¡Cuenta creada! Redirigiendo al inicio de sesión...
          </div>
        )}

        {registroError && (
          <div id="registro-error-msg" className="error-banner" style={{ display: 'block' }}>
            {registroError}
          </div>
        )}

        <form id="form-registro" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="reg-nombre">Nombre completo *</label>
            <input id="reg-nombre" name="nombre" value={form.nombre} onChange={handleChange} autoComplete="name" />
            {errors.nombre && <span id="err-reg-nombre" className="error-msg show">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-telefono">Teléfono</label>
            <input id="reg-telefono" name="telefono" value={form.telefono} onChange={handleChange} autoComplete="tel" />
          </div>

          <div className="form-group">
            <label htmlFor="reg-correo">Correo electrónico *</label>
            <input id="reg-correo" name="correo" type="email" value={form.correo} onChange={handleChange} autoComplete="email" />
            {errors.correo && <span id="err-reg-correo" className="error-msg show">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-pass">Contraseña *</label>
            <input id="reg-pass" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
            {errors.password && <span id="err-reg-pass" className="error-msg show">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reg-pass2">Confirmar contraseña *</label>
            <input id="reg-pass2" name="password2" type="password" value={form.password2} onChange={handleChange} autoComplete="new-password" />
            {errors.password2 && <span id="err-reg-pass2" className="error-msg show">{errors.password2}</span>}
          </div>

          <button id="btn-registro-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </section>
  )
}
