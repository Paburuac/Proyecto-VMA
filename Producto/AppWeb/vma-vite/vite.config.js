/**
 * vite.config.js
 * Configuración de Vite para VMA Industrial.
 *
 * El proyecto usa index.html en la raíz como entry point.
 * Los archivos legacy (assets/js/*.js y assets/css/*.css)
 * se sirven estáticos; solo src/ usa el sistema de módulos de Vite.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Carpeta raíz del proyecto (donde vive index.html)
  root: '.',

  // Carpeta de salida del build de producción
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  // Servidor de desarrollo local
  server: {
    port: 5173,
    open: true,
  },

  // Variables de entorno: Vite expone solo las que empiezan con VITE_
  envPrefix: 'VITE_',

  // Configuración de Vitest
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    // Aplicar la transformación JSX automática en el entorno de test
    transformMode: { web: [/\.[jt]sx?$/] },
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/tests/**'],
    },
  },
})
