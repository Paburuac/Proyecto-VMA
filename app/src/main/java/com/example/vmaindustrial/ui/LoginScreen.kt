package com.example.vmaindustrial.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.vmaindustrial.viewmodel.AuthViewModel

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
