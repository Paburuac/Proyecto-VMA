/* =============================================
   VMA INDUSTRIAL – validaciones.js
   Responsabilidad: Validación de formularios
   (contacto, registro, login) y funciones
   utilitarias compartidas (escHtml, isValidEmail,
   showToast).
   ============================================= */

/* -----------------------------------------------
   FORMULARIO CONTACTO / COTIZACIÓN
   Guarda la solicitud en Supabase (tabla cotizaciones).
   Si el usuario está logueado, pre-llena sus datos.
   Los productos del carrito se adjuntan automáticamente.
----------------------------------------------- */
document.getElementById('form-contacto').addEventListener('submit', async function (e) {
  e.preventDefault()
  let valid = true

  // ── Validaciones visuales ────────────────────
  const camposReq = ['nombre-c', 'empresa-c', 'correo-c', 'tel-c', 'mensaje-c']
  camposReq.forEach(id => {
    const input = document.getElementById(id)
    const err   = document.getElementById(`err-${id}`)
    if (!input) return
    if (!input.value.trim()) {
      if (err) { err.textContent = 'Este campo es obligatorio.'; err.classList.add('show') }
      valid = false
    } else if (id === 'correo-c' && !isValidEmail(input.value)) {
      if (err) { err.textContent = 'Ingrese un correo válido.'; err.classList.add('show') }
      valid = false
    } else {
      if (err) err.classList.remove('show')
    }
  })

  if (!valid) return

  // ── Preparar datos ───────────────────────────
  const btn = this.querySelector('button[type="submit"]')
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...' }

  // Obtener productos del carrito actual
  const productosCarrito = typeof cart !== 'undefined'
    ? cart.map(i => ({
        codigo:   i.codigo,
        nombre:   i.nombre,
        cantidad: i.cantidad,
        precio:   i.precio,
      }))
    : []

  // Si el campo producto-interes tiene texto adicional, incluirlo en el mensaje
  const productoInteres = document.getElementById('producto-interes')?.value?.trim()

  const datos = {
    nombre:   document.getElementById('nombre-c').value.trim(),
    empresa:  document.getElementById('empresa-c').value.trim(),
    email:    document.getElementById('correo-c').value.trim(),
    telefono: document.getElementById('tel-c').value.trim(),
    mensaje:  document.getElementById('mensaje-c').value.trim() +
              (productoInteres ? `\n\nProducto de interés: ${productoInteres}` : ''),
    productos_solicitados: productosCarrito,
  }

  // ── Enviar a Supabase ────────────────────────
  if (typeof window.cotizacionService?.enviarCotizacion !== 'function') {
    console.error('[VMA] cotizacionService no disponible')
    if (btn) { btn.disabled = false; btn.textContent = 'Enviar solicitud' }
    return
  }

  const { data, error } = await window.cotizacionService.enviarCotizacion(datos)

  if (btn) { btn.disabled = false; btn.textContent = 'Enviar solicitud' }

  if (error) {
    console.error('[VMA] Error al enviar cotización:', error)
    showToast('❌ Error al enviar. Intenta nuevamente.')
    return
  }

  // ── Éxito ────────────────────────────────────
  this.reset()
  document.getElementById('success-contacto').classList.add('show')
  setTimeout(() => {
    document.getElementById('success-contacto').classList.remove('show')
  }, 5000)

  console.log('[VMA] Cotización guardada – id:', data?.id)
})

/* -----------------------------------------------
   FORMULARIO REGISTRO – conectado a Supabase Auth
   Crea usuario en Auth + inserta perfil en usuarios
   con rol cliente (rol_id = 3).
----------------------------------------------- */
document.getElementById('form-registro').addEventListener('submit', async function (e) {
  e.preventDefault()
  let valid = true

  const nombre   = document.getElementById('reg-nombre')
  const telefono = document.getElementById('reg-telefono')
  const correo   = document.getElementById('reg-correo')
  const pass     = document.getElementById('reg-pass')
  const pass2    = document.getElementById('reg-pass2')

  // ── Validaciones visuales ────────────────────
  const errNombre = document.getElementById('err-reg-nombre')
  if (!nombre.value.trim()) {
    errNombre.textContent = 'El nombre es obligatorio.'
    errNombre.classList.add('show')
    valid = false
  } else {
    errNombre.classList.remove('show')
  }

  const errCorreo = document.getElementById('err-reg-correo')
  if (!isValidEmail(correo.value)) {
    errCorreo.textContent = 'Ingrese un correo válido.'
    errCorreo.classList.add('show')
    valid = false
  } else {
    errCorreo.classList.remove('show')
  }

  const errPass = document.getElementById('err-reg-pass')
  if (pass.value.length < 6) {
    errPass.textContent = 'La contraseña debe tener al menos 6 caracteres.'
    errPass.classList.add('show')
    valid = false
  } else {
    errPass.classList.remove('show')
  }

  const errPass2 = document.getElementById('err-reg-pass2')
  if (pass.value !== pass2.value) {
    errPass2.textContent = 'Las contraseñas no coinciden.'
    errPass2.classList.add('show')
    valid = false
  } else {
    errPass2.classList.remove('show')
  }

  if (!valid) return

  // ── Llamar a Supabase ────────────────────────
  const errorMsg = document.getElementById('registro-error-msg')
  const btn      = document.getElementById('btn-registro-submit')

  // Limpiar error previo y mostrar loading
  if (errorMsg) { errorMsg.style.display = 'none'; errorMsg.textContent = '' }
  if (btn) { btn.disabled = true; btn.textContent = 'Creando cuenta...' }

  // registrarCliente está disponible via window (exportado en auth.js)
  if (typeof window.registrarCliente !== 'function') {
    console.error('[VMA] registrarCliente no disponible – verifica que auth.js está cargado')
    if (btn) { btn.disabled = false; btn.textContent = 'Crear cuenta' }
    return
  }

  const { data, error } = await window.registrarCliente({
    nombre:   nombre.value.trim(),
    telefono: telefono.value.trim(),
    email:    correo.value.trim(),
    password: pass.value,
  })

  if (btn) { btn.disabled = false; btn.textContent = 'Crear cuenta' }

  if (error) {
    const msg = traducirErrorRegistro(error.message)
    if (errorMsg) { errorMsg.textContent = msg; errorMsg.style.display = 'block' }
    return
  }

  // ── Éxito ────────────────────────────────────
  this.reset()
  if (errorMsg) errorMsg.style.display = 'none'
  document.getElementById('success-registro').classList.add('show')
  setTimeout(() => {
    document.getElementById('success-registro').classList.remove('show')
    showPage('page-login')
  }, 2500)
})

/* Traducción de errores de registro */
function traducirErrorRegistro(msg) {
  if (!msg) return 'Error al crear la cuenta. Intenta nuevamente.'
  const m = msg.toLowerCase()
  if (m.includes('already registered') || m.includes('already exists') || m.includes('duplicate'))
    return 'Este correo ya está registrado. Intenta iniciar sesión.'
  if (m.includes('password should be'))
    return 'La contraseña debe tener al menos 6 caracteres.'
  if (m.includes('unable to validate email'))
    return 'El formato del correo no es válido.'
  if (m.includes('signup is disabled'))
    return 'El registro está temporalmente deshabilitado.'
  return msg
}

/* -----------------------------------------------
   FORMULARIO LOGIN – conectado a Supabase Auth
   La validación visual permanece; el submit real
   delega a handleLogin() definido en src/js/auth.js
----------------------------------------------- */
document.getElementById('form-login').addEventListener('submit', async function (e) {
  e.preventDefault();
  let valid = true;

  const correo = document.getElementById('login-correo');
  const pass   = document.getElementById('login-pass');

  // Validación visual básica antes de llamar a Supabase
  const errC = document.getElementById('err-login-correo');
  if (!isValidEmail(correo.value)) {
    errC.textContent = 'Ingrese un correo válido.'; errC.classList.add('show'); valid = false;
  } else { errC.classList.remove('show'); }

  const errP = document.getElementById('err-login-pass');
  if (!pass.value) {
    errP.textContent = 'Ingrese su contraseña.'; errP.classList.add('show'); valid = false;
  } else { errP.classList.remove('show'); }

  if (!valid) return;

  // Llamar a handleLogin() de auth.js (disponible en window)
  if (typeof window.handleLogin === 'function') {
    await window.handleLogin(correo.value.trim(), pass.value);
  } else {
    console.error('[VMA] handleLogin no disponible – verifica que auth.js está cargado');
  }
});

/* -----------------------------------------------
   UTILIDADES
----------------------------------------------- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(msg) {
  // Remover toast previo si existe
  const prev = document.querySelector('.toast');
  if (prev) prev.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// Exponer globalmente para que auth.js y otros módulos puedan usarla
window.showToast = showToast;

/* -----------------------------------------------
   PRE-LLENAR FORMULARIO DE CONTACTO
   Cuando el usuario navega a la página de contacto:
   - Si está logueado, pre-llena nombre, email y teléfono
   - Si hay productos en el carrito, los muestra en el form
   Llamado desde router.js al mostrar page-contacto.
----------------------------------------------- */
function prellenarFormContacto() {
  // Pre-llenar con datos del usuario logueado
  if (window.authState?.loggedIn && window.authState?.perfil) {
    const perfil = window.authState.perfil
    const nombreField  = document.getElementById('nombre-c')
    const correoField  = document.getElementById('correo-c')
    const telField     = document.getElementById('tel-c')

    if (nombreField && !nombreField.value) nombreField.value = perfil.nombre  || ''
    if (correoField && !correoField.value) correoField.value = perfil.email   || ''
    if (telField    && !telField.value)    telField.value    = perfil.telefono || ''
  }

  // Mostrar productos del carrito si hay alguno
  const infoBox  = document.getElementById('cotizacion-productos-info')
  const listaEl  = document.getElementById('cotizacion-productos-lista')
  const prodField = document.getElementById('producto-interes')

  const itemsCarrito = typeof cart !== 'undefined' ? cart : []

  if (itemsCarrito.length > 0 && infoBox && listaEl) {
    infoBox.style.display = 'block'
    listaEl.innerHTML = itemsCarrito.map(i =>
      `• [${escHtml(i.codigo)}] ${escHtml(i.nombre.substring(0, 50))} × ${i.cantidad}`
    ).join('<br>')

    // Pre-llenar campo producto de interés
    if (prodField && !prodField.value) {
      prodField.value = itemsCarrito
        .map(i => `[${i.codigo}] ${i.nombre.substring(0, 30)}`)
        .join(', ')
    }
  } else if (infoBox) {
    infoBox.style.display = 'none'
  }
}
window.prellenarFormContacto = prellenarFormContacto

/* -----------------------------------------------
   PRE-LLENAR FORMULARIO DE COTIZACIÓN
   Llamado desde carrito.js con los items actuales.
   Recibe el array de items directamente para evitar
   problemas de timing con la variable cart.
----------------------------------------------- */
function prellenarFormCotizacion(items) {
  // Pre-llenar con datos del usuario logueado
  if (window.authState?.loggedIn && window.authState?.perfil) {
    const perfil = window.authState.perfil
    const nombreField = document.getElementById('nombre-c')
    const correoField = document.getElementById('correo-c')
    const telField    = document.getElementById('tel-c')
    if (nombreField) nombreField.value = perfil.nombre   || ''
    if (correoField) correoField.value = perfil.email    || ''
    if (telField)    telField.value    = perfil.telefono || ''
  }

  // Limpiar campos para re-llenado fresco
  const prodField = document.getElementById('producto-interes')
  const infoBox   = document.getElementById('cotizacion-productos-info')
  const listaEl   = document.getElementById('cotizacion-productos-lista')

  if (!items || items.length === 0) {
    if (infoBox) infoBox.style.display = 'none'
    return
  }

  // Llenar campo producto de interés
  if (prodField) {
    prodField.value = items
      .map(i => `[${i.codigo}] ${i.nombre.substring(0, 30)}`)
      .join(', ')
  }

  // Mostrar bloque de productos incluidos
  if (infoBox && listaEl) {
    infoBox.style.display = 'block'
    listaEl.innerHTML = items.map(i =>
      `• [${escHtml(i.codigo)}] ${escHtml(i.nombre.substring(0, 50))} × ${i.cantidad}`
    ).join('<br>')
  }
}
window.prellenarFormCotizacion = prellenarFormCotizacion
