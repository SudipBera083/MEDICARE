import { createFileRoute } from '@tanstack/react-router'
import AdminDashboardPage from '../../pages/admin-page/AdminDashboardPage.jsx'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboardPage,
})
