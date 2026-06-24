package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.model.Categoria
import com.example.vmaindustrial.model.Producto
import com.example.vmaindustrial.repository.CategoriaRepository
import com.example.vmaindustrial.repository.ProductoRepository
import com.example.vmaindustrial.data.remote.SupabaseClient
import io.github.jan.supabase.gotrue.auth
import kotlinx.coroutines.launch

class ProductoViewModel : ViewModel() {

    private val productoRepository = ProductoRepository()

    private val categoriaRepository = CategoriaRepository()

    var productos by mutableStateOf<List<Producto>>(emptyList())
        private set

    var categorias by mutableStateOf<List<Categoria>>(emptyList())
        private set

    var textoBusqueda by mutableStateOf("")

    var categoriaSeleccionada by mutableStateOf<Int?>(null)

    val productosFiltrados by derivedStateOf {
        productos.filter {
            (categoriaSeleccionada == null ||
                    it.id_categoria == categoriaSeleccionada)
                    &&
                    it.descripcion.contains(
                        textoBusqueda,
                        ignoreCase = true
                    )
        }
    }

    var isLoading by mutableStateOf(false)
        private set

    var mensajeError by mutableStateOf<String?>(null)
        private set

    fun cargarDatos() {
        viewModelScope.launch {
            isLoading = true
            mensajeError = null
            try {
                println("DEBUG: Iniciando carga de datos...")
                productos = productoRepository.obtenerProductos()
                println("DEBUG: Productos cargados: ${productos.size}")
                
                categorias = categoriaRepository.obtenerCategorias()
                println("DEBUG: Categorías cargadas: ${categorias.size}")
            } catch (e: Exception) {
                val errorMessage = e.message ?: ""
                if (errorMessage.contains("JWT expired", ignoreCase = true) || 
                    errorMessage.contains("expired", ignoreCase = true)) {
                    println("DEBUG: JWT expirado detectado, intentando refrescar sesión...")
                    try {
                        val session = SupabaseClient.client.auth.currentSessionOrNull()
                        if (session?.refreshToken != null) {
                            SupabaseClient.client.auth.refreshCurrentSession()
                            // Reintentar una vez después del refresh
                            productos = productoRepository.obtenerProductos()
                            categorias = categoriaRepository.obtenerCategorias()
                            println("DEBUG: Datos cargados exitosamente tras refresh")
                        } else {
                            mensajeError = "Sesión expirada. Por favor, vuelve a iniciar sesión."
                        }
                    } catch (refreshError: Exception) {
                        refreshError.printStackTrace()
                        mensajeError = "Error al refrescar sesión: ${refreshError.message}"
                        println("DEBUG: Error tras refresh: ${refreshError.message}")
                    }
                } else if (errorMessage.contains("timeout", ignoreCase = true)) {
                    mensajeError = "Tiempo de conexión agotado. Verifica tu internet."
                } else {
                    e.printStackTrace()
                    mensajeError = e.message ?: "Error desconocido al cargar datos"
                    println("DEBUG: Error en ViewModel: ${e.message}")
                }
            } finally {
                isLoading = false
            }
        }
    }
}
