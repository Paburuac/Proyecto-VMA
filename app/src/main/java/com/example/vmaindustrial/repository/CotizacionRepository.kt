package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Cotizacion
import io.github.jan.supabase.postgrest.from

class CotizacionRepository {
    suspend fun crearCotizacion(cotizacion: Cotizacion): Result<Unit> {
        return try {
            SupabaseClient.client.from("cotizaciones").insert(cotizacion)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
