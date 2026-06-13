import React, { createContext, useContext, useEffect, useState } from 'react'
import { login, logout, getSession, cargarPerfil, registrarCliente } from '../services/authService.js'
import { supabase } from '../services/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    loggedIn: false,
    user: null,
    perfil: null,
    rol: null,
    loading: true,
  })

  const isAdmin      = () => authState.rol === 'admin'
  const isTrabajador = () => authState.rol === 'trabajador'
  const isCliente    = () => authState.rol === 'cliente'

  async function manejarSesion(user, itemsEnMemoria = []) {
    const { data: perfil, error, inactivo } = await cargarPerfil(user.id)

    if (inactivo || error || !perfil) {
      await logout()
      setAuthState({ loggedIn: false, user: null, perfil: null, rol: null, loading: false })
      return { ok: false, mensaje: inactivo ? 'Tu cuenta está desactivada. Contacta al administrador.' : (error?.message || 'No se pudo cargar el perfil.') }
    }

    setAuthState({
      loggedIn: true,
      user,
      perfil,
      rol: perfil.roles?.nombre || null,
      loading: false,
    })

    return { ok: true }
  }

  async function handleLogin(email, password) {
    const { data, error } = await login(email, password)
    if (error) return { ok: false, mensaje: traducirErrorAuth(error.message) }
    return manejarSesion(data.user)
  }

  async function handleLogout() {
    await logout()
    setAuthState({ loggedIn: false, user: null, perfil: null, rol: null, loading: false })
  }

  async function handleRegistro(datos) {
    return registrarCliente(datos)
  }

  useEffect(() => {
    getSession().then(({ data, error }) => {
      if (error || !data?.session) {
        setAuthState(s => ({ ...s, loading: false }))
        return
      }
      manejarSesion(data.session.user, [])
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setAuthState({ loggedIn: false, user: null, perfil: null, rol: null, loading: false })
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, isAdmin, isTrabajador, isCliente, handleLogin, handleLogout, handleRegistro }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

function traducirErrorAuth(msg) {
  if (!msg) return 'Error desconocido al iniciar sesión.'
  const m = msg.toLowerCase()
  if (m.includes('invalid login credentials') || m.includes('invalid credentials'))
    return 'Correo o contraseña incorrectos.'
  if (m.includes('email not confirmed'))
    return 'Debes confirmar tu correo electrónico antes de iniciar sesión.'
  if (m.includes('too many requests'))
    return 'Demasiados intentos. Espera unos minutos e intenta nuevamente.'
  if (m.includes('user not found'))
    return 'No existe una cuenta con ese correo.'
  return msg
}
