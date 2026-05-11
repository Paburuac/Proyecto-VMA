/* =============================================
   VMA INDUSTRIAL – carrito.js
   Responsabilidad: Gestión del carrito de compras.

   Modo visitante (sin sesión):
     - El carrito vive en memoria (array `cart`)
     - Se pierde al recargar

   Modo cliente (con sesión):
     - El carrito se sincroniza con Supabase
     - Persiste entre sesiones
     - Al hacer login se fusiona con lo que había
       en memoria

   Depende de: catalogo.js, productos.js,
               carritoService.js (importado en app.js)
   ============================================= */

/* ─────────────────────────────────────────────
   ESTADO DEL CARRITO EN MEMORIA
   Cada item: {
     id:         id de carrito_items en Supabase (null si es visitante)
     producto_id: id_producto de la tabla producto (null si es visitante)
     codigo:     string
     nombre:     string
     cat:        string
     sub:        string
     cantidad:   number
     precio:     string
   }
───────────────────────────────────────────── */
let cart = []

/* ─────────────────────────────────────────────
   HELPERS DE SESIÓN
   Leen window.authState (definido en auth.js)
───────────────────────────────────────────── */
function estaLogueado() {
  return window.authState?.loggedIn === true
}

function getUsuarioId() {
  return window.authState?.perfil?.id ?? null
}

/* ─────────────────────────────────────────────
   CARGAR CARRITO DESDE SUPABASE
   Llamado al hacer login. Reemplaza el array
   en memoria con los datos de Supabase y luego
   fusiona lo que había antes en memoria.
───────────────────────────────────────────── */
async function cargarCarritoDesdeSupabase(itemsEnMemoriaAntes) {
  const usuarioId = getUsuarioId()
  if (!usuarioId) return

  // Fusionar items que había en memoria antes del login
  if (itemsEnMemoriaAntes.length > 0) {
    const itemsParaFusionar = itemsEnMemoriaAntes
      .filter(i => i.producto_id)  // solo los que tienen producto_id real
      .map(i => ({ producto_id: i.producto_id, cantidad: i.cantidad }))

    if (itemsParaFusionar.length > 0) {
      await window.carritoService.fusionarCarrito(usuarioId, itemsParaFusionar)
    }
  }

  // Cargar el carrito actualizado desde Supabase
  const { data, error } = await window.carritoService.obtenerCarrito(usuarioId)
  if (error || !data) return

  // Reconstruir el array en memoria con los datos de Supabase
  cart = data.map(item => ({
    id:          item.id,
    producto_id: item.producto?.id_producto ?? null,
    codigo:      String(item.producto?.codigo ?? ''),
    nombre:      item.producto?.descripcion ?? 'Producto',
    cat:         '',
    sub:         '',
    cantidad:    item.cantidad,
    precio:      item.producto?.precio != null ? String(item.producto.precio) : 'Consultar',
  }))

  updateCartUI()
  console.log('[VMA Carrito] carrito cargado desde Supabase:', cart.length, 'items')
}
window.cargarCarritoDesdeSupabase = cargarCarritoDesdeSupabase

/* ─────────────────────────────────────────────
   VACIAR CARRITO EN MEMORIA (al hacer logout)
───────────────────────────────────────────── */
function limpiarCarritoLocal() {
  cart = []
  updateCartUI()
}
window.limpiarCarritoLocal = limpiarCarritoLocal

/* ─────────────────────────────────────────────
   AGREGAR AL CARRITO
───────────────────────────────────────────── */
async function addToCart(codigo, cat, sub, qty = 1) {
  const prod = findProduct(codigo, cat, sub)
  if (!prod) return

  // Actualizar memoria
  const existing = cart.find(i => i.codigo === codigo)
  if (existing) {
    existing.cantidad += qty
    // Sincronizar con Supabase si está logueado
    if (estaLogueado() && existing.id) {
      await window.carritoService.actualizarCantidad(existing.id, existing.cantidad)
    }
  } else {
    const nuevoItem = {
      id:          null,
      producto_id: prod.id_producto ?? null,
      codigo:      prod.codigo,
      nombre:      prod.nombre,
      cat, sub,
      cantidad:    qty,
      precio:      prod.precio,
    }
    cart.push(nuevoItem)

    // Sincronizar con Supabase si está logueado
    if (estaLogueado() && nuevoItem.producto_id) {
      const usuarioId = getUsuarioId()
      const { error } = await window.carritoService.agregarItem(
        usuarioId, nuevoItem.producto_id, qty
      )
      if (!error) {
        // Obtener el id real del item recién insertado
        const { data } = await window.carritoService.obtenerCarrito(usuarioId)
        if (data) {
          const guardado = data.find(i => i.producto?.id_producto === nuevoItem.producto_id)
          if (guardado) nuevoItem.id = guardado.id
        }
      }
    }
  }

  updateCartUI()
  showToast(`✅ "${prod.nombre.substring(0, 30)}..." agregado al carrito`)
}

/* ─────────────────────────────────────────────
   ELIMINAR DEL CARRITO
───────────────────────────────────────────── */
async function removeFromCart(codigo) {
  const item = cart.find(i => i.codigo === codigo)

  // Sincronizar con Supabase si está logueado
  if (estaLogueado() && item?.id) {
    await window.carritoService.eliminarItem(item.id)
  }

  cart = cart.filter(i => i.codigo !== codigo)
  updateCartUI()
  renderCart()
}

/* ─────────────────────────────────────────────
   ACTUALIZAR CANTIDAD
───────────────────────────────────────────── */
async function updateCartQty(codigo, delta) {
  const item = cart.find(i => i.codigo === codigo)
  if (!item) return

  item.cantidad += delta

  if (item.cantidad <= 0) {
    await removeFromCart(codigo)
    return
  }

  // Sincronizar con Supabase si está logueado
  if (estaLogueado() && item.id) {
    await window.carritoService.actualizarCantidad(item.id, item.cantidad)
  }

  updateCartUI()
  renderCart()
}

/* ─────────────────────────────────────────────
   ACTUALIZAR UI — contador en el header
───────────────────────────────────────────── */
function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.cantidad, 0)
  document.getElementById('cart-count').textContent = count
  document.getElementById('cart-total-items').textContent = count
}

/* ─────────────────────────────────────────────
   ABRIR / CERRAR DRAWER
───────────────────────────────────────────── */
function openCart() {
  document.getElementById('cart-overlay').classList.add('open')
  document.body.style.overflow = 'hidden'
  renderCart()
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open')
  document.body.style.overflow = ''
}

/* ─────────────────────────────────────────────
   RENDERIZAR DRAWER
───────────────────────────────────────────── */
function renderCart() {
  const container = document.getElementById('cart-items')
  if (!container) return

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <p>Tu carrito está vacío.</p>
      </div>`
    document.getElementById('cart-total').textContent = 'Consultar'
    return
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">📦</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.nombre.substring(0, 40))}${item.nombre.length > 40 ? '...' : ''}</div>
        <div class="cart-item-code">#${escHtml(item.codigo)}</div>
        <div class="cart-item-subtotal">Precio: ${escHtml(item.precio)}</div>
        <div class="cart-item-qty">
          <button class="cart-qty-btn" onclick="updateCartQty('${escHtml(item.codigo)}',-1)">−</button>
          <span class="cart-qty-num">${item.cantidad}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${escHtml(item.codigo)}',1)">+</button>
        </div>
      </div>
      <button class="cart-item-del" onclick="removeFromCart('${escHtml(item.codigo)}')">🗑️</button>
    </div>`).join('')

  document.getElementById('cart-total').textContent = 'Consultar'
}

/* ─────────────────────────────────────────────
   EVENT LISTENERS
───────────────────────────────────────────── */
document.getElementById('cart-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeCart()
})

document.getElementById('btn-cotizar-cart').addEventListener('click', () => {
  closeCart()
  showPage('page-contacto')
  const prodField = document.getElementById('producto-interes')
  if (prodField && cart.length > 0) {
    prodField.value = cart.map(i => `[${i.codigo}] ${i.nombre.substring(0, 30)}`).join(', ')
  }
})

/* ─────────────────────────────────────────────
   EXPONER EN WINDOW para onclick inline en HTML
───────────────────────────────────────────── */
window.addToCart      = addToCart
window.removeFromCart = removeFromCart
window.updateCartQty  = updateCartQty
window.openCart       = openCart
window.closeCart      = closeCart
