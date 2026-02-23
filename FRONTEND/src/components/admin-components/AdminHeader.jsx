import { Bell } from 'lucide-react'

export default function HeaderComponent() {
  return (
    <header className="mb-10 flex justify-between items-center">
      <div>
        <h2 className="font-display text-4xl font-bold text-charcoal dark:text-white mb-2">Admin Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back, Managing monitoring and client data.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-xs">JD</div>
          <span className="text-sm font-semibold dark:text-white">John Doe</span>
        </div>
      </div>
    </header>
  )
}