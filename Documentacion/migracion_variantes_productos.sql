-- ================================================================
-- MIGRACIÓN: Variantes de productos
-- Fecha: 2026-06-05
--
-- Agrupa productos con la misma descripción base pero distinta
-- medida/talla bajo un único "producto padre" con selector de variante.
--
-- ESTRATEGIA:
--   Se agregan 3 columnas a `producto`:
--     • tiene_variantes (BOOLEAN) → TRUE si es producto padre con variantes
--     • id_padre        (INT FK)  → apunta al padre si es variante
--     • label_variante  (VARCHAR) → etiqueta legible ("N°39", "1/8", etc.)
--
--   El catálogo muestra solo productos donde id_padre IS NULL.
--   Al mostrar un producto con tiene_variantes = TRUE, el frontend
--   carga todas sus variantes con:
--     SELECT * FROM producto WHERE id_padre = $idPadre ORDER BY label_variante;
--   Al agregar al carrito se usa el id_producto del variante elegido,
--   no del padre.
--
--   NOTA: cotizaciones.productos_solicitados es JSONB, no FK,
--   por lo que este cambio no rompe cotizaciones existentes.
--
-- ROLLBACK: ver sección al final del archivo.
-- ================================================================

BEGIN;

-- ================================================================
-- 1. CAMBIOS DE ESQUEMA
-- ================================================================

ALTER TABLE producto
    ADD COLUMN IF NOT EXISTS tiene_variantes BOOLEAN  DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS id_padre        INT      REFERENCES producto(id_producto),
    ADD COLUMN IF NOT EXISTS label_variante  VARCHAR(150);

CREATE INDEX IF NOT EXISTS idx_producto_id_padre ON producto (id_padre)
    WHERE id_padre IS NOT NULL;

-- ================================================================
-- 2. FUNCIÓN AUXILIAR DE MIGRACIÓN
--    p_ids[1]   = producto padre (su descripción ya debe estar limpia)
--    p_ids[2..] = variantes hijas
--    p_base     = descripción base sin la parte de la variante
--    p_labels   = etiquetas correspondientes a cada ID
-- ================================================================

CREATE OR REPLACE FUNCTION _agrupar_variantes(
    p_ids    INT[],
    p_base   TEXT,
    p_labels TEXT[]
) RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE i INT;
BEGIN
    -- Padre
    UPDATE producto
    SET tiene_variantes = TRUE,
        descripcion     = trim(p_base),
        label_variante  = trim(p_labels[1])
    WHERE id_producto = p_ids[1];

    -- Hijos
    FOR i IN 2 .. array_length(p_ids, 1) LOOP
        UPDATE producto
        SET id_padre       = p_ids[1],
            label_variante = trim(p_labels[i])
        WHERE id_producto = p_ids[i];
    END LOOP;
END;
$$;


-- ================================================================
-- 3. CALZADO — tallas N°XX
--    Detecta automáticamente todos los grupos con > 1 producto
--    que comparten la misma descripción base (sin el "N°XX").
--    El padre queda con la talla más chica.
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s*N°\s*\d+', '')) AS base,
                (regexp_match(descripcion, 'N°\s*(\d+)'))[1]::INT    AS talla_num,
                (regexp_match(descripcion, '(N°\s*\d+)'))[1]         AS label
            FROM producto
            WHERE descripcion ~* 'N°\s*\d+'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY talla_num) AS ids,
            array_agg(label       ORDER BY talla_num) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 4. ROPA — tallas de vestimenta (tres formatos distintos)
-- ================================================================

-- Orden de tallas para comparación
CREATE TEMP TABLE _orden_talla (label TEXT, ord INT) ON COMMIT DROP;
INSERT INTO _orden_talla VALUES
    ('XS',0),('S',1),('M',2),('L',3),('XL',4),('XXL',5),('XXXL',6),
    ('T.M',2),('T.L',3),('T.XL',4),('T.XXL',5),
    ('T-M',2),('T-L',3),('T-XL',4),('T-XXL',5),
    ('T/M',2),('T/L',3),('T/XL',4),('T/XXL',5),
    ('T.S',1),('T-S',1),('T/S',1),
    ('44',0),('46',1),('48',2),('50',3),('52',4),('54',5),('56',6),('58',7);

-- 4a. Formato "T.M / T.L / T.XL / T.XXL"
DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+T\.(M|L|XL|XXL|XXXL|S)\b', '')) AS base,
                (regexp_match(descripcion, 'T\.(M|L|XL|XXL|XXXL|S)'))[1]              AS raw
            FROM producto
            WHERE descripcion ~* '\bT\.(M|L|XL|XXL)\b'
              AND id_padre IS NULL
        ),
        ordered AS (
            SELECT p.id_producto, p.base, 'T.' || p.raw AS label,
                   coalesce(o.ord, 99)                  AS ord
            FROM parsed p
            LEFT JOIN _orden_talla o ON o.label = 'T.' || p.raw
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY ord) AS ids,
            array_agg(label       ORDER BY ord) AS labs
        FROM ordered
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;

-- 4b. Formato "T-XL / T-XXL / T-48 / T-50 ..."
DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+T-\w+', '')) AS base,
                (regexp_match(descripcion, 'T-(\w+)'))[1]          AS raw
            FROM producto
            WHERE descripcion ~* '\bT-(M|L|XL|XXL|\d{2})\b'
              AND id_padre IS NULL
        ),
        ordered AS (
            SELECT p.id_producto, p.base, 'T-' || p.raw AS label,
                   coalesce(o.ord, p.raw::INT)           AS ord
            FROM parsed p
            LEFT JOIN _orden_talla o ON o.label = 'T-' || p.raw
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY ord) AS ids,
            array_agg(label       ORDER BY ord) AS labs
        FROM ordered
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;

-- 4c. Formato "T/M / T/L / T/XL / T/XXL"
DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+T/(M|L|XL|XXL|XXXL)\b', '')) AS base,
                (regexp_match(descripcion, 'T/(M|L|XL|XXL|XXXL)'))[1]              AS raw
            FROM producto
            WHERE descripcion ~* '\bT/(M|L|XL|XXL)\b'
              AND id_padre IS NULL
        ),
        ordered AS (
            SELECT p.id_producto, p.base, 'T/' || p.raw AS label,
                   coalesce(o.ord, 99)                   AS ord
            FROM parsed p
            LEFT JOIN _orden_talla o ON o.label = 'T/' || p.raw
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY ord) AS ids,
            array_agg(label       ORDER BY ord) AS labs
        FROM ordered
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;

-- 4d. Guantes por "TALLA X" numérica
DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+TALLA\s+\d+', ''))  AS base,
                (regexp_match(descripcion, 'TALLA\s+(\d+)'))[1]::INT     AS talla_num,
                'TALLA ' || (regexp_match(descripcion, 'TALLA\s+(\d+)'))[1] AS label
            FROM producto
            WHERE descripcion ~* 'TALLA\s+\d+'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY talla_num) AS ids,
            array_agg(label       ORDER BY talla_num) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 5. ELECTRODOS — diámetros fraccionarios
--    El label incluye fracción y milímetros cuando están presentes.
--    Ej: "3/32 (2.4 MM)"  |  "1/8 (1KG)"  |  "5/32"
--
--    Base = todo antes del último patrón "fracción + paréntesis"
--    Ordenados por diámetro ascendente (3/32 < 1/8 < 5/32 < 3/16).
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                -- Base: quitar desde el primer fraccionario al final
                trim(regexp_replace(
                    descripcion,
                    '\s+\d+/\d+.*$', ''
                ))                                                             AS base,
                -- Label: desde el primer fraccionario al final (limpio)
                trim((regexp_match(descripcion, '(\d+/\d+.*)'))[1])           AS label,
                -- Numerador y denominador para ordenar
                (regexp_match(descripcion, '(\d+)/(\d+)'))[1]::FLOAT          AS num,
                (regexp_match(descripcion, '(\d+)/(\d+)'))[2]::FLOAT          AS den
            FROM producto
            WHERE descripcion ~* '^\s*ELECTRODO\b'
              AND descripcion ~ '\d+/\d+'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY num/den) AS ids,
            array_agg(label       ORDER BY num/den) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 6. VARILLAS TIG / APORTE TIG — diámetros fraccionarios
--    Mismo patrón que electrodos.
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+\d+/\d+.*$', '')) AS base,
                trim((regexp_match(descripcion, '(\d+/\d+.*)'))[1])    AS label,
                (regexp_match(descripcion, '(\d+)/(\d+)'))[1]::FLOAT   AS num,
                (regexp_match(descripcion, '(\d+)/(\d+)'))[2]::FLOAT   AS den
            FROM producto
            WHERE descripcion ~* '^\s*VARILLA\b'
              AND descripcion ~ '\d+/\d+'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY num/den) AS ids,
            array_agg(label       ORDER BY num/den) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 7. ALAMBRE MIG / TUBULAR — diámetro y tamaño de bobina
--    Extrae el diámetro decimal como label, agrupa por base.
--    Ej: "ALAMBRE MIG INDURA 70S-6  0.8X15 SS"
--        "ALAMBRE MIG INDURA 70S-6  1.0X15 SS"
--     → base "ALAMBRE MIG INDURA 70S-6", labels "0.8X15", "1.0X15"
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(
                    descripcion,
                    '\s+\d+[.,]\d+\s*(X\s*\d+[\s,.]?\d*\s*(KG|SS|SP\d*KG)?|MM(\s*\d+KG)?)\s*$',
                    '', 'i'
                ))                                                                AS base,
                trim((regexp_match(
                    descripcion,
                    '(\d+[.,]\d+\s*(?:X\s*\d+[\s,.]?\d*\s*(?:KG|SS|SP\d*KG)?|MM(?:\s*\d+KG)?))\s*$',
                    'i'
                ))[1])                                                            AS label,
                (regexp_match(descripcion, '(\d+)[.,](\d+)'))[1]::FLOAT +
                (regexp_match(descripcion, '(\d+)[.,](\d+)'))[2]::FLOAT / 10     AS dia
            FROM producto
            WHERE descripcion ~* '^\s*ALAMBRE\b'
              AND descripcion ~ '\d+[.,]\d+'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY dia) AS ids,
            array_agg(label       ORDER BY dia) AS labs
        FROM parsed
        WHERE label IS NOT NULL AND label <> ''
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 8. BOQUILLAS MIG (contact tips) — diámetro en MM
--    Ej: "BOQUILLA MIG BINZEL 1.0 MM" → label "1.0 MM"
--    Agrupa por marca/modelo, variante = diámetro.
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(
                    descripcion,
                    '\s+\d+[.,]\d+\s*MM\b', '', 'gi'
                ))                                                    AS base,
                trim((regexp_match(descripcion, '(\d+[.,]\d+\s*MM)'))[1]) AS label,
                (regexp_match(descripcion, '(\d+)[.,](\d+)'))[1]::FLOAT +
                (regexp_match(descripcion, '(\d+)[.,](\d+)'))[2]::FLOAT / 10 AS dia
            FROM producto
            WHERE descripcion ~* '^\s*BOQUILLA\s+MIG\b'
              AND descripcion ~ '\d+[.,]\d+\s*MM'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY dia) AS ids,
            array_agg(label       ORDER BY dia) AS labs
        FROM parsed
        WHERE label IS NOT NULL
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 9. DISCOS ABRASIVOS — tamaño
--    Agrupa por tipo de disco (CORTE / DESBASTE / LAMINADO / DIAMANTADO).
--    Label = medida en pulgadas extraída de la descripción.
--    Ej: "DISCO CORTE 4 1/2X3.2X" → label "4 1/2""
--        "DISCO CORTE 7X3.2X22.2" → label "7""
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                -- Base: tipo de disco + marca/material (quitar desde el tamaño en adelante)
                trim(regexp_replace(
                    descripcion,
                    '\s+\d[\s\d/½"]*[Xx].*$', ''
                ))                                                        AS base,
                -- Label: tamaño en pulgadas
                trim((regexp_match(descripcion, '(\d[\d\s/½"]+(?:[Xx][\d.,]+)+)'))[1]) AS label,
                -- Para ordenar: diámetro numérico
                CASE
                    WHEN descripcion ~ '4\s*1/2' THEN 4.5
                    WHEN descripcion ~ '^\S+\s+\S+\s+7\b' THEN 7.0
                    WHEN descripcion ~ '^\S+\s+\S+\s+9\b' THEN 9.0
                    WHEN descripcion ~ '14\b'              THEN 14.0
                    ELSE 0
                END AS ord
            FROM producto
            WHERE descripcion ~* '^\s*DISCO\s+(CORTE|DESBASTE|LAMINADO|DIAMANTADO)\b'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY ord, id_producto) AS ids,
            array_agg(label       ORDER BY ord, id_producto) AS labs
        FROM parsed
        WHERE label IS NOT NULL AND label <> ''
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 10. BROCAS — diámetro en MM
--     Ej: "BROCA CONCRETO 4X70 MM. MAKITA D-05234" → label "4MM"
--         "BROCA ADDISON HSS 10 MM" → label "10 MM"
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(
                    descripcion,
                    '\s+\d+[.,]?\d*\s*(X\d+\s*)?MM.*$', '', 'i'
                ))                                                             AS base,
                trim((regexp_match(descripcion, '(\d+[.,]?\d*\s*(?:X\d+\s*)?MM[^)]*)'))[1]) AS label,
                (regexp_match(descripcion, '(\d+)[.,]?\d*\s*(?:X\d+\s*)?MM'))[1]::FLOAT     AS dia
            FROM producto
            WHERE descripcion ~* '^\s*BROCA\b'
              AND descripcion ~* '\d+\s*MM'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY dia) AS ids,
            array_agg(label       ORDER BY dia) AS labs
        FROM parsed
        WHERE label IS NOT NULL AND label <> ''
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 11. PISTOLAS TIG — amperaje
--     Ej: "PISTOLA TIG 125 AMP.WP-9V-12-R(12 LARGO)"
--         "PISTOLA TIG 150 A.WP-17V-12-R"
--         "PISTOLA TIG 200 AMP.WP-26V-25"
--     Base = modelo de pistola (WP-9, WP-17, WP-26)
--     Label = amperaje
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                -- Base: quitar amperaje del nombre
                trim(regexp_replace(
                    descripcion,
                    '\s+\d+\s*(AMP\.|A\.)\s*', ' ', 'gi'
                ))                                                          AS base,
                (regexp_match(descripcion, '(\d+)\s*(AMP\.|A\.)'))[1]     AS amp_str,
                (regexp_match(descripcion, '(\d+)\s*(AMP\.|A\.)'))[1]::INT AS amp_num
            FROM producto
            WHERE descripcion ~* '^\s*PISTOLA\s+TIG\b'
              AND descripcion ~* '\d+\s*(AMP|A)\.'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY amp_num) AS ids,
            array_agg(amp_str || 'A' ORDER BY amp_num) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- 12. GRATAS CIRCULARES — acero vs inox (material como variante)
--     Los sufijos -IN (inox) se agrupan con su versión en acero.
--     Ej: "GRATA CIRCULAR ACERO ONDULADO 104-3-30"  (acero)
--         "GRATA CIRCULAR ACERO INOXIDABLE ONDULADO 104-3-IN" (inox)
--     Base = tipo + perfil (ej. "GRATA CIRCULAR ONDULADO 104-3")
--     Label = "Acero" / "Acero Inoxidable"
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                -- Normalizar: quitar "INOXIDABLE", "-IN" al final del código
                trim(regexp_replace(
                    regexp_replace(descripcion, '\s+INOXIDABLE', '', 'gi'),
                    '-IN\b', '', 'gi'
                ))                                                                   AS base,
                CASE
                    WHEN descripcion ~* 'INOXIDABLE' OR descripcion ~* '-IN\b'
                    THEN 'Acero Inox'
                    ELSE 'Acero'
                END                                                                  AS label,
                CASE
                    WHEN descripcion ~* 'INOXIDABLE' OR descripcion ~* '-IN\b'
                    THEN 1 ELSE 0
                END                                                                  AS ord
            FROM producto
            WHERE descripcion ~* '^\s*GRATA\b'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY ord) AS ids,
            array_agg(label       ORDER BY ord) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
          AND count(*) = 2  -- solo grupos de exactamente 2 (acero + inox)
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- LIMPIEZA: eliminar función auxiliar temporal
-- ================================================================
DROP FUNCTION IF EXISTS _agrupar_variantes(INT[], TEXT, TEXT[]);


-- ================================================================
-- VERIFICACIÓN (ejecutar antes de COMMIT para revisar resultados)
-- ================================================================

-- Resumen de grupos creados:
/*
SELECT
    p.descripcion   AS padre,
    p.label_variante AS label_padre,
    count(h.id_producto) AS num_variantes
FROM producto p
LEFT JOIN producto h ON h.id_padre = p.id_producto
WHERE p.tiene_variantes = TRUE
GROUP BY p.id_producto, p.descripcion, p.label_variante
ORDER BY num_variantes DESC, p.descripcion;
*/

-- Ver todas las variantes de un producto específico:
/*
SELECT id_producto, descripcion, label_variante, codigo, precio, stock
FROM producto
WHERE id_padre = <ID_DEL_PADRE>
   OR id_producto = <ID_DEL_PADRE>
ORDER BY label_variante;
*/

-- Contar productos afectados:
/*
SELECT
    'Padres con variantes' AS tipo, count(*) FROM producto WHERE tiene_variantes = TRUE
UNION ALL
SELECT 'Productos variante',           count(*) FROM producto WHERE id_padre IS NOT NULL
UNION ALL
SELECT 'Productos sin variantes',      count(*) FROM producto WHERE tiene_variantes = FALSE AND id_padre IS NULL;
*/

COMMIT;


-- ================================================================
-- ROLLBACK — ejecutar solo si necesitas revertir la migración
-- ================================================================
/*
BEGIN;
UPDATE producto SET tiene_variantes = FALSE, id_padre = NULL, label_variante = NULL;
ALTER TABLE producto
    DROP COLUMN IF EXISTS tiene_variantes,
    DROP COLUMN IF EXISTS id_padre,
    DROP COLUMN IF EXISTS label_variante;
DROP INDEX IF EXISTS idx_producto_id_padre;
COMMIT;
*/
