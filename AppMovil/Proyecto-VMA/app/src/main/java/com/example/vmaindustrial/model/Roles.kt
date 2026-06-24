package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class Roles(
    val id: Int? = null,
    val nombre: String,
    val descripcion: String,
    val created_at: String? = null,
    val update_at: String? = null
)
