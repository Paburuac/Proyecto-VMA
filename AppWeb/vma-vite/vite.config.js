/**
 * vite.config.js
 * Configuración de Vite para VMA Industrial.
 *
 * El proyecto usa index.html en la raíz como entry point.
 * Los archivos legacy (assets/js/*.js y assets/css/*.css)
 * se sirven estáticos; solo src/ usa el sistema de módulos de Vite.
 */

import { defineConfig } from 'vite'

export default defineConfig({
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
    environment: 'jsdom',   // simula el DOM del navegador
    globals: true,           // describe, it, expect disponibles sin importar
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.js'],
      exclude: ['src/tests/**'],
    },
  },
})
