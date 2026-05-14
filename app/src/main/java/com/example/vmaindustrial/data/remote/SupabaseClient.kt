package com.example.vmaindustrial.data.remote

import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.gotrue.SessionStatus
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.realtime.Realtime
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach

object SupabaseClient {

    val client = createSupabaseClient(
        supabaseUrl = "https://hlyjfkybecuicgtefooj.supabase.co",
        supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhseWpma3liZWN1aWNndGVmb29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDU4NTMsImV4cCI6MjA5NDAyMTg1M30.ywMWeamwhR_X16c0Fvm-zTkbNPkB8LZXiUJJkHMqvTo"
    ) {

        install(Postgrest)
        install(Auth) {
            alwaysAutoRefresh = true
            autoLoadFromStorage = true
        }
        install(Realtime)
    }

    init {
        // Observar cambios en la sesión para depuración y asegurar refrescos
        client.auth.sessionStatus
            .onEach { status ->
                when (status) {
                    is SessionStatus.Authenticated -> println("DEBUG: Supabase Auth - Autenticado (Token válido)")
                    is SessionStatus.NotAuthenticated -> println("DEBUG: Supabase Auth - No autenticado")
                    is SessionStatus.LoadingFromStorage -> println("DEBUG: Supabase Auth - Cargando sesión...")
                    is SessionStatus.NetworkError -> {
                        println("DEBUG: Supabase Auth - Error de red al refrescar token")
                    }
                }
            }
            .launchIn(CoroutineScope(Dispatchers.IO))
    }
}
