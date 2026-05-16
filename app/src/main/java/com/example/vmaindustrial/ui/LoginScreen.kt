package com.example.vmaindustrial.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.viewmodel.AuthViewModel
import com.example.vmaindustrial.viewmodel.CotizacionViewModel
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

@Composable
fun LoginScreen(
    onLoginSuccess: () -> Unit,
    onNavigateToRegister: () -> Unit,
    onDismiss: () -> Unit,
    viewModel: AuthViewModel = viewModel()
) {
    LaunchedEffect(viewModel.isSuccess) {
        if (viewModel.isSuccess) {
            onLoginSuccess()
            viewModel.isSuccess = false // Reset state
        }
    }

    val brandBlue = Color(0xFF002E4F)
    val errorRed = Color(0xFFD32F2F)

    Box(modifier = Modifier.fillMaxSize()) {
        IconButton(
            onClick = onDismiss,
            modifier = Modifier
                .align(Alignment.TopStart)
                .padding(8.dp)
        ) {
            Icon(Icons.Default.Close, contentDescription = "Cerrar")
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("Iniciar Sesión", style = MaterialTheme.typography.headlineLarge, color = brandBlue, fontWeight = FontWeight.Bold)

            Spacer(modifier = Modifier.height(32.dp))

            CotizacionField(
                label = "CORREO ELECTRÓNICO",
                value = viewModel.email,
                onValueChange = { viewModel.email = it },
                placeholder = "tu@correo.com",
                brandBlue = brandBlue,
                errorRed = errorRed
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Para la contraseña necesitamos un campo especial con visualTransformation
            // Así que adaptamos CotizacionField o usamos uno similar
            Text(
                text = "CONTRASEÑA",
                color = brandBlue,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.align(Alignment.Start)
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = viewModel.password,
                onValueChange = { viewModel.password = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("Tu contraseña", fontSize = 14.sp) },
                visualTransformation = PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = brandBlue,
                    unfocusedBorderColor = Color.LightGray
                )
            )

            viewModel.error?.let {
                Text(it, color = errorRed, modifier = Modifier.padding(top = 8.dp), fontSize = 12.sp)
            }

            Spacer(modifier = Modifier.height(32.dp))

            if (viewModel.isLoading) {
                CircularProgressIndicator(color = brandBlue)
            } else {
                Button(
                    onClick = { viewModel.login() },
                    modifier = Modifier.fillMaxWidth().height(56.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = brandBlue),
                    shape = MaterialTheme.shapes.medium
                ) {
                    Text("Ingresar", color = Color.White, fontWeight = FontWeight.Bold)
                }

                Spacer(modifier = Modifier.height(8.dp))

                TextButton(onClick = onNavigateToRegister) {
                    Text("¿No tienes cuenta? Regístrate aquí", color = brandBlue)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccountScreen(
    onNavigateToLogin: () -> Unit,
    onNavigateToRegister: () -> Unit,
    viewModel: AuthViewModel,
    cotizacionViewModel: CotizacionViewModel = viewModel()
) {
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)

    LaunchedEffect(viewModel.currentUser) {
        println("Debug AccountScreen: Lanzando efecto para cargar cotizaciones. Usuario: ${viewModel.currentUser?.user?.email}")
        if (viewModel.currentUser != null) {
            cotizacionViewModel.cargarCotizacionesUsuario()
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        if (viewModel.currentUser != null) {
            Column(modifier = Modifier.fillMaxSize()) {
                // Cabecera "Mis Cotizaciones"
                Surface(
                    color = brandBlue,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "Mis Cotizaciones",
                            color = brandGreen,
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Historial y estado de todas tus solicitudes enviadas",
                            color = Color.White.copy(alpha = 0.8f),
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }

                // Filtros
                var selectedFilter by remember { mutableStateOf("Todas") }
                val filters = listOf("Todas", "Pendientes", "En revisión", "Respondidas")

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    filters.forEach { filter ->
                        val count = when (filter) {
                            "Todas" -> cotizacionViewModel.misCotizaciones.size
                            "Pendientes" -> cotizacionViewModel.misCotizaciones.count { it.estado == "Pendiente" }
                            "En revisión" -> cotizacionViewModel.misCotizaciones.count { it.estado == "En revisión" }
                            "Respondidas" -> cotizacionViewModel.misCotizaciones.count { it.estado == "Respondida" }
                            else -> 0
                        }
                        
                        FilterChip(
                            selected = selectedFilter == filter,
                            onClick = { selectedFilter = filter },
                            label = { Text("$filter $count") },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = brandBlue,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }

                // Lista de Cotizaciones
                if (cotizacionViewModel.isLoading) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = brandBlue)
                    }
                } else {
                    val filteredList = when (selectedFilter) {
                        "Pendientes" -> cotizacionViewModel.misCotizaciones.filter { it.estado == "Pendiente" }
                        "En revisión" -> cotizacionViewModel.misCotizaciones.filter { it.estado == "En revisión" }
                        "Respondidas" -> cotizacionViewModel.misCotizaciones.filter { it.estado == "Respondida" }
                        else -> cotizacionViewModel.misCotizaciones
                    }

                    if (filteredList.isEmpty()) {
                        Box(modifier = Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
                            Text("No tienes cotizaciones en esta categoría")
                        }
                    } else {
                        LazyColumn(
                            modifier = Modifier.weight(1f),
                            contentPadding = PaddingValues(16.dp),
                            verticalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            items(filteredList) { cotizacion ->
                                CotizacionItemCard(cotizacion, brandBlue, brandGreen)
                            }
                        }
                    }
                }

                // Botón Cerrar Sesión
                Button(
                    onClick = { viewModel.logout() },
                    colors = ButtonDefaults.buttonColors(containerColor = brandBlue),
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .padding(16.dp)
                ) {
                    Text("Cerrar Sesión", color = Color.White)
                }
            }
        } else {
            Column(
                modifier = Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(text = "No has iniciado sesión")
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = onNavigateToLogin,
                    colors = ButtonDefaults.buttonColors(containerColor = brandBlue)
                ) {
                    Text("Iniciar Sesión", color = Color.White)
                }
                TextButton(onClick = onNavigateToRegister) {
                    Text("Crear una cuenta", color = brandBlue)
                }
            }
        }
    }
}

@Composable
fun CotizacionItemCard(cotizacion: Cotizacion, brandBlue: Color, brandGreen: Color) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "#${cotizacion.id ?: "---"}",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleMedium
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    StatusBadge(cotizacion.estado)
                }
                
                Text(
                    text = formatDateTime(cotizacion.created_at),
                    style = MaterialTheme.typography.bodySmall,
                    textAlign = androidx.compose.ui.text.style.TextAlign.End
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row {
                Text("Empresa", modifier = Modifier.width(80.dp), fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                Text(cotizacion.empresa ?: "---", fontSize = 13.sp)
            }
            
            Spacer(modifier = Modifier.height(4.dp))

            Row {
                Text("Productos", modifier = Modifier.width(80.dp), fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                val prodText = if (cotizacion.productos_solicitados.isNotEmpty()) {
                    cotizacion.productos_solicitados.take(3).joinToString { it.descripcion } + 
                        if (cotizacion.productos_solicitados.size > 3) " y ${cotizacion.productos_solicitados.size - 3} más..." else ""
                } else {
                    cotizacion.mensaje?.substringBefore("\n")?.replace("Producto: ", "") ?: "Consultar"
                }
                Text(prodText, modifier = Modifier.weight(1f), maxLines = 1, fontSize = 13.sp, overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis)
            }

            if (!cotizacion.mensaje.isNullOrBlank() && cotizacion.mensaje!!.contains("Mensaje: ")) {
                Spacer(modifier = Modifier.height(4.dp))
                Row {
                    Text("Mensaje", modifier = Modifier.width(80.dp), fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                    Text(cotizacion.mensaje!!.substringAfter("Mensaje: "), modifier = Modifier.weight(1f), maxLines = 2, fontSize = 13.sp, overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
            
            HorizontalDivider(color = Color.LightGray.copy(alpha = 0.5f))
            
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.History, contentDescription = null, modifier = Modifier.size(16.dp), tint = Color.Gray)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("${cotizacion.productos_solicitados.size} productos", style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                }
                
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(
                        onClick = { /* Ver detalle */ },
                        colors = ButtonDefaults.buttonColors(containerColor = brandBlue),
                        contentPadding = PaddingValues(horizontal = 8.dp, vertical = 0.dp),
                        modifier = Modifier.height(32.dp)
                    ) {
                        Icon(Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Ver detalle", fontSize = 11.sp)
                    }
                    
                    Button(
                        onClick = { /* Descargar PDF */ },
                        colors = ButtonDefaults.buttonColors(containerColor = brandGreen),
                        contentPadding = PaddingValues(horizontal = 8.dp, vertical = 0.dp),
                        modifier = Modifier.height(32.dp)
                    ) {
                        Icon(Icons.Default.Download, contentDescription = null, modifier = Modifier.size(14.dp), tint = Color.White)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Descargar PDF", fontSize = 11.sp, color = Color.White)
                    }
                }
            }
        }
    }
}

@Composable
fun StatusBadge(estado: String) {
    val bgColor = when (estado) {
        "Pendiente" -> Color(0xFFFFE0B2)
        "En revisión" -> Color(0xFFBBDEFB)
        "Respondida" -> Color(0xFFC8E6C9)
        else -> Color.LightGray
    }
    val textColor = when (estado) {
        "Pendiente" -> Color(0xFFE65100)
        "En revisión" -> Color(0xFF0D47A1)
        "Respondida" -> Color(0xFF1B5E20)
        else -> Color.DarkGray
    }
    Surface(
        color = bgColor,
        shape = RoundedCornerShape(16.dp)
    ) {
        Text(
            text = estado,
            color = textColor,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp),
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

fun formatDateTime(isoString: String?): String {
    if (isoString == null) return "---"
    return try {
        // Supabase format usually: 2024-05-18T15:43:00.000000+00:00
        val parser = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
        parser.timeZone = TimeZone.getTimeZone("UTC")
        val date = parser.parse(isoString)
        val formatter = SimpleDateFormat("dd 'de' MMMM 'de' yyyy\nhh:mm a", Locale.getDefault())
        formatter.format(date!!)
    } catch (e: Exception) {
        isoString
    }
}

@Composable
fun CotizacionField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    brandBlue: Color,
    errorRed: Color,
    modifier: Modifier = Modifier,
    isRequired: Boolean = true,
    isSingleLine: Boolean = true,
    showError: Boolean = false
) {
    var hasBeenFocused by remember { mutableStateOf(false) }

    Column(modifier = modifier) {
        Text(
            text = label,
            color = brandBlue,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .fillMaxWidth()
                .onFocusChanged { if (it.isFocused) hasBeenFocused = true },
            placeholder = { Text(placeholder, fontSize = 14.sp) },
            singleLine = isSingleLine,
            isError = (isRequired && value.isBlank() && (hasBeenFocused || showError)),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = brandBlue,
                unfocusedBorderColor = Color.LightGray,
                errorBorderColor = errorRed
            )
        )
        if (isRequired && value.isBlank() && (hasBeenFocused || showError)) {
            Text(
                text = "Este campo es obligatorio.",
                color = errorRed,
                fontSize = 10.sp,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
    }
}
