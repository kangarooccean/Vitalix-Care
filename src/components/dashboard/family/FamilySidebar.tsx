import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  HelpCircle, 
  LogOut,
  Activity,
  Pill,
  ReceiptText,
  Home
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Activity, label: 'Health Summary', id: 'summary' },
  { icon: Pill, label: 'Prescriptions', id: 'medications' },
  { icon: CalendarDays, label: 'Appointments', id: 'appointments' },
  { icon: FileText, label: 'Medical Reports', id: 'reports' },
  { icon: ReceiptText, label: 'Bills & Payments', id: 'billing' },
];

interface FamilySidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  onHome?: () => void;
}

export default function FamilySidebar({ activeTab, onTabChange, onLogout, onHome }: FamilySidebarProps) {
  return (
    <aside className="w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="p-8">
        <h1 className="text-xl font-extrabold tracking-tighter uppercase leading-none">Vitalix</h1>
        <p className="text-[10px] text-primary-container font-bold uppercase tracking-[0.2em] mt-1">Family Connect</p>
      </div>

      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
              alt="Kavitha Kumar" 
              className="w-10 h-10 rounded-full object-cover border border-secondary"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">Kavitha Kumar</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[9px] font-bold uppercase mt-1">
              Daughter of Ramesh
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {onHome && (
          <button
            onClick={onHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5 mb-2 border-b border-white/5 pb-4"
          >
            <Home size={20} />
            <span className="text-sm font-medium">Home / Portal</span>
          </button>
        )}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-white/10 text-secondary border-r-4 border-secondary' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button 
          onClick={() => onTabChange('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
            activeTab === 'help' 
              ? 'bg-white/10 text-secondary border-r-4 border-secondary' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle size={20} />
          <span className="text-sm font-medium">Support</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
