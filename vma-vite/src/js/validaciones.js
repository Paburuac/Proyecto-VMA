/* =============================================
   VMA INDUSTRIAL – validaciones.js
   Responsabilidad: Validación de formularios
   (contacto, registro, login) y funciones
   utilitarias compartidas (escHtml, isValidEmail,
   showToast).
   ============================================= */

/* -----------------------------------------------
   FORMULARIO CONTACTO
----------------------------------------------- */
document.getElementById('form-contacto').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // Validar campos requeridos
  ['nombre-c','empresa-c','correo-c','tel-c','mensaje-c'].forEach(id => {
    const input = document.getElementById(id);
    const err   = document.getElementById(`err-${id}`);
    if (!input.value.trim()) {
      if (err) { err.textContent = 'Este campo es obligatorio.'; err.classList.add('show'); }
      valid = false;
    } else if (id === 'correo-c' && !isValidEmail(input.value)) {
      if (err) { err.textContent = 'Ingrese un correo válido.'; err.classList.add('show'); }
      valid = false;
    } else {
      if (err) err.classList.remove('show');
    }
  });

  if (valid) {
    document.getElementById('success-contacto').classList.add('show');
    this.reset();
    setTimeout(() => document.getElementById('success-contacto').classList.remove('show'), 5000);
  }
});

/* -----------------------------------------------
   FORMULARIO REGISTRO
----------------------------------------------- */
document.getElementById('form-registro').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const nombre = document.getElementById('reg-nombre');
  const correo = document.getElementById('reg-correo');
  const pass   = document.getElementById('reg-pass');
  const pass2  = document.getElementById('reg-pass2');

  // Nombre
  const errNombre = document.getElementById('err-reg-nombre');
  if (!nombre.value.trim()) {
    errNombre.textContent = 'El nombre es obligatorio.'; errNombre.classList.add('show'); valid = false;
  } else { errNombre.classList.remove('show'); }

  // Correo
  const errCorreo = document.getElementById('err-reg-correo');
  if (!isValidEmail(correo.value)) {
    errCorreo.textContent = 'Ingrese un correo válido.'; errCorreo.classList.add('show'); valid = false;
  } else { errCorreo.classList.remove('show'); }

  // Contraseña
  const errPass = document.getElementById('err-reg-pass');
  if (pass.value.length < 6) {
    errPass.textContent = 'La contraseña debe tener al menos 6 caracteres.'; errPass.classList.add('show'); valid = false;
  } else { errPass.classList.remove('show'); }

  // Confirmar
  const errPass2 = document.getElementById('err-reg-pass2');
  if (pass.value !== pass2.value) {
    errPass2.textContent = 'Las contraseñas no coinciden.'; errPass2.classList.add('show'); valid = false;
  } else { errPass2.classList.remove('show'); }

  if (valid) {
    document.getElementById('success-registro').classList.add('show');
    this.reset();
    setTimeout(() => document.getElementById('success-registro').classList.remove('show'), 5000);
  }
});

/* -----------------------------------------------
   FORMULARIO LOGIN
----------------------------------------------- */
document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const correo = document.getElementById('login-correo');
  const pass   = document.getElementById('login-pass');

  const errC = document.getElementById('err-login-correo');
  if (!isValidEmail(correo.value)) {
    errC.textContent = 'Ingrese un correo válido.'; errC.classList.add('show'); valid = false;
  } else { errC.classList.remove('show'); }

  const errP = document.getElementById('err-login-pass');
  if (!pass.value) {
    errP.textContent = 'Ingrese su contraseña.'; errP.classList.add('show'); valid = false;
  } else { errP.classList.remove('show'); }

  if (valid) {
    document.getElementById('success-login').classList.add('show');
    this.reset();
    setTimeout(() => document.getElementById('success-login').classList.remove('show'), 4000);
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
