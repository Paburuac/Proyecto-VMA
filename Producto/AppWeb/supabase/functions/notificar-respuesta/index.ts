/**
 * Edge Function: notificar-respuesta
 * Notifica al cliente cuando su cotización ha sido respondida con precio.
 *
 * Variables de entorno requeridas:
 *   RESEND_API_KEY   → API key de Resend
 *   EMAIL_FROM       → dirección remitente verificada en Resend
 */

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const EMAIL_FROM     = Deno.env.get('EMAIL_FROM') || 'VMA Industrial <noreply@vmaindustrial.cl>'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const payload = await req.json()
  const { cotizacionId, clienteNombre, clienteEmail, empresa, precioFinal, productos } = payload

  if (!clienteEmail) {
    return new Response(JSON.stringify({ ok: false, error: 'clienteEmail requerido' }), { status: 400 })
  }

  if (!RESEND_API_KEY) {
    console.warn('[notificar-respuesta] RESEND_API_KEY no configurada — se omite el envío')
    return new Response(JSON.stringify({ ok: true, enviado: false }), { status: 200 })
  }

  const precioFormateado = typeof precioFinal === 'number'
    ? precioFinal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
    : precioFinal ?? 'A consultar'

  const productosHtml = Array.isArray(productos)
    ? productos.map((p: any) => {
        const precio = p.precio_respondido
          ? p.precio_respondido.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
          : ''
        return `<li>${p.nombre || p.codigo} × ${p.cantidad}${precio ? ` — ${precio}` : ''}</li>`
      }).join('')
    : ''

  const html = `
    <h2>Tu cotización ha sido respondida — VMA Industrial</h2>
    <p>Hola ${clienteNombre}${empresa ? ` de ${empresa}` : ''},</p>
    <p>Hemos revisado tu solicitud de cotización y estamos listos para atenderte.</p>
    ${productosHtml ? `<p><strong>Detalle de productos:</strong></p><ul>${productosHtml}</ul>` : ''}
    <p><strong>Precio total estimado:</strong> ${precioFormateado}</p>
    <p>Para confirmar tu pedido o consultar más detalles, contáctanos por WhatsApp o escríbenos directamente.</p>
    <hr>
    <p style="color:#666;font-size:0.85em">
      VMA Industrial — Agente autorizado Indura<br>
      Este correo fue generado automáticamente para la cotización #${cotizacionId}.
    </p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    EMAIL_FROM,
      to:      [clienteEmail],
      subject: 'Tu cotización ha sido respondida — VMA Industrial',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[notificar-respuesta] Resend error:', err)
    return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 })
  }

  console.log('[notificar-respuesta] Email enviado a:', clienteEmail)
  return new Response(JSON.stringify({ ok: true, enviado: true }), { status: 200 })
})
