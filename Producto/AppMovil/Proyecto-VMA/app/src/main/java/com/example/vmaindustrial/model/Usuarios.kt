package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class Usuarios(
    @SerialName("id") val id: Int? = null,
    @SerialName("auth_user_id") val auth_user_id: String,
    @SerialName("rol_id") val rol_id: Int,
    @SerialName("nombre") val nombre: String,
    @SerialName("email") val email: String,
    @SerialName("telefono") val telefono: String? = null,
    @SerialName("activo") val activo: Boolean = true,
    @SerialName("created_at") val created_at: String? = null,
    @SerialName("updated_at") val updated_at: String? = null
)
