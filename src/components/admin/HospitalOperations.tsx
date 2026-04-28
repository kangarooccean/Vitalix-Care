import React, { useState } from 'react';
import { Activity, Bed, Thermometer, ShieldAlert, Users, Timer, ArrowUpRight, ArrowDownRight, Search, RefreshCcw, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const wardData = [
  { id: 'W-4A', name: 'Intensive Care Unit (ICU)', capacity: 12, occupied: 10, status: 'Critical', staff: 6 },
  { id: 'W-4B', name: 'General Ward - Cardiology', capacity: 30, occupied: 22, status: 'Stable', staff: 4 },
  { id: 'W-3A', name: 'Pediatrics', capacity: 20, occupied: 18, status: 'Busy', staff: 5 },
  { id: 'W-2C', name: 'Neurology Recovery', capacity: 15, occupied: 7, status: 'Available', staff: 3 },
  { id: 'W-1A', name: 'Maternity Suite', capacity: 25, occupied: 12, status: 'Stable', staff: 4 },
  { id: 'W-ER', name: 'Emergency Triage', capacity: 40, occupied: 38, status: 'Critical', staff: 12 },
];

export default function HospitalOperations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredWards = wardData.filter(ward => 
    ward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ward.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">Hospital Operations Center</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time facility status and bed management systems</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all font-mono uppercase tracking-widest"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> Sync Data
            </button>
            <span className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-xs font-black uppercase tracking-widest font-mono">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Live System Sync
            </span>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OpsCard label="Total Admissions" value="142" trend="+12" icon={Users} color="primary" />
        <OpsCard label="Available Beds" value="48" trend="-5" icon={Bed} color="secondary" />
        <OpsCard label="Emergency Status" value="LEVEL 2" trend="STABLE" icon={ShieldAlert} color="primary" />
        <OpsCard label="Wait Time (Avg)" value="18m" trend="-2m" icon={Timer} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ward Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest font-mono shrink-0">Ward Capacity Status</h3>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search ward or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto text-left">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Ward ID</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4 text-center">Staff On-Duty</th>
                    <th className="px-6 py-4">Occupancy</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout">
                    {filteredWards.map((ward) => (
                      <motion.tr 
                        key={ward.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 font-mono font-bold text-primary text-sm">{ward.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-700">{ward.name}</div>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-sm font-bold text-slate-500">
                          {ward.staff}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                                  <div 
                                      className={`h-full rounded-full transition-all duration-500 ${ward.occupied / ward.capacity > 0.8 ? 'bg-error' : 'bg-secondary'}`} 
                                      style={{ width: `${(ward.occupied / ward.capacity) * 100}%` }}
                                  />
                              </div>
                              <span className="text-[11px] font-bold text-slate-500 font-mono">{ward.occupied}/{ward.capacity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                              ward.status === 'Critical' ? 'bg-error/10 text-error' : 
                              ward.status === 'Busy' ? 'bg-amber-100 text-amber-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                              {ward.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest font-mono">View</button>
                             <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-slate-600 transition-all">
                                <MoreVertical className="w-4 h-4" />
                             </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              
              {filteredWards.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  <p className="text-sm font-bold">No wards matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Vitals & Resources */}
        <div className="space-y-6">
          <div className="bg-primary rounded-2xl p-8 text-white shadow-xl shadow-primary/20">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h3 className="font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3">
                  <Activity className="text-secondary" /> System Health
              </h3>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${isRefreshing ? 'bg-secondary animate-pulse' : 'bg-secondary'}`} />)}
              </div>
            </div>
            <div className="space-y-8">
                <SystemMetric label="EMR Linkage" value="99.9%" status="ONLINE" />
                <SystemMetric label="Bio-Cloud Sync" value={isRefreshing ? 'SYNCING...' : 'DEGRADED'} status="65ms LATENCY" />
                <SystemMetric label="Tele-Link Uplink" value="STABLE" status="ACTIVE" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 font-mono">Resource Alerts</h3>
             <div className="space-y-4">
                <div className="p-4 bg-error/5 rounded-xl border border-error/10 flex items-start gap-4">
                    <ShieldAlert className="w-5 h-5 text-error shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-error uppercase mb-1">Critical Supply</p>
                      <p className="text-sm font-bold text-primary leading-tight">O- Negative Blood Supply: Low</p>
                    </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                    <Timer className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Maintenance</p>
                      <p className="text-sm font-bold text-primary leading-tight">MRI Scanner-3 Maintenance Duo in 48h</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpsCard({ label, value, trend, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={48} className={color === 'secondary' ? 'text-secondary' : 'text-primary'} />
            </div>
            <div className="relative">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 font-mono">{label}</p>
                <div className="flex items-end gap-3">
                    <h4 className="text-3xl font-black text-primary">{value}</h4>
                    <span className={`text-[10px] font-black font-mono mb-1 flex items-center gap-1 ${
                        trend.startsWith('+') ? 'text-secondary' : trend.startsWith('-') ? 'text-error' : 'text-blue-500'
                    }`}>
                        {trend.startsWith('+') ? <ArrowUpRight size={12} /> : trend.startsWith('-') ? <ArrowDownRight size={12} /> : null}
                        {trend}
                    </span>
                </div>
            </div>
        </div>
    );
}

function SystemMetric({ label, value, status }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</p>
                <span className="text-[9px] font-black px-1.5 py-0.5 bg-white/10 rounded">{status}</span>
            </div>
            <p className="text-xl font-black tracking-tight">{value}</p>
        </div>
    );
}
