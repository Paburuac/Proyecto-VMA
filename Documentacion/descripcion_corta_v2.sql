-- ============================================================
-- descripcion_corta_v2.sql
-- Descripciones específicas por familia de producto.
-- Ejecutar DESPUÉS de descripcion_corta_productos.sql
-- (la columna ya existe; este script solo hace UPDATEs).
-- ============================================================

-- ============================================================
-- BOQUILLAS DE CORTE OXIACETILÉNICO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 0 (espesores finos hasta 3 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND (descripcion ILIKE '%-0%' OR descripcion LIKE '%00%')
  AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 1 (espesores 3–6 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-1%'
  AND descripcion NOT ILIKE '%-10%' AND descripcion NOT ILIKE '%-12%'
  AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 2 (espesores 6–12 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-2%'
  AND descripcion NOT ILIKE '%-20%' AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 3 (espesores 12–25 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-3%'
  AND descripcion NOT ILIKE '%-30%' AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 4 (espesores 25–50 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-4%'
  AND descripcion NOT ILIKE '%-40%' AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 5 (espesores sobre 50 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-5%'
  AND descripcion NOT ILIKE '%-50%' AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

UPDATE producto SET descripcion_corta = 'Boquilla de corte oxiacetilénico para soplete; número 6 (espesores mayores).'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%-6%'
  AND descripcion NOT ILIKE '%-60%' AND descripcion NOT ILIKE '%PROPANO%' AND descripcion NOT ILIKE '%PLASMA%';

-- BOQUILLAS CORTE PROPANO
UPDATE producto SET descripcion_corta = 'Boquilla de corte para soplete de propano/GLP; número 0 (finos hasta 3 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE PROPANO%' AND (descripcion ILIKE '%-0' OR descripcion ILIKE '%-0 ');

UPDATE producto SET descripcion_corta = 'Boquilla de corte para soplete de propano/GLP; número 2 (6–12 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE PROPANO%' AND descripcion ILIKE '%-2';

UPDATE producto SET descripcion_corta = 'Boquilla de corte para soplete de propano/GLP; número 3 (12–25 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE PROPANO%' AND descripcion ILIKE '%-3';

UPDATE producto SET descripcion_corta = 'Boquilla de corte para soplete de propano/GLP; número 4 (25–50 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE PROPANO%' AND descripcion ILIKE '%-4';

UPDATE producto SET descripcion_corta = 'Boquilla de corte para soplete de propano/GLP; número 5 (sobre 50 mm).'
WHERE descripcion ILIKE '%BOQUILLA CORTE PROPANO%' AND descripcion ILIKE '%-5';

-- BOQUILLAS SOLDAR OXIACETILÉNICO
UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°0; para espesores muy finos.'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-0';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°1; para espesores finos (hasta 1.5 mm).'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-1';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°3; para espesores medios (1.5–3 mm).'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-3';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°5; para espesores medios-gruesos (3–6 mm).'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-5';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°8; para espesores gruesos (6–10 mm).'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-8';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura oxiacetilénica N°9; para espesores muy gruesos (sobre 10 mm).'
WHERE descripcion ILIKE '%BOQUILLA SOLDAR%' AND descripcion ILIKE '%-9';

-- BOQUILLAS CALENTAR
UPDATE producto SET descripcion_corta = 'Boquilla de calentamiento para soplete de propano; llama múltiple para precalentamiento de piezas.'
WHERE descripcion ILIKE '%BOQUILLA CALENTAR%';

-- BOQUILLAS MIG (contacto)
UPDATE producto SET descripcion_corta = 'Boquilla de contacto MIG 0.8 mm para pistola MIG/MAG; transmite corriente al alambre.'
WHERE (descripcion ILIKE '%BOQUILLA MIG%' OR descripcion ILIKE '%BOQUILLA CONT%') AND (descripcion ILIKE '%0.8%' OR descripcion ILIKE '%0,8%');

UPDATE producto SET descripcion_corta = 'Boquilla de contacto MIG 0.9 mm para pistola MIG/MAG; transmite corriente al alambre.'
WHERE descripcion ILIKE '%BOQUILLA MIG%' AND (descripcion ILIKE '%0.9%' OR descripcion ILIKE '%0,9%');

UPDATE producto SET descripcion_corta = 'Boquilla de contacto MIG 1.0 mm para pistola MIG/MAG; transmite corriente al alambre.'
WHERE descripcion ILIKE '%BOQUILLA MIG%' AND (descripcion ILIKE '%1.0%' OR descripcion ILIKE '%1,0%' OR descripcion ILIKE '% 1.0%');

UPDATE producto SET descripcion_corta = 'Boquilla de contacto MIG 1.2 mm para pistola MIG/MAG; transmite corriente al alambre.'
WHERE descripcion ILIKE '%BOQUILLA MIG%' AND (descripcion ILIKE '%1.2%' OR descripcion ILIKE '%1,2%');

UPDATE producto SET descripcion_corta = 'Boquilla de contacto MIG 1.6 mm para pistola MIG/MAG; para alambres de mayor diámetro.'
WHERE descripcion ILIKE '%BOQUILLA MIG%' AND (descripcion ILIKE '%1.6%' OR descripcion ILIKE '%1,6%');

-- BOQUILLAS PORTAELECTRODO TIG
UPDATE producto SET descripcion_corta = 'Boquilla portaelectrodo de tungsteno 1/16" para pistola TIG; fija el electrodo en la antorcha.'
WHERE descripcion ILIKE '%BOQUILLA PORTAELECT%' AND descripcion ILIKE '%1/16%';

UPDATE producto SET descripcion_corta = 'Boquilla portaelectrodo de tungsteno 3/32" para pistola TIG; fija el electrodo en la antorcha.'
WHERE descripcion ILIKE '%BOQUILLA PORTAELECT%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Boquilla portaelectrodo de tungsteno 1/8" para pistola TIG; fija el electrodo en la antorcha.'
WHERE descripcion ILIKE '%BOQUILLA PORTAELECT%' AND descripcion ILIKE '%1/8%';

-- BOQUILLA PLASMA
UPDATE producto SET descripcion_corta = 'Boquilla de desgaste para antorcha de corte plasma P80; requiere reemplazo periódico.'
WHERE descripcion ILIKE '%BOQUILLA PLASMA%' OR (descripcion ILIKE '%BOQUILLA%' AND descripcion ILIKE '%P80%');

UPDATE producto SET descripcion_corta = 'Boquilla de corte para antorcha plasma; define la forma y precisión del arco de corte.'
WHERE descripcion ILIKE '%BOQUILLA CORTE%' AND descripcion ILIKE '%WTC-CUT%';

-- ============================================================
-- TOBERAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Tobera de alúmina 1/4" para pistola TIG; dirige el gas de protección sobre el arco.'
WHERE descripcion ILIKE '%TOBERA ALUMINA%' AND descripcion ILIKE '%1/4%';

UPDATE producto SET descripcion_corta = 'Tobera de alúmina 5/16" para pistola TIG; dirige el gas de protección sobre el arco.'
WHERE descripcion ILIKE '%TOBERA ALUMINA%' AND descripcion ILIKE '%5/16%';

UPDATE producto SET descripcion_corta = 'Tobera de alúmina 3/8" para pistola TIG; dirige el gas de protección sobre el arco.'
WHERE descripcion ILIKE '%TOBERA ALUMINA%' AND descripcion ILIKE '%3/8%';

UPDATE producto SET descripcion_corta = 'Tobera de alúmina 1/2" para pistola TIG; cobertura de gas amplia para piezas grandes.'
WHERE descripcion ILIKE '%TOBERA ALUMINA%' AND descripcion ILIKE '%1/2%';

UPDATE producto SET descripcion_corta = 'Tobera MIG/MAG Binzel serie 36; canaliza el gas de protección alrededor del arco.'
WHERE descripcion ILIKE '%TOBERA MIG BINZEL%' OR (descripcion ILIKE '%TOBERA%' AND descripcion ILIKE '%BINZEL%');

UPDATE producto SET descripcion_corta = 'Tobera cónica para pistola MIG/MAG; facilita el acceso en espacios reducidos.'
WHERE descripcion ILIKE '%TOBERA CONICA%' AND descripcion ILIKE '%MIG%' OR descripcion ILIKE '%TOBERA CONICA BERNARD%';

UPDATE producto SET descripcion_corta = 'Tobera estándar 1/2" para pistola MIG/MAG Bernard; protección de gas en el baño de fusión.'
WHERE descripcion ILIKE '%TOBERA BERNARD%' AND descripcion ILIKE '%1/2%';

UPDATE producto SET descripcion_corta = 'Tobera estándar 3/4" para pistola MIG/MAG Bernard; mayor cobertura de gas protector.'
WHERE descripcion ILIKE '%TOBERA BERNARD%' AND descripcion ILIKE '%3/4%';

UPDATE producto SET descripcion_corta = 'Tobera de plasma estándar; parte del consumible de la antorcha de corte plasma.'
WHERE descripcion ILIKE '%TOBERA PLASMA%' OR (descripcion ILIKE '%TOBERA%' AND descripcion ILIKE '%PLASMA%');

UPDATE producto SET descripcion_corta = 'Tobera de corte automático para guía de llama oxiacetilénica en máquinas CNC.'
WHERE descripcion ILIKE '%TOBERA CORTE AUTOMATICO%';

-- ============================================================
-- DIFUSORES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Difusor cerámico para pistola MIG Binzel serie 36; distribuye uniformemente el gas protector.'
WHERE descripcion ILIKE '%DIFUSOR CERAMICO%' AND descripcion ILIKE '%BINZEL%';

UPDATE producto SET descripcion_corta = 'Difusor de gas Bernard EZ-200/300; distribuye el gas protector en la pistola MIG/MAG.'
WHERE descripcion ILIKE '%DIFUSOR%BERNARD%' AND (descripcion ILIKE '%200%' OR descripcion ILIKE '%300%');

UPDATE producto SET descripcion_corta = 'Difusor de gas Bernard EZ-400; distribuye el gas protector en pistolas MIG/MAG de mayor amperaje.'
WHERE descripcion ILIKE '%DIFUSOR%BERNARD%' AND descripcion ILIKE '%400%';

UPDATE producto SET descripcion_corta = 'Distribuidor de gas para cabezal de corte láser; controla el flujo de gas de asistencia.'
WHERE descripcion ILIKE '%DISTR%GAS%' AND descripcion_corta IS NULL;

-- ============================================================
-- FLEXIBLES MIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 0.6–0.8 mm para pistola MIG/MAG Bernard; conduce el alambre de aporte.'
WHERE descripcion ILIKE '%FLEXIBLE%' AND (descripcion ILIKE '%0.6%' OR descripcion ILIKE '%0,6%');

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 0.9–1.2 mm para pistola MIG/MAG Bernard; conduce el alambre de aporte.'
WHERE descripcion ILIKE '%FLEXIBLE%' AND (descripcion ILIKE '%0.9%' OR descripcion ILIKE '%0,9%') AND descripcion NOT ILIKE '%ALUM%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre aluminio 0.9–1.2 mm para pistola MIG/MAG; apto para soldar aluminio.'
WHERE descripcion ILIKE '%FLEXIBLE%' AND descripcion ILIKE '%ALUM%' AND (descripcion ILIKE '%0.9%' OR descripcion ILIKE '%1.2%');

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre aluminio 1.2–1.6 mm para pistola MIG/MAG; para alambres de aluminio gruesos.'
WHERE descripcion ILIKE '%FLEXIBLE%' AND descripcion ILIKE '%ALUM%' AND descripcion ILIKE '%1.6%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 1.2–1.6 mm de alto rendimiento para pistola MIG/MAG.'
WHERE descripcion ILIKE '%FLEXIBLE MIG ALT%';

-- ============================================================
-- TAPAS / CUERPOS / FILTROS TIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Tapa trasera del portaelectrodo TIG; cierra y protege la parte posterior de la antorcha.'
WHERE descripcion ILIKE '%TAPA PORTAELECT%';

UPDATE producto SET descripcion_corta = 'Cuerpo portaelectrodo TIG 3/32"; sujeta el electrodo de tungsteno en la antorcha.'
WHERE descripcion ILIKE '%CUERPO%PORTAELECT%' OR (descripcion ILIKE '%CUERPO%ELECTRODO%') AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Cuerpo portaelectrodo TIG 1/8"; sujeta el electrodo de tungsteno en la antorcha.'
WHERE descripcion ILIKE '%CUERPO PORTAELECT%' AND descripcion ILIKE '%1/8%';

UPDATE producto SET descripcion_corta = 'Cuerpo portaelectrodo TIG 1/16"; sujeta el electrodo de tungsteno en la antorcha.'
WHERE descripcion ILIKE '%CUERPO PORTAELECT%' AND descripcion ILIKE '%1/16%';

UPDATE producto SET descripcion_corta = 'Cuerpo TIG collet 3/32"; abrazadera interna que fija el electrodo de tungsteno.'
WHERE descripcion ILIKE '%CUERPO%' AND descripcion ILIKE '%3/32%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Filtro portaboquilla TIG 1/16"; aísla eléctricamente la tobera en la antorcha TIG.'
WHERE descripcion ILIKE '%FILTRO PORTABOQ%' AND descripcion ILIKE '%1/16%';

UPDATE producto SET descripcion_corta = 'Filtro portaboquilla TIG 3/32"; aísla eléctricamente la tobera en la antorcha TIG.'
WHERE descripcion ILIKE '%FILTRO PORTABOQUILLA%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Filtro portaboquilla TIG 1/8"; aísla eléctricamente la tobera en la antorcha TIG.'
WHERE descripcion ILIKE '%FILTRO PORTABOQUILLA%' AND descripcion ILIKE '%1/8%';

-- ============================================================
-- COLLETS TIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Collet (pinza) 1/16" para antorcha TIG; sujeta con precisión el electrodo de tungsteno.'
WHERE descripcion ILIKE '%COLLET%' AND descripcion ILIKE '%1/16%';

-- ============================================================
-- GRATAS Y ESCOBILLAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Grata circular de acero ondulado para esmeril angular; elimina escoria e impurezas de superficies.'
WHERE descripcion ILIKE '%GRATA CIRCULAR ACERO ONDULADO%' AND descripcion NOT ILIKE '%INOX%';

UPDATE producto SET descripcion_corta = 'Grata circular de acero inoxidable ondulado para esmeril angular; sin contaminación ferrosa en inox.'
WHERE descripcion ILIKE '%GRATA CIRCULAR ACERO INOXIDABLE ONDULADO%' OR
      (descripcion ILIKE '%GRATA CIRCULAR ACERO ONDULADO%' AND descripcion ILIKE '%-IN%');

UPDATE producto SET descripcion_corta = 'Grata circular de acero trenzado para esmeril angular; mayor agresividad en limpieza de cordones.'
WHERE descripcion ILIKE '%GRATA CIRCULAR ACERO TRENZADO%' AND descripcion NOT ILIKE '%INOX%' AND descripcion NOT ILIKE '%-IN%';

UPDATE producto SET descripcion_corta = 'Grata circular de acero inoxidable trenzado para esmeril angular; sin contaminación ferrosa.'
WHERE descripcion ILIKE '%GRATA CIRCULAR ACERO INOXIDABLE TRENZADO%' OR
      (descripcion ILIKE '%GRATA CIRCULAR ACERO TRENZADO%' AND (descripcion ILIKE '%-IN%' OR descripcion ILIKE '%INOX%'));

UPDATE producto SET descripcion_corta = 'Grata circular de acero trenzado para tubería (Pipe Lines); limpieza de biseles y cordones.'
WHERE descripcion ILIKE '%GRATA CIRCULAR%' AND descripcion ILIKE '%PIPE LINE%';

UPDATE producto SET descripcion_corta = 'Grata circular con vástago de acero ondulado para taladro o esmeril recto.'
WHERE descripcion ILIKE '%GRATA CIRCULAR CON VASTAGO%' OR descripcion ILIKE '%GRATA CIRCULAR C/VASTAGO%';

UPDATE producto SET descripcion_corta = 'Grata copa de acero trenzado para esmeril angular o de banco; limpieza y decapado de superficies.'
WHERE descripcion ILIKE '%GRATA COPA ACERO TRENZADO%' AND descripcion NOT ILIKE '%INOX%';

UPDATE producto SET descripcion_corta = 'Grata copa de acero inoxidable trenzado para esmeril; limpieza sin contaminación ferrosa.'
WHERE descripcion ILIKE '%GRATA COPA ACERO INOXIDABLE%';

UPDATE producto SET descripcion_corta = 'Grata copa de acero ondulado para esmeril angular; limpieza de juntas y fondos.'
WHERE descripcion ILIKE '%GRATA COPA ACERO ONDULADO%';

UPDATE producto SET descripcion_corta = 'Grata plana de acero ondulado para esmeril de banco; limpieza de superficies planas.'
WHERE descripcion ILIKE '%GRATA ACERO ONDULADO%' AND descripcion NOT ILIKE '%CIRCULAR%' AND descripcion NOT ILIKE '%COPA%';

UPDATE producto SET descripcion_corta = 'Grata de esmeril de pedestal; limpieza y acabado de superficies metálicas.'
WHERE descripcion ILIKE '%GRATA ESMERIL%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Escobilla de mano de acero inoxidable con mango; limpieza post-soldadura sin contaminación ferrosa.'
WHERE descripcion ILIKE '%ESCOBILLA ACERO INOXIDABLE%' AND descripcion ILIKE '%MANGO%';

UPDATE producto SET descripcion_corta = 'Escobilla de mano de acero inoxidable; limpieza de cordones en acero inoxidable.'
WHERE descripcion ILIKE '%ESCOBILLA ACERO INOXIDABLE%' AND descripcion NOT ILIKE '%MANGO%';

UPDATE producto SET descripcion_corta = 'Escobilla de mano de acero bronceado con mango; limpieza de metales no ferrosos.'
WHERE descripcion ILIKE '%ESCOBILLA%BRONC%' OR descripcion ILIKE '%CEPILLO BRONCE%';

UPDATE producto SET descripcion_corta = 'Escobilla de mano de acero con mango; limpieza de escoria y cordones de soldadura.'
WHERE descripcion ILIKE '%ESCOBILLA ACERO%' AND descripcion ILIKE '%MANGO%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Escobilla de mano de acero; limpieza de escoria en cordones de soldadura.'
WHERE descripcion ILIKE '%ESCOBILLA ACERO%' AND descripcion NOT ILIKE '%MANGO%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Cepillo de alambre ondulado para taladro; limpieza de superficies en piezas de difícil acceso.'
WHERE descripcion ILIKE '%CEPILLO%ALAMBRE%' AND descripcion ILIKE '%TALADRO%';

-- ============================================================
-- HERRAMIENTAS MANUALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Broca para concreto Makita con punta de carburo; para perforación en hormigón y mampostería.'
WHERE descripcion ILIKE '%BROCA CONCRETO%';

UPDATE producto SET descripcion_corta = 'Broca HSS para metal; para perforación de acero y metales no ferrosos.'
WHERE descripcion ILIKE '%BROCA%HSS%' AND descripcion NOT ILIKE '%CONCRETO%' AND descripcion NOT ILIKE '%-CO%';

UPDATE producto SET descripcion_corta = 'Broca HSS-Cobalto para metal duro; mayor resistencia al calor en perforación de aceros aleados.'
WHERE descripcion ILIKE '%BROCA%HSS-CO%' OR (descripcion ILIKE '%BROCA%METAL%' AND descripcion ILIKE '%CO%');

UPDATE producto SET descripcion_corta = 'Huincha de medir Stanley/Best Job; cinta métrica retráctil para medición en obra.'
WHERE descripcion ILIKE '%HUINCHA DE MEDIR%';

UPDATE producto SET descripcion_corta = 'Alicate de punta para trabajo en espacios reducidos; ideal para doblar y sujetar.'
WHERE descripcion ILIKE '%ALICATE PUNTA%';

UPDATE producto SET descripcion_corta = 'Alicate universal; corte y agarre multiuso para trabajos eléctricos y mecánicos.'
WHERE descripcion ILIKE '%ALICATE UNIVERSAL%';

UPDATE producto SET descripcion_corta = 'Llave francesa ajustable; sujeción de tuercas y conexiones de distintos tamaños.'
WHERE descripcion ILIKE '%LLAVE FRANCESA%';

UPDATE producto SET descripcion_corta = 'Dado hexagonal 10 mm 1/2" para llave de impacto o palanca de carraca.'
WHERE descripcion ILIKE '%DADO 10MM%';

UPDATE producto SET descripcion_corta = 'Lima rotativa cilíndrica 3/8" para fresado y acabado de metales en esmeril recto.'
WHERE descripcion ILIKE '%LIMA ROTATIVA%';

UPDATE producto SET descripcion_corta = 'Huincha métrica retráctil para medición de juntas y distancias en soldadura.'
WHERE descripcion ILIKE '%REGLETA MEDICION%';

UPDATE producto SET descripcion_corta = 'Mazo de goma para golpes sin daño; posicionamiento de piezas metálicas.'
WHERE descripcion ILIKE '%MAZO DE GOMA%';

UPDATE producto SET descripcion_corta = 'Rodillo de pintura pequeño (chiporro) 5×12 cm para aplicación de antioxidantes.'
WHERE descripcion ILIKE '%RODILLO CHIPORRO%';

UPDATE producto SET descripcion_corta = 'Juego de extractores de rodamientos 28–70 mm con martillo de corredera.'
WHERE descripcion ILIKE '%EXTRACTOR%RODAMIENTO%';

UPDATE producto SET descripcion_corta = 'Porta Power hidráulico 10 toneladas; enderezado y posicionamiento de estructuras metálicas.'
WHERE descripcion ILIKE '%PORTA POWER%';

UPDATE producto SET descripcion_corta = 'Sistema de corte CNC con antorcha plasma; área de trabajo 2000×3000 mm.'
WHERE descripcion ILIKE '%SISTEMA CORTE CNC%';

-- ============================================================
-- FRESAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Fresa de carburo de tungsteno recta (cilíndrica); desbaste y mecanizado de metales duros.'
WHERE descripcion ILIKE '%FRESA CARBURO TUNGSTENO RECTA%';

UPDATE producto SET descripcion_corta = 'Fresa de carburo de tungsteno cónica; mecanizado de chaflanes y superficies inclinadas.'
WHERE descripcion ILIKE '%FRESA CARBURO TUNGSTENO CONICA%';

-- ============================================================
-- ELECTRODO (plasma / TIG / arco manual)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Electrodo de tungsteno/desgaste para antorcha plasma P80; parte consumible de reemplazo.'
WHERE descripcion ILIKE '%ELECTRODO PLASMA%';

UPDATE producto SET descripcion_corta = 'Electrodo consumible para antorcha de corte plasma WTC-CUT160.'
WHERE descripcion ILIKE '%ELECTRODO%' AND descripcion ILIKE '%WTC-CUT%';

-- ============================================================
-- PISTOLAS TIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Pistola TIG 125 A WP-9 refrigerada por aire, cable 12 pies; para soldadura TIG de precisión.'
WHERE descripcion ILIKE '%PISTOLA TIG%' AND descripcion ILIKE '%125%' AND descripcion ILIKE '%12%';

UPDATE producto SET descripcion_corta = 'Pistola TIG 125 A WP-9 refrigerada por aire, cable 25 pies; mayor movilidad en terreno.'
WHERE descripcion ILIKE '%PISTOLA TIG%' AND descripcion ILIKE '%125%' AND descripcion ILIKE '%25%';

UPDATE producto SET descripcion_corta = 'Pistola TIG 200 A WP-26 refrigerada por aire; soldadura TIG de mayor amperaje.'
WHERE descripcion ILIKE '%PISTOLA%200%' AND descripcion ILIKE '%WP-26%';

-- ============================================================
-- SOPLETES DE CORTE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Soplete de corte oxiacetilénico 62-5; para corte de planchas de acero de mediano espesor.'
WHERE descripcion ILIKE '%SOPLETE DE CORTE%';

-- ============================================================
-- VÁLVULAS ANTIRRETROCESO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Válvula antirretroceso de llama para oxígeno; protege el equipo y cilindros ante retroceso.'
WHERE descripcion ILIKE '%VALVULA ANTIRRETROC%' AND (descripcion ILIKE '%O2%' OR descripcion ILIKE '%OX%');

-- ============================================================
-- MEZCLADORES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Mezclador oxiacetilénico para mango 43-2; combina oxígeno y acetileno antes del soplete.'
WHERE descripcion ILIKE '%MEZCLADOR%' AND descripcion ILIKE '%43%';

-- ============================================================
-- ADITAMENTOS DE CORTE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Aditamento de corte circular y recto para soplete; facilita cortes precisos y reproducibles.'
WHERE descripcion ILIKE '%ADITAMENTO CORTE CIRC%';

UPDATE producto SET descripcion_corta = 'Aditamento de corte 49-3 para soplete oxiacetilénico; accesorio para corte recto guiado.'
WHERE descripcion ILIKE '%ADITAMENTO DE CORTE 49%';

UPDATE producto SET descripcion_corta = 'Aditamento de corte 72-3 para soplete oxiacetilénico; accesorio para corte recto guiado.'
WHERE descripcion ILIKE '%ADITAMENTO DE CORTE 72%';

-- ============================================================
-- CABLES DE SOLDADURA (más específico por calibre)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Cable de soldadura AWG 1/0 (53.5 mm²); retorno de corriente para procesos de mediano amperaje.'
WHERE descripcion ILIKE '%CABLE SOLDAR%' AND descripcion ILIKE '%1/0%';

UPDATE producto SET descripcion_corta = 'Cable de soldadura AWG 2/0 (67.4 mm²); retorno de corriente para procesos de alto amperaje.'
WHERE descripcion ILIKE '%CABLE SOLDAR%' AND descripcion ILIKE '%2/0%';

UPDATE producto SET descripcion_corta = 'Cable de soldadura AWG 3/0 (85 mm²); retorno de corriente para procesos de muy alto amperaje.'
WHERE descripcion ILIKE '%CABLE SOLDAR%' AND descripcion ILIKE '%3/0%';

UPDATE producto SET descripcion_corta = 'Cable de soldadura NN AWG 6 (13.3 mm²); retorno de corriente para procesos de bajo amperaje.'
WHERE descripcion ILIKE '%CABLE SOLDAR NN%' AND descripcion ILIKE '%6 AWG%';

UPDATE producto SET descripcion_corta = 'Cable de soldadura NN AWG 3 (26.7 mm²); retorno de corriente para procesos medianos.'
WHERE descripcion ILIKE '%CABLE SOLDAR NN%' AND descripcion ILIKE '%3 AWG%';

-- ============================================================
-- CONECTORES Y TERMINALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Conector hembra tipo Texas para cable de soldadura 25 mm²; conexión rápida entre cables.'
WHERE descripcion ILIKE '%CONECTOR HEMBRA%' AND (descripcion ILIKE '%25MM%' OR descripcion ILIKE '%25 MM%');

UPDATE producto SET descripcion_corta = 'Conector macho tipo Texas para cable de soldadura 25 mm²; conexión rápida entre cables.'
WHERE descripcion ILIKE '%CONECTOR MACHO%' AND (descripcion ILIKE '%25MM%' OR descripcion ILIKE '%25 MM%');

UPDATE producto SET descripcion_corta = 'Conector macho Kemppi para cable de soldadura 70 mm²; alta capacidad de corriente.'
WHERE descripcion ILIKE '%CONECTOR MACHO KEMPPI%';

UPDATE producto SET descripcion_corta = 'Conector hembra CC-98 para cable de soldadura 50–70 mm²; alta capacidad de corriente.'
WHERE descripcion ILIKE '%CONECTOR HEMBRA CC-98%';

UPDATE producto SET descripcion_corta = 'Conector macho CC-98 para cable de soldadura 50–70 mm²; alta capacidad de corriente.'
WHERE descripcion ILIKE '%CONECTOR MACHO%' AND descripcion ILIKE '%CC-98%';

UPDATE producto SET descripcion_corta = 'Terminal de cable de soldadura 95 mm²; conexión segura en instalaciones de alta corriente.'
WHERE descripcion ILIKE '%TERMINAL 95%';

-- ============================================================
-- GRAMPA A TIERRA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Grampa a tierra 300 A; fija el retorno de corriente a la pieza durante la soldadura.'
WHERE descripcion ILIKE '%GRAMPA%300%';

UPDATE producto SET descripcion_corta = 'Grampa a tierra 500 A; retorno de alta corriente para soldadoras industriales.'
WHERE descripcion ILIKE '%GRAMPA%500%';

-- ============================================================
-- EXTENSIONES (para sopletes)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Extensión de acero inoxidable 275 mm para soplete oxiacetilénico; alcanza zonas de difícil acceso.'
WHERE descripcion ILIKE '%EXTENSION%' AND (descripcion ILIKE '%275%');

UPDATE producto SET descripcion_corta = 'Extensión de acero inoxidable 380 mm para soplete oxiacetilénico; alcanza zonas de difícil acceso.'
WHERE descripcion ILIKE '%EXTENSION%' AND (descripcion ILIKE '%380%');

UPDATE producto SET descripcion_corta = 'Extensión de acero inoxidable 710 mm para soplete oxiacetilénico; alcanza fondos y galerías.'
WHERE descripcion ILIKE '%EXTENSION%' AND (descripcion ILIKE '%710%');

-- ============================================================
-- RIEL GUÍA (para carros de corte)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Riel guía 1.8 m para carro de corte IK12/Beetle; trazado de cortes rectos de precisión.'
WHERE descripcion ILIKE '%RIEL%' AND descripcion ILIKE '%1.8%';

UPDATE producto SET descripcion_corta = 'Riel guía 2 m para carro de corte Rana 4605; trazado de cortes rectos de precisión.'
WHERE descripcion ILIKE '%RIEL%' AND descripcion ILIKE '%2 MTS%';

-- ============================================================
-- EQUIPO TORCHAR (soldadura de arco sumergido)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Equipo Torchar 600 A para soldadura de arco sumergido; alta productividad en cordones largos.'
WHERE descripcion ILIKE '%TORCHAR%';

-- ============================================================
-- MÁQUINAS DE SOLDAR (específico por modelo/amperaje)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Soldadora de arco sumergido 1250 A; para soldaduras de alto depósito en planchas gruesas.'
WHERE descripcion ILIKE '%ARCO SUMERGIDO%';

UPDATE producto SET descripcion_corta = 'Inversora MMA/TIG 120 A Glint; compacta, apta para electrodo y TIG en 220 V.'
WHERE descripcion ILIKE '%GLINT 140%' OR descripcion ILIKE '%GLINT-140%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 180 A Glint; para soldadura por electrodo revestido en 220 V.'
WHERE descripcion ILIKE '%GLINT-180%' AND descripcion NOT ILIKE '%MIG%' AND descripcion NOT ILIKE '%TIG%';

UPDATE producto SET descripcion_corta = 'Inversora MMA/MIG/TIG 185 A Glint; multiproceso compacta para taller y obra en 220 V.'
WHERE descripcion ILIKE '%GLINT-185%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 200 A Glint HF; arranque de arco de alta frecuencia para mayor estabilidad.'
WHERE descripcion ILIKE '%GLINT 200HF%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 120 A WTC; compacta para soldadura por electrodo en 220 V.'
WHERE descripcion ILIKE '%WTC-120%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 200 A WTC; soldadura por electrodo revestido en 220 V.'
WHERE descripcion ILIKE '%WTC-200%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 300 A WTC; soldadura por electrodo revestido de alto amperaje en 380 V.'
WHERE descripcion ILIKE '%WTC-300 MMA%';

UPDATE producto SET descripcion_corta = 'Inversora TIG HF/MMA 200 A WTC con rampa de corriente; para soldadura TIG de precisión en 220 V.'
WHERE descripcion ILIKE '%WTC-215HFR%';

UPDATE producto SET descripcion_corta = 'Soldadora MIG 185 A WTC; proceso continuo alambre para acero en 220 V.'
WHERE descripcion ILIKE '%WTC-185%';

UPDATE producto SET descripcion_corta = 'Soldadora MIG 300 A WTC; proceso continuo alambre de alta productividad en 220 V.'
WHERE descripcion ILIKE '%WTC-300%' AND descripcion ILIKE '%MIG%';

UPDATE producto SET descripcion_corta = 'Soldadora MIG 350 A WTC; proceso continuo de alta productividad en 380 V.'
WHERE descripcion ILIKE '%WTC-350%';

UPDATE producto SET descripcion_corta = 'Equipo de corte plasma WTC-CUT160 160 A 380 V; corte de metales hasta 40 mm de espesor.'
WHERE descripcion ILIKE '%WTC-CUT160%' AND descripcion ILIKE '%MAQUINA%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 200 A Hyundai HG200; arranque de arco estable para electrodo revestido.'
WHERE descripcion ILIKE '%HYUNDAI HG200%' AND descripcion NOT ILIKE '%AH%';

UPDATE producto SET descripcion_corta = 'Inversora MMA Hyundai HG200AH con anti-sticking; evita pegado del electrodo al inicio del arco.'
WHERE descripcion ILIKE '%HYUNDAI HG200AH%';

UPDATE producto SET descripcion_corta = 'Inversora MMA/TIG 120 A Delta; kit con cables incluidos para soldadura por electrodo y TIG.'
WHERE descripcion ILIKE '%DELTA 120 AMP%';

UPDATE producto SET descripcion_corta = 'Inversora MMA/TIG 160 A Delta; kit con cables incluidos para soldadura por electrodo y TIG.'
WHERE descripcion ILIKE '%DELTA 160 AMP%';

UPDATE producto SET descripcion_corta = 'Soldadora TIG HF 315 A Mitech 380 V; para soldadura TIG de precisión en acero inoxidable y aluminio.'
WHERE descripcion ILIKE '%MITECH%315%TIG%';

UPDATE producto SET descripcion_corta = 'Soldadora MMA/MIG 400 A Mitech; proceso doble electrodo o continuo a 380 V.'
WHERE descripcion ILIKE '%MITECH%400%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 400 A Katto Arc; robusta para soldadura por electrodo en procesos industriales.'
WHERE descripcion ILIKE '%KATTO ARC 400%';

UPDATE producto SET descripcion_corta = 'Inversora MMA 200 A Katto LED con VRD; protección anticontacto accidental para ambientes húmedos.'
WHERE descripcion ILIKE '%KATTO 200LED%' OR descripcion ILIKE '%KATTO200LED%';

UPDATE producto SET descripcion_corta = 'Equipo multiproceso MIG/MAG 350 A Katto; alta productividad en producción industrial a 380 V.'
WHERE descripcion ILIKE '%MULTI 350%' AND descripcion ILIKE '%KATTO%';

UPDATE producto SET descripcion_corta = 'Equipo MIG/MAG de arco sumergido 350 A; soldadura automática de alta deposición a 380 V.'
WHERE descripcion ILIKE '%MIG/ARCO MAG 350%';

UPDATE producto SET descripcion_corta = 'Equipo multiproceso MIG/MAG 500 A con alimentación interna; para producción industrial a 380 V.'
WHERE descripcion ILIKE '%MIG/ARCO MAG 500%';

UPDATE producto SET descripcion_corta = 'Inversora TIG ProTIG 160 A HF; arranque sin contacto para soldadura de precisión en inox y aluminio.'
WHERE descripcion ILIKE '%PROTIG 160%';

-- ============================================================
-- EQUIPO CORTE PLASMA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Cortadora de plasma CUT-45; corte de metales conductores hasta 12 mm en 220 V.'
WHERE descripcion ILIKE '%EQUIPO CORTE PLASMA CUT-45%';

UPDATE producto SET descripcion_corta = 'Cortadora de plasma Mitech 100 A 380 V; corte de acero, inox y aluminio hasta 30 mm.'
WHERE descripcion ILIKE '%EQUIPO CORTE PLASMA MITECH 100%';

-- ============================================================
-- CALZADO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°39; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%39%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°40; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%40%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°41; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%41%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°42; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%42%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°43; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%43%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 250 N°44; punta de acero, cuero resistente para uso industrial.'
WHERE descripcion ILIKE '%BOTIN DE SEGURIDAD QUEBEC 250%' AND descripcion ILIKE '%44%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad MAN 350 aislante N°39; dieléctrico hasta 1000 V para trabajos eléctricos.'
WHERE descripcion ILIKE '%MAN 350 AISLANTE%' AND descripcion ILIKE '%39%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad MAN 350 aislante N°40; dieléctrico hasta 1000 V para trabajos eléctricos.'
WHERE descripcion ILIKE '%MAN 350 AISLANTE%' AND descripcion ILIKE '%40%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad MAN 350 aislante N°41; dieléctrico hasta 1000 V para trabajos eléctricos.'
WHERE descripcion ILIKE '%MAN 350 AISLANTE%' AND descripcion ILIKE '%41%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad MAN 350 aislante N°42; dieléctrico hasta 1000 V para trabajos eléctricos.'
WHERE descripcion ILIKE '%MAN 350 AISLANTE%' AND descripcion ILIKE '%42%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad MAN 350 aislante N°43; dieléctrico hasta 1000 V para trabajos eléctricos.'
WHERE descripcion ILIKE '%MAN 350 AISLANTE%' AND descripcion ILIKE '%43%';

UPDATE producto SET descripcion_corta = 'Botín de seguridad Quebec 400 con punta metálica; diseño reforzado para ambientes de alto impacto.'
WHERE descripcion ILIKE '%QUEBEC 400%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Botín Puelche II punta de acero N°40; cuero negro resistente para uso en obra e industria.'
WHERE descripcion ILIKE '%PUELCHE II%';

UPDATE producto SET descripcion_corta = 'Botín Nazca Roble café N°40; punta blanda y suela antideslizante para ambientes secos.'
WHERE descripcion ILIKE '%NAZCA%ROBLE%';

UPDATE producto SET descripcion_corta = 'Zapatilla de seguridad Redbrick Comet N°42; diseño liviano con protección en punta.'
WHERE descripcion ILIKE '%REDBRICK COMET%';

-- ============================================================
-- EPP — CUIDADO PERSONAL
-- ============================================================
UPDATE producto SET descripcion_corta = 'Lente de protección 3M Virtua Sport con cubierta transparente; apto para uso con anteojos.'
WHERE descripcion ILIKE '%LENTE 3M VIRTUA%';

UPDATE producto SET descripcion_corta = 'Protector solar Raytan SPF 30, frasco 1 litro; para exposición solar en trabajo al aire libre.'
WHERE descripcion ILIKE '%RAYTAN%SPF-30%' AND descripcion ILIKE '%1 LITRO%';

UPDATE producto SET descripcion_corta = 'Protector solar Raytan SPF 50+, frasco 1 litro; máxima protección UVA/UVB en trabajo exterior.'
WHERE descripcion ILIKE '%RAYTAN%SPF-50%' AND descripcion ILIKE '%1 LITRO%';

UPDATE producto SET descripcion_corta = 'Protector solar Raytan SPF 50+ pomo 120 ml; práctico para llevar en bolsillo.'
WHERE descripcion ILIKE '%RAYTAN%SPF-50%' AND descripcion ILIKE '%120 ML%';

UPDATE producto SET descripcion_corta = 'Jabón de glicerina Raytan 1 litro; limpieza suave de manos en ambiente industrial.'
WHERE descripcion ILIKE '%RAYTAN JABON GLICERINA%';

UPDATE producto SET descripcion_corta = 'Jabón triclosan Raytan 1 litro; limpieza antibacterial de manos en faena.'
WHERE descripcion ILIKE '%RAYTAN JABON TRICLOSAN%' AND descripcion ILIKE '%1 LITRO%';

UPDATE producto SET descripcion_corta = 'Jabón triclosan Raytan bidón 5 litros; reposición para dispensadores de jabón en faena.'
WHERE descripcion ILIKE '%RAYTAN JABON TRICLOSAN%' AND descripcion ILIKE '%5 LITROS%';

UPDATE producto SET descripcion_corta = 'Gel alcohol Raytan 1 litro; higienizante de manos sin enjuague para uso en terreno.'
WHERE descripcion ILIKE '%RAYTAN GEL ALCOHOL%' AND descripcion ILIKE '%1 LITRO%';

UPDATE producto SET descripcion_corta = 'Gel alcohol Raytan bidón 5 litros; reposición para dispensadores en instalaciones industriales.'
WHERE descripcion ILIKE '%RAYTAN GEL ALCOHOL%' AND descripcion ILIKE '%5 LITROS%';

UPDATE producto SET descripcion_corta = 'Gel alcohol Workteen 60 ml; higienizante de manos de bolsillo para uso personal en faena.'
WHERE descripcion ILIKE '%GEL ALCOHOL WORKTEEN%';

UPDATE producto SET descripcion_corta = 'Crema de manos Raytan Silanol pomo 50 ml; protección y recuperación de piel en ambientes secos.'
WHERE descripcion ILIKE '%RAYTAN CREMA MANOS SILANOL%';

UPDATE producto SET descripcion_corta = 'Crema de manos Raytan SPF 30 pomo 50 ml; hidratación y protección solar para manos.'
WHERE descripcion ILIKE '%RAYTAN CREMA MANOS SPF%';

UPDATE producto SET descripcion_corta = 'Bálsamo labial Raytan SPF 50+ 8 g; protección solar para labios en trabajo exterior.'
WHERE descripcion ILIKE '%RAYTAN%BALS%LABIAL%SPF 50%';

UPDATE producto SET descripcion_corta = 'Bálsamo labial Raytan SPF 15 menta 8 g; protección y frescura para labios en faena.'
WHERE descripcion ILIKE '%RAYTAN%BALS%LABIAL%SPF 15%';

UPDATE producto SET descripcion_corta = 'Shampoo de uso frecuente Raytan bidón 5 litros; formulación profesional para duchas de faena.'
WHERE descripcion ILIKE '%RAYTAN SHAMPOO%';

UPDATE producto SET descripcion_corta = 'Alcohol nano-cobre Aircop 140 ml en aerosol; higienización de superficies y manos.'
WHERE descripcion ILIKE '%AIRCOP%';

UPDATE producto SET descripcion_corta = 'Soporte metálico de pared Raytan para dispensador de jabón/gel; instalación fija en baños.'
WHERE descripcion ILIKE '%RAYTAN SOPORTE METALICO%';

-- ============================================================
-- LIMPIADORES / TINTAS PENETRANTES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Limpiador desinfectante hidroalcohólico sin enjuague 1 L; higienización de superficies en faena.'
WHERE descripcion ILIKE '%LIMPIADOR DESINFECTANTE%';

UPDATE producto SET descripcion_corta = 'Desengrasante MasterQuats bidón 5 L; limpieza y desinfección de superficies industriales.'
WHERE descripcion ILIKE '%MASTER QUATS%';

UPDATE producto SET descripcion_corta = 'Aerosol limpiador para ensayo de tintas penetrantes; paso 1 de inspección por PT.'
WHERE descripcion ILIKE '%AEROSOL LIMPIADOR%' AND descripcion ILIKE '%PENETRANTE%';

UPDATE producto SET descripcion_corta = 'Aerosol penetrante rojo para ensayo de tintas penetrantes; detecta grietas superficiales (PT).'
WHERE descripcion ILIKE '%AEROSOL PENETRANTE%';

UPDATE producto SET descripcion_corta = 'Aerosol revelador blanco para ensayo de tintas penetrantes; visualiza indicaciones de defectos (PT).'
WHERE descripcion ILIKE '%AEROSOL REVELADOR%';

-- ============================================================
-- OTROS ACCESORIOS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Cadena plástica de señalización 50 m color rojo; delimitación de zonas de peligro.'
WHERE descripcion ILIKE '%CADENA PLASTICA%' AND descripcion ILIKE '%ROJO%' AND descripcion NOT ILIKE '%BLANCO%';

UPDATE producto SET descripcion_corta = 'Cadena plástica de señalización 50 m color blanco; delimitación de zonas de trabajo.'
WHERE descripcion ILIKE '%CADENA PLASTICA%' AND descripcion ILIKE '%BLANCO%' AND descripcion NOT ILIKE '%ROJO%';

UPDATE producto SET descripcion_corta = 'Cadena plástica de señalización 50 m bicolor rojo-blanco; delimitación de alta visibilidad.'
WHERE descripcion ILIKE '%CADENA PLASTICA%' AND descripcion ILIKE '%ROJO-BLANCO%';

UPDATE producto SET descripcion_corta = 'Cinta ducto de alta resistencia; sellado y refuerzo de ductos y mangueras en faena.'
WHERE descripcion ILIKE '%CINTA DUCTO%';

UPDATE producto SET descripcion_corta = 'Cortina inactínica grado 2 amarilla 6×8 m; protección visual ante radiación UV de arco eléctrico.'
WHERE descripcion ILIKE '%CORTINA INACTINICA%';

UPDATE producto SET descripcion_corta = 'Tiza para trazar metales; marcado de líneas de corte y soldadura sobre superficies metálicas.'
WHERE descripcion ILIKE '%TIZA PARA TRAZAR%';

UPDATE producto SET descripcion_corta = 'Anillo aislador de tobera para pistola TIG; previene cortocircuitos entre tobera y pieza.'
WHERE descripcion ILIKE '%ANILLO AISLADOR%';

UPDATE producto SET descripcion_corta = 'Tuerca de soplete oxiacetilénico 62-3; conexión entre mango y aditamento de corte.'
WHERE descripcion ILIKE '%TUERCA SOPLETE%';

UPDATE producto SET descripcion_corta = 'Autoperforante 12-14×1½" punta broca, caja 100 unidades; fijación en planchas metálicas delgadas.'
WHERE descripcion ILIKE '%AUTOPERFORANTE%';

UPDATE producto SET descripcion_corta = 'Coleto de cuero para soldador; protección de tronco ante salpicaduras y calor radiante.'
WHERE descripcion ILIKE '%COLETO SOLDADOR%';

UPDATE producto SET descripcion_corta = 'Adaptador de cable de alimentación para máquina de soldar.'
WHERE descripcion ILIKE '%ADAPTADOR CABLE PODER%';

-- ============================================================
-- HORNOS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Horno para secado y almacenamiento de electrodos revestidos 150 kg; mantiene humedad controlada.'
WHERE descripcion ILIKE '%HORNO PARA ELECTRODO%';

UPDATE producto SET descripcion_corta = 'Horno para secado de alambre MIG ER70S-6; previene la absorción de humedad en el material de aporte.'
WHERE descripcion ILIKE '%HORNO PARA ALAMBRE%';

-- ============================================================
-- ALAMBRE NEGRO RECOCIDO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre negro recocido calibre 14; amarre de armaduras y estructuras en obra.'
WHERE descripcion ILIKE '%ALAMBRE NEGRO RECOCIDO%';

-- ============================================================
-- BUZO IGNÍFUGO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Buzo ignífugo antiestático 13.6 cal talla M, naranja; protección ante arco eléctrico y llama.'
WHERE descripcion ILIKE '%BUZO IGNIFUGO%' AND descripcion ILIKE '%T/M%';

UPDATE producto SET descripcion_corta = 'Buzo ignífugo antiestático 13.6 cal talla L, naranja; protección ante arco eléctrico y llama.'
WHERE descripcion ILIKE '%BUZO IGNIFUGO%' AND descripcion ILIKE '%T/L%';

-- ============================================================
-- SLACK MEZCLILLA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Pantalón mezclilla talla 48; ropa de trabajo resistente para faena industrial.'
WHERE descripcion ILIKE '%SLACK MEZCLILLA%' AND descripcion ILIKE '%48%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla talla 50; ropa de trabajo resistente para faena industrial.'
WHERE descripcion ILIKE '%SLACK MEZCLILLA%' AND descripcion ILIKE '%50%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla talla 52; ropa de trabajo resistente para faena industrial.'
WHERE descripcion ILIKE '%SLACK MEZCLILLA%' AND descripcion ILIKE '%52%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla talla 54; ropa de trabajo resistente para faena industrial.'
WHERE descripcion ILIKE '%SLACK MEZCLILLA%' AND descripcion ILIKE '%54%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla talla 56; ropa de trabajo resistente para faena industrial.'
WHERE descripcion ILIKE '%SLACK MEZCLILLA%' AND descripcion ILIKE '%56%';

-- ============================================================
-- FILTRO DE AIRE / COMPRESOR
-- ============================================================
UPDATE producto SET descripcion_corta = 'Filtro de aire 200 L 3 HP; separación de humedad y partículas para líneas de gas comprimido.'
WHERE descripcion ILIKE '%FILTRO DE AIRE 200L%';

-- ============================================================
-- MÁSCARA FRENTE MÓVIL
-- ============================================================
UPDATE producto SET descripcion_corta = 'Careta HSL 2 con frente móvil; protección ocular y facial para esmerilado y rectificado.'
WHERE descripcion ILIKE '%MASCARA HSL 2%' OR descripcion ILIKE '%MASCARA HSL2%';

-- ============================================================
-- REGULADOR CO2
-- ============================================================
UPDATE producto SET descripcion_corta = 'Regulador de CO2 con flujómetro 30 L/min; control de gas protector para soldadura MIG/MAG.'
WHERE descripcion ILIKE '%REGULADOR CO2%';

-- ============================================================
-- REGULADOR HELIO / AIRE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Regulador para aire comprimido modelo 825-10-AI; control de presión en líneas de aire industrial.'
WHERE descripcion ILIKE '%REGULADOR%AIRE COMP%';

UPDATE producto SET descripcion_corta = 'Regulador de alta presión Hepal 50 N2; control de nitrógeno para pruebas de estanqueidad.'
WHERE descripcion ILIKE '%REGULADOR HEPAL%';

-- ============================================================
-- VÁLVULA DE GAS (antorcha TIG)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Válvula de gas VS-1 para antorcha TIG; control de flujo de gas protector en la pistola.'
WHERE descripcion ILIKE '%VALVULA DE GAS  VS-1%' OR descripcion ILIKE '%VALVULA DE GAS VS-1%';

UPDATE producto SET descripcion_corta = 'Válvula de gas VS-2 para antorcha TIG; control de flujo de gas protector en la pistola.'
WHERE descripcion ILIKE '%VALVULA DE GAS VS-2%';

-- ============================================================
-- ARNES PARACAIDISTA (EPP altura)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Arnés paracaidista de 4 argollas; detención de caídas para trabajo en altura.'
WHERE descripcion ILIKE '%ARNES PARACAIDISTA%';

-- ============================================================
-- ALAMBRES TUBULARES (A.TUBULAR)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre tubular flux-cored E81T1 Ni1 Ø1.2 mm; alta tenacidad para aceros de baja aleación bajo CO2.'
WHERE descripcion ILIKE '%A.TUBULAR 81T-1 Ni1%' AND descripcion ILIKE '%1.2%';

UPDATE producto SET descripcion_corta = 'Alambre tubular flux-cored clasificación AWS E71T-1; soldadura MIG de acero estructural bajo CO2.'
WHERE descripcion ILIKE '%A.TUBULAR%71T%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Alambre tubular flux-cored para soldadura MIG/MAG; alta tasa de deposición en acero carbono.'
WHERE descripcion ILIKE '%A.TUBULAR%' AND descripcion_corta IS NULL;
