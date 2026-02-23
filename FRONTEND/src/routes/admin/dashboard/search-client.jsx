import { createFileRoute } from '@tanstack/react-router'
import SearchClientPage from '../../../pages/admin-page/AdminSearchClientPage.jsx'

export const Route = createFileRoute('/admin/dashboard/search-client')({
  component: SearchClientPage,
})
