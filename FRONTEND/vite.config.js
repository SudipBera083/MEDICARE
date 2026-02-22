import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import React from 'react'
import { tanstackRouter } from "@tanstack/react-router-plugin/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
       tanstackRouter()

  ],
})
