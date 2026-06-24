package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Categoria
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class CategoriaRepository {

    suspend fun obtenerCategorias(): List<Categoria> = withContext(Dispatchers.IO) {
        SupabaseClient.client
            .from("categoria")
            .select()
            .decodeList<Categoria>()
    }
}