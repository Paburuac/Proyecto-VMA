-- Script: Actualizar imagen_url de productos sin imagen
-- Generado: 2026-06-10
-- Fuente: búsqueda web de imágenes representativas por categoría/fabricante
-- Instrucciones: ejecutar en Supabase SQL Editor

-- HERRAMIENTAS - Brocas Makita concreto
UPDATE producto SET imagen_url = 'https://www.sodimac.cl/sodimac-cl/product/3433900/Broca-para-concreto-6x150-mm/3433900' WHERE codigo IN ('5234', '5262') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.chrisco.cl/productos/brocas/brocas-hss-metal/broca-hss-metal-acero-aleaciones-10-mm-diametro.php' WHERE codigo IN ('9721', '10179', '10281', '11486', '11539') AND imagen_url IS NULL;

-- GRATAS / ESCOBILLAS - Escobillas de mano
UPDATE producto SET imagen_url = 'https://isesacl.vtexassets.com/arquivos/ids/156804-800-800?v=637178055922830000&width=800&height=800&aspect=true' WHERE codigo IN ('11055', '12050', '13100', '13200', '13500', '14115') AND imagen_url IS NULL;

-- GRATAS / ESCOBILLAS - Gratas circulares
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/r/b/rbg-11512-22-2-st-0-50-rgb_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo IN ('20510','21030','21040','21095','21565','21580','29510','31033','31037','31040','31053','31101','31116','31151','31170','31360','33574','33805','41010','41012','41025','41332','41356','41812','42020','42085','42110','44021','44785','50275','50610') AND imagen_url IS NULL;

-- CUIDADO PERSONAL - Lentes 3M
UPDATE producto SET imagen_url = 'https://redsuministros.com/wp-content/uploads/2021/08/3M_11796_a-570x570.jpg' WHERE codigo = '11873' AND imagen_url IS NULL;

-- ACCESORIOS - Cinta ducto
UPDATE producto SET imagen_url = 'https://dosestrellas-ecommerce.s3.amazonaws.com/imagenes/productos/3003043808_43.jpg' WHERE codigo = '12587' AND imagen_url IS NULL;

-- CALZADO - Botín Quebec 250
UPDATE producto SET imagen_url = 'https://www.apro.cl/cdn/shop/files/441790-800-auto.jpg?v=1712602875&width=1200' WHERE codigo IN ('25039','25040','25041','25042','25043','25044') AND imagen_url IS NULL;

-- CALZADO - Botín Nazca Roble
UPDATE producto SET imagen_url = 'https://www.apro.cl/cdn/shop/files/image-24b3b5ac18724723a8bbe8ddfe797ba5.jpg?v=1751899226&width=1200' WHERE codigo = '30840' AND imagen_url IS NULL;

-- CALZADO - Botín Quebec 400
UPDATE producto SET imagen_url = 'https://www.apro.cl/cdn/shop/files/441790-800-auto.jpg?v=1712602875&width=1200' WHERE codigo IN ('40039','40040','40041','40042','40043','40044') AND imagen_url IS NULL;

-- CALZADO - Botín Puelche II
UPDATE producto SET imagen_url = 'https://rac.cl/cdn/shop/files/9e28f414-5f9f-4272-be4a-2800beb0e14e.jpg?v=1779127112&width=1445' WHERE codigo = '302040' AND imagen_url IS NULL;

-- CALZADO - Zapatilla Redbrick Comet
UPDATE producto SET imagen_url = 'https://www.tecnoboga.cl/zapatilla-redbrick-comet/p' WHERE codigo = '203742' AND imagen_url IS NULL;

-- SOLDADURA - Máquinas Hyundai HG200
UPDATE producto SET imagen_url = 'https://bpmac.cl/products/maquina-soldar-mig-5-kg-200-amp-hg-200-hyundai' WHERE codigo IN ('37200','37201') AND imagen_url IS NULL;

-- HERRAMIENTAS - Equipo Journeyman acetileno
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/CEC-111140660-EQUIPO-JOURNEYMAN-ADGE-ACETILENO-0384-2101.jpg?v=1706028295&width=1500' WHERE codigo = '40660' AND imagen_url IS NULL;

-- DIFUSORES / BOQUILLAS - Binzel 36
UPDATE producto SET imagen_url = 'https://cimex.cl/225-large_default/porta-boquilla-mig-binzel-36-m6-m8-md0131.webp' WHERE codigo IN ('100013','100014','100018') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.repuestosoldadoras.cl/wp-content/uploads/2026/04/boquilla-binzel.jpg' WHERE codigo IN ('100016','100017') AND imagen_url IS NULL;

-- SOLDADURA - Equipos de corte plasma
UPDATE producto SET imagen_url = 'https://weldfan.cl/wp-content/uploads/2024/08/cut-45-600x600.jpg' WHERE codigo IN ('100045','1000045') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.dplas.cl/329-large_default/maquina-corte-plasma-cut100-mitech.jpg' WHERE codigo = '100201' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MER-0000160-MAQUINA-CORTE-PLASMA-WTC-CUT160-380V160A.jpg?v=1706028413&width=1500' WHERE codigo = '220370' AND imagen_url IS NULL;

-- SOLDADURA - Reguladores de gas
UPDATE producto SET imagen_url = 'https://sermaind.cl/wp-content/uploads/2023/04/IND1510044.jpg' WHERE codigo IN ('100267','1000397','1000622','1001701','1002225','1008054','1009203') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://cdnx.jumpseller.com/mia-parweld1/image/53562185/801DB-10-0X_harris.png?1726848653' WHERE codigo IN ('1007336','1007337') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://images.tcdn.com.br/img/img_prod/469103/regulador_de_pressao_para_oxigenio_md_10_ox_1077185_1_20161010104941.jpg' WHERE codigo = '407782' AND imagen_url IS NULL;

-- SOLDADURA - Máquinas MITECH
UPDATE producto SET imagen_url = 'https://www.dplas.cl/321-large_default/maquina-soldar-tig-250a-mitech.jpg' WHERE codigo IN ('101270','201065') AND imagen_url IS NULL;

-- SOLDADURA - Inversoras KATTO
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/a/r/arc400.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo IN ('108826','162192') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/m/a/maquina_de_soldar_katto_mig_350_380v.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo = '157545' AND imagen_url IS NULL;

-- SOLDADURA - Máquinas WTC / GLINT (soltec.cl)
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEM-220335-MAQUINA-SOLDADORA-A.MANUAL-WTC-140-MMA-D220V-140A.png?v=1706028420&width=1500' WHERE codigo IN ('220140','220320') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEM-220241-MAQUINA-SOLDADORA-A.-MANUAL-WTC-300-MMA-D380V-300A.png?v=1706028416&width=1500' WHERE codigo = '220241' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEI-220300-MAQUINA-SOLDADORA-MIG-MOD.-WTC-300-220V-300A.jpg?v=1706028434&width=1500' WHERE codigo IN ('220300','220355') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEM-220338-MAQUINA-SOLDAR-A.MANUAL-GLINT-180-MMA-D-220V-180A.png?v=1706028680&width=1500' WHERE codigo = '220338' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/Diseno-sin-titulo-78.png?v=1706028687&width=1500' WHERE codigo = '220339' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEM-220340-MAQUINA-SOLDADORA-A.MANUAL-WTC-200-MMA-D220V-200A.png?v=1706028424&width=1500' WHERE codigo = '220340' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MET-2200220-MAQUINA-SOLDADORA-TIG-MOD.-GLINT-200HF-220V-200A.jpg?v=1706028673&width=1500' WHERE codigo = '220380' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEI-380350-MAQUINA-SOLDADORA-MIG-MOD.-WTC-350M-380V-350A.png?v=1706028437&width=1500' WHERE codigo IN ('380350','380351') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEI-220365-MAQUINA-SOLDADORA-MIG-WTC-500-DE-380V-500A.png?v=1706028441&width=1500' WHERE codigo = '380352' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.patioferretero.cl/soldadora-tig-mma-wtc-215hfr-200a-weltec-mem-220242.html' WHERE codigo = '220242' AND imagen_url IS NULL;

-- SOLDADURA - Máquina SOLDADORA MITECH A/M 400A
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/MEI-380350-MAQUINA-SOLDADORA-MIG-MOD.-WTC-350M-380V-350A.png?v=1706028437&width=1500' WHERE codigo = '201065' AND imagen_url IS NULL;

-- CUIDADO PERSONAL - Raytan protector solar
UPDATE producto SET imagen_url = 'https://www.globalseguridad.cl/wp-content/uploads/2023/04/Raytan-protector-solar-FPS-50-1-lt.png' WHERE codigo IN ('543001','543003') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://toolwork.cl/cdn/shop/files/Disenosintitulo-2025-04-28T180549.482.png?v=1745877968&width=1000' WHERE codigo = '543004' AND imagen_url IS NULL;

-- SOLDADURA - Pistolas TIG WP (Parweld genérico)
UPDATE producto SET imagen_url = 'https://cdnx.jumpseller.com/mia-parweld1/image/74840384/wp26vparweld_2.png?1773881610' WHERE codigo IN ('1000194','1000195','1000789','1002215','1006650') AND imagen_url IS NULL;

-- MANGUERAS - Manguera doble acetileno
UPDATE producto SET imagen_url = 'https://htochile.cl/wp-content/uploads/2025/08/Solda-Dupla-Oxigenio_Acetileno-Verde-e-Vermelho-scaled.jpg' WHERE codigo = '1000251' AND imagen_url IS NULL;

-- ACCESORIOS - Máscara HSL2
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/m/_/m_scara_soldar_jackson_3002580_hsl2_va.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo = '1000256' AND imagen_url IS NULL;

-- HERRAMIENTAS - Regleta medición soldaduras
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/07/galga-basica-600x600.jpg' WHERE codigo = '1000262' AND imagen_url IS NULL;

-- ACCESORIOS - Antiparra soldador
UPDATE producto SET imagen_url = 'https://isesacl.vtexassets.com/arquivos/ids/155512-800-800?v=637178013800600000&width=800&height=800&aspect=true' WHERE codigo = '1000427' AND imagen_url IS NULL;

-- HERRAMIENTAS - Grampa a tierra
UPDATE producto SET imagen_url = 'https://www.mersud.cl/wp-content/uploads/2015/06/PR-Lenco-300-web.jpg' WHERE codigo IN ('1000470','100091') AND imagen_url IS NULL;

-- ACCESORIOS - Cortina inactínica
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/463-Cortina-Inactinica-Amarilla-1.8X2.4-mts.jpg' WHERE codigo = '1000559' AND imagen_url IS NULL;

-- SOLDADURA - Sopletes de corte Harris
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/438-Soplete-de-Corte-Manual-Acetileno-62-5-Harris-600x600.jpg' WHERE codigo IN ('1000625','1006640') AND imagen_url IS NULL;

-- SOLDADURA - Equipos portátiles oxigas / corte
UPDATE producto SET imagen_url = 'https://weldfan.cl/wp-content/uploads/2024/08/Portable-torch-oxicorte-600x600.jpg' WHERE codigo IN ('1000710','1001847','1007322','1009349') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/CEC-111140660-EQUIPO-JOURNEYMAN-ADGE-ACETILENO-0384-2101.jpg?v=1706028295&width=1500' WHERE codigo IN ('1001520','1002227','1007860') AND imagen_url IS NULL;

-- HORNOS para electrodos
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/h/o/horno_para_soldadura_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo IN ('1001474','1001475','1008050') AND imagen_url IS NULL;

-- EPP - Coleto / polaina / chaqueta cuero
UPDATE producto SET imagen_url = 'https://www.apro.cl/cdn/shop/files/83700001320200-Greenway-Coleto-Descarne-F1.jpg?v=1777317182&width=1200' WHERE codigo IN ('1001494','1002288') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.apro.cl/cdn/shop/files/83700001412100-Greenway-Polaina-Descarne-F1.jpg?v=1777318410&width=1200' WHERE codigo = '1002287' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.kupfer.cl/media/catalog/product/5/9/59141-web-1617974752_gwbayqmqe5vby5qg.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560' WHERE codigo = '1002292' AND imagen_url IS NULL;

-- SOLDADURA - Válvulas antirretroceso
UPDATE producto SET imagen_url = 'https://toolwork.cl/cdn/shop/files/a8495200_70a01149-ca6c-42ae-bc43-ad2f3b27407b.webp?v=1766128318&width=475' WHERE codigo IN ('1001529','1001530','1001531','1001767') AND imagen_url IS NULL;

-- LIMPIADORES - Antisalpicaduras / tintas penetrantes
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/GEL-ANTISALPICADURAS.jpg' WHERE codigo IN ('1002095','1009306','1009307') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/kit-tintas-penetrantes.jpg' WHERE codigo IN ('1000376','1000377','1000378') AND imagen_url IS NULL;

-- SOLDADURA - Tungstenos
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/07/TUNGSTENOS-PUNTO-ROJO-CODINSA-600x600.jpg' WHERE codigo IN ('1002695','1002696','1002697','1007340') AND imagen_url IS NULL;

-- SOLDADURA - Carro cilindro
UPDATE producto SET imagen_url = 'https://plasticosqb.cl/assets/upload/imagenes-productos/74-6253482.jpg' WHERE codigo = '1003088' AND imagen_url IS NULL;

-- SOLDADURA - Varillas TIG aluminio / acero
UPDATE producto SET imagen_url = 'https://weldfan.cl/wp-content/uploads/2024/08/aluminio-5356-600x600.jpg' WHERE codigo IN ('1005908','1005909','1006003','1007612') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/ELECTRODOS-ESPECIAL_3676a420-6444-4da5-893d-08d7b2f84aad.png?v=1706028237&width=1500' WHERE codigo IN ('1007302','1007335') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.pernossaez.cl/wp-content/uploads/2023/11/2-34.jpg' WHERE codigo = '1005893' AND imagen_url IS NULL;

-- ALAMBRE MIG
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/5356-2kg-1.jpg' WHERE codigo IN ('1005925','1006004') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://soltec.cl/cdn/shop/products/2-ALAMBRE-MIG-MAG-ACERO-CARBONO_caa96c85-9411-489d-946b-c9535cace1dc.png?v=1706027867&width=1500' WHERE codigo IN ('1006044','1006052','1007826') AND imagen_url IS NULL;

-- ACCESORIOS - Toberas / difusores Tregaskiss
UPDATE producto SET imagen_url = 'https://comercialdaille.cl/wp-content/uploads/2021/01/punta-de-contacto-0045-403-20-45-tregaskiss.jpg' WHERE codigo IN ('1009282','1009541','1009542') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.dplas.cl/238-large_default/pistola-soldar-mig-tregaskiss.jpg' WHERE codigo IN ('1009294','1009311','1009312') AND imagen_url IS NULL;

-- SOLDADURA - Pistolas MIG Tregaskiss / PEZ / TB
UPDATE producto SET imagen_url = 'https://cimex.cl/1977-large_default/pistola-mig-blackweld-modelo-tregaskiss-500-500amp45-mts.jpg' WHERE codigo IN ('1009069','1009070','1009277','1009301','1009302','1009309','1002406','1002407') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.dplas.cl/238-large_default/pistola-soldar-mig-tregaskiss.jpg' WHERE codigo = '1009310' AND imagen_url IS NULL;

-- SOLDADURA - Portaelectrodo Lenco
UPDATE producto SET imagen_url = 'https://cdnx.jumpseller.com/mia-parweld1/image/58042430/AF3-LENCO.png?1733406038' WHERE codigo = '1009374' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://cdnx.jumpseller.com/mia-parweld1/image/58048753/AF50-LENCO.jpg?1733420958' WHERE codigo = '1009375' AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.mersud.cl/wp-content/uploads/2015/06/PR-Lenco-300-web.jpg' WHERE codigo IN ('1009376','1009377') AND imagen_url IS NULL;

-- ACCESORIOS - Boquillas genéricas (Binzel / Tweco)
UPDATE producto SET imagen_url = 'https://www.repuestosoldadoras.cl/wp-content/uploads/2026/04/boquilla-binzel.jpg' WHERE codigo IN ('1009182','1000450','1000261','1000063','1000064','1000109','1000110','1000795','1000809','1000810','1000811') AND imagen_url IS NULL;

-- ACCESORIOS - Difusores / toberas Bernard genérico
UPDATE producto SET imagen_url = 'https://cimex.cl/225-large_default/porta-boquilla-mig-binzel-36-m6-m8-md0131.webp' WHERE codigo IN ('1006316','1000060','1000061') AND imagen_url IS NULL;

-- GUANTES soldador
UPDATE producto SET imagen_url = 'https://codinsa.cl/wp-content/uploads/2023/05/cabritilla-largo-1.jpg' WHERE codigo IN ('1001706','1008013','1008015','1008020') AND imagen_url IS NULL;

-- EPP - Tapones auditivos 3M
UPDATE producto SET imagen_url = 'https://alcosafe.cl/wp-content/uploads/2023/10/tapones-auditivos-1-600x810.webp' WHERE codigo IN ('1008134','1008135','1008136','1008137','1008138') AND imagen_url IS NULL;

-- DISCOS de corte/desbaste Indura
UPDATE producto SET imagen_url = 'https://www.weitzler.cl/bitobee/wp-content/uploads/2022/12/28000700073-1.jpg' WHERE codigo IN ('1006737','1006738') AND imagen_url IS NULL;
UPDATE producto SET imagen_url = 'https://www.weitzler.cl/bitobee/wp-content/uploads/2022/12/28000700069-1.jpg' WHERE codigo = '1006743' AND imagen_url IS NULL;

-- SOLDADURA - Cable soldar Nehering
UPDATE producto SET imagen_url = 'https://rhona.cl/uploads/2013/05/20130528131205-producto-cable-maquina-de-soldar-800x515.jpg' WHERE codigo IN ('1000249','1001654','1001813') AND imagen_url IS NULL;

-- HERRAMIENTAS - Flexible MIG Bernard
UPDATE producto SET imagen_url = 'https://cimex.cl/1977-large_default/pistola-mig-blackweld-modelo-tregaskiss-500-500amp45-mts.jpg' WHERE codigo IN ('1000126','1001551','1001639') AND imagen_url IS NULL;

-- HERRAMIENTAS - Huinchas de medir
UPDATE producto SET imagen_url = 'https://construplaza.cl/media/catalog/product/h/u/huimed231083_108_2i21rndrtheqdygw.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=420&width=600&canvas=600:420' WHERE codigo IN ('62060','62070','62080','62090') AND imagen_url IS NULL;

-- HERRAMIENTAS - Alicates Stanley
UPDATE producto SET imagen_url = 'https://www.construmart.cl/alicate-universal-stanley-8/p' WHERE codigo IN ('69315','69316') AND imagen_url IS NULL;

-- HERRAMIENTAS - Dado hexagonal Stanley
UPDATE producto SET imagen_url = 'https://co.stanleytools.global/producto/4-89-190/dadocubo-de-punta-hexagonal-10-mm-mando-12' WHERE codigo = '86542' AND imagen_url IS NULL;

-- FRESAS carburo de tungsteno
UPDATE producto SET imagen_url = 'https://dojiw2m9tvv09.cloudfront.net/13089/product/M_conica5154.jpg?41&t=1781128507' WHERE codigo IN ('110182','110183','1002118','1002119') AND imagen_url IS NULL;

-- HERRAMIENTAS - Mazo de goma
UPDATE producto SET imagen_url = 'https://construplaza.cl/media/catalog/product/1/0/1003358309-1_0vm0cim6q0ru7uui.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=420&width=600&canvas=600:420' WHERE codigo = '128015' AND imagen_url IS NULL;

-- ACCESORIOS - Conectores macho/hembra Texas
UPDATE producto SET imagen_url = 'https://www.mersud.cl/wp-content/uploads/2015/06/PR-Lenco-300-web.jpg' WHERE codigo IN ('1000258','1000285','1000286','1000471','1000478') AND imagen_url IS NULL;

-- Verificar resultado final
SELECT COUNT(*) AS sin_imagen FROM producto WHERE imagen_url IS NULL AND id_padre IS NULL;
SELECT codigo, descripcion FROM producto WHERE imagen_url IS NULL AND id_padre IS NULL ORDER BY codigo;
