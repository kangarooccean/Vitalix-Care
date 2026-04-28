import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_APPOINTMENTS } from '../constants';
import { cn } from '../lib/utils';

export default function Appointments() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1440px] mx-auto space-y-10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-primary-brand/10 rounded-2xl flex items-center justify-center text-primary-brand shadow-sm">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-primary-brand tracking-tight">My Appointments & Follow-ups</h1>
            <p className="text-outline text-sm font-medium mt-1">Manage your upcoming clinical visits and personalized recovery journey.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-primary-brand text-white rounded-xl text-sm font-black uppercase tracking-widest hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary-brand/20 transition-all active:scale-95">
          <Calendar size={18} />
          Schedule Appointment
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-brand tracking-tight">Upcoming Appointments</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"><ChevronLeft size={20} /></button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_APPOINTMENTS.map((apt) => (
            <div key={apt.id} className="bg-white border border-outline-variant rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={apt.doctor.includes('Sarah') 
                        ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop" 
                        : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop"} 
                      alt="Doctor" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle2 size={12} className="text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-brand">{apt.doctor}</h4>
                    <p className="text-[10px] font-black text-outline uppercase tracking-widest">{apt.specialty}</p>
                  </div>
                </div>
                <button className="text-outline hover:text-primary-brand transition-colors"><MoreVertical size={20} /></button>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                  <Calendar size={16} className="text-primary-brand" />
                  <span className="text-xs font-bold text-on-surface">{apt.date} • {apt.time}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                  {apt.type === 'telehealth' ? <Video size={16} className="text-secondary-brand" /> : <MapPin size={16} className="text-primary-brand" />}
                  <span className="text-xs font-bold text-on-surface">{apt.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-2 text-xs font-black text-primary-brand border border-outline-variant rounded-lg hover:bg-surface-container transition-colors uppercase tracking-widest">
                  Reschedule
                </button>
                <button className={cn(
                  "py-2 text-xs font-black text-white rounded-lg hover:opacity-90 transition-all uppercase tracking-widest",
                  apt.type === 'telehealth' ? "bg-secondary-brand shadow-lg shadow-secondary-brand/20" : "bg-primary-brand shadow-lg shadow-primary-brand/20"
                )}>
                  {apt.type === 'telehealth' ? 'Join Call' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
          <div className="bg-surface-container-low/50 border border-dashed border-outline-variant rounded-[24px] flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-surface-container transition-all">
             <div className="w-12 h-12 rounded-full bg-white border border-outline-variant flex items-center justify-center text-outline mb-4 group-hover:scale-110 transition-transform">
                <Calendar size={24} />
             </div>
             <p className="text-sm font-bold text-primary-brand">Schedule New Scan</p>
             <p className="text-[10px] text-outline mt-1 uppercase tracking-widest font-bold">Lab or Radiology</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 bg-white border border-outline-variant rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={20} className="text-primary-brand" />
            <h2 className="text-xl font-bold text-primary-brand tracking-tight">Personalized Follow-Up Plan</h2>
            <span className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-secondary-brand/10 text-secondary-brand rounded-full text-[10px] font-black uppercase">
               <span className="w-1.5 h-1.5 rounded-full bg-secondary-brand" />
               On Track
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-outline uppercase tracking-widest">Specialist Visits</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-surface-container-low/50 border border-outline-variant/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-secondary-brand" />
                    <span className="text-sm font-bold">Initial Cardiac Review</span>
                  </div>
                  <span className="text-[10px] text-outline font-bold">Completed</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-outline-variant/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-[18px] h-[18px] border-2 border-outline-variant rounded" />
                    <span className="text-sm font-bold">Post-Surgical Check</span>
                  </div>
                  <span className="text-[10px] text-primary-brand font-black bg-primary-brand/5 px-2 py-0.5 rounded">Next Week</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-outline uppercase tracking-widest">Medication & Lifestyle</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-surface-container-low/50 border border-outline-variant/30 rounded-xl">
                  <CheckCircle2 size={18} className="text-secondary-brand mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">Daily Statins</p>
                    <p className="text-[10px] text-outline mt-1 font-medium">Take 20mg at bedtime daily.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border border-outline-variant/30 rounded-xl">
                   <div className="w-[18px] h-[18px] mt-0.5 rounded-full bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                      <AlertCircle size={12} />
                   </div>
                  <div>
                    <p className="text-sm font-bold">Sodium Reduction</p>
                    <p className="text-[10px] text-outline mt-1 font-medium italic">Maintain &lt; 2000mg/day as per Dr. Jenkins.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-bold text-outline">
            <span>Next Review Date</span>
            <span className="text-on-surface font-black uppercase tracking-widest">Dec 15, 2023</span>
          </div>
        </section>

        <section className="lg:col-span-4 bg-white border border-outline-variant rounded-[32px] p-8 shadow-sm">
           <h2 className="text-xl font-bold text-primary-brand tracking-tight mb-2">Engagement</h2>
           <p className="text-xs text-outline font-medium mb-8">Your clinical adherence stats</p>

           <div className="space-y-10">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-primary-brand">Attendance Rate</span>
                  <span className="text-2xl font-black text-primary-brand">98%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-brand rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-primary-brand">Follow-up Completion</span>
                  <span className="text-2xl font-black text-primary-brand">74%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-brand rounded-full w-[74%]" />
                </div>
              </div>

              <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                <p className="text-[10px] font-black text-primary-brand uppercase tracking-widest mb-2">Health Pro-tip</p>
                <p className="text-xs text-outline leading-relaxed font-medium italic">
                  Completing follow-up labs 48 hours before your visit reduces appointment duration by 15%.
                </p>
              </div>
           </div>
        </section>
      </div>

      <section className="bg-white border border-outline-variant rounded-[32px] overflow-hidden shadow-sm">
         <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary-brand">Past Appointments</h2>
            <div className="flex gap-4">
               <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
                  <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-primary-brand text-white rounded-lg">All</button>
                  <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-outline">Specialists</button>
                  <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-outline">Labs</button>
               </div>
               <button className="flex items-center gap-2 px-4 py-1.5 border border-outline-variant rounded-xl text-[10px] font-black uppercase tracking-widest text-outline hover:bg-surface-container transition-colors">
                  <Filter className="w-4 h-4" /> Filter
               </button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead className="bg-surface-container-low text-[10px] font-black uppercase tracking-widest text-outline">
                  <tr>
                     <th className="py-6 px-8">Date & Provider</th>
                     <th className="py-6 px-8">Reason for Visit</th>
                     <th className="py-6 px-8">Clinical Notes</th>
                     <th className="py-6 px-8">Outcome</th>
                     <th className="py-6 px-8 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {[
                    { id: 1, date: 'Sept 12, 2023', dr: 'Dr. Sarah Jenkins', sj: 'SJ', reason: 'Bi-annual Cardiac Stress Test', notes: 'Patient shows improved recovery...', outcome: 'Stable', color: 'bg-emerald-100 text-emerald-700' },
                    { id: 2, date: 'Aug 05, 2023', dr: 'Dr. Michael Chen', sj: 'MC', reason: 'Knee MRI Review', notes: 'Minor meniscus tear confirmed...', outcome: 'Referral Issued', color: 'bg-amber-100 text-amber-700' },
                    { id: 3, date: 'July 20, 2023', dr: 'Main Lab Clinic', sj: 'ML', reason: 'Comprehensive Lipid Panel', notes: 'LDL levels within target range....', outcome: 'Normal', color: 'bg-blue-100 text-blue-700' }
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-6 px-8">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-outline text-xs">{row.sj}</div>
                              <div>
                                 <p className="font-bold text-on-surface">{row.date}</p>
                                 <p className="text-[10px] font-medium text-outline">{row.dr}</p>
                              </div>
                           </div>
                        </td>
                        <td className="py-6 px-8 font-medium italic text-on-surface-variant max-w-[200px]">{row.reason}</td>
                        <td className="py-6 px-8 text-xs text-outline max-w-[300px] leading-relaxed">{row.notes}</td>
                        <td className="py-6 px-8">
                           <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", row.color)}>
                              {row.outcome}
                           </span>
                        </td>
                        <td className="py-6 px-8 text-right">
                           <button className="text-[10px] font-black uppercase tracking-widest text-primary-brand hover:underline">Details</button>
                        </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
    </motion.div>
  );
}

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
