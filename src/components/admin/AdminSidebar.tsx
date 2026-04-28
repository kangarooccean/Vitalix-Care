import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  BarChart3,
  UserSquare2, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ShieldAlert,
  Activity,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'operations', label: 'Operations', icon: Activity, active: false },
  { id: 'patients', label: 'Patient Records', icon: Users, active: false },
  { id: 'appointments', label: 'Appointments', icon: Calendar, active: false },
  { id: 'reports', label: 'Medical Reports', icon: ClipboardList, active: false },
  { id: 'analytics', label: 'Clinical Analytics', icon: BarChart3, active: false },
  { id: 'directory', label: 'Staff Directory', icon: UserSquare2, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

interface AdminSidebarProps {
    onLogout?: () => void;
    onHome?: () => void;
    currentView: string;
    onViewChange: (view: string) => void;
}

export default function AdminSidebar({ onLogout, onHome, currentView, onViewChange }: AdminSidebarProps) {
  return (
    <aside className="h-screen w-64 border-r fixed left-0 top-0 border-slate-200 bg-white flex flex-col py-6 z-50">
      <div className="px-6 mb-8">
        <h1 className="text-lg font-extrabold text-primary tracking-tighter uppercase font-sans">MedCore Portal</h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase font-mono">Clinical Precision</p>
        
        {/* System Status */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-secondary-container/20 rounded-lg border border-secondary/10">
          <span className="relative flex h-2 w-2">
            <motion.span 
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inline-flex h-full w-full rounded-full bg-secondary"
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="text-[12px] font-bold text-secondary uppercase tracking-wider font-mono">System Operational</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {onHome && (
          <button
            onClick={onHome}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 transition-colors rounded-lg mb-2 border-b border-slate-100 pb-4"
          >
            <Home className="w-5 h-5 text-slate-400" />
            Home / Portal
          </button>
        )}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-lg ${
              currentView === item.id 
                ? 'bg-surface-container-low border-r-4 border-primary font-bold text-primary' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-primary' : 'text-slate-400'}`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 mt-auto border-t border-slate-100 pt-6 space-y-1">
        <button className="w-full bg-primary text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 mb-4 hover:bg-primary-container transition-colors shadow-lg active:scale-95">
          <ShieldAlert className="w-4 h-4" />
          Emergency Alert
        </button>
        <a className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 transition-colors rounded-lg" href="#">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          Support
        </a>
        <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error-container/20 transition-colors rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
