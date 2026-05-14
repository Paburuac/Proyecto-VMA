package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class Usuarios(
    val id: Int? = null,
    val auth_user_id: String,
    val rol_id: Int,
    val nombre: String,
    val email: String,
    val telefono: String? = null,
    val activo: Boolean,
    val create_at: String? = null,
    val update_at: String? = null
)
