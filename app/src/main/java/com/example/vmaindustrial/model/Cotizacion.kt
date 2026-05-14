package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class Cotizacion(
    val id: Int? = null,
    val usuario_id: Int,
    val nombre: String,
    val empresa: String? = null,
    val email: String,
    val telefono: String? = null,
    val mensaje: String? = null,
    val productos_solicitados: List<ProductoCarritoSimplificado>,
    val estado: String = "Pendiente",
    val created_at: String? = null,
    val updated_at: String? = null
)

@Serializable
data class ProductoCarritoSimplificado(
    val id_producto: Int,
    val descripcion: String,
    val cantidad: Int,
    val precio: Double?
)
