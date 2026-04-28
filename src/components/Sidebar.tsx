import { 
  LayoutDashboard, 
  FolderHeart, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  AlertCircle,
  CreditCard,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Pill,
  Stethoscope,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  onHome?: () => void;
  userRole?: 'staff' | 'family' | 'doctor' | 'patient';
}

export default function Sidebar({ activeTab, onTabChange, onLogout, onHome, userRole = 'staff' }: SidebarProps) {
  const isMedical = userRole === 'staff' || userRole === 'doctor';
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'records', label: 'Patient Records', icon: FolderHeart },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Medical Reports', icon: FileText },
    ...(isMedical ? [{ id: 'analytics', label: 'Clinical Analytics', icon: TrendingUp }] : []),
    { id: 'summary', label: 'Health Summary', icon: Sparkles },
    { id: 'medications', label: 'Medications', icon: Pill },
    ...(userRole === 'family' || userRole === 'patient' ? [{ id: 'access', label: 'Security & Access', icon: ShieldCheck }] : []),
    { id: 'billing', label: 'Billing', icon: CreditCard },
    ...(isMedical ? [{ id: 'staff', label: 'Staff Directory', icon: Users }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 border-r border-outline-variant/30 fixed left-0 top-0 bg-white flex flex-col py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tighter text-primary uppercase">VITALIX</h1>
          <p className="text-[10px] uppercase tracking-widest text-outline font-black leading-none">Clinical Precision</p>
        </div>
      </div>

      {(userRole === 'family' || userRole === 'doctor' || userRole === 'patient') && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/20">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm overflow-hidden border-2 border-secondary/20">
              {userRole === 'doctor' ? (
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ZTKX1qqTyM1i7gBeIrP_CS_YCZBWkgSVC5ZYAxhgVg691RIZfw2X6UFmTdQsRq7zMqn3a1GcRMDOeeH3Pc6kWHIqtLzycIBd_fXoQHQY2JQaxWi6woZvJ7FxUMX7WicRZlJCLFh0LbonnIAftMj-eGLDBNuwlZEqstN1OWTcQjZNQ4D4IIKnZvHbYK9BXcyO7X6Lz3QRUD6AmGZNw7GKD_VVvNUw_nn_Ugq4MedA7gI7c9Ize1xITqQpzqYRvqA9szHXivP5iLY" 
                  alt="Dr. Sharma"
                  className="w-full h-full object-cover"
                />
              ) : "ER"}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight text-primary">{userRole === 'doctor' ? 'Dr. Sharma' : 'Elena Rodriguez'}</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[8px] font-bold uppercase tracking-wider mt-1">
                {userRole === 'doctor' ? 'Lead Cardiologist' : userRole === 'patient' ? 'Patient' : 'Family Member'}
              </span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 space-y-1">
        {onHome && (
          <button
            onClick={onHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium text-outline hover:bg-surface-container hover:text-primary mb-2 border-b border-outline-variant/10 pb-4"
          >
            <Home className="w-5 h-5 text-outline" />
            Home / Portal
          </button>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-outline hover:bg-surface-container hover:text-primary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-outline'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <button className="w-full py-3 px-4 bg-error text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-error/20 hover:opacity-90 transition-all">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs">Emergency Alert</span>
        </button>
        <div className="border-t border-outline-variant/20 pt-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-outline hover:text-primary transition-colors text-sm">
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-outline hover:text-error transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
