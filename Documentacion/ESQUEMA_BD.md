# Esquema de Base de Datos — VMA Industrial

Base de datos PostgreSQL gestionada en Supabase. Todas las tablas tienen Row-Level Security (RLS) habilitado.

---

## Diagrama de relaciones

```
roles (1) ──< usuarios (N) ──< cotizaciones (N)
categoria (1) ──< producto (N)
```

---

## Tablas

### `roles`

Catálogo de roles del sistema. Creado manualmente en Supabase.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | int (PK) | Identificador |
| `nombre` | varchar | Nombre del rol (`admin`, `trabajador`, `cliente`) |
| `descripcion` | text | Descripción opcional |

**Datos fijos:**

| id | nombre | descripcion |
|----|--------|-------------|
| 1 | admin | Administrador del sistema |
| 2 | trabajador | Empleado de VMA |
| 3 | cliente | Cliente registrado |

---

### `usuarios`

Perfil de aplicación ligado a Supabase Auth. Creado manualmente en Supabase.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | int (PK, IDENTITY) | Identificador interno |
| `auth_user_id` | uuid (FK → auth.users) | ID del usuario en Supabase Auth |
| `nombre` | varchar | Nombre completo |
| `email` | varchar | Correo electrónico |
| `telefono` | varchar (nullable) | Teléfono de contacto |
| `activo` | boolean | `true` = cuenta habilitada |
| `rol_id` | int (FK → roles.id) | Rol asignado |
| `created_at` | timestamptz | Fecha de registro |
| `updated_at` | timestamptz | Última actualización |

**Notas:**
- El registro de nuevos clientes crea primero el usuario en `auth.users` y luego inserta el perfil aquí con `rol_id = 3`.
- Si `activo = false`, el login es rechazado por la aplicación (sin eliminar el usuario de Auth).
- El join con `roles` se hace en dos consultas separadas (no join anidado) por limitaciones de PostgREST.

---

### `categoria`

Categorías de productos. Incluida en [`Script VMA.txt`](Script%20VMA.txt).

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id_categoria` | int (PK, IDENTITY) | Identificador |
| `nombre_categoria` | varchar(100) UNIQUE | Nombre de la categoría |

Categorías actuales: SOLDADURA, ACCESORIOS, GASES, DISCOS, HERRAMIENTAS, GRATAS / ESCOBILLAS, ALAMBRE, MANGUERAS, CUIDADO PERSONAL, CALZADO, CONECTORES, BOQUILLAS, LIMPIADORES, FLEXIBLES, TAPAS, CUERPOS, EXTENSIONES, FILTROS, FRESAS, HORNOS, ADAPTADORES, DIFUSORES, SIN CATEGORIA.

---

### `producto`

Catálogo de productos. Incluida en [`Script VMA.txt`](Script%20VMA.txt).

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id_producto` | int (PK, IDENTITY) | Identificador |
| `codigo` | varchar(50) | Código del producto Indura |
| `descripcion` | text NOT NULL | Nombre/descripción del producto |
| `id_categoria` | int (FK → categoria) | Categoría |
| `precio` | numeric(12,2) (nullable) | Precio de referencia |
| `distribuidor` | varchar(150) (nullable) | Distribuidor/fabricante |
| `stock` | int (nullable) | Unidades en stock |
| `imagen_url` | text (nullable) | URL pública en Supabase Storage (bucket `productos`) |
| `tiene_variantes` | boolean (default FALSE) | TRUE si el producto es padre de variantes (ej. botín en tallas N°39–44) |
| `id_padre` | int (FK → producto, nullable) | Si no es NULL, este producto es una variante del producto padre indicado |
| `label_variante` | varchar(150) (nullable) | Etiqueta legible de esta variante ("N°39", "1/8 (3.2 MM)", "T.XL", etc.) |

**Notas:**
- El catálogo solo muestra productos donde `id_padre IS NULL`. Los productos variante quedan ocultos hasta que el usuario los selecciona en el modal.
- Al abrir el modal de un producto con `tiene_variantes = TRUE`, el frontend llama a `obtenerVariantes(id_producto)` que retorna el padre + todos sus hijos, para construir el selector desplegable.
- Al agregar al carrito desde el modal, se usa el `codigo` del variante seleccionado, no del padre.
- Migración inicial: ver [`migracion_variantes_productos.sql`](migracion_variantes_productos.sql).
- Las imágenes se suben al bucket `productos` con nombre `{id}_{timestamp}.{ext}`.

---

### `cotizaciones`

Solicitudes de cotización enviadas por clientes.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | int (PK, IDENTITY) | Identificador |
| `usuario_id` | int (FK → usuarios.id, nullable) | Usuario registrado que envió la cotización (null si es anónimo) |
| `nombre` | varchar | Nombre del solicitante |
| `empresa` | varchar (nullable) | Empresa del solicitante |
| `email` | varchar | Email de contacto |
| `telefono` | varchar (nullable) | Teléfono de contacto |
| `mensaje` | text (nullable) | Mensaje adicional |
| `productos_solicitados` | jsonb | Array de productos: `[{ codigo, nombre, cantidad, precio }]` |
| `estado` | varchar | Estado actual (ver valores abajo) |
| `created_at` | timestamptz | Fecha de envío |
| `updated_at` | timestamptz | Última actualización de estado |

**Estados posibles:**

| Estado | Significado |
|--------|-------------|
| `pendiente` | Recién enviada, sin revisar |
| `revisada` | Vista por admin/trabajador, en proceso |
| `respondida` | Atendida y respondida al cliente |

**Notas:**
- Al crear una cotización se llama a la Edge Function `notificar-cotizacion` para enviar email de notificación (sin bloquear el flujo).
- Los clientes anónimos (sin cuenta) pueden cotizar; en ese caso `usuario_id` es null.

---

## Storage

**Bucket:** `productos`  
Almacena imágenes de los productos. Acceso público de lectura.  
Ruta de archivos: `{id_producto}_{timestamp}.{ext}`

---

## Edge Functions

**`notificar-cotizacion`**  
Disparada al crear una cotización. Envía email de notificación al equipo VMA con los datos del solicitante y los productos pedidos.
