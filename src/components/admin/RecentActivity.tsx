import { Filter, Download, FileEdit, Key, AlertTriangle, LogOut as LogOutIcon, Eye, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

interface Activity {
    type: string;
    user: string;
    ref: string;
    time: string;
    status: string;
    statusClass: string;
    icon: LucideIcon;
    iconColor: string;
}

const activities: Activity[] = [
  {
    type: 'Medical Record Update',
    user: 'Dr. Sarah Johnson',
    ref: '#PAT-88421',
    time: 'Today, 11:24 AM',
    status: 'Verified',
    statusClass: 'bg-secondary-container/30 text-secondary',
    icon: FileEdit,
    iconColor: 'text-blue-500'
  },
  {
    type: 'System Access Grant',
    user: 'Admin (System)',
    ref: '#STA-4421',
    time: 'Today, 10:45 AM',
    status: 'Pending',
    statusClass: 'bg-surface-container text-on-surface-variant',
    icon: Key,
    iconColor: 'text-amber-500'
  },
  {
    type: 'Inventory Threshold Alert',
    user: 'Supply Manager',
    ref: '#INV-8821 (Oxygen)',
    time: 'Today, 09:12 AM',
    status: 'Urgent',
    statusClass: 'bg-error-container text-error',
    icon: AlertTriangle,
    iconColor: 'text-error'
  },
  {
    type: 'Session Termination',
    user: 'Nurse Michael Chen',
    ref: '#SID-2910',
    time: 'Yesterday, 11:59 PM',
    status: 'Auto-Closed',
    statusClass: 'bg-surface-container text-on-surface-variant',
    icon: LogOutIcon,
    iconColor: 'text-blue-500'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white">
        <div>
          <h2 className="text-xl font-bold text-primary">Recent System Activity</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live audit trail of administrative actions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all font-mono tracking-wider uppercase">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all font-mono tracking-wider uppercase">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-mono font-extrabold tracking-[0.15em]">
              <th className="px-8 py-4">Action Type</th>
              <th className="px-8 py-4">User Identity</th>
              <th className="px-8 py-4">Subject Reference</th>
              <th className="px-8 py-4">Timestamp</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map((act, i) => (
              <tr key={i} className="text-sm text-slate-700 hover:bg-slate-50/50 transition-colors group cursor-default">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <act.icon className={`w-4 h-4 ${act.iconColor}`} />
                    <span className="font-bold">{act.type}</span>
                  </div>
                </td>
                <td className="px-8 py-5 font-semibold text-primary">{act.user}</td>
                <td className="px-8 py-5 text-slate-500 font-mono text-[13px]">{act.ref}</td>
                <td className="px-8 py-5 text-slate-500">{act.time}</td>
                <td className="px-8 py-5">
                  <span className={`px-2.5 py-1.5 rounded text-[10px] font-extrabold uppercase tracking-widest font-mono ${act.statusClass} shadow-sm inline-block`}>
                    {act.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-primary hover:bg-slate-100 rounded-lg transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-5 bg-white border-t border-slate-100 flex justify-between items-center text-[12px] font-bold text-slate-400 font-mono uppercase tracking-wider">
        <span>Showing 1-4 of 1,280 events</span>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-primary transition-all disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-md font-mono text-xs">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-primary transition-all font-mono text-xs">2</button>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-primary transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
