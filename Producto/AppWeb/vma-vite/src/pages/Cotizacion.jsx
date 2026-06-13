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
    <section id="page-cotizacion" className="page active">
      <div className="form-container">
        <h2>Solicitar cotización</h2>

        {/* Resumen carrito */}
        {cart.length > 0 && (
          <div id="cotizacion-productos-info" className="cotizacion-productos-info" style={{ display: 'block' }}>
            <strong>Productos en tu carrito:</strong>
            <div id="cotizacion-productos-lista" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              {cart.map(i => (
                <div key={i.codigo}>• [{i.codigo}] {i.nombre.substring(0, 50)}{i.nombre.length > 50 ? '…' : ''} × {i.cantidad}</div>
              ))}
            </div>
          </div>
        )}

        {exito && (
          <div id="success-contacto" className="success-msg show">
            ✅ ¡Cotización enviada! Nos contactaremos contigo pronto.
          </div>
        )}

        <form id="form-contacto" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre-c">Nombre *</label>
            <input id="nombre-c" name="nombre" value={form.nombre} onChange={handleChange} />
            {errors.nombre && <span id="err-nombre-c" className="error-msg show">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="empresa-c">Empresa *</label>
            <input id="empresa-c" name="empresa" value={form.empresa} onChange={handleChange} />
            {errors.empresa && <span id="err-empresa-c" className="error-msg show">{errors.empresa}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="correo-c">Correo electrónico *</label>
            <input id="correo-c" name="correo" type="email" value={form.correo} onChange={handleChange} />
            {errors.correo && <span id="err-correo-c" className="error-msg show">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tel-c">Teléfono *</label>
            <input id="tel-c" name="telefono" value={form.telefono} onChange={handleChange} />
            {errors.telefono && <span id="err-tel-c" className="error-msg show">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="producto-interes">Producto de interés</label>
            <input id="producto-interes" name="productoInteres" value={form.productoInteres} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje-c">Mensaje *</label>
            <textarea id="mensaje-c" name="mensaje" rows={4} value={form.mensaje} onChange={handleChange} />
            {errors.mensaje && <span id="err-mensaje-c" className="error-msg show">{errors.mensaje}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </section>
  )
}
