package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class CarritoItem(
    val id: Int? = null,
    val usuario_id: Int,
    val producto_id: Int,
    val cantidad: Int,
    val created_at: String? = null,
    val updated_at: String? = null
)

@Serializable
data class CarritoItemConProducto(
    val id: Int,
    val usuario_id: Int,
    val producto_id: Int,
    val cantidad: Int,
    val producto: Producto
)
