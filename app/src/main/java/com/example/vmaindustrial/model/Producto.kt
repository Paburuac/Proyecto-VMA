package com.example.vmaindustrial.model

data class Producto(
    val id_producto: Int,
    val codigo: String,
    val descripcion: String,
    val id_categoria: Int,
    val precio: Int,
    val stock: Int,
    val distribuidor: String
)
