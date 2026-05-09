/* =============================================
   VMA INDUSTRIAL – router.js
   Responsabilidad: Navegación SPA entre páginas
   y toggle del menú móvil.
   ============================================= */

/* -----------------------------------------------
   NAVEGACIÓN SPA
----------------------------------------------- */
function showPage(id) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Mostrar la página seleccionada
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Actualizar nav activo
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  // Cerrar menú móvil
  document.querySelector('.nav-mobile').classList.remove('open');
  // Si es productos, inicializar vista
  if (id === 'page-productos') {
    initProductos();
  }
}

/* -----------------------------------------------
   HAMBURGER
----------------------------------------------- */
document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.nav-mobile').classList.toggle('open');
});
