# Referencia de Servicios — VMA Industrial

Todos los servicios viven en `Producto/AppWeb/vma-vite/src/services/` y son la **única capa** que puede hablar directamente con Supabase. Los módulos de UI en `src/js/` deben llamar a estas funciones, no consultar Supabase directamente.

Todas las funciones retornan `{ data, error }`. Si ocurre un error, `data` es `null`; si tiene éxito, `error` es `null`.

---

## `supabase.js`

Inicializa y exporta el cliente de Supabase. No expone funciones propias.

```js
import { supabase } from './supabase.js'
```

Lee `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` del archivo `.env`. Si alguna falta, imprime un error en consola al cargar la página.

---

## `productoService.js`

Acceso al catálogo de productos. Usado por el catálogo público y el panel admin.

### `obtenerProductos()`
Retorna todos los productos que **no son variantes**, con su categoría, ordenados por descripción.

```js
const { data, error } = await obtenerProductos()
// data: array de productos con campo `categoria` anidado
```

### `obtenerCategorias()`
Retorna todas las categorías ordenadas por nombre.

```js
const { data, error } = await obtenerCategorias()
// data: [{ id_categoria, nombre_categoria }, ...]
```

### `obtenerProductosPorCategoria(nombreCategoria)`
Filtra productos por nombre de categoría (búsqueda case-insensitive).

```js
const { data, error } = await obtenerProductosPorCategoria('SOLDADURA')
```

### `buscarProductos(texto)`
Busca productos cuyo `descripcion` o `codigo` contengan el texto (case-insensitive). Si `texto` está vacío, equivale a `obtenerProductos()`.

```js
const { data, error } = await buscarProductos('electrodo')
```

### `obtenerProductoPorCodigo(codigo)`
Retorna un único producto por su código exacto. Usado para abrir el modal de detalle.

```js
const { data, error } = await obtenerProductoPorCodigo('2000122H')
// data: objeto producto o null
```

### `construirCatalogo(productos)` *(función pura, sin Supabase)*
Transforma el array plano de productos en la estructura anidada que espera el frontend:

```js
{
  "SOLDADURA": {
    "General": [ { codigo, nombre, precio, imagen_url, ... }, ... ]
  },
  "GASES": { ... }
}
```

---

## `categoriaService.js`

Operaciones de solo lectura sobre categorías. Separado de `productoService` para mantener responsabilidad única.

### `obtenerCategorias()`
Idéntico al de `productoService`. Úsalo cuando solo necesites categorías sin productos.

### `obtenerCategoriaPorId(id)`
Retorna una categoría por su `id_categoria`.

```js
const { data, error } = await obtenerCategoriaPorId(1)
// data: { id_categoria: 1, nombre_categoria: 'SOLDADURA' }
```

---

## `authService.js`

Gestión de sesión y perfiles de usuario.

### `login(email, password)`
Inicia sesión en Supabase Auth.

```js
const { data, error } = await login('user@example.com', '123456')
// data.user.id → auth_user_id para cargarPerfil()
```

### `logout()`
Cierra la sesión activa.

```js
const { error } = await logout()
```

### `getSession()`
Retorna la sesión activa si existe (útil al recargar la página).

```js
const { data, error } = await getSession()
// data.session → sesión activa, o null si no hay
```

### `cargarPerfil(userId)`
Carga el perfil del usuario desde la tabla `usuarios` junto con su rol. Usa dos consultas separadas (no join anidado) por una limitación de PostgREST con foreign keys no navegables.

```js
const { data, error } = await cargarPerfil(authUserId)
// data: { id, nombre, email, telefono, activo, rol_id, roles: { id, nombre } }
// error si la cuenta está desactivada: error.message incluye aviso al usuario
```

### `registrarCliente({ nombre, telefono, email, password })`
Crea un usuario en Supabase Auth e inserta su perfil en `usuarios` con `rol_id = 3` (cliente).

```js
const { data, error } = await registrarCliente({ nombre: 'Ana', email: 'ana@x.com', password: '...' })
```

---

## `cotizacionService.js`

Gestión de cotizaciones para clientes y trabajadores.

### `enviarCotizacion(datos)`
Inserta una nueva cotización con estado `pendiente`. Dispara la Edge Function de notificación por email de forma no bloqueante.

```js
const { data, error } = await enviarCotizacion({
  nombre: 'Juan',
  empresa: 'Constructora X',
  email: 'juan@x.com',
  telefono: '+56912345678',
  mensaje: 'Urgente',
  productos_solicitados: [
    { codigo: '2000122H', nombre: 'ELECTRODO 7018', cantidad: 2, precio: 'Consultar' }
  ]
})
// data.id → ID de la cotización creada
```

Si el usuario está logueado, asocia automáticamente `usuario_id` desde `window.authState.perfil.id`.

### `obtenerMisCotizaciones()`
Retorna las cotizaciones del usuario logueado, ordenadas por fecha descendente. Requiere `window.authState.perfil.id`.

```js
const { data, error } = await obtenerMisCotizaciones()
```

### `obtenerTodasCotizaciones()`
Retorna todas las cotizaciones. Solo debe llamarse desde roles `admin` o `trabajador` (RLS en Supabase lo refuerza).

```js
const { data, error } = await obtenerTodasCotizaciones()
```

### `actualizarEstado(id, nuevoEstado)`
Cambia el estado de una cotización. `nuevoEstado`: `'pendiente'` | `'revisada'` | `'respondida'`.

```js
const { error } = await actualizarEstado(42, 'revisada')
```

---

## `carritoService.js`

Persistencia del carrito en Supabase para usuarios logueados. Trabaja sobre la tabla `carrito_items`.

> **Nota:** El `usuario_id` que reciben estas funciones es el `id` de la tabla `usuarios`, **no** el `auth_user_id` de Supabase Auth.

### `obtenerCarrito(usuarioId)`
Retorna los items del carrito con datos del producto (código, descripción, precio).

```js
const { data, error } = await obtenerCarrito(usuarioId)
// data: [{ id, cantidad, producto: { id_producto, codigo, descripcion, precio } }]
```

### `agregarItem(usuarioId, productoId, cantidad = 1)`
Agrega un producto al carrito. Si ya existe, incrementa la cantidad (upsert manual).

```js
const { error } = await agregarItem(usuarioId, 15, 2)
```

### `actualizarCantidad(itemId, nuevaCantidad)`
Actualiza la cantidad de un item. Si `nuevaCantidad <= 0`, elimina el item.

```js
const { error } = await actualizarCantidad(itemId, 3)
```

### `eliminarItem(itemId)`
Elimina un item por su `id` de `carrito_items`.

```js
const { error } = await eliminarItem(itemId)
```

### `vaciarCarrito(usuarioId)`
Elimina todos los items del carrito del usuario. Se llama al completar una cotización.

```js
const { error } = await vaciarCarrito(usuarioId)
```

### `fusionarCarrito(usuarioId, itemsEnMemoria)`
Fusiona los items que el visitante tenía en memoria antes de loguearse con su carrito en Supabase. Si un producto ya existe en Supabase, suma las cantidades.

```js
// itemsEnMemoria: [{ producto_id, cantidad }, ...]
const { error } = await fusionarCarrito(usuarioId, itemsEnMemoria)
```

---

## `adminService.js`

Operaciones privilegiadas para el panel de administración. Solo debe llamarse cuando `window.authState.rol === 'admin'`.

### Dashboard
- **`obtenerMetricas()`** → `{ totalCotizaciones, pendientes, revisadas, respondidas, totalUsuarios, usuariosActivos, totalProductos, totalCategorias }`

### Cotizaciones
- **`obtenerCotizaciones(filtroEstado?)`** → array de cotizaciones, opcionalmente filtradas por estado
- **`actualizarEstadoCotizacion(id, nuevoEstado)`** → cambia estado
- **`eliminarCotizacion(id)`** → elimina permanentemente

### Usuarios
- **`obtenerUsuarios()`** → array con perfil + rol de cada usuario
- **`actualizarRolUsuario(usuarioId, nuevoRolId)`** → cambia rol (1=admin, 2=trabajador, 3=cliente)
- **`toggleActivoUsuario(usuarioId, activo)`** → activa/desactiva cuenta

### Productos
- **`obtenerProductosAdmin()`** → todos los productos con categoría (incluye `imagen_url`)
- **`crearProducto(producto)`** → inserta nuevo producto
- **`actualizarProducto(id, campos)`** → actualiza campos parciales
- **`eliminarProducto(id)`** → elimina permanentemente

### Categorías
- **`obtenerCategoriasAdmin()`** → todas las categorías
- **`crearCategoria(nombre)`** → crea nueva categoría
- **`actualizarCategoria(id, nombre)`** → renombra
- **`eliminarCategoria(id)`** → elimina solo si no tiene productos asociados

### Storage (imágenes)
- **`subirImagenProducto(archivo, idProducto)`** → sube al bucket `productos`, retorna `{ url, error }`
- **`eliminarImagenProducto(urlPublica)`** → elimina del bucket dado su URL pública

### Reportes
- **`obtenerReporteProductosMasCotizados()`** → top 10 productos por frecuencia en cotizaciones
- **`obtenerReporteStock()`** → productos clasificados por nivel de stock (`sin_stock`, `stock_bajo`, `stock_medio`, `suficiente`)
