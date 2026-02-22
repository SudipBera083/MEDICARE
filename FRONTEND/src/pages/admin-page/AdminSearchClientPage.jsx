import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SidebarItem = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'text-white/90 active-nav-item'
        : 'text-white/70 hover:text-white hover:bg-white/10'
    }`}
  >
    <span className="material-symbols-outlined opacity-70">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </a>
);

export default function SearchClientPage() {
  const [searchQuery, setSearchQuery] = useState({ shopName: '', mobile: '' });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f8fafc] text-slate-900">
      {/* Sidebar */}
      <aside className="sticky top-0 flex flex-col w-72 h-screen border-r bg-primary border-white/10 shrink-0 z-20">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 border rounded-lg bg-white/20 border-white/30">
              <span className="text-white material-symbols-outlined">biotech</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-display leading-none">Labeasy</h1>
              <p className="text-[10px] font-bold text-accent tracking-widest uppercase mt-1">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <SidebarItem icon="group" label="See all clients" />
          <SidebarItem icon="person_add" label="Register New Client" />
          <SidebarItem icon="edit_note" label="Edit Client details" />
          <SidebarItem icon="search" label="Search Client by ID" active />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center w-full gap-3 px-4 py-3 transition-colors rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 group">
            <span className="material-symbols-outlined group-hover:text-red-400">logout</span>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1">
        <div className="absolute inset-0 pointer-events-none dot-grid opacity-30"></div>
        
        <div className="relative z-10 w-full p-10 mx-auto max-w-7xl">
          <header className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-[32px] font-bold text-slate-800 mb-1">Search Clients</h2>
              <p className="font-medium text-slate-500">Query the database to find specific laboratory clients.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center w-10 h-10 bg-white border shadow-sm rounded-full border-slate-200 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-slate-600">notifications</span>
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-white border shadow-sm rounded-full border-slate-200">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-primary bg-accent rounded-full text-xs">JD</div>
                <span className="text-sm font-semibold text-slate-700">John Doe</span>
              </div>
            </div>
          </header>

          {/* Search Section */}
          <section className="bg-white p-6 rounded-[12px] shadow-sm border border-slate-200/60 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col gap-6 md:flex-row items-end">
              <div className="grid flex-1 w-full grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-slate-400" htmlFor="shop-name">Shop Name</label>
                  <div className="relative">
                    <span className="absolute text-xl -translate-y-1/2 material-symbols-outlined left-3 top-1/2 text-slate-400">store</span>
                    <input
                      className="w-full py-3 pl-10 pr-4 text-sm transition-all border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      id="shop-name"
                      placeholder="e.g. Genetech Solutions"
                      type="text"
                      value={searchQuery.shopName}
                      onChange={(e) => setSearchQuery({ ...searchQuery, shopName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-slate-400" htmlFor="mobile-number">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute text-xl -translate-y-1/2 material-symbols-outlined left-3 top-1/2 text-slate-400">phone_iphone</span>
                    <input
                      className="w-full py-3 pl-10 pr-4 text-sm transition-all border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      id="mobile-number"
                      placeholder="e.g. +1 (555) 000-0000"
                      type="text"
                      value={searchQuery.mobile}
                      onChange={(e) => setSearchQuery({ ...searchQuery, mobile: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] w-full md:w-auto h-[46px] disabled:opacity-50"
                type="submit"
                disabled={isSearching}
              >
                <span className={`material-symbols-outlined text-xl ${isSearching ? 'animate-spin' : ''}`}>
                  {isSearching ? 'progress_activity' : 'search'}
                </span>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </form>
          </section>

          {/* Results Area */}
          <section className="relative min-h-[450px] flex items-center justify-center dashed-border bg-white/40">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="searching"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/10">
                    <span className="text-5xl material-symbols-outlined text-primary animate-pulse">database</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold font-display text-slate-800">Searching Database...</h3>
                  <p className="max-w-sm mx-auto leading-relaxed text-slate-500">
                    We're looking for clients matching your criteria. This won't take long.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center p-12 text-center"
                >
                  <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/5">
                    <span className="text-5xl opacity-40 material-symbols-outlined text-primary">science</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold font-display text-slate-800">Ready to query</h3>
                  <p className="max-w-sm mx-auto leading-relaxed text-slate-500">
                    Search results will appear here after querying the database. Use the fields above to filter by name or contact.
                  </p>
                  <div className="flex gap-2 mt-8">
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}
