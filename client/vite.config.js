import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo-600 or pick your own
        "primary-dark": "#4338ca",
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
