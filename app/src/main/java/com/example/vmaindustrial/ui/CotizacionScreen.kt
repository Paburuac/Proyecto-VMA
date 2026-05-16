package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.vmaindustrial.viewmodel.CotizacionViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CotizacionScreen(viewModel: CotizacionViewModel) {
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)
    val errorRed = Color(0xFFD32F2F)

    Scaffold(
        topBar = {
            Column(modifier = Modifier.background(brandBlue)) {
                Spacer(modifier = Modifier.height(8.dp))
                TopAppBar(
                    title = { Text("Solicitar Cotización", color = Color.White) },
                    colors = TopAppBarDefaults.topAppBarColors(containerColor = brandBlue)
                )
                Box(modifier = Modifier.fillMaxWidth().height(4.dp).background(brandGreen))
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color.White)
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            // Fila Nombre y Empresa
            Row(modifier = Modifier.fillMaxWidth()) {
                CotizacionField(
                    label = "NOMBRE *",
                    value = viewModel.nombre,
                    onValueChange = { viewModel.nombre = it },
                    placeholder = "Tu nombre completo",
                    modifier = Modifier.weight(1f),
                    brandBlue = brandBlue,
                    errorRed = errorRed,
                    showError = viewModel.hasAttemptedSubmit
                )
                Spacer(modifier = Modifier.width(16.dp))
                CotizacionField(
                    label = "EMPRESA *",
                    value = viewModel.empresa,
                    onValueChange = { viewModel.empresa = it },
                    placeholder = "Nombre de la empresa",
                    modifier = Modifier.weight(1f),
                    brandBlue = brandBlue,
                    errorRed = errorRed,
                    showError = viewModel.hasAttemptedSubmit
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Fila Correo y Teléfono
            Row(modifier = Modifier.fillMaxWidth()) {
                CotizacionField(
                    label = "CORREO ELECTRÓNICO *",
                    value = viewModel.email,
                    onValueChange = { viewModel.email = it },
                    placeholder = "correo@empresa.cl",
                    modifier = Modifier.weight(1f),
                    brandBlue = brandBlue,
                    errorRed = errorRed,
                    showError = viewModel.hasAttemptedSubmit
                )
                Spacer(modifier = Modifier.width(16.dp))
                CotizacionField(
                    label = "TELÉFONO *",
                    value = viewModel.telefono,
                    onValueChange = { viewModel.telefono = it },
                    placeholder = "+56 9 XXXX XXXX",
                    modifier = Modifier.weight(1f),
                    brandBlue = brandBlue,
                    errorRed = errorRed,
                    showError = viewModel.hasAttemptedSubmit
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Producto de interés
            CotizacionField(
                label = "PRODUCTO DE INTERÉS",
                value = viewModel.productoInteres,
                onValueChange = { viewModel.productoInteres = it },
                placeholder = "Ej: Acetileno, Soldadora MIG 250A...",
                brandBlue = brandBlue,
                errorRed = errorRed,
                isRequired = false,
                showError = viewModel.hasAttemptedSubmit
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Mensaje
            CotizacionField(
                label = "MENSAJE *",
                value = viewModel.mensaje,
                onValueChange = { viewModel.mensaje = it },
                placeholder = "Describe tu consulta o solicitud de cotización...",
                brandBlue = brandBlue,
                errorRed = errorRed,
                isSingleLine = false,
                modifier = Modifier.height(150.dp),
                showError = viewModel.hasAttemptedSubmit
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Botón Enviar
            Button(
                onClick = { viewModel.enviarSolicitud() },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                colors = ButtonDefaults.buttonColors(containerColor = brandBlue),
                enabled = !viewModel.isLoading,
                shape = MaterialTheme.shapes.medium
            ) {
                if (viewModel.isLoading) {
                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(24.dp))
                } else {
                    Icon(Icons.Default.Assignment, contentDescription = null, tint = Color.White)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Enviar solicitud", color = Color.White, fontWeight = FontWeight.Bold)
                }
            }

            // Mensaje de estado
            viewModel.statusMessage?.let {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = it,
                    color = if (it.contains("éxito")) brandGreen else errorRed,
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
