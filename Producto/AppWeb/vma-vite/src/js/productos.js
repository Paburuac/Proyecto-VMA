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

/* Estado compartido global */
const state = window.state || {
  activeCat: null,
  activeSub: null,
  search: '',
  filterCat: '',
  filterSub: ''
};
window.state = state;

/* Iconos por categoría */
const catIcons = {
  'Gases': '⚗️',
  'Soldaduras': '🔧',
  'Herramientas': '🔨',
  'Accesorios': '⚙️',
  'Calzado de Seguridad':'👢',
  'Cuidados Personales':'🧴',
  'Limpieza': '🧹',
  'Ropa': '🦺',
  'Servicio': '🛠️',
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
/* ─── BÚSQUEDA DESDE SUPABASE (con debounce) ─── */
let searchDebounceTimer = null

function initSearch() {
  const inp = document.getElementById('search-prod')
  if (!inp) return

  inp.addEventListener('input', () => {
    const valor = inp.value.trim()
    state.search = valor.toLowerCase()

    clearTimeout(searchDebounceTimer)

    // Si está vacío, volver al catálogo completo en memoria
    if (!valor) {
      renderProductos()
      return
    }

    // Mostrar indicador de búsqueda
    const container = document.getElementById('productos-container')
    if (container) {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem;color:var(--gris-texto)">
          <div class="search-spinner"></div>
          <p>Buscando <strong>"${escHtml(valor)}"</strong>...</p>
        </div>`
    }

    // Debounce 350ms para no lanzar query en cada tecla
    searchDebounceTimer = setTimeout(async () => {
      await ejecutarBusqueda(valor)
    }, 350)
  })
}

async function ejecutarBusqueda(texto) {
  const container = document.getElementById('productos-container')
  if (!container) return

  const { data, error } = await window.productoService.buscarProductos(texto)

  if (error || !data) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:#cc3333">❌ Error al buscar. Intenta de nuevo.</div>`
    return
  }

  if (data.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem 2rem;color:var(--gris-texto)">
        <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
        <p>No se encontraron productos para <strong>"${escHtml(texto)}"</strong>.</p>
        <button onclick="limpiarBusqueda()" style="margin-top:1rem;padding:0.5rem 1.5rem;background:var(--verde);color:var(--blanco);border:none;border-radius:20px;cursor:pointer;font-weight:700">Ver todos los productos</button>
      </div>`
    return
  }

  // Construir catalogo temporal con los resultados
  const catalogoTemp = window.productoService.construirCatalogo(data)

  // Renderizar con el catálogo temporal
  let totalVisible = 0
  let html = ''

  Object.keys(catalogoTemp).sort().forEach(cat => {
    const subs = Object.keys(catalogoTemp[cat]).sort()
    let catHtml = ''
    let catTotal = 0

    subs.forEach(sub => {
      const filtrados = catalogoTemp[cat][sub] || []
      if (filtrados.length === 0) return
      catTotal += filtrados.length
      totalVisible += filtrados.length

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
        </div>`
    })

    if (catHtml) {
      html += `
        <div class="cat-bloque" data-cat="${escHtml(cat)}">
          <div class="cat-header">
            <h2>${catIcons[cat] || defaultIcon} ${escHtml(cat)}</h2>
            <span class="cat-count">${catTotal} producto${catTotal !== 1 ? 's' : ''}</span>
          </div>
          ${catHtml}
        </div>`
    }
  })

  const resumen = `
    <div class="search-resumen">
      🔍 <strong>${totalVisible}</strong> resultado${totalVisible !== 1 ? 's' : ''} para "<em>${escHtml(texto)}</em>"
      &nbsp;·&nbsp;
      <button onclick="limpiarBusqueda()" class="search-limpiar-btn">✕ Limpiar búsqueda</button>
    </div>`

  container.innerHTML = resumen + html
}

window.limpiarBusqueda = function() {
  const inp = document.getElementById('search-prod')
  if (inp) inp.value = ''
  state.search = ''
  clearTimeout(searchDebounceTimer)
  renderProductos()
}

/* --- RENDER PRODUCTOS --- */
function renderProductos() {
  const container = document.getElementById('productos-container');
  if (!container) return;

  const { search, filterCat, filterSub } = state;
  let totalVisible = 0;
  let html = '';

  const cats = filterCat ? [filterCat] : Object.keys(catalogo).sort();
  cats.forEach(cat => {
    if (!catalogo[cat]) return;
    const subs = filterSub ? [filterSub] : Object.keys(catalogo[cat]).sort();
    let catHtml = '';
    let catTotal = 0;

    subs.forEach(sub => {
      const productos = catalogo[cat][sub] || [];
      const palabras = search ? search.split(/\s+/).filter(w => w.length > 0) : []
      const filtrados = palabras.length > 0
        ? productos.filter(p =>
            palabras.every(w =>
              p.nombre.toLowerCase().includes(w) ||
              p.codigo.toLowerCase().includes(w)
            ))
        : productos;

      if (filtrados.length === 0) return;
      catTotal += filtrados.length;
      totalVisible += filtrados.length;

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

  const counter = document.getElementById('prod-count');
  if (counter) counter.textContent = `${totalVisible} producto${totalVisible !== 1 ? 's' : ''}`;
}

/* Renderiza una card de producto */
function renderProdCard(cat, sub, p) {
  const imgHtml = p.imagen_url
    ? `<img src="${escHtml(p.imagen_url)}" alt="${escHtml(p.nombre)}"
          style="width:100%;height:100%;object-fit:contain;border-radius:4px"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const fallbackStyle = p.imagen_url ? 'display:none' : 'display:flex';
  const variantesBadge = p.tiene_variantes
    ? `<div class="prod-variantes-badge">Múltiples medidas disponibles</div>`
    : '';

  return `
    <div class="prod-card" onclick="openModal('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}')">
      <div class="prod-img" style="position:relative;overflow:hidden">
        ${imgHtml}
        <span class="prod-img-fallback" style="${fallbackStyle};align-items:center;justify-content:center;width:100%;height:100%;font-size:2rem">📦</span>
      </div>
      <div class="prod-info">
        <div class="prod-codigo">#${escHtml(p.codigo)}</div>
        <div class="prod-nombre">${escHtml(p.nombre)}</div>
        ${variantesBadge}
        <div class="prod-precio">Precio: ${escHtml(p.precio)}</div>
        <button class="prod-btn-add" onclick="event.stopPropagation(); openModal('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}')">
          ${p.tiene_variantes ? 'Ver medidas' : '+ Agregar al carrito'}
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

// Código actualmente seleccionado en el modal (puede cambiar al elegir variante)
let _modalCodigoActual = ''

async function openModal(codigo, cat, sub) {
  const prod = findProduct(codigo, cat, sub);
  if (!prod) return;

  _modalCodigoActual = prod.codigo

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  document.getElementById('modal-badge').textContent = `${cat} > ${sub}`;
  document.getElementById('modal-title').textContent = prod.nombre;
  document.getElementById('modal-codigo').textContent = prod.codigo;
  document.getElementById('modal-cat').textContent = cat;
  document.getElementById('modal-sub').textContent = sub;
  document.getElementById('modal-desc').textContent = prod.descripcion;
  document.getElementById('modal-precio').textContent = prod.precio;
  document.getElementById('modal-qty').value = 1;

  // Imagen
  const modalImgEl = document.getElementById('modal-img');
  if (modalImgEl) {
    if (prod.imagen_url) {
      modalImgEl.innerHTML = `<img src="${escHtml(prod.imagen_url)}" alt="${escHtml(prod.nombre)}"
        style="width:100%;height:100%;object-fit:contain;border-radius:8px"
        onerror="this.parentElement.innerHTML='<span style=\\'font-size:4rem\\'>📦</span>'">`;
    } else {
      modalImgEl.innerHTML = '<span style="font-size:4rem">📦</span>';
    }
  }

  // Meta (distribuidor / stock)
  const metaEl = document.getElementById('modal-meta');
  let metaHtml = '';
  if (prod.distribuidor) metaHtml += `Distribuidor: <span>${escHtml(prod.distribuidor)}</span> &nbsp;`;
  if (prod.stock) metaHtml += `Stock: <span>${escHtml(prod.stock)}</span>`;
  metaEl.innerHTML = metaHtml || 'Consulte disponibilidad.';

  // ── Selector de variantes ────────────────────────────────────
  const medidaWrap = document.getElementById('modal-medidas-wrap');
  if (medidaWrap) {
    if (prod.tiene_variantes) {
      // Mostrar spinner mientras cargan las variantes
      medidaWrap.innerHTML = `
        <div class="modal-medida-label">Medida / Variante</div>
        <select class="modal-medida-select" disabled>
          <option>Cargando variantes…</option>
        </select>`;
      medidaWrap.style.display = 'block';

      const { data: variantes, error } = await window.productoService.obtenerVariantes(prod.id_producto)

      if (error || !variantes?.length) {
        medidaWrap.innerHTML = '';
        medidaWrap.style.display = 'none';
      } else {
        const opts = variantes.map(v =>
          `<option value="${escHtml(v.codigo)}"
                   data-precio="${v.precio ?? ''}"
                   ${v.codigo === prod.codigo ? 'selected' : ''}>
             ${escHtml(v.label_variante || v.codigo)}
           </option>`
        ).join('');
        medidaWrap.innerHTML = `
          <div class="modal-medida-label">Medida / Variante</div>
          <select id="modal-medida-select" class="modal-medida-select">
            ${opts}
          </select>`;

        const sel = document.getElementById('modal-medida-select')
        sel.addEventListener('change', function () {
          const opt = this.options[this.selectedIndex]
          _modalCodigoActual = this.value
          document.getElementById('modal-codigo').textContent = this.value
          // Actualizar precio si la variante tiene precio propio
          const precioVariante = opt.dataset.precio
          if (precioVariante) {
            document.getElementById('modal-precio').textContent = precioVariante
          }
        })
      }
    } else {
      medidaWrap.innerHTML = '';
      medidaWrap.style.display = 'none';
    }
  }

  document.getElementById('modal-add-cart').onclick = () => {
    const qty = parseInt(document.getElementById('modal-qty').value) || 1;
    addToCart(_modalCodigoActual, cat, sub, qty);
    closeModal();
  };

  // Productos relacionados
  const relGrid = document.getElementById('rel-grid');
  const relProds = (catalogo[cat][sub] || []).filter(p => p.codigo !== codigo).slice(0, 3);
  relGrid.innerHTML = relProds.length > 0
    ? relProds.map(p => {
        const thumb = p.imagen_url
          ? `<img src="${escHtml(p.imagen_url)}" alt="${escHtml(p.nombre)}"
               style="width:48px;height:48px;object-fit:contain;margin-bottom:4px"
               onerror="this.style.display='none'">`
          : `<div style="font-size:1.3rem;margin-bottom:4px">📦</div>`;
        return `<div class="rel-item" onclick="closeModal();setTimeout(()=>openModal('${escHtml(p.codigo)}','${escHtml(cat)}','${escHtml(sub)}'),100)">
          ${thumb}
          <div style="font-size:0.75rem;font-weight:600">${escHtml(p.nombre.substring(0,30))}${p.nombre.length>30?'...':''}</div>
        </div>`;
      }).join('')
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
  for (const c of Object.keys(catalogo)) {
    for (const s of Object.keys(catalogo[c])) {
      const found = catalogo[c][s].find(p => p.codigo === codigo);
      if (found) return found;
    }
  }
  return null;
}

window.initProductos    = initProductos;
window.renderSidebar    = renderSidebar;
window.renderProductos  = renderProductos;
window.initSearch       = initSearch;
window.initFilters      = initFilters;
window.updateSubFilter  = updateSubFilter;
window.filterByCat      = filterByCat;
window.filterBySub      = filterBySub;
window.renderProdCard   = renderProdCard;
window.toggleCat        = toggleCat;
window.toggleSub        = toggleSub;
window.openModal        = openModal;
window.closeModal       = closeModal;
window.findProduct      = findProduct;
