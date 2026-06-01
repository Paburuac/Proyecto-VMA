-- VMA Industrial — Migración variantes (desde Supabase real)

ALTER TABLE producto
  ADD COLUMN IF NOT EXISTS medidas     JSONB    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS es_variante BOOLEAN  DEFAULT FALSE;

UPDATE producto SET medidas = '[{"codigo": "4457227", "label": "0.8 MM", "id": 1074}, {"codigo": "4457105", "label": "0.9 MM", "id": 1070}, {"codigo": "4457103", "label": "1.0 MM", "id": 1068}, {"codigo": "4457104", "label": "1.2 MM", "id": 1069}, {"codigo": "4457106", "label": "1.6 MM", "id": 1071}]' WHERE codigo = '4457227' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457105';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457103';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457104';
UPDATE producto SET es_variante = TRUE WHERE codigo = '4457106';

UPDATE producto SET medidas = '[{"codigo": "20810011", "label": "2\"", "id": 1291}, {"codigo": "20810007", "label": "3\"", "id": 1287}]' WHERE codigo = '20810011' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810007';

UPDATE producto SET medidas = '[{"codigo": "1001524", "label": "ADITAMENTO DE CORTE 72-3", "id": 296}, {"codigo": "1036183", "label": "ADITAMENTO DE CORTE 72-3", "id": 747}]' WHERE codigo = '1001524' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1036183';

UPDATE producto SET medidas = '[{"codigo": "10003761", "label": "AEROSOL LIMPIEZA (TINTAS PENETRANTES)", "id": 1090}, {"codigo": "1000376", "label": "AEROSOL LIMPIEZA (TINTAS PENETRANTES)", "id": 210}]' WHERE codigo = '10003761' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000376';

UPDATE producto SET medidas = '[{"codigo": "1000377", "label": "AEROSOL PENETRANTE (TINTAS PENETRANTES)", "id": 211}, {"codigo": "10003771", "label": "AEROSOL PENETRANTE (TINTAS PENETRANTES)", "id": 1091}]' WHERE codigo = '1000377' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10003771';

UPDATE producto SET medidas = '[{"codigo": "10003781", "label": "AEROSOL REVELADOR (TINTAS PENETRANTES)", "id": 1092}, {"codigo": "1000378", "label": "AEROSOL REVELADOR (TINTAS PENETRANTES)", "id": 212}]' WHERE codigo = '10003781' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000378';

UPDATE producto SET medidas = '[{"codigo": "1022723", "label": "0.9", "id": 652}, {"codigo": "1023668", "label": "1.2", "id": 673}]' WHERE codigo = '1022723' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023668';

UPDATE producto SET medidas = '[{"codigo": "1052961", "label": "0.8 X 15", "id": 804}, {"codigo": "1052961H", "label": "0.8 X 15", "id": 1761}, {"codigo": "1052961N", "label": "0.8 X 15", "id": 1762}, {"codigo": "1052962N", "label": "0.9 X 15", "id": 1764}, {"codigo": "1052962H", "label": "0.9 X 15", "id": 1763}, {"codigo": "1052962", "label": "0.9 X 15", "id": 805}, {"codigo": "1052963K", "label": "1.0 X 15", "id": 1766}, {"codigo": "1052963L", "label": "1.0 X 15", "id": 1767}, {"codigo": "1052963", "label": "1.0 X 15", "id": 806}, {"codigo": "1052963H", "label": "1.0 X 15", "id": 1765}, {"codigo": "1052963N", "label": "1.0 X 15", "id": 1768}, {"codigo": "1052964", "label": "1.2 X 15", "id": 807}, {"codigo": "1052964N", "label": "1.2 X 15", "id": 1770}, {"codigo": "1052964H", "label": "1.2 X 15", "id": 1769}]' WHERE codigo = '1052961' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052961H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052961N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052962';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963K';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963L';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052963N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1052964H';

UPDATE producto SET medidas = '[{"codigo": "1039218", "label": "857", "id": 757}, {"codigo": "1039219", "label": "994", "id": 758}]' WHERE codigo = '1039218' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1039219';

UPDATE producto SET medidas = '[{"codigo": "PC24-N", "label": "ARGON GASEOSO 7 M3 PART (CL. 2.2 NU 1006)", "id": 1908}, {"codigo": "P24-J", "label": "ARGON GASEOSO 7 M3 PART (CL. 2.2 NU 1006)", "id": 1878}, {"codigo": "P24-N", "label": "ARGON GASEOSO 7 M3 PART (CL. 2.2 NU 1006)", "id": 1880}]' WHERE codigo = 'PC24-N' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P24-J';
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P24-N';

UPDATE producto SET medidas = '[{"codigo": "1017215", "label": "1", "id": 575}, {"codigo": "1017216", "label": "2", "id": 576}]' WHERE codigo = '1017215' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017216';

UPDATE producto SET medidas = '[{"codigo": "20810019", "label": "0.8 MM", "id": 1299}, {"codigo": "20810018", "label": "0.9 MM", "id": 1298}, {"codigo": "20810017", "label": "1.0 MM", "id": 1297}]' WHERE codigo = '20810019' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810018';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810017';

UPDATE producto SET medidas = '[{"codigo": "1000352", "label": "0", "id": 205}, {"codigo": "1000354", "label": "2", "id": 206}]' WHERE codigo = '1000352' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000354';

UPDATE producto SET medidas = '[{"codigo": "1000361", "label": "0", "id": 207}, {"codigo": "1001666", "label": "1", "id": 314}, {"codigo": "1001481", "label": "2", "id": 288}, {"codigo": "1000591", "label": "3", "id": 225}, {"codigo": "1000592", "label": "4", "id": 226}, {"codigo": "1000593", "label": "5", "id": 227}]' WHERE codigo = '1000361' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001666';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001481';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000591';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000592';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000593';

UPDATE producto SET medidas = '[{"codigo": "1009541", "label": "0.9 MM", "id": 454}, {"codigo": "1009542", "label": "1.0 MM", "id": 455}]' WHERE codigo = '1009541' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1009542';

UPDATE producto SET medidas = '[{"codigo": "1017211", "label": "0", "id": 571}, {"codigo": "1017212", "label": "1", "id": 572}, {"codigo": "1017213", "label": "2", "id": 573}, {"codigo": "1017214", "label": "3", "id": 574}]' WHERE codigo = '1017211' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017212';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017213';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017214';

UPDATE producto SET medidas = '[{"codigo": "1000616", "label": "0", "id": 231}, {"codigo": "1000610", "label": "1", "id": 228}, {"codigo": "1000612", "label": "3", "id": 229}, {"codigo": "1000614", "label": "5", "id": 230}, {"codigo": "1000618", "label": "8", "id": 232}, {"codigo": "1001687", "label": "9", "id": 315}]' WHERE codigo = '1000616' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000610';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000612';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000614';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1000618';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001687';

UPDATE producto SET medidas = '[{"codigo": "38102241", "label": "1", "id": 1400}, {"codigo": "38102242", "label": "2", "id": 1401}]' WHERE codigo = '38102241' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '38102242';

UPDATE producto SET medidas = '[{"codigo": "36513656", "label": "6", "id": 1383}, {"codigo": "36513657", "label": "7", "id": 1384}]' WHERE codigo = '36513656' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '36513657';

UPDATE producto SET medidas = '[{"codigo": "36515240", "label": "0", "id": 1397}, {"codigo": "36515241", "label": "1", "id": 1398}, {"codigo": "36515244", "label": "4", "id": 1399}]' WHERE codigo = '36515240' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '36515241';
UPDATE producto SET es_variante = TRUE WHERE codigo = '36515244';

UPDATE producto SET medidas = '[{"codigo": "20205540", "label": "0", "id": 1280}, {"codigo": "20205542", "label": "2", "id": 1281}, {"codigo": "20205544", "label": "4", "id": 1282}]' WHERE codigo = '20205540' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20205542';
UPDATE producto SET es_variante = TRUE WHERE codigo = '20205544';

UPDATE producto SET medidas = '[{"codigo": "30558836", "label": "6", "id": 1356}, {"codigo": "30558837", "label": "7", "id": 1357}, {"codigo": "30558838", "label": "8", "id": 1358}]' WHERE codigo = '30558836' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '30558837';
UPDATE producto SET es_variante = TRUE WHERE codigo = '30558838';

UPDATE producto SET medidas = '[{"codigo": "71513341", "label": "1", "id": 1527}, {"codigo": "71513342", "label": "2", "id": 1528}, {"codigo": "71513343", "label": "3", "id": 1529}]' WHERE codigo = '71513341' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '71513342';
UPDATE producto SET es_variante = TRUE WHERE codigo = '71513343';

UPDATE producto SET medidas = '[{"codigo": "1020118640", "label": "0", "id": 1648}, {"codigo": "1020118641", "label": "1", "id": 1649}, {"codigo": "1020118642", "label": "2", "id": 1650}, {"codigo": "1020118643", "label": "3", "id": 1651}, {"codigo": "1020118644", "label": "4", "id": 1652}]' WHERE codigo = '1020118640' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118641';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118642';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118643';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118644';

UPDATE producto SET medidas = '[{"codigo": "35039", "label": "39", "id": 50}, {"codigo": "35040", "label": "40", "id": 51}, {"codigo": "35041", "label": "41", "id": 52}, {"codigo": "35042", "label": "42", "id": 53}, {"codigo": "35043", "label": "43", "id": 54}]' WHERE codigo = '35039' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '35040';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35043';

UPDATE producto SET medidas = '[{"codigo": "1020119640", "label": "0", "id": 1673}, {"codigo": "1020119641", "label": "1", "id": 1674}, {"codigo": "1020119642", "label": "2", "id": 1675}, {"codigo": "1020119643", "label": "3", "id": 1676}, {"codigo": "1020119645", "label": "5", "id": 1677}, {"codigo": "1020119646", "label": "6", "id": 1678}]' WHERE codigo = '1020119640' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119641';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119642';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119643';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119645';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119646';

UPDATE producto SET medidas = '[{"codigo": "1020118941", "label": "1", "id": 1667}, {"codigo": "1020118942", "label": "2", "id": 1668}, {"codigo": "1020118943", "label": "3", "id": 1669}]' WHERE codigo = '1020118941' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118942';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118943';

UPDATE producto SET medidas = '[{"codigo": "1020117939", "label": "39", "id": 1617}, {"codigo": "1020117940", "label": "40", "id": 1618}, {"codigo": "1020117941", "label": "41", "id": 1619}, {"codigo": "1020117942", "label": "42", "id": 1620}, {"codigo": "1020117943", "label": "43", "id": 1621}, {"codigo": "1020117944", "label": "44", "id": 1622}]' WHERE codigo = '1020117939' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117940';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117941';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117942';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117943';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117944';

UPDATE producto SET medidas = '[{"codigo": "1020118040", "label": "0", "id": 1623}, {"codigo": "1020118041", "label": "1", "id": 1624}, {"codigo": "1020118042", "label": "2", "id": 1625}, {"codigo": "1020118043", "label": "3", "id": 1626}]' WHERE codigo = '1020118040' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118043';

UPDATE producto SET medidas = '[{"codigo": "1020118141", "label": "1", "id": 1628}, {"codigo": "1020118143", "label": "3", "id": 1629}]' WHERE codigo = '1020118141' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118143';

UPDATE producto SET medidas = '[{"codigo": "2020111435", "label": "5", "id": 1702}, {"codigo": "2020111436", "label": "6", "id": 1703}, {"codigo": "2020111437", "label": "7", "id": 1704}, {"codigo": "2020111438", "label": "8", "id": 1705}, {"codigo": "2020111439", "label": "9", "id": 1706}]' WHERE codigo = '2020111435' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111436';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111437';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111438';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111439';

UPDATE producto SET medidas = '[{"codigo": "1020119840", "label": "0", "id": 1684}, {"codigo": "1020119841", "label": "1", "id": 1685}, {"codigo": "1020119842", "label": "2", "id": 1686}, {"codigo": "1020119843", "label": "3", "id": 1687}]' WHERE codigo = '1020119840' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119841';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119842';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119843';

UPDATE producto SET medidas = '[{"codigo": "1100111640", "label": "0", "id": 1690}, {"codigo": "1100111641", "label": "1", "id": 1691}, {"codigo": "1100111642", "label": "2", "id": 1692}, {"codigo": "1100111643", "label": "3", "id": 1693}, {"codigo": "1100111644", "label": "4", "id": 1694}]' WHERE codigo = '1100111640' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1100111641';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1100111642';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1100111643';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1100111644';

UPDATE producto SET medidas = '[{"codigo": "1020118438", "label": "38", "id": 1636}, {"codigo": "1020118439", "label": "39", "id": 1637}, {"codigo": "1020118440", "label": "40", "id": 1638}, {"codigo": "1020118441", "label": "41", "id": 1639}, {"codigo": "1020118442", "label": "42", "id": 1640}, {"codigo": "1020118443", "label": "43", "id": 1641}, {"codigo": "1020118444", "label": "44", "id": 1642}]' WHERE codigo = '1020118438' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118439';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118440';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118441';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118442';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118443';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118444';

UPDATE producto SET medidas = '[{"codigo": "202011636", "label": "36", "id": 1576}, {"codigo": "202011637", "label": "37", "id": 1577}, {"codigo": "202011638", "label": "38", "id": 1578}, {"codigo": "202011639", "label": "39", "id": 1579}, {"codigo": "202011640", "label": "40", "id": 1580}]' WHERE codigo = '202011636' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '202011637';
UPDATE producto SET es_variante = TRUE WHERE codigo = '202011638';
UPDATE producto SET es_variante = TRUE WHERE codigo = '202011639';
UPDATE producto SET es_variante = TRUE WHERE codigo = '202011640';

UPDATE producto SET medidas = '[{"codigo": "102011634", "label": "4", "id": 1546}, {"codigo": "102011636", "label": "6", "id": 1547}, {"codigo": "102011637", "label": "7", "id": 1548}, {"codigo": "102011638", "label": "8", "id": 1549}, {"codigo": "102011639", "label": "9", "id": 1550}]' WHERE codigo = '102011634' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011636';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011637';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011638';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011639';

UPDATE producto SET medidas = '[{"codigo": "1020118339", "label": "39", "id": 1630}, {"codigo": "1020118340", "label": "40", "id": 1631}, {"codigo": "1020118341", "label": "41", "id": 1632}, {"codigo": "1020118342", "label": "42", "id": 1633}, {"codigo": "1020118343", "label": "43", "id": 1634}, {"codigo": "1020118344", "label": "44", "id": 1635}]' WHERE codigo = '1020118339' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118340';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118341';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118342';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118343';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118344';

UPDATE producto SET medidas = '[{"codigo": "1020117738", "label": "38", "id": 1603}, {"codigo": "1020117739", "label": "39", "id": 1604}, {"codigo": "1020117740", "label": "40", "id": 1605}, {"codigo": "1020117741", "label": "41", "id": 1606}, {"codigo": "1020117742", "label": "42", "id": 1607}, {"codigo": "1020117743", "label": "43", "id": 1608}, {"codigo": "1020117744", "label": "44", "id": 1609}, {"codigo": "1020117745", "label": "45", "id": 1610}, {"codigo": "1020117746", "label": "46", "id": 1611}]' WHERE codigo = '1020117738' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117739';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117740';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117741';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117742';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117743';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117744';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117745';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117746';

UPDATE producto SET medidas = '[{"codigo": "2020111039", "label": "BOTÍN DE SEGURIDAD NORSEG NICE N°39", "id": 1696}, {"codigo": "202011739", "label": "BOTÍN DE SEGURIDAD NORSEG NICE N°39", "id": 1581}]' WHERE codigo = '2020111039' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '202011739';

UPDATE producto SET medidas = '[{"codigo": "2020111136", "label": "6", "id": 1697}, {"codigo": "2020111138", "label": "8", "id": 1699}]' WHERE codigo = '2020111136' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111138';

UPDATE producto SET medidas = '[{"codigo": "2020111137", "label": "37", "id": 1698}, {"codigo": "2020111139", "label": "39", "id": 1700}, {"codigo": "2020111140", "label": "40", "id": 1701}]' WHERE codigo = '2020111137' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111139';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2020111140';

UPDATE producto SET medidas = '[{"codigo": "402011137", "label": "37", "id": 1585}, {"codigo": "402011139", "label": "39", "id": 1586}, {"codigo": "402011140", "label": "40", "id": 1587}, {"codigo": "402011141", "label": "41", "id": 1588}, {"codigo": "402011142", "label": "42", "id": 1589}, {"codigo": "402011143", "label": "43", "id": 1590}, {"codigo": "402011144", "label": "44", "id": 1591}, {"codigo": "402011145", "label": "45", "id": 1592}]' WHERE codigo = '402011137' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011139';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011140';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011141';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011142';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011143';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011144';
UPDATE producto SET es_variante = TRUE WHERE codigo = '402011145';

UPDATE producto SET medidas = '[{"codigo": "1020118838", "label": "38", "id": 1658}, {"codigo": "1020118839", "label": "39", "id": 1659}, {"codigo": "1020118840", "label": "40", "id": 1660}, {"codigo": "1020118841", "label": "41", "id": 1661}, {"codigo": "1020118842", "label": "42", "id": 1662}, {"codigo": "1022118842", "label": "42", "id": 1689}, {"codigo": "1020118843", "label": "43", "id": 1663}, {"codigo": "1020118844", "label": "44", "id": 1664}, {"codigo": "1020118845", "label": "45", "id": 1665}, {"codigo": "1020118846", "label": "46", "id": 1666}]' WHERE codigo = '1020118838' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118839';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118840';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118841';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118842';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1022118842';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118843';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118844';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118845';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118846';

UPDATE producto SET medidas = '[{"codigo": "102011839", "label": "39", "id": 1557}, {"codigo": "102011840", "label": "40", "id": 1558}, {"codigo": "102011841", "label": "41", "id": 1559}, {"codigo": "102011842", "label": "42", "id": 1560}, {"codigo": "102011843", "label": "43", "id": 1561}, {"codigo": "102011844", "label": "44", "id": 1562}]' WHERE codigo = '102011839' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011840';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011841';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011842';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011843';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011844';

UPDATE producto SET medidas = '[{"codigo": "10201179139", "label": "39", "id": 1712}, {"codigo": "10201179140", "label": "40", "id": 1713}, {"codigo": "10201179141", "label": "41", "id": 1714}, {"codigo": "10201179142", "label": "42", "id": 1715}, {"codigo": "10201179143", "label": "43", "id": 1716}]' WHERE codigo = '10201179139' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10201179140';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10201179141';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10201179142';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10201179143';

UPDATE producto SET medidas = '[{"codigo": "1020119740", "label": "0", "id": 1679}, {"codigo": "1020119741", "label": "1", "id": 1680}, {"codigo": "1020119742", "label": "2", "id": 1681}, {"codigo": "1020119743", "label": "3", "id": 1682}, {"codigo": "1020119744", "label": "4", "id": 1683}]' WHERE codigo = '1020119740' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119741';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119742';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119743';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119744';

UPDATE producto SET medidas = '[{"codigo": "25039", "label": "39", "id": 31}, {"codigo": "25040", "label": "40", "id": 32}, {"codigo": "25041", "label": "41", "id": 33}, {"codigo": "25042", "label": "42", "id": 34}, {"codigo": "25043", "label": "43", "id": 35}, {"codigo": "25044", "label": "44", "id": 36}]' WHERE codigo = '25039' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '25040';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25043';
UPDATE producto SET es_variante = TRUE WHERE codigo = '25044';

UPDATE producto SET medidas = '[{"codigo": "40039", "label": "39", "id": 57}, {"codigo": "40040", "label": "40", "id": 58}, {"codigo": "40041", "label": "41", "id": 59}, {"codigo": "40042", "label": "42", "id": 60}, {"codigo": "40043", "label": "43", "id": 61}, {"codigo": "40044", "label": "44", "id": 62}]' WHERE codigo = '40039' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '40040';
UPDATE producto SET es_variante = TRUE WHERE codigo = '40041';
UPDATE producto SET es_variante = TRUE WHERE codigo = '40042';
UPDATE producto SET es_variante = TRUE WHERE codigo = '40043';
UPDATE producto SET es_variante = TRUE WHERE codigo = '40044';

UPDATE producto SET medidas = '[{"codigo": "36140140", "label": "0", "id": 1377}, {"codigo": "36140141", "label": "1", "id": 1378}, {"codigo": "36140142", "label": "2", "id": 1379}, {"codigo": "361401431", "label": "3", "id": 1583}]' WHERE codigo = '36140140' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '36140141';
UPDATE producto SET es_variante = TRUE WHERE codigo = '36140142';
UPDATE producto SET es_variante = TRUE WHERE codigo = '361401431';

UPDATE producto SET medidas = '[{"codigo": "35130840", "label": "0", "id": 1366}, {"codigo": "35130841", "label": "1", "id": 1367}, {"codigo": "35130842", "label": "2", "id": 1368}]' WHERE codigo = '35130840' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '35130841';
UPDATE producto SET es_variante = TRUE WHERE codigo = '35130842';

UPDATE producto SET medidas = '[{"codigo": "10179", "label": "10 MM", "id": 8}, {"codigo": "10281", "label": "4 MM", "id": 9}, {"codigo": "11486", "label": "8 MM", "id": 11}]' WHERE codigo = '10179' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10281';
UPDATE producto SET es_variante = TRUE WHERE codigo = '11486';

UPDATE producto SET medidas = '[{"codigo": "4000048", "label": "CAMBIO DE VALVULA", "id": 1044}, {"codigo": "67994300", "label": "CAMBIO DE VALVULA", "id": 1504}]' WHERE codigo = '4000048' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67994300';

UPDATE producto SET medidas = '[{"codigo": "14660086", "label": "32 MM", "id": 1236}, {"codigo": "14660078", "label": "50 MM", "id": 1228}]' WHERE codigo = '14660086' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '14660078';

UPDATE producto SET medidas = '[{"codigo": "46990350", "label": "CHALECO GEOLOGO LONA NARANJO M", "id": 1458}, {"codigo": "1017814", "label": "CHALECO GEOLOGO LONA NARANJO M", "id": 602}]' WHERE codigo = '46990350' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017814';

UPDATE producto SET medidas = '[{"codigo": "10015041", "label": "48", "id": 1097}, {"codigo": "10015051", "label": "50", "id": 1098}, {"codigo": "10015081", "label": "52", "id": 1100}, {"codigo": "10015061", "label": "52", "id": 1099}]' WHERE codigo = '10015041' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10015051';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10015081';
UPDATE producto SET es_variante = TRUE WHERE codigo = '10015061';

UPDATE producto SET medidas = '[{"codigo": "1023778", "label": "10 M3", "id": 684}, {"codigo": "1023774", "label": "2 M3", "id": 680}, {"codigo": "1023788", "label": "3 M3", "id": 694}, {"codigo": "1023772", "label": "6 M3", "id": 678}]' WHERE codigo = '1023778' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023774';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023788';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023772';

UPDATE producto SET medidas = '[{"codigo": "1023782", "label": "10 M3", "id": 688}, {"codigo": "1023775", "label": "2 M3", "id": 681}, {"codigo": "1023787", "label": "3 M3", "id": 693}, {"codigo": "1023780", "label": "6 M3", "id": 686}]' WHERE codigo = '1023782' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023775';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023787';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023780';

UPDATE producto SET medidas = '[{"codigo": "1023776", "label": "10 M3", "id": 682}, {"codigo": "1023785", "label": "3 M3", "id": 691}, {"codigo": "1023781", "label": "6 M3", "id": 687}]' WHERE codigo = '1023776' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023785';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023781';

UPDATE producto SET medidas = '[{"codigo": "1023771", "label": "10 M3", "id": 677}, {"codigo": "1023773", "label": "2 M3", "id": 679}, {"codigo": "1023786", "label": "3 M3", "id": 692}, {"codigo": "1023779", "label": "6 M3", "id": 685}]' WHERE codigo = '1023771' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023773';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023786';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023779';

UPDATE producto SET medidas = '[{"codigo": "10018461", "label": "CILINDRO DE ACETILENO", "id": 1121}, {"codigo": "15-MED", "label": "CILINDRO DE ACETILENO", "id": 1778}]' WHERE codigo = '10018461' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '15-MED';

UPDATE producto SET medidas = '[{"codigo": "1015958INOXER", "label": "DISCO CORTE 14X3.2X25.4", "id": 1751}, {"codigo": "1015958", "label": "DISCO CORTE 14X3.2X25.4", "id": 529}, {"codigo": "1015958N", "label": "DISCO CORTE 14X3.2X25.4", "id": 1752}]' WHERE codigo = '1015958INOXER' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015958';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015958N';

UPDATE producto SET medidas = '[{"codigo": "1015955NC", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1745}, {"codigo": "1015955N", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1744}, {"codigo": "1015955INOXER", "label": "DISCO CORTE 4 1/2X3.2X", "id": 1743}, {"codigo": "1015955", "label": "DISCO CORTE 4 1/2X3.2X", "id": 526}]' WHERE codigo = '1015955NC' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015955';

UPDATE producto SET medidas = '[{"codigo": "1015956INOXER", "label": "DISCO CORTE 7X3.2X22.2", "id": 1746}, {"codigo": "1015956NC", "label": "DISCO CORTE 7X3.2X22.2", "id": 1747}, {"codigo": "1015956", "label": "DISCO CORTE 7X3.2X22.2", "id": 527}]' WHERE codigo = '1015956INOXER' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015956NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015956';

UPDATE producto SET medidas = '[{"codigo": "1015957", "label": "DISCO CORTE 9X3.2X22.2", "id": 528}, {"codigo": "1015957NC", "label": "DISCO CORTE 9X3.2X22.2", "id": 1750}, {"codigo": "1015957N", "label": "DISCO CORTE 9X3.2X22.2", "id": 1749}, {"codigo": "1015957INOXER", "label": "DISCO CORTE 9X3.2X22.2", "id": 1748}]' WHERE codigo = '1015957' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015957INOXER';

UPDATE producto SET medidas = '[{"codigo": "1023398", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 664}, {"codigo": "1023398N", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1754}, {"codigo": "1023398NC", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1755}, {"codigo": "1023398INOXER", "label": "DISCO CORTE FINO 41/2X1.0 MM", "id": 1753}]' WHERE codigo = '1023398' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023398INOXER';

UPDATE producto SET medidas = '[{"codigo": "1023399N", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1757}, {"codigo": "1023399NC", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1758}, {"codigo": "1023399", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 665}, {"codigo": "1023399INOXER", "label": "DISCO CORTE FINO 7X1.6 MM", "id": 1756}]' WHERE codigo = '1023399N' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023399INOXER';

UPDATE producto SET medidas = '[{"codigo": "1015826N", "label": "120", "id": 1727}, {"codigo": "1015827", "label": "120", "id": 514}, {"codigo": "1015831N", "label": "240", "id": 1731}, {"codigo": "1015822N", "label": "40", "id": 1720}, {"codigo": "1015822INOXER", "label": "40", "id": 1719}, {"codigo": "1015822NC", "label": "40", "id": 1721}, {"codigo": "1015822", "label": "40", "id": 511}, {"codigo": "1015824N", "label": "60", "id": 1722}, {"codigo": "1015824NC", "label": "60", "id": 1723}, {"codigo": "1015824", "label": "60", "id": 512}, {"codigo": "1015825N", "label": "80", "id": 1725}, {"codigo": "1015825NC", "label": "80", "id": 1726}, {"codigo": "1015825INOXER", "label": "80", "id": 1724}, {"codigo": "1015825", "label": "80", "id": 513}]' WHERE codigo = '1015826N' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015827';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015831N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015822';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015824';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015825';

UPDATE producto SET medidas = '[{"codigo": "1015829INOXER", "label": "40", "id": 1728}, {"codigo": "1015830N", "label": "80", "id": 1730}, {"codigo": "1015830INOXER", "label": "80", "id": 1729}]' WHERE codigo = '1015829INOXER' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015830N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015830INOXER';

UPDATE producto SET medidas = '[{"codigo": "1015949", "label": "DISCO DESBASTE 4 1/2 X6", "id": 521}, {"codigo": "1015949CAR", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1732}, {"codigo": "1015949INOXER", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1733}, {"codigo": "1015949K", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1734}, {"codigo": "1015949N", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1735}, {"codigo": "1015949NC", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1736}, {"codigo": "1015949ROTTLUFF", "label": "DISCO DESBASTE 4 1/2 X6", "id": 1737}]' WHERE codigo = '1015949' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949CAR';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949INOXER';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949K';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949N';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015949ROTTLUFF';

UPDATE producto SET medidas = '[{"codigo": "1015950INOXER", "label": "DISCO DESBASTE 7X6.4X22", "id": 1738}, {"codigo": "1015950", "label": "DISCO DESBASTE 7X6.4X22", "id": 522}, {"codigo": "1015950NC", "label": "DISCO DESBASTE 7X6.4X22", "id": 1740}, {"codigo": "1015950N", "label": "DISCO DESBASTE 7X6.4X22", "id": 1739}]' WHERE codigo = '1015950INOXER' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950NC';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015950N';

UPDATE producto SET medidas = '[{"codigo": "1015951INOXER", "label": "DISCO DESBASTE 9X6.4X22", "id": 1741}, {"codigo": "1015951", "label": "DISCO DESBASTE 9X6.4X22", "id": 523}]' WHERE codigo = '1015951INOXER' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015951';

UPDATE producto SET medidas = '[{"codigo": "1031669", "label": "60", "id": 727}, {"codigo": "1031680", "label": "80", "id": 728}]' WHERE codigo = '1031669' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1031680';

UPDATE producto SET medidas = '[{"codigo": "2000141", "label": "ELECTRODO 110-18M 1/8 (3.2 MM)", "id": 855}, {"codigo": "2000141H", "label": "ELECTRODO 110-18M 1/8 (3.2 MM)", "id": 1798}]' WHERE codigo = '2000141' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000141H';

UPDATE producto SET medidas = '[{"codigo": "2000326H", "label": "ELECTRODO 308-L 1/8 (3.2 MM)", "id": 1811}, {"codigo": "2000326", "label": "ELECTRODO 308-L 1/8 (3.2 MM)", "id": 886}]' WHERE codigo = '2000326H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000326';

UPDATE producto SET medidas = '[{"codigo": "2000325H", "label": "ELECTRODO 308-L 3/32 (2.4 MM)", "id": 1810}, {"codigo": "2000325", "label": "ELECTRODO 308-L 3/32 (2.4 MM)", "id": 885}]' WHERE codigo = '2000325H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000325';

UPDATE producto SET medidas = '[{"codigo": "2000155", "label": "ELECTRODO 309-L 1/8 (3.2 MM)", "id": 858}, {"codigo": "2000155H", "label": "ELECTRODO 309-L 1/8 (3.2 MM)", "id": 1800}]' WHERE codigo = '2000155' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000155H';

UPDATE producto SET medidas = '[{"codigo": "2000154H", "label": "ELECTRODO 309-L 3/32 (2.4 MM)", "id": 1799}, {"codigo": "2000154", "label": "ELECTRODO 309-L 3/32 (2.4 MM)", "id": 857}]' WHERE codigo = '2000154H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000154';

UPDATE producto SET medidas = '[{"codigo": "2000321H", "label": "ELECTRODO 312-16 29-9S 3/32 (2.4 MM)", "id": 1808}, {"codigo": "2000321", "label": "ELECTRODO 312-16 29-9S 3/32 (2.4 MM)", "id": 884}]' WHERE codigo = '2000321H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000321';

UPDATE producto SET medidas = '[{"codigo": "2000331S", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 1814}, {"codigo": "2000331H", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 1813}, {"codigo": "2000331", "label": "ELECTRODO 316-L 1/8 (3.2 MM)", "id": 888}]' WHERE codigo = '2000331S' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000331H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000331';

UPDATE producto SET medidas = '[{"codigo": "2000330H", "label": "ELECTRODO 316-L 3/32 (2.4 MM)", "id": 1812}, {"codigo": "2000330", "label": "ELECTRODO 316-L 3/32 (2.4 MM)", "id": 887}]' WHERE codigo = '2000330H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000330';

UPDATE producto SET medidas = '[{"codigo": "2000051", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 835}, {"codigo": "2000051H", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 1787}, {"codigo": "2000051L", "label": "ELECTRODO 6010 1/8 (3.2 MM)", "id": 1788}]' WHERE codigo = '2000051' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000051H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000051L';

UPDATE producto SET medidas = '[{"codigo": "2000050", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 834}, {"codigo": "2000050H", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 1785}, {"codigo": "2000050L", "label": "ELECTRODO 6010 3/32 (2.4 MM)", "id": 1786}]' WHERE codigo = '2000050' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000050H';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000050L';

UPDATE producto SET medidas = '[{"codigo": "2000052H", "label": "ELECTRODO 6010 5/32 (4.0 MM)", "id": 1789}, {"codigo": "2000052", "label": "ELECTRODO 6010 5/32 (4.0 MM)", "id": 836}]' WHERE codigo = '2000052H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000052';

UPDATE producto SET medidas = '[{"codigo": "2000094H", "label": "ELECTRODO 6011 1/8 (3.2 MM)", "id": 1791}, {"codigo": "2000094", "label": "ELECTRODO 6011 1/8 (3.2 MM)", "id": 843}]' WHERE codigo = '2000094H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000094';

UPDATE producto SET medidas = '[{"codigo": "2000093H", "label": "ELECTRODO 6011 3/32 (2.4 MM)", "id": 1790}, {"codigo": "2000093", "label": "ELECTRODO 6011 3/32 (2.4 MM)", "id": 842}]' WHERE codigo = '2000093H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000093';

UPDATE producto SET medidas = '[{"codigo": "2000122L", "label": "ELECTRODO 7018 1/8 (3.2 MM)", "id": 1795}, {"codigo": "2000122H", "label": "ELECTRODO 7018 1/8 (3.2 MM)", "id": 1794}]' WHERE codigo = '2000122L' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000122H';

UPDATE producto SET medidas = '[{"codigo": "2000121L", "label": "ELECTRODO 7018 3/32 (2.4 MM)", "id": 1793}, {"codigo": "2000121H", "label": "ELECTRODO 7018 3/32 (2.4 MM)", "id": 1792}]' WHERE codigo = '2000121L' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000121H';

UPDATE producto SET medidas = '[{"codigo": "2000134H", "label": "ELECTRODO 8018-C1 1/8 (3.2 MM)", "id": 1797}, {"codigo": "2000134", "label": "ELECTRODO 8018-C1 1/8 (3.2 MM)", "id": 853}]' WHERE codigo = '2000134H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000134';

UPDATE producto SET medidas = '[{"codigo": "2000266H", "label": "ELECTRODO NI-55 1/8 (3.2 MM)", "id": 1807}, {"codigo": "2000266", "label": "ELECTRODO NI-55 1/8 (3.2 MM)", "id": 881}]' WHERE codigo = '2000266H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000266';

UPDATE producto SET medidas = '[{"codigo": "2000265H", "label": "ELECTRODO NI-55 3/32 (2.4 MM)", "id": 1806}, {"codigo": "2000265", "label": "ELECTRODO NI-55 3/32 (2.4 MM)", "id": 880}]' WHERE codigo = '2000265H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000265';

UPDATE producto SET medidas = '[{"codigo": "2000236", "label": "ELECTRODO NI-99 1/8 (3.2 MM)", "id": 871}, {"codigo": "2000236H", "label": "ELECTRODO NI-99 1/8 (3.2 MM)", "id": 1801}]' WHERE codigo = '2000236' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000236H';

UPDATE producto SET medidas = '[{"codigo": "2000237H", "label": "ELECTRODO NI-99 3/32 (2.4 MM)", "id": 1802}, {"codigo": "2000237", "label": "ELECTRODO NI-99 3/32 (2.4 MM)", "id": 872}]' WHERE codigo = '2000237H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000237';

UPDATE producto SET medidas = '[{"codigo": "2000254", "label": "ELECTRODO OVERLAY 60 1/8 (3.2 MM)", "id": 875}, {"codigo": "2000254H", "label": "ELECTRODO OVERLAY 60 1/8 (3.2 MM)", "id": 1803}]' WHERE codigo = '2000254' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000254H';

UPDATE producto SET medidas = '[{"codigo": "2000255", "label": "ELECTRODO OVERLAY 60 5/32 (4.0 MM)", "id": 876}, {"codigo": "2000255H", "label": "ELECTRODO OVERLAY 60 5/32 (4.0 MM)", "id": 1804}]' WHERE codigo = '2000255' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000255H';

UPDATE producto SET medidas = '[{"codigo": "2000261", "label": "ELECTRODO SUPER ALLOY 1/8 (3.2 MM)", "id": 878}, {"codigo": "20002611", "label": "ELECTRODO SUPER ALLOY 1/8 (3.2 MM)", "id": 1269}]' WHERE codigo = '2000261' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20002611';

UPDATE producto SET medidas = '[{"codigo": "2000264", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 879}, {"codigo": "20002641", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 1270}, {"codigo": "2000264H", "label": "ELECTRODO SUPER ALLOY 3/32 (2.4 MM)", "id": 1805}]' WHERE codigo = '2000264' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20002641';
UPDATE producto SET es_variante = TRUE WHERE codigo = '2000264H';

UPDATE producto SET medidas = '[{"codigo": "1035397", "label": "EQUIPO CORTE PLASMA CUT-45", "id": 745}, {"codigo": "100045", "label": "EQUIPO CORTE PLASMA CUT-45", "id": 101}]' WHERE codigo = '1035397' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '100045';

UPDATE producto SET medidas = '[{"codigo": "1007322", "label": "EQUIPO SOLDAR Y CORTAR FLAMEPOWER", "id": 406}, {"codigo": "1009349", "label": "EQUIPO SOLDAR Y CORTAR FLAMEPOWER", "id": 449}]' WHERE codigo = '1007322' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1009349';

UPDATE producto SET medidas = '[{"codigo": "1039276", "label": "818", "id": 764}, {"codigo": "1039277", "label": "992", "id": 765}]' WHERE codigo = '1039276' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1039277';

UPDATE producto SET medidas = '[{"codigo": "67991900", "label": "10 KG", "id": 1480}, {"codigo": "67992100", "label": "2 KG", "id": 1482}, {"codigo": "67992000", "label": "5 KG", "id": 1481}]' WHERE codigo = '67991900' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67992100';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67992000';

UPDATE producto SET medidas = '[{"codigo": "67991700", "label": "1 KG", "id": 1478}, {"codigo": "67991300", "label": "10 KG", "id": 1474}, {"codigo": "67991600", "label": "2 KG", "id": 1477}, {"codigo": "67991500", "label": "4 KG", "id": 1476}, {"codigo": "67991400", "label": "6 KG", "id": 1475}]' WHERE codigo = '67991700' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67991300';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67991600';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67991500';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67991400';

UPDATE producto SET medidas = '[{"codigo": "24010400", "label": "FILTRO 3M 2091 PARTICULAS", "id": 1323}, {"codigo": "1029126", "label": "FILTRO 3M 2091 PARTICULAS", "id": 715}]' WHERE codigo = '24010400' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1029126';

UPDATE producto SET medidas = '[{"codigo": "1018438", "label": "FILTRO 3M 6004 AMONIACO Y METI", "id": 615}, {"codigo": "1029119", "label": "FILTRO 3M 6004 AMONIACO Y METI", "id": 714}]' WHERE codigo = '1018438' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1029119';

UPDATE producto SET medidas = '[{"codigo": "24011202", "label": "FILTRO 3M 60923 MIXTO P100", "id": 1325}, {"codigo": "1018442", "label": "FILTRO 3M 60923 MIXTO P100", "id": 616}]' WHERE codigo = '24011202' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1018442';

UPDATE producto SET medidas = '[{"codigo": "4449110", "label": "FILTRO DE AIRE 200L 3HP", "id": 1064}, {"codigo": "444910", "label": "FILTRO DE AIRE 200L 3HP", "id": 145}]' WHERE codigo = '4449110' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '444910';

UPDATE producto SET medidas = '[{"codigo": "1002119", "label": "FRESA CARBURO TUNGSTENO CONICA", "id": 338}, {"codigo": "110183", "label": "FRESA CARBURO TUNGSTENO CONICA", "id": 114}]' WHERE codigo = '1002119' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '110183';

UPDATE producto SET medidas = '[{"codigo": "110182", "label": "FRESA CARBURO TUNGSTENO RECTA", "id": 113}, {"codigo": "1002118", "label": "FRESA CARBURO TUNGSTENO RECTA", "id": 337}]' WHERE codigo = '110182' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1002118';

UPDATE producto SET medidas = '[{"codigo": "1021175", "label": "GRAMPA TIERRA 500 AMPS", "id": 635}, {"codigo": "10211751", "label": "GRAMPA TIERRA 500 AMPS", "id": 1188}]' WHERE codigo = '1021175' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10211751';

UPDATE producto SET medidas = '[{"codigo": "42085", "label": "35", "id": 71}, {"codigo": "42110", "label": "50", "id": 72}]' WHERE codigo = '42085' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '42110';

UPDATE producto SET medidas = '[{"codigo": "41012", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 65}, {"codigo": "41812", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 69}, {"codigo": "41010", "label": "GRATA COPA ACERO TRENZADO C113-H-50", "id": 64}]' WHERE codigo = '41012' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '41812';
UPDATE producto SET es_variante = TRUE WHERE codigo = '41010';

UPDATE producto SET medidas = '[{"codigo": "12990126", "label": "GUANTE GOMA NATURAL BICOLOR", "id": 1204}, {"codigo": "12990226", "label": "18\"", "id": 1205}]' WHERE codigo = '12990126' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '12990226';

UPDATE producto SET medidas = '[{"codigo": "14990303", "label": "GUANTE NITRILO QUIRURGICO", "id": 1246}, {"codigo": "14990304", "label": "GUANTE NITRILO QUIRURGICO", "id": 1247}, {"codigo": "14991263", "label": "GUANTE NITRILO QUIRURGICO", "id": 1250}]' WHERE codigo = '14990303' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '14990304';
UPDATE producto SET es_variante = TRUE WHERE codigo = '14991263';

UPDATE producto SET medidas = '[{"codigo": "1017751", "label": "10", "id": 587}, {"codigo": "1017750", "label": "9", "id": 586}]' WHERE codigo = '1017751' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1017750';

UPDATE producto SET medidas = '[{"codigo": "1021943", "label": "JUEGO CARBONES ESMERILES", "id": 641}, {"codigo": "1021944", "label": "JUEGO CARBONES ESMERILES", "id": 642}]' WHERE codigo = '1021943' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1021944';

UPDATE producto SET medidas = '[{"codigo": "10415721", "label": "KIT POLICARBONATO PROTECCION", "id": 1196}, {"codigo": "10155951", "label": "KIT POLICARBONATO PROTECCION", "id": 1143}]' WHERE codigo = '10415721' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10155951';

UPDATE producto SET medidas = '[{"codigo": "2961733", "label": "19 MM", "id": 955}, {"codigo": "3697223", "label": "24 MM", "id": 1042}]' WHERE codigo = '2961733' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '3697223';

UPDATE producto SET medidas = '[{"codigo": "10238051", "label": "MANGUERA PVC", "id": 1190}, {"codigo": "1023805", "label": "MANGUERA PVC", "id": 697}]' WHERE codigo = '10238051' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1023805';

UPDATE producto SET medidas = '[{"codigo": "67995800", "label": "10 LT", "id": 1515}, {"codigo": "67996000", "label": "6 LT", "id": 1517}]' WHERE codigo = '67995800' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67996000';

UPDATE producto SET medidas = '[{"codigo": "67993300", "label": "2 KG", "id": 1494}, {"codigo": "67993400", "label": "5 KG", "id": 1495}]' WHERE codigo = '67993300' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993400';

UPDATE producto SET medidas = '[{"codigo": "67995500", "label": "50 KG", "id": 1512}, {"codigo": "67994800", "label": "75 KG", "id": 1509}]' WHERE codigo = '67995500' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67994800';

UPDATE producto SET medidas = '[{"codigo": "67992800", "label": "1 KG", "id": 1489}, {"codigo": "67993200", "label": "10 KG", "id": 1493}, {"codigo": "67992900", "label": "2 KG", "id": 1490}, {"codigo": "67993000", "label": "4 KG", "id": 1491}, {"codigo": "67993100", "label": "6 KG", "id": 1492}]' WHERE codigo = '67992800' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993200';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67992900';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993000';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993100';

UPDATE producto SET medidas = '[{"codigo": "278-H", "label": "MEZCLA AR/CO2 10 M3 (CL. 2.2 NU 1956)", "id": 1824}, {"codigo": "P278-H", "label": "MEZCLA AR/CO2 10 M3 (CL. 2.2 NU 1956)", "id": 1886}]' WHERE codigo = '278-H' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P278-H';

UPDATE producto SET medidas = '[{"codigo": "PC278-N", "label": "MEZCLA AR/CO2 7 M3 (CL. 2.2 NU 1956)", "id": 1909}, {"codigo": "P278-N", "label": "MEZCLA AR/CO2 7 M3 (CL. 2.2 NU 1956)", "id": 1888}]' WHERE codigo = 'PC278-N' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P278-N';

UPDATE producto SET medidas = '[{"codigo": "20810009", "label": "1/2\"", "id": 1289}, {"codigo": "20810010", "label": "2\"", "id": 1290}]' WHERE codigo = '20810009' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '20810010';

UPDATE producto SET medidas = '[{"codigo": "P44-K", "label": "NITROGENO 6 M3 PART (CL. 2.2 NU 1066)", "id": 1903}, {"codigo": "PC44-K", "label": "NITROGENO 6 M3 PART (CL. 2.2 NU 1066)", "id": 1911}]' WHERE codigo = 'P44-K' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = 'PC44-K';

UPDATE producto SET medidas = '[{"codigo": "3046508", "label": "O''RING AS NBR 2-214 M30", "id": 1014}, {"codigo": "3046507", "label": "O''RING AS NBR 2-214 M30", "id": 1013}]' WHERE codigo = '3046508' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '3046507';

UPDATE producto SET medidas = '[{"codigo": "PC1-K", "label": "OXIGENO 6 M3 TIPO K PART (CL. 2.2 NU 1072)", "id": 1907}, {"codigo": "P1-K", "label": "OXIGENO 6 M3 TIPO K PART (CL. 2.2 NU 1072)", "id": 1870}]' WHERE codigo = 'PC1-K' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = 'P1-K';

UPDATE producto SET medidas = '[{"codigo": "1-K", "label": "OXIGENO INDUSTRIAL 6 M3 (CL. 2.2 NU 1072)", "id": 1782}, {"codigo": "1-N", "label": "OXIGENO INDUSTRIAL 6 M3 (CL. 2.2 NU 1072)", "id": 1783}]' WHERE codigo = '1-K' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1-N';

UPDATE producto SET medidas = '[{"codigo": "2014011300", "label": "PACK VISORES MASCARA DE SOLDAR OPTECH", "id": 1695}, {"codigo": "1014011300", "label": "PACK VISORES MASCARA DE SOLDAR OPTECH", "id": 1602}]' WHERE codigo = '2014011300' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1014011300';

UPDATE producto SET medidas = '[{"codigo": "48000858", "label": "PANTALON FRONTIER GREY/BLACK", "id": 1460}, {"codigo": "48000860", "label": "PANTALON FRONTIER GREY/BLACK", "id": 1462}, {"codigo": "48000859", "label": "PANTALON FRONTIER GREY/BLACK", "id": 1461}, {"codigo": "48000861", "label": "PANTALON FRONTIER GREY/BLACK", "id": 1463}]' WHERE codigo = '48000858' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '48000860';
UPDATE producto SET es_variante = TRUE WHERE codigo = '48000859';
UPDATE producto SET es_variante = TRUE WHERE codigo = '48000861';

UPDATE producto SET medidas = '[{"codigo": "1000194", "label": "PISTOLA TIG 125 AMP.WP-9V-12-R(12 LARGO)", "id": 192}, {"codigo": "1014709", "label": "PISTOLA TIG 125 AMP.WP-9V-12-R(12 LARGO)", "id": 485}]' WHERE codigo = '1000194' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1014709';

UPDATE producto SET medidas = '[{"codigo": "1014711", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 486}, {"codigo": "10408432", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 1195}, {"codigo": "1040843", "label": "PISTOLA TIG 150A WP-17V-12-R", "id": 770}]' WHERE codigo = '1014711' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10408432';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1040843';

UPDATE producto SET medidas = '[{"codigo": "1053209", "label": "4M", "id": 820}, {"codigo": "1053174", "label": "8M", "id": 814}]' WHERE codigo = '1053209' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1053174';

UPDATE producto SET medidas = '[{"codigo": "10211721", "label": "PORTAELECTRODO 500 AMPS", "id": 1187}, {"codigo": "1021172", "label": "PORTAELECTRODO 500 AMPS", "id": 633}]' WHERE codigo = '10211721' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1021172';

UPDATE producto SET medidas = '[{"codigo": "67994600", "label": "2 KG", "id": 1507}, {"codigo": "67994500", "label": "5 KG", "id": 1506}]' WHERE codigo = '67994600' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67994500';

UPDATE producto SET medidas = '[{"codigo": "67993500", "label": "1 KG", "id": 1496}, {"codigo": "67993900", "label": "10 KG", "id": 1500}, {"codigo": "67993600", "label": "2 KG", "id": 1497}, {"codigo": "67993700", "label": "4 KG", "id": 1498}, {"codigo": "67993800", "label": "6 KG", "id": 1499}]' WHERE codigo = '67993500' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993900';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993600';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993700';
UPDATE producto SET es_variante = TRUE WHERE codigo = '67993800';

UPDATE producto SET medidas = '[{"codigo": "10083024", "label": "REGULADOR ARGON C/FLUJOMETRO 601D 30 FAR", "id": 1133}, {"codigo": "1008302", "label": "REGULADOR ARGON C/FLUJOMETRO 601D 30 FAR", "id": 428}]' WHERE codigo = '10083024' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1008302';

UPDATE producto SET medidas = '[{"codigo": "10083022", "label": "REGULADOR CO2 C/FLUJOMETRO 601D 30 FAR", "id": 1131}, {"codigo": "100267", "label": "REGULADOR CO2 C/FLUJOMETRO 601D 30 FAR", "id": 108}]' WHERE codigo = '10083022' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '100267';

UPDATE producto SET medidas = '[{"codigo": "1013045", "label": "REGULADOR FLUJOMETRO DE ARGON", "id": 479}, {"codigo": "1015724", "label": "REGULADOR FLUJOMETRO DE ARGON", "id": 509}]' WHERE codigo = '1013045' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015724';

UPDATE producto SET medidas = '[{"codigo": "1016477", "label": "REGULADOR FLUJOMETRO DUAL ARGON (CAJA)", "id": 551}, {"codigo": "1053469", "label": "REGULADOR FLUJOMETRO DUAL ARGON (CAJA)", "id": 824}]' WHERE codigo = '1016477' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1053469';

UPDATE producto SET medidas = '[{"codigo": "1015201", "label": "REGULADOR Y FLUJOMETRO 0-15 LPM GCE", "id": 498}, {"codigo": "1015200", "label": "REGULADOR Y FLUJOMETRO 0-15 LPM GCE", "id": 497}]' WHERE codigo = '1015201' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1015200';

UPDATE producto SET medidas = '[{"codigo": "10164902", "label": "SET MANGUERA SIMPLE 1/4 25 MT", "id": 1168}, {"codigo": "10164905", "label": "SET MANGUERA SIMPLE 1/4 25 MT", "id": 1171}]' WHERE codigo = '10164902' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '10164905';

UPDATE producto SET medidas = '[{"codigo": "1001504", "label": "48", "id": 290}, {"codigo": "1001505", "label": "50", "id": 291}, {"codigo": "1001506", "label": "52", "id": 292}, {"codigo": "1001507", "label": "54", "id": 293}, {"codigo": "1001508", "label": "56", "id": 294}]' WHERE codigo = '1001504' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001505';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001506';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001507';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1001508';

UPDATE producto SET medidas = '[{"codigo": "67996500", "label": "10 KG", "id": 1523}, {"codigo": "67996400", "label": "6 KG", "id": 1522}]' WHERE codigo = '67996500' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '67996400';

UPDATE producto SET medidas = '[{"codigo": "1023665", "label": "TAPA MEDIANA 300M", "id": 670}, {"codigo": "3042901", "label": "TAPA MEDIANA 300M", "id": 1006}]' WHERE codigo = '1023665' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '3042901';

UPDATE producto SET medidas = '[{"codigo": "1008134", "label": "00", "id": 422}, {"codigo": "1008135", "label": "10", "id": 423}]' WHERE codigo = '1008134' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1008135';

UPDATE producto SET medidas = '[{"codigo": "3046511", "label": "80", "id": 1017}, {"codigo": "3006814", "label": "90", "id": 977}]' WHERE codigo = '3046511' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '3006814';

UPDATE producto SET medidas = '[{"codigo": "1020119041", "label": "1", "id": 1670}, {"codigo": "1020119042", "label": "2", "id": 1671}]' WHERE codigo = '1020119041' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020119042';

UPDATE producto SET medidas = '[{"codigo": "1020118540", "label": "0", "id": 1643}, {"codigo": "1020118541", "label": "1", "id": 1644}, {"codigo": "1020118542", "label": "2", "id": 1645}, {"codigo": "1020118543", "label": "3", "id": 1646}, {"codigo": "1020118544", "label": "4", "id": 1647}]' WHERE codigo = '1020118540' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118541';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118542';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118543';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118544';

UPDATE producto SET medidas = '[{"codigo": "1020117839", "label": "39", "id": 1612}, {"codigo": "1020117840", "label": "40", "id": 1613}, {"codigo": "1020117841", "label": "41", "id": 1614}, {"codigo": "1020117842", "label": "42", "id": 1615}, {"codigo": "1020117843", "label": "43", "id": 1616}]' WHERE codigo = '1020117839' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117840';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117841';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117842';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020117843';

UPDATE producto SET medidas = '[{"codigo": "1020118739", "label": "39", "id": 1653}, {"codigo": "1020118740", "label": "40", "id": 1654}, {"codigo": "1020118741", "label": "41", "id": 1655}, {"codigo": "1020118742", "label": "42", "id": 1656}, {"codigo": "1020118743", "label": "43", "id": 1657}]' WHERE codigo = '1020118739' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118740';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118741';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118742';
UPDATE producto SET es_variante = TRUE WHERE codigo = '1020118743';

UPDATE producto SET medidas = '[{"codigo": "102011739", "label": "39", "id": 1551}, {"codigo": "102011740", "label": "40", "id": 1552}, {"codigo": "102011741", "label": "41", "id": 1553}, {"codigo": "102011742", "label": "42", "id": 1554}, {"codigo": "102011743", "label": "43", "id": 1555}, {"codigo": "102011744", "label": "44", "id": 1556}]' WHERE codigo = '102011739' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011740';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011741';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011742';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011743';
UPDATE producto SET es_variante = TRUE WHERE codigo = '102011744';

UPDATE producto SET medidas = '[{"codigo": "35133143", "label": "ZAPATO NAZCA ELEGANCE NT 995 Nº41", "id": 1370}, {"codigo": "31131641", "label": "ZAPATO NAZCA ELEGANCE NT 995 Nº41", "id": 1361}]' WHERE codigo = '35133143' AND (medidas IS NULL);
UPDATE producto SET es_variante = TRUE WHERE codigo = '31131641';
