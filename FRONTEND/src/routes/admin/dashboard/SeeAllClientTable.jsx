import { createFileRoute } from '@tanstack/react-router'
import SeeAllClientPage from '../../../pages/admin-page/AdminAllClientListPage.jsx'

export const Route = createFileRoute('/admin/dashboard/SeeAllClientTable')({
  component: SeeAllClientPage,
})

function RouteComponent() {
  return <div>Hello "/admin/dashboard/SeeAllClientTable"!</div>
}
