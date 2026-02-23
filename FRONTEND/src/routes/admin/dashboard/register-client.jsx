import { createFileRoute } from '@tanstack/react-router'
import NewClientReggistrationPage from '../../../pages/admin-page/AdminNewClientRegistration.jsx'

export const Route = createFileRoute('/admin/dashboard/register-client')({
  component: NewClientReggistrationPage,
})
