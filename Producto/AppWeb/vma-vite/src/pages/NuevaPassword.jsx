import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function NuevaPassword() {
  const { handleActualizarPassword, handleSalirRecovery } = useAuth()
  const { showToast } = useToast()

  const [form, setForm] = useState({ password: '', password2: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  function validar() {
    const errs = {}
    if (form.password.length < 6)           errs.password  = 'La contraseña debe tener al menos 6 caracteres.'
    if (form.password !== form.password2)   errs.password2 = 'Las contraseñas no coinciden.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    const { error } = await handleActualizarPassword(form.password)
    setLoading(false)

    if (error) {
      setErrors({ password: 'No se pudo actualizar la contraseña. El enlace puede haber expirado.' })
      return
    }

    setExito(true)
    showToast('✅ Contraseña actualizada correctamente')
    setTimeout(() => handleSalirRecovery(), 2000)
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>Nueva <span>contraseña</span></h2>
          <p>Ingresa tu nueva contraseña para VMA Industrial</p>
        </div>

        <div className="form-body">
          {exito ? (
            <div className="success-msg show">
              ✅ ¡Contraseña actualizada! Redirigiendo...
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="np-pass">Nueva contraseña</label>
                <input
                  id="np-pass"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.password && <div className="form-error show">{errors.password}</div>}
              </div>

              <div className="form-row">
                <label htmlFor="np-pass2">Confirmar contraseña</label>
                <input
                  id="np-pass2"
                  name="password2"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={form.password2}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.password2 && <div className="form-error show">{errors.password2}</div>}
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Actualizando...' : '🔐 Actualizar contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
