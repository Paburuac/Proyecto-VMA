package com.example.vmaindustrial.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vmaindustrial.repository.AuthRepository
import kotlinx.coroutines.launch

class AuthViewModel : ViewModel() {
    private val authRepository = AuthRepository()

    var email by mutableStateOf("")
    var password by mutableStateOf("")
    var nombre by mutableStateOf("")
    var rolId by mutableStateOf(1) // Por defecto rol 1 (ej: Cliente)

    var isLoading by mutableStateOf(false)
    var error by mutableStateOf<String?>(null)
    var isSuccess by mutableStateOf(false)

    var currentUser by mutableStateOf(authRepository.getCurrentUser())
        private set

    fun login() {
        viewModelScope.launch {
            isLoading = true
            error = null
            val result = authRepository.signIn(email, password)
            if (result.isSuccess) {
                currentUser = authRepository.getCurrentUser()
                isSuccess = true
            } else {
                error = result.exceptionOrNull()?.message ?: "Error al iniciar sesión"
            }
            isLoading = false
        }
    }

    fun register() {
        viewModelScope.launch {
            isLoading = true
            error = null
            val result = authRepository.signUp(email, password, nombre, rolId)
            if (result.isSuccess) {
                currentUser = authRepository.getCurrentUser()
                isSuccess = true
            } else {
                error = result.exceptionOrNull()?.message ?: "Error al registrarse"
            }
            isLoading = false
        }
    }

    fun logout() {
        viewModelScope.launch {
            authRepository.signOut()
            currentUser = null
            isSuccess = false
        }
    }
}
