/* =============================================
   VMA INDUSTRIAL – productos.js
   Responsabilidad: Renderizado del catálogo,
   sidebar, filtros, búsqueda, modal de producto.
   Depende de: catalogo.js, carrito.js, router.js
   ============================================= */

/* -----------------------------------------------
   CATÁLOGO DE PRODUCTOS (inyectado desde catalogo.js)
----------------------------------------------- */
/* La variable `catalogo` se carga desde catalogo.js */

/* Estado de la vista de productos */
const state = {
  activeCat: null,
  activeSub: null,
  search: '',
  filterCat: '',
  filterSub: ''
};

/* Iconos por categoría */
const catIcons = {
  'Gases':             '⚗️',
  'Soldaduras':        '🔧',
  'Herramientas':      '🔨',
  'Accesorios':        '⚙️',
  'Calzado de Seguridad':'👢',
  'Cuidados Personales':'🧴',
  'Limpieza':          '🧹',
  'Ropa':              '🦺',
  'Servicio':          '🛠️',
};
const defaultIcon = '📦';

/* Inicializar página de productos */
function initProductos() {
  renderSidebar();
  renderProductos();
  initSearch();
  initFilters();
}

/* --- SIDEBAR --- */
function renderSidebar() {
  const sidebar = document.getElementById('cat-sidebar');
  if (!sidebar) return;
  let html = '<div class="sidebar-title">Categorías</div>';

  Object.keys(catalogo).sort().forEach(cat => {
    const totalCat = Object.values(catalogo[cat]).reduce((s, a) => s + a.length, 0);
    const subs = Object.keys(catalogo[cat]).sort();
    const isActive = state.activeCat === cat;
    html += `
      <div class="cat-sidebar-item">
        <button class="cat-sidebar-btn ${isActive ? 'active' : ''}" onclick="filterByCat('${escHtml(cat)}')" data-cat="${escHtml(cat)}">
          <span>${catIcons[cat] || defaultIcon} ${escHtml(cat)}</span>
          <span class="badge">${totalCat}</span>
        </button>
        <div class="sub-sidebar-list ${isActive ? 'open' : ''}">
          ${subs.map(sub => {
            const cnt = catalogo[cat][sub].length;
            const isSub = state.activeCat === cat && state.activeSub === sub;
            return `<button class="sub-sidebar-btn ${isSub ? 'active' : ''}" onclick="filterBySub('${escHtml(cat)}','${escHtml(sub)}')" data-sub="${escHtml(sub)}">
              <span>${escHtml(sub)}</span>
              <span>${cnt}</span>
            </button>`;
          }).join('')}
        </div>
      </div>`;
  });

  sidebar.innerHTML = html;
}

function filterByCat(cat) {
  if (state.activeCat === cat && !state.activeSub) {
    state.activeCat = null;
    state.activeSub = null;
  } else {
    state.activeCat = cat;
    state.activeSub = null;
  }
  state.filterCat = state.activeCat || '';
  state.filterSub = '';
  const selCat = document.getElementById('filter-cat');
  const selSub = document.getElementById('filter-sub');
  if (selCat) selCat.value = state.filterCat;
  updateSubFilter(state.filterCat);
  if (selSub) selSub.value = '';
  renderSidebar();
  renderProductos();
}

function filterBySub(cat, sub) {
  state.activeCat = cat;
  state.activeSub = sub;
  state.filterCat = cat;
  state.filterSub = sub;
  const selCat = document.getElementById('filter-cat');
  if (selCat) selCat.value = cat;
  updateSubFilter(cat);
  const selSub = document.getElementById('filter-sub');
  if (selSub) selSub.value = sub;
  renderSidebar();
  renderProductos();
}

/* --- FILTROS TOOLBAR --- */
function initFilters() {
  const selCat = document.getElementById('filter-cat');
  const selSub = document.getElementById('filter-sub');
  if (!selCat) return;

  // Llenar opciones categoría
  selCat.innerHTML = '<option value="">Todas las categorías</option>';
  Object.keys(catalogo).sort().forEach(cat => {
    selCat.innerHTML += `<option value="${escHtml(cat)}">${escHtml(cat)}</option>`;
  });

  selCat.addEventListener('change', () => {
    state.filterCat = selCat.value;
    state.activeCat = selCat.value || null;
    state.activeSub = null;
    state.filterSub = '';
    updateSubFilter(selCat.value);
    if (selSub) selSub.value = '';
    renderSidebar();
    renderProductos();
  });

  selSub.addEventListener('change', () => {
    state.filterSub = selSub.value;
    state.activeSub = selSub.value || null;
    renderSidebar();
    renderProductos();
  });
}

function updateSubFilter(cat) {
  const selSub = document.getElementById('filter-sub');
  if (!selSub) return;
  selSub.innerHTML = '<option value="">Todas las subcategorías</option>';
  selSub.disabled = !cat;
  if (cat && catalogo[cat]) {
    Object.keys(catalogo[cat]).sort().forEach(sub => {
      selSub.innerHTML += `<option value="${escHtml(sub)}">${escHtml(sub)}</option>`;
    });
  }
}

/* --- BÚSQUEDA --- */
function initSearch() {
  const inp = document.getElementById('search-prod');
  if (!inp) return;
  inp.addEventListener('input', () => {
    state.search = inp.value.trim().toLowerCase();
    renderProductos();
  });
}

/* --- RENDER PRODUCTOS --- */
function renderProductos() {
  const container = document.getElementById('productos-container');
  if (!container) return;

  const { search, filterCat, filterSub } = state;
  let totalVisible = 0;
  let html = '';

  // Iterar categorías
  const cats = filterCat ? [filterCat] : Object.keys(catalogo).sort();

  cats.forEach(cat => {
    if (!catalogo[cat]) return;
    const subs = filterSub ? [filterSub] : Object.keys(catalogo[cat]).sort();
    let catHtml = '';
    let catTotal = 0;

    subs.forEach(sub => {
      const productos = catalogo[cat][sub] || [];
      // Filtrar por búsqueda
      const filtrados = search
        ? productos.filter(p =>
            p.nombre.toLowerCase().includes(search) ||
            p.codigo.toLowerCase().includes(search))
        : productos;

      if (filtrados.length === 0) return;
      catTotal += filtrados.length;
      totalVisible += filtrados.length;

      // Render subcategoría
      catHtml += `
        <div class="sub-bloque" data-sub="${escHtml(sub)}">
          <div class="sub-header" onclick="toggleSub(this)">
            <h3>${escHtml(sub)}</h3>
            <span class="sub-count">${filtrados.length} producto${filtrados.length !== 1 ? 's' : ''}</span>
            <span class="sub-toggle">▼</span>
          </div>
          <div class="sub-body">
            <div class="prod-grid">
              ${filtrados.map(p => renderProdCard(cat, sub, p)).join('')}
            </div>
          </div>
        </div>`;
    });

    if (catTotal === 0) return;

    html += `
      <div class="cat-bloque" data-cat="${escHtml(cat)}">
        <div class="cat-header" onclick="toggleCat(this)">
          <span>${catIcons[cat] || defaultIcon}</span>
          <h2>${escHtml(cat)}</h2>
          <span class="cat-total">${catTotal} producto${catTotal !== 1 ? 's' : ''}</span>
          <span class="cat-toggle">▼</span>
        </div>
        <div class="cat-body">${catHtml}</div>
      </div>`;
  });

  if (html === '') {
    html = `<div class="no-results">
      <div class="icon">🔍</div>
      <h3>Sin resultados</h3>
      <p>No se encontraron productos con los filtros actuales.</p>
    </div>`;
  }

  container.innerHTML = html;

  // Actualizar contador
  const counter = document.getElementById('prod-count');
  if (counter) counter.textContent = `${totalVisible} producto${totalVisible !== 1 ? 's' : ''}`;
}

function renderProdCard(cat, sub, p) {
  return `
    <div class="prod-card" onclick="openModal('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}')">
      <div class="prod-img">📦</div>
      <div class="prod-info">
        <div class="prod-codigo">#${escHtml(p.codigo)}</div>
        <div class="prod-nombre">${escHtml(p.nombre)}</div>
        <div class="prod-precio">Precio: ${escHtml(p.precio)}</div>
        <button class="prod-btn-add" onclick="event.stopPropagation(); addToCart('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}',1)">
          + Agregar al carrito
        </button>
      </div>
    </div>`;
}

/* Toggle acordeón */
function toggleCat(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
}
function toggleSub(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
}

/* -----------------------------------------------
   MODAL DE PRODUCTO
----------------------------------------------- */
function openModal(codigo, cat, sub) {
  // Buscar producto
  const prod = findProduct(codigo, cat, sub);
  if (!prod) return;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Llenar datos
  document.getElementById('modal-badge').textContent = `${cat} > ${sub}`;
  document.getElementById('modal-title').textContent = prod.nombre;
  document.getElementById('modal-codigo').textContent = prod.codigo;
  document.getElementById('modal-cat').textContent = cat;
  document.getElementById('modal-sub').textContent = sub;
  document.getElementById('modal-desc').textContent = prod.descripcion;
  document.getElementById('modal-precio').textContent = prod.precio;
  document.getElementById('modal-qty').value = 1;

  // Distribuidor / stock
  const metaEl = document.getElementById('modal-meta');
  let metaHtml = '';
  if (prod.distribuidor) metaHtml += `Distribuidor: <span>${escHtml(prod.distribuidor)}</span> &nbsp;`;
  if (prod.stock) metaHtml += `Stock: <span>${escHtml(prod.stock)}</span>`;
  metaEl.innerHTML = metaHtml || 'Consulte disponibilidad.';

  // Botón carrito del modal
  document.getElementById('modal-add-cart').onclick = () => {
    const qty = parseInt(document.getElementById('modal-qty').value) || 1;
    addToCart(codigo, cat, sub, qty);
    closeModal();
  };

  // Productos relacionados (placeholder)
  const relGrid = document.getElementById('rel-grid');
  const relProds = (catalogo[cat][sub] || []).filter(p => p.codigo !== codigo).slice(0, 3);
  relGrid.innerHTML = relProds.length > 0
    ? relProds.map(p => `<div class="rel-item" onclick="closeModal();setTimeout(()=>openModal('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}'),100)">
        <div style="font-size:1.3rem;margin-bottom:4px">📦</div>
        <div style="font-size:0.75rem;font-weight:600">${escHtml(p.nombre.substring(0,30))}${p.nombre.length>30?'...':''}</div>
      </div>`).join('')
    : '<div class="rel-item">Lorem Ipsum Dolor</div><div class="rel-item">Lorem Ipsum Dolor</div><div class="rel-item">Lorem Ipsum Dolor</div>';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Controles cantidad modal
document.getElementById('qty-minus').addEventListener('click', () => {
  const inp = document.getElementById('modal-qty');
  if (parseInt(inp.value) > 1) inp.value = parseInt(inp.value) - 1;
});
document.getElementById('qty-plus').addEventListener('click', () => {
  const inp = document.getElementById('modal-qty');
  inp.value = parseInt(inp.value) + 1;
});

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

function findProduct(codigo, cat, sub) {
  if (catalogo[cat] && catalogo[cat][sub]) {
    return catalogo[cat][sub].find(p => p.codigo === codigo) || null;
  }
  // Buscar en todo el catálogo
  for (const c of Object.keys(catalogo)) {
    for (const s of Object.keys(catalogo[c])) {
      const found = catalogo[c][s].find(p => p.codigo === codigo);
      if (found) return found;
    }
  }
  return null;
}
