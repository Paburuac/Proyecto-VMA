# Roles y Permisos — VMA Industrial

El sistema tiene tres roles definidos en la tabla `roles` de Supabase.

---

## Roles

### `admin` (rol_id = 1)

Acceso total al sistema.

**Vistas:**
- Panel de administración completo (`#admin`)
- Catálogo de productos (lectura + CRUD)
- Gestión de categorías (CRUD)
- Gestión de usuarios (ver, cambiar rol, activar/desactivar)
- Todas las cotizaciones (ver, cambiar estado, eliminar)
- Reportes: productos más cotizados, estado de stock
- Subida de imágenes de productos (Supabase Storage)

---

### `trabajador` (rol_id = 2)

Acceso operativo limitado.

**Vistas:**
- Panel de trabajador (`#trabajador`)
- Todas las cotizaciones (ver y cambiar estado: pendiente → revisada → respondida)
- Catálogo de productos (solo lectura)

**No puede:**
- Crear, editar ni eliminar productos o categorías
- Gestionar usuarios
- Ver métricas del dashboard de admin

---

### `cliente` (rol_id = 3)

Usuario registrado del sitio.

**Vistas:**
- Catálogo de productos (solo lectura)
- Carrito de cotización
- Enviar cotizaciones
- Ver historial de sus propias cotizaciones (`#mis-cotizaciones`)

**No puede:**
- Ver cotizaciones de otros usuarios
- Acceder a paneles de admin o trabajador

---

## Usuarios anónimos (sin cuenta)

- Pueden navegar el catálogo de productos
- Pueden enviar cotizaciones (sin `usuario_id` asociado)
- No pueden ver historial de cotizaciones

---

## Asignación de roles

### Registro de cliente
El registro desde la UI crea automáticamente el usuario con `rol_id = 3` (cliente). No requiere intervención del admin.

### Cambio de rol a trabajador o admin
Solo un admin puede cambiar el rol de un usuario desde el **Panel Admin → Usuarios**. Se actualiza el campo `rol_id` en la tabla `usuarios`.

### Desactivar una cuenta
El admin puede marcar `activo = false` en un usuario. La aplicación rechaza el login de cuentas inactivas sin eliminar el registro de Supabase Auth.

---

## Cómo se aplica en el código

1. Al hacer login, `authService.cargarPerfil()` carga el perfil del usuario y su rol desde Supabase.
2. El resultado se almacena en `window.authState.rol` (string: `'admin'`, `'trabajador'`, `'cliente'`).
3. Cada módulo de UI lee `window.authState.rol` para mostrar u ocultar secciones y llamar a los servicios correspondientes.
4. Las políticas RLS en Supabase refuerzan los permisos a nivel de base de datos (segunda línea de defensa).

---

## Políticas RLS relevantes

| Tabla | Política | Descripción |
|-------|----------|-------------|
| `cotizaciones` | SELECT | Clientes ven solo sus propias cotizaciones (`usuario_id = auth.uid()`). Admin y trabajador ven todas. |
| `cotizaciones` | INSERT | Cualquier usuario autenticado o anónimo puede insertar. |
| `cotizaciones` | UPDATE / DELETE | Solo admin y trabajador. |
| `usuarios` | SELECT | Admin ve todos. Cada usuario ve solo su propio perfil. |
| `usuarios` | UPDATE | Solo admin puede cambiar `rol_id` y `activo`. |
| `producto` | SELECT | Público (sin autenticación). |
| `producto` | INSERT / UPDATE / DELETE | Solo admin. |
| `categoria` | SELECT | Público. |
| `categoria` | INSERT / UPDATE / DELETE | Solo admin. |
