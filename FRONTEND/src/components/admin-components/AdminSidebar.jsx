import { useState } from 'react'
import { Beaker, Users, UserPlus, Search, LogOut, LayoutDashboard } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'clients', label: 'See all clients', icon: Users, path: '/admin/dashboard/SeeAllClientTable' },
  { id: 'register', label: 'Register New Client', icon: UserPlus, path: '/admin/dashboard/register-client' },
  { id: 'search', label: 'Search Client by ID', icon: Search, path: '/admin/dashboard/search-client' },
]

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  return (
    <aside className="w-72 bg-primary flex flex-col h-screen shrink-0 border-r border-white/10">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
            <Beaker className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-white leading-none">Labeasy</h1>
            <p className="text-[10px] font-bold text-accent tracking-widest uppercase mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                navigate({ to: item.path })
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-white/10 text-white border-l-4 border-accent'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 transition-colors group">
          <LogOut className="w-5 h-5 group-hover:text-red-400" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}