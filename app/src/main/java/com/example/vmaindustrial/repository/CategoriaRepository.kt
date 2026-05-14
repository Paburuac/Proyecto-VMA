package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Categoria
import io.github.jan.supabase.postgrest.from

class CategoriaRepository {

    suspend fun obtenerCategorias(): List<Categoria> {

        return SupabaseClient.client
            .from("categoria")
            .select()
            .decodeList<Categoria>()
    }
}