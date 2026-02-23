import { Outlet } from '@tanstack/react-router'
import Sidebar from '../../components/admin-components/AdminSidebar.jsx'

export default function AdminDashboardPage() {
  return (
    <div className="font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>
        <div className="relative z-10 p-10 max-w-7xl mx-auto w-full">
          
          
          <Outlet />   {/* ← child pages render here */}
       
       
        </div>
      </main>
    </div>
  )
}