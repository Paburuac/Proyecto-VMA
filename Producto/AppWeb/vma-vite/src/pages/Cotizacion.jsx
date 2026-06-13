import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { enviarCotizacion } from '../services/cotizacionService.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Cotizacion() {
  const { authState } = useAuth()
  const { cart, limpiarCarrito } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const perfil = authState.perfil

  const [form, setForm] = useState({
    nombre:   perfil?.nombre   || '',
    empresa:  '',
    correo:   perfil?.email    || '',
    telefono: perfil?.telefono || '',
    mensaje:  '',
    productoInteres: cart.map(i => `[${i.codigo}] ${i.nombre.substring(0, 30)}`).join(', '),
  })
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
    if (!form.nombre.trim())   errs.nombre   = 'Este campo es obligatorio.'
    if (!form.empresa.trim())  errs.empresa  = 'Este campo es obligatorio.'
    if (!isValidEmail(form.correo)) errs.correo = 'Ingrese un correo válido.'
    if (!form.telefono.trim()) errs.telefono = 'Este campo es obligatorio.'
    if (!form.mensaje.trim())  errs.mensaje  = 'Este campo es obligatorio.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)

    const productosCarrito = cart.map(i => ({
      codigo:   i.codigo,
      nombre:   i.nombre,
      cantidad: i.cantidad,
      precio:   i.precio,
    }))

    const mensajeFinal = form.mensaje.trim() +
      (form.productoInteres ? `\n\nProducto de interés: ${form.productoInteres}` : '')

    const datos = {
      nombre:                form.nombre.trim(),
      empresa:               form.empresa.trim(),
      email:                 form.correo.trim(),
      telefono:              form.telefono.trim(),
      mensaje:               mensajeFinal,
      productos_solicitados: productosCarrito,
      usuario_id:            authState.perfil?.id ?? null,
    }

    const { error } = await enviarCotizacion(datos)
    setLoading(false)

    if (error) {
      showToast('❌ Error al enviar. Intenta nuevamente.')
      return
    }

    setExito(true)
    limpiarCarrito()
    setTimeout(() => {
      setExito(false)
      navigate('/')
    }, 3000)
  }

  return (
    <div className="form-page">
      <div className="form-card form-card-wide">

        <div className="form-header">
          <h2>Solicitar <span>cotización</span></h2>
          <p>Todos los campos marcados con * son obligatorios</p>
        </div>

        <div className="form-body">

          {/* Resumen carrito */}
          {cart.length > 0 && (
            <div style={{
              marginBottom: '1.2rem',
              padding: '0.8rem 1rem',
              background: 'rgba(132,189,0,0.08)',
              border: '1.5px solid var(--verde)',
              borderRadius: 'var(--radio)',
              fontSize: '0.85rem',
              color: 'var(--azul)',
            }}>
              🛒 <strong>Productos del carrito incluidos:</strong>
              <div style={{ marginTop: '0.4rem', color: 'var(--gris-texto)' }}>
                {cart.map(i => (
                  <div key={i.codigo}>• [{i.codigo}] {i.nombre.substring(0, 50)}{i.nombre.length > 50 ? '…' : ''} × {i.cantidad}</div>
                ))}
              </div>
            </div>
          )}

          {exito && (
            <div className="success-msg show">
              ✅ ¡Cotización enviada! Nos contactaremos contigo pronto.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row two-col">
              <div>
                <label htmlFor="nombre-c">Nombre *</label>
                <input id="nombre-c" name="nombre" placeholder="Tu nombre completo" value={form.nombre} onChange={handleChange} />
                {errors.nombre && <div className="form-error show">{errors.nombre}</div>}
              </div>
              <div>
                <label htmlFor="empresa-c">Empresa *</label>
                <input id="empresa-c" name="empresa" placeholder="Nombre de la empresa" value={form.empresa} onChange={handleChange} />
                {errors.empresa && <div className="form-error show">{errors.empresa}</div>}
              </div>
            </div>

            <div className="form-row two-col">
              <div>
                <label htmlFor="correo-c">Correo electrónico *</label>
                <input id="correo-c" name="correo" type="email" placeholder="correo@empresa.cl" value={form.correo} onChange={handleChange} />
                {errors.correo && <div className="form-error show">{errors.correo}</div>}
              </div>
              <div>
                <label htmlFor="tel-c">Teléfono *</label>
                <input id="tel-c" name="telefono" placeholder="+56 9 XXXX XXXX" value={form.telefono} onChange={handleChange} />
                {errors.telefono && <div className="form-error show">{errors.telefono}</div>}
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="producto-interes">Producto de interés</label>
              <input id="producto-interes" name="productoInteres" placeholder="Ej: Acetileno, Soldadora MIG..." value={form.productoInteres} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label htmlFor="mensaje-c">Mensaje *</label>
              <textarea id="mensaje-c" name="mensaje" placeholder="Describe tu consulta o solicitud..." value={form.mensaje} onChange={handleChange} />
              {errors.mensaje && <div className="form-error show">{errors.mensaje}</div>}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : '📋 Enviar solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
