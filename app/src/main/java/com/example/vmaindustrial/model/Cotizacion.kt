package com.example.vmaindustrial.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Cotizacion(
    val id: Int? = null,
    val usuario_id: Int? = null,
    val nombre: String,
    val empresa: String? = null,
    val email: String,
    val telefono: String? = null,
    val mensaje: String? = null,
    val estado: String = "Pendiente",
    val productos_solicitados: List<ProductoCarritoSimplificado>? = null,
    val created_at: String? = null,
    val updated_at: String? = null
)
