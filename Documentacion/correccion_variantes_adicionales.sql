-- ================================================================
-- CORRECCIÓN: Variantes adicionales no detectadas
-- Fecha: 2026-06-05
--
-- Ejecutar DESPUÉS de migracion_variantes_productos.sql.
-- Cubre 21 grupos que la migración inicial no detectó porque
-- sus descripciones no siguen los patrones esperados.
--
-- ROLLBACK al final del archivo.
-- ================================================================

BEGIN;

-- Reutilizar la misma función auxiliar
CREATE OR REPLACE FUNCTION _agrupar_variantes(
    p_ids    INT[],
    p_base   TEXT,
    p_labels TEXT[]
) RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE i INT;
BEGIN
    UPDATE producto
    SET tiene_variantes = TRUE,
        descripcion     = trim(p_base),
        label_variante  = trim(p_labels[1])
    WHERE id_producto = p_ids[1];

    FOR i IN 2 .. array_length(p_ids, 1) LOOP
        UPDATE producto
        SET id_padre       = p_ids[1],
            label_variante = trim(p_labels[i])
        WHERE id_producto = p_ids[i];
    END LOOP;
END;
$$;


-- ================================================================
-- SECCIÓN 1: BOQUILLAS (6 grupos)
-- ================================================================

-- 1a. Boquillas serie 14-XX Tweco (0.8 / 0.9 / 1.0 / 1.2 / 1.6 MM)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)[.,](\d+)'))[1]::FLOAT
                                      + (regexp_match(descripcion,'(\d+)[.,](\d+)'))[2]::FLOAT/10),
        array_agg((regexp_match(descripcion,'(\d+[.,]\d+\s*MM)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)[.,](\d+)'))[1]::FLOAT
                          + (regexp_match(descripcion,'(\d+)[.,](\d+)'))[2]::FLOAT/10)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~ '^\d+-\d+\s+BOQUILLA\s+\d+[.,]\d+\s*MM'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA (serie 14-XX Tweco)', labs);
    END IF;
END $$;

-- 1b. Boquillas 25AK Binzel M6 (0.8 / 0.9 / 1.0 / 1.2 / 1.6 MM)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)[.,](\d+)\s*MM'))[1]::FLOAT
                                      + (regexp_match(descripcion,'(\d+)[.,](\d+)\s*MM'))[2]::FLOAT/10),
        array_agg(trim((regexp_match(descripcion,'(\d+[.,]\d+\s*MM)'))[1])
                  ORDER BY (regexp_match(descripcion,'(\d+)[.,](\d+)\s*MM'))[1]::FLOAT
                          + (regexp_match(descripcion,'(\d+)[.,](\d+)\s*MM'))[2]::FLOAT/10)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* '^25AK\s+BOQUILLA\s+BINZEL\s+M6'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA BINZEL 25AK M6', labs);
    END IF;
END $$;

-- 1c. Boquillas corte serie 102 (102-0 / 102-2 / 102-5)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'102-(\d+)'))[1]::INT),
        array_agg('102-' || (regexp_match(descripcion,'102-(\d+)'))[1]
                  ORDER BY (regexp_match(descripcion,'102-(\d+)'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* '^BOQUILLA CORTE 102-\d+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA CORTE (serie 102)', labs);
    END IF;
END $$;

-- 1d. Boquillas corte propano tipo 106 (106-0 al 106-5)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'106-(\d+)'))[1]::INT),
        array_agg('TIPO 106-' || (regexp_match(descripcion,'106-(\d+)'))[1]
                  ORDER BY (regexp_match(descripcion,'106-(\d+)'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* '^BOQUILLA CORTE PROPANO TIPO 106-\d+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA CORTE PROPANO (serie 106)', labs);
    END IF;
END $$;

-- 1e. Boquillas corte 6290 Acetileno (6290-00AC a 6290-6AC)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'(6290-\w+AC)'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'BOQUILLA CORTE 6290-\w+AC'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA CORTE 6290 (Acetileno)', labs);
    END IF;
END $$;

-- 1f. Boquillas corte 6290 NX (6290-00NX a 6290-6NX)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'(6290-\w+NX)'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'BOQUILLA CORTE 6290-\w+NX'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA CORTE 6290 (NX)', labs);
    END IF;
END $$;

-- 1g. Boquillas calentar propano 2290 (2290-1H al 2290-5H)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'2290-(\d+)H'))[1]::INT),
        array_agg('2290-' || (regexp_match(descripcion,'2290-(\d+)H'))[1] || 'H'
                  ORDER BY (regexp_match(descripcion,'2290-(\d+)H'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'BOQUILLA CALENTAR PROPANO 2290-\d+H'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA CALENTAR PROPANO (serie 2290)', labs);
    END IF;
END $$;

-- 1h. Boquillas soldar 23-A-90 (-0, -1, -3, -5, -8, -9)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'23-A-90-(\d+)'))[1]::INT),
        array_agg('N°' || (regexp_match(descripcion,'23-A-90-(\d+)'))[1]
                  ORDER BY (regexp_match(descripcion,'23-A-90-(\d+)'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'BOQUILLA SOLDAR 23-A-90-\d+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'BOQUILLA SOLDAR 23-A-90', labs);
    END IF;
END $$;


-- ================================================================
-- SECCIÓN 2: CILINDROS ALTA PRESIÓN por gas (4 grupos)
-- ================================================================

DO $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN
        WITH parsed AS (
            SELECT
                id_producto,
                trim(regexp_replace(descripcion, '\s+\d+\s*M3\s*$', '')) AS base,
                (regexp_match(descripcion, '(\d+)\s*M3\s*$'))[1]::INT    AS m3,
                (regexp_match(descripcion, '(\d+)\s*M3\s*$'))[1] || ' M3' AS label
            FROM producto
            WHERE descripcion ~* 'CILINDRO ALTA PRESION PARA \w+ \d+ M3'
              AND id_padre IS NULL
        )
        SELECT
            base,
            array_agg(id_producto ORDER BY m3) AS ids,
            array_agg(label       ORDER BY m3) AS labs
        FROM parsed
        GROUP BY base
        HAVING count(*) > 1
    LOOP
        PERFORM _agrupar_variantes(rec.ids, rec.base, rec.labs);
    END LOOP;
END $$;


-- ================================================================
-- SECCIÓN 3: CABLES DE SOLDAR (2 grupos)
-- ================================================================

-- 3a. Cable soldar AWG Nehering (1/0, 2/0, 3/0)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'AWG\s+(\d+)/0'))[1]::INT),
        array_agg('AWG ' || (regexp_match(descripcion,'AWG\s+(\d+)/0'))[1] || '/0'
                  ORDER BY (regexp_match(descripcion,'AWG\s+(\d+)/0'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'CABLE SOLDAR AWG \d+/0'
      AND descripcion ~* 'NEHERING'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'CABLE SOLDAR AWG NEHERING', labs);
    END IF;
END $$;

-- 3b. Cable soldar NN (3, 4, 6 AWG)
--     Ordenado de mayor a menor sección (6 AWG = más fino → primero)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'NN\s+(\d+)\s+AWG'))[1]::INT DESC),
        array_agg((regexp_match(descripcion,'NN\s+(\d+)\s+AWG'))[1] || ' AWG'
                  ORDER BY (regexp_match(descripcion,'NN\s+(\d+)\s+AWG'))[1]::INT DESC)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'CABLE SOLDAR NN \d+ AWG'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'CABLE SOLDAR NN', labs);
    END IF;
END $$;


-- ================================================================
-- SECCIÓN 4: TUNGSTENOS TIG
-- ================================================================

-- Agrupa los 3 tungstenos 2% torio: 1/16, 3/32, 1/8
-- Nota: "THORIO" en código 1002697 es typo de "TORIO" — se unifica igual
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto
                  ORDER BY (regexp_match(descripcion,'(\d+)/(\d+)'))[1]::FLOAT /
                           (regexp_match(descripcion,'(\d+)/(\d+)'))[2]::FLOAT),
        array_agg(trim((regexp_match(descripcion,'(\d+/\d+)'))[1])
                  ORDER BY (regexp_match(descripcion,'(\d+)/(\d+)'))[1]::FLOAT /
                           (regexp_match(descripcion,'(\d+)/(\d+)'))[2]::FLOAT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'TUNGSTENO 2%'
      AND descripcion ~ '\d+/\d+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'TUNGSTENO TIG 2% TORIO', labs);
    END IF;
END $$;


-- ================================================================
-- SECCIÓN 5: GRAMPA TIERRA y PORTAELECTRODO por amperaje (4 grupos)
-- ================================================================

-- 5a. Grampa tierra genérica (300 AMPS, 500 AMPS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT),
        array_agg((regexp_match(descripcion,'(\d+\s*AMPS?)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* '^GRAMPA TIERRA \d+ AMPS?\s*$'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'GRAMPA TIERRA', labs);
    END IF;
END $$;

-- 5b. Grampa tierra Lenco (300 AMPS, 500 AMPS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT),
        array_agg((regexp_match(descripcion,'(\d+\s*AMPS?)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'GRAMPA TIERRA LENCO \d+ AMPS?'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'GRAMPA TIERRA LENCO', labs);
    END IF;
END $$;

-- 5c. Portaelectrodo genérico (300 AMPS, 500 AMPS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT),
        array_agg((regexp_match(descripcion,'(\d+\s*AMPS?)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* '^PORTAELECTRODO \d+ AMPS?\s*$'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'PORTAELECTRODO', labs);
    END IF;
END $$;

-- 5d. Portaelectrodo Lenco (300 AMPS, 500 AMPS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT),
        array_agg((regexp_match(descripcion,'(\d+\s*AMPS?)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)\s*AMPS?'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'PORTAELECTRODO LENCO \d+ AMPS?'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'PORTAELECTRODO LENCO', labs);
    END IF;
END $$;


-- ================================================================
-- SECCIÓN 6: COMPRESORES KRAFTER por capacidad
-- ================================================================

DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY (regexp_match(descripcion,'(\d+)\s*LTS'))[1]::INT),
        array_agg((regexp_match(descripcion,'(\d+\s*LTS)'))[1]
                  ORDER BY (regexp_match(descripcion,'(\d+)\s*LTS'))[1]::INT)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'COMPRESOR KRAFTER \d+ LTS'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'COMPRESOR KRAFTER', labs);
    END IF;
END $$;


-- ================================================================
-- SECCIÓN 7: EQUIPOS DE PROTECCIÓN PERSONAL — variantes de color
-- ================================================================

-- 7a. Casco de seguridad EVO III (ROJO, VERDE, AZUL, AMARILLO, BLANCO, GRIS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'EVO III\s+(\w+)'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'CASCO DE SEGURIDAD EVO III\s+\w+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'CASCO DE SEGURIDAD EVO III', labs);
    END IF;
END $$;

-- 7b. Lente MAN ALFA AF (CLARO, GRIS, IN-OUT)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'ALFA AF\s+(.+)$'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'LENTE MAN ALFA AF\s+\w+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'LENTE MAN ALFA AF', labs);
    END IF;
END $$;

-- 7c. Lente MAN FOX EVA (CLARO, IN-OUT, GRIS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'FOX EVA\s+(.+)$'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'LENTE MAN FOX EVA\s+\w+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'LENTE MAN FOX EVA', labs);
    END IF;
END $$;

-- 7d. Lente MAN ECO (CLARO, GRIS)
DO $$
DECLARE ids INT[]; labs TEXT[];
BEGIN
    SELECT
        array_agg(id_producto ORDER BY descripcion),
        array_agg(trim((regexp_match(descripcion,'ECO\s+(.+)$'))[1])
                  ORDER BY descripcion)
    INTO ids, labs
    FROM producto
    WHERE descripcion ~* 'LENTE MAN ECO\s+\w+'
      AND id_padre IS NULL;

    IF array_length(ids,1) > 1 THEN
        PERFORM _agrupar_variantes(ids, 'LENTE MAN ECO', labs);
    END IF;
END $$;


-- ================================================================
-- LIMPIEZA
-- ================================================================
DROP FUNCTION IF EXISTS _agrupar_variantes(INT[], TEXT, TEXT[]);


-- ================================================================
-- VERIFICACIÓN (descomentar para revisar antes de COMMIT)
-- ================================================================

-- Grupos creados por ESTA corrección:
/*
SELECT p.descripcion AS padre, count(h.id_producto) AS variantes
FROM producto p
JOIN producto h ON h.id_padre = p.id_producto
WHERE p.tiene_variantes = TRUE
  AND p.descripcion IN (
    'BOQUILLA (serie 14-XX Tweco)',
    'BOQUILLA BINZEL 25AK M6',
    'BOQUILLA CORTE (serie 102)',
    'BOQUILLA CORTE PROPANO (serie 106)',
    'BOQUILLA CORTE 6290 (Acetileno)',
    'BOQUILLA CORTE 6290 (NX)',
    'BOQUILLA CALENTAR PROPANO (serie 2290)',
    'BOQUILLA SOLDAR 23-A-90',
    'CABLE SOLDAR AWG NEHERING',
    'CABLE SOLDAR NN',
    'TUNGSTENO TIG 2% TORIO',
    'GRAMPA TIERRA',
    'GRAMPA TIERRA LENCO',
    'PORTAELECTRODO',
    'PORTAELECTRODO LENCO',
    'COMPRESOR KRAFTER',
    'CASCO DE SEGURIDAD EVO III',
    'LENTE MAN ALFA AF',
    'LENTE MAN FOX EVA',
    'LENTE MAN ECO'
  )
GROUP BY p.descripcion
ORDER BY p.descripcion;
*/

-- Conteo total actualizado:
/*
SELECT
  'Padres con variantes'   AS tipo, count(*) FROM producto WHERE tiene_variantes = TRUE
UNION ALL
SELECT 'Variantes hijas',          count(*) FROM producto WHERE id_padre IS NOT NULL
UNION ALL
SELECT 'Productos simples',        count(*) FROM producto WHERE tiene_variantes = FALSE AND id_padre IS NULL;
*/

COMMIT;


-- ================================================================
-- ROLLBACK — solo si necesitas revertir ESTA corrección
-- ================================================================
/*
BEGIN;
-- Revertir los grupos de esta corrección específica
UPDATE producto
SET tiene_variantes = FALSE, label_variante = NULL, descripcion = descripcion
WHERE descripcion IN (
    'BOQUILLA (serie 14-XX Tweco)', 'BOQUILLA BINZEL 25AK M6',
    'BOQUILLA CORTE (serie 102)', 'BOQUILLA CORTE PROPANO (serie 106)',
    'BOQUILLA CORTE 6290 (Acetileno)', 'BOQUILLA CORTE 6290 (NX)',
    'BOQUILLA CALENTAR PROPANO (serie 2290)', 'BOQUILLA SOLDAR 23-A-90',
    'CABLE SOLDAR AWG NEHERING', 'CABLE SOLDAR NN',
    'TUNGSTENO TIG 2% TORIO', 'GRAMPA TIERRA', 'GRAMPA TIERRA LENCO',
    'PORTAELECTRODO', 'PORTAELECTRODO LENCO', 'COMPRESOR KRAFTER',
    'CASCO DE SEGURIDAD EVO III', 'LENTE MAN ALFA AF',
    'LENTE MAN FOX EVA', 'LENTE MAN ECO'
);
-- Para restaurar las descripciones originales de los hijos
-- necesitarías un backup previo. Por eso se recomienda hacer
-- un SNAPSHOT antes de correr cualquier migración.
COMMIT;
*/
