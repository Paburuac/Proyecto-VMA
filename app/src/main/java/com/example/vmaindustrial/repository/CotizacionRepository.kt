package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.model.Usuarios
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import io.github.jan.supabase.postgrest.query.Order

class CotizacionRepository {

    suspend fun crearCotizacion(cotizacion: Cotizacion): Result<Unit> = withContext(Dispatchers.IO) {
        return@withContext try {
            println("DEBUG: Intentando insertar cotización: $cotizacion")
            val response = SupabaseClient.client.from("cotizaciones").insert(cotizacion)
            println("DEBUG: Respuesta de inserción exitosa")
            Result.success(Unit)
        } catch (e: Exception) {
            println("DEBUG: Error en crearCotizacion: ${e.message}")
            e.printStackTrace()
            Result.failure(e)
        }
    }

    suspend fun obtenerCotizacionesPorUsuario(usuarioId: Int?): List<Cotizacion> = withContext(Dispatchers.IO) {
        if (usuarioId == null) return@withContext emptyList()
        
        return@withContext try {
            SupabaseClient.client.from("cotizaciones").select {
                filter {
                    eq("usuario_id", usuarioId)
                }
                order(column = "created_at", order = Order.DESCENDING)
            }.decodeList<Cotizacion>()
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    suspend fun obtenerCotizacionesUsuarioLegacy(): List<Cotizacion> = withContext(Dispatchers.IO) {
        try {
            // Usuario autenticado
            val authUser = SupabaseClient.client.auth.currentUserOrNull()
            val uuid = authUser?.id ?: return@withContext emptyList()

            // Buscar usuario tabla usuarios
            val usuario = SupabaseClient.client
                .from("usuarios")
                .select {
                    filter {
                        eq("auth_user_id", uuid)
                    }
                }
                .decodeSingle<Usuarios>()

            // Buscar cotizaciones del usuario
            SupabaseClient.client
                .from("cotizaciones")
                .select {
                    filter {
                        eq("usuario_id", usuario.id!!)
                    }
                }
                .decodeList<Cotizacion>()
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }
}
