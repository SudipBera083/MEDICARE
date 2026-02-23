import { useState } from 'react';
import {
  User,
  Building2,
  FileText,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck
} from 'lucide-react';

export default function NewClientReggistrationPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display text-[32px] font-bold text-slate-800 dark:text-white mb-1">Register New Client</h2>
          <p className="font-medium text-slate-500 dark:text-slate-400">Create a new organizational profile in the Labeasy ecosystem.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Admin User</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">System Administrator</span>
          </div>
          <div className="bg-[#0b7ca233] rounded-full size-10 flex items-center justify-center overflow-hidden border border-[#0b7ca24d]">
            <img
              alt="Admin Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVmlu2I7Yjkj7byX7q4Ajipu2L6pO7Wk5tTl6uhADn_hg0kUY61jWcXUuqD0u8JogTFu3C5QGcCRRCYdFGoZse6Qk2eWqrb2XHkoCzFW4StOJWP3cuDXL_pgUgvRcxFCVrq0MCvy8-JTQ-XgzBOnZ7bkGV9CGMWtDQM7WtbWaSsmB2YP4HQvpPM9l4gkDil3P3QAJKD_GWdXhdLhlDczCiCli4XWnD89g6xzVaxQFG1Ymqj_XStiryu9oNgF1nafSxGKcbMTDyVA7T"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <div className="w-full max-w-[850px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-[#0b7ca20d] border border-[#0b7ca21a] dark:border-slate-700 overflow-hidden">
        {/* Registration Form */}
        <form className="px-8 py-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Section: Business Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0b7ca2] font-bold text-xs uppercase tracking-widest pb-1 border-b border-[#0b7ca21a]">
              <Building2 size={14} />
              Business Details
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Business Name</label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="e.g. BioTech Research Solutions"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Business Address</label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="Enter complete physical address"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Section: Contact & Access */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0b7ca2] font-bold text-xs uppercase tracking-widest pb-1 border-b border-[#0b7ca21a]">
              <User size={14} />
              Contact & Authentication
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Owner Name</label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="Full legal name"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Contact Number</label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="+91 00000 00000"
                  type="tel"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Email Address</label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="contact@business.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0b7ca2] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Administrative Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0b7ca2] font-bold text-xs uppercase tracking-widest pb-1 border-b border-[#0b7ca21a]">
              <FileText size={14} />
              Administrative Info
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-1">
                  GST Number <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  className="rounded-lg border border-[#0b7ca233] bg-[#f6f8f880] dark:bg-slate-900 focus:border-[#0b7ca2] focus:ring-2 focus:ring-[#0b7ca233] h-12 px-4 transition-all outline-none"
                  placeholder="Enter GSTIN if applicable"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Role</label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border-[#0b7ca21a] bg-slate-100 dark:bg-slate-900 text-slate-500 cursor-not-allowed h-12 px-4 outline-none"
                    readOnly
                    type="text"
                    value="Client"
                  />
                  <ShieldCheck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-[#0b7ca2] text-white font-bold h-14 rounded-xl hover:bg-[#0b7ca2ee] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0b7ca233] active:scale-[0.98]"
              type="submit"
            >
              <UserPlus size={20} />
              Register Client
            </button>
            <button
              className="px-10 border border-[#0b7ca233] text-[#0b7ca2] font-bold h-14 rounded-xl hover:bg-[#0b7ca20d] transition-all flex items-center justify-center"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
