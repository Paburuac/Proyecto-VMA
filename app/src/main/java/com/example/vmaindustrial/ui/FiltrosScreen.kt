package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddShoppingCart
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.vmaindustrial.model.Producto
import com.example.vmaindustrial.viewmodel.CarritoViewModel
import com.example.vmaindustrial.viewmodel.ProductoViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FiltrosScreen(
    onNavigateToLogin: () -> Unit,
    viewModel: ProductoViewModel = viewModel(),
    carritoViewModel: CarritoViewModel = viewModel()
) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    // Cargar datos iniciales
    LaunchedEffect(Unit) {
        viewModel.cargarDatos()
    }

    // Mostrar mensajes del carrito
    LaunchedEffect(carritoViewModel.mensaje) {
        carritoViewModel.mensaje?.let {
            if (it == "Debes iniciar sesión para agregar al carrito") {
                onNavigateToLogin()
            } else {
                snackbarHostState.showSnackbar(it)
            }
            carritoViewModel.mensaje = null
        }
    }

    val productosFiltrados = viewModel.productosFiltrados()
    val categoriaActual = viewModel.categorias.find { it.id_categoria == viewModel.categoriaSeleccionada }
    
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)

    ModalNavigationDrawer(
        drawerContent = {
            ModalDrawerSheet(
                drawerContainerColor = brandBlue,
                drawerShape = RoundedCornerShape(0.dp) // Cuadrado para llenar arriba y abajo
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    // Parte Superior Azul (Header)
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Text(
                            "Filtros",
                            style = MaterialTheme.typography.titleLarge,
                            color = Color.White
                        )
                    }

                    // Línea verde superior
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(4.dp)
                            .background(brandGreen)
                    )

                    // Parte Central Blanca (Categorías)
                    Column(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth()
                            .background(Color.White)
                            .verticalScroll(rememberScrollState())
                    ) {
                        Text(
                            "Categorías",
                            modifier = Modifier.padding(16.dp),
                            style = MaterialTheme.typography.titleMedium
                        )

                        NavigationDrawerItem(
                            label = { Text("Todas las categorías") },
                            selected = viewModel.categoriaSeleccionada == null,
                            onClick = {
                                viewModel.categoriaSeleccionada = null
                                scope.launch { drawerState.close() }
                            },
                            colors = NavigationDrawerItemDefaults.colors(
                                unselectedContainerColor = Color.White,
                                selectedContainerColor = brandBlue.copy(alpha = 0.1f)
                            ),
                            modifier = Modifier.padding(horizontal = 12.dp)
                        )

                        viewModel.categorias.forEach { categoria ->
                            NavigationDrawerItem(
                                label = { Text(categoria.nombre_categoria) },
                                selected = viewModel.categoriaSeleccionada == categoria.id_categoria,
                                onClick = {
                                    viewModel.categoriaSeleccionada = categoria.id_categoria
                                    scope.launch { drawerState.close() }
                                },
                                colors = NavigationDrawerItemDefaults.colors(
                                    unselectedContainerColor = Color.White,
                                    selectedContainerColor = brandBlue.copy(alpha = 0.1f)
                                ),
                                modifier = Modifier.padding(horizontal = 12.dp)
                            )
                        }
                    }

                    // Línea verde inferior
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(4.dp)
                            .background(brandGreen)
                    )

                    // Parte Inferior Azul
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(32.dp)
                            .background(brandBlue)
                    )
                }
            }
        },
        drawerState = drawerState
    ) {
        Scaffold(
            snackbarHost = { SnackbarHost(snackbarHostState) },
            topBar = {
                Column(modifier = Modifier.background(brandBlue)) {
                    TopAppBar(
                        title = { Text(categoriaActual?.nombre_categoria ?: "Todos los Productos", color = Color.White) },
                        navigationIcon = {
                            IconButton(onClick = {
                                scope.launch {
                                    if (drawerState.isClosed) drawerState.open() else drawerState.close()
                                }
                            }) {
                                Icon(Icons.Default.Menu, contentDescription = "Menu", tint = Color.White)
                            }
                        },
                        actions = {
                            IconButton(onClick = {
                                viewModel.cargarDatos()
                            }) {
                                Icon(Icons.Default.Refresh, contentDescription = "Recargar", tint = Color.White)
                            }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(
                            containerColor = brandBlue
                        )
                    )

                    // Barra de búsqueda dentro del azul
                    OutlinedTextField(
                        value = viewModel.textoBusqueda,
                        onValueChange = { viewModel.textoBusqueda = it },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp),
                        placeholder = { Text("Buscar producto...") },
                        leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                        trailingIcon = {
                            if (viewModel.textoBusqueda.isNotEmpty()) {
                                IconButton(onClick = { viewModel.textoBusqueda = "" }) {
                                    Icon(Icons.Default.Close, contentDescription = "Limpiar")
                                }
                            }
                        },
                        singleLine = true,
                        shape = MaterialTheme.shapes.medium,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White,
                            focusedBorderColor = brandGreen,
                            unfocusedBorderColor = Color.Transparent,
                        )
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))

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
                if (viewModel.isLoading) {
                    CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                } else if (viewModel.mensajeError != null) {
                    Column(
                        modifier = Modifier.align(Alignment.Center),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Error: ${viewModel.mensajeError}",
                            color = MaterialTheme.colorScheme.error,
                            modifier = Modifier.padding(16.dp)
                        )
                        Button(onClick = { viewModel.cargarDatos() }) {
                            Text("Reintentar")
                        }
                    }
                } else if (productosFiltrados.isEmpty()) {
                    Text(
                        text = "No se encontraron productos",
                        modifier = Modifier.align(Alignment.Center)
                    )
                } else {
                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(bottom = 16.dp, start = 16.dp, end = 16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(productosFiltrados) { producto ->
                            ProductoItem(producto, onAddToCart = {
                                carritoViewModel.agregarProducto(producto.id_producto)
                            })
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ProductoItem(producto: Producto, onAddToCart: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(text = producto.descripcion, style = MaterialTheme.typography.titleMedium)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = "Código: ${producto.codigo}", style = MaterialTheme.typography.bodySmall)
                }
                IconButton(onClick = onAddToCart) {
                    Icon(
                        Icons.Default.AddShoppingCart,
                        contentDescription = "Añadir al carrito",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "$${producto.precio ?: 0.0}",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(text = "Stock: ${producto.stock ?: 0}", style = MaterialTheme.typography.bodySmall)
            }
            Text(text = "Distribuidor: ${producto.distribuidor ?: "Sin asignar"}", style = MaterialTheme.typography.bodySmall)
        }
    }
}
