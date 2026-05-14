package com.example.vmaindustrial.data.remote

import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.realtime.Realtime

object SupabaseClient {

    val client = createSupabaseClient(
        supabaseUrl = "https://hlyjfkybecuicgtefooj.supabase.co",
        supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhseWpma3liZWN1aWNndGVmb29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDU4NTMsImV4cCI6MjA5NDAyMTg1M30.ywMWeamwhR_X16c0Fvm-zTkbNPkB8LZXiUJJkHMqvTo"
    ) {

        install(Postgrest)
        install(Auth)
        install(Realtime)
    }
}
