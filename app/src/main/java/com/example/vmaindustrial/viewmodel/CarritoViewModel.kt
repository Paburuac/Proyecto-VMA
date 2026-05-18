package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.model.CarritoItem
import com.example.vmaindustrial.model.CarritoItemConProducto
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.model.ProductoCarritoSimplificado
import com.example.vmaindustrial.repository.AuthRepository
import com.example.vmaindustrial.repository.CarritoRepository
import com.example.vmaindustrial.repository.CotizacionRepository
import com.example.vmaindustrial.data.remote.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import kotlinx.coroutines.launch

class CarritoViewModel : ViewModel() {
    private val carritoRepository = CarritoRepository()
    private val authRepository = AuthRepository()
    private val cotizacionRepository = CotizacionRepository()

    var items by mutableStateOf<List<CarritoItemConProducto>>(emptyList())
        private set

    var isLoading by mutableStateOf(false)
        private set

    var mensaje by mutableStateOf<String?>(null)

    fun cargarCarrito() {
        viewModelScope.launch {
            isLoading = true
            try {
                val perfil = authRepository.getUserProfile()
                if (perfil != null) {
                    items = carritoRepository.obtenerCarrito(perfil.id!!)
                } else {
                    items = emptyList()
                }
            } catch (e: Exception) {
                if (e.message?.contains("expired", ignoreCase = true) == true) {
                    try {
                        SupabaseClient.client.auth.refreshCurrentSession()
                        val perfil = authRepository.getUserProfile()
                        if (perfil != null) {
                            items = carritoRepository.obtenerCarrito(perfil.id!!)
                        }
                    } catch (ex: Exception) {
                        mensaje = "Sesión expirada"
                    }
                }
            }
            isLoading = false
        }
    }

    fun agregarProducto(productoId: Int, reintentos: Int = 1) {
        viewModelScope.launch {
            try {
                val perfil = authRepository.getUserProfile()
                if (perfil == null) {
                    mensaje = "Debes iniciar sesión para agregar al carrito"
                    return@launch
                }

                val nuevoItem = CarritoItem(
                    usuario_id = perfil.id!!,
                    producto_id = productoId,
                    cantidad = 1
                )
                carritoRepository.agregarOActualizarItem(nuevoItem)
                cargarCarrito()
                mensaje = "Producto añadido al carrito"
            } catch (e: Exception) {
                if (e.message?.contains("expired", ignoreCase = true) == true && reintentos > 0) {
                    try {
                        SupabaseClient.client.auth.refreshCurrentSession()
                        agregarProducto(productoId, reintentos - 1)
                    } catch (ex: Exception) {
                        mensaje = "Error de sesión"
                    }
                } else {
                    mensaje = "Error: ${e.message}"
                }
            }
        }
    }

    fun cambiarCantidad(itemId: Int, nuevaCantidad: Int) {
        viewModelScope.launch {
            carritoRepository.actualizarCantidad(itemId, nuevaCantidad)
            cargarCarrito()
        }
    }

    fun realizarCompra() {
        viewModelScope.launch {
            isLoading = true
            println("DEBUG: Iniciando realizarCompra")
            val perfil = authRepository.getUserProfile()
            if (perfil == null || items.isEmpty()) {
                println("DEBUG: Perfil nulo o items vacíos. Perfil: $perfil, Items size: ${items.size}")
                isLoading = false
                return@launch
            }

            println("DEBUG: Preparando productos simplificados")
            val productosSimplificados = items.map {
                ProductoCarritoSimplificado(
                    id_producto = it.producto_id,
                    descripcion = it.producto.descripcion,
                    cantidad = it.cantidad,
                    precio = it.producto.precio?.toString() ?: "Consultar"
                )
            }

            val cotizacion = Cotizacion(
                usuario_id = perfil.id,
                nombre = perfil.nombre,
                email = perfil.email,
                telefono = perfil.telefono?.ifBlank { null },
                productos_solicitados = productosSimplificados
            )

            println("DEBUG: Insertando cotización en Supabase")
            val result = cotizacionRepository.crearCotizacion(cotizacion)
            if (result.isSuccess) {
                println("DEBUG: Cotización insertada con éxito. Vaciando carrito.")
                carritoRepository.vaciarCarrito(perfil.id!!)
                items = emptyList()
                mensaje = "¡Compra realizada con éxito! Cotización generada."
            } else {
                val errorMsg = result.exceptionOrNull()?.message ?: "Error desconocido"
                println("DEBUG: Error al insertar cotización: $errorMsg")
                mensaje = "Error al procesar la compra: $errorMsg"
            }
            isLoading = false
        }
    }
}
