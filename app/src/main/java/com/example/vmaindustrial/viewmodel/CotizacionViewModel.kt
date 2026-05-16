package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.repository.AuthRepository
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

    fun enviarSolicitud() {
        if (nombre.isBlank() || email.isBlank() || mensaje.isBlank()) {
            statusMessage = "Por favor completa los campos obligatorios"
            return
        }

        viewModelScope.launch {
            isLoading = true
            val perfil = authRepository.getUserProfile()
            
            val cotizacion = Cotizacion(
                usuario_id = perfil?.id ?: 0, // 0 si es invitado
                nombre = nombre,
                empresa = empresa,
                email = email,
                telefono = telefono,
                mensaje = "Producto: $productoInteres\n\nMensaje: $mensaje",
                productos_solicitados = emptyList() // Es una solicitud directa, no desde carrito
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
    }
}
