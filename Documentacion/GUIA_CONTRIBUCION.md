# Guía de Contribución — VMA Industrial

El repositorio es un monorepo con tres componentes independientes, cada uno en su propia rama principal.

---

## Ramas

| Rama | Responsable | Contenido | Deploy |
|------|-------------|-----------|--------|
| `main` | Pablo Astudillo | Sitio web — **producción** | Vercel automático |
| `Pablo` | Pablo Astudillo | Desarrollo web | — |
| `Felipe` | Felipe Rivera | Módulo Python | — |
| `Diego` | Diego Aros | App Android (Kotlin) | — |

**Regla general:** `main` solo recibe merges desde `Pablo` cuando el feature está listo y probado. Vercel despliega automáticamente en cada push a `main`.

---

## Workflow del sitio web (Pablo)

```
main (producción)
  └── Pablo (desarrollo)
        └── feature/nombre-feature  ← rama de trabajo
```

1. Crear rama desde `Pablo`:
   ```bash
   git checkout Pablo
   git pull
   git checkout -b feature/descripcion-corta
   ```

2. Desarrollar y hacer commits frecuentes con mensajes descriptivos (ver convención abajo).

3. Cuando el feature está listo, hacer merge a `Pablo`:
   ```bash
   git checkout Pablo
   git merge feature/descripcion-corta
   ```

4. Para subir a producción, hacer merge de `Pablo` a `main`:
   ```bash
   git checkout main
   git merge Pablo
   git push
   ```
   Esto activa el deploy automático en Vercel.

---

## Workflow del módulo Python (Felipe)

Trabaja directamente en la rama `Felipe`. No interactúa con `main`.

```bash
git checkout Felipe
# trabajar, commitear
git push origin Felipe
```

---

## Workflow de la app Android (Diego)

Trabaja directamente en la rama `Diego`. No interactúa con `main`.

```bash
git checkout Diego
# trabajar, commitear
git push origin Diego
```

---

## Convención de commits

Usar prefijos descriptivos en minúsculas:

| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de CSS/UI sin lógica |
| `refactor:` | Reestructura de código sin cambiar comportamiento |
| `test:` | Agregar o modificar tests |
| `docs:` | Documentación |
| `chore:` | Configuración, dependencias, etc. |

Ejemplos:
```
feat: agregar filtro por categoría en el catálogo
fix: corregir pérdida de foco en búsqueda de productos del admin
style: ajustar espaciado del panel de trabajador en móvil
docs: agregar esquema de base de datos
```

---

## Cómo no pisar el trabajo del otro

- Las tres ramas (`Pablo`, `Felipe`, `Diego`) son completamente independientes — cada una tiene su propio directorio de código y **no se mergean entre sí**.
- El único punto de contacto es **Supabase**: los tres componentes se conectan al mismo proyecto. Si alguien modifica tablas o políticas RLS, debe avisar a los demás.
- Cambios en el esquema de BD → actualizar [`ESQUEMA_BD.md`](ESQUEMA_BD.md) y avisar por el canal del equipo.

---

## Antes de hacer merge a `main`

- [ ] `npm run test` pasa sin errores
- [ ] `npm run build` compila sin errores
- [ ] La funcionalidad fue probada manualmente en `localhost:5173`
- [ ] No quedan `console.log` de debug
- [ ] Las variables de entorno nuevas (si las hay) están documentadas en `.env.example`

---

## Entorno local

Ver instrucciones completas en [`README.md`](../AppWeb/README.md) o en [`CLAUDE.md`](../../CLAUDE.md).

Resumen rápido:
```bash
cd Producto/AppWeb/vma-vite
cp .env.example .env   # completar con credenciales de Supabase
npm install
npm run dev            # http://localhost:5173
```
