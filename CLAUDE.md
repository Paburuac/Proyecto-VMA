# CLAUDE.md — VMA Industrial

Plataforma digital para VMA Industrial, agente autorizado Indura. Tres componentes en un monorepo, cada uno en su propia rama.

## Estructura del repositorio

```
proyectovma/
├── Producto/
│   ├── AppWeb/
│   │   └── vma-vite/        ← SPA principal (rama main / Pablo)
│   └── AppMovil/            ← App Android (rama Diego)
├── Documentacion/           ← Diagramas, esquema BD, scripts SQL
└── Gestion/                 ← Documentos de gestión del proyecto
```

## Componente principal: sitio web (`vma-vite/`)

### Comandos de uso frecuente

```bash
cd Producto/AppWeb/vma-vite

npm install          # instalar dependencias
npm run dev          # servidor de desarrollo → http://localhost:5173
npm run build        # build de producción
npm run preview      # previsualizar build localmente
npm run test         # ejecutar tests (Vitest, una sola pasada)
npm run test:watch   # tests en modo watch
npm run test:coverage  # cobertura de código
```

### Variables de entorno

Crear `Producto/AppWeb/vma-vite/.env` basándose en `.env.txt`:

```env
VITE_SUPABASE_URL=https://<proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Las credenciales están en **Supabase Dashboard → Project Settings → API**.

### Arquitectura del código

```
src/
├── app.js                  ← punto de entrada, inicializa auth y catálogo
├── js/                     ← módulos de UI (vistas y lógica de pantalla)
│   ├── auth.js             ← flujo login/logout/registro
│   ├── productos.js        ← catálogo público
│   ├── carrito.js          ← carrito de cotización
│   ├── misCotizaciones.js  ← historial del cliente
│   ├── admin.js            ← panel administrador
│   ├── panelTrabajador.js  ← panel trabajador
│   ├── router.js           ← SPA routing (hash-based)
│   └── validaciones.js     ← validaciones de formularios
└── services/               ← capa de acceso a Supabase (sin lógica de UI)
    ├── supabase.js         ← cliente Supabase
    ├── authService.js      ← auth + carga de perfil
    ├── productoService.js  ← catálogo de productos
    ├── cotizacionService.js← cotizaciones
    ├── carritoService.js   ← carrito
    ├── categoriaService.js ← categorías
    └── adminService.js     ← operaciones admin (CRUD + reportes + storage)
```

**Patrón:** los módulos en `js/` leen `window.authState` (seteado por `auth.js` al cargar) para saber el rol del usuario y mostrar la vista correspondiente.

### Estado de autenticación global

```js
window.authState = {
  loggedIn: boolean,
  perfil: { id, nombre, email, telefono, activo, rol_id, roles: { nombre } },
  rol: 'admin' | 'trabajador' | 'cliente' | null
}
```

### Deploy

- **Producción:** [proyectovma.vercel.app](https://proyectovma.vercel.app)
- Deploy automático en cada push a `main`
- Root directory en Vercel: `Producto/AppWeb/vma-vite`
- Variables de entorno deben estar configuradas en Vercel Settings

### Base de datos

Ver [`Documentacion/ESQUEMA_BD.md`](Documentacion/ESQUEMA_BD.md) para el esquema completo.  
Script de inicialización: [`Documentacion/Script VMA.txt`](Documentacion/Script%20VMA.txt) (ejecutar en Supabase SQL Editor).

Las tablas `usuarios` y `roles` se crean **manualmente en Supabase** (no están en el script). Ver esquema para la estructura exacta.

## Ramas del repositorio

| Rama | Responsable | Contenido |
|------|-------------|-----------|
| `main` | Pablo Astudillo | Sitio web — producción |
| `Pablo` | Pablo Astudillo | Desarrollo web (feature branch) |
| `Felipe` | Felipe Rivera | Módulo Python de análisis |
| `Diego` | Diego Aros | App Android (Kotlin + Jetpack Compose) |

## Módulo Python (rama `Felipe`)

```bash
git checkout Felipe
cd "Sistema (prototipo)"
python main.py   # solicita tipo: RESUMEN | REPORTE | ESTADISTICA
```

Requisitos: Python 3.11+, sin dependencias externas.

## App Android (rama `Diego`)

Abrir carpeta raíz en Android Studio, sincronizar Gradle, ejecutar en emulador o dispositivo.  
Se conecta al mismo proyecto Supabase que el sitio web.
