/**
 * src/services/supabase.js
 * ─────────────────────────────────────────────
 * Cliente Supabase para VMA Industrial.
 *
 * Las credenciales se leen desde variables de entorno
 * definidas en el archivo .env de la raíz del proyecto.
 * Vite expone solo las variables con prefijo VITE_.
 *
 * ⚠️  NUNCA hardcodear las keys aquí.
 * ⚠️  NUNCA usar la service_role key en el frontend.
 *     Solo usar la anon/public key.
 * ─────────────────────────────────────────────
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación temprana: avisa si faltan las variables antes de fallar silenciosamente
if (!supabaseUrl || supabaseUrl === 'PEGAR_AQUI_LA_PROJECT_URL') {
  console.error(
    '[VMA] ❌ VITE_SUPABASE_URL no está configurada.\n' +
    'Crea el archivo .env en la raíz del proyecto y agrega:\n' +
    'VITE_SUPABASE_URL=https://tu-proyecto.supabase.co'
  )
}

if (!supabaseKey || supabaseKey === 'PEGAR_AQUI_LA_PUBLISHABLE_KEY') {
  console.error(
    '[VMA] ❌ VITE_SUPABASE_ANON_KEY no está configurada.\n' +
    'Crea el archivo .env en la raíz del proyecto y agrega:\n' +
    'VITE_SUPABASE_ANON_KEY=eyJ...'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
