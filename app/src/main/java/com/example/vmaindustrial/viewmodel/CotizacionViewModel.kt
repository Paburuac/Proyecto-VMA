package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.model.ProductoCarritoSimplificado
import com.example.vmaindustrial.repository.AuthRepository
import io.github.jan.supabase.gotrue.auth
import com.example.vmaindustrial.repository.CotizacionRepository
import kotlinx.coroutines.launch

class CotizacionViewModel : ViewModel() {
    private val repository = CotizacionRepository()
    private val authRepository = AuthRepository()

    var nombre by mutableStateOf("")
    var empresa by mutableStateOf("")
    var email by mutableStateOf("")
    var telefono by mutableStateOf("")
    var productoInteres by mutableStateOf("")
    var mensaje by mutableStateOf("")

    var isLoading by mutableStateOf(false)
    var statusMessage by mutableStateOf<String?>(null)
    var hasAttemptedSubmit by mutableStateOf(false)
    
    var misCotizaciones by mutableStateOf<List<Cotizacion>>(emptyList())
        private set

    fun cargarCotizacionesUsuario() {
        viewModelScope.launch {
            isLoading = true
            println("DEBUG: [ViewModel] Ejecutando cargarCotizacionesUsuario")
            
            try {
                val perfil = authRepository.getUserProfile()
                println("DEBUG: [ViewModel] Perfil obtenido: $perfil")
                
                if (perfil != null && perfil.id != null) {
                    println("DEBUG: [ViewModel] Solicitando cotizaciones para usuario_id: ${perfil.id}")
                    misCotizaciones = repository.obtenerCotizacionesPorUsuario(perfil.id)
                    println("DEBUG: [ViewModel] Cotizaciones cargadas: ${misCotizaciones.size}")
                } else {
                    println("DEBUG: [ViewModel] No se pudo obtener el perfil o el ID es nulo")
                    misCotizaciones = emptyList()
                }
            } catch (e: Exception) {
                println("DEBUG: [ViewModel] Error: ${e.message}")
                e.printStackTrace()
            } finally {
                isLoading = false
            }
        }
    }

    fun enviarSolicitud() {
        hasAttemptedSubmit = true
        if (nombre.isBlank() || email.isBlank() || mensaje.isBlank()) {
            statusMessage = "Por favor completa los campos obligatorios"
            return
        }

        viewModelScope.launch {
            isLoading = true
            val perfil = authRepository.getUserProfile()
            
            val cotizacion = Cotizacion(
                usuario_id = perfil?.id, // null si es invitado
                nombre = nombre,
                empresa = empresa.ifBlank { null },
                email = email,
                telefono = telefono.ifBlank { null },
                mensaje = "Producto: $productoInteres\n\nMensaje: $mensaje",
                productos_solicitados = null // Es una solicitud directa, no enviamos lista vacía
            )

            val result = repository.crearCotizacion(cotizacion)
            if (result.isSuccess) {
                statusMessage = "Solicitud enviada con éxito"
                limpiarCampos()
            } else {
                statusMessage = "Error: ${result.exceptionOrNull()?.message}"
            }
            isLoading = false
        }
    }

    private fun limpiarCampos() {
        nombre = ""
        empresa = ""
        email = ""
        telefono = ""
        productoInteres = ""
        mensaje = ""
        hasAttemptedSubmit = false
    }
}
