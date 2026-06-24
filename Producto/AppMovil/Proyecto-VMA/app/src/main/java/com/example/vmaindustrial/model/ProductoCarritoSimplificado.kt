package com.example.vmaindustrial.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ProductoCarritoSimplificado(
    @SerialName("id_producto") val id_producto: Int? = null,
    val descripcion: String? = "Producto",
    val cantidad: Int,
    val precio: String? = null,
    val imagen_url: String? = null
)
