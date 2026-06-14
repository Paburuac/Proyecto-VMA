/**
 * Edge Function: notificar-stock-bajo
 * Notifica a admins y trabajadores cuando un producto baja a stock ≤ 5.
 *
 * Variables de entorno requeridas:
 *   RESEND_API_KEY            → API key de Resend
 *   EMAIL_FROM                → dirección remitente verificada en Resend
 *   SUPABASE_URL              → (automática)
 *   SUPABASE_SERVICE_ROLE_KEY → (automática)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const EMAIL_FROM     = Deno.env.get('EMAIL_FROM') || 'VMA Industrial <noreply@vmaindustrial.cl>'
const SUPABASE_URL   = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const { productoId, codigo, descripcion, stock } = await req.json()

  if (!RESEND_API_KEY) {
    console.warn('[notificar-stock-bajo] RESEND_API_KEY no configurada — se omite el envío')
    return new Response(JSON.stringify({ ok: true, enviado: false }), { status: 200 })
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
  const { data: receptores, error } = await supabase
    .from('usuarios')
    .select('nombre, email')
    .in('rol_id', [1, 2])
    .eq('activo', true)

  if (error || !receptores?.length) {
    console.warn('[notificar-stock-bajo] Sin receptores:', error?.message)
    return new Response(JSON.stringify({ ok: true, enviado: false }), { status: 200 })
  }

  const nivel = stock === 0 ? '⛔ SIN STOCK' : `⚠️ Stock bajo (${stock} unidades)`

  const html = `
    <h2>Alerta de stock — VMA Industrial</h2>
    <p><strong>Producto:</strong> ${descripcion} (${codigo})</p>
    <p><strong>Estado:</strong> ${nivel}</p>
    <p>Revisa el inventario y gestiona el reabastecimiento a la brevedad.</p>
    <hr>
    <p style="color:#666;font-size:0.85em">Alerta automática del panel de administración — ID producto: ${productoId}</p>
  `

  const destinatarios = receptores.map((r: any) => r.email)
  const asunto = stock === 0
    ? `⛔ Sin stock: ${codigo} — VMA Industrial`
    : `⚠️ Stock bajo: ${codigo} (${stock} uds) — VMA Industrial`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    EMAIL_FROM,
      to:      destinatarios,
      subject: asunto,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[notificar-stock-bajo] Resend error:', err)
    return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 })
  }

  console.log('[notificar-stock-bajo] Alerta enviada a:', destinatarios)
  return new Response(JSON.stringify({ ok: true, enviado: true }), { status: 200 })
})
