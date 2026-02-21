import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{createRouter, RouterProvider} from "@tanstack/react-router"
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const router = createRouter({
  context: {
    queryClient,
  },
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </QueryClientProvider>
    
  
)
