-- ============================================================
-- POLÍTICAS RLS — VMA Industrial
-- Ejecutar en Supabase SQL Editor
-- ============================================================
-- Prerequisito: las tablas categoria, producto, usuarios,
-- cotizaciones y pagos ya deben existir.
-- La tabla pagos tiene su propia política en migracion_transbank.sql.
-- ============================================================

-- Helper: retorna true si el usuario autenticado es admin (rol_id=1)
-- Se usa dentro de las políticas para no repetir el subquery.
CREATE OR REPLACE FUNCTION es_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM usuarios
    WHERE auth_user_id = auth.uid()
      AND rol_id = 1
      AND activo = true
  );
$$;

-- Helper: retorna true si el usuario autenticado es admin o trabajador (rol_id 1 o 2)
CREATE OR REPLACE FUNCTION es_admin_o_trabajador()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM usuarios
    WHERE auth_user_id = auth.uid()
      AND rol_id IN (1, 2)
      AND activo = true
  );
$$;

-- ============================================================
-- TABLA: categoria
-- ============================================================
ALTER TABLE categoria ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer (catálogo público)
CREATE POLICY "categoria_select_publico" ON categoria
  FOR SELECT USING (true);

-- Solo admin puede crear/editar/eliminar categorías
CREATE POLICY "categoria_insert_admin" ON categoria
  FOR INSERT WITH CHECK (es_admin());

CREATE POLICY "categoria_update_admin" ON categoria
  FOR UPDATE USING (es_admin());

CREATE POLICY "categoria_delete_admin" ON categoria
  FOR DELETE USING (es_admin());

-- ============================================================
-- TABLA: producto
-- ============================================================
ALTER TABLE producto ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer (catálogo público)
CREATE POLICY "producto_select_publico" ON producto
  FOR SELECT USING (true);

-- Solo admin puede crear/editar/eliminar productos
CREATE POLICY "producto_insert_admin" ON producto
  FOR INSERT WITH CHECK (es_admin());

CREATE POLICY "producto_update_admin" ON producto
  FOR UPDATE USING (es_admin());

CREATE POLICY "producto_delete_admin" ON producto
  FOR DELETE USING (es_admin());

-- ============================================================
-- TABLA: usuarios
-- ============================================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Admin ve todos los usuarios; cada usuario ve solo su propio perfil
CREATE POLICY "usuarios_select" ON usuarios
  FOR SELECT USING (
    es_admin()
    OR auth_user_id = auth.uid()
  );

-- El registro crea el perfil (INSERT es desde el frontend en el momento del registro)
-- Se permite insertar solo si el auth_user_id coincide con el usuario autenticado
CREATE POLICY "usuarios_insert_propio" ON usuarios
  FOR INSERT WITH CHECK (auth_user_id = auth.uid());

-- Solo admin puede actualizar cualquier usuario (incluyendo rol_id y activo)
-- Un usuario puede actualizar sus propios datos NO sensibles,
-- pero rol_id y activo solo los puede tocar admin.
-- Solución: admin actualiza todo; usuario normal actualiza solo nombre/telefono de su propio perfil.
CREATE POLICY "usuarios_update_admin" ON usuarios
  FOR UPDATE USING (es_admin());

CREATE POLICY "usuarios_update_propio" ON usuarios
  FOR UPDATE USING (auth_user_id = auth.uid())
  WITH CHECK (
    -- No puede cambiar su propio rol ni desactivarse
    rol_id = (SELECT rol_id FROM usuarios WHERE auth_user_id = auth.uid())
    AND activo = (SELECT activo FROM usuarios WHERE auth_user_id = auth.uid())
  );

-- Solo admin puede eliminar usuarios
CREATE POLICY "usuarios_delete_admin" ON usuarios
  FOR DELETE USING (es_admin());

-- ============================================================
-- TABLA: cotizaciones
-- ============================================================
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;

-- Admin y trabajador ven todas; cliente ve solo las suyas; anónimo no ve nada
CREATE POLICY "cotizaciones_select" ON cotizaciones
  FOR SELECT USING (
    es_admin_o_trabajador()
    OR (
      usuario_id IS NOT NULL
      AND usuario_id = (SELECT id FROM usuarios WHERE auth_user_id = auth.uid())
    )
  );

-- Cualquiera puede crear una cotización (anónimos incluidos)
CREATE POLICY "cotizaciones_insert_publico" ON cotizaciones
  FOR INSERT WITH CHECK (true);

-- Solo admin y trabajador pueden cambiar el estado o el precio final
CREATE POLICY "cotizaciones_update_staff" ON cotizaciones
  FOR UPDATE USING (es_admin_o_trabajador());

-- Solo admin puede eliminar cotizaciones
CREATE POLICY "cotizaciones_delete_admin" ON cotizaciones
  FOR DELETE USING (es_admin());
