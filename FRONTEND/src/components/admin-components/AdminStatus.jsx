import { Info } from 'lucide-react'
import { motion } from 'motion/react'

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
            <path d="M0 80 Q 40 70, 80 85 T 160 60 T 240 75 T 320 40 T 400 20" fill="none" stroke="#A8D672" strokeLinecap="round" strokeWidth="4" />
            <path d="M0 80 Q 40 70, 80 85 T 160 60 T 240 75 T 320 40 T 400 20 V 100 H 0 Z" fill="url(#gradientLine)" />
          </svg>
        </div>
      </motion.div>

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
  )
}