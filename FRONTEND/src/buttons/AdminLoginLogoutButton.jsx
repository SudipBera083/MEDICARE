
import React from 'react'
import { ShieldCheck } from 'lucide-react'
// import AdminLoginPage from "../pages/admin-page/AdminLoginPage"
import { Link } from '@tanstack/react-router'
function AdminLoginLogoutButton() {
  return (
   <Link to="/admin/loginRoute">
    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
      <ShieldCheck className="w-5 h-5" />
      Admin Login
    </button>
   </Link>
  )
}

export default AdminLoginLogoutButton
