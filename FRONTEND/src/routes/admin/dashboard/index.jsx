import { createFileRoute } from '@tanstack/react-router'
import AdminOverviewPage from '../../../pages/admin-page/AdminPageOverview.jsx'

export const Route = createFileRoute('/admin/dashboard/')({
  component: AdminOverviewPage,
})
