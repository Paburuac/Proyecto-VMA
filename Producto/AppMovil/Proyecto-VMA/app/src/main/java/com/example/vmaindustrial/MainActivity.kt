package com.example.vmaindustrial

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.example.vmaindustrial.ui.NavigationBarExample
import com.example.vmaindustrial.ui.theme.VMAIndustrialTheme
import com.example.vmaindustrial.viewmodel.SettingsViewModel
import androidx.lifecycle.viewmodel.compose.viewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VMAIndustrialTheme {
                NavigationBarExample()
            }
        }
    }
}
