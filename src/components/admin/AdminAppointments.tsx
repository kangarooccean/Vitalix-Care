import { Calendar as CalendarIcon, Clock, MoreVertical, Plus, Search } from 'lucide-react';
import { motion } from 'motion/react';

const appointments = [
  { id: 1, patient: 'Elena Rodriguez', doctor: 'Dr. Sharma', time: '09:00 AM', date: 'Today', type: 'Check-up', status: 'Confirmed' },
  { id: 2, patient: 'James Wilson', doctor: 'Dr. Sarah Johnson', time: '10:30 AM', date: 'Today', type: 'Surgery Follow-up', status: 'Pending' },
  { id: 3, patient: 'Sarah Chen', doctor: 'Dr. Sharma', time: '01:15 PM', date: 'Today', type: 'Consultation', status: 'Checked In' },
  { id: 4, patient: 'Michael Brown', doctor: 'Dr. Michael Chen', time: '03:45 PM', date: 'Tomorrow', type: 'Diagnostic', status: 'Confirmed' },
];

export default function AdminAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">Clinical Appointments</h2>
          <p className="text-sm text-slate-500 mt-1">Schedule and manage patient-physician encounters</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
          <Plus className="w-4 h-4" /> Schedule New
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Preview Mini */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">Date Selection</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => (
                <button 
                  key={i} 
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    i + 1 === 28 ? 'bg-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 font-mono">Duty Roster</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-white">DS</div>
                <div className="text-xs">
                  <p className="font-bold text-primary">Dr. Sharma</p>
                  <p className="text-slate-500">Lead Physician</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-white">SJ</div>
                <div className="text-xs">
                  <p className="font-bold text-primary">Dr. Sarah Johnson</p>
                  <p className="text-slate-500">On-Call</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search appointments..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                <Clock className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-0">
            {appointments.map((apt, index) => (
              <motion.div 
                key={apt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-6 px-8 py-5 hover:bg-slate-50/80 transition-colors border-b border-slate-50 group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center min-w-[60px] p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-tighter">{apt.time.split(' ')[1]}</p>
                  <p className="text-lg font-black text-primary -mt-1 leading-none">{apt.time.split(' ')[0]}</p>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-primary">{apt.patient}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">{apt.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {apt.date}</span>
                    <span className="flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> {apt.doctor}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest font-mono shadow-sm ${
                    apt.status === 'Confirmed' ? 'bg-secondary/10 text-secondary' :
                    apt.status === 'Checked In' ? 'bg-blue-50 text-blue-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {apt.status}
                  </span>
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight } from 'lucide-react';
