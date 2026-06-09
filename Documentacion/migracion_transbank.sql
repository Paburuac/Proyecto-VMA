-- ============================================================
-- MIGRACIÓN: Integración Transbank Webpay Plus
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Agregar precio_final a cotizaciones
--    Guardado en CLP (entero). Lo ingresa el trabajador/admin
--    al marcar la cotización como "respondida".
ALTER TABLE cotizaciones
  ADD COLUMN IF NOT EXISTS precio_final integer;

-- 2. Tabla de transacciones Transbank
CREATE TABLE IF NOT EXISTS pagos (
  id            serial       PRIMARY KEY,
  cotizacion_id integer      NOT NULL REFERENCES cotizaciones(id) ON DELETE CASCADE,
  token_ws      varchar(100) NOT NULL UNIQUE,
  estado        varchar(20)  NOT NULL DEFAULT 'pendiente',
  -- estados: 'pendiente' | 'aprobado' | 'rechazado' | 'anulado'
  monto         integer      NOT NULL,
  respuesta_tb  jsonb,       -- respuesta completa de Transbank al confirmar
  created_at    timestamptz  DEFAULT now()
);

ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;

-- El cliente solo puede ver los pagos asociados a sus propias cotizaciones
CREATE POLICY "cliente_ver_sus_pagos" ON pagos
  FOR SELECT USING (
    cotizacion_id IN (
      SELECT c.id
      FROM   cotizaciones c
      JOIN   usuarios u ON u.id = c.usuario_id
      WHERE  u.auth_user_id = auth.uid()
    )
  );

-- Nota: las Edge Functions usan la clave service_role, que omite RLS
-- automáticamente. No se necesitan políticas adicionales para INSERT/UPDATE.
