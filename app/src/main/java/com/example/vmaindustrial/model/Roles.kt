package com.example.vmaindustrial.model

import java.util.Date

data class Roles(
    val id: Int,
    val nombre: String,
    val descripcion: String,
    val created_at: Date,
    val update_at: Date
)
