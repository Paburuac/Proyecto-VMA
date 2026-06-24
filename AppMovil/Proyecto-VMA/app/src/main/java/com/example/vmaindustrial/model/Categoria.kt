package com.example.vmaindustrial.model

import kotlinx.serialization.Serializable

@Serializable
data class Categoria(
    val id_categoria: Int,
    val nombre_categoria: String
)
