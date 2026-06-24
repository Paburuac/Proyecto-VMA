package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Producto
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class ProductoRepository {

    suspend fun obtenerProductos(): List<Producto> = withContext(Dispatchers.IO) {
        SupabaseClient.client
            .from("producto")
            .select()
            .decodeList<Producto>()
    }
}