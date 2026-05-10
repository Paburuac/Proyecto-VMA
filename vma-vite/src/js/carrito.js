/* =============================================
   VMA INDUSTRIAL – carrito.js
   Responsabilidad: Gestión del carrito de compras
   (agregar, eliminar, actualizar cantidades,
   drawer UI, cotización).
   Depende de: catalogo.js, productos.js
   ============================================= */

/* -----------------------------------------------
   CARRITO
----------------------------------------------- */
let cart = []; // { codigo, cat, sub, nombre, cantidad }

function addToCart(codigo, cat, sub, qty = 1) {
  const prod = findProduct(codigo, cat, sub);
  if (!prod) return;

  const existing = cart.find(i => i.codigo === codigo);
  if (existing) {
    existing.cantidad += qty;
  } else {
    cart.push({
      codigo: prod.codigo,
      nombre: prod.nombre,
      cat, sub,
      cantidad: qty,
      precio: prod.precio
    });
  }
  updateCartUI();
  showToast(`✅ "${prod.nombre.substring(0,30)}..." agregado al carrito`);
}

function removeFromCart(codigo) {
  cart = cart.filter(i => i.codigo !== codigo);
  updateCartUI();
  renderCart();
}

function updateCartQty(codigo, delta) {
  const item = cart.find(i => i.codigo === codigo);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) removeFromCart(codigo);
  else { updateCartUI(); renderCart(); }
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.cantidad, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total-items').textContent = count;
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <p>Tu carrito está vacío.</p>
      </div>`;
    document.getElementById('cart-total').textContent = 'Consultar';
    return;
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
    </div>`).join('');

  document.getElementById('cart-total').textContent = 'Consultar';
}

document.getElementById('cart-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeCart();
});

// Acción "Solicitar cotización" desde carrito
document.getElementById('btn-cotizar-cart').addEventListener('click', () => {
  closeCart();
  showPage('page-contacto');
  // Pre-llenar campo "Producto de interés"
  const prodField = document.getElementById('producto-interes');
  if (prodField && cart.length > 0) {
    prodField.value = cart.map(i => `[${i.codigo}] ${i.nombre.substring(0,30)}`).join(', ');
  }
});
