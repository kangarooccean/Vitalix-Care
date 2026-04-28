import React from 'react';
import { 
  Pill, 
  Plus, 
  AlertTriangle, 
  Activity, 
  HeartPulse, 
  Clock, 
  CheckCircle2, 
  CheckCircle, 
  AlertCircle,
  Download,
  Filter,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

// Types
interface Medication {
  id: string;
  name: string;
  dosage: string;
  route: string;
  physician: string;
  frequency: string;
  status: 'active' | 'pending';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

interface DoseEvent {
  time: string;
  medication: string;
  status: 'completed' | 'due' | 'upcoming' | 'none';
}

interface HistoryItem {
  id: string;
  dateTime: string;
  medication: string;
  dosage: string;
  administeredBy: string;
  status: 'success' | 'missed';
  notes: string;
}

const ACTIVE_MEDS: Medication[] = [
  { 
    id: '1', 
    name: 'Metformin', 
    dosage: '500mg', 
    route: 'Oral Tablet', 
    physician: 'Dr. Vance', 
    frequency: 'DAILY', 
    status: 'active',
    icon: <Pill size={20} />,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  { 
    id: '2', 
    name: 'Warfarin', 
    dosage: '2.5mg', 
    route: 'Oral Tablet', 
    physician: 'Dr. Chen', 
    frequency: 'EVENING', 
    status: 'active',
    icon: <Activity size={20} />,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  { 
    id: '3', 
    name: 'Aspirin', 
    dosage: '81mg', 
    route: 'Oral Tablet', 
    physician: 'Dr. Vance', 
    frequency: 'MORNING', 
    status: 'active',
    icon: <HeartPulse size={20} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
];

const TIMELINE: DoseEvent[] = [
  { time: '08:00 AM', medication: 'Aspirin', status: 'completed' },
  { time: '12:00 PM', medication: '-', status: 'none' },
  { time: '02:00 PM', medication: 'Metformin', status: 'due' },
  { time: '06:00 PM', medication: 'Warfarin', status: 'upcoming' },
  { time: '10:00 PM', medication: '-', status: 'none' },
];

const HISTORY: HistoryItem[] = [
  { id: 'h1', dateTime: 'Oct 26, 08:00 AM', medication: 'Aspirin', dosage: '81mg', administeredBy: 'Self', status: 'success', notes: '-' },
  { id: 'h2', dateTime: 'Oct 25, 06:15 PM', medication: 'Warfarin', dosage: '2.5mg', administeredBy: 'Self', status: 'success', notes: 'Taken with food' },
  { id: 'h3', dateTime: 'Oct 25, 02:00 PM', medication: 'Metformin', dosage: '500mg', administeredBy: 'Self', status: 'success', notes: '-' },
  { id: 'h4', dateTime: 'Oct 25, 08:05 AM', medication: 'Aspirin', dosage: '81mg', administeredBy: 'Self', status: 'success', notes: '-' },
  { id: 'h5', dateTime: 'Oct 24, 06:30 PM', medication: 'Warfarin', dosage: '2.5mg', administeredBy: 'Self', status: 'success', notes: 'Slight bruising noted' },
  { id: 'h6', dateTime: 'Oct 24, 02:10 PM', medication: 'Metformin', dosage: '500mg', administeredBy: 'Self', status: 'missed', notes: 'Out of home during dose' },
];

export default function Medications() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto w-full space-y-8"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Pill size={16} className="text-primary" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Management</span>
          </div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">My Medications & Treatments</h2>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-primary/95 transition-all w-fit">
          <Plus size={18} /> Log New Treatment
        </button>
      </div>

      {/* Interaction Alert */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-4 shadow-sm"
      >
        <div className="p-2.5 bg-error text-white rounded-full shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-error text-sm sm:text-base tracking-tight">Critical Drug Interaction Alert</h4>
          <p className="text-error/80 text-sm mt-0.5 leading-relaxed">
            A clinical conflict has been detected between <span className="font-bold">Warfarin</span> and <span className="font-bold">Aspirin</span>. Concomitant use significantly increases hemorrhage risk.
          </p>
        </div>
        <button className="bg-error text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap hover:bg-error/90 transition-colors">
          Notify Doctor
        </button>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Main Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Active Protocols Panel */}
          <section className="bg-primary/5 border border-primary/10 rounded-2xl overflow-hidden relative p-6">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                Currently Active
              </h3>
              <span className="bg-primary text-white text-[9px] px-2 py-1 rounded-md font-bold tracking-tight">
                3 PROTOCOLS ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACTIVE_MEDS.map((med) => (
                <motion.div 
                  key={med.id}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm relative group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 ${med.iconBg} ${med.iconColor} rounded-lg`}>
                      {med.icon}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 group-hover:text-primary transition-colors tracking-wider">{med.frequency}</span>
                  </div>
                  
                  <h4 className="font-bold text-primary text-base mb-4">{med.name}</h4>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[11px] leading-tight">
                      <span className="text-slate-400 italic">Dosage:</span>
                      <span className="text-primary font-bold">{med.dosage}</span>
                    </div>
                    <div className="flex justify-between text-[11px] leading-tight">
                      <span className="text-slate-400 italic">Route:</span>
                      <span className="text-primary font-bold">{med.route}</span>
                    </div>
                    <div className="flex justify-between text-[11px] leading-tight">
                      <span className="text-slate-400 italic">Physician:</span>
                      <span className="text-primary font-bold">{med.physician}</span>
                    </div>
                  </div>

                  {med.name !== 'Metformin' && (
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Dose Timeline */}
          <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <Clock size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-primary">Upcoming Doses</h3>
            </div>

            <div className="relative pt-10 pb-6 overflow-x-auto no-scrollbar">
              {/* Timeline Line */}
              <div className="absolute top-[4.25rem] left-0 w-full h-0.5 bg-outline-variant/20"></div>
              
              <div className="flex justify-between items-center gap-12 min-w-[600px] px-4">
                {TIMELINE.map((event, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 relative group">
                    <span className={`text-[10px] font-bold mb-8 ${event.status === 'due' ? 'text-primary' : 'text-outline'}`}>
                      {event.time}
                    </span>
                    
                    <div className={`
                      w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-all
                      ${event.status === 'completed' ? 'bg-secondary ring-1 ring-secondary' : ''}
                      ${event.status === 'due' ? 'bg-primary ring-2 ring-primary w-6 h-6 -my-1' : ''}
                      ${event.status === 'upcoming' ? 'bg-surface-container ring-1 ring-outline-variant' : ''}
                      ${event.status === 'none' ? 'bg-surface ring-1 ring-outline-variant/10' : ''}
                    `}></div>

                    <div className="mt-4 text-center">
                      <p className={`text-xs font-bold ${event.status === 'due' ? 'text-primary' : 'text-on-surface'}`}>
                        {event.medication}
                      </p>
                      {event.status !== 'none' && (
                        <p className={`text-[10px] mt-0.5 ${
                          event.status === 'completed' ? 'text-secondary' : 
                          event.status === 'due' ? 'text-primary uppercase font-black' : 
                          'text-outline'
                        }`}>
                          {event.status === 'due' ? 'Due Now' : event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Insights */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Adherence Score Card */}
          <div className="bg-primary text-white rounded-2xl p-7 relative overflow-hidden shadow-xl ring-1 ring-white/10">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full"></div>
            <div className="absolute top-20 -right-4 w-20 h-20 bg-white/5 rounded-full"></div>
            
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <CheckCircle2 size={24} className="text-secondary" />
              Adherence Score
            </h3>

            <div className="flex items-center gap-5 mb-6">
              <div className="text-5xl font-black tracking-tight">94%</div>
              <div className="text-sm text-white/60 leading-tight">
                Excellent adherence over the <span className="text-white font-bold">last 30 days</span>.
              </div>
            </div>

            <div className="w-full bg-white/10 h-2.5 rounded-full mb-5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-secondary h-full rounded-full"
              />
            </div>

            <p className="text-[11px] text-white/50 font-medium italic border-l-2 border-secondary/50 pl-3 leading-relaxed">
              "Maintaining this consistency reduces secondary risk factors by 40% based on recent profiling."
            </p>
          </div>

          {/* Doctor's Notes */}
          <section className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-primary">Doctor's Notes</h4>
              <ChevronRight size={16} className="text-outline" />
            </div>

            <div className="p-4 bg-surface-container rounded-xl border-l-4 border-primary">
              <p className="text-xs text-outline leading-relaxed italic mb-3">
                "Keep monitoring blood glucose 2 hours after the Metformin dose. Contact immediate clinical support if dizziness persists with Warfarin titration."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop" alt="DC" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-primary">Dr. Sarah Chen — Oct 24, 2023</span>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden h-36 group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=2070&auto=format&fit=crop" 
                alt="Medical Chart" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                <p className="text-[10px] text-white font-medium">Viewing clinical trends for Q4 Protocols</p>
              </div>
            </div>
          </section>

        </div>

        {/* History Table - Full Width */}
        <div className="col-span-12">
          <section className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-bold text-primary">Administration History</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-bold text-outline px-4 py-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors">
                  <Download size={14} /> Export PDF
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-bold text-outline px-4 py-2 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors">
                  <Filter size={14} /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-surface text-outline text-[10px] uppercase tracking-widest font-black">
                  <tr>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Date & Time</th>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Medication</th>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Dosage</th>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Administered By</th>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Status</th>
                    <th className="py-4 px-6 border-b border-outline-variant/10">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-outline-variant/10">
                  {HISTORY.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container/30 transition-colors group">
                      <td className="py-4 px-6 font-bold text-primary">{item.dateTime}</td>
                      <td className="py-4 px-6">
                        <span className="flex items-center gap-2 text-primary font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant group-hover:bg-primary transition-colors"></span>
                          {item.medication}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-outline font-medium">{item.dosage}</td>
                      <td className="py-4 px-6 text-outline font-medium">{item.administeredBy}</td>
                      <td className="py-4 px-6">
                        {item.status === 'success' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/10 text-secondary font-black text-[10px] uppercase">
                            <CheckCircle size={14} /> Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-error/10 text-error font-black text-[10px] uppercase">
                            <AlertCircle size={14} /> Missed
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-outline/50 text-xs italic">
                        {item.notes === '-' ? <span className="opacity-30">—</span> : item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </div>
    </motion.div>
  );
}
