package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.vmaindustrial.model.Cotizacion
import com.example.vmaindustrial.viewmodel.AuthViewModel
import com.example.vmaindustrial.viewmodel.CotizacionViewModel
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MisCotizacionesTab(
    viewModel: CotizacionViewModel,
    authViewModel: AuthViewModel,
    onNavigateToLogin: () -> Unit,
    onNavigateToRegister: () -> Unit,
    brandBlue: Color,
    brandGreen: Color,
    errorRed: Color
) {
    if (authViewModel.currentUser == null) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(Icons.Default.History, contentDescription = null, modifier = Modifier.size(64.dp), tint = Color.LightGray)
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "Inicia sesión para ver tu historial", fontWeight = FontWeight.Bold)
            Text(text = "Podrás hacer seguimiento a todas tus solicitudes.", textAlign = TextAlign.Center, color = Color.Gray, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(24.dp))
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
    } else {
        Column(modifier = Modifier.fillMaxSize()) {
            // Filtros
            var selectedFilter by remember { mutableStateOf("Todas") }
            val filters = remember { listOf("Todas", "Pendientes", "En revisión", "Respondidas") }

            val counts = remember(viewModel.misCotizaciones) {
                mapOf(
                    "Todas" to viewModel.misCotizaciones.size,
                    "Pendientes" to viewModel.misCotizaciones.count { it.estado == "Pendiente" },
                    "En revisión" to viewModel.misCotizaciones.count { it.estado == "En revisión" },
                    "Respondidas" to viewModel.misCotizaciones.count { it.estado == "Respondida" }
                )
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                filters.forEach { filter ->
                    val count = counts[filter] ?: 0
                    
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
            if (viewModel.isLoading) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = brandBlue)
                }
            } else {
                val filteredList = remember(selectedFilter, viewModel.misCotizaciones) {
                    when (selectedFilter) {
                        "Pendientes" -> viewModel.misCotizaciones.filter { it.estado == "Pendiente" }
                        "En revisión" -> viewModel.misCotizaciones.filter { it.estado == "En revisión" }
                        "Respondidas" -> viewModel.misCotizaciones.filter { it.estado == "Respondida" }
                        else -> viewModel.misCotizaciones
                    }
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
        }
    }
}

@Composable
fun CotizacionItemCard(cotizacion: Cotizacion, brandBlue: Color, brandGreen: Color) {
    val formattedDate = remember(cotizacion.created_at) { formatDateTime(cotizacion.created_at) }
    val prodText = remember(cotizacion.productos_solicitados, cotizacion.mensaje) {
        if (!cotizacion.productos_solicitados.isNullOrEmpty()) {
            cotizacion.productos_solicitados!!.joinToString(", ") { it.descripcion }
        } else {
            cotizacion.mensaje?.substringBefore("\n")?.replace("Producto: ", "") ?: "Consultar"
        }
    }

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
                    text = formattedDate,
                    style = MaterialTheme.typography.bodySmall,
                    textAlign = TextAlign.End
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
                Text(prodText, modifier = Modifier.weight(1f), maxLines = 1, fontSize = 13.sp, overflow = TextOverflow.Ellipsis)
            }

            if (!cotizacion.mensaje.isNullOrBlank() && cotizacion.mensaje.contains("Mensaje: ")) {
                Spacer(modifier = Modifier.height(4.dp))
                Row {
                    Text("Mensaje", modifier = Modifier.width(80.dp), fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                    Text(cotizacion.mensaje.substringAfter("Mensaje: "), modifier = Modifier.weight(1f), maxLines = 2, fontSize = 13.sp, overflow = TextOverflow.Ellipsis)
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
                    Text("Ver productos", style = MaterialTheme.typography.bodySmall, color = Color.Gray)
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
        // Supabase often returns strings like 2023-10-27T10:00:00.123456+00:00
        // SimpleDateFormat "yyyy-MM-dd'T'HH:mm:ss" might fail if there are milliseconds.
        // We take the first 19 characters to get "yyyy-MM-dd'T'HH:mm:ss"
        val cleanIso = if (isoString.length >= 19) isoString.substring(0, 19) else isoString
        val parser = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
        parser.timeZone = TimeZone.getTimeZone("UTC")
        val date = parser.parse(cleanIso)
        val formatter = SimpleDateFormat("dd 'de' MMMM 'de' yyyy\nhh:mm a", Locale.getDefault())
        formatter.format(date!!)
    } catch (e: Exception) {
        isoString
    }
}
