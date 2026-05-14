package com.example.vmaindustrial.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
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
            Text("Iniciar Sesión", style = MaterialTheme.typography.headlineLarge)

            Spacer(modifier = Modifier.height(32.dp))

            OutlinedTextField(
                value = viewModel.email,
                onValueChange = { viewModel.email = it },
                label = { Text("Email") },
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
            )

            Spacer(modifier = Modifier.height(16.dp))

            OutlinedTextField(
                value = viewModel.password,
                onValueChange = { viewModel.password = it },
                label = { Text("Contraseña") },
                visualTransformation = PasswordVisualTransformation(),
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
            )

            viewModel.error?.let {
                Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 8.dp))
            }

            Spacer(modifier = Modifier.height(24.dp))

            if (viewModel.isLoading) {
                CircularProgressIndicator()
            } else {
                Button(
                    onClick = { viewModel.login() },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Ingresar")
                }

                TextButton(onClick = onNavigateToRegister) {
                    Text("¿No tienes cuenta? Regístrate")
                }
            }
        }
    }
}
