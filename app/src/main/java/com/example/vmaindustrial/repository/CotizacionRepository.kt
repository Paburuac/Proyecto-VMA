package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Cotizacion
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order

class CotizacionRepository {
    suspend fun crearCotizacion(cotizacion: Cotizacion): Result<Unit> {
        return try {
            SupabaseClient.client.from("cotizaciones").insert(cotizacion)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun obtenerCotizacionesPorUsuario(usuarioId: Int?): Result<List<Cotizacion>> {
        if (usuarioId == null) return Result.success(emptyList())
        return try {
            val cotizaciones = SupabaseClient.client.from("cotizaciones")
                .select {
                    filter {
                        eq("usuario_id", usuarioId)
                    }
                    order(column = "created_at", order = Order.DESCENDING)
                }.decodeList<Cotizacion>()
            Result.success(cotizaciones)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
