/**
 * src/js/pagoResultado.js
 * ─────────────────────────────────────────────
 * Página de resultado de pago Transbank Webpay Plus.
 *
 * Flujo:
 *  1. Transbank redirige al usuario a la return_url con ?token_ws=XXX
 *  2. app.js captura el token, lo guarda en sessionStorage y limpia la URL
 *  3. Esta página lee el token y llama a la Edge Function confirmar-transaccion
 *  4. Muestra el resultado al usuario
 * ─────────────────────────────────────────────
 */

export async function initPagoResultado() {
  const cont = document.getElementById('pago-result-content')
  if (!cont) return

  const tokenWs = sessionStorage.getItem('transbank_token_ws')

  if (!tokenWs) {
    cont.innerHTML = renderResultado('sin-token')
    return
  }

  sessionStorage.removeItem('transbank_token_ws')
  cont.innerHTML = renderVerificando()

  await confirmarPago(tokenWs, cont)
}

async function confirmarPago(tokenWs, cont) {
  try {
    // TODO: Llamar Edge Function confirmar-transaccion (Fase 2)
    // const resp = await fetch('https://<proyecto>.supabase.co/functions/v1/confirmar-transaccion', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token_ws: tokenWs }),
    // })
    // const result = await resp.json()
    // if (result.estado === 'aprobado') { cont.innerHTML = renderResultado('aprobado', result) }
    // else { cont.innerHTML = renderResultado('rechazado', result) }

    // Placeholder hasta que la Edge Function esté disponible
    cont.innerHTML = renderResultado('pendiente-configuracion')

  } catch (err) {
    console.error('[VMA Pago] Error al confirmar transacción:', err)
    cont.innerHTML = renderResultado('error', { mensaje: err.message })
  }
}

function renderVerificando() {
  return `
    <div class="pr-estado pr-verificando">
      <div class="pr-spinner"></div>
      <h2>Verificando tu pago...</h2>
      <p>Estamos confirmando tu transacción con Transbank. No cierres esta página.</p>
    </div>
  `
}

function renderResultado(tipo, data = {}) {
  const volver = `<button class="pr-btn" onclick="showPage('page-mis-cotizaciones');initMisCotizaciones()">
    Ver mis cotizaciones
  </button>`

  switch (tipo) {
    case 'aprobado':
      return `
        <div class="pr-estado pr-aprobado">
          <div class="pr-icono">✅</div>
          <h2>¡Pago aprobado!</h2>
          <p>Tu pago fue procesado exitosamente. Recibirás una confirmación por email.</p>
          ${data.monto ? `<p class="pr-monto">Monto pagado: <strong>$${Number(data.monto).toLocaleString('es-CL')}</strong></p>` : ''}
          ${volver}
        </div>
      `

    case 'rechazado':
      return `
        <div class="pr-estado pr-rechazado">
          <div class="pr-icono">❌</div>
          <h2>Pago no aprobado</h2>
          <p>Tu transacción fue rechazada por Transbank. No se realizó ningún cargo.</p>
          <p class="pr-sub">Puedes intentarlo nuevamente desde tus cotizaciones.</p>
          ${volver}
        </div>
      `

    case 'sin-token':
      return `
        <div class="pr-estado pr-neutral">
          <div class="pr-icono">🔍</div>
          <h2>Sin información de pago</h2>
          <p>No se encontró un pago pendiente de verificar.</p>
          ${volver}
        </div>
      `

    case 'pendiente-configuracion':
      return `
        <div class="pr-estado pr-neutral">
          <div class="pr-icono">⚙️</div>
          <h2>Configuración en proceso</h2>
          <p>El sistema de pagos está siendo configurado. Por favor contacta a VMA Industrial para coordinar tu pago.</p>
          ${volver}
        </div>
      `

    case 'error':
    default:
      return `
        <div class="pr-estado pr-rechazado">
          <div class="pr-icono">⚠️</div>
          <h2>Error al verificar el pago</h2>
          <p>${data.mensaje || 'Ocurrió un error inesperado. Por favor contacta a soporte.'}</p>
          ${volver}
        </div>
      `
  }
}

window.initPagoResultado = initPagoResultado
