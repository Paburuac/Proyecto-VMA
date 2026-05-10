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
    // Copiar assets estáticos (CSS legacy, JS legacy, media, data)
    assetsDir: 'assets',
  },

  // Servidor de desarrollo local
  server: {
    port: 5173,
    open: true,   // abre el navegador automáticamente con `npm run dev`
  },

  // Variables de entorno: Vite expone solo las que empiezan con VITE_
  // Definidas en .env — nunca hardcodearlas aquí
  envPrefix: 'VITE_',
})
