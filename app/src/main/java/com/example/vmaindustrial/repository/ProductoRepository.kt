package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Producto
import io.github.jan.supabase.postgrest.from

class ProductoRepository {

    suspend fun obtenerProductos(): List<Producto> {

        return SupabaseClient.client
            .from("producto")
            .select()
            .decodeList<Producto>()
    }
}