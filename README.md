# Proyecto VMA Industrial

Plataforma digital para **VMA Industrial**, agente autorizado Indura.  
Compuesta por tres componentes: sitio web (Pablo), módulo de análisis Python (Felipe) y aplicación móvil Android (Diego).

---

## Estructura del repositorio

```
Proyecto-VMA/
├── vma-vite/        ← Sitio web SPA (rama main)
├── Sistema (prototipo)/  ← Módulo Python (rama Felipe)
└── app/             ← Aplicación Android (rama Diego)
```

---

## Sitio web — `vma-vite/`

### Tecnologías
- HTML5 / CSS3 / JavaScript ES6+
- [Vite](https://vitejs.dev/) v5.4.x — build tool
- [Supabase](https://supabase.com/) — backend (PostgreSQL + Auth + API REST + RLS)
- [Vercel](https://vercel.com/) — hosting con deploy continuo desde GitHub

### Requisitos previos
- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta en [Supabase](https://supabase.com/) con el proyecto configurado
- (Opcional) Cuenta en [Vercel](https://vercel.com/) para deploy

### Instalación y ejecución local

**1. Clonar el repositorio**
```bash
git clone https://github.com/Paburuac/Proyecto-VMA.git
cd Proyecto-VMA/vma-vite
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Configurar variables de entorno**

Crear un archivo `.env` en la carpeta `vma-vite/` basándose en `.env.example`:
```bash
cp .env.example .env
```

Editar `.env` con las credenciales del proyecto Supabase:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

Las credenciales se obtienen en: **Supabase Dashboard → Project Settings → API**

**4. Inicializar la base de datos**

Ejecutar el script `Script_VMA_Completo.txt` en el **SQL Editor** de Supabase.  
Esto crea las tablas, políticas RLS y pobla el catálogo de productos.

**5. Ejecutar en modo desarrollo**
```bash
npm run dev
```
El sitio quedará disponible en `http://localhost:5173`

**6. Build para producción**
```bash
npm run build
npm run preview   # para previsualizar el build localmente
```

---

## Deploy en Vercel

El deploy es automático cada vez que se hace push a la rama `main`.

Para configurar manualmente:
1. Importar el repositorio en [Vercel](https://vercel.com/)
2. Establecer el **Root Directory** como `vma-vite`
3. Agregar las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en **Settings → Environment Variables**
4. El `vercel.json` incluido configura automáticamente el build y output

Sitio en producción: [proyectovma.vercel.app](https://proyectovma.vercel.app)

---

## Módulo Python — rama `Felipe`

Sistema de análisis de datos con 4 módulos independientes:

```
gestor_bd.py        ← Extracción de datos
validador.py        ← Validación y depuración
analizador.py       ← Análisis y métricas
creador_reportes.py ← Generación de reportes
```

### Ejecución

```bash
git checkout Felipe
cd "Sistema (prototipo)"
python main.py
```

El sistema solicita el tipo de reporte: `RESUMEN`, `REPORTE` o `ESTADISTICA`.  
Cada ejecución queda registrada en `registro_ejecuciones.txt`.

**Requisitos:** Python 3.11+, sin dependencias externas.

---

## Aplicación móvil Android — rama `Diego`

Aplicación nativa Android construida con Kotlin y Jetpack Compose.  
Conectada al mismo proyecto Supabase que el sitio web.

### Tecnologías
- Kotlin
- Jetpack Compose
- Supabase Kotlin SDK (`io.github.jan-tennert.supabase`)
- Arquitectura MVVM (Models, Repositories, ViewModels, UI Screens)

### Ejecución
```bash
git checkout Diego
```
Abrir la carpeta raíz en **Android Studio**, sincronizar Gradle y ejecutar en emulador o dispositivo físico Android.

---

## Ramas del repositorio

| Rama | Responsable | Contenido |
|---|---|---|
| `main` | Pablo Astudillo | Sitio web (producción) |
| `Pablo` | Pablo Astudillo | Desarrollo web |
| `Felipe` | Felipe Rivera | Módulo Python |
| `Diego` | Diego Aros | App móvil Android |
