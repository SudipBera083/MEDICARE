import { createFileRoute } from '@tanstack/react-router'
import HomePage from "../pages/HomePage.jsx"

export const Route = createFileRoute('/')({
  component: HomePage,
})

