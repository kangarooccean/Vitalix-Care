import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  ShieldPlus,
  Pill,
  Activity,
  ReceiptText,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Activity, label: 'Health Summary', id: 'summary' },
  { icon: Pill, label: 'Prescriptions', id: 'medications' },
  { icon: Calendar, label: 'Appointments', id: 'appointments' },
  { icon: FileText, label: 'Medical Reports', id: 'reports' },
  { icon: ReceiptText, label: 'Bills & Payments', id: 'billing' },
  { icon: Users, label: 'Staff Directory', id: 'access' },
  { icon: HelpCircle, label: 'Help & Support', id: 'help' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface PatientSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  onHome?: () => void;
}

export default function PatientSidebar({ activeTab, onTabChange, onLogout, onHome }: PatientSidebarProps) {
  return (
    <aside id="sidebar" className="fixed left-0 top-0 h-screen w-64 bg-primary flex flex-col py-8 z-50 border-r border-white/5">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-secondary rounded-lg shadow-lg">
            <ShieldPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">MedCore</h1>
        </div>

        <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl border border-white/10">
          <div className="relative mb-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop" 
              alt="Ramesh Kumar" 
              className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-primary rounded-full" />
          </div>
          <p className="text-white font-semibold text-sm">Ramesh Kumar</p>
          <span className="mt-1 px-2 py-0.5 bg-secondary/20 text-white text-[10px] font-mono font-bold rounded uppercase tracking-widest">
            ID: VX-99281
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {onHome && (
          <button
            onClick={onHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-white/60 hover:bg-white/5 hover:text-white mb-2 border-b border-white/5 pb-4"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Home / Portal</span>
          </button>
        )}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-white/10 text-secondary border-l-4 border-secondary font-bold' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>


      <div className="px-4 mt-auto space-y-1 pt-6 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm text-left">Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
