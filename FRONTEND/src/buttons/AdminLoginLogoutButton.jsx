
import React from 'react'
import { ShieldCheck } from 'lucide-react'

function AdminLoginLogoutButton() {
  return (
    <a
      href="#"
      className="group hidden sm:flex items-center gap-2 px-5 h-10 rounded-lg border-2 border-white/70 text-white font-semibold text-sm transition-all duration-300 hover:bg-white hover:text-teal-700 bg-white/10 backdrop-blur-sm"
    >
      <ShieldCheck className="size-[18px]" />
      <span>Admin Login</span>
    </a>
  )
}

export default AdminLoginLogoutButton
