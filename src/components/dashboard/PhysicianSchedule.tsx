import { Clock, User, Activity, ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  vitals: {
    hr: number;
    bp: string;
    temp: string;
  };
  priority: 'High' | 'Normal' | 'Urgent';
  status: 'Waiting' | 'Ready' | 'In Progress';
}

const appointments: Appointment[] = [
  {
    id: 'APT-001',
    patientName: 'Elena Rodriguez',
    time: '09:00 AM',
    type: 'Post-Op Consultation',
    vitals: { hr: 72, bp: '120/80', temp: '98.6°F' },
    priority: 'Normal',
    status: 'Ready'
  },
  {
    id: 'APT-002',
    patientName: 'James Wilson',
    time: '09:45 AM',
    type: 'Cardiac Review',
    vitals: { hr: 88, bp: '145/95', temp: '99.1°F' },
    priority: 'Urgent',
    status: 'Waiting'
  },
  {
    id: 'APT-003',
    patientName: 'Sarah Chen',
    time: '10:30 AM',
    type: 'Neuro Assessment',
    vitals: { hr: 65, bp: '110/70', temp: '98.4°F' },
    priority: 'High',
    status: 'Waiting'
  }
];

interface PhysicianScheduleProps {
    onSelectPatient: (patient: Appointment) => void;
}

export default function PhysicianSchedule({ onSelectPatient }: PhysicianScheduleProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 bg-white">
        <h2 className="text-xl font-bold text-primary tracking-tight">Today's Schedule</h2>
        <p className="text-sm text-slate-500 mt-0.5">Prioritized patient encounters</p>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        {appointments.map((apt, index) => (
          <motion.button
            key={apt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPatient(apt)}
            className="w-full text-left p-5 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group flex gap-4"
          >
            <div className={`p-3 rounded-xl flex flex-col items-center justify-center min-w-[70px] ${
                apt.priority === 'Urgent' ? 'bg-error-container text-error' : 'bg-primary/5 text-primary'
            }`}>
                <Clock className="w-4 h-4 mb-1" />
                <span className="text-[12px] font-black font-mono">{apt.time.split(' ')[0]}</span>
                <span className="text-[10px] font-bold opacity-70">{apt.time.split(' ')[1]}</span>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-bold text-primary group-hover:text-secondary transition-colors">{apt.patientName}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{apt.type}</p>
                    </div>
                    {apt.priority === 'Urgent' && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-error uppercase font-mono tracking-tighter">
                            <AlertCircle className="w-3 h-3" /> Urgent
                        </span>
                    )}
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-100">
                        <Activity className="w-3 h-3 text-secondary" />
                        <span className="text-[10px] font-bold text-slate-600 font-mono">{apt.vitals.hr} BPM</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-[10px] font-bold text-slate-600 font-mono">{apt.vitals.bp}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
