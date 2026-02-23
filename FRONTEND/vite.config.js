import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ✅ Correct Tailwind plugin
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'  // ✅ Correct import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    })
  ],
})