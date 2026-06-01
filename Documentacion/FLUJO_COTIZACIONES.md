# Flujo de Cotizaciones — VMA Industrial

Las cotizaciones son el proceso central del negocio: el cliente solicita precios y el equipo VMA responde.

---

## Actores

| Actor | Descripción |
|-------|-------------|
| **Cliente registrado** | Usuario con cuenta que cotiza desde el catálogo |
| **Visitante anónimo** | Puede cotizar sin cuenta (sin historial posterior) |
| **Trabajador** | Revisa y gestiona las cotizaciones entrantes |
| **Admin** | Mismo acceso que trabajador + puede eliminar cotizaciones |

---

## Flujo completo

```
[Cliente] Navega catálogo
    │
    ▼
Agrega productos al carrito
    │  (carrito vive en memoria si es visitante,
    │   en Supabase si está logueado)
    ▼
Completa formulario de cotización
  · nombre, empresa (opcional), email, teléfono (opcional), mensaje (opcional)
    │
    ▼
[cotizacionService.enviarCotizacion()]
  · Inserta en tabla `cotizaciones` con estado = "pendiente"
  · Dispara Edge Function `notificar-cotizacion` (email al equipo, no bloquea)
    │
    ▼
[Trabajador / Admin] recibe notificación por email
    │
    ▼
Panel de trabajador / Panel admin
  · Ve la cotización en lista → estado: ⏳ Pendiente
    │
    ├──► "Revisar" → estado: 🔍 En revisión
    │
    └──► "Responder" → estado: ✅ Respondida
         (el equipo contacta al cliente por email o teléfono fuera del sistema)
    │
    ▼
[Cliente] ve el estado actualizado en "Mis Cotizaciones"
  · Timeline visual: Recibida → En revisión → Respondida
  · Puede descargar PDF de su cotización en cualquier momento
```

---

## Estados de una cotización

| Estado | Quién lo asigna | Significado |
|--------|----------------|-------------|
| `pendiente` | Sistema (al crear) | Recibida, sin revisar |
| `revisada` | Trabajador / Admin | El equipo la está analizando |
| `respondida` | Trabajador / Admin | Atendida; se contactó al cliente |
| `pendiente` | Trabajador / Admin | Reabierta (reversible) |

Las transiciones **no son lineales** — un trabajador puede marcar como respondida sin pasar por revisada, o reabrir una cotización respondida.

---

## Carrito de cotización

El carrito no es de compra directa, sino de selección de productos para cotizar.

**Modo visitante (sin sesión):**
- Vive en memoria (`array cart` en `carrito.js`)
- Se pierde al recargar la página
- Al hacer login, se fusiona con el carrito guardado en Supabase

**Modo cliente logueado:**
- Persiste en Supabase (tabla `carrito_items`)
- Sincronizado entre sesiones y dispositivos

---

## Archivos clave

| Archivo | Responsabilidad |
|---------|----------------|
| [`src/services/cotizacionService.js`](../Producto/AppWeb/vma-vite/src/services/cotizacionService.js) | CRUD de cotizaciones contra Supabase |
| [`src/js/carrito.js`](../Producto/AppWeb/vma-vite/src/js/carrito.js) | Gestión del carrito (memoria + Supabase) |
| [`src/js/misCotizaciones.js`](../Producto/AppWeb/vma-vite/src/js/misCotizaciones.js) | Vista del cliente: historial, detalle, descarga PDF |
| [`src/js/panelTrabajador.js`](../Producto/AppWeb/vma-vite/src/js/panelTrabajador.js) | Vista del trabajador: tabla, filtros, cambio de estado |
| [`src/js/admin.js`](../Producto/AppWeb/vma-vite/src/js/admin.js) | Panel admin: mismas acciones + eliminar + reportes |

---

## Datos del PDF generado

Al hacer clic en "Descargar PDF" desde "Mis Cotizaciones", se genera un PDF en el cliente (sin servidor) usando **jsPDF** (cargado vía CDN). El PDF incluye:

- Logo y datos de VMA Industrial
- Número de cotización y estado
- Datos del solicitante
- Tabla de productos solicitados con código, descripción, cantidad y precio de referencia
- Nota aclaratoria: los precios son de referencia, el final lo confirma el equipo

---

## Notificación por email

Al crear una cotización se llama a la Edge Function `notificar-cotizacion` de forma no bloqueante (`fetch` sin `await` de resultado). Si falla, la cotización igual queda guardada en la base de datos y el equipo puede verla en el panel.

El sistema **no envía respuesta automática al cliente** — la comunicación de vuelta se hace por email o teléfono fuera de la plataforma.
