import { useState } from 'react';

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
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display text-[32px] font-bold text-slate-800 dark:text-white mb-1">Search Clients</h2>
          <p className="font-medium text-slate-500 dark:text-slate-400">Query the database to find specific laboratory clients.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-800 border shadow-sm rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 border shadow-sm rounded-full border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center w-8 h-8 font-bold text-primary bg-accent rounded-full text-xs">JD</div>
            <span className="text-sm font-semibold text-slate-700 dark:text-white">John Doe</span>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-[12px] shadow-sm border border-slate-200/60 dark:border-slate-700 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-6 md:flex-row items-end">
          <div className="grid flex-1 w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-wider uppercase text-slate-400" htmlFor="shop-name">Shop Name</label>
              <div className="relative">
                <span className="absolute text-xl -translate-y-1/2 material-symbols-outlined left-3 top-1/2 text-slate-400">store</span>
                <input
                  className="w-full py-3 pl-10 pr-4 text-sm transition-all border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
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
                  className="w-full py-3 pl-10 pr-4 text-sm transition-all border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
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
      <section className="relative min-h-[450px] flex items-center justify-center dashed-border bg-white/40 dark:bg-slate-800/40">
          {isSearching ? (
            <div
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/10">
                <span className="text-5xl material-symbols-outlined text-primary animate-pulse">database</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold font-display text-slate-800 dark:text-white">Searching Database...</h3>
              <p className="max-w-sm mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                We're looking for clients matching your criteria. This won't take long.
              </p>
            </div>
          ) : (
            <div
              key="ready"
              className="flex flex-col items-center p-12 text-center"
            >
              <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/5">
                <span className="text-5xl opacity-40 material-symbols-outlined text-primary">science</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold font-display text-slate-800 dark:text-white">Ready to query</h3>
              <p className="max-w-sm mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                Search results will appear here after querying the database. Use the fields above to filter by name or contact.
              </p>
              <div className="flex gap-2 mt-8">
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
              </div>
            </div>
          )}
      </section>
    </>
  );
}
