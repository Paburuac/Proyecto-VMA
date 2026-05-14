package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.model.Categoria
import com.example.vmaindustrial.model.Producto
import com.example.vmaindustrial.repository.CategoriaRepository
import com.example.vmaindustrial.repository.ProductoRepository
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
                e.printStackTrace()
                mensajeError = e.message ?: "Error desconocido al cargar datos"
                println("DEBUG: Error en ViewModel: ${e.message}")
            } finally {
                isLoading = false
            }
        }
    }

    fun productosFiltrados(): List<Producto> {

        return productos.filter {

            (categoriaSeleccionada == null ||
                    it.id_categoria == categoriaSeleccionada)

                    &&

                    it.descripcion.contains(
                        textoBusqueda,
                        ignoreCase = true
                    )
        }
    }
}