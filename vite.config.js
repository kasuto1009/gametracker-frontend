import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // AÑADE ESTA LÍNEA: debe ser el nombre exacto de tu repositorio.
  base: "/gametracker-frontend/", 
})
