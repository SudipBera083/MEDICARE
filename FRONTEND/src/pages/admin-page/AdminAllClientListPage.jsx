import { useState } from "react";
import { Users, ShieldCheck } from "lucide-react";

export default function SeeAllClientPage() {
  const [clients, setClients] = useState([
    { id: "CL-1001", name: "BioTech Research Solutions", active: true },
    { id: "CL-1002", name: "Medilab Diagnostics", active: true },
    { id: "CL-1003", name: "CarePath Laboratories", active: false },
    { id: "CL-1004", name: "Precision Health Labs", active: true },
  ]);

  const toggleActive = (id) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? { ...client, active: !client.active }
          : client
      )
    );
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display text-[32px] font-bold text-slate-800 dark:text-white mb-1">
            All Registered Clients
          </h2>
          <p className="font-medium text-slate-500 dark:text-slate-400">
            View and manage all client organizations in the Labeasy ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Admin User
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              System Administrator
            </span>
          </div>
          <div className="bg-[#0b7ca233] rounded-full size-10 flex items-center justify-center border border-[#0b7ca24d]">
            <ShieldCheck size={18} className="text-[#0b7ca2]" />
          </div>
        </div>
      </header>

      {/* Table Card */}
      <div className="w-full max-w-[1000px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-[#0b7ca20d] border border-[#0b7ca21a] dark:border-slate-700 overflow-hidden">
        <div className="px-8 py-6 border-b border-[#0b7ca21a] flex items-center gap-2 text-[#0b7ca2] font-bold text-xs uppercase tracking-widest">
          <Users size={14} />
          Client Directory
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b7ca20d] text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4 font-bold">Client ID</th>
                <th className="px-8 py-4 font-bold">Client Name</th>
                <th className="px-8 py-4 font-bold">Status</th>
                <th className="px-8 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#0b7ca21a] dark:divide-slate-700">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-[#0b7ca20a] transition-colors"
                >
                  <td className="px-8 py-5 font-medium text-slate-700 dark:text-slate-300">
                    {client.id}
                  </td>

                  <td className="px-8 py-5 font-semibold text-slate-900 dark:text-white">
                    {client.name}
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        client.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {client.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => toggleActive(client.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        client.active
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-[#0b7ca20d] text-[#0b7ca2] hover:bg-[#0b7ca233]"
                      }`}
                    >
                      {client.active ? "Set Inactive" : "Set Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}