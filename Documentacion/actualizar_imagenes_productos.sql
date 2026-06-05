-- ================================================================
-- Actualización de imagen_url para productos del catálogo VMA
-- Fuente imágenes: kupfer.cl CDN (URLs estables)
-- Fecha: 2026-06-05
--
-- Solo actualiza productos que NO tienen imagen (imagen_url IS NULL)
-- y que sean productos padre (id_padre IS NULL).
-- ================================================================

BEGIN;

-- ────────────────────────────────────────────────────────────────
-- 1. SOLDADORAS MMA / ARCO MANUAL / INVERSORAS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/i/n/inversora_200_led_katto.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '(SOLDADORA|MAQUINA.*SOLD|INVERSORA).*(MMA|ARC\s|ARC\d|LED|VRD|PRO|LCD|200|300|400|GLINT|INDURARC|KATANA|SAMURAI|FLASH)'
  AND descripcion !~* '\bMIG\b|\bTIG\b|PLASMA|OXICORTE';

-- ────────────────────────────────────────────────────────────────
-- 2. SOLDADORAS MIG / MAG
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/k/a/katto_mig_180_1.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '(SOLDADORA|MAQUINA.*SOLD).*(MIG|MAG)|AMIGO.*453|COMPACTMIG|MEGAMIG|MULTIPRO.*200';

-- ────────────────────────────────────────────────────────────────
-- 3. SOLDADORAS TIG
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/t/i/tig_acdc.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '(SOLDADORA|MAQUINA.*SOLD).*(TIG|HF)|MASTERTIG|MINARC.*TIG|SYNCROWAVE|ARCTIG|PROTIG';

-- ────────────────────────────────────────────────────────────────
-- 4. EQUIPOS CORTE PLASMA
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/n/antorcha_plasma_autom_tica_lc_65m_de_7_5m_1_uvhxk6lsvnlol3ed.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* 'EQUIPO.*CORTE.*PLASMA|CORTE.*PLASMA.*CUT|PLASMA.*CUT\-\d|POWERMAX|INVERCUT';

-- ────────────────────────────────────────────────────────────────
-- 5. EQUIPOS OXICORTE COMPLETOS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/k/i/kit_de_oxi_-_propano_heavy_duty_1.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* 'EQUIPO.*(SOLDAR.*CORTAR|CORTAR.*SOLDAR|FLAMEPOWER|OXIGAS|MASTER.*KIT|MASTER.*CORTE|JOURNEYMAN|TORCHAR|OXI.*PROPANO|OXI.*LPG)|MALETA.*(CORTE|SOLDAR)|RANA.*CORTE|CARRO.*OXICORTE';

-- ────────────────────────────────────────────────────────────────
-- 6. HORNOS PARA ELECTRODOS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/h/o/horno_para_soldadura_.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^HORNO\b';

-- ────────────────────────────────────────────────────────────────
-- 7. ELECTRODOS DE SOLDADURA
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/e/l/electrodo-power-k-plus-6011-3_32_-_kg_-edited_lxvtk4jlg5wvlywm.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^ELECTRODO\b';

-- ────────────────────────────────────────────────────────────────
-- 8. VARILLAS TIG Y APORTE
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/v/a/varilla_tig_er-316l__1_1.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^VARILLA\b|^APORTE.*TIG\b|^GRAFITO\b';

-- ────────────────────────────────────────────────────────────────
-- 9. ALAMBRE MIG SÓLIDO (bobina)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/l/alambre_katto_4_1.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^ALAMBRE\s+MIG\b'
  AND descripcion !~* 'TUBULAR';

-- ────────────────────────────────────────────────────────────────
-- 10. ALAMBRE TUBULAR / FCW
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/l/alambre-tubular-power-k-plus-e71t-1m-1_6mm-edited_2_ydkfbhr1obigv388.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '(ALAMBRE|A\.).*TUBULAR|^A\.TUBULAR\b';

-- ────────────────────────────────────────────────────────────────
-- 11. DISCOS DE CORTE
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/c/o/corte_inox_4_5_x_1.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^DISCO\s+(CORTE|CORTE\s+FINO|CORTE\s+INOX)\b'
  AND descripcion !~* 'LAMINADO|LAMINA|DIAMANT|DESBASTE';

-- ────────────────────────────────────────────────────────────────
-- 12. DISCOS DE DESBASTE
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/d/e/desbaste_carbono_7_x_6_4.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^DISCO\s+DESBASTE\b';

-- ────────────────────────────────────────────────────────────────
-- 13. DISCOS LAMINADOS / FLAP DISC
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/d/i/discopowerk-estandar_5_zu4uyhsivq7jkwoq.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^DISCO\s+(LAMINADO|DE\s+LAMINA|TRASLAPADO)\b';

-- ────────────────────────────────────────────────────────────────
-- 14. GRATAS CIRCULARES Y COPA
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/r/b/rbg-15013-22-2-st-0-60-rgb_1.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^GRATA\b';

-- ────────────────────────────────────────────────────────────────
-- 15. ESCOBILLAS (circulares y de mano)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/r/b/rbg-15013-22-2-st-0-60-rgb_1.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^ESCOBILLA\b|^CEPILLO\s+(BRONCE|ACERO)\b';

-- ────────────────────────────────────────────────────────────────
-- 16. REGULADORES Y FLUJÓMETROS DE GAS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/p/h/photo_for_119999_200-15fl-ar_.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^REGULADOR\b';

-- ────────────────────────────────────────────────────────────────
-- 17. PISTOLAS TIG (antorchas TIG)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/1/1/119831.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^PISTOLA\s+TIG\b';

-- ────────────────────────────────────────────────────────────────
-- 18. PISTOLAS MIG (antorchas MIG)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/p/i/pistola_magnum_400_k479-4_oferta.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(PISTOLA|PIST\.)\s+MIG\b';

-- ────────────────────────────────────────────────────────────────
-- 19. SOPLETES DE CORTE Y CALENTAMIENTO
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/s/o/soplete_cortador_acetileno_90_grados_62-3_hd.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^SOPLETE\b|^MANGO\s+(PARA\s+SOLDAR|CORTADOR)\b|^ADITAMENTO\s+DE\s+CORTE\b|^MEZCLADOR\b';

-- ────────────────────────────────────────────────────────────────
-- 20. BOQUILLAS DE CORTE Y CALENTAR (oxiacetilenicas)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/c/a/captura_de_pantalla_2020-01-06_a_la_s_16.56.20_1_1.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^BOQUILLA\s+(CORTE|CALENTAR|SOLDAR)\b';

-- ────────────────────────────────────────────────────────────────
-- 21. TOBERAS (TIG/MIG/plasma)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/p/r/pr22820bi12650_50876_tobera_ceramica_pistola_pt_31_p06003_imd_qbxiv5jepktjn6sc.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^TOBERA\b|^23-62\s+TOBERA\b';

-- ────────────────────────────────────────────────────────────────
-- 22. DIFUSORES DE GAS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/p/r/pr22821bi12859_50877_anillo_difusor_pistola_pt_31_p06002_imd_i6qpzsgywg34cmpb.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^DIFUSOR\b';

-- ────────────────────────────────────────────────────────────────
-- 23. PORTAELECTRODO Y GRAMPA TIERRA
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/k/i/kit_accesorios_arco_manual.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^PORTAELECTRODO\b|^GRAMPA\b|^GRAMPA\s+(A\s+TIERRA|BRONCE|TIERRA)\b|^PRENSA\s+BRONCE\b';

-- ────────────────────────────────────────────────────────────────
-- 24. CABLES DE SOLDAR
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/c/a/cable_soldar_1__oferta.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^CABLE\s+(SOLDAR|DE\s+SOLDAR)\b';

-- ────────────────────────────────────────────────────────────────
-- 25. CONECTORES (DINSE, TWECO, Texas)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/c/l/clavija_macho_2_.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^CONECTOR\b|^ENCHUFE\s+(DINCE|MAQUINA)\b|TERMINAL\s+\d+';

-- ────────────────────────────────────────────────────────────────
-- 26. ANTISALPICADURAS / ANTISPATTER
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/g/e/gel_antisalpicaduras_2_.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* 'ANTISALPICADURAS|ANTI.SPATTER|ANTISPATTER';

-- ────────────────────────────────────────────────────────────────
-- 27. MÁSCARAS FOTOSENSIBLES (auto-oscurantes)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/m/a/mascara_para_soldar_fotosensible_optech_graf.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '(MASCARA|CARETA).*(FOTOSENSIBLE|AUTO|WELDER|STARFACE|LEOPARD|NEXXO|WTC|OSCUREC)'
  AND descripcion !~* 'FRENTE.*MOVIL|VISOR.*ALZABLE|CASCO|ADOSABLE';

-- ────────────────────────────────────────────────────────────────
-- 28. MÁSCARAS FRENTE MÓVIL / ALZABLES
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/m/_/m_scara_soldar_visor_alzable_apollo_econ_mica.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* 'MASCARA.*(HSL|FRENTE.*MOVIL|HSL2|VISOR.*ALZABLE|CASCO.*OPTECH|ADOSABLE)|PANTALLA.*SOLAR.*CASCO';

-- ────────────────────────────────────────────────────────────────
-- 29. LENTES DE SEGURIDAD
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/n/anteojo_getpro_freeze.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^LENTE\b';

-- ────────────────────────────────────────────────────────────────
-- 30. ANTIPARRAS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/n/anteojo_getpro_twins.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^ANTIPARRA\b';

-- ────────────────────────────────────────────────────────────────
-- 31. CASCOS DE SEGURIDAD
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/c/a/casco_msa_top-gard_blanco.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^CASCO\s+(DE\s+SEGURIDAD|MSA|PROSEG|EVO)\b';

-- ────────────────────────────────────────────────────────────────
-- 32. GUANTES SOLDADOR (cuero / descarne / TIG)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/6/4/6403_1_ebev6zxqfgualz6w.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^GUANTE\s+SOLDADOR\b|^GUANTE\s+(AT19|CABRITILLA|DESCARNE|TIG|INDURA|CUERO|CRIOGEN|MANGUILLA)'
  AND descripcion !~* 'NITRILO|LATEX|ROCK|FORTE|MULTIFLEX|ANTICORTE|ALUMIN';

-- ────────────────────────────────────────────────────────────────
-- 33. GUANTES DE SEGURIDAD GENERAL (nitrilo, latex, mecánicos)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/t/o/touch-n-tuff-92-600-1565970223_2_pr7dz5bp7nmjcffk.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^GUANTE\b'
  AND descripcion ~* 'NITRILO|LATEX|ROCK|FORTE|MULTIFLEX|ANTICORTE|YELLOW|ORANGE|KRONN'
  AND descripcion !~* 'SOLDADOR|DESCARNE|CABRITILLA|TIG';

-- ────────────────────────────────────────────────────────────────
-- 34. BOTINES Y CALZADO DE SEGURIDAD
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/1/6/167337_1_4_ue5z6p3u0nccdn9e.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(BOTIN|ZAPATO|ZAPATILLA|CALCETIN|METATARSO)\b';

-- ────────────────────────────────────────────────────────────────
-- 35. OVEROLES Y ROPA DE TRABAJO
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/1/1/115291-ficha-1611847504_5_06yz0bgmpnh0dh61.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(OVEROL|BUZO|SLACK|PANTALON|CHAQUETA|BALACLAVA|TRAJE.*AGUA)\b'
  AND descripcion !~* '^BUZO.*(IGNIFUGO|ANTIACID)';

-- ────────────────────────────────────────────────────────────────
-- 36. CHALECOS REFLECTANTES
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/5/5/5560_9.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^CHALECO\s+(REFLECTANTE|GEOLOGO)\b';

-- ────────────────────────────────────────────────────────────────
-- 37. RESPIRADORES Y MASCARILLAS
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/r/e/respirador_3m_serie_6000__1.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(RESPIRADOR|MASCARILLA|FILTRO\s+3M|FILTRO\s+AIR)\b';

-- ────────────────────────────────────────────────────────────────
-- 38. ROPA SOLDADOR (coletos, chaquetas cuero, mantas)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/6/4/6403_1_ebev6zxqfgualz6w.png'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(COLETO|POLAINA|MANGUILLA|MANTA\s+(DE\s+)?DESCARNE|MANTA\s+IGNIFUGA|GORRO\s+(SOLDADOR|TELA|CUERO))\b'
  AND descripcion !~* '^GUANTE';

-- ────────────────────────────────────────────────────────────────
-- 39. ESMERILES ANGULARES
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/e/s/esmeril_angular_ga9040s.jpeg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^ESMERIL\s+ANGULAR\b|^RECTIFICADOR\s+MATRICES\b';

-- ────────────────────────────────────────────────────────────────
-- 40. HERRAMIENTAS MANUALES (llaves, alicates, dados, huinchas)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/1/1/111z_11t.jpeg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^(LLAVE\s+(FRANCESA|PUNTA)|ALICATE|DADO\s+\d|HUINCHA|MAZO|MARTILLO|JUEGO.*EXTRACTOR|PORTA.*POWER|LAPIZ.*MEDIC|PIEDRA\s+SPENCIL|NIVEL\s+\d|ESCUADRA)\b';

-- ────────────────────────────────────────────────────────────────
-- 41. TECLES (cadena y palanca)
-- ────────────────────────────────────────────────────────────────
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/t/e/tecle-cadena-kito-cb_1_1_mhyj7frxszika1g3.jpg'
WHERE id_padre IS NULL AND imagen_url IS NULL
  AND descripcion ~* '^TECLE\b';

-- ================================================================
-- VERIFICACIÓN
-- ================================================================
-- Descomentar para ver cuántos productos se actualizaron:
/*
SELECT COUNT(*) AS productos_con_imagen
FROM producto
WHERE imagen_url IS NOT NULL AND id_padre IS NULL;

SELECT COUNT(*) AS productos_sin_imagen
FROM producto
WHERE imagen_url IS NULL AND id_padre IS NULL;
*/

COMMIT;
