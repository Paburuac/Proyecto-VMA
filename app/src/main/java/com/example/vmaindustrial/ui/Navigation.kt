package com.example.vmaindustrial.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Dataset
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarDefaults
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.vmaindustrial.viewmodel.AuthViewModel
import com.example.vmaindustrial.viewmodel.CarritoViewModel

enum class Destination(
    val route: String,
    val icon: ImageVector?,
    val label: String,
    val contentDescription: String,
) {
    LOGIN("login", null, "Login", "Login Screen"),
    REGISTER("register", null, "Register", "Register Screen"),
    HOME("home", Icons.Default.Home, "Home", "Home Screen"),
    FILTROS("filtros", Icons.Default.Dataset, "Filtros", "Filtros Screen"),
    CARRITO("carrito", Icons.Default.ShoppingCart,"Carrito","Carrito Screen"),
    ACCOUNT("account", Icons.Default.AccountCircle,"Account","Account Screen"),
    SETTINGS("settings", Icons.Default.Settings, "Settings", "Settings Screen"),
}


@Composable
fun AppNavHost(
    navController: NavHostController,
    startDestination: Destination,
    modifier: Modifier = Modifier,
) {
    val authViewModel: AuthViewModel = viewModel()
    val carritoViewModel: CarritoViewModel = viewModel()
    
    NavHost(
        navController = navController,
        startDestination = startDestination.route,
        modifier = modifier,
    ) {
        composable(Destination.LOGIN.route) {
            LoginScreen(
                onLoginSuccess = { navController.popBackStack() },
                onNavigateToRegister = { navController.navigate(Destination.REGISTER.route) },
                onDismiss = { navController.popBackStack() },
                viewModel = authViewModel
            )
        }
        composable(Destination.REGISTER.route) {
            RegisterScreen(
                onRegisterSuccess = { navController.popBackStack() },
                onNavigateToLogin = { navController.navigate(Destination.LOGIN.route) },
                onDismiss = { navController.popBackStack() },
                viewModel = authViewModel
            )
        }
        composable(Destination.HOME.route) {
            HomeScreen()
        }
        composable(Destination.FILTROS.route) {
            FiltrosScreen(
                onNavigateToLogin = { navController.navigate(Destination.LOGIN.route) },
                carritoViewModel = carritoViewModel
            )
        }
        composable(Destination.CARRITO.route){
            CarritoScreen(
                onNavigateToLogin = { navController.navigate(Destination.LOGIN.route) },
                viewModel = carritoViewModel
            )
        }

        composable(Destination.ACCOUNT.route){
            AccountScreen(
                onNavigateToLogin = { navController.navigate(Destination.LOGIN.route) },
                onNavigateToRegister = { navController.navigate(Destination.REGISTER.route) },
                viewModel = authViewModel
            )
        }
        composable(Destination.SETTINGS.route) {
            SettingsScreen()
        }
    }
}

@Composable
fun HomeScreen() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text(text = "Home Screen")
    }
}

@Composable
fun AccountScreen(
    onNavigateToLogin: () -> Unit,
    onNavigateToRegister: () -> Unit,
    viewModel: AuthViewModel
) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        if (viewModel.currentUser != null) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = "Bienvenido, ${viewModel.currentUser?.user?.email ?: "Usuario"}")
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { viewModel.logout() }) {
                    Text("Cerrar Sesión")
                }
            }
        } else {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = "No has iniciado sesión")
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = onNavigateToLogin) {
                    Text("Iniciar Sesión")
                }
                TextButton(onClick = onNavigateToRegister) {
                    Text("Crear una cuenta")
                }
            }
        }
    }
}

@Composable
fun SettingsScreen() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text(text = "Settings Screen")
    }
}

@Composable
fun NavigationBarExample(modifier: Modifier = Modifier) {
    val navController = rememberNavController()
    val startDestination = Destination.HOME
    
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val showBottomBar = currentRoute != Destination.LOGIN.route && currentRoute != Destination.REGISTER.route

    Scaffold(
        modifier = modifier,
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(windowInsets = NavigationBarDefaults.windowInsets) {
                    Destination.entries.filter { it.icon != null }.forEach { destination ->
                        NavigationBarItem(
                            selected = currentRoute == destination.route,
                            onClick = {
                                navController.navigate(route = destination.route) {
                                    popUpTo(navController.graph.startDestinationId) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = {
                                Icon(
                                    destination.icon!!,
                                    contentDescription = destination.contentDescription,
                                )
                            },
                            label = { Text(destination.label) },
                        )
                    }
                }
            }
        },
    ) { contentPadding ->
        AppNavHost(
            navController = navController,
            startDestination = startDestination,
            modifier = Modifier.padding(contentPadding),
        )
    }
}
