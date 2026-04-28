import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Pill, 
  FileText, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  MessageSquare,
  ArrowRight,
  Clock,
  Printer,
  Sparkles,
  Filter,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { time: '08:00', systolic: 120, glucose: 95 },
  { time: '10:00', systolic: 124, glucose: 102 },
  { time: '12:00', systolic: 122, glucose: 98 },
  { time: '14:00', systolic: 128, glucose: 110 },
  { time: '16:00', systolic: 124, glucose: 105 },
  { time: '18:00', systolic: 121, glucose: 99 },
];

import { User } from '../types';

interface DashboardProps {
  user: User | null;
  onNavigate?: (view: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  if (user?.role === 'family' || user?.role === 'patient') {
    return <FamilyDashboard onNavigate={onNavigate} />;
  }
  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  }
  return <StaffDashboard />;
};

function DoctorDashboard() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [ecgData, setEcgData] = useState<number[]>([]);

  // Simulate ECG wave
  useEffect(() => {
    const interval = setInterval(() => {
      setEcgData(prev => {
        const newData = [...prev, Math.random() * 50 + 25];
        if (newData.length > 50) return newData.slice(1);
        return newData;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const doctorPatients = [
    {
      id: '#PX-99281',
      name: 'James Wilson',
      age: 64,
      gender: 'M',
      ward: 'Ward 4B',
      bed: 'Bed 12',
      diagnosis: 'Post-Op CABG / Atrial Fibrillation',
      status: { hr: 'stable', bp: 'stable', spo2: 'critical' }
    },
    {
      id: '#PX-99104',
      name: 'Maria Gonzalez',
      age: 52,
      gender: 'F',
      ward: 'Ward 4B',
      bed: 'Bed 05',
      diagnosis: 'Chronic Heart Failure Exacerbation',
      status: { hr: 'stable', bp: 'stable', spo2: 'stable' }
    },
    {
      id: '#PX-99302',
      name: 'Robert Chen',
      age: 78,
      gender: 'M',
      ward: 'Ward 4B',
      bed: 'Bed 08',
      diagnosis: 'Unstable Angina / HTN',
      status: { hr: 'critical', bp: 'warning', spo2: 'stable' }
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'urgent',
      time: '5m ago',
      title: 'Ward 4B Bed 12: Low SpO2',
      description: 'Patient J. Wilson saturation dropped to 89%.'
    },
    {
      id: '2',
      type: 'observation',
      time: '12m ago',
      title: 'Ward 4B Bed 08: BP Spike',
      description: 'R. Chen systolic peaked at 178 mmHg.'
    }
  ];

  const doctorTasks = [
    {
      id: '1',
      due: 'Due Now',
      severity: 'high',
      title: 'Discharge Paperwork',
      description: 'Review clearance for Elena Rodriguez.'
    },
    {
      id: '2',
      due: 'In 30 Mins',
      severity: 'medium',
      title: 'Radiology Review',
      description: 'Chest X-Ray for Bed 05 (M. Gonzalez).'
    },
    {
      id: '3',
      due: 'In 1 Hour',
      severity: 'low',
      title: 'Team Briefing',
      description: 'Shift handover briefing.'
    }
  ];

  const [activeTasks, setActiveTasks] = useState(doctorTasks);
  const [activeAlerts, setActiveAlerts] = useState(alerts);

  const completeTask = (id: string) => {
    setActiveTasks(prev => prev.filter(t => t.id !== id));
  };

  const acknowledgeAlert = (id: string) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-[1600px] mx-auto min-h-screen"
    >
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/5 rounded-lg">
                  <Activity size={32} className="text-primary" />
                </div>
                <h2 className="text-3xl font-black text-primary tracking-tight">Clinical Surveillance</h2>
              </div>
              <p className="text-outline text-sm font-medium">Currently monitoring {doctorPatients.length} critical cases in Ward 4B</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsAiModalOpen(true)}
                className="bg-secondary text-white px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg shadow-secondary/20 hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest"
              >
                <Sparkles size={16} />
                AI Patient Summary
              </button>
              <button className="px-4 py-3 bg-white border border-outline-variant/30 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface-container transition-all">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {doctorPatients.map((patient) => (
              <DoctorPatientCard key={patient.id} patient={patient as any} />
            ))}
          </div>

          {/* Live Telemetry monitor integration */}
          <div className="bg-primary p-8 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="font-black text-xl text-white tracking-tight">Live Monitor: Ward Hub 4B</h4>
                <p className="text-xs text-white/50 font-medium uppercase tracking-[0.2em] mt-1">Unified Telemetry Stream</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <motion.span 
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_10px_rgba(var(--secondary),0.5)]"
                />
                <span className="text-secondary text-[10px] font-black uppercase tracking-widest">Live Sync</span>
              </div>
            </div>

            <div className="h-48 bg-black/20 rounded-2xl flex items-end p-6 gap-1 relative overflow-hidden">
               {/* Background grid */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
               <div className="flex-1 h-full flex items-end gap-1.5 relative z-10">
                {ecgData.map((val, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    className="flex-1 bg-gradient-to-t from-secondary to-secondary/30 rounded-t-full origin-bottom"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <div className="w-40 text-right shrink-0 relative z-10 flex flex-col justify-center">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-secondary text-5xl font-black tracking-tighter">72</span>
                  <span className="text-secondary/50 text-[10px] font-black">BPM</span>
                </div>
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-2">Global Avg HR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Side Panels */}
        <aside className="w-full xl:w-96 space-y-8">
          <div className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h5 className="font-black text-primary text-lg flex items-center gap-3 tracking-tight">
                <AlertTriangle size={22} className="text-error" />
                Active Alerts
              </h5>
              <span className="bg-error/10 text-error text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-error/10">
                {activeAlerts.length} NEW
              </span>
            </div>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {activeAlerts.map(alert => (
                  <motion.div 
                    key={alert.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`border-l-4 pl-6 py-1 relative group ${alert.type === 'urgent' ? 'border-error' : 'border-amber-400'}`}
                  >
                    <button 
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-outline hover:text-primary"
                    >
                      <X size={14} />
                    </button>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] text-outline font-black uppercase tracking-widest">{alert.type} • {alert.time}</p>
                    </div>
                    <p className="text-sm font-black text-primary mb-1">{alert.title}</p>
                    <p className="text-xs text-outline font-medium leading-relaxed">{alert.description}</p>
                  </motion.div>
                ))}
                {activeAlerts.length === 0 && (
                  <p className="text-xs text-center text-outline py-10">No active alerts</p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm p-8">
            <h5 className="font-black text-primary text-lg flex items-center gap-3 mb-8 tracking-tight">
              <CheckCircle2 size={22} className="text-primary" />
              Clinical Tasks
            </h5>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence mode="popLayout">
                {activeTasks.map(task => (
                  <motion.div 
                    key={task.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => completeTask(task.id)}
                    className="border border-outline-variant/20 p-5 rounded-2xl hover:bg-surface-container/30 transition-all group cursor-pointer border-l-4 border-l-primary/30"
                  >
                    <div className="flex justify-between mb-2">
                      <p className="text-[10px] text-outline font-black uppercase tracking-widest">{task.due}</p>
                      <span className={`w-2 h-2 rounded-full ${task.severity === 'high' ? 'bg-error' : task.severity === 'medium' ? 'bg-amber-400' : 'bg-primary'}`}></span>
                    </div>
                    <p className="text-sm font-black text-primary group-hover:text-secondary transition-colors mb-1">{task.title}</p>
                    <p className="text-xs text-outline font-medium line-clamp-2">{task.description}</p>
                  </motion.div>
                ))}
                {activeTasks.length === 0 && (
                  <div className="text-center py-10 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-secondary mx-auto opacity-20" />
                    <p className="text-xs text-outline">All tasks completed</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {isAiModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden border border-outline-variant/30 isolate"
            >
              <div className="bg-primary p-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary p-3 rounded-2xl text-white shadow-xl shadow-secondary/20 border border-white/20">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl leading-none tracking-tight">Clinical AI Insight</h3>
                    <p className="text-white/40 text-[10px] mt-2 font-black uppercase tracking-[0.2em]">Ward 4B Synthesis • Oct 24, 2023</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiModalOpen(false)}
                  className="text-white/40 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-surface-container/50 p-6 rounded-3xl border border-outline-variant/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                       <ShieldCheck size={14} /> Ward Stability Index
                    </p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-black text-primary">Normal</span>
                      <span className="text-xs text-secondary font-black mb-1.5">+2.4% Optimal</span>
                    </div>
                  </div>
                  <div className="bg-surface-container/50 p-6 rounded-3xl border border-outline-variant/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Critical Notification</p>
                    <p className="text-xl font-black text-error">1 Intervention Needed</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="font-black text-primary text-xs uppercase tracking-[0.2em] border-b border-outline-variant/10 pb-4">Automated Diagnostic Briefing</h4>
                  <ul className="space-y-6">
                     <li className="flex gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-error mt-2 shrink-0 shadow-sm" />
                        <div>
                          <p className="text-sm font-black text-primary leading-tight">James Wilson (Bed 12) - High Risk</p>
                          <p className="text-xs text-outline mt-1 font-medium leading-relaxed">Pattern analysis suggests early onset of pulmonary edema. SpO2 trend is downward (94% {"->"} 89% over 3h). Immediate lung auscultation advised.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-sm" />
                        <div>
                          <p className="text-sm font-black text-primary leading-tight">Maria Gonzalez (Bed 05) - Observation</p>
                          <p className="text-xs text-outline mt-1 font-medium leading-relaxed">Diuretic response is lower than predicted. Urine output is 15% below target. Consider titration increase.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-2 shrink-0 shadow-sm" />
                        <div>
                          <p className="text-sm font-black text-primary leading-tight">Throughput Opportunity</p>
                          <p className="text-xs text-outline mt-1 font-medium leading-relaxed">3 patients (Beds 02, 09, 14) are showing 98% stable vital patterns for {">"}24h. Potential for step-down transition.</p>
                        </div>
                      </li>
                  </ul>
                </div>

                <div className="mt-12 flex justify-end gap-3">
                  <button className="px-8 py-3 rounded-xl font-black text-primary border border-outline-variant/30 hover:bg-surface-container transition-all text-xs uppercase tracking-widest">
                    Export Logic
                  </button>
                  <button 
                    onClick={() => setIsAiModalOpen(false)}
                    className="px-8 py-3 rounded-xl font-black text-white bg-primary hover:opacity-90 transition-all text-xs shadow-xl shadow-primary/20 uppercase tracking-widest"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DoctorPatientCard({ patient }: { patient: any }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all relative overflow-hidden group cursor-pointer border-t-[6px] border-t-primary">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-black text-lg text-primary leading-tight">{patient.name}</h4>
          <p className="text-[10px] text-outline font-black uppercase tracking-widest mt-1.5">
            {patient.id} • {patient.gender}/{patient.age}
          </p>
        </div>
        <span className="bg-surface-container text-primary text-[10px] px-3 py-1 rounded-xl font-black uppercase tracking-widest border border-outline-variant/10">
          {patient.bed}
        </span>
      </div>
      
      <div className="mb-8">
        <p className="text-[10px] text-outline uppercase tracking-widest font-black mb-1.5 opacity-50">Chief Diagnosis</p>
        <p className="text-sm font-bold text-primary leading-relaxed line-clamp-2">{patient.diagnosis}</p>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-outline-variant/10">
        <div className="flex items-center gap-5">
           <div className="flex flex-col items-center">
             <div className={`w-3 h-3 rounded-full ${patient.status.hr === 'stable' ? 'bg-secondary' : patient.status.hr === 'warning' ? 'bg-amber-400' : 'bg-error'} shadow-sm`} />
             <span className="text-[9px] font-black text-outline mt-1.5">HR</span>
           </div>
           <div className="flex flex-col items-center">
             <div className={`w-3 h-3 rounded-full ${patient.status.bp === 'stable' ? 'bg-secondary' : patient.status.bp === 'warning' ? 'bg-amber-400' : 'bg-error'} shadow-sm`} />
             <span className="text-[9px] font-black text-outline mt-1.5">BP</span>
           </div>
           <div className="flex flex-col items-center">
             <motion.div 
               animate={patient.status.spo2 === 'critical' ? { scale: [1, 1.3, 1] } : {}}
               transition={{ repeat: Infinity, duration: 1 }}
               className={`w-3 h-3 rounded-full ${patient.status.spo2 === 'stable' ? 'bg-secondary' : patient.status.spo2 === 'warning' ? 'bg-amber-400' : 'bg-error'} shadow-sm`} 
             />
             <span className="text-[9px] font-black text-outline mt-1.5">SPO2</span>
           </div>
        </div>
        <ChevronRight className="text-outline group-hover:text-primary transition-colors" size={20} />
      </div>
    </div>
  );
}

function FamilyDashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const cards = [
    { id: 'summary', title: 'Health Summary', description: 'Vitals, weights, and overall health status.', icon: Activity, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'medications', title: 'Prescriptions', description: 'Manage and track active medications.', icon: Pill, color: 'bg-blue-50 text-blue-600' },
    { id: 'reports', title: 'Medical Reports', description: 'Diagnostic results and laboratory history.', icon: FileText, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'appointments', title: 'Appointments', description: 'Post-surgical recovery and home care.', icon: ArrowUpRight, color: 'bg-amber-50 text-amber-600' },
    { id: 'access', title: 'My Care Team', description: 'Connect with physicians and nurses.', icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
    { id: 'billing', title: 'Billing & Insurance', description: 'Invoices, payments, and coverage details.', icon: Printer, color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1440px] mx-auto space-y-12"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
            alt="Elena Rodriguez" 
            className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"
          />
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">My Dashboard</h1>
            <p className="text-outline text-sm font-medium mt-1">Hello, Elena Rodriguez 👋 • Recovery Phase</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate?.('access')}
            className="p-3 border border-outline-variant rounded-xl text-outline hover:text-primary transition-colors"
          >
            <MessageSquare size={20} />
          </button>
          <button 
            onClick={() => onNavigate?.('appointments')}
            className="p-3 border border-outline-variant rounded-xl text-outline hover:text-primary transition-colors"
          >
            <Calendar size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            onClick={() => onNavigate?.(card.id)}
            className="bg-white p-8 rounded-[40px] border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className={`p-4 rounded-3xl w-fit mb-6 ${card.color}`}>
              <card.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{card.title}</h3>
            <p className="text-sm text-outline leading-relaxed">{card.description}</p>
            <div className="mt-8 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              View Details <ArrowUpRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-surface-container/30 border border-outline-variant/30 rounded-[40px] p-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-black text-primary">Upcoming: Post-Op Checkup</h2>
          <p className="text-outline max-w-md">Your next scheduled appointment is in 2 days with Dr. Sharma.</p>
          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant/50 text-xs font-bold shadow-sm">
              <Calendar size={14} className="text-primary" /> Oct 28, 2023
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant/50 text-xs font-bold shadow-sm">
              <Clock size={14} className="text-primary" /> 10:00 AM
            </div>
          </div>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
          Prepare for Visit
        </button>
      </section>
    </motion.div>
  );
}

function StaffDashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: "Vitals Check - Post-Op", patient: "Robert Chen (Room 402-A)", type: "URGENT", due: "15m ago", icon: Activity, isUrgent: true, completed: false },
    { id: '2', title: "Medication Administration", patient: "Elena Rodriguez (Room 315)", type: "SCHEDULED", due: "Due at 14:00", icon: Pill, isUrgent: false, completed: false },
    { id: '3', title: "Assistance Request", patient: "Henry Walton (Room 210)", type: "ROUTINE", due: "5m ago", icon: MessageSquare, isUrgent: false, completed: false }
  ]);

  const [vitalsForm, setVitalsForm] = useState({
    patient: 'Robert Chen (402-A)',
    systolic: '',
    diastolic: ''
  });
  const [isSavingVitals, setIsSavingVitals] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
  };

  const handleSaveVitals = () => {
    setIsSavingVitals(true);
    setTimeout(() => {
      setIsSavingVitals(false);
      setSaveSuccess(true);
      setVitalsForm({ ...vitalsForm, systolic: '', diastolic: '' });
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1440px] mx-auto space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Staff Dashboard</h2>
          <p className="text-on-surface-variant font-medium">Welcome back, Nurse Sarah. You have {tasks.length - completedCount} pending tasks for this shift.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-primary font-bold rounded-lg hover:bg-surface-container-high transition-all text-sm">
          <Printer className="w-4 h-4" /> Print Shift Handover
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Vitals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <VitalsCard title="Health Overview" value="98" unit="BPM" status="STABLE" icon={Activity} color="primary" />
            <VitalsCard title="Current Meds" value="4" unit="ACTIVE" status="ON SCHEDULE" icon={Pill} color="secondary" />
            <VitalsCard title="Recent Reports" value="2" unit="NEW" status="PENDING REVIEW" icon={FileText} color="primary" />
            <VitalsCard title="Next Visit" value="OCT 28" unit="" status="DR. SHARMA" icon={Calendar} color="primary" />
          </div>

          {/* Task Management */}
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface/50">
              <div className="flex gap-2 p-1 bg-surface-container rounded-lg">
                <button className="px-4 py-1.5 rounded-md text-xs font-bold bg-white text-primary shadow-sm">All</button>
                <button className="px-4 py-1.5 rounded-md text-xs font-medium text-outline">Pending ({tasks.length - completedCount})</button>
                <button className="px-4 py-1.5 rounded-md text-xs font-medium text-outline">Completed</button>
                <button className="px-4 py-1.5 rounded-md text-xs font-medium text-error">Overdue (4)</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {tasks.filter(t => !t.completed).map(task => (
                <TaskItem 
                  key={task.id}
                  title={task.title} 
                  patient={task.patient} 
                  type={task.type} 
                  due={task.due} 
                  icon={task.icon} 
                  isUrgent={task.isUrgent}
                  onComplete={() => completeTask(task.id)}
                />
              ))}
              {tasks.filter(t => t.completed).map(task => (
                 <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/10 bg-slate-50 opacity-60">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-secondary/10 text-secondary`}>
                     <CheckCircle2 className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                     <p className="text-sm font-bold text-outline line-through">{task.title}</p>
                     <p className="text-[10px] text-outline/60">{task.patient}</p>
                   </div>
                   <span className="text-[10px] font-bold text-outline uppercase tracking-widest font-mono">Completed</span>
                 </div>
              ))}
            </div>
          </div>

          {/* Patient Call Log */}
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">Patient Call Log</h3>
              <button className="text-primary font-bold text-sm flex items-center gap-1 group">
                View History <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface text-[10px] font-black text-outline uppercase tracking-widest">
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    { time: '13:42', source: 'Room 402 - Bed B', type: 'Nurse Call', status: 'Active', active: true },
                    { time: '13:35', source: 'Room 201 - Bed A', type: 'Bathroom Assist', status: 'Resolved', active: false }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] font-semibold text-outline">{row.time}</td>
                      <td className="px-6 py-4 text-xs font-bold text-primary">{row.source}</td>
                      <td className="px-6 py-4 text-xs text-outline font-medium">{row.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          row.active ? 'bg-secondary text-white' : 'bg-surface-container text-outline'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className={`text-xs font-bold ${row.active ? 'text-primary hover:underline' : 'text-outline/50 cursor-not-allowed'}`}>
                          {row.active ? 'Acknowledge' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Quick Entry */}
          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary-fixed" />
                Quick Vitals Entry
              </h3>
              {saveSuccess && <span className="text-[10px] font-bold text-secondary animate-bounce">SYNCED!</span>}
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Select Patient</label>
                <select 
                  value={vitalsForm.patient}
                  onChange={(e) => setVitalsForm({...vitalsForm, patient: e.target.value})}
                  className="w-full bg-white/10 border-white/20 rounded-lg py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option className="text-primary">Robert Chen (402-A)</option>
                  <option className="text-primary">Elena Rodriguez (315)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">BP Systolic</label>
                  <input 
                    type="text" 
                    placeholder="120" 
                    value={vitalsForm.systolic}
                    onChange={(e) => setVitalsForm({...vitalsForm, systolic: e.target.value})}
                    className="w-full bg-white/10 border-white/20 rounded-lg py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-white/20 placeholder:text-white/30" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">BP Diastolic</label>
                  <input 
                    type="text" 
                    placeholder="80" 
                    value={vitalsForm.diastolic}
                    onChange={(e) => setVitalsForm({...vitalsForm, diastolic: e.target.value})}
                    className="w-full bg-white/10 border-white/20 rounded-lg py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-white/20 placeholder:text-white/30" 
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveVitals}
                disabled={isSavingVitals || !vitalsForm.systolic || !vitalsForm.diastolic}
                className="w-full py-3 bg-secondary-container text-on-secondary-container font-black rounded-xl text-sm mt-4 shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-mono"
              >
                {isSavingVitals ? 'Processing...' : 'Save & Sync Vitals'}
              </button>
            </div>
          </div>

          {/* Adherence */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container flex items-center justify-center rounded-bl-3xl">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Shift Progress</h3>
            <p className="text-4xl font-black text-primary mb-1">82%</p>
            <p className="text-xs text-outline font-medium">10 of 12 Tasks Completed</p>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-outline">Time Remaining</span>
                <span className="font-bold text-primary">04:12</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  className="bg-secondary h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-error" /> Active Alerts
              </h3>
              <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded-full">4 NEW</span>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-error-container/20 rounded-xl border-l-4 border-error">
                <p className="text-[9px] font-bold text-error uppercase mb-1">Critical • 5m ago</p>
                <p className="text-xs font-bold text-primary">Ward 4B Bed 12: Low SpO2</p>
              </div>
              <div className="p-3 bg-surface-container-high/30 rounded-xl border-l-4 border-amber-500">
                <p className="text-[9px] font-bold text-amber-600 uppercase mb-1">Monitor • 12m ago</p>
                <p className="text-xs font-bold text-primary">Ward 4B Bed 08: BP Spike</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VitalsCard({ title, value, unit, status, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'secondary' ? 'bg-secondary' : 'bg-primary'}`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${color === 'secondary' ? 'bg-secondary text-white' : 'bg-surface-container text-primary'}`}>
          {status}
        </span>
      </div>
      <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-1">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-primary">{value}</span>
        <span className="text-[10px] font-bold text-outline">{unit}</span>
      </div>
    </div>
  );
}

function TaskItem({ title, patient, type, due, isUrgent, onComplete }: any) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border-l-4 transition-all hover:bg-surface-container/30 ${isUrgent ? 'border-l-error bg-error/5' : 'border-l-primary bg-white'} border border-outline-variant/20`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isUrgent ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
        {isUrgent ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-bold text-sm">{title}</h4>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${isUrgent ? 'bg-error text-white' : 'bg-surface-container text-outline'}`}>
            {type}
          </span>
        </div>
        <p className="text-xs text-outline">{patient}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-[10px] font-bold mb-2 ${isUrgent ? 'text-error' : 'text-outline'}`}>{due}</p>
        <button 
          onClick={onComplete}
          className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all"
        >
          EXECUTE
        </button>
      </div>
    </div>
  );
}
