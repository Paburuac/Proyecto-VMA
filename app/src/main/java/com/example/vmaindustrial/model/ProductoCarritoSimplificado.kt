package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class ProductoCarritoSimplificado(
    val id_producto: Int,
    val descripcion: String,
    val cantidad: Int,
    val precio: String?
)
