"""
scripts/agrupar_variantes.py
─────────────────────────────────────────────
Detecta grupos de productos con el mismo nombre base
pero diferentes medidas/variantes, y genera:

  1. migration.sql  → columnas + datos en Supabase
  2. grupos.json    → revisión humana antes de ejecutar

Uso:
  pip install supabase python-dotenv
  Crear .env con SUPABASE_URL y SUPABASE_ANON_KEY
  python agrupar_variantes.py

Salida:
  scripts/output/migration.sql
  scripts/output/grupos.json
─────────────────────────────────────────────
"""

import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

# ── Cargar .env ──────────────────────────────────────────────────
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent / "vma-vite" / ".env.txt")
    load_dotenv(Path(__file__).parent.parent / "vma-vite" / ".env")
except ImportError:
    pass

# ── Intentar conectar a Supabase; si falla usar productos.json ───
def cargar_productos():
    url = os.environ.get("VITE_SUPABASE_URL") or os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_ANON_KEY", "")

    if url and key and "xxxxx" not in url and "tu-proyecto" not in url:
        try:
            from supabase import create_client
            sb = create_client(url, key)
            data = sb.table("producto").select(
                "id_producto, codigo, descripcion, id_categoria"
            ).order("descripcion").execute().data or []
            print(f"[OK] Cargados {len(data)} productos desde Supabase")
            return data, "supabase"
        except Exception as e:
            print(f"[WARN] Supabase no disponible ({e}), usando productos.json")

    # Fallback: productos.json
    json_path = Path(__file__).parent.parent / "productos.json"
    if not json_path.exists():
        sys.exit("[ERROR] No se encontró productos.json ni conexión Supabase")

    with open(json_path, encoding="utf-8") as f:
        raw = json.load(f)

    productos = []
    pid = 1
    for cat, subcats in raw.items():
        for subcat, prods in subcats.items():
            for p in prods:
                productos.append({
                    "id_producto": pid,
                    "codigo": p.get("codigo", ""),
                    "descripcion": p.get("nombre", ""),
                    "id_categoria": None,
                })
                pid += 1
    print(f"[OK] Cargados {len(productos)} productos desde productos.json")
    return productos, "json"


# ═══════════════════════════════════════════════
#  ALGORITMO DE AGRUPAMIENTO
# ═══════════════════════════════════════════════

# Patrón de medida al FINAL del nombre
MEDIDA_SUFIJO = re.compile(
    r"[\s\-]+("
    r"\d+[\.,]?\d*\s*(?:MM|CM|M3|LT?|KG|GR?|PULG|\"|\047)"  # con unidad
    r"|X\s*\d+[\.,]?\d*"                                         # x15, x 15
    r"|\d+[\.,]?\d*\s*X\s*\d+[\.,]?\d*"                         # 0.8x15
    r"|\d+[\.,]?\d*\s*(?:KG|MM|CM)$"                            # 5KG, 1.2MM al final
    r"|\d+/\d+\""                                                # 1/4", 3/8"
    r"|\d+\s*(?:\"|\')"                                          # 3", 2'
    r"|(?:N°|NRO\.?|N)\s*\d+"                                    # N°10, NRO 5
    r"|\d+(?:\.\d+)?"                                            # número solo al final
    r")\s*$",
    re.IGNORECASE,
)

def nombre_base(nombre: str) -> str:
    """Extrae el nombre base eliminando el sufijo de medida."""
    n = nombre.strip().upper()
    m = MEDIDA_SUFIJO.search(n)
    if m:
        base = n[: m.start()].strip()
        # Solo aceptar si la base tiene al menos 3 palabras o 10 chars
        if len(base) >= 10 and len(base.split()) >= 2:
            return base
    return n

def prefijo_comun(nombres: list[str]) -> str:
    """Longest common prefix entre varios strings."""
    if not nombres:
        return ""
    ref = nombres[0]
    largo = len(ref)
    for n in nombres[1:]:
        largo = min(largo, len(n))
        while largo > 0 and ref[:largo] != n[:largo]:
            largo -= 1
    # Recortar al último espacio para no cortar palabras
    prefijo = ref[:largo].rstrip()
    return prefijo

def extraer_medida(nombre: str, base: str) -> str:
    """Extrae la parte variante del nombre quitando el prefijo base."""
    n = nombre.strip().upper()
    b = base.strip().upper()
    if n.startswith(b):
        return n[len(b):].strip(" -–")
    return n

def agrupar(productos: list[dict]) -> dict:
    """
    Retorna dict:
      grupo_key → {
        "padre": producto_dict,
        "variantes": [producto_dict, ...],
        "base": str,
      }
    Solo grupos con 2+ productos.
    """
    por_base = defaultdict(list)
    for p in productos:
        desc = (p.get("descripcion") or "").strip()
        if not desc:
            continue
        base = nombre_base(desc)
        por_base[base].append(p)

    grupos = {}
    for base, prods in por_base.items():
        if len(prods) < 2:
            continue

        # Calcular prefijo común real entre todos los nombres del grupo
        nombres = [p["descripcion"].strip().upper() for p in prods]
        prefijo = prefijo_comun(nombres).strip()
        if not prefijo or len(prefijo) < 8:
            prefijo = base

        # Padre = el primero en orden alfabético
        prods_sorted = sorted(prods, key=lambda x: x["descripcion"])
        padre = prods_sorted[0]
        variantes = prods_sorted[1:]

        # Calcular etiqueta de medida para cada variante (y el padre)
        def medida_label(p):
            sufijo = extraer_medida(p["descripcion"], prefijo)
            return sufijo if sufijo else p["descripcion"].strip().upper()

        grupos[base] = {
            "base": prefijo,
            "padre": padre,
            "variantes": variantes,
            "medidas": [
                {"codigo": str(p["codigo"]), "label": medida_label(p), "id": p["id_producto"]}
                for p in prods_sorted
            ],
        }

    return grupos


# ═══════════════════════════════════════════════
#  GENERAR SQL
# ═══════════════════════════════════════════════

def generar_sql(grupos: dict, fuente: str) -> str:
    lines = [
        "-- ═══════════════════════════════════════════════════════════",
        "-- VMA Industrial — Migración: variantes de producto",
        "-- Generado automáticamente por agrupar_variantes.py",
        "-- REVISAR grupos.json antes de ejecutar.",
        "-- ═══════════════════════════════════════════════════════════",
        "",
        "-- PASO 1: Agregar columnas (ejecutar solo una vez)",
        "ALTER TABLE producto",
        "  ADD COLUMN IF NOT EXISTS medidas     JSONB    DEFAULT NULL,",
        "  ADD COLUMN IF NOT EXISTS es_variante BOOLEAN  DEFAULT FALSE;",
        "",
        "-- PASO 2: Marcar variantes y guardar medidas en el padre",
        "",
    ]

    ids_variantes = []
    for base, g in grupos.items():
        padre = g["padre"]
        variantes = g["variantes"]
        medidas_json = json.dumps(g["medidas"], ensure_ascii=False)

        lines.append(f"-- Grupo: {base[:70]}")
        lines.append(f"-- Padre: #{padre['id_producto']} — {padre['descripcion']}")
        lines.append(f"-- Variantes: {len(variantes)} producto(s)")

        if fuente == "supabase":
            # UPDATE real sobre Supabase usando id_producto
            lines.append(
                f"UPDATE producto SET medidas = '{medidas_json}' "
                f"WHERE id_producto = {padre['id_producto']};"
            )
            if variantes:
                ids_var = ", ".join(str(v["id_producto"]) for v in variantes)
                lines.append(
                    f"UPDATE producto SET es_variante = TRUE "
                    f"WHERE id_producto IN ({ids_var});"
                )
                ids_variantes.extend(v["id_producto"] for v in variantes)
        else:
            # Para JSON: mostrar los códigos (no hay IDs reales de Supabase)
            lines.append(f"-- PADRE código: {padre['codigo']}")
            lines.append(f"-- UPDATE producto SET medidas = '{medidas_json}' WHERE codigo = '{padre['codigo']}';")
            for v in variantes:
                lines.append(f"-- UPDATE producto SET es_variante = TRUE WHERE codigo = '{v['codigo']}';")

        lines.append("")

    lines += [
        "-- ═══════════════════════════════════════════════════════════",
        f"-- RESUMEN: {len(grupos)} grupos detectados",
        f"-- Productos que se ocultarán del catálogo (es_variante=TRUE): {len(ids_variantes)}",
        "-- ═══════════════════════════════════════════════════════════",
    ]

    return "\n".join(lines)


# ═══════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════

def main():
    out_dir = Path(__file__).parent / "output"
    out_dir.mkdir(exist_ok=True)

    productos, fuente = cargar_productos()
    grupos = agrupar(productos)

    print(f"\n[RESULTADO] {len(grupos)} grupos de variantes detectados")
    total_variantes = sum(len(g["variantes"]) for g in grupos.values())
    print(f"[RESULTADO] {total_variantes} productos se marcarán como variantes (ocultos del catálogo)")
    print(f"[RESULTADO] El catalogo pasara de {len(productos)} a {len(productos) - total_variantes} productos visibles")

    # Guardar grupos.json para revisión
    grupos_exportar = {}
    for base, g in grupos.items():
        grupos_exportar[base] = {
            "base_nombre": g["base"],
            "padre": {"id": g["padre"]["id_producto"], "codigo": g["padre"]["codigo"], "nombre": g["padre"]["descripcion"]},
            "medidas": g["medidas"],
        }

    grupos_path = out_dir / "grupos.json"
    with open(grupos_path, "w", encoding="utf-8") as f:
        json.dump(grupos_exportar, f, ensure_ascii=False, indent=2)
    print(f"\n[ARCHIVO] {grupos_path}")

    # Guardar migration.sql
    sql = generar_sql(grupos, fuente)
    sql_path = out_dir / "migration.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write(sql)
    print(f"[ARCHIVO] {sql_path}")

    print("\n[SIGUIENTE PASO]")
    print("  1. Revisa scripts/output/grupos.json para verificar los grupos")
    print("  2. Ejecuta scripts/output/migration.sql en el SQL Editor de Supabase")
    print("  3. El frontend ya está actualizado para leer las medidas")


if __name__ == "__main__":
    main()
