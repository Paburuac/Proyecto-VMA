package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class Producto(
    val id_producto: Int,
    val codigo: String,
    val descripcion: String,
    val id_categoria: Int,
    val precio: Double?,
    val stock: Int?,
    val distribuidor: String?
)

