# VMA Industrial – Frontend

Sitio web corporativo de **VMA Industrial**, agente autorizado Indura.  
Frontend SPA (Single Page Application) construido en HTML, CSS y JavaScript puros — sin frameworks.

---

## Estructura de carpetas

```
vma-frontend/
│
├── index.html                  ← Punto de entrada único de la app SPA
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Variables CSS (colores, tipografía, spacing)
│   │   ├── header.css          ← Header sticky y navegación
│   │   ├── main.css            ← Layout SPA, hero, nosotros, toast, responsive
│   │   ├── productos.css       ← Catálogo, sidebar, cards, modal, carrito
│   │   ├── formularios.css     ← Formularios: contacto, registro, login
│   │   └── footer.css          ← Footer
│   │
│   ├── js/
│   │   ├── catalogo.js         ← Datos del catálogo (1.445 productos, variable global)
│   │   ├── router.js           ← Navegación SPA (showPage) + hamburger móvil
│   │   ├── productos.js        ← Renderizado catálogo, filtros, búsqueda, modal
│   │   ├── carrito.js          ← Carrito de compras y drawer lateral
│   │   ├── validaciones.js     ← Validación de formularios + utilidades (escHtml, showToast)
│   │   └── main.js             ← Entry point: inicializa grid de categorías home
│   │
│   ├── img/                    ← Imágenes de interfaz (iconos UI, banners genéricos)
│   │   └── placeholder.jpg
│   ├── icons/                  ← Íconos SVG o de interfaz
│   └── fonts/                  ← Fuentes locales (si se descargan de Google Fonts)
│
├── pages/                      ← Secciones HTML extraídas (referencia / futura migración)
│   ├── home.html               ← Sección inicio
│   ├── quienes-somos.html      ← Sección quiénes somos
│   ├── productos.html          ← Sección catálogo de productos
│   ├── contacto.html           ← Sección contacto / cotización
│   ├── registro.html           ← Sección registro de usuario
│   └── login.html              ← Sección inicio de sesión
│
├── components/                 ← Fragmentos HTML reutilizables (referencia)
│   ├── header.html             ← Header corporativo
│   ├── footer.html             ← Footer
│   ├── carrito-drawer.html     ← Panel lateral del carrito
│   ├── producto-modal.html     ← Modal de detalle de producto
│   └── producto-card.html      ← Plantilla de tarjeta de producto
│
├── data/
│   └── productos.json          ← Catálogo en JSON (preparado para API REST futura)
│
├── media/
│   ├── logo/                   ← Logo VMA Industrial (PNG, SVG)
│   ├── banners/                ← Imágenes de banners y hero
│   ├── categorias/             ← Imágenes representativas por categoría
│   └── productos/
│       ├── accesorios/         ← Fotos de accesorios
│       ├── soldaduras/         ← Fotos de soldaduras
│       ├── gases/              ← Fotos de gases
│       ├── herramientas/       ← Fotos de herramientas
│       └── otros/              ← Resto de categorías
│
├── .gitignore
└── README_FRONTEND.md          ← Este archivo
```

---

## Paleta corporativa

| Color | Uso | Hex |
|-------|-----|-----|
| Verde Pantone 376 C | Botones, acentos, detalles | `#84BD00` |
| Azul Pantone 302 C | Textos sobre verde, headers | `#003B5C` |
| Blanco | Fondo general | `#FFFFFF` |

Fuente principal: `"Tw Cen MT", Arial, sans-serif` (estilo itálico).

---

## Cómo ejecutar el proyecto localmente

### Opción A – Live Server (recomendado)
1. Abrir la carpeta `vma-frontend/` en VS Code.
2. Instalar la extensión **Live Server** (ritwickdey.LiveServer).
3. Click derecho sobre `index.html` → **Open with Live Server**.
4. El sitio abre en `http://127.0.0.1:5500`.

### Opción B – Python HTTP Server
```bash
cd vma-frontend
python3 -m http.server 8000
# Abrir http://localhost:8000
```

### Opción C – npx serve
```bash
cd vma-frontend
npx serve .
```

> **Importante:** No abrir `index.html` directamente con `file://` si el navegador bloquea la carga de módulos JS por CORS. Siempre usar un servidor local.

---

## Orden de carga de scripts (obligatorio)

Los scripts deben cargarse en este orden en `index.html`:

```html
<script src="assets/js/catalogo.js"></script>    <!-- 1. Datos (variable global `catalogo`) -->
<script src="assets/js/router.js"></script>       <!-- 2. Navegación SPA -->
<script src="assets/js/productos.js"></script>    <!-- 3. Catálogo y modal -->
<script src="assets/js/carrito.js"></script>      <!-- 4. Carrito -->
<script src="assets/js/validaciones.js"></script> <!-- 5. Formularios y utilidades -->
<script src="assets/js/main.js"></script>         <!-- 6. Inicialización (último) -->
```

---

## Dónde agregar productos

### Fuente actual: `assets/js/catalogo.js`
El catálogo está declarado como una constante JavaScript:
```js
const catalogo = {
  "Categoría": {
    "Subcategoría": [
      {
        codigo: "12345",
        nombre: "Nombre del producto",
        distribuidor: "",
        stock: "",
        descripcion: "Descripción del producto.",
        precio: "Consultar",
        imagen: "media/productos/categoria/placeholder.jpg"
      }
    ]
  }
};
```
Para agregar un producto manualmente, buscar la categoría y subcategoría correspondiente y añadir un objeto al array.

### Fuente alternativa: `data/productos.json`
Mismo catálogo en formato JSON estándar, listo para ser consumido por una API REST futura. No está conectado al frontend todavía — ver sección **Conexión a API**.

---

## Dónde colocar imágenes

```
media/productos/{categoria}/nombre-producto.jpg
```

Ejemplos:
```
media/productos/gases/acetileno-10kg.jpg
media/productos/soldaduras/maquina-mig-250.jpg
media/productos/herramientas/esmeril-angular-115mm.jpg
```

Después de colocar la imagen, actualizar el campo `imagen` (en `catalogo.js`) o `imagen_url` / `ruta_imagen` (en `productos.json`) del producto correspondiente.

**Tamaño recomendado:** 800×600 px, formato JPG o WebP, máximo 200 KB por imagen.

---

## Arquitectura futura (fullstack)

El proyecto está preparado para crecer hacia una arquitectura separada:

```
proyecto/
├── frontend/          ← Este repositorio
│   └── (estructura actual)
│
└── backend/           ← Futuro servidor API REST
    ├── routes/
    │   ├── productos.js     GET  /api/productos
    │   ├── categorias.js    GET  /api/categorias
    │   ├── usuarios.js      POST /api/usuarios/registro
    │   ├── auth.js          POST /api/auth/login
    │   ├── carrito.js       GET/POST /api/carrito
    │   └── cotizaciones.js  POST /api/cotizaciones
    ├── models/
    └── db/
```

### Endpoints REST sugeridos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/:codigo` | Obtener producto por código |
| GET | `/api/categorias` | Listar categorías con conteos |
| POST | `/api/usuarios/registro` | Crear nuevo usuario |
| POST | `/api/auth/login` | Autenticación |
| POST | `/api/cotizaciones` | Enviar solicitud de cotización |
| GET | `/api/carrito` | Obtener carrito de sesión |
| POST | `/api/carrito/agregar` | Agregar producto al carrito |

### Cómo conectar el frontend a la API

Cuando exista un backend, reemplazar la carga de `catalogo.js` por una llamada `fetch`:

```js
// En main.js (futuro)
async function cargarCatalogo() {
  const res = await fetch('/api/productos');
  const data = await res.json();
  // Reemplaza la variable global `catalogo`
  window.catalogo = data;
  renderCatGrid();
}
```

Los campos `imagen_url` y `ruta_imagen` ya están preparados en `data/productos.json` para almacenar la URL de imagen desde la base de datos.

---

## Control de versiones (Git)

Si aún no existe un repositorio:
```bash
cd vma-frontend
git init
git add .
git commit -m "feat: estructura modular frontend VMA Industrial"
```

Crear repositorio en GitHub/GitLab y conectar:
```bash
git remote add origin https://github.com/tu-usuario/vma-frontend.git
git push -u origin main
```

---

## Migración futura a framework

La estructura actual es compatible con una migración gradual a **React**, **Vue** o **Angular**:

- Cada archivo en `pages/` → componente de página.
- Cada archivo en `components/` → componente reutilizable.
- Los archivos en `assets/js/` → servicios o composables.
- `data/productos.json` → respuesta de API o store (Pinia/Redux).
- Las variables CSS en `variables.css` → tokens de diseño (design tokens).

---

## Próximos pasos recomendados

1. **Imágenes de productos** — Fotografiar o conseguir imágenes y organizarlas en `media/productos/{categoria}/`.
2. **Actualizar catálogo** — Reemplazar `"Consultar"` por precios reales cuando estén disponibles.
3. **Backend** — Desarrollar API REST (Node.js/Express o Python/FastAPI) que sirva `productos.json` desde PostgreSQL.
4. **Autenticación** — Implementar JWT en backend y conectar formularios de login/registro.
5. **Carrito persistente** — Conectar carrito a sesión backend o localStorage con expiración.
6. **SEO** — Agregar meta tags Open Graph y Schema.org para productos.
7. **Hosting** — Subir frontend a Netlify, Vercel o servidor propio (Apache/Nginx).

---

*Última actualización: Mayo 2025 — VMA Industrial*
