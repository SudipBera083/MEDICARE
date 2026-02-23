import { ArrowRight, MoreHorizontal } from 'lucide-react'
import { motion } from 'motion/react'

const clients = [
  { name: 'Genetech Solutions', type: 'Biological Research', status: 'Active', id: 'LB-2023-9081', plan: 'Subscribed', planColor: 'bg-primary/10 text-primary' },
  { name: 'MedLab Dynamics', type: 'Clinical Diagnostics', status: 'Active', id: 'LB-2023-7742', plan: 'Subscribed', planColor: 'bg-primary/10 text-primary' },
]

export default function ActivityTable() {
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
          View all reports <ArrowRight className="w-4 h-4" />
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
                  <span className={`px-2 py-1 ${client.planColor} text-[10px] font-bold rounded uppercase`}>{client.plan}</span>
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
  )
}