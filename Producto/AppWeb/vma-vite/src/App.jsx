import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'

import Catalogo          from './pages/Catalogo.jsx'
import Cotizacion        from './pages/Cotizacion.jsx'
import Login             from './pages/Login.jsx'
import Registro          from './pages/Registro.jsx'
import Admin             from './pages/Admin.jsx'
import PanelTrabajador   from './pages/PanelTrabajador.jsx'
import MisCotizaciones   from './pages/MisCotizaciones.jsx'
import PagoResultado     from './pages/PagoResultado.jsx'
import Nosotros          from './pages/Nosotros.jsx'
import Contacto          from './pages/Contacto.jsx'
import Inicio            from './pages/Inicio.jsx'
import Privacidad          from './pages/Privacidad.jsx'
import Terminos            from './pages/Terminos.jsx'
import NotFound            from './pages/NotFound.jsx'
import RecuperarPassword   from './pages/RecuperarPassword.jsx'
import NuevaPassword       from './pages/NuevaPassword.jsx'

function RutaProtegida({ children, check }) {
  const { authState } = useAuth()
  if (authState.loading) return null
  return check() ? children : <Navigate to="/" replace />
}

// Transbank redirige a /?token_ws=XXX#/ — el hash router carga "/" en vez de /pago-resultado.
// Interceptamos el token antes de que el router arranque, lo guardamos y reescribimos el hash.
;(function interceptTransbankToken() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token_ws')
  if (token) {
    sessionStorage.setItem('transbank_token_ws', token)
    window.location.replace('/#/pago-resultado')
  }
})()

export default function App() {
  const { authState, isAdmin, isTrabajador, isCliente } = useAuth()

  if (authState.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gris-texto)' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  // Modo recuperación de contraseña — Supabase detectó el token en la URL
  if (authState.recoveryMode) {
    return (
      <HashRouter>
        <Layout>
          <NuevaPassword />
        </Layout>
      </HashRouter>
    )
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/"                  element={<Inicio />} />
          <Route path="/productos"         element={<Catalogo />} />
          <Route path="/nosotros"          element={<Nosotros />} />
          <Route path="/contacto"          element={<Contacto />} />
          <Route path="/cotizacion"        element={<Cotizacion />} />
          <Route path="/login"             element={<Login />} />
          <Route path="/registro"          element={<Registro />} />
          <Route path="/mis-cotizaciones"  element={
            <RutaProtegida check={() => authState.loggedIn}>
              <MisCotizaciones />
            </RutaProtegida>
          } />
          <Route path="/trabajador"        element={
            <RutaProtegida check={isTrabajador}>
              <PanelTrabajador />
            </RutaProtegida>
          } />
          <Route path="/admin"             element={
            <RutaProtegida check={isAdmin}>
              <Admin />
            </RutaProtegida>
          } />
          <Route path="/pago-resultado"    element={<PagoResultado />} />
          <Route path="/privacidad"          element={<Privacidad />} />
          <Route path="/terminos"           element={<Terminos />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
