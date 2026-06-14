package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingCartCheckout
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import com.example.vmaindustrial.model.CarritoItemConProducto
import com.example.vmaindustrial.viewmodel.CarritoViewModel
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CarritoScreen(
    onNavigateToLogin: () -> Unit,
    viewModel: CarritoViewModel = viewModel()
) {
    val snackbarHostState = remember { SnackbarHostState() }
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)

    val total = remember(viewModel.items) {
        viewModel.items.sumOf { (it.producto.precio ?: 0.0) * it.cantidad }
    }

    // Estado para mostrar el WebView de Transbank
    var showWebpay by remember { mutableStateOf(false) }
    // Estado para el diálogo de selección de acción
    var showActionDialog by remember { mutableStateOf(false) }

    LaunchedEffect(viewModel.paymentUrl) {
        if (viewModel.paymentUrl != null) {
            showWebpay = true
        }
    }

    if (showActionDialog) {
        AlertDialog(
            onDismissRequest = { showActionDialog = false },
            title = { Text("Finalizar Pedido", fontWeight = FontWeight.Bold) },
            text = { 
                if (total > 0) {
                    Text("¿Deseas pagar ahora con Webpay o generar solo una cotización para revisión?")
                } else {
                    Text("El total es $0.0. Solo puedes generar una cotización para revisión de precios.")
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        showActionDialog = false
                        viewModel.pagarConTransbank()
                    },
                    enabled = total > 0,
                    colors = ButtonDefaults.buttonColors(containerColor = brandBlue)
                ) {
                    Text("Pagar con Webpay")
                }
            },
            dismissButton = {
                TextButton(
                    onClick = {
                        showActionDialog = false
                        viewModel.realizarCompra()
                    }
                ) {
                    Text("Solo Cotizar", color = brandBlue)
                }
            }
        )
    }

    if (showWebpay && viewModel.paymentUrl != null && viewModel.paymentToken != null) {
        WebpayView(
            url = viewModel.paymentUrl!!,
            token = viewModel.paymentToken!!,
            onClose = { 
                showWebpay = false 
                viewModel.paymentUrl = null
                viewModel.paymentToken = null
            },
            onSuccess = { token ->
                showWebpay = false
                viewModel.finalizarPagoExitoso(token)
            }
        )
    }

    LaunchedEffect(Unit) {
        viewModel.cargarCarrito()
    }

    LaunchedEffect(viewModel.mensaje) {
        viewModel.mensaje?.let {
            if (it == "Debes iniciar sesión para agregar al carrito") {
                onNavigateToLogin()
            } else {
                snackbarHostState.showSnackbar(it)
            }
            viewModel.mensaje = null
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
            Column(modifier = Modifier.background(brandBlue)) {
                // Título más alto aplicando padding al TopAppBar o un Spacer
                Spacer(modifier = Modifier.height(8.dp))
                TopAppBar(
                    title = { Text("Mi Carrito", color = Color.White) },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = brandBlue
                    )
                )
                // Línea verde
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(4.dp)
                        .background(brandGreen)
                )
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color.White)
        ) {
            if (viewModel.isLoading && viewModel.items.isEmpty()) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            } else if (viewModel.items.isEmpty()) {
                Column(
                    modifier = Modifier.align(Alignment.Center),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("Tu carrito está vacío", style = MaterialTheme.typography.bodyLarge)
                }
            } else {
                Column(modifier = Modifier.fillMaxSize()) {
                    LazyColumn(
                        modifier = Modifier.weight(1f),
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(viewModel.items) { item ->
                            CarritoItemView(
                                item = item,
                                onAumentar = { viewModel.cambiarCantidad(item.id, item.cantidad + 1) },
                                onReducir = { viewModel.cambiarCantidad(item.id, item.cantidad - 1) }
                            )
                        }
                    }

                    // Resumen y botón de compra
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RectangleShape,
                        elevation = CardDefaults.cardElevation(8.dp)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Total:", style = MaterialTheme.typography.titleLarge)
                                Text(
                                    "$${String.format(Locale.getDefault(), "%.2f", total)}",
                                    style = MaterialTheme.typography.titleLarge,
                                    color = brandBlue,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            Spacer(modifier = Modifier.height(16.dp))
                            
                            // Botón único para Finalizar Pedido
                            Button(
                                onClick = { showActionDialog = true },
                                modifier = Modifier.fillMaxWidth(),
                                enabled = !viewModel.isLoading && viewModel.items.isNotEmpty(),
                                colors = ButtonDefaults.buttonColors(containerColor = brandBlue)
                            ) {
                                Icon(Icons.Default.ShoppingCartCheckout, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("Finalizar Pedido")
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun WebpayView(
    url: String,
    token: String,
    onClose: () -> Unit,
    onSuccess: (String) -> Unit
) {
    androidx.compose.ui.window.Dialog(
        onDismissRequest = onClose,
        properties = androidx.compose.ui.window.DialogProperties(
            usePlatformDefaultWidth = false,
            dismissOnBackPress = true,
            dismissOnClickOutside = false
        )
    ) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = Color.White
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                // Header del Dialog
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Pago Seguro Webpay", fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    IconButton(onClick = onClose) {
                        Icon(Icons.Default.Close, contentDescription = "Cerrar")
                    }
                }

                // WebView con el formulario de Transbank
                AndroidView(
                    factory = { context ->
                        WebView(context).apply {
                            settings.javaScriptEnabled = true
                            settings.domStorageEnabled = true
                            webViewClient = object : WebViewClient() {
                                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                                    if (url != null && url.contains("vmaindustrial.cl/webpay/return")) {
                                        val uri = android.net.Uri.parse(url)
                                        val responseToken = uri.getQueryParameter("token_ws") ?: token
                                        onSuccess(responseToken)
                                        return true
                                    }
                                    return false
                                }
                            }
                            
                            // Transbank requiere un POST con el token_ws
                            val postData = "token_ws=$token"
                            postUrl(url, postData.toByteArray())
                        }
                    },
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

@Composable
fun CarritoItemView(
    item: CarritoItemConProducto,
    onAumentar: () -> Unit,
    onReducir: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(12.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Imagen del producto en el carrito
            AsyncImage(
                model = item.producto.imagen_url ?: "https://via.placeholder.com/100",
                contentDescription = item.producto.descripcion,
                modifier = Modifier
                    .size(60.dp)
                    .background(Color.LightGray.copy(alpha = 0.2f), RoundedCornerShape(4.dp)),
                contentScale = ContentScale.Crop
            )

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.producto.descripcion,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 2,
                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                )
                Text(
                    text = "$${item.producto.precio ?: 0.0}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color(0xFF002E4F),
                    fontWeight = FontWeight.Bold
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                IconButton(onClick = onReducir) {
                    Icon(Icons.Default.Remove, contentDescription = "Reducir", modifier = Modifier.size(20.dp))
                }
                Text(
                    text = item.cantidad.toString(),
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
                IconButton(onClick = onAumentar) {
                    Icon(Icons.Default.Add, contentDescription = "Aumentar", modifier = Modifier.size(20.dp))
                }
            }
        }
    }
}
