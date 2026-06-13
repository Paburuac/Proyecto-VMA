-- ============================================================
-- descripcion_corta_v3.sql — Familias no cubiertas en v1/v2
-- Ejecutar en Supabase SQL Editor después de v1 y v2
-- ============================================================

-- ============================================================
-- PISTOLA MIG / BINZEL 15AK (150 A)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Difusor + toma-boquilla combinados para pistola MIG Binzel 15AK (150 A); pieza de recambio.'
WHERE descripcion ILIKE '%15AK DIFUSOR%';

UPDATE producto SET descripcion_corta = 'Tobera/boquilla de gas para pistola MIG Binzel 15AK (150 A); protege y canaliza el gas protector.'
WHERE descripcion ILIKE '%15AK TOBERA%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto M6 Ø0.8 mm para pistola MIG Binzel 15AK (150 A); transmite corriente al alambre.'
WHERE descripcion ILIKE '%15AK BOQUILLA BINZEL%' AND descripcion ILIKE '%0.8%';

UPDATE producto SET descripcion_corta = 'Portaboquilla M6 para pistola MIG Binzel 36 (360 A); sujeta y aísla la boquilla de contacto.'
WHERE descripcion ILIKE '%PORTABOQUILLA%BINZEL%' AND (descripcion ILIKE '%36%' OR descripcion ILIKE '%M8%');

-- ============================================================
-- BOQUILLAS PROPANO VICTOR
-- ============================================================
UPDATE producto SET descripcion_corta = 'Boquilla de calentamiento propano Victor N°0 para soplete; llama ancha de precalentamiento.'
WHERE descripcion ILIKE '%BOQUILLA PROPANO VICTOR 0%';

UPDATE producto SET descripcion_corta = 'Boquilla de calentamiento propano Victor N°1 para soplete; llama mediana de precalentamiento.'
WHERE descripcion ILIKE '%BOQUILLA PROPANO VICTOR 1%';

UPDATE producto SET descripcion_corta = 'Boquilla de calentamiento propano Victor N°2 para soplete; llama amplia para piezas grandes.'
WHERE descripcion ILIKE '%BOQUILLA PROPANO VICTOR 2%';

UPDATE producto SET descripcion_corta = 'Boquilla de calentamiento propano Victor N°3 para soplete; llama de alta potencia calorífica.'
WHERE descripcion ILIKE '%BOQUILLA PROPANO VICTOR 3%';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura acetileno Victor N°1; para espesores finos hasta 1.5 mm.'
WHERE descripcion ILIKE '%BOQUILLA ACETILENO VICTOR 1%';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura acetileno Victor N°2; para espesores medios 1.5–3 mm.'
WHERE descripcion ILIKE '%BOQUILLA ACETILENO VICTOR 2%';

UPDATE producto SET descripcion_corta = 'Boquilla de soldadura acetileno Victor N°3; para espesores 3–6 mm.'
WHERE descripcion ILIKE '%BOQUILLA ACETILENO VICTOR N%3%';

-- ============================================================
-- BOQUILLAS HEAVY DUTY / TWECO / AMIGO (MIG)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Boquilla HD Tough Lock 1.6 mm para pistola MIG Tregaskiss; alta resistencia al calor.'
WHERE descripcion ILIKE '%BOQUILLA HD TOUGH LOCK%';

UPDATE producto SET descripcion_corta = 'Boquilla Heavy Duty 0.9 mm para pistola MIG; mayor durabilidad en aplicaciones de alta producción.'
WHERE descripcion ILIKE '%BOQUILLA HEAVY DUTY 0.9%';

UPDATE producto SET descripcion_corta = 'Boquilla Heavy Duty 1.0 mm para pistola MIG; mayor durabilidad en aplicaciones de alta producción.'
WHERE descripcion ILIKE '%BOQUILLA HEAVY DUTY 1.0%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 1.2 mm tipo largo para pistola MIG; reduce desgaste en procesos continuos.'
WHERE descripcion ILIKE '%BOQ%1.2MM%403-20%';

UPDATE producto SET descripcion_corta = 'Boquilla alta temperatura Tweco 1.2 mm para pistola MIG; apta para ciclos de trabajo intensivos.'
WHERE descripcion ILIKE '%BOQUILLA ALT TWECO%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 0.8 mm para pistola MIG; transmite corriente al alambre de aporte.'
WHERE descripcion ILIKE '%14-30 BOQUILLA 0.8%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 0.9 mm para pistola MIG; transmite corriente al alambre de aporte.'
WHERE descripcion ILIKE '%14-35 BOQUILLA 0.9%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 1.0 mm para pistola MIG; transmite corriente al alambre de aporte.'
WHERE descripcion ILIKE '%14-40 BOQUILLA 1.0%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 1.2 mm para pistola MIG; transmite corriente al alambre de aporte.'
WHERE descripcion ILIKE '%14-45 BOQUILLA 1.2%';

UPDATE producto SET descripcion_corta = 'Boquilla de contacto 1.6 mm para pistola MIG; para alambres de gran sección.'
WHERE descripcion ILIKE '%14-116 BOQUILLA 1.6%';

-- ============================================================
-- TOBERAS ESPECÍFICAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Tobera de alúmina 7/16" para pistola TIG; cobertura intermedia del gas de protección.'
WHERE descripcion ILIKE '%TOBERA ALUMINA%' AND descripcion ILIKE '%7/16%';

UPDATE producto SET descripcion_corta = 'Tobera STD 1/2" para pistola MIG Tregaskiss; protección de gas estándar en el baño de fusión.'
WHERE descripcion ILIKE '%TOBERA STD 1/2%TREGASKISS%';

UPDATE producto SET descripcion_corta = 'Tobera STD 5/8" para pistola MIG Tregaskiss; mayor cobertura de gas para piezas anchas.'
WHERE descripcion ILIKE '%TOBERA STD 5/8%TREGASKISS%';

UPDATE producto SET descripcion_corta = 'Tobera Heavy Duty 5/8" para pistola MIG Tregaskiss; alta resistencia a salpicaduras y calor.'
WHERE descripcion ILIKE '%TOBERA HEAVY DUTY%TREGASKISS%';

UPDATE producto SET descripcion_corta = 'Tobera 5/8" Bernard EZ-200/300; cobertura amplia de gas protector en la pistola MIG/MAG.'
WHERE descripcion ILIKE '%TOBERA BERNARD%5/8%';

UPDATE producto SET descripcion_corta = 'Tobera para pistola MIG Amigo; dirige el gas de protección alrededor del arco de soldadura.'
WHERE descripcion ILIKE '%TOBERA PISTOLA AMIGO%';

UPDATE producto SET descripcion_corta = 'Tobera para soplete oxiacetilénico modelo 23-62; accesorio de reemplazo para soplete.'
WHERE descripcion ILIKE '%23-62 TOBERA%';

-- ============================================================
-- DIFUSORES PLASMA / MIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Difusor plasma S74; distribuye y enfría el gas en la antorcha de corte plasma.'
WHERE descripcion ILIKE '%DIFUSOR PLASMA S74%';

UPDATE producto SET descripcion_corta = 'Difusor Tough Lock SGB 350 A para pistola MIG Tregaskiss; distribuye el gas protector.'
WHERE descripcion ILIKE '%DIFUSOR TOUGH LOCK SGB 350%';

UPDATE producto SET descripcion_corta = 'Difusor Tough Lock SGB 500–600 A para pistola MIG Tregaskiss; distribuye el gas protector.'
WHERE descripcion ILIKE '%DIFUSOR TOUGH LOCK SGB 500%';

UPDATE producto SET descripcion_corta = 'Difusor para pistola MIG 54A; distribuye uniformemente el gas de protección en el arco.'
WHERE descripcion ILIKE '%54A DIFUSOR PISTOLA%';

-- ============================================================
-- FLEXIBLES / LINER MIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 1.6 mm para pistola MIG/MAG Bernard EZ-400/600; alambre de mayor diámetro.'
WHERE descripcion ILIKE '%FLEXIBLE BERNARD 1.6%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 0.9–1.2 mm 15" para pistola MIG/MAG; conduce el alambre de aporte.'
WHERE descripcion ILIKE '%FLEXIBLE 0.9-1.2 X 15%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 0.9–1.2 mm 4.57 m para pistola MIG Tregaskiss; mayor alcance en terreno.'
WHERE descripcion ILIKE '%FLEXIBLE 0.9%1.2%TREGASKISS%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 1.2–1.6 mm 4.57 m para pistola MIG Tregaskiss; mayor alcance en terreno.'
WHERE descripcion ILIKE '%FLEXIBLE 1.2%1.6%TREGASKISS%';

UPDATE producto SET descripcion_corta = 'Flexible guía-alambre 1.6–2.4 mm 4.57 m para pistola MIG Tregaskiss; alambres de gran diámetro.'
WHERE descripcion ILIKE '%FLEXIBLE 1.6%2.4%';

UPDATE producto SET descripcion_corta = 'Liner Tweco 44-116-15 para pistola MIG; guía interna de 1.2–1.6 mm compatible con pistolas Tweco.'
WHERE descripcion ILIKE '%LINER TWECO%';

-- ============================================================
-- PISTOLAS MIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Pistola MIG 300 A PEZ 300E, cable 15 pies; para soldadura MIG continua en producción.'
WHERE descripcion ILIKE '%PISTOLA MIG PEZ 300%';

UPDATE producto SET descripcion_corta = 'Pistola MIG 400 A PEZ 400E, cable 15 pies; alta capacidad para producción industrial.'
WHERE descripcion ILIKE '%PISTOLA MIG PEZ 400%';

UPDATE producto SET descripcion_corta = 'Pistola MIG TB200 Ø0.8 mm, refrigerada por aire; proceso continuo de mediano amperaje.'
WHERE descripcion ILIKE '%PISTOLA MIG TB200%';

UPDATE producto SET descripcion_corta = 'Pistola MIG TB400 cable 12 pies, refrigerada por aire; alta productividad en talleres.'
WHERE descripcion ILIKE '%PISTOLA MIG TB400%';

UPDATE producto SET descripcion_corta = 'Pistola MIG Tregaskiss 500 A conector europeo; robusta para producción industrial intensiva.'
WHERE descripcion ILIKE '%TREGASKISS 500A%';

UPDATE producto SET descripcion_corta = 'Pistola MIG Tregaskiss 350 A conector europeo, cable 4.5 m; versátil para uso en taller.'
WHERE descripcion ILIKE '%TREGASKISS%350%EURO%';

-- ============================================================
-- VARILLAS TIG — ACERO AL CARBONO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla TIG ER70S-2 Ø2.4 mm; soldadura TIG de acero al carbono y de baja aleación.'
WHERE descripcion ILIKE '%VARILLA TIG ER70S-2%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER80S-B2 Ø2.4 mm; aporte TIG para aceros Cr-Mo de baja temperatura (ASME P5A).'
WHERE descripcion ILIKE '%VARILLA TIG ER80S-B2%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER80S-B2 Ø3.2 mm; aporte TIG para aceros Cr-Mo de baja temperatura (ASME P5A).'
WHERE descripcion ILIKE '%VARILLA TIG ER80S-B2%' AND descripcion ILIKE '%1/8%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER80S-B6 Ø2.4 mm; aporte TIG para aceros Cr-Mo alta temperatura (5% Cr).'
WHERE descripcion ILIKE '%VARILLA TIG ER80S-B6%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER80S-B6 Ø3.2 mm; aporte TIG para aceros Cr-Mo alta temperatura (5% Cr).'
WHERE (descripcion ILIKE '%VARILLA TIG ER80S-B6%' OR descripcion ILIKE '%VARILLA TIGER80S-B6%') AND descripcion ILIKE '%1/8%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER80S-B8 Ø2.4 mm; aporte TIG para aceros Cr-Mo de alta aleación (9% Cr).'
WHERE descripcion ILIKE '%VARILLA TIG ER80S-B8%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER90S-B3 Ø2.4 mm; aporte TIG para aceros Cr-Mo resistentes al creep (2.25% Cr).'
WHERE descripcion ILIKE '%VARILLA TIG ER90S-B3%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER90S-B9 Ø2.4 mm; aporte TIG para aceros modificados 9Cr-1Mo-V de alta temperatura.'
WHERE descripcion ILIKE '%VARILLA TIG%ER90S-B9%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER90S-B9 Ø3.2 mm; aporte TIG para aceros modificados 9Cr-1Mo-V de alta temperatura.'
WHERE descripcion ILIKE '%VARILLA TIG%ER90S-B9%' AND descripcion ILIKE '%1/8%';

-- ============================================================
-- VARILLAS TIG — ACERO INOXIDABLE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla TIG ER308L Ø2.4 mm; aporte TIG para acero inox 304/308L; baja en carbono, antiórrosión.'
WHERE descripcion ILIKE '%VARILLA TIG 308L%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER308L Ø1.6 mm; aporte TIG para acero inox 304/308L en espesores finos.'
WHERE descripcion ILIKE '%VARILLA TIG 308L%' AND descripcion ILIKE '%1/16%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER308L Ø3.2 mm; aporte TIG para acero inox 304/308L en espesores gruesos.'
WHERE descripcion ILIKE '%VARILLA TIG 308L%' AND descripcion ILIKE '%1/8%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER309L Ø2.4 mm; aporte TIG para unión acero inox con acero al carbono o como base.'
WHERE descripcion ILIKE '%VARILLA TIG 309L%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER316L Ø1.6 mm; aporte TIG para acero inox 316L; mayor resistencia a cloruros.'
WHERE descripcion ILIKE '%VARILLA TIG 316L%' AND descripcion ILIKE '%1/16%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER316L Ø2.4 mm; aporte TIG para acero inox 316L; mayor resistencia a cloruros.'
WHERE descripcion ILIKE '%VARILLA TIG 316L%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER316L Ø3.2 mm; aporte TIG para acero inox 316L en piezas de mayor espesor.'
WHERE descripcion ILIKE '%VARILLA TIG 316L%' AND descripcion ILIKE '%1/8%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER347 Ø2.4 mm; aporte TIG para acero inox 347/321; estabilizado con Nb para alta temperatura.'
WHERE descripcion ILIKE '%VARILLA TIG ER347%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER347 Ø3.2 mm; aporte TIG para acero inox 347/321 en piezas de mayor espesor.'
WHERE descripcion ILIKE '%VARRILLA TIG ER347%' OR (descripcion ILIKE '%VARILLA TIG ER347%' AND descripcion ILIKE '%1/8%');

UPDATE producto SET descripcion_corta = 'Varilla TIG ER309MoL Ø2.4 mm; aporte TIG para disímiles inox/carbono con requerimiento de Mo.'
WHERE descripcion ILIKE '%VARILLA TIG ER309MOL%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER310 Ø2.4 mm; aporte TIG para acero inox 310; alta resistencia a oxidación.'
WHERE descripcion ILIKE '%VARILLA TIG ER310%';

-- ============================================================
-- VARILLAS TIG — NÍQUEL / ALEACIONES ESPECIALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla TIG ERNiCrMo-3 Ø2.4 mm (Inconel 625); soldadura de aleaciones de níquel y disímiles.'
WHERE descripcion ILIKE '%VARILLA TIG ERNICRMO-3%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ERNiCrMo-4 Ø2.4 mm (Hastelloy C-276); alta resistencia a corrosión en ambientes ácidos.'
WHERE descripcion ILIKE '%VARILLA TIG ERNICRMO-4%';

-- ============================================================
-- VARILLAS TIG — ALUMINIO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla TIG ER4043 Ø2.4 mm; aporte para soldadura TIG de aluminio y sus aleaciones serie 3xxx/6xxx.'
WHERE descripcion ILIKE '%VARILLA TIG ALUMINIO%' AND descripcion ILIKE '%3/32%';

UPDATE producto SET descripcion_corta = 'Varilla TIG ER4043 Ø3.2 mm; aporte para soldadura TIG de aluminio en espesores mayores.'
WHERE descripcion ILIKE '%VARILLA TIG ALUMINIO%' AND descripcion ILIKE '%1/8%';

-- ============================================================
-- VARILLAS PLATA / ESPECIALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla de plata AG 6% Ø2.4×500 mm; soldadura fuerte (brazing) de cobre, latón y acero.'
WHERE descripcion ILIKE '%VARILLA DE PLATA AG 6%%';

UPDATE producto SET descripcion_corta = 'Varilla de plata AG 15% Ø2.4×500 mm; mayor fluidez en uniones de cobre y acero inox.'
WHERE descripcion ILIKE '%VARILLA DE PLATA AG 15%%';

UPDATE producto SET descripcion_corta = 'Varilla de plata AG 35% FC Ø2.0×450 mm; alta resistencia en brazzing de metales disímiles.'
WHERE descripcion ILIKE '%VARILLA DE PLATA AG 35%%';

UPDATE producto SET descripcion_corta = 'Fundente en pasta para soldadura con varillas de plata (brazing); protege la unión del oxígeno.'
WHERE descripcion ILIKE '%FUNDENTE PLATA%';

-- ============================================================
-- VARILLA 127 / GRAFITO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Varilla 127 FX 1/8; varilla de aporte especial para aplicaciones de alta temperatura.'
WHERE descripcion ILIKE '%VARILLA 127 FX%';

UPDATE producto SET descripcion_corta = 'Electrodo de grafito Ø5/32×12"; para gouging (ranurado) y corte de metales con arco.'
WHERE descripcion ILIKE '%GRAFITO%5/32%';

UPDATE producto SET descripcion_corta = 'Electrodo de grafito Ø3/16×12"; para gouging (ranurado) y corte de metales con arco.'
WHERE descripcion ILIKE '%GRAFITO%3/16%';

UPDATE producto SET descripcion_corta = 'Electrodo de grafito Ø1/4×12"; para gouging de mayor velocidad en aceros gruesos.'
WHERE descripcion ILIKE '%GRAFITO%1/4%';

UPDATE producto SET descripcion_corta = 'Electrodo de grafito Ø5/16×12"; para gouging de alta capacidad en reparaciones industriales.'
WHERE descripcion ILIKE '%GRAFITO%5/16%';

UPDATE producto SET descripcion_corta = 'Electrodo de grafito Ø3/8×12"; para gouging de máxima capacidad en estructuras pesadas.'
WHERE descripcion ILIKE '%GRAFITO%3/8%';

-- ============================================================
-- ALAMBRES MIG — ACERO AL CARBONO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre MIG ER70S-6 Ø0.8 mm spool 15 kg; soldadura MIG de acero al carbono con protección CO2/mezcla.'
WHERE descripcion ILIKE '%ALAMBRE MIG%70S-6%0.8%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER70S-6 Ø1.0 mm spool 15 kg; soldadura MIG de acero al carbono con alta tasa de deposición.'
WHERE descripcion ILIKE '%ALAMBRE MIG%70S-6%1.0%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER70S-6 Ø1.2 mm spool 15 kg; soldadura MIG de acero al carbono; mayor productividad.'
WHERE descripcion ILIKE '%ALAMBRE MIG%70S-6%1.2%';

-- ============================================================
-- ALAMBRES MIG — ALUMINIO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre MIG ER4043 Ø1.2 mm; soldadura MIG de aluminio serie 3xxx/6xxx con argón puro.'
WHERE descripcion ILIKE '%ALAMBRE MIG ER4043%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER5356 Ø1.0 mm spool 2 kg; soldadura MIG de aluminio serie 5xxx de alta resistencia.'
WHERE descripcion ILIKE '%ALAMBRE MIG ER5356%';

-- ============================================================
-- ALAMBRES MIG — ACERO INOXIDABLE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre MIG ER308L Ø1.2 mm; soldadura MIG de acero inox 304/308L; bajo carbono, anticorrosión.'
WHERE descripcion ILIKE '%ALAMBRE MIG 308L%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER309L Ø1.2 mm; soldadura MIG de uniones disímiles inox/carbono o como base buffer.'
WHERE descripcion ILIKE '%ALAMBRE MIG 309L%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER316L Ø0.9 mm; soldadura MIG de acero inox 316L; mayor resistencia a cloruros.'
WHERE descripcion ILIKE '%ALAMBRE MIG 316L%' AND descripcion ILIKE '%0.9%';

UPDATE producto SET descripcion_corta = 'Alambre MIG ER316L Ø1.2 mm; soldadura MIG de acero inox 316L en espesores medios y gruesos.'
WHERE descripcion ILIKE '%ALAMBRE MIG 316L%' AND descripcion ILIKE '%1.2%';

-- ============================================================
-- ALAMBRES TUBULARES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Alambre tubular AWS E71T-1 Ø1.2 mm spool 15 kg; alta deposición en acero estructural bajo CO2.'
WHERE descripcion ILIKE '%A.TUBULAR 71T-1%' AND descripcion ILIKE '%1.2%';

UPDATE producto SET descripcion_corta = 'Alambre tubular AWS E71T-1 Ø1.6 mm spool 15 kg; mayor deposición en piezas gruesas bajo CO2.'
WHERE descripcion ILIKE '%A.TUBULAR 71T-1%' AND descripcion ILIKE '%1.6%';

UPDATE producto SET descripcion_corta = 'Alambre tubular E71T-11 Ø1.6 mm autoprotegido; sin gas externo, apto para trabajo en terreno.'
WHERE descripcion ILIKE '%ALAMBRE TUBULAR%71T-11%';

UPDATE producto SET descripcion_corta = 'Alambre tubular E71GS Ø0.9 mm spool 5 kg autoprotegido; proceso MIG-sin gas para soldaduras livianas.'
WHERE descripcion ILIKE '%ALAMBRE TUBULAR 71GS%';

UPDATE producto SET descripcion_corta = 'Alambre tubular ER309LT1 Ø1.2 mm; alta deposición para recubrimientos y uniones inox/carbono.'
WHERE descripcion ILIKE '%A.TUBULAR 309LT1%';

UPDATE producto SET descripcion_corta = 'Alambre tubular ER316L-T1 Ø1.2 mm; alta deposición en acero inox 316L resistente a cloruros.'
WHERE descripcion ILIKE '%ALAMBRE TUBULAR 316L-T1%';

UPDATE producto SET descripcion_corta = 'Alambre tubular FABCO 803 Ø1.6 mm; alta resistencia y tenacidad para aceros de baja aleación.'
WHERE descripcion ILIKE '%A.TUBULAR FABCO 803%';

-- ============================================================
-- ELECTRODOS DE SOLDADURA (revestidos)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Electrodo revestido E2209 Ø3.2 mm (1/8"); para soldadura de acero inox duplex 2205.'
WHERE descripcion ILIKE '%ELECTRODO 2209%' AND (descripcion ILIKE '%1/8%' OR descripcion ILIKE '%3.2%');

UPDATE producto SET descripcion_corta = 'Electrodo revestido E2209 Ø2.4 mm (3/32"); para soldadura de acero inox duplex 2205 en espesores finos.'
WHERE descripcion ILIKE '%ELECTRODO 2209%' AND (descripcion ILIKE '%3/32%' OR descripcion ILIKE '%2.4%');

UPDATE producto SET descripcion_corta = 'Electrodo revestido ENiCrMo-3 Ø3.2 mm (1/8"); para uniones de aleaciones de níquel e Inconel.'
WHERE descripcion ILIKE '%ELECTRODO ENICRMO-3%';

-- ============================================================
-- ELECTRODOS TUNGSTENO TIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Electrodo de tungsteno 2% Torio Ø3/32" (2.4 mm); excelente capacidad de corriente en acero y inox.'
WHERE descripcion ILIKE '%TUNGSTENO%TORIO%3/32%' OR (descripcion ILIKE '%TUNGSTENO%THORIO%3/32%');

UPDATE producto SET descripcion_corta = 'Electrodo de tungsteno 2% Torio Ø1/16" (1.6 mm); para soldadura TIG de precisión en espesores finos.'
WHERE descripcion ILIKE '%TUNGSTENO%TORIO%1/16%' OR (descripcion ILIKE '%TUNGSTENO%THORIO%1/16%');

UPDATE producto SET descripcion_corta = 'Electrodo de tungsteno 2% Torio Ø1/8" (3.2 mm); alta capacidad de corriente para piezas gruesas.'
WHERE descripcion ILIKE '%TUNGSTENO%THORIO%1/8%' OR (descripcion ILIKE '%TUNGSTENO%TORIO%1/8%');

UPDATE producto SET descripcion_corta = 'Electrodo de tungsteno 1.5% Lantanado; versátil para AC/DC, menor radioactividad que los toriados.'
WHERE descripcion ILIKE '%TUNGSTENO%1.5%%LANTH%';

-- ============================================================
-- DISCOS DE CORTE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Disco de corte 4½" × 3.2 mm para acero al carbono; corte rápido con esmeril angular.'
WHERE descripcion ILIKE '%DISCO CORTE%4 1/2%' AND descripcion NOT ILIKE '%INOX%' AND descripcion NOT ILIKE '%FINO%';

UPDATE producto SET descripcion_corta = 'Disco de corte 7" × 3.2 mm para acero al carbono; corte de perfil y planchas medianas.'
WHERE descripcion ILIKE '%DISCO CORTE 7X3%' AND descripcion NOT ILIKE '%INOX%' AND descripcion NOT ILIKE '%FINO%';

UPDATE producto SET descripcion_corta = 'Disco de corte 9" × 3.2 mm para acero al carbono; corte en piezas de mayor espesor.'
WHERE descripcion ILIKE '%DISCO CORTE 9X3%' AND descripcion NOT ILIKE '%INOX%' AND descripcion NOT ILIKE '%FINO%';

UPDATE producto SET descripcion_corta = 'Disco de corte 14" × 3.2 mm para acero al carbono; corte en sierra y trozadora industrial.'
WHERE descripcion ILIKE '%DISCO CORTE 14X%';

UPDATE producto SET descripcion_corta = 'Disco de corte 4½" para acero inoxidable; formulación sin hierro, previene contaminación ferrosa.'
WHERE descripcion ILIKE '%DISCO CORTE%INOX%4%' AND descripcion NOT ILIKE '%7%' AND descripcion NOT ILIKE '%9%';

UPDATE producto SET descripcion_corta = 'Disco de corte 7" para acero inoxidable; corte de perfiles y planchas sin contaminación ferrosa.'
WHERE descripcion ILIKE '%DISCO CORTE%INOX%7%';

UPDATE producto SET descripcion_corta = 'Disco de corte fino 4½" × 1.0 mm; corte de precisión en chapa delgada con mínima pérdida de material.'
WHERE descripcion ILIKE '%DISCO CORTE FINO%4%1.0%';

UPDATE producto SET descripcion_corta = 'Disco de corte fino 7" × 1.6 mm; corte de precisión en perfiles y barras con menor rebaba.'
WHERE descripcion ILIKE '%DISCO CORTE FINO 7%';

UPDATE producto SET descripcion_corta = 'Disco de corte fino 9" × 1.9 mm INOXER; corte de inox con alta precisión y mínimo calentamiento.'
WHERE descripcion ILIKE '%DISCO CORTE FINO 9%';

UPDATE producto SET descripcion_corta = 'Disco de corte Indura para inox 9" × 3.2 mm; corte de acero inoxidable sin contaminación.'
WHERE descripcion ILIKE '%DISCO CORTE INOXER 9%';

-- ============================================================
-- DISCOS DE DESBASTE
-- ============================================================
UPDATE producto SET descripcion_corta = 'Disco de desbaste 4½" × 6 mm; eliminación rápida de material en acero al carbono.'
WHERE descripcion ILIKE '%DISCO DESBASTE%4 1/2%' AND descripcion NOT ILIKE '%INOX%';

UPDATE producto SET descripcion_corta = 'Disco de desbaste 7" × 6.4 mm; alto rendimiento en desbaste de acero al carbono.'
WHERE descripcion ILIKE '%DISCO DESBASTE 7X%' AND descripcion NOT ILIKE '%INOX%';

UPDATE producto SET descripcion_corta = 'Disco de desbaste 9" × 6.4 mm; desbaste agresivo en piezas grandes de acero al carbono.'
WHERE descripcion ILIKE '%DISCO DESBASTE 9X%' AND descripcion NOT ILIKE '%INOX%';

UPDATE producto SET descripcion_corta = 'Disco de desbaste 7" para acero inoxidable; formulación sin hierro para evitar contaminación.'
WHERE descripcion ILIKE '%DISCO DESBASTE INOX%7%';

UPDATE producto SET descripcion_corta = 'Disco de desbaste 4½" para acero inoxidable; desbaste sin contaminación ferrosa.'
WHERE descripcion ILIKE '%DISCO DESBASTE INOX%4%';

-- ============================================================
-- DISCOS DE LÁMINA / LIJA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Disco de láminas plásticas 4½" grano 40; desbaste agresivo y acabado inicial en metales.'
WHERE descripcion ILIKE '%DISCO DE LAMINA EN PLASTICA%' AND descripcion ILIKE '%N 40%';

UPDATE producto SET descripcion_corta = 'Disco de láminas plásticas 4½" grano 60; desbaste intermedio y afinado de superficies metálicas.'
WHERE descripcion ILIKE '%DISCO DE LAMINA EN PLASTICA%' AND descripcion ILIKE '%N 60%';

UPDATE producto SET descripcion_corta = 'Disco de láminas plásticas 4½" grano 80; acabado intermedio en metales y soldaduras.'
WHERE descripcion ILIKE '%DISCO DE LAMINA EN PLASTICA%' AND descripcion ILIKE '%N 80%';

UPDATE producto SET descripcion_corta = 'Disco de láminas plásticas 4½" grano 120; acabado fino en metales; mínimas marcas de rectificado.'
WHERE descripcion ILIKE '%DISCO DE LAMINA EN PLASTICA%' AND descripcion ILIKE '%N 120%';

UPDATE producto SET descripcion_corta = 'Disco laminado HD 4½" grano 80 ZA; desbaste y acondicionado de superficie en acero al carbono.'
WHERE descripcion ILIKE '%DISCO LAMINADO%HD%';

-- ============================================================
-- DISCOS DIAMANTADOS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Disco diamantado 4½" continuo; corte de hormigón, cerámica y piedra con esmeril angular.'
WHERE descripcion ILIKE '%DISCO DIAMANTADO 41/2%CONTINUO%';

UPDATE producto SET descripcion_corta = 'Disco diamantado 7" continuo; corte de hormigón y piedra con esmeril de 7".'
WHERE descripcion ILIKE '%DISCO DIAMANTADO 7%CONTINUO%';

UPDATE producto SET descripcion_corta = 'Disco diamantado 4½" segmentado; corte de hormigón seco con mayor disipación de calor.'
WHERE descripcion ILIKE '%DISCO DIAMANTADO 41/2%SEGMENT%';

UPDATE producto SET descripcion_corta = 'Disco diamantado 7" segmentado; corte de hormigón seco de alta velocidad.'
WHERE descripcion ILIKE '%DISCO DIAMANTADO 7%SEGMENT%';

-- ============================================================
-- ESMERILES ANGULARES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Esmeril angular Makita 4½" 1400 W; potente y compacto para corte y desbaste en obra.'
WHERE descripcion ILIKE '%ESMERIL ANGULAR%4 1/2%MAKITA%';

UPDATE producto SET descripcion_corta = 'Esmeril angular Makita 9557 HP 4½"; diseño ergonómico para trabajos de larga duración.'
WHERE descripcion ILIKE '%ESMERIL 9557%';

UPDATE producto SET descripcion_corta = 'Esmeril angular Makita 7" 260 W; potencia extra para desbaste en piezas grandes.'
WHERE descripcion ILIKE '%ESMERIL ANGULAR 7%MAKITA%';

UPDATE producto SET descripcion_corta = 'Esmeril angular Metabo W24-180 MTV; alta potencia y vibración reducida para trabajo profesional.'
WHERE descripcion ILIKE '%ESMERIL ANGULAR METABO%';

UPDATE producto SET descripcion_corta = 'Rectificador de matrices Metabo GE710 Plus; para fresas y limas rotativas en piezas de precisión.'
WHERE descripcion ILIKE '%RECTIFICADOR MATRICES%';

-- ============================================================
-- EPP — GUANTES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Guante soldador cuero descarne AT19; protección térmica básica para soldadura por electrodo.'
WHERE descripcion ILIKE '%GUANTE SOLDADOR AT19%';

UPDATE producto SET descripcion_corta = 'Guante de cuero cabritilla natural sin forro; protección suave para soldadura TIG de precisión.'
WHERE descripcion ILIKE '%GUANTE CABRITILLA NATURAL%';

UPDATE producto SET descripcion_corta = 'Guante de cuero descarne natural para soldadura; resistente al calor e impactos en MIG/MMA.'
WHERE descripcion ILIKE '%GUANTE SOLDADOR DESCARNE NATURAL%';

UPDATE producto SET descripcion_corta = 'Guante TIG cabritilla largo; máximo tacto y protección hasta el antebrazo para soldadura TIG.'
WHERE descripcion ILIKE '%GUANTE SOLDADOR TIG%';

UPDATE producto SET descripcion_corta = 'Guante criogénico largo para nitrógeno líquido; protección contra quemaduras por frío extremo.'
WHERE descripcion ILIKE '%GUANTE%CRIOGENICO%';

UPDATE producto SET descripcion_corta = 'Guante de cuero Indura rojo para soldadura; resistencia al calor y chispas en trabajos de MMA.'
WHERE descripcion ILIKE '%GUANTE SOLDADOR INDURA%';

UPDATE producto SET descripcion_corta = 'Guante anticorte con puño de tejido; protección nivel A contra cortes en manejo de piezas.'
WHERE descripcion ILIKE '%GUANTE ANTICORTE%';

UPDATE producto SET descripcion_corta = 'Guante nitrilo verde flocado T9; agarre en húmedo y protección química para trabajos industriales.'
WHERE descripcion ILIKE '%GUANTE NITRITEX%' AND descripcion ILIKE '%9%';

UPDATE producto SET descripcion_corta = 'Guante nitrilo verde flocado T10; agarre en húmedo y protección química para manos grandes.'
WHERE descripcion ILIKE '%GUANTE NITRITEX%' AND descripcion ILIKE '%10%';

UPDATE producto SET descripcion_corta = 'Guante látex negro de albañil; resistencia mecánica y a la abrasión en trabajos de construcción.'
WHERE descripcion ILIKE '%GUANTE LATEX ALBANIL%';

UPDATE producto SET descripcion_corta = 'Guante de trabajo Rock Yellow-Flex; alta flexibilidad y agarre para manipulación de piezas.'
WHERE descripcion ILIKE '%GUANTE ROCK YELLOW%';

UPDATE producto SET descripcion_corta = 'Guante de trabajo Rock Orange-Flex; alta resistencia mecánica con comodidad en faena.'
WHERE descripcion ILIKE '%GUANTE ROCK ORANGE%';

-- ============================================================
-- EPP — CABEZA (cascos, lentes, respiradores)
-- ============================================================
UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III rojo; protección contra impactos, apto para industria y construcción.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III ROJO%';

UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III verde; protección contra impactos, uso industrial y de construcción.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III VERDE%' OR descripcion ILIKE '%CASCO DE SEGURIDAD PROSEG VERDE%';

UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III blanco; protección contra impactos para jefaturas y supervisión.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III BLANCO%';

UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III azul; protección contra impactos para operaciones industriales.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III AZUL%';

UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III amarillo; alta visibilidad para operadores en zonas de tránsito.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III AMARILLO%';

UPDATE producto SET descripcion_corta = 'Casco de seguridad EVO III gris; protección ante impactos en ambientes industriales.'
WHERE descripcion ILIKE '%CASCO DE SEGURIDAD EVO III GRIS%';

UPDATE producto SET descripcion_corta = 'Barbiquejo con gancho plástico; sujeta el casco de seguridad en trabajos con movimiento.'
WHERE descripcion ILIKE '%BARBIQUEJO CON GANCHO PLASTICO%';

UPDATE producto SET descripcion_corta = 'Barbiquejo con gancho metálico Gama; sujeción reforzada del casco en trabajos de altura.'
WHERE descripcion ILIKE '%BARBIQUEJO CON GANCHO METALICO%';

UPDATE producto SET descripcion_corta = 'Arnés interior de repuesto para casco MSA V-Gard MAS FAST; reemplaza la suspensión interna.'
WHERE descripcion ILIKE '%ARNES PARA CASCO%';

UPDATE producto SET descripcion_corta = 'Portavisor para casco de seguridad; accesorio que fija visores de protección facial al casco.'
WHERE descripcion ILIKE '%PORTAVISOR%CASCO%';

UPDATE producto SET descripcion_corta = 'Visor de policarbonato claro 8×16"; protección facial completa ante salpicaduras e impactos.'
WHERE descripcion ILIKE '%VISOR POLICARBONATO CLARO%';

-- LENTES
UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Alfa ámbar; mejora contraste en condiciones de poca luz y nublado.'
WHERE descripcion ILIKE '%LENTE MAN ALFA AMBAR%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Alfa claro AF; antiempañante para uso en ambientes cerrados.'
WHERE descripcion ILIKE '%LENTE MAN ALFA AF CLARO%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Alfa In-Out; lente transición para paso entre interior y exterior.'
WHERE descripcion ILIKE '%LENTE MAN ALFA AF IN-OUT%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Alfa gris AF; reducción de deslumbramiento solar en trabajos exteriores.'
WHERE descripcion ILIKE '%LENTE MAN ALFA AF GRIS%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Fox EVA claro; marco suave y sellado lateral para trabajos en polvo.'
WHERE descripcion ILIKE '%LENTE MAN FOX EVA CLARO%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Fox EVA In-Out; transición automática para exteriores con EVA lateral.'
WHERE descripcion ILIKE '%LENTE MAN FOX EVA IN-OUT%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Fox EVA gris; protección solar con sello lateral de EVA.'
WHERE descripcion ILIKE '%LENTE MAN FOX EVA GRIS%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Eco claro; diseño económico para protección ocular básica en faena.'
WHERE descripcion ILIKE '%LENTE MAN ECO CLARO%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad MAN Eco gris; protección solar básica para trabajo al aire libre.'
WHERE descripcion ILIKE '%LENTE MAN ECO GRIS%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad US Eagle Tech Plus claro; antiempañante para trabajos interiores y de precisión.'
WHERE descripcion ILIKE '%LENTE US EAGLE TECH PLUS CLARO%';

UPDATE producto SET descripcion_corta = 'Lente de seguridad US Eagle Tech Plus gris; protección solar para uso exterior de larga jornada.'
WHERE descripcion ILIKE '%LENTE US EAGLE TECH PLUS GRIS%';

UPDATE producto SET descripcion_corta = 'Lente Steelpro X5 Dual claro AF; doble cubierta y antiempañante para ambientes polvorientos.'
WHERE descripcion ILIKE '%LENTE STEELPRO X5%';

UPDATE producto SET descripcion_corta = 'Antiparra Jupiter clara con soporte óptico; compatible con lentes de aumento para precisión.'
WHERE descripcion ILIKE '%ANTIPARRA JUPITER%';

-- TAPONES AUDITIVOS
UPDATE producto SET descripcion_corta = 'Tapón auditivo 3M 1100 desechable; reducción de ruido NRR 29 dB para ambientes ruidosos.'
WHERE descripcion ILIKE '%TAPON AUDITIVO 3M 1100%';

UPDATE producto SET descripcion_corta = 'Tapón auditivo 3M 1110 desechable con cordón; NRR 29 dB, fácil recuperación en faena.'
WHERE descripcion ILIKE '%TAPON AUDITIVO 3M 1110%';

UPDATE producto SET descripcion_corta = 'Tapón reutilizable 3M 1270; lavable y de larga duración para uso diario en industria ruidosa.'
WHERE descripcion ILIKE '%TAPON REUSABLE 3M 1270%';

UPDATE producto SET descripcion_corta = 'Tapón reutilizable 3M 1271 en caja; lavable con estuche de almacenamiento para higiene.'
WHERE descripcion ILIKE '%TAPON REUSABLE 3M 1271%';

UPDATE producto SET descripcion_corta = 'Tapón reutilizable AIR 127; triple reborde para sellado progresivo en distintos canales auditivos.'
WHERE descripcion ILIKE '%TAPON REUSABLE AIR 127%';

-- FONOS
UPDATE producto SET descripcion_corta = 'Fono para casco Steelpro; orejeras de atenuación de ruido que se acoplan al casco de seguridad.'
WHERE descripcion ILIKE '%FONO PARA CASCO%';

UPDATE producto SET descripcion_corta = 'Fono Samurai con cintillo; orejeras independientes de alta atenuación para trabajo en ruido extremo.'
WHERE descripcion ILIKE '%FONO SAMURAI%';

-- RESPIRADORES
UPDATE producto SET descripcion_corta = 'Respirador 3M 6200 silicona talla M, 2 vías; marco cómodo para filtros de gases y partículas.'
WHERE descripcion ILIKE '%RESPIRADOR 3M 6200%';

UPDATE producto SET descripcion_corta = 'Respirador 3M 6300 silicona talla L, 2 vías; marco cómodo para filtros de gases y partículas.'
WHERE descripcion ILIKE '%RESPIRADOR 3M 6300%';

UPDATE producto SET descripcion_corta = 'Respirador 3M 6800 cara completa talla M; sello facial total para ambientes con gases y vapores.'
WHERE descripcion ILIKE '%RESPIRADOR 3M 6800%';

UPDATE producto SET descripcion_corta = 'Mascarilla 3M 8511 con válvula; filtra partículas P95 con válvula de exhalación para mayor frescura.'
WHERE descripcion ILIKE '%MASCARILLA 3M 8511%';

UPDATE producto SET descripcion_corta = 'Máscara 3M 8210-V para partículas con válvula; protección N95 en ambientes de polvo y humo.'
WHERE descripcion ILIKE '%MASCARA 3M 8210%';

-- FILTROS RESPIRADOR
UPDATE producto SET descripcion_corta = 'Filtro 3M 6004 para amoniaco y metilamina; apto para atmósferas con gases orgánicos básicos.'
WHERE descripcion ILIKE '%FILTRO 3M 6004%';

UPDATE producto SET descripcion_corta = 'Filtro 3M 60923 mixto P100; filtra gases orgánicos, ácidos, vapores y partículas P100.'
WHERE descripcion ILIKE '%FILTRO 3M 60923%';

-- PANTALLA SOLAR CASCO
UPDATE producto SET descripcion_corta = 'Pantalla solar para casco MSA V-Gard; protege cuello y nuca de radiación UV en trabajo exterior.'
WHERE descripcion ILIKE '%PANTALLA SOLAR%CASCO%';

-- ============================================================
-- EPP — ROPA DE TRABAJO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Overol poplin azul T.M con cinta reflectante; ropa de trabajo estándar con alta visibilidad.'
WHERE descripcion ILIKE '%OVEROL POPLIN AZUL%' AND descripcion ILIKE '%T.M%';

UPDATE producto SET descripcion_corta = 'Overol poplin azul T.L con cinta reflectante; ropa de trabajo estándar con alta visibilidad.'
WHERE descripcion ILIKE '%OVEROL POPLIN AZUL%' AND descripcion ILIKE '%T.L%';

UPDATE producto SET descripcion_corta = 'Overol poplin azul T.XL con cinta reflectante; ropa de trabajo estándar con alta visibilidad.'
WHERE descripcion ILIKE '%OVEROL POPLIN AZUL%' AND descripcion ILIKE '%T.XL%';

UPDATE producto SET descripcion_corta = 'Overol poplin azul T.XXL con cinta reflectante; ropa de trabajo estándar con alta visibilidad.'
WHERE descripcion ILIKE '%OVEROL POPLIN AZUL%' AND descripcion ILIKE '%T.XXL%';

UPDATE producto SET descripcion_corta = 'Overol poplin naranjo T.M con cinta reflectante; alta visibilidad para trabajo vial e industrial.'
WHERE descripcion ILIKE '%OVEROL POPLIN NARANJO%' AND descripcion ILIKE '%T.M%';

UPDATE producto SET descripcion_corta = 'Overol poplin naranjo T.L con cinta reflectante; alta visibilidad para trabajo vial e industrial.'
WHERE descripcion ILIKE '%OVEROL POPLIN NARANJO%' AND descripcion ILIKE '%T.L%';

UPDATE producto SET descripcion_corta = 'Overol poplin naranjo T.XL con cinta reflectante; alta visibilidad para trabajo vial e industrial.'
WHERE descripcion ILIKE '%OVEROL POPLIN NARANJO%' AND descripcion ILIKE '%T.XL%';

UPDATE producto SET descripcion_corta = 'Overol poplin naranjo T.XXL con cinta reflectante; alta visibilidad para trabajo vial e industrial.'
WHERE descripcion ILIKE '%OVEROL POPLIN NARANJO%' AND descripcion ILIKE '%T.XXL%';

UPDATE producto SET descripcion_corta = 'Overol canvas naranjo T.L con cinta reflectante; mayor resistencia mecánica para faenas exigentes.'
WHERE descripcion ILIKE '%OVEROL CANVAS%' AND descripcion ILIKE '%T/L%';

UPDATE producto SET descripcion_corta = 'Overol canvas naranjo T.XL con cinta reflectante; mayor resistencia mecánica para faenas exigentes.'
WHERE descripcion ILIKE '%OVEROL CANVAS%' AND descripcion ILIKE '%T/XL%';

UPDATE producto SET descripcion_corta = 'Overol antiácido con cinta T-XXL; protección contra salpicaduras ácidas en plantas químicas.'
WHERE descripcion ILIKE '%OVEROL ANTIACIDO%';

UPDATE producto SET descripcion_corta = 'Overol ignífugo naranjo T-XL; protección ante llama y calor radiante para trabajos con riesgo de incendio.'
WHERE descripcion ILIKE '%OVEROL IGNIFUGO NARANJO%' AND (descripcion ILIKE '%T-XL%' OR descripcion ILIKE '%T/XL%');

UPDATE producto SET descripcion_corta = 'Overol ignífugo naranjo T-XXL; protección ante llama y calor radiante para tallas grandes.'
WHERE descripcion ILIKE '%OVEROL IGNIFUGO NARANJO%' AND (descripcion ILIKE '%T-XXL%' OR descripcion ILIKE '%T/XXL%');

UPDATE producto SET descripcion_corta = 'Overol ignífugo azul T-XL; protección ante llama para industria de hidrocarburos y eléctrica.'
WHERE descripcion ILIKE '%OVEROL IGNIFUGO AZUL%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T44; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/44%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T46; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/46%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T48; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/48%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T50; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/50%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T52; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/52%';

UPDATE producto SET descripcion_corta = 'Pantalón mezclilla prelavada T54; ropa de trabajo diaria cómoda y resistente.'
WHERE descripcion ILIKE '%PANTALON MEZCLILLA PRELAVADA%' AND descripcion ILIKE '%T/54%';

UPDATE producto SET descripcion_corta = 'Buzo desechable blanco Cleantex T/L; para trabajo en ambientes contaminados o pintado.'
WHERE descripcion ILIKE '%BUZO DESECHABLE BLANCO%' AND (descripcion ILIKE '%T/L%' OR descripcion ILIKE '%T-L%') AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Buzo desechable blanco Cleantex T/XL; para trabajo en ambientes contaminados o pintado.'
WHERE descripcion ILIKE '%BUZO DESECHABLE BLANCO%' AND (descripcion ILIKE '%T/XL%' OR descripcion ILIKE '%T-XL%') AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Buzo desechable blanco T/XXL; para trabajo en ambientes contaminados o pintado.'
WHERE descripcion ILIKE '%BUZO DESECHABLE%' AND (descripcion ILIKE '%T/XXL%' OR descripcion ILIKE '%T-XXL%') AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Steelgen T/L; protección contra partículas para trabajos de limpieza industrial.'
WHERE descripcion ILIKE '%BUZO STEELGEN%' AND descripcion ILIKE '%T/L%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Steelgen T/XL; protección contra partículas para trabajos de limpieza industrial.'
WHERE descripcion ILIKE '%BUZO STEELGEN%' AND descripcion ILIKE '%T/XL%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Steelgen T/XXL; protección contra partículas para trabajos de limpieza industrial.'
WHERE descripcion ILIKE '%BUZO STEELGEN%' AND descripcion ILIKE '%T/XXL%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Safex T/L; barrera contra agentes biológicos y partículas finas.'
WHERE descripcion ILIKE '%BUZO SAFEX%' AND descripcion ILIKE '%T/L%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Safex T/XL; barrera contra agentes biológicos y partículas finas.'
WHERE descripcion ILIKE '%BUZO SAFEX%' AND descripcion ILIKE '%T/XL%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Safex T/XXL; barrera contra agentes biológicos y partículas finas.'
WHERE descripcion ILIKE '%BUZO SAFEX%' AND descripcion ILIKE '%T/XXL%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Safex T/XXXL; barrera contra agentes biológicos y partículas finas.'
WHERE descripcion ILIKE '%BUZO SAFEX%' AND descripcion ILIKE '%T/XXXL%';

UPDATE producto SET descripcion_corta = 'Buzo blanco certificado Blackbull T/XL; protección contra partículas y salpicaduras leves.'
WHERE descripcion ILIKE '%BUZO BLACKBULL%';

UPDATE producto SET descripcion_corta = 'Buzo de protección Steelpro 7730B T-XXL; protección tipo 5/6 contra polvos y líquidos.'
WHERE descripcion ILIKE '%BUZO DE PROTECCION STEELPRO%';

UPDATE producto SET descripcion_corta = 'Buzo térmico Vectortex naranjo/azul con cinta T/L; abrigo y visibilidad para trabajos nocturnos.'
WHERE descripcion ILIKE '%BUZO TERMICO VECTORTEX%' AND descripcion ILIKE '%C/CINTA L%';

UPDATE producto SET descripcion_corta = 'Buzo térmico Vectortex naranjo/azul con cinta T/XL; abrigo y visibilidad para trabajos nocturnos.'
WHERE descripcion ILIKE '%BUZO TERMICO VECTORTEX%' AND descripcion ILIKE '%C/CINTA XL%';

UPDATE producto SET descripcion_corta = 'Buzo térmico Vectortex naranjo/azul con cinta T/XXL; abrigo y visibilidad para faenas frías.'
WHERE descripcion ILIKE '%BUZO TERMICO VECTORTEX%' AND descripcion ILIKE '%C/CINTA XXL%';

UPDATE producto SET descripcion_corta = 'Balaclava térmica HW No Wind negra; protección completa de cabeza y cuello ante el frío.'
WHERE descripcion ILIKE '%BALACLAVA TERMICA%';

-- CHALECOS
UPDATE producto SET descripcion_corta = 'Chaleco reflectante clase 2 naranja; alta visibilidad para trabajos en vías y señalización.'
WHERE descripcion ILIKE '%CHALECO REFLECTANTE%' AND descripcion ILIKE '%NARANJO%';

UPDATE producto SET descripcion_corta = 'Chaleco reflectante clase 2 verde neón; alta visibilidad para supervisores y trabajos en vías.'
WHERE descripcion ILIKE '%CHALECO REFLECTANTE%' AND descripcion ILIKE '%VERDE%';

UPDATE producto SET descripcion_corta = 'Chaleco geólogo de lona naranja T/L; múltiples bolsillos para herramientas de campo.'
WHERE descripcion ILIKE '%CHALECO GEOLOGO%' AND descripcion ILIKE '%NARANJO%' AND descripcion ILIKE '%L%' AND descripcion NOT ILIKE '%XL%';

UPDATE producto SET descripcion_corta = 'Chaleco geólogo de lona naranja T/XL; múltiples bolsillos para herramientas de campo.'
WHERE descripcion ILIKE '%CHALECO GEOLOGO%' AND descripcion ILIKE '%NARANJO%' AND descripcion ILIKE '%XL%' AND descripcion NOT ILIKE '%XXL%';

UPDATE producto SET descripcion_corta = 'Chaleco geólogo de lona naranja T/M; múltiples bolsillos para herramientas de campo.'
WHERE descripcion ILIKE '%CHALECO GEOLOGO%' AND descripcion ILIKE '%NARANJO%' AND descripcion ILIKE '% M %';

UPDATE producto SET descripcion_corta = 'Chaleco geólogo de lona naranja T/XXL; múltiples bolsillos para herramientas de campo.'
WHERE descripcion ILIKE '%CHALECO GEOLOGO%' AND descripcion ILIKE '%NARANJO%' AND descripcion ILIKE '%XXL%';

UPDATE producto SET descripcion_corta = 'Chaleco geólogo azul con múltiples bolsillos; para trabajo de campo e inspección técnica.'
WHERE descripcion ILIKE '%CHALECO GEOLOGO AZUL%';

-- EPP SOLDADOR
UPDATE producto SET descripcion_corta = 'Gorro de cuero para soldador; protege la cabeza de salpicaduras y calor radiante del arco.'
WHERE descripcion ILIKE '%GORRO SOLDADOR DE CUERO%';

UPDATE producto SET descripcion_corta = 'Gorro de tela especial para soldador; protección ligera para soldaduras en posición.'
WHERE descripcion ILIKE '%GORRO TELA SOLDADOR%';

UPDATE producto SET descripcion_corta = 'Manguilla de cuero para soldador; protege el antebrazo de salpicaduras y calor radiante.'
WHERE descripcion ILIKE '%MANGUILLA SOLDADOR%';

UPDATE producto SET descripcion_corta = 'Polaina de descarne con velcro; protege el pie y tobillo de salpicaduras al soldar.'
WHERE descripcion ILIKE '%POLAINA DE DESCARNE%';

UPDATE producto SET descripcion_corta = 'Chaqueta de cuero descarne talla XL; protección completa de torso y brazos en soldadura MMA.'
WHERE descripcion ILIKE '%CHAQUETA DE CUERO%';

UPDATE producto SET descripcion_corta = 'Coleto de cuero descarne de una pieza; protección de tronco y piernas para soldadura en terreno.'
WHERE descripcion ILIKE '%COLETO SOLDADOR DE DESCARNE%';

-- ============================================================
-- VIDRIOS Y POLICARBONATOS PARA MASCARAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Vidrio transparente de protección para careta (paquete 5 unidades); protege el cristal filtrante.'
WHERE descripcion ILIKE '%VIDRIO TRANSP%MASCARA%';

UPDATE producto SET descripcion_corta = 'Cristal filtrante grado 10 para máscara de soldar; atenúa radiación ultravioleta e infrarroja.'
WHERE descripcion ILIKE '%VIDRIO GRADO 10%';

UPDATE producto SET descripcion_corta = 'Cristal filtrante grado 11 para máscara de soldar; mayor oscurecimiento para arcos intensos.'
WHERE descripcion ILIKE '%VIDRIO GRADO 11%';

UPDATE producto SET descripcion_corta = 'Cristal filtrante grado 12 para máscara de soldar; máxima protección para soldadura MIG de alta intensidad.'
WHERE descripcion ILIKE '%VIDRIO GRADO 12%';

UPDATE producto SET descripcion_corta = 'Cristal redondo grado 7 para anteojos de soldar; filtro para soldadura oxiacetilénica.'
WHERE descripcion ILIKE '%CRISTAL VIDRIO REDONDO GRADO 7%';

UPDATE producto SET descripcion_corta = 'Cristal redondo transparente para anteojos de seguridad; protección mecánica ante impactos.'
WHERE descripcion ILIKE '%CRISTAL VIDRIO REDONDO CLARO%';

UPDATE producto SET descripcion_corta = 'Policarbonato de protección posterior para careta; lámina trasera que protege el cristal filtrante.'
WHERE descripcion ILIKE '%POLICARBONATO PROTECCION POSTERIOR%';

UPDATE producto SET descripcion_corta = 'Policarbonato de protección frontal para careta; lámina exterior que protege el cristal filtrante.'
WHERE descripcion ILIKE '%POLICARBONATO PROTECCION FRONTAL%';

UPDATE producto SET descripcion_corta = 'Policarbonato de protección para máscara, paquete 5 unidades; láminas externas de recambio.'
WHERE descripcion ILIKE '%POLICARBONATO PROTECCION MASCARA%';

UPDATE producto SET descripcion_corta = 'Máscara fotosensible Optech Vision regulable; oscurecimiento automático ajustable de grado 9 a 13.'
WHERE descripcion ILIKE '%MASCARA FOTOSENSIBLE OPTECH VISION%';

-- ============================================================
-- CONECTORES ELÉCTRICOS DE SOLDADURA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Conector macho tipo Texas 25 mm²; conexión rápida de cables de soldadura en taller.'
WHERE descripcion ILIKE '%CONECTOR MACHO%25MM TEXAS%';

UPDATE producto SET descripcion_corta = 'Conector hembra tipo Texas 25 mm²; conexión rápida de cables de soldadura en taller.'
WHERE descripcion ILIKE '%CONECTOR HEMBRA%25MM TEXAS%';

UPDATE producto SET descripcion_corta = 'Conector macho Dinse 50 mm²; conexión de alta corriente para cables de soldadura industriales.'
WHERE descripcion ILIKE '%CONECTOR MACHO DINSE 50%';

UPDATE producto SET descripcion_corta = 'Conector hembra Dinse 50 mm²; conexión de alta corriente para cables de soldadura industriales.'
WHERE descripcion ILIKE '%CONECTOR HEMBRA DINSE%50%';

UPDATE producto SET descripcion_corta = 'Conector macho Tweco 500 A 50 mm²; conexión de alta capacidad para máquinas de soldadura.'
WHERE descripcion ILIKE '%CONECTOR MACHO 50 MM 500A%TWECO%';

UPDATE producto SET descripcion_corta = 'Conector hembra Tweco 500 A 50 mm²; recibe el conector macho para circuito de soldadura.'
WHERE descripcion ILIKE '%CONECTOR HEMBRA 50 MM 500A%TWECO%';

UPDATE producto SET descripcion_corta = 'Conector macho Indura tipo Dinse 70–95 mm²; alta capacidad para circuitos de soldadura industrial.'
WHERE descripcion ILIKE '%CONECTOR MACHO INDURA T/DINSE%';

UPDATE producto SET descripcion_corta = 'Conector ma/hembra Indura tipo Dinse 70–95 mm²; kit de conexión completo para cables gruesos.'
WHERE descripcion ILIKE '%CONECTOR MA/HE%INDURA%';

UPDATE producto SET descripcion_corta = 'Conector macho/hembra Tweco 70 mm²; par de conexión de alta corriente para equipos de soldadura.'
WHERE descripcion ILIKE '%CONECTOR MACHO HEMBRA TWECO 70%';

UPDATE producto SET descripcion_corta = 'Conector rápido 1/2" macho para manguera de aire comprimido o gas; acople tipo Huracan.'
WHERE descripcion ILIKE '%CONECTOR RAPIDO 1/2%';

UPDATE producto SET descripcion_corta = 'Conector rápido 1/4" macho para manguera de aire comprimido; acople estándar industrial.'
WHERE descripcion ILIKE '%CONECTOR RAPIDO 1/4%';

UPDATE producto SET descripcion_corta = 'Conector europeo para pistola MIG; adaptador de conexión estándar europeo para alimentadores.'
WHERE descripcion ILIKE '%CONECTOR EUROPEO%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Adaptador de conexión europea para máquina de soldar; permite usar pistolas de estándar europeo.'
WHERE descripcion ILIKE '%ADAPTADOR CONEXION EUROPEA%' OR descripcion ILIKE '%ADAPTADOR CONEXIÓN EUROPEA%';

UPDATE producto SET descripcion_corta = 'Adaptador de impacto 1/2"H × 3/4"M; reduce cuadro de llave de impacto neumática.'
WHERE descripcion ILIKE '%ADAPTADOR%IMPACTO%1/2%3/4%';

-- ============================================================
-- PORTAELECTRODOS / GRAMPA TIERRA LENCO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Portaelectrodo 300 A; sujeta y conduce corriente al electrodo revestido durante la soldadura.'
WHERE (descripcion ILIKE '%PORTAELECTRODO%300%' OR descripcion ILIKE '%PORTAELECTRODO 300%') AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Portaelectrodo 500 A; sujeta y conduce alta corriente al electrodo en procesos industriales intensivos.'
WHERE (descripcion ILIKE '%PORTAELECTRODO%500%' OR descripcion ILIKE '%PORTAELECTRODO 500%') AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Grampa a tierra Lenco 300 A; fija el retorno de corriente a la pieza durante la soldadura.'
WHERE descripcion ILIKE '%GRAMPA TIERRA LENCO 300%';

UPDATE producto SET descripcion_corta = 'Grampa a tierra Lenco 500 A; retorno de alta corriente para equipos de soldadura industrial.'
WHERE descripcion ILIKE '%GRAMPA TIERRA LENCO 500%';

UPDATE producto SET descripcion_corta = 'Prensa bronce 300 A; sujeción firme de piezas conductoras durante la soldadura por resistencia.'
WHERE descripcion ILIKE '%PRENSA BRONCE 300%';

-- ============================================================
-- RODILLOS ALIMENTADORES MIG
-- ============================================================
UPDATE producto SET descripcion_corta = 'Rodillo alimentador acanalado Ø0.8–0.9 mm para máquina MIG; impulsa el alambre de aporte.'
WHERE descripcion ILIKE '%RODILLO ACANALADO 0.8%';

UPDATE producto SET descripcion_corta = 'Rodillo de presión Ø0.8–0.9 mm para máquina MIG; mantiene tracción constante del alambre.'
WHERE descripcion ILIKE '%RODILLO PRESION 0.8%';

UPDATE producto SET descripcion_corta = 'Rodillo alimentador acanalado Ø1.2 mm para máquina MIG; impulsa alambres de mayor diámetro.'
WHERE descripcion ILIKE '%RODILLO ACANALADO 1.2%';

UPDATE producto SET descripcion_corta = 'Rodillo de presión Ø1.2 mm para máquina MIG; mantiene tracción constante de alambres gruesos.'
WHERE descripcion ILIKE '%RODILLO PRESION 1.2%';

UPDATE producto SET descripcion_corta = 'Rodillo alimentador rojo Ø1.0–1.2 mm para máquina MIG Pro; impulsión suave del alambre de aporte.'
WHERE descripcion ILIKE '%RODILLO ALIMENTADOR ROJO%';

UPDATE producto SET descripcion_corta = 'Rodillo Amigo 403 Ø1.2–1.6 mm; alimentador compatible con soldadoras Amigo para alambres gruesos.'
WHERE descripcion ILIKE '%RODILLO AMIGO 403%';

UPDATE producto SET descripcion_corta = 'Conjunto 2 rodillos dentados Ø1.2 mm; alimentación de alambre tubular en soldadoras MIG.'
WHERE descripcion ILIKE '%CONJUNTO 2 RODILLOS%DENTADOS%';

UPDATE producto SET descripcion_corta = 'Conjunto rodillos soldadora Amigo 0.6–0.8 mm; par de alimentación para alambres delgados.'
WHERE descripcion ILIKE '%CONJ.RODILLOS SOLD.AMIGO%';

UPDATE producto SET descripcion_corta = 'Piñón alimentador 0–18 m/min; engranaje de velocidad variable para mecanismo de avance MIG.'
WHERE descripcion ILIKE '%PINON ALIMENTADOR%';

-- ============================================================
-- SOLDADORAS ESPECIALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Soldadora ESAB 180i PRO CE; inversora MMA compacta de 180 A con certificación CE europea.'
WHERE descripcion ILIKE '%SOLDADORA ESAB 180i%';

UPDATE producto SET descripcion_corta = 'Soldadora ESAB 200i PRO CE; inversora MMA de 200 A con arranque de arco estable certificada CE.'
WHERE descripcion ILIKE '%SOLDADORA ESAB 200i%';

UPDATE producto SET descripcion_corta = 'MasterTIG 2300 AC/DC; soldadora TIG profesional AC/DC para aluminio y acero inoxidable.'
WHERE descripcion ILIKE '%MASTERTIG%2300%';

UPDATE producto SET descripcion_corta = 'Soldadora Syncrowave 350 A TIG AC/DC; alta frecuencia para soldadura TIG de aluminio y acero.'
WHERE descripcion ILIKE '%SYNCROWAVE 350%';

UPDATE producto SET descripcion_corta = 'Soldadora Minarc 150 A; inversora ultracompacta para soldadura MMA en obra y mantenimiento.'
WHERE descripcion ILIKE '%MINARC 150%';

UPDATE producto SET descripcion_corta = 'Soldadora Indura Amigo-453; equipo MIG industrial para producción continua en acero al carbono.'
WHERE descripcion ILIKE '%SOLDADORA INDURA AMIGO%';

UPDATE producto SET descripcion_corta = 'Soldadora Mitech A/M 400 A 380 V sin accesorios; inversora MMA de alto amperaje para industria.'
WHERE descripcion ILIKE '%SOLDADORA MITECH%400A%' OR descripcion ILIKE '%SOLDADORA MITECH A/M%';

UPDATE producto SET descripcion_corta = 'Equipo multiproceso MIG/MAG Katto 350 G 380 V; producción industrial con alimentador integrado.'
WHERE descripcion ILIKE '%MAG 350G%';

UPDATE producto SET descripcion_corta = 'Equipo de corte plasma 880F; corte profesional de metales hasta 25 mm con antorcha pesada.'
WHERE descripcion ILIKE '%EQUIPO CORTE MASTER 880F%';

UPDATE producto SET descripcion_corta = 'Equipo de corte Master 4; kit oxiacetilénico para corte hasta 100 mm; incluye soplete y reguladores.'
WHERE descripcion ILIKE '%EQUIPO CORTAR MASTER 4%';

-- ============================================================
-- TECLES / ELEVACIÓN
-- ============================================================
UPDATE producto SET descripcion_corta = 'Tecle de palanca MYH 1 ton; izaje y posicionamiento manual de estructuras y equipos.'
WHERE descripcion ILIKE '%TECLE PALANCA%1 TON%';

UPDATE producto SET descripcion_corta = 'Tecle de palanca MYH 1.5 ton; izaje manual de cargas medianas en faena industrial.'
WHERE descripcion ILIKE '%TECLE PALANCA%1.5 TON%';

UPDATE producto SET descripcion_corta = 'Tecle de cadena MYH 2 ton; izado de cargas pesadas con cadena de alta resistencia.'
WHERE descripcion ILIKE '%TECLE CADENA%2 TON%';

UPDATE producto SET descripcion_corta = 'Tecle de cadena MYH 3 ton; izado de estructuras pesadas en montaje industrial.'
WHERE descripcion ILIKE '%TECLE CADENA%3 TON%';

UPDATE producto SET descripcion_corta = 'Tecle tipo Tirfor 800 kg; extractor/tensor de cable para posicionamiento horizontal de cargas.'
WHERE descripcion ILIKE '%TECLE TIPO TIRFOR 800%';

UPDATE producto SET descripcion_corta = 'Tecle tipo Tirfor 3.2 ton; extractor de alta capacidad para montaje de estructuras pesadas.'
WHERE descripcion ILIKE '%TECLE TIPO TIRFOR 3.2%';

-- ============================================================
-- SEÑALIZACIÓN / HERRAMIENTAS VARIAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Malla cercadora naranja en rollo; delimitación de perímetros de seguridad en obra.'
WHERE descripcion ILIKE '%MALLA CERCADORA%';

UPDATE producto SET descripcion_corta = 'Huincha de señalización bicolor peligro 350 m; delimitación de zonas peligrosas en faena.'
WHERE descripcion ILIKE '%HUINCHA SENALIZACION%';

UPDATE producto SET descripcion_corta = 'Grillete de lira 1/2"; eslabón de conexión para eslingas, cadenas y sistemas de izaje.'
WHERE descripcion ILIKE '%GRILLETE LIRA%';

UPDATE producto SET descripcion_corta = 'Marcador blanco para metales; trazado de líneas de corte en superficies de acero oscuras.'
WHERE descripcion ILIKE '%MARCADOR BLANCO PARA METALES%';

UPDATE producto SET descripcion_corta = 'Marcador amarillo para metales SK; marcación de cortes y puntos en superficies metálicas.'
WHERE descripcion ILIKE '%MARCADOR AMARILLO PARA METALES%';

UPDATE producto SET descripcion_corta = 'Marcador rojo para metales; identificación y trazado en superficies metálicas brillantes.'
WHERE descripcion ILIKE '%MARCADOR ROJO PARA METALES%';

UPDATE producto SET descripcion_corta = 'Marcador azul para metales; trazado y marcación en superficies de acero y aluminio.'
WHERE descripcion ILIKE '%MARCADOR AZUL PARA METALES%';

UPDATE producto SET descripcion_corta = 'Marcador negro para metales; trazado sobre superficies claras o galvanizadas.'
WHERE descripcion ILIKE '%MARCADOR NEGRO PARA METALES%';

UPDATE producto SET descripcion_corta = 'Lapiz de medición 100 g; marcación precisa de líneas de trazado en metales y madera.'
WHERE descripcion ILIKE '%LAPIZ MEDICION%';

UPDATE producto SET descripcion_corta = 'Piedra Spencil para trazado en metal; dureza alta para marcar sobre acero y fundición.'
WHERE descripcion ILIKE '%PIEDRA SPENCIL%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Piedra para chispero 2 cajas; repuesto de pedernal para encendedores de soplete.'
WHERE descripcion ILIKE '%PIEDRA PARA CHISPERO%';

UPDATE producto SET descripcion_corta = 'Chispero tipo copa con 5 piedras de repuesto; encendido de sopletes oxiacetilénico y GLP.'
WHERE descripcion ILIKE '%CHISPERO TIPO COPA%5 PIEDRAS%';

UPDATE producto SET descripcion_corta = 'Chispero de copa paquete 10 unidades; encendido de sopletes y quemadores industriales.'
WHERE descripcion ILIKE '%CHISPERO DE COPA PQ%';

UPDATE producto SET descripcion_corta = 'Limpiaboquillas; herramienta para destapar y limpiar boquillas MIG obstruidas por salpicaduras.'
WHERE descripcion ILIKE '%LIMPIABOQUILLAS%';

UPDATE producto SET descripcion_corta = 'Martillo picaescoria (picasal); eliminación manual de escoria en cordones de soldadura por electrodo.'
WHERE descripcion ILIKE '%MARTILLO PICASAL%';

-- ============================================================
-- ANTISPATTER
-- ============================================================
UPDATE producto SET descripcion_corta = 'Antispatter en gel 500 g; evita adherencia de salpicaduras en boquillas y piezas de soldadura MIG.'
WHERE descripcion ILIKE '%ANTISPATTER GEL%';

UPDATE producto SET descripcion_corta = 'Antispatter Tough Gard en spray 750 ml; previene salpicaduras en boquillas y piezas de trabajo.'
WHERE descripcion ILIKE '%ANTI SPATTER TOUGH%SPRAY%';

UPDATE producto SET descripcion_corta = 'Antispatter Tough líquido 3.78 L; solución a granel para proteger boquillas y superficies MIG.'
WHERE descripcion ILIKE '%ANTI SPATTER TOUGH LIQUIDO%';

-- ============================================================
-- MANGUERAS ESPECÍFICAS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Manguera doble 1/4" grado T para oxígeno/acetileno; mayor resistencia que grado R.'
WHERE descripcion ILIKE '%MANGUERA DOBLE%GRADO T%';

UPDATE producto SET descripcion_corta = 'Manguera simple verde para oxígeno; conducción de oxígeno industrial en equipos oxiacetilénico.'
WHERE descripcion ILIKE '%MANGUERA SIMPLE VERDE%';

UPDATE producto SET descripcion_corta = 'Manguera simple para acetileno/propano; conducción de gas combustible en equipos de corte.'
WHERE descripcion ILIKE '%MANGUERA SIMPLE C2H2%';

UPDATE producto SET descripcion_corta = 'Rollo de manguera 1/4" × 6 m grado R; repuesto y extensión para equipos oxiacetilénico.'
WHERE descripcion ILIKE '%ROLLO MANG%1/4%';

UPDATE producto SET descripcion_corta = 'Manguera de PVC flexible para conducción de fluidos a baja presión en instalaciones industriales.'
WHERE descripcion ILIKE '%MANGUERA PVC%';

-- ============================================================
-- CARRO PARA CILINDROS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Carro metálico para cilindros tipo E/D; transporte seguro de cilindros de gas en taller.'
WHERE descripcion ILIKE '%CARRO CILINDRO%';

-- ============================================================
-- COMPRESORES / FILTROS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Kit compresor Indura Huracan 5 100-C; compresor de pistón 5 HP con filtro y accesorios.'
WHERE descripcion ILIKE '%KIT COMPRESOR INDURA HURACAN%';

UPDATE producto SET descripcion_corta = 'Compresor Vento 2000 con kit 5 piezas; compresor portátil para inflado y pequeñas herramientas.'
WHERE descripcion ILIKE '%COMPRESOR VENTO 2000%';

-- ============================================================
-- SOPLETES ESPECIALES
-- ============================================================
UPDATE producto SET descripcion_corta = 'Soplete para calentamiento propano corto con 4 boquillas intercambiables; precalentamiento de piezas.'
WHERE descripcion ILIKE '%SOPLETE PARA CALENTAR CORTO%';

UPDATE producto SET descripcion_corta = 'Soplete para calentamiento propano; llama directa para precalentamiento y tratamiento térmico.'
WHERE descripcion ILIKE '%SOPLETE PARA CALENTAR%' AND descripcion NOT ILIKE '%CORTO%' AND descripcion_corta IS NULL;

UPDATE producto SET descripcion_corta = 'Soplete Gasjet para GLP; quemador de llama directa para calentamiento con gas licuado.'
WHERE descripcion ILIKE '%SOPLETE GASJET%' OR descripcion ILIKE '%SOPLETE PARA GAS LICUADO%';

UPDATE producto SET descripcion_corta = 'Soplete de corte 142-F; accesorio de corte para mango de soldadura; combina oxígeno y combustible.'
WHERE descripcion ILIKE '%SOPLETE P/CORTAR 142%';

UPDATE producto SET descripcion_corta = 'Soplete de corte 980 F; para corte oxiacetilénico de alta capacidad en piezas gruesas.'
WHERE descripcion ILIKE '%SOPLETE CORTE 980%';

-- ============================================================
-- EQUIPO IK12 BEETLE / RANA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Carro de corte IK12 Beetle S-100; corte oxiacetilénico recto a velocidad constante sobre rieles.'
WHERE descripcion ILIKE '%EQUIPO CORTE IK12 BEETLE%';

UPDATE producto SET descripcion_corta = 'Rana de corte 4605 con 2 sopletes y 1 riel de 2 m; corte recto oxiacetilénico a velocidad constante.'
WHERE descripcion ILIKE '%RANA DE CORTE%';

-- ============================================================
-- EQUIPOS TORCHAR
-- ============================================================
UPDATE producto SET descripcion_corta = 'Equipo Torchar 1000 A K-4000; arco de carbón para gouging/ranurado de alta capacidad.'
WHERE descripcion ILIKE '%TORCHAR 1000%';

-- ============================================================
-- VÁLVULAS ANTIRRETROCESO
-- ============================================================
UPDATE producto SET descripcion_corta = 'Válvula antirretroceso de llama para acetileno en soplete; protege ante retroceso del arco.'
WHERE descripcion ILIKE '%VALVULA ANTIRRETROCESO LLAMA SOPLETE%' AND (descripcion ILIKE '%C2H%' OR descripcion ILIKE '%ACETILENO%');

UPDATE producto SET descripcion_corta = 'Válvula antirretroceso de llama para acetileno en regulador; primera línea de protección del cilindro.'
WHERE descripcion ILIKE '%VALVULA ANTIRRETROCESO LLAMA REGUL%' AND (descripcion ILIKE '%C2H%' OR descripcion ILIKE '%ACETILENO%');

UPDATE producto SET descripcion_corta = 'Válvula antirretroceso de llama para oxígeno en regulador; protege el cilindro ante retroceso.'
WHERE descripcion ILIKE '%VALVULA ANTIRRETROCESO LLAMA REG%' AND descripcion ILIKE '%(O2)%';

-- ============================================================
-- MEZCLA DE GASES / CILINDROS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para mezcla Ar-CO2 2 m³; suministro de gas para soldadura MIG/MAG.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA MEZCLA 2%';

UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para mezcla Ar-CO2 3 m³; suministro para producción MIG/MAG moderada.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA MEZCLA 3%';

UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para mezcla Ar-CO2 6 m³; suministro para producción MIG/MAG continua.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA MEZCLA 6%';

UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para mezcla Ar-CO2 10 m³; alta capacidad para líneas industriales MIG/MAG.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA MEZCLA 10%';

UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para aire comprimido 10 m³; suministro de aire para herramientas neumáticas.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA AIRE 10%';

UPDATE producto SET descripcion_corta = 'Cilindro de alta presión para aire comprimido tipo D; suministro portátil de aire a presión.'
WHERE descripcion ILIKE '%CILINDRO ALTA PRESION PARA AIRE TIPO D%';

UPDATE producto SET descripcion_corta = 'Cilindro tipo E para oxígeno; envase estándar de alta presión para suministro en taller.'
WHERE descripcion ILIKE '%CILINDRO TIPO E PARA O2%';

-- ============================================================
-- REGULADORES ESPECÍFICOS
-- ============================================================
UPDATE producto SET descripcion_corta = 'Regulador de propano 801 BN; control de presión de salida para soplete de propano/GLP.'
WHERE descripcion ILIKE '%REGULADOR PROPANO%801%';

UPDATE producto SET descripcion_corta = 'Regulador de propano en caja; control de presión para suministro de gas propano industrial.'
WHERE descripcion ILIKE '%REGULADOR PROPANO (CAJA)%';

UPDATE producto SET descripcion_corta = 'Regulador de helio para globos Harris; control de flujo de helio para inflado de globos.'
WHERE descripcion ILIKE '%REGULADOR HELIO%GLOBOS%';

UPDATE producto SET descripcion_corta = 'Regulador y flujómetro GCE 0–15 LPM para argón/CO2; control preciso de caudal en procesos TIG/MIG.'
WHERE descripcion ILIKE '%REGULADOR Y FLUJOMETRO 0-15%';

UPDATE producto SET descripcion_corta = 'Regulador de nitrógeno 87.100 MO de alta presión; control para nitrógeno en instalaciones críticas.'
WHERE descripcion ILIKE '%REGULADOR N2 MOD.87.100%';

UPDATE producto SET descripcion_corta = 'Regulador de CO2 con flujómetro 30 L/min modelo 801D; para soldadura MIG con gas CO2 o mezcla.'
WHERE descripcion ILIKE '%REGULADOR CO2 801%';

-- ============================================================
-- TERMO / AISLADOR / VARIOS SOLDADURA
-- ============================================================
UPDATE producto SET descripcion_corta = 'Termo portátil para electrodos MD-0516; mantiene electrodos secos y listos para uso en campo.'
WHERE descripcion ILIKE '%TERMO PARA SOLDADURA%';

UPDATE producto SET descripcion_corta = 'Horno portátil para electrodos 5 kg; secado y almacenamiento de electrodos en terreno.'
WHERE descripcion ILIKE '%HORNO PORTATIL ELECTRODOS%';

UPDATE producto SET descripcion_corta = 'Aislador 54N63 para pistola TIG; previene cortocircuito entre collet y cuerpo de la antorcha.'
WHERE descripcion ILIKE '%AISLADOR 54N63%';

UPDATE producto SET descripcion_corta = 'Resorte distanciador para pistola plasma S74; mantiene distancia correcta entre boquilla y pieza.'
WHERE descripcion ILIKE '%RESORTE DISTANCIADOR%S74%';

UPDATE producto SET descripcion_corta = 'Protección tobera S74 para antorcha plasma; cubre la tobera y guía la distancia de corte.'
WHERE descripcion ILIKE '%PROTECCION TOBERA S74%';

UPDATE producto SET descripcion_corta = 'Boquilla de protección P-20 para tobera plasma; escudo externo ante el desgaste por calor.'
WHERE descripcion ILIKE '%BOQUILLA PROTECC%TOBERA P-20%';

UPDATE producto SET descripcion_corta = 'Electrodo para pistola plasma S74; parte consumible que genera el arco de corte.'
WHERE descripcion ILIKE '%ELECTRODO PISTOLA PLASMA S74%';

UPDATE producto SET descripcion_corta = 'Juego de accesorios 14 piezas para pistola TIG o MIG; kit completo de repuestos consumibles.'
WHERE descripcion ILIKE '%JUEGO ACCESORIOS (14 PCS)%';

UPDATE producto SET descripcion_corta = 'Juego de conectores 5 piezas; set de conexiones para circuito de soldadura.'
WHERE descripcion ILIKE '%JUEGO CONECTORES (5 PCS)%';

UPDATE producto SET descripcion_corta = 'Juego de conectores 7 piezas; set completo de conexiones para instalación de equipo de soldadura.'
WHERE descripcion ILIKE '%JUEGO CONECTORES (7 PCS)%';

UPDATE producto SET descripcion_corta = 'Juego de carbones para esmeril angular; repuesto de escobillas de carbón para motor eléctrico.'
WHERE descripcion ILIKE '%JUEGO CARBONES ESMERILES%';

UPDATE producto SET descripcion_corta = 'Panel ACS para controlador de soldadura; módulo de control remoto para procesos automatizados.'
WHERE descripcion ILIKE '%PANEL ACS%';

UPDATE producto SET descripcion_corta = 'Tuerca de ajuste para esmeril Metabo; accesorio de fijación del disco en esmeriles Metabo.'
WHERE descripcion ILIKE '%TUERCA PARA ESMERIL METABO%';

UPDATE producto SET descripcion_corta = 'Pistola de pintura por gravedad; aplicación de pintura con compresor para trabajos de acabado.'
WHERE descripcion ILIKE '%PISTOLA PINTAR GRAVEDAD%';

UPDATE producto SET descripcion_corta = 'Pistola de pintura de alta presión; mayor rendimiento en aplicación de pinturas industriales.'
WHERE descripcion ILIKE '%PISTOLA PINTAR ALTA PRESION%';

UPDATE producto SET descripcion_corta = 'Kit de aisladores K-4000; repuesto de aisladores para equipo Torchar de gouging 1000 A.'
WHERE descripcion ILIKE '%KIT AISLADORES K-4000%';

UPDATE producto SET descripcion_corta = 'Brocha plástica para aplicación de fundente, aceite o antioxidantes en trabajos de soldadura.'
WHERE descripcion ILIKE '%BROCHA PLASTICA%';

-- ============================================================
-- Fallback mejorado final
-- ============================================================
UPDATE producto SET descripcion_corta = 'Accesorio industrial para soldadura o gases. Consultar código y disponibilidad.'
WHERE descripcion_corta = 'Producto industrial para soldadura y gases. Consultar disponibilidad.';
