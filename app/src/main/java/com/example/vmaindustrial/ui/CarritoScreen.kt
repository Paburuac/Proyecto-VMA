package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingCartCheckout
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
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
                            val total = viewModel.items.sumOf { (it.producto.precio ?: 0.0) * it.cantidad }
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Total:", style = MaterialTheme.typography.titleLarge)
                                Text(
                                    "$${String.format(Locale.getDefault(), "%.2f", total)}",
                                    style = MaterialTheme.typography.titleLarge,
                                    color = MaterialTheme.colorScheme.primary,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            Spacer(modifier = Modifier.height(16.dp))
                            Button(
                                onClick = { viewModel.realizarCompra() },
                                modifier = Modifier.fillMaxWidth(),
                                enabled = !viewModel.isLoading
                            ) {
                                Icon(Icons.Default.ShoppingCartCheckout, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("Realizar Compra / Cotización")
                            }
                        }
                    }
                }
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
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = item.producto.descripcion, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = "$${item.producto.precio ?: 0.0}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.primary
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(onClick = onReducir) {
                    Icon(Icons.Default.Remove, contentDescription = "Reducir")
                }
                Text(
                    text = item.cantidad.toString(),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                IconButton(onClick = onAumentar) {
                    Icon(Icons.Default.Add, contentDescription = "Aumentar")
                }
            }
        }
    }
}
