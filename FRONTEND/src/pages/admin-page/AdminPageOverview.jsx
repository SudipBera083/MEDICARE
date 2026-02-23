import HeaderComponent from '../../components/admin-components/AdminHeader.jsx'
import StatsSection from '../../components/admin-components/AdminStatus.jsx'
import ActivityTable from '../../components/admin-components/AdminActivityTable.jsx'

export default function AdminOverviewPage() {
  return (
    <>
      <HeaderComponent />
      <StatsSection />
      <ActivityTable />
    </>
  )
}