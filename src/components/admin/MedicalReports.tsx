import { FileText, Download, Eye, Search, Filter, HardDrive } from 'lucide-react';
import { motion } from 'motion/react';

const reports = [
  { id: 'REP-2024-001', title: 'Cardiology Lab Analysis', patient: 'Elena Rodriguez', date: 'Oct 24, 2024', type: 'Diagnostic', size: '1.2 MB', priority: 'High' },
  { id: 'REP-2024-002', title: 'Post-Op Recovery Assessment', patient: 'James Wilson', date: 'Oct 23, 2024', type: 'Clinical Note', size: '450 KB', priority: 'Medium' },
  { id: 'REP-2024-003', title: 'Neurological Scan (MRI)', patient: 'Sarah Chen', date: 'Oct 22, 2024', type: 'Imaging', size: '24.5 MB', priority: 'Urgent' },
  { id: 'REP-2024-004', title: 'General Wellness Panel', patient: 'Michael Brown', date: 'Oct 22, 2024', type: 'Laboratory', size: '890 KB', priority: 'Low' },
];

export default function MedicalReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">Medical Records & Reports</h2>
          <p className="text-sm text-slate-500 mt-1">Access clinical documentation and diagnostic data</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 font-mono uppercase tracking-wider">
            <Download className="w-4 h-4" /> Export Archive
          </button>
          <button className="px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:brightness-110 transition-all flex items-center gap-2 font-mono uppercase tracking-wider">
            <HardDrive className="w-4 h-4" /> Cloud Sync
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-6 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports by patient or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 font-mono tracking-widest transition-all">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-mono font-black tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5">Document Title</th>
                <th className="px-8 py-5">Patient Holder</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Mime Type</th>
                <th className="px-8 py-5">Priority</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reports.map((report) => (
                <tr key={report.id} className="text-sm text-slate-700 hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded-lg text-primary">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-primary group-hover:text-secondary transition-colors">{report.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-semibold text-primary">{report.patient}</td>
                  <td className="px-8 py-5 text-slate-500">{report.date}</td>
                  <td className="px-8 py-5">
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-tighter">
                      {report.type} • {report.size}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest font-mono ${
                      report.priority === 'Urgent' ? 'text-error bg-error-container/20' :
                      report.priority === 'High' ? 'text-amber-600 bg-amber-50' :
                      'text-slate-500 bg-slate-100'
                    }`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-primary transition-all hover:bg-slate-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary transition-all hover:bg-slate-100 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Vault Storage: 42% Remaining</span>
            </div>
            <div className="flex gap-4">
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest font-mono">Previous Records</button>
                <div className="w-px h-3 bg-slate-200" />
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest font-mono">Next Archive</button>
            </div>
        </div>
      </div>
    </div>
  );
}
