import { useState } from 'react';
import Sidebar from '../admin/AdminSidebar';
import Header from '../admin/AdminHeader';
import Analytics from '../Analytics';
import PatientRecords from '../admin/PatientRecords';
import AdminAppointments from '../admin/AdminAppointments';
import MedicalReports from '../admin/MedicalReports';
import StaffDirectory from '../admin/StaffDirectory';
import AdminSettings from '../admin/AdminSettings';
import HospitalOperations from '../admin/HospitalOperations';
import { 
  Activity, 
  Pill, 
  FileText, 
  Calendar, 
  Printer, 
  MessageSquare, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Construction
} from 'lucide-react';
import { motion } from 'motion/react';

interface NurseDashboardProps {
  onLogout?: () => void;
  onHome?: () => void;
}

export default function NurseDashboard({ onLogout, onHome }: NurseDashboardProps) {
  const [currentView, setCurrentView] = useState('nurse-station');

  const renderContent = () => {
    switch (currentView) {
      case 'patients':
        return <PatientRecords />;
      case 'appointments':
        return <AdminAppointments />;
      case 'reports':
        return <MedicalReports />;
      case 'analytics':
        return <Analytics />;
      case 'operations':
        return <HospitalOperations />;
      case 'directory':
        return <StaffDirectory />;
      case 'settings':
        return <AdminSettings />;
      case 'nurse-station':
      case 'admin-dashboard': // Fallback for the first link in sidebar
        return <StaffDashboardContent />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <Construction className="w-12 h-12 text-slate-300" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary">Module Restricted</h2>
              <p className="text-sm">This section is being validated for clinical security.</p>
            </div>
            <button 
              onClick={() => setCurrentView('nurse-station')}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold active:scale-95 transition-all"
            >
              Return to Station
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10">
      <Sidebar 
        onLogout={onLogout} 
        onHome={onHome}
        currentView={currentView === 'nurse-station' ? 'admin-dashboard' : currentView} 
        onViewChange={(view) => setCurrentView(view === 'admin-dashboard' ? 'nurse-station' : view)} 
      />
      
      <main className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        <div className="p-8 max-w-[1440px] w-full mx-auto flex-1 flex flex-col">
          {renderContent()}
          
          <footer className="mt-auto py-6 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Vitalix Medical Systems</span>
            <div className="flex gap-6">
              <span className="text-secondary">Nurse Station: Ward-4B</span>
              <span>Encrypted via AES-256</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StaffDashboardContent() {
  const [vitals, setVitals] = useState({ patient: 'Robert Chen (402-A)', systolic: '', diastolic: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Vitals Check - Post-Op", patient: "Robert Chen (Room 402-A)", type: "URGENT", due: "15m ago", isUrgent: true, completed: false },
    { id: 2, title: "Insulin Administration", patient: "Maria Gonzalez (Room 410)", type: "SCHEDULED", due: "Due at 14:00", isUrgent: false, completed: false }
  ]);

  const handleSaveVitals = () => {
    if (!vitals.systolic || !vitals.diastolic) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setVitals({ ...vitals, systolic: '', diastolic: '' });
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const completeTask = (id: number) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, completed: true } : task));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Nursing Station</h2>
          <p className="text-slate-500 font-medium">Ward 4B • Shift: Morning (07:00 - 15:00)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all text-sm shadow-sm">
          <Printer className="w-4 h-4" /> Shift Handover
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <NursingStatCard title="Active Patients" value="12" unit="" status="WARD 4B" icon={Activity} color="primary" />
            <NursingStatCard title="Meds Due" value="8" unit="TASKS" status="NEXT 1H" icon={Pill} color="secondary" />
            <NursingStatCard title="Unread Reports" value="3" unit="NEW" status="LABS" icon={FileText} color="primary" />
            <NursingStatCard title="Rounds" value="1/4" unit="" status="COMPLETED" icon={Calendar} color="primary" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <h3 className="text-sm font-black text-primary uppercase tracking-widest">Current Tasks</h3>
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-error/10 text-error text-[10px] font-black rounded-full">
                    {tasks.filter(t => !t.completed).length} ACTIVE
                 </span>
               </div>
            </div>
            <div className="p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {tasks.map(task => (
                  <NursingTaskItem 
                    key={task.id}
                    title={task.title} 
                    patient={task.patient} 
                    type={task.type} 
                    due={task.due} 
                    isUrgent={task.isUrgent}
                    completed={task.completed}
                    onComplete={() => completeTask(task.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest">Patient Call Log</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse text-xs">
                 <thead>
                   <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-6 py-4">Time</th>
                     <th className="px-6 py-4">Source</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {[
                     { time: '13:42', source: 'Room 402 - Bed B', type: 'Nurse Call', status: 'Active', active: true },
                     { time: '13:35', source: 'Room 410 - Bed A', type: 'Pain Med Request', status: 'Resolved', active: false }
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-slate-50/50">
                       <td className="px-6 py-4 font-mono font-bold text-slate-400">{row.time}</td>
                       <td className="px-6 py-4 font-bold text-primary">{row.source}</td>
                       <td className="px-6 py-4 font-medium text-slate-500">{row.type}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                           row.active ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'
                         }`}>
                           {row.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className={`font-bold ${row.active ? 'text-primary' : 'text-slate-300'}`}>
                           {row.active ? 'Acknowledge' : 'View Log'}
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
            <h3 className="font-black text-lg mb-6 flex items-center gap-3">
              <Activity className="text-secondary" /> Quick Vitals Entry
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Select Patient</label>
                <select 
                  value={vitals.patient}
                  onChange={(e) => setVitals({ ...vitals, patient: e.target.value })}
                  className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                >
                  <option className="text-primary">Robert Chen (402-A)</option>
                  <option className="text-primary">Maria Gonzalez (410)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Systolic</label>
                  <input 
                    type="text" 
                    placeholder="120" 
                    value={vitals.systolic}
                    onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                    className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-white/20" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Diastolic</label>
                  <input 
                    type="text" 
                    placeholder="80" 
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                    className="w-full bg-white/10 border-white/20 rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-white/20" 
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveVitals}
                disabled={isSaving || !vitals.systolic || !vitals.diastolic}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-black/20 transition-all mt-4 flex items-center justify-center gap-2 font-black ${
                  saveSuccess ? 'bg-secondary text-white' : 'bg-secondary text-white hover:brightness-110 active:scale-[0.98]'
                } disabled:opacity-50`}
              >
                {isSaving ? <Activity className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : null}
                {isSaving ? 'Synching...' : saveSuccess ? 'Committed' : 'Commit to Records'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-primary text-sm flex items-center gap-2">
                  <AlertTriangle className="text-error" size={18} /> Active Alerts
                </h3>
                <span className="bg-error/10 text-error text-[10px] font-black px-2 py-0.5 rounded-full">4 NEW</span>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-error/5 rounded-2xl border-l-4 border-error">
                  <p className="text-[9px] font-black text-error uppercase mb-1">Critical • 5m ago</p>
                  <p className="text-xs font-bold text-primary">Ward 4B Bed 12: Low SpO2</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-amber-500">
                  <p className="text-[9px] font-black text-amber-600 uppercase mb-1">Medication • 12m ago</p>
                  <p className="text-xs font-bold text-primary">Room 410: Insulin Overdue</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NursingStatCard({ title, value, unit, status, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'secondary' ? 'bg-secondary' : 'bg-primary'}`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${color === 'secondary' ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
          {status}
        </span>
      </div>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-primary">{value}</span>
        {unit && <span className="text-[10px] font-black text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}

function NursingTaskItem({ title, patient, type, due, isUrgent, completed, onComplete }: any) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center gap-4 p-4 rounded-xl border-l-4 transition-all ${
        completed ? 'bg-slate-50 border-l-slate-300 opacity-60' :
        isUrgent ? 'border-l-error bg-error/5' : 'border-l-primary bg-white'
      } border border-slate-100`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        completed ? 'bg-slate-200 text-slate-400' :
        isUrgent ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
      }`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : isUrgent ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className={`font-bold text-sm text-primary ${completed ? 'line-through text-slate-400' : ''}`}>{title}</h4>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest ${
            completed ? 'bg-slate-200 text-slate-400' :
            isUrgent ? 'bg-error text-white' : 'bg-slate-100 text-slate-500'
          }`}>
            {type}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">{patient}</p>
      </div>
      <div className="text-right shrink-0">
        {!completed ? (
          <>
            <p className={`text-[10px] font-black mb-2 ${isUrgent ? 'text-error' : 'text-slate-400'} font-mono uppercase`}>{due}</p>
            <button 
              onClick={onComplete}
              className="px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg hover:brightness-110 uppercase tracking-widest shadow-md active:scale-95 transition-all"
            >
              Execute
            </button>
          </>
        ) : (
          <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Done</span>
        )}
      </div>
    </motion.div>
  );
}
