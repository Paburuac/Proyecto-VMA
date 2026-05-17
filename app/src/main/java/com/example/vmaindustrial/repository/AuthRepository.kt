package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.Usuarios
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.Email
import io.github.jan.supabase.postgrest.from

class AuthRepository {

    suspend fun signUp(email: String, password: String, nombre: String, rolId: Int): Result<Unit> {
        return try {
            val authResponse = SupabaseClient.client.auth.signUpWith(Email) {
                this.email = email
                this.password = password
            }

            val userId = authResponse?.id ?: throw Exception("Error al obtener ID de usuario")

            val nuevoUsuario = Usuarios(
                auth_user_id = userId,
                rol_id = rolId,
                nombre = nombre,
                email = email,
                activo = true
            )

            SupabaseClient.client.from("usuarios").insert(nuevoUsuario)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun signIn(email: String, password: String): Result<Unit> {
        return try {
            SupabaseClient.client.auth.signInWith(Email) {
                this.email = email
                this.password = password
            }
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun signOut() {
        SupabaseClient.client.auth.signOut()
    }

    fun getCurrentUser() = SupabaseClient.client.auth.currentSessionOrNull()

    suspend fun getUserProfile(): Usuarios? {
        val session = getCurrentUser() ?: return null
        val authId = session.user?.id ?: ""
        return try {
            SupabaseClient.client.from("usuarios")
                .select {
                    filter {
                        eq("auth_user_id", authId)
                    }
                }.decodeSingleOrNull<Usuarios>()
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
