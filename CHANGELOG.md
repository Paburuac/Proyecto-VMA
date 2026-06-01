# CHANGELOG — VMA Industrial

Historial de cambios notables del sitio web. Las entradas están ordenadas de más reciente a más antiguo.

---

## [Sin versión] — 2026-06-01

### Agregado
- Documentación completa del proyecto: `CLAUDE.md`, esquema de BD, roles y permisos, flujo de cotizaciones, guía de contribución, referencia de servicios

### Corregido
- Pérdida de foco en el campo de búsqueda del panel admin al escribir

### Mejorado
- Agrupación de productos con variantes por medida en el catálogo (columna `medidas` en tabla `producto`)
- Fallback en el cargador de variables de entorno; fetch REST directo a Supabase como alternativa si el cliente JS falla al inicializar

---

## [Sin versión] — 2026-05-27

### Agregado
- Documentación interna (diagramas, flujos)

---

## [Sin versión] — 2026-05-16 – 2026-05-18

### Agregado
- Búsqueda de productos con debounce en el catálogo público
- Notificación por email al equipo al recibir una cotización (Edge Function `notificar-cotizacion`)
- Exportación de cotizaciones a Excel (SheetJS) y PDF desde el panel admin
- Filtros por estado en el panel admin de cotizaciones

### Corregido
- Hover en botón de éxito del admin
- Campos faltantes en `obtenerMisCotizaciones` (empresa, teléfono, mensaje)

---

## [Sin versión] — 2026-05-17

### Agregado
- Suite de 96 pruebas unitarias con Vitest (cobertura de servicios y validaciones)
- Configuración de Vitest en `vite.config.js` con entorno jsdom
- Scripts `test`, `test:watch`, `test:coverage` en `package.json`

---

## [Sin versión] — 2026-05-10 – 2026-05-11

### Agregado
- Registro de nuevos clientes desde la UI (rol cliente asignado automáticamente)
- Persistencia del carrito en Supabase para usuarios logueados
- Fusión del carrito de memoria con Supabase al iniciar sesión
- Panel de trabajador: gestión de cotizaciones con filtros y cambio de estado
- Sistema de cotizaciones completo: envío, historial del cliente, descarga de PDF
- Validaciones de formularios centralizadas en `validaciones.js`
- Routing hash-based SPA con `router.js`

### Mejorado
- Migración del frontend legacy a Vite (bundler + HMR)
- Reorganización de la estructura del proyecto (módulos ES, capa de servicios separada)

---

## [Sin versión] — 2026-04-13

### Agregado
- Estructura inicial del repositorio
- Directorio de gestión del proyecto (`Gestion/`)
- Directorio de producto (`Producto/`)

---

*Este CHANGELOG cubre la rama `main` (sitio web). Los cambios de las ramas `Felipe` (módulo Python) y `Diego` (app Android) se registran en sus propias ramas.*
