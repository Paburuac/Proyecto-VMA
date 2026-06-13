-- ============================================================
-- Migración: agregar columna descripcion_corta a producto
-- Ejecutar en Supabase SQL Editor
-- ============================================================

ALTER TABLE producto
  ADD COLUMN IF NOT EXISTS descripcion_corta TEXT;

-- ============================================================
-- GASES — Acetileno
-- ============================================================
UPDATE producto SET descripcion_corta = 'Gas combustible de alta energía para soldadura y corte oxiacetilénico.'
WHERE descripcion ILIKE '%ACETILENO%' AND descripcion NOT ILIKE '%CILINDRO%'
  AND descripcion NOT ILIKE '%BOQUILLA%' AND descripcion NOT ILIKE '%MANGO%'
  AND descripcion NOT ILIKE '%EQUIPO%' AND descripcion NOT ILIKE '%MANGUERA%'
  AND descripcion NOT ILIKE '%REGULADOR%' AND descripcion NOT ILIKE '%ADAPTADOR%'
  AND descripcion NOT ILIKE '%VALVULA%';

-- GASES — Oxígeno (gas/servicio)
UPDATE producto SET descripcion_corta = 'Gas oxidante para corte y soldadura con llama oxiacetilénica.'
WHERE descripcion ILIKE '%OXIGENO%' AND descripcion NOT ILIKE '%CILINDRO%'
  AND descripcion NOT ILIKE '%REGULADOR%' AND descripcion NOT ILIKE '%VALVULA%'
  AND descripcion NOT ILIKE '%TUERCA%' AND descripcion NOT ILIKE '%GOLILLA%'
  AND descripcion NOT ILIKE '%TRASVASIJADOR%' AND descripcion NOT ILIKE '%ARRIENDO%'
  AND descripcion NOT ILIKE '%CONEXION%' AND descripcion NOT ILIKE '%ADAPTADOR%';

-- GASES — Nitrógeno líquido
UPDATE producto SET descripcion_corta = 'Gas inerte criogénico para refrigeración, purga y pruebas de instalaciones.'
WHERE descripcion ILIKE '%NITROGENO LIQUIDO%';

-- GASES — Nitrógeno (gas)
UPDATE producto SET descripcion_corta = 'Gas inerte para purga, presurización y pruebas de estanqueidad.'
WHERE descripcion ILIKE '%NITROGENO%' AND descripcion NOT ILIKE '%LIQUIDO%'
  AND descripcion NOT ILIKE '%CILINDRO%' AND descripcion NOT ILIKE '%REGULADOR%'
  AND descripcion NOT ILIKE '%ADAPTADOR%';

-- GASES — Argón (gas)
UPDATE producto SET descripcion_corta = 'Gas inerte de protección para soldadura TIG y MIG/MAG.'
WHERE descripcion ILIKE '%ARGON%' AND descripcion NOT ILIKE '%CILINDRO%'
  AND descripcion NOT ILIKE '%REGULADOR%' AND descripcion NOT ILIKE '%CONEXION%';

-- ============================================================
-- CILINDROS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Envase de alta presión para almacenamiento y transporte de oxígeno industrial.'
WHERE descripcion ILIKE '%CILINDRO%' AND descripcion ILIKE '%OXIGENO%';

UPDATE producto SET descripcion_corta = 'Envase de alta presión para almacenamiento y transporte de argón industrial.'
WHERE descripcion ILIKE '%CILINDRO%' AND descripcion ILIKE '%ARGON%';

UPDATE producto SET descripcion_corta = 'Envase de alta presión para almacenamiento y transporte de nitrógeno industrial.'
WHERE descripcion ILIKE '%CILINDRO%' AND descripcion ILIKE '%NITROGENO%';

UPDATE producto SET descripcion_corta = 'Envase de seguridad para acetileno disuelto; portátil o tamaño estándar.'
WHERE descripcion ILIKE '%CILINDRO%' AND descripcion ILIKE '%ACETILENO%';

-- ============================================================
-- REGULADORES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Regulador de presión de dos etapas para suministro controlado de oxígeno.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%OXIGENO%'
  AND descripcion NOT ILIKE '%FLUJOMETRO%';

UPDATE producto SET descripcion_corta = 'Regulador de presión para suministro seguro de acetileno.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%ACETILENO%';

UPDATE producto SET descripcion_corta = 'Regulador de alta presión para nitrógeno industrial.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%NITROGENO%'
  AND descripcion NOT ILIKE '%FLUJOMETRO%';

UPDATE producto SET descripcion_corta = 'Regulador con flujómetro integrado para control de caudal en procesos TIG/MIG.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%ARGON%'
  AND descripcion ILIKE '%FLUJOMETRO%';

UPDATE producto SET descripcion_corta = 'Regulador con flujómetro integrado para control de caudal de argón.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%ARGON%'
  AND descripcion NOT ILIKE '%FLUJOMETRO%';

UPDATE producto SET descripcion_corta = 'Regulador con doble flujómetro para alimentar dos procesos simultáneos con argón.'
WHERE descripcion ILIKE '%REGULADOR%' AND descripcion ILIKE '%FLUJOMETRO DUAL%';

UPDATE producto SET descripcion_corta = 'Flujómetro para control de caudal de argón en procesos de soldadura.'
WHERE descripcion ILIKE '%FLUJOMETRO%' AND descripcion ILIKE '%ARGON%'
  AND descripcion NOT ILIKE '%REGULADOR%';

-- ============================================================
-- MÁQUINAS DE SOLDAR
-- ============================================================
UPDATE producto SET descripcion_corta = 'Máquina inversora multiproceso MMA/TIG para electrodo revestido y TIG.'
WHERE descripcion ILIKE '%MAQUINA%SOLDAR%' AND (descripcion ILIKE '%MMA%' OR descripcion ILIKE '%TIG%')
  AND descripcion NOT ILIKE '%MIG%';

UPDATE producto SET descripcion_corta = 'Inversora multiproceso MMA/MIG/TIG; apta para electrodo, TIG y MIG continuo.'
WHERE descripcion ILIKE '%MAQUINA%SOLDAR%' AND descripcion ILIKE '%MIG%' AND descripcion ILIKE '%TIG%';

UPDATE producto SET descripcion_corta = 'Máquina inversora para soldadura MIG continua con regulación de voltaje y velocidad.'
WHERE descripcion ILIKE '%MAQUINA%SOLDAR%' AND descripcion ILIKE '%MIG%' AND descripcion NOT ILIKE '%TIG%';

UPDATE producto SET descripcion_corta = 'Máquina inversora para soldadura por electrodo revestido (MMA).'
WHERE descripcion ILIKE '%MAQUINA%SOLDAR%' AND descripcion ILIKE '%MMA%'
  AND descripcion NOT ILIKE '%TIG%' AND descripcion NOT ILIKE '%MIG%';

UPDATE producto SET descripcion_corta = 'Máquina inversora para soldadura por electrodo revestido (MMA).'
WHERE descripcion ILIKE '%MAQUINA%SOLDAR%'
  AND descripcion NOT ILIKE '%MMA%' AND descripcion NOT ILIKE '%TIG%'
  AND descripcion NOT ILIKE '%MIG%' AND descripcion_corta IS NULL;

-- ============================================================
-- EQUIPOS SOLDAR/CORTAR OXIACETILÉNICO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Kit portátil para soldadura y corte oxiacetilénico en terreno; incluye cilindros pequeños.'
WHERE descripcion ILIKE '%EQUIPO PORTATIL%' OR descripcion ILIKE '%PORTATIL SOLDAR%';

UPDATE producto SET descripcion_corta = 'Kit completo para soldadura y corte oxiacetilénico; incluye soplete, reguladores y accesorios.'
WHERE descripcion ILIKE '%EQUIPO SOLDAR%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Kit completo para soldadura y corte oxiacetilénico; incluye soplete, reguladores y accesorios.'
WHERE descripcion ILIKE '%EQUIPO%JOURNEYMAN%';

UPDATE producto SET descripcion_corta = 'Maletín portátil completo para soldadura y corte oxiacetilénico.'
WHERE descripcion ILIKE '%MALETA SOLDAR%';

-- ============================================================
-- MANGOS / SOPLETES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Soplete para soldadura oxiacetilénica; compatible con boquillas estándar.'
WHERE descripcion ILIKE '%MANGO PARA SOLDAR%' OR descripcion ILIKE '%MANGO SOLDAR%';

-- ============================================================
-- CABLES DE SOLDAR
-- ============================================================
UPDATE producto SET descripcion_corta = 'Cable de alta flexibilidad para retorno de corriente en procesos de soldadura eléctrica.'
WHERE descripcion ILIKE '%CABLE SOLDAR%';

-- ============================================================
-- BOQUILLAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Boquilla de soldadura para soplete oxiacetilénico; seleccionar número según espesor a soldar.'
WHERE (descripcion ILIKE '%BOQUILLA SOLDAR%' OR descripcion ILIKE '%BOQUILLA ACETILENO%')
  AND descripcion NOT ILIKE '%VICTOR%';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura Victor para soplete oxiacetilénico; seleccionar número según espesor.'
WHERE descripcion ILIKE '%BOQUILLA%' AND descripcion ILIKE '%VICTOR%';

-- ============================================================
-- MANGUERAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Manguera doble para oxígeno y acetileno; apta para trabajo industrial continuo.'
WHERE descripcion ILIKE '%MANG%' AND descripcion ILIKE '%ACETILENO%';

UPDATE producto SET descripcion_corta = 'Manguera flexible para conducción de gas industrial a presión.'
WHERE descripcion ILIKE '%MANGUERA%' AND descripcion_corta IS NULL;

-- ============================================================
-- MASCARAS / EPP
-- ============================================================
UPDATE producto SET descripcion_corta = 'Careta fotosensible de oscurecimiento automático para soldadura eléctrica.'
WHERE descripcion ILIKE '%MASCARA%SOLDAR%' AND descripcion ILIKE '%FOTOSENSIBLE%';

UPDATE producto SET descripcion_corta = 'Careta protectora para soldadura eléctrica; compatible con casco de seguridad.'
WHERE descripcion ILIKE '%MASCARA%SOLDAR%' AND descripcion ILIKE '%CASCO%';

UPDATE producto SET descripcion_corta = 'Careta protectora para soldadura eléctrica.'
WHERE descripcion ILIKE '%MASCARA%SOLDAR%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Lentes de protección ocular para soldadura oxiacetilénica.'
WHERE descripcion ILIKE '%ANTIPARRA%';

-- ============================================================
-- CONEXIONES / ADAPTADORES / ACCESORIOS DE GAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Válvula de conexión rápida para líneas de oxígeno industrial.'
WHERE descripcion ILIKE '%VALVULA ACOPLE%' AND descripcion ILIKE '%OXIGENO%';

UPDATE producto SET descripcion_corta = 'Adaptador de conexión para equipos de nitrógeno.'
WHERE descripcion ILIKE '%ADAPTADOR%' AND descripcion ILIKE '%NITROGENO%';

UPDATE producto SET descripcion_corta = 'Adaptador de conexión para equipos de acetileno.'
WHERE descripcion ILIKE '%ADAPTADOR%' AND descripcion ILIKE '%ACETILENO%';

UPDATE producto SET descripcion_corta = 'Tuerca de conexión para reguladores y equipos de oxígeno.'
WHERE descripcion ILIKE '%TUERCA%' AND descripcion ILIKE '%OXIGENO%';

UPDATE producto SET descripcion_corta = 'Golilla de sellado para conexiones de equipos de oxígeno (Harris).'
WHERE descripcion ILIKE '%GOLILLA%' AND descripcion ILIKE '%OXIGENO%';

UPDATE producto SET descripcion_corta = 'Conexión para reguladores de argón (Harris).'
WHERE descripcion ILIKE '%CONEXION%' AND descripcion ILIKE '%ARGON%';

UPDATE producto SET descripcion_corta = 'Dispositivo para transvase seguro de oxígeno entre cilindros.'
WHERE descripcion ILIKE '%TRASVASIJADOR%';

-- ============================================================
-- SERVICIOS / ARRIENDO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Servicio de arriendo de equipo de oxigenoterapia para uso médico o industrial.'
WHERE descripcion ILIKE '%ARRIENDO%OXIGENOTERAPIA%';

-- ============================================================
-- ALAMBRE DE SOLDADURA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre de aporte para soldadura MIG/MAG continua.'
WHERE descripcion ILIKE '%ALAMBRE%' AND descripcion_corta IS NULL;

-- ============================================================
-- DISCOS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Disco abrasivo para corte o desbaste de metales ferrosos.'
WHERE descripcion ILIKE '%DISCO%' AND descripcion_corta IS NULL;

-- ============================================================
-- GRATAS / ESCOBILLAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Grata o escobilla metálica para limpieza de cordones de soldadura.'
WHERE (descripcion ILIKE '%GRATA%' OR descripcion ILIKE '%ESCOBILLA%') AND descripcion_corta IS NULL;

-- ============================================================
-- CALZADO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Calzado de seguridad con punta de acero para ambiente industrial.'
WHERE (descripcion ILIKE '%BOTIN%' OR descripcion ILIKE '%ZAPATO%' OR descripcion ILIKE '%CALZADO%')
  AND descripcion_corta IS NULL;

-- ============================================================
-- CUIDADO PERSONAL
-- ============================================================
UPDATE producto SET descripcion_corta = 'Elemento de protección personal para uso en entornos de soldadura o trabajo industrial.'
WHERE descripcion_corta IS NULL
  AND id_categoria = (SELECT id_categoria FROM categoria WHERE nombre_categoria = 'CUIDADO PERSONAL' LIMIT 1);

-- ============================================================
-- Fallback genérico para productos sin descripción asignada
-- ============================================================
UPDATE producto SET descripcion_corta = 'Producto industrial para soldadura y gases. Consultar disponibilidad.'
WHERE descripcion_corta IS NULL;
