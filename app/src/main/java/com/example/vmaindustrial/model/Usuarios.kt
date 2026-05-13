package com.example.vmaindustrial.model

import java.util.Date

data class Usuarios(
    val id: Int,
    val auth_user_id: String,
    val rol_id: Int,
    val nombre: String,
    val email: String,
    val telefono: String,
    val activo: Boolean,
    val create_at: Date,
    val update_at: Date
)
