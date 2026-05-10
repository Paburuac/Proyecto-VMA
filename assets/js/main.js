/* =============================================
   VMA INDUSTRIAL – main.js
   Responsabilidad: Punto de entrada de la app.
   Inicializa el grid de categorías en el home
   y expone goToCategoria() para navegación directa
   a una categoría desde cualquier página.
   
   Orden de carga requerido en index.html:
     1. catalogo.js
     2. router.js
     3. productos.js
     4. carrito.js
     5. validaciones.js
     6. main.js   ← este archivo (último)
   ============================================= */

/* -----------------------------------------------
   CATEGORÍAS INICIO
----------------------------------------------- */
function renderCatGrid() {
  const grid = document.getElementById('cat-grid-inicio');
  if (!grid) return;
  let html = '';
  Object.keys(catalogo).sort().forEach(cat => {
    const total = Object.values(catalogo[cat]).reduce((s, a) => s + a.length, 0);
    html += `
      <div class="cat-card" onclick="goToCategoria('${escHtml(cat)}')">
        <div class="cat-icon">${catIcons[cat] || defaultIcon}</div>
        <div class="cat-name">${escHtml(cat)}</div>
        <div class="cat-count">${total} productos</div>
      </div>`;
  });
  grid.innerHTML = html;
}

function goToCategoria(cat) {
  state.activeCat = cat;
  state.activeSub = null;
  state.filterCat = cat;
  state.filterSub = '';
  showPage('page-productos');
}

/* -----------------------------------------------
   INICIO
   La inicialización (renderCatGrid) ya NO ocurre
   aquí en el DOMContentLoaded legacy.
   src/app.js la llama DESPUÉS de que Supabase
   haya cargado los datos y poblado window.catalogo.
----------------------------------------------- */
// Inicialización delegada a src/app.js → inicializarApp()
