import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import Catalogo          from './pages/Catalogo.jsx'
import Admin             from './pages/Admin.jsx'
import PanelTrabajador   from './pages/PanelTrabajador.jsx'
import MisCotizaciones   from './pages/MisCotizaciones.jsx'
import PagoResultado     from './pages/PagoResultado.jsx'

function RutaProtegida({ children, check }) {
  const { authState } = useAuth()

  if (authState.loading) return null

  return check() ? children : <Navigate to="/" replace />
}

export default function App() {
  const { authState, isAdmin, isTrabajador, isCliente } = useAuth()

  if (authState.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gris-texto)' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/"                  element={<Catalogo />} />
        <Route path="/productos"         element={<Catalogo />} />
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
        <Route path="*"                  element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
