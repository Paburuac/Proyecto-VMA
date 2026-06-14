package com.example.vmaindustrial.repository

import cl.transbank.common.IntegrationType
import cl.transbank.webpay.common.WebpayOptions
import cl.transbank.webpay.webpayplus.WebpayPlus
import cl.transbank.webpay.webpayplus.responses.WebpayPlusTransactionCommitResponse
import cl.transbank.webpay.webpayplus.responses.WebpayPlusTransactionCreateResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.UUID

class TransbankRepository {

    // Webpay Plus Integration credentials
    private val options = WebpayOptions(
        "597055555532", 
        "579B53274446D3C875550D95A4017367B8095E7C80695038F6F4C7A3B79C93BD", 
        IntegrationType.TEST
    )

    suspend fun iniciarPago(monto: Double, buyOrder: String): WebpayPlusTransactionCreateResponse? = withContext(Dispatchers.IO) {
        return@withContext try {
            val sessionId = UUID.randomUUID().toString()
            val returnUrl = "https://vmaindustrial.cl/webpay/return" 
            
            // Transbank REST requiere montos enteros para CLP
            val montoClp = monto.toInt()
            
            val tx = WebpayPlus.Transaction(options)
            tx.create(buyOrder, sessionId, montoClp.toDouble(), returnUrl)
        } catch (e: Exception) {
            println("DEBUG: Transbank Error: ${e.message}")
            e.printStackTrace()
            null
        }
    }

    suspend fun confirmarPago(token: String): WebpayPlusTransactionCommitResponse? = withContext(Dispatchers.IO) {
        try {
            val tx = WebpayPlus.Transaction(options)
            tx.commit(token)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
