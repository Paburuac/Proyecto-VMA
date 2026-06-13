import React, { createContext, useContext, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'
import * as carritoService from '../services/carritoService.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { authState } = useAuth()
  const [cart, setCart] = useState([])

  const isLogueado = () => authState.loggedIn
  const getUsuarioId = () => authState.perfil?.id ?? null

  const addToCart = useCallback(async (producto, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.codigo === producto.codigo)
      if (existing) {
        return prev.map(i =>
          i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + qty } : i
        )
      }
      return [...prev, {
        id: null,
        producto_id: producto.id_producto ?? null,
        codigo: producto.codigo,
        nombre: producto.nombre,
        cantidad: qty,
        precio: producto.precio,
      }]
    })

    if (isLogueado() && producto.id_producto) {
      await carritoService.agregarItem(getUsuarioId(), producto.id_producto, qty)
    }
  }, [authState])

  const removeFromCart = useCallback(async (codigo) => {
    const item = cart.find(i => i.codigo === codigo)
    if (isLogueado() && item?.id) {
      await carritoService.eliminarItem(item.id)
    }
    setCart(prev => prev.filter(i => i.codigo !== codigo))
  }, [cart, authState])

  const updateQty = useCallback(async (codigo, delta) => {
    const item = cart.find(i => i.codigo === codigo)
    if (!item) return
    const nueva = item.cantidad + delta
    if (nueva <= 0) { await removeFromCart(codigo); return }
    if (isLogueado() && item.id) {
      await carritoService.actualizarCantidad(item.id, nueva)
    }
    setCart(prev => prev.map(i => i.codigo === codigo ? { ...i, cantidad: nueva } : i))
  }, [cart, authState])

  const limpiarCarrito = useCallback(() => setCart([]), [])

  const cargarDesdeSupabase = useCallback(async (itemsEnMemoria = []) => {
    const usuarioId = getUsuarioId()
    if (!usuarioId) return
    if (itemsEnMemoria.length > 0) {
      const paraFusionar = itemsEnMemoria
        .filter(i => i.producto_id)
        .map(i => ({ producto_id: i.producto_id, cantidad: i.cantidad }))
      if (paraFusionar.length > 0) {
        await carritoService.fusionarCarrito(usuarioId, paraFusionar)
      }
    }
    const { data } = await carritoService.obtenerCarrito(usuarioId)
    if (data) {
      setCart(data.map(item => ({
        id: item.id,
        producto_id: item.producto?.id_producto ?? null,
        codigo: String(item.producto?.codigo ?? ''),
        nombre: item.producto?.descripcion ?? 'Producto',
        cantidad: item.cantidad,
        precio: item.producto?.precio != null ? String(item.producto.precio) : 'Consultar',
      })))
    }
  }, [authState])

  const totalItems = cart.reduce((s, i) => s + i.cantidad, 0)

  return (
    <CartContext.Provider value={{ cart, totalItems, addToCart, removeFromCart, updateQty, limpiarCarrito, cargarDesdeSupabase }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
