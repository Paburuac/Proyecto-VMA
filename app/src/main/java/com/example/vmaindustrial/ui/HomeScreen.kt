package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.vmaindustrial.viewmodel.ProductoViewModel

@Composable
fun HomeScreen(viewModel: ProductoViewModel = viewModel()) {
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)

    LaunchedEffect(Unit) {
        viewModel.cargarDatos()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .verticalScroll(rememberScrollState())
    ) {
        // --- HEADER AZUL CON LOGO ---
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(brandBlue)
                .padding(vertical = 32.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                // LOGO VMA INDUSTRIAL (Restaurado)
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(bottom = 32.dp)
                ) {
                    Surface(
                        color = brandGreen,
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.size(50.dp)
                    ) {
                        Box(contentAlignment = Alignment.Center) {
                            Text(
                                text = "VMA",
                                color = brandBlue,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 16.sp
                            )
                        }
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = "VMA Industrial",
                            color = Color.White,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            fontStyle = FontStyle.Italic
                        )
                    }
                }

                // Título Principal
                Text(
                    text = "Tu proveedor industrial",
                    color = Color.White,
                    fontSize = 36.sp,
                    fontWeight = FontWeight.ExtraBold,
                    textAlign = TextAlign.Center,
                    fontStyle = FontStyle.Italic
                )
                Text(
                    text = "de confianza",
                    color = brandGreen,
                    fontSize = 42.sp,
                    fontWeight = FontWeight.ExtraBold,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Gases industriales, soldaduras, herramientas y equipos de seguridad para la industria chilena. Atención personalizada y stock garantizado.",
                    color = Color.White.copy(alpha = 0.9f),
                    fontSize = 14.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(horizontal = 32.dp)
                )
            }
        }

        // --- BARRA LIMA (STATS) ---
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(brandGreen)
                .padding(vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            StatItem("1.400+", "PRODUCTOS", brandBlue)
            StatItem("9", "CATEGORÍAS", brandBlue)
            StatItem("20+", "AÑOS DE EXP.", brandBlue)
            StatItem("500+", "CLIENTES", brandBlue)
        }

        // --- SECCIÓN CATEGORÍAS ---
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Nuestras categorías",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = brandBlue
            )
            Text(
                text = "Encuentra todo lo que necesitas para tu industria",
                fontSize = 12.sp,
                color = Color.Gray
            )
            
            Box(modifier = Modifier.width(40.dp).height(2.dp).background(brandGreen).padding(top = 8.dp))

            Spacer(modifier = Modifier.height(24.dp))

            // Grid de categorías (limitado a altura fija para scroll interno o usar FlowRow)
            // Aquí usaremos una implementación manual con Column/Row para el verticalScroll del parent
            viewModel.categorias.chunked(2).forEach { rowItems ->
                Row(modifier = Modifier.fillMaxWidth()) {
                    rowItems.forEach { categoria ->
                        CategoryCard(
                            name = categoria.nombre_categoria,
                            modifier = Modifier.weight(1f).padding(4.dp),
                            brandBlue = brandBlue
                        )
                    }
                    if (rowItems.size == 1) Spacer(modifier = Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
fun StatItem(value: String, label: String, color: Color) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = value, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp, color = color, fontStyle = FontStyle.Italic)
        Text(text = label, fontSize = 8.sp, fontWeight = FontWeight.Bold, color = color)
    }
}

@Composable
fun CategoryCard(name: String, modifier: Modifier, brandBlue: Color) {
    Card(
        modifier = modifier.height(120.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = Icons.Default.Inventory2,
                contentDescription = null,
                tint = Color.Gray,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = name,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = brandBlue,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 4.dp)
            )
        }
    }
}
