package com.example.vmaindustrial.repository

import com.example.vmaindustrial.data.remote.SupabaseClient
import com.example.vmaindustrial.model.CarritoItem
import com.example.vmaindustrial.model.CarritoItemConProducto
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Columns

class CarritoRepository {

    suspend fun obtenerCarrito(usuarioId: Int): List<CarritoItemConProducto> {
        return SupabaseClient.client.from("carrito_items").select(
            Columns.raw("*, producto:producto(*)")
        ) {
            filter {
                eq("usuario_id", usuarioId)
            }
        }.decodeList<CarritoItemConProducto>()
    }

    suspend fun agregarOActualizarItem(item: CarritoItem) {
        // Verificar si ya existe
        val existente = SupabaseClient.client.from("carrito_items").select {
            filter {
                eq("usuario_id", item.usuario_id)
                eq("producto_id", item.producto_id)
            }
        }.decodeSingleOrNull<CarritoItem>()

        if (existente != null) {
            val nuevaCantidad = existente.cantidad + item.cantidad
            SupabaseClient.client.from("carrito_items").update(
                {
                    CarritoItem::cantidad setTo nuevaCantidad
                }
            ) {
                filter { eq("id", existente.id!!) }
            }
        } else {
            SupabaseClient.client.from("carrito_items").insert(item)
        }
    }

    suspend fun actualizarCantidad(itemId: Int, nuevaCantidad: Int) {
        if (nuevaCantidad <= 0) {
            SupabaseClient.client.from("carrito_items").delete {
                filter { eq("id", itemId) }
            }
        } else {
            SupabaseClient.client.from("carrito_items").update(
                {
                    CarritoItem::cantidad setTo nuevaCantidad
                }
            ) {
                filter { eq("id", itemId) }
            }
        }
    }

    suspend fun vaciarCarrito(usuarioId: Int) {
        SupabaseClient.client.from("carrito_items").delete {
            filter { eq("usuario_id", usuarioId) }
        }
    }
}
