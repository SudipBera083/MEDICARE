import React, { useState, useEffect } from 'react';
import { 
  Beaker, Users, UserPlus, FileEdit, Search, LogOut, 
  Bell, Info, ArrowRight, MoreHorizontal, Moon, Sun 
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Sidebar Component ---
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'clients', label: 'See all clients', icon: Users },
    { id: 'register', label: 'Register New Client', icon: UserPlus },
    { id: 'edit', label: 'Edit Client details', icon: FileEdit },
    { id: 'search', label: 'Search Client by ID', icon: Search },
  ];

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
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive 
                  ? 'bg-white/10 text-white border-l-4 border-accent' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 transition-colors group">
          <LogOut className="w-5 h-5 group-hover:text-red-400" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

// --- Header Component ---
const Header = () => {
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
  );
};

// --- StatsSection Component ---
const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Total Active Clients Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[12px] shadow-sm border border-slate-200/50 dark:border-slate-700 flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs">Total Active Clients</h3>
            <span className="px-2 py-1 bg-accent/20 text-accent text-[10px] font-bold rounded uppercase">+12% growth</span>
          </div>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-6xl font-display font-bold text-charcoal dark:text-white">432</span>
            <span className="text-slate-400 mb-2 font-medium">Active units</span>
          </div>
        </div>
        <div className="h-32 w-full mt-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
            <defs>
              <linearGradient id="gradientLine" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#A8D672', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#A8D672', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <path 
              d="M0 80 Q 40 70, 80 85 T 160 60 T 240 75 T 320 40 T 400 20" 
              fill="none" 
              stroke="#A8D672" 
              strokeLinecap="round" 
              strokeWidth="4" 
            />
            <path 
              d="M0 80 Q 40 70, 80 85 T 160 60 T 240 75 T 320 40 T 400 20 V 100 H 0 Z" 
              fill="url(#gradientLine)" 
            />
          </svg>
        </div>
      </motion.div>

      {/* Subscription Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-[12px] shadow-sm border border-slate-200/50 dark:border-slate-700"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs">Subscription Status</h3>
          <Info className="text-slate-400 w-5 h-5" />
        </div>
        <div className="flex items-center gap-12">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle className="text-slate-100 dark:text-slate-700" cx="18" cy="18" fill="none" r="15.915" stroke="currentColor" strokeWidth="4" />
              <circle cx="18" cy="18" fill="none" r="15.915" stroke="#0A7EA4" strokeWidth="4" strokeDasharray="90 10" strokeDashoffset="25" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-charcoal dark:text-white leading-none">389</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Subscribed</span>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm font-medium dark:text-slate-300">Subscribed</span>
              </div>
              <span className="text-xs font-bold text-slate-500">389</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-sm font-medium dark:text-slate-300">Not Subscribed</span>
              </div>
              <span className="text-xs font-bold text-slate-500">43</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- ActivityTable Component ---
const ActivityTable = () => {
  const clients = [
    {
      name: 'Genetech Solutions',
      type: 'Biological Research',
      status: 'Active',
      id: 'LB-2023-9081',
      plan: 'Subscribed',
      planColor: 'bg-primary/10 text-primary',
    },
    {
      name: 'MedLab Dynamics',
      type: 'Clinical Diagnostics',
      status: 'Active',
      id: 'LB-2023-7742',
      plan: 'Subscribed',
      planColor: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-[12px] shadow-sm border border-slate-200/50 dark:border-slate-700 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-display font-semibold text-lg dark:text-white">Recent Client Activity</h3>
        <button className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline transition-all">
          View all reports
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID Number</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {clients.map((client, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-sm dark:text-white">{client.name}</div>
                  <div className="text-xs text-slate-400">{client.type}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                    <div className={`w-1.5 h-1.5 rounded-full bg-green-500 ${idx === 0 ? 'animate-pulse' : ''}`}></div>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">{client.id}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 ${client.planColor} text-[10px] font-bold rounded uppercase`}>
                    {client.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('clients');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>

        <div className="relative z-10 p-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <Header />

          {/* Stats Section */}
          <StatsSection />

          {/* Activity Table */}
          <ActivityTable />
        </div>
      </main>

      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-charcoal dark:bg-white text-white dark:text-charcoal rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </div>
  );
}
