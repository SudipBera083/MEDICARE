import { createFileRoute } from '@tanstack/react-router'
import AdminLoginPage from "../../pages/admin-page/AdminLoginPage"
export const Route = createFileRoute('/admin/loginRoute')({
  component: AdminLoginPage,
})

// function RouteComponent() {
//   return <div>Hello "/admin/loginRoute"!</div>
// }
