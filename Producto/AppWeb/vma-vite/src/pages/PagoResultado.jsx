import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

async function confirmarPago(tokenWs) {
  const resp = await fetch('https://hlyjfkybecuicgtefooj.supabase.co/functions/v1/confirmar-transaccion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token_ws: tokenWs }),
  })
  return resp.json()
}

export default function PagoResultado() {
  const navigate = useNavigate()
  const [estado, setEstado] = useState('verificando') // verificando | aprobado | rechazado | sin-token | error
  const [data, setData] = useState({})

  useEffect(() => {
    // Capturar token de la URL (Transbank redirige con ?token_ws=XXX)
    const urlParams = new URLSearchParams(window.location.search)
    const tokenUrl = urlParams.get('token_ws')
    if (tokenUrl) {
      sessionStorage.setItem('transbank_token_ws', tokenUrl)
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    const tokenWs = sessionStorage.getItem('transbank_token_ws')

    if (!tokenWs) {
      setEstado('sin-token')
      return
    }

    sessionStorage.removeItem('transbank_token_ws')

    confirmarPago(tokenWs)
      .then(result => {
        setData(result)
        setEstado(result.estado === 'aprobado' ? 'aprobado' : 'rechazado')
      })
      .catch(err => {
        setData({ mensaje: err.message })
        setEstado('error')
      })
  }, [])

  const irACotizaciones = () => navigate('/mis-cotizaciones')

  return (
    <section id="page-pago-resultado" className="vma-page">
      <div id="pago-result-content" className="pr-container">

        {estado === 'verificando' && (
          <div className="pr-estado pr-verificando">
            <div className="pr-spinner" />
            <h2>Verificando tu pago...</h2>
            <p>Estamos confirmando tu transacción con Transbank. No cierres esta página.</p>
          </div>
        )}

        {estado === 'aprobado' && (
          <div className="pr-estado pr-aprobado">
            <div className="pr-icono">✅</div>
            <h2>¡Pago aprobado!</h2>
            <p>Tu pago fue procesado exitosamente. Recibirás una confirmación por email.</p>
            {data.monto && <p className="pr-monto">Monto pagado: <strong>${Number(data.monto).toLocaleString('es-CL')}</strong></p>}
            <button className="pr-btn" onClick={irACotizaciones}>Ver mis cotizaciones</button>
          </div>
        )}

        {estado === 'rechazado' && (
          <div className="pr-estado pr-rechazado">
            <div className="pr-icono">❌</div>
            <h2>Pago no aprobado</h2>
            <p>Tu transacción fue rechazada por Transbank. No se realizó ningún cargo.</p>
            <p className="pr-sub">Puedes intentarlo nuevamente desde tus cotizaciones.</p>
            <button className="pr-btn" onClick={irACotizaciones}>Ver mis cotizaciones</button>
          </div>
        )}

        {estado === 'sin-token' && (
          <div className="pr-estado pr-neutral">
            <div className="pr-icono">🔍</div>
            <h2>Sin información de pago</h2>
            <p>No se encontró un pago pendiente de verificar.</p>
            <button className="pr-btn" onClick={irACotizaciones}>Ver mis cotizaciones</button>
          </div>
        )}

        {estado === 'error' && (
          <div className="pr-estado pr-rechazado">
            <div className="pr-icono">⚠️</div>
            <h2>Error al verificar el pago</h2>
            <p>{data.mensaje || 'Ocurrió un error inesperado. Por favor contacta a soporte.'}</p>
            <button className="pr-btn" onClick={irACotizaciones}>Ver mis cotizaciones</button>
          </div>
        )}

      </div>
    </section>
  )
}
