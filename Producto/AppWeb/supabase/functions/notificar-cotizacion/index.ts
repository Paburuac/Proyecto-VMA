/**
 * Edge Function: notificar-cotizacion
 * Notifica a admins y trabajadores cuando se envía una nueva cotización.
 *
 * Variables de entorno requeridas (configurar en Supabase Dashboard > Edge Functions > Secrets):
 *   RESEND_API_KEY      → API key de Resend (https://resend.com)
 *   EMAIL_FROM          → dirección remitente verificada en Resend (ej: noreply@vmaindustrial.cl)
 *   SUPABASE_URL        → (automática en Edge Functions)
 *   SUPABASE_SERVICE_ROLE_KEY → (automática en Edge Functions)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const EMAIL_FROM     = Deno.env.get('EMAIL_FROM') || 'VMA Industrial <noreply@vmaindustrial.cl>'
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const payload = await req.json()
  const { id, nombre, empresa, email, telefono, mensaje, productos_solicitados } = payload

  if (!RESEND_API_KEY) {
    console.warn('[notificar-cotizacion] RESEND_API_KEY no configurada — se omite el envío')
    return new Response(JSON.stringify({ ok: true, enviado: false }), { status: 200 })
  }

  // Obtener emails de admins y trabajadores (rol_id 1 y 2)
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
  const { data: receptores, error } = await supabase
    .from('usuarios')
    .select('nombre, email')
    .in('rol_id', [1, 2])
    .eq('activo', true)

  if (error || !receptores?.length) {
    console.warn('[notificar-cotizacion] Sin receptores:', error?.message)
    return new Response(JSON.stringify({ ok: true, enviado: false }), { status: 200 })
  }

  const productosHtml = Array.isArray(productos_solicitados)
    ? productos_solicitados.map((p: any) =>
        `<li>${p.nombre || p.codigo} × ${p.cantidad}</li>`
      ).join('')
    : '<li>Sin detalle de productos</li>'

  const html = `
    <h2>Nueva cotización recibida — VMA Industrial</h2>
    <p><strong>Cliente:</strong> ${nombre}${empresa ? ` (${empresa})` : ''}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
    <p><strong>Mensaje:</strong> ${mensaje || 'Sin mensaje'}</p>
    <p><strong>Productos solicitados:</strong></p>
    <ul>${productosHtml}</ul>
    <p><strong>ID Cotización:</strong> ${id}</p>
    <hr>
    <p style="color:#666;font-size:0.85em">Accede al panel para responder esta cotización.</p>
  `

  const destinatarios = receptores.map((r: any) => r.email)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    EMAIL_FROM,
      to:      destinatarios,
      subject: `Nueva cotización de ${nombre} — VMA Industrial`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[notificar-cotizacion] Resend error:', err)
    return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 })
  }

  console.log('[notificar-cotizacion] Email enviado a:', destinatarios)
  return new Response(JSON.stringify({ ok: true, enviado: true }), { status: 200 })
})
