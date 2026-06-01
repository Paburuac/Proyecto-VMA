-- ═══════════════════════════════════════════════════════════
-- VMA Industrial — Migración: variantes de producto
-- Generado automáticamente por agrupar_variantes.py
-- REVISAR grupos.json antes de ejecutar.
-- ═══════════════════════════════════════════════════════════

-- PASO 1: Agregar columnas (ejecutar solo una vez)
ALTER TABLE producto
  ADD COLUMN IF NOT EXISTS medidas     JSONB    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS es_variante BOOLEAN  DEFAULT FALSE;

-- PASO 2: Marcar variantes y guardar medidas en el padre

UPDATE producto SET medidas = '[{"codigo": "44491", "label": "FILTRO DE AIRE 200L 3HP", "id": 5}, {"codigo": "444911", "label": "FILTRO DE AIRE 200L 3HP", "id": 70}]' WHERE codigo = '44491';
UPDATE producto SET es_variante = TRUE WHERE codigo = '444911';

UPDATE producto SET medidas = '[{"codigo": "1013045", "label": "REGULADOR FLUJOMETRO DE ARGON", "id": 25}, {"codigo": "1015724", "label": "REGULADOR FLUJOMETRO DE ARGON", "id": 28}]' WHERE codigo = '1013045';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015724';

UPDATE producto SET medidas = '[{"codigo": "1016477", "label": "REGULADOR FLUJOMETRO DUAL ARGON (CAJA)", "id": 29}, {"codigo": "1053469", "label": "REGULADOR FLUJOMETRO DUAL ARGON (CAJA)", "id": 63}]' WHERE codigo = '1016477';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1053469';

UPDATE producto SET medidas = '[{"codigo": "1023771", "label": "10 M3", "id": 31}, {"codigo": "1023773", "label": "2 M3", "id": 33}, {"codigo": "1023786", "label": "3 M3", "id": 46}, {"codigo": "1023779", "label": "6 M3", "id": 39}]' WHERE codigo = '1023771';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023773';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023786';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023779';

UPDATE producto SET medidas = '[{"codigo": "1023778", "label": "10 M3", "id": 38}, {"codigo": "1023774", "label": "2 M3", "id": 34}, {"codigo": "1023788", "label": "3 M3", "id": 48}, {"codigo": "1023772", "label": "6 M3", "id": 32}]' WHERE codigo = '1023778';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023774';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023788';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023772';

UPDATE producto SET medidas = '[{"codigo": "1023782", "label": "10 M3", "id": 42}, {"codigo": "1023775", "label": "2 M3", "id": 35}, {"codigo": "1023787", "label": "3 M3", "id": 47}, {"codigo": "102378", "label": "6 M3", "id": 40}]' WHERE codigo = '1023782';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023775';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023787';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102378';

UPDATE producto SET medidas = '[{"codigo": "1023776", "label": "10 M3", "id": 36}, {"codigo": "1023785", "label": "3 M3", "id": 45}, {"codigo": "1023781", "label": "6 M3", "id": 41}]' WHERE codigo = '1023776';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023785';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023781';

UPDATE producto SET medidas = '[{"codigo": "1029119", "label": "FILTRO 3M 6004 AMONIACO Y METI", "id": 51}, {"codigo": "1018438", "label": "FILTRO 3M 6004 AMONIACO Y METI", "id": 975}]' WHERE codigo = '1029119';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1018438';

UPDATE producto SET medidas = '[{"codigo": "1029126", "label": "FILTRO 3M 2091 PARTICULAS", "id": 52}, {"codigo": "240104", "label": "FILTRO 3M 2091 PARTICULAS", "id": 1247}]' WHERE codigo = '1029126';
UPDATE producto SET es_variante = TRUE WHERE codigo = '240104';

UPDATE producto SET medidas = '[{"codigo": "10018461", "label": "CILINDRO DE ACETILENO", "id": 74}, {"codigo": "15-MED", "label": "CILINDRO DE ACETILENO", "id": 97}]' WHERE codigo = '10018461';
UPDATE producto SET es_variante = TRUE WHERE codigo = '15-MED';

UPDATE producto SET medidas = '[{"codigo": "10083022", "label": "REGULADOR CO2 C/FLUJOMETRO 601D 30 FAR", "id": 78}, {"codigo": "100267", "label": "REGULADOR CO2 C/FLUJOMETRO 601D 30 FAR", "id": 199}]' WHERE codigo = '10083022';
UPDATE producto SET es_variante = TRUE WHERE codigo = '100267';

UPDATE producto SET medidas = '[{"codigo": "1-K", "label": "OXIGENO INDUSTRIAL 6 M3 (CL. 2.2 NU 1072)", "id": 101}, {"codigo": "1-N", "label": "OXIGENO INDUSTRIAL 6 M3 (CL. 2.2 NU 1072)", "id": 102}]' WHERE codigo = '1-K';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1-N';

UPDATE producto SET medidas = '[{"codigo": "278-H", "label": "MEZCLA AR/CO2 10 M3  (CL. 2.2 NU 1956)", "id": 107}, {"codigo": "P278-H", "label": "MEZCLA AR/CO2 10 M3  (CL. 2.2 NU 1956)", "id": 167}]' WHERE codigo = '278-H';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P278-H';

UPDATE producto SET medidas = '[{"codigo": "P1-K", "label": "OXIGENO 6 M3 TIPO K PART (CL. 2.2 NU 1072)", "id": 151}, {"codigo": "PC1-K", "label": "OXIGENO 6 M3 TIPO K PART (CL. 2.2 NU 1072)", "id": 188}]' WHERE codigo = 'P1-K';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'PC1-K';

UPDATE producto SET medidas = '[{"codigo": "P24-N", "label": "ARGON GASEOSO 7 M3 PART (CL. 2.2 NU 1006)", "id": 161}, {"codigo": "PC24-N", "label": "ARGON GASEOSO 7 M3 PART (CL. 2.2 NU 1006)", "id": 189}]' WHERE codigo = 'P24-N';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'PC24-N';

UPDATE producto SET medidas = '[{"codigo": "P278-N", "label": "MEZCLA AR/CO2 7 M3  (CL. 2.2 NU 1956)", "id": 169}, {"codigo": "PC278-N", "label": "MEZCLA AR/CO2 7 M3  (CL. 2.2 NU 1956)", "id": 190}]' WHERE codigo = 'P278-N';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'PC278-N';

UPDATE producto SET medidas = '[{"codigo": "P44-K", "label": "NITROGENO  6 M3 PART (CL. 2.2 NU 1066)", "id": 184}, {"codigo": "PC44-K", "label": "NITROGENO  6 M3 PART (CL. 2.2 NU 1066)", "id": 192}]' WHERE codigo = 'P44-K';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'PC44-K';

UPDATE producto SET medidas = '[{"codigo": "100045", "label": "EQUIPO CORTE PLASMA CUT-45", "id": 196}, {"codigo": "1035397", "label": "EQUIPO CORTE PLASMA CUT-45", "id": 355}]' WHERE codigo = '100045';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1035397';

UPDATE producto SET medidas = '[{"codigo": "1000194", "label": "PISTOLA TIG 125 AMP.WP-9V-12-R(12 LARGO)", "id": 223}, {"codigo": "1014709", "label": "PISTOLA TIG 125 AMP.WP-9V-12-R(12 LARGO)", "id": 315}]' WHERE codigo = '1000194';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1014709';

UPDATE producto SET medidas = '[{"codigo": "1001524", "label": "ADITAMENTO DE CORTE 72-3", "id": 233}, {"codigo": "1036183", "label": "ADITAMENTO DE CORTE 72-3", "id": 357}]' WHERE codigo = '1001524';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1036183';

UPDATE producto SET medidas = '[{"codigo": "1007322", "label": "EQUIPO SOLDAR Y CORTAR FLAMEPOWER", "id": 290}, {"codigo": "1009349", "label": "EQUIPO SOLDAR Y CORTAR FLAMEPOWER", "id": 305}]' WHERE codigo = '1007322';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1009349';

UPDATE producto SET medidas = '[{"codigo": "1014711", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 316}, {"codigo": "1040843", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 365}, {"codigo": "10408432", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 537}]' WHERE codigo = '1014711';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1040843';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10408432';

UPDATE producto SET medidas = '[{"codigo": "10152", "label": "REGULADOR Y FLUJOMETRO 0-15 LPM GCE", "id": 322}, {"codigo": "1015201", "label": "REGULADOR Y FLUJOMETRO 0-15 LPM GCE", "id": 323}]' WHERE codigo = '10152';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015201';

UPDATE producto SET medidas = '[{"codigo": "1039218", "label": "857", "id": 361}, {"codigo": "1039219", "label": "994", "id": 362}]' WHERE codigo = '1039218';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1039219';

UPDATE producto SET medidas = '[{"codigo": "200005", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 391}, {"codigo": "2000050H", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 544}, {"codigo": "2000050L", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 545}]' WHERE codigo = '200005';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000050H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000050L';

UPDATE producto SET medidas = '[{"codigo": "2000051", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 392}, {"codigo": "2000051H", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 546}, {"codigo": "2000051L", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 547}]' WHERE codigo = '2000051';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000051H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000051L';

UPDATE producto SET medidas = '[{"codigo": "2000052", "label": "ELECTRODO 6010 5/32 (4.0 MM)", "id": 393}, {"codigo": "2000052H", "label": "ELECTRODO 6010 5/32 (4.0 MM)", "id": 548}]' WHERE codigo = '2000052';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000052H';

UPDATE producto SET medidas = '[{"codigo": "2000093", "label": "ELECTRODO 6011 3/32 (2.4 MM)", "id": 399}, {"codigo": "2000093H", "label": "ELECTRODO 6011 3/32 (2.4 MM)", "id": 549}]' WHERE codigo = '2000093';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000093H';

UPDATE producto SET medidas = '[{"codigo": "2000094", "label": "ELECTRODO 6011 1/8 (3.2 MM)", "id": 400}, {"codigo": "2000094H", "label": "ELECTRODO 6011 1/8 (3.2 MM)", "id": 550}]' WHERE codigo = '2000094';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000094H';

UPDATE producto SET medidas = '[{"codigo": "2000134", "label": "ELECTRODO 8018-C1 1/8 (3.2 MM)", "id": 410}, {"codigo": "2000134H", "label": "ELECTRODO 8018-C1 1/8 (3.2 MM)", "id": 556}]' WHERE codigo = '2000134';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000134H';

UPDATE producto SET medidas = '[{"codigo": "2000141", "label": "ELECTRODO 110-18M  1/8 (3.2 MM)", "id": 412}, {"codigo": "2000141H", "label": "ELECTRODO 110-18M  1/8 (3.2 MM)", "id": 557}]' WHERE codigo = '2000141';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000141H';

UPDATE producto SET medidas = '[{"codigo": "2000154", "label": "ELECTRODO 309-L 3/32 (2.4 MM)", "id": 414}, {"codigo": "2000154H", "label": "ELECTRODO 309-L 3/32 (2.4 MM)", "id": 558}]' WHERE codigo = '2000154';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000154H';

UPDATE producto SET medidas = '[{"codigo": "2000155", "label": "ELECTRODO 309-L 1/8 (3.2 MM)", "id": 415}, {"codigo": "2000155H", "label": "ELECTRODO 309-L 1/8 (3.2 MM)", "id": 559}]' WHERE codigo = '2000155';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000155H';

UPDATE producto SET medidas = '[{"codigo": "2000236", "label": "ELECTRODO NI-99 1/8 (3.2 MM)", "id": 428}, {"codigo": "2000236H", "label": "ELECTRODO NI-99 1/8 (3.2 MM)", "id": 560}]' WHERE codigo = '2000236';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000236H';

UPDATE producto SET medidas = '[{"codigo": "2000237", "label": "ELECTRODO NI-99 3/32 (2.4 MM)", "id": 429}, {"codigo": "2000237H", "label": "ELECTRODO NI-99 3/32 (2.4 MM)", "id": 561}]' WHERE codigo = '2000237';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000237H';

UPDATE producto SET medidas = '[{"codigo": "2000254", "label": "ELECTRODO OVERLAY 60 1/8 (3.2 MM)", "id": 432}, {"codigo": "2000254H", "label": "ELECTRODO OVERLAY 60 1/8 (3.2 MM)", "id": 562}]' WHERE codigo = '2000254';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000254H';

UPDATE producto SET medidas = '[{"codigo": "2000255", "label": "ELECTRODO OVERLAY 60 5/32 (4.0 MM)", "id": 433}, {"codigo": "2000255H", "label": "ELECTRODO OVERLAY 60 5/32 (4.0 MM)", "id": 563}]' WHERE codigo = '2000255';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000255H';

UPDATE producto SET medidas = '[{"codigo": "2000261", "label": "ELECTRODO SUPER ALLOY 1/8 (3.2 MM)", "id": 435}, {"codigo": "20002611", "label": "ELECTRODO SUPER ALLOY 1/8 (3.2 MM)", "id": 539}]' WHERE codigo = '2000261';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20002611';

UPDATE producto SET medidas = '[{"codigo": "2000264", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 436}, {"codigo": "20002641", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 540}, {"codigo": "2000264H", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 564}]' WHERE codigo = '2000264';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20002641';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000264H';

UPDATE producto SET medidas = '[{"codigo": "2000265", "label": "ELECTRODO NI-55 3/32 (2.4 MM)", "id": 437}, {"codigo": "2000265H", "label": "ELECTRODO NI-55 3/32 (2.4 MM)", "id": 565}]' WHERE codigo = '2000265';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000265H';

UPDATE producto SET medidas = '[{"codigo": "2000266", "label": "ELECTRODO NI-55 1/8 (3.2 MM)", "id": 438}, {"codigo": "2000266H", "label": "ELECTRODO NI-55 1/8 (3.2 MM)", "id": 566}]' WHERE codigo = '2000266';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000266H';

UPDATE producto SET medidas = '[{"codigo": "2000321", "label": "ELECTRODO 312-16 29-9S 3/32 (2.4 MM)", "id": 441}, {"codigo": "2000321H", "label": "ELECTRODO 312-16 29-9S 3/32 (2.4 MM)", "id": 567}]' WHERE codigo = '2000321';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000321H';

UPDATE producto SET medidas = '[{"codigo": "2000325", "label": "ELECTRODO 308-L 3/32 (2.4 MM)", "id": 442}, {"codigo": "2000325H", "label": "ELECTRODO 308-L 3/32 (2.4 MM)", "id": 569}]' WHERE codigo = '2000325';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000325H';

UPDATE producto SET medidas = '[{"codigo": "2000326", "label": "ELECTRODO 308-L 1/8 (3.2 MM)", "id": 443}, {"codigo": "2000326H", "label": "ELECTRODO 308-L 1/8 (3.2 MM)", "id": 570}]' WHERE codigo = '2000326';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000326H';

UPDATE producto SET medidas = '[{"codigo": "200033", "label": "ELECTRODO 316-L 3/32 (2.4 MM)", "id": 444}, {"codigo": "2000330H", "label": "ELECTRODO 316-L 3/32 (2.4 MM)", "id": 571}]' WHERE codigo = '200033';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000330H';

UPDATE producto SET medidas = '[{"codigo": "2000331", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 445}, {"codigo": "2000331H", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 572}, {"codigo": "2000331S", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 573}]' WHERE codigo = '2000331';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000331H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000331S';

UPDATE producto SET medidas = '[{"codigo": "10211721", "label": "PORTAELECTRODO 500 AMPS", "id": 534}, {"codigo": "1021172", "label": "PORTAELECTRODO 500 AMPS", "id": 979}]' WHERE codigo = '10211721';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1021172';

UPDATE producto SET medidas = '[{"codigo": "2000121H", "label": "ELECTRODO 7018 3/32 (2.4 MM)", "id": 551}, {"codigo": "2000121L", "label": "ELECTRODO 7018 3/32 (2.4 MM)", "id": 552}]' WHERE codigo = '2000121H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000121L';

UPDATE producto SET medidas = '[{"codigo": "2000122H", "label": "ELECTRODO 7018 1/8 (3.2 MM)", "id": 553}, {"codigo": "2000122L", "label": "ELECTRODO 7018 1/8 (3.2 MM)", "id": 554}]' WHERE codigo = '2000122H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000122L';

UPDATE producto SET medidas = '[{"codigo": "10179", "label": "10 MM", "id": 581}, {"codigo": "10281", "label": "4 MM", "id": 582}, {"codigo": "11486", "label": "8 MM", "id": 584}]' WHERE codigo = '10179';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10281';
UPDATE producto SET es_variante = TRUE WHERE codigo = '11486';

UPDATE producto SET medidas = '[{"codigo": "1022723", "label": "0.9", "id": 655}, {"codigo": "1023668", "label": "1.2", "id": 661}]' WHERE codigo = '1022723';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023668';

UPDATE producto SET medidas = '[{"codigo": "1052961", "label": "0.8 X 15", "id": 678}, {"codigo": "1052961H", "label": "0.8 X 15", "id": 713}, {"codigo": "1052961N", "label": "0.8 X 15", "id": 714}, {"codigo": "1052962", "label": "0.9 X 15", "id": 679}, {"codigo": "1052962H", "label": "0.9 X 15", "id": 715}, {"codigo": "1052962N", "label": "0.9 X 15", "id": 716}, {"codigo": "1052963", "label": "1.0 X 15", "id": 680}, {"codigo": "1052963H", "label": "1.0 X 15", "id": 717}, {"codigo": "1052963K", "label": "1.0 X 15", "id": 718}, {"codigo": "1052963L", "label": "1.0 X 15", "id": 719}, {"codigo": "1052963N", "label": "1.0 X 15", "id": 720}, {"codigo": "1052964", "label": "1.2 X 15", "id": 681}, {"codigo": "1052964H", "label": "1.2 X 15", "id": 721}, {"codigo": "1052964N", "label": "1.2 X 15", "id": 722}]' WHERE codigo = '1052961';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052961H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052961N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963K';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963L';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964N';

UPDATE producto SET medidas = '[{"codigo": "679917", "label": "1 KG", "id": 700}, {"codigo": "679913", "label": "10 KG", "id": 696}, {"codigo": "679916", "label": "2 KG", "id": 699}, {"codigo": "679915", "label": "4 KG", "id": 698}, {"codigo": "679914", "label": "6 KG", "id": 697}]' WHERE codigo = '679917';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679913';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679916';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679915';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679914';

UPDATE producto SET medidas = '[{"codigo": "679919", "label": "10 KG", "id": 702}, {"codigo": "679921", "label": "2 KG", "id": 704}, {"codigo": "67992", "label": "5 KG", "id": 703}]' WHERE codigo = '679919';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679921';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67992';

UPDATE producto SET medidas = '[{"codigo": "4101", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 741}, {"codigo": "41012", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 742}, {"codigo": "41812", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 746}]' WHERE codigo = '4101';
UPDATE producto SET es_variante = TRUE WHERE codigo = '41012';
UPDATE producto SET es_variante = TRUE WHERE codigo = '41812';

UPDATE producto SET medidas = '[{"codigo": "42085", "label": "35", "id": 748}, {"codigo": "4211", "label": "50", "id": 749}]' WHERE codigo = '42085';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4211';

UPDATE producto SET medidas = '[{"codigo": "110182", "label": "FRESA CARBURO TUNGSTENO RECTA", "id": 770}, {"codigo": "1002118", "label": "FRESA CARBURO TUNGSTENO RECTA", "id": 885}]' WHERE codigo = '110182';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1002118';

UPDATE producto SET medidas = '[{"codigo": "110183", "label": "FRESA CARBURO TUNGSTENO CONICA", "id": 771}, {"codigo": "1002119", "label": "FRESA CARBURO TUNGSTENO CONICA", "id": 886}]' WHERE codigo = '110183';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1002119';

UPDATE producto SET medidas = '[{"codigo": "1000352", "label": "0", "id": 805}, {"codigo": "1000354", "label": "2", "id": 806}]' WHERE codigo = '1000352';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000354';

UPDATE producto SET medidas = '[{"codigo": "1000361", "label": "0", "id": 807}, {"codigo": "1001666", "label": "1", "id": 880}, {"codigo": "1001481", "label": "2", "id": 870}, {"codigo": "1000591", "label": "3", "id": 818}, {"codigo": "1000592", "label": "4", "id": 819}, {"codigo": "1000593", "label": "5", "id": 820}]' WHERE codigo = '1000361';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001666';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001481';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000591';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000592';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000593';

UPDATE producto SET medidas = '[{"codigo": "1000616", "label": "0", "id": 824}, {"codigo": "100061", "label": "1", "id": 821}, {"codigo": "1000612", "label": "3", "id": 822}, {"codigo": "1000614", "label": "5", "id": 823}, {"codigo": "1000618", "label": "8", "id": 825}, {"codigo": "1001687", "label": "9", "id": 881}]' WHERE codigo = '1000616';
UPDATE producto SET es_variante = TRUE WHERE codigo = '100061';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000612';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000614';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000618';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001687';

UPDATE producto SET medidas = '[{"codigo": "1008134", "label": "00", "id": 902}, {"codigo": "1008135", "label": "10", "id": 903}]' WHERE codigo = '1008134';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1008135';

UPDATE producto SET medidas = '[{"codigo": "1009541", "label": "0.9 MM", "id": 917}, {"codigo": "1009542", "label": "1.0 MM", "id": 918}]' WHERE codigo = '1009541';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1009542';

UPDATE producto SET medidas = '[{"codigo": "1015827", "label": "120", "id": 939}, {"codigo": "1015826N", "label": "120", "id": 1299}, {"codigo": "1015831N", "label": "240", "id": 1303}, {"codigo": "1015822", "label": "40", "id": 936}, {"codigo": "1015822INOXER", "label": "40", "id": 1291}, {"codigo": "1015822N", "label": "40", "id": 1292}, {"codigo": "1015822NC", "label": "40", "id": 1293}, {"codigo": "1015824", "label": "60", "id": 937}, {"codigo": "1015824N", "label": "60", "id": 1294}, {"codigo": "1015824NC", "label": "60", "id": 1295}, {"codigo": "1015825", "label": "80", "id": 938}, {"codigo": "1015825INOXER", "label": "80", "id": 1296}, {"codigo": "1015825N", "label": "80", "id": 1297}, {"codigo": "1015825NC", "label": "80", "id": 1298}]' WHERE codigo = '1015827';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015826N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015831N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825NC';

UPDATE producto SET medidas = '[{"codigo": "1015949", "label": "DISCO DESBASTE 4 1/2 X6", "id": 944}, {"codigo": "1015949CAR", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1304}, {"codigo": "1015949INOXER", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1305}, {"codigo": "1015949K", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1306}, {"codigo": "1015949N", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1307}, {"codigo": "1015949NC", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1308}, {"codigo": "1015949ROTTLUFF", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1309}]' WHERE codigo = '1015949';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949CAR';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949K';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949ROTTLUFF';

UPDATE producto SET medidas = '[{"codigo": "101595", "label": "DISCO DESBASTE 7X6.4X22", "id": 945}, {"codigo": "1015950INOXER", "label": "DISCO DESBASTE 7X6.4X22", "id": 1310}, {"codigo": "1015950N", "label": "DISCO DESBASTE 7X6.4X22", "id": 1311}, {"codigo": "1015950NC", "label": "DISCO DESBASTE 7X6.4X22", "id": 1312}]' WHERE codigo = '101595';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950NC';

UPDATE producto SET medidas = '[{"codigo": "1015951", "label": "DISCO DESBASTE 9X6.4X22", "id": 946}, {"codigo": "1015951INOXER", "label": "DISCO DESBASTE 9X6.4X22", "id": 1313}]' WHERE codigo = '1015951';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015951INOXER';

UPDATE producto SET medidas = '[{"codigo": "1015955", "label": "DISCO CORTE 4 1/2X3.2X", "id": 949}, {"codigo": "1015955INOXER", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1315}, {"codigo": "1015955N", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1316}, {"codigo": "1015955NC", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1317}]' WHERE codigo = '1015955';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955NC';

UPDATE producto SET medidas = '[{"codigo": "1015956", "label": "DISCO CORTE 7X3.2X22.2", "id": 950}, {"codigo": "1015956INOXER", "label": "DISCO CORTE 7X3.2X22.2", "id": 1318}, {"codigo": "1015956NC", "label": "DISCO CORTE 7X3.2X22.2", "id": 1319}]' WHERE codigo = '1015956';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015956INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015956NC';

UPDATE producto SET medidas = '[{"codigo": "1015957", "label": "DISCO CORTE 9X3.2X22.2", "id": 951}, {"codigo": "1015957INOXER", "label": "DISCO CORTE 9X3.2X22.2", "id": 1320}, {"codigo": "1015957N", "label": "DISCO CORTE 9X3.2X22.2", "id": 1321}, {"codigo": "1015957NC", "label": "DISCO CORTE 9X3.2X22.2", "id": 1322}]' WHERE codigo = '1015957';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957NC';

UPDATE producto SET medidas = '[{"codigo": "1015958", "label": "DISCO CORTE 14X3.2X25.4", "id": 952}, {"codigo": "1015958INOXER", "label": "DISCO CORTE 14X3.2X25.4", "id": 1323}, {"codigo": "1015958N", "label": "DISCO CORTE 14X3.2X25.4", "id": 1324}]' WHERE codigo = '1015958';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015958INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015958N';

UPDATE producto SET medidas = '[{"codigo": "1017211", "label": "0", "id": 962}, {"codigo": "1017212", "label": "1", "id": 963}, {"codigo": "1017213", "label": "2", "id": 964}, {"codigo": "1017214", "label": "3", "id": 965}]' WHERE codigo = '1017211';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017212';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017213';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017214';

UPDATE producto SET medidas = '[{"codigo": "1017215", "label": "1", "id": 966}, {"codigo": "1017216", "label": "2", "id": 967}]' WHERE codigo = '1017215';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017216';

UPDATE producto SET medidas = '[{"codigo": "1018442", "label": "FILTRO 3M 60923 MIXTO P100", "id": 976}, {"codigo": "24011202", "label": "FILTRO 3M 60923 MIXTO P100", "id": 1249}]' WHERE codigo = '1018442';
UPDATE producto SET es_variante = TRUE WHERE codigo = '24011202';

UPDATE producto SET medidas = '[{"codigo": "1021175", "label": "GRAMPA TIERRA 500 AMPS", "id": 981}, {"codigo": "10211751", "label": "GRAMPA TIERRA 500 AMPS", "id": 1171}]' WHERE codigo = '1021175';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10211751';

UPDATE producto SET medidas = '[{"codigo": "1021943", "label": "JUEGO CARBONES ESMERILES", "id": 983}, {"codigo": "1021944", "label": "JUEGO CARBONES ESMERILES", "id": 984}]' WHERE codigo = '1021943';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1021944';

UPDATE producto SET medidas = '[{"codigo": "1023398", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 990}, {"codigo": "1023398INOXER", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1325}, {"codigo": "1023398N", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1326}, {"codigo": "1023398NC", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1327}]' WHERE codigo = '1023398';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398NC';

UPDATE producto SET medidas = '[{"codigo": "1023399", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 991}, {"codigo": "1023399INOXER", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1328}, {"codigo": "1023399N", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1329}, {"codigo": "1023399NC", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1330}]' WHERE codigo = '1023399';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399NC';

UPDATE producto SET medidas = '[{"codigo": "1023665", "label": "TAPA MEDIANA 300M", "id": 994}, {"codigo": "3042901", "label": "TAPA MEDIANA 300M", "id": 1087}]' WHERE codigo = '1023665';
UPDATE producto SET es_variante = TRUE WHERE codigo = '3042901';

UPDATE producto SET medidas = '[{"codigo": "1023805", "label": "MANGUERA PVC", "id": 997}, {"codigo": "10238051", "label": "MANGUERA PVC", "id": 1173}]' WHERE codigo = '1023805';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10238051';

UPDATE producto SET medidas = '[{"codigo": "1031669", "label": "60", "id": 1013}, {"codigo": "103168", "label": "80", "id": 1014}]' WHERE codigo = '1031669';
UPDATE producto SET es_variante = TRUE WHERE codigo = '103168';

UPDATE producto SET medidas = '[{"codigo": "1039276", "label": "818", "id": 1024}, {"codigo": "1039277", "label": "992", "id": 1025}]' WHERE codigo = '1039276';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1039277';

UPDATE producto SET medidas = '[{"codigo": "2961733", "label": "19 MM", "id": 1042}, {"codigo": "3697223", "label": "24 MM", "id": 1118}]' WHERE codigo = '2961733';
UPDATE producto SET es_variante = TRUE WHERE codigo = '3697223';

UPDATE producto SET medidas = '[{"codigo": "3046511", "label": "80", "id": 1096}, {"codigo": "3006814", "label": "90", "id": 1063}]' WHERE codigo = '3046511';
UPDATE producto SET es_variante = TRUE WHERE codigo = '3006814';

UPDATE producto SET medidas = '[{"codigo": "3046507", "label": "O''RING AS NBR 2-214 M30", "id": 1092}, {"codigo": "3046508", "label": "O''RING AS NBR 2-214 M30", "id": 1093}]' WHERE codigo = '3046507';
UPDATE producto SET es_variante = TRUE WHERE codigo = '3046508';

UPDATE producto SET medidas = '[{"codigo": "4000048", "label": "CAMBIO DE VALVULA", "id": 1120}, {"codigo": "679943", "label": "CAMBIO DE VALVULA", "id": 1424}]' WHERE codigo = '4000048';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679943';

UPDATE producto SET medidas = '[{"codigo": "10155951", "label": "KIT POLICARBONATO PROTECCION", "id": 1149}, {"codigo": "10415721", "label": "KIT POLICARBONATO PROTECCION", "id": 1176}]' WHERE codigo = '10155951';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10415721';

UPDATE producto SET medidas = '[{"codigo": "10164902", "label": "SET MANGUERA SIMPLE 1/4  25 MT", "id": 1164}, {"codigo": "10164905", "label": "SET MANGUERA SIMPLE 1/4  25 MT", "id": 1167}]' WHERE codigo = '10164902';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10164905';

UPDATE producto SET medidas = '[{"codigo": "14660086", "label": "32 MM", "id": 1207}, {"codigo": "14660078", "label": "50 MM", "id": 1199}]' WHERE codigo = '14660086';
UPDATE producto SET es_variante = TRUE WHERE codigo = '14660078';

UPDATE producto SET medidas = '[{"codigo": "20810011", "label": "2\"", "id": 1238}, {"codigo": "20810007", "label": "3\"", "id": 1234}]' WHERE codigo = '20810011';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810007';

UPDATE producto SET medidas = '[{"codigo": "20810009", "label": "1/2\"", "id": 1236}, {"codigo": "2081001", "label": "2\"", "id": 1237}]' WHERE codigo = '20810009';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2081001';

UPDATE producto SET medidas = '[{"codigo": "20810019", "label": "0.8 MM", "id": 1351}, {"codigo": "20810018", "label": "0.9 MM", "id": 1350}, {"codigo": "20810017", "label": "1.0 MM", "id": 1244}]' WHERE codigo = '20810019';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810018';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810017';

UPDATE producto SET medidas = '[{"codigo": "1015829INOXER", "label": "40", "id": 1300}, {"codigo": "1015830INOXER", "label": "80", "id": 1301}, {"codigo": "1015830N", "label": "80", "id": 1302}]' WHERE codigo = '1015829INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015830INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015830N';

UPDATE producto SET medidas = '[{"codigo": "4457227", "label": "0.8 MM", "id": 1347}, {"codigo": "4457105", "label": "0.9 MM", "id": 1343}, {"codigo": "4457103", "label": "1.0 MM", "id": 1341}, {"codigo": "4457104", "label": "1.2 MM", "id": 1342}, {"codigo": "4457106", "label": "1.6 MM", "id": 1344}]' WHERE codigo = '4457227';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457105';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457103';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457104';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457106';

UPDATE producto SET medidas = '[{"codigo": "25039", "label": "39", "id": 1356}, {"codigo": "2504", "label": "40", "id": 1357}, {"codigo": "25041", "label": "41", "id": 1358}, {"codigo": "25042", "label": "42", "id": 1359}, {"codigo": "25043", "label": "43", "id": 1360}, {"codigo": "25044", "label": "44", "id": 1361}]' WHERE codigo = '25039';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2504';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25043';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25044';

UPDATE producto SET medidas = '[{"codigo": "35039", "label": "39", "id": 1363}, {"codigo": "3504", "label": "40", "id": 1364}, {"codigo": "35041", "label": "41", "id": 1365}, {"codigo": "35042", "label": "42", "id": 1366}, {"codigo": "35043", "label": "43", "id": 1367}]' WHERE codigo = '35039';
UPDATE producto SET es_variante = TRUE WHERE codigo = '3504';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35043';

UPDATE producto SET medidas = '[{"codigo": "1000376", "label": "AEROSOL LIMPIEZA (TINTAS PENETRANTES)", "id": 1390}, {"codigo": "10003761", "label": "AEROSOL LIMPIEZA (TINTAS PENETRANTES)", "id": 1399}]' WHERE codigo = '1000376';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10003761';

UPDATE producto SET medidas = '[{"codigo": "1000377", "label": "AEROSOL PENETRANTE (TINTAS PENETRANTES)", "id": 1391}, {"codigo": "10003771", "label": "AEROSOL PENETRANTE (TINTAS PENETRANTES)", "id": 1400}]' WHERE codigo = '1000377';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10003771';

UPDATE producto SET medidas = '[{"codigo": "1000378", "label": "AEROSOL REVELADOR (TINTAS PENETRANTES)", "id": 1392}, {"codigo": "10003781", "label": "AEROSOL REVELADOR (TINTAS PENETRANTES)", "id": 1401}]' WHERE codigo = '1000378';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10003781';

UPDATE producto SET medidas = '[{"codigo": "679928", "label": "1 KG", "id": 1409}, {"codigo": "679932", "label": "10 KG", "id": 1413}, {"codigo": "679929", "label": "2 KG", "id": 1410}, {"codigo": "67993", "label": "4 KG", "id": 1411}, {"codigo": "679931", "label": "6 KG", "id": 1412}]' WHERE codigo = '679928';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679932';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679929';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679931';

UPDATE producto SET medidas = '[{"codigo": "679933", "label": "2 KG", "id": 1414}, {"codigo": "679934", "label": "5 KG", "id": 1415}]' WHERE codigo = '679933';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679934';

UPDATE producto SET medidas = '[{"codigo": "679935", "label": "1 KG", "id": 1416}, {"codigo": "679939", "label": "10 KG", "id": 1420}, {"codigo": "679936", "label": "2 KG", "id": 1417}, {"codigo": "679937", "label": "4 KG", "id": 1418}, {"codigo": "679938", "label": "6 KG", "id": 1419}]' WHERE codigo = '679935';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679939';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679936';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679937';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679938';

UPDATE producto SET medidas = '[{"codigo": "679946", "label": "2 KG", "id": 1427}, {"codigo": "679945", "label": "5 KG", "id": 1426}]' WHERE codigo = '679946';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679945';

UPDATE producto SET medidas = '[{"codigo": "679955", "label": "50 KG", "id": 1432}, {"codigo": "679948", "label": "75 KG", "id": 1429}]' WHERE codigo = '679955';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679948';

UPDATE producto SET medidas = '[{"codigo": "679958", "label": "10 LT", "id": 1435}, {"codigo": "67996", "label": "6 LT", "id": 1437}]' WHERE codigo = '679958';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67996';

UPDATE producto SET medidas = '[{"codigo": "679965", "label": "10 KG", "id": 1443}, {"codigo": "679964", "label": "6 KG", "id": 1442}]' WHERE codigo = '679965';
UPDATE producto SET es_variante = TRUE WHERE codigo = '679964';

-- ═══════════════════════════════════════════════════════════
-- ═══════════════════════════════════════════════════════════