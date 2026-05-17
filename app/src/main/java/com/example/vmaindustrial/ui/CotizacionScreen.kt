package com.example.vmaindustrial.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material3.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.vmaindustrial.viewmodel.AuthViewModel
import com.example.vmaindustrial.viewmodel.CotizacionViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CotizacionScreen(
    viewModel: CotizacionViewModel,
    authViewModel: AuthViewModel,
    onNavigateToLogin: () -> Unit,
    onNavigateToRegister: () -> Unit
) {
    val brandBlue = Color(0xFF002E4F)
    val brandGreen = Color(0xFF7CB342)
    val errorRed = Color(0xFFD32F2F)

    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Nueva Solicitud", "Mis Cotizaciones")

    LaunchedEffect(selectedTab) {
        if (selectedTab == 1) {
            println("DEBUG UI: Entrando a pestaña historial. Solicitando carga...")
            viewModel.cargarCotizacionesUsuario()
        }
    }

    Scaffold(
        topBar = {
            Column(modifier = Modifier.background(brandBlue)) {
                Spacer(modifier = Modifier.height(8.dp))
                TopAppBar(
                    title = { Text("Cotizaciones", color = Color.White) },
                    colors = TopAppBarDefaults.topAppBarColors(containerColor = brandBlue)
                )
                
                TabRow(
                    selectedTabIndex = selectedTab,
                    containerColor = brandBlue,
                    contentColor = Color.White,
                    indicator = { tabPositions ->
                        TabRowDefaults.SecondaryIndicator(
                            Modifier.tabIndicatorOffset(tabPositions[selectedTab]),
                            color = brandGreen,
                            height = 4.dp
                        )
                    },
                    divider = {}
                ) {
                    tabs.forEachIndexed { index, title ->
                        Tab(
                            selected = selectedTab == index,
                            onClick = { selectedTab = index },
                            text = { 
                                Text(
                                    text = title,
                                    color = if (selectedTab == index) brandGreen else Color.White.copy(alpha = 0.7f),
                                    fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                                ) 
                            }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color.White)
        ) {
            when (selectedTab) {
                0 -> NuevaSolicitudTab(viewModel, brandBlue, brandGreen, errorRed)
                1 -> MisCotizacionesTab(
                    viewModel = viewModel,
                    authViewModel = authViewModel,
                    onNavigateToLogin = onNavigateToLogin,
                    onNavigateToRegister = onNavigateToRegister,
                    brandBlue = brandBlue,
                    brandGreen = brandGreen,
                    errorRed = errorRed
                )
            }
        }
    }
}

@Composable
fun NuevaSolicitudTab(
    viewModel: CotizacionViewModel,
    brandBlue: Color,
    brandGreen: Color,
    errorRed: Color
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
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
