import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Edit3, 
  Smartphone, 
  Server,
  UserCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RolePermission {
  role: string;
  level: string;
  color: string;
  capabilities: {
    label: string;
    allowed: boolean;
  }[];
}

const ROLES: RolePermission[] = [
  {
    role: "Doctor / Admin",
    level: "Tier 1: Full Clinical Access",
    color: "bg-primary",
    capabilities: [
      { label: "Prescribe Medication", allowed: true },
      { label: "Edit Clinical Records", allowed: true },
      { label: "Financial Clearance", allowed: true },
      { label: "System Configuration", allowed: true }
    ]
  },
  {
    role: "Clinical Nurse",
    level: "Tier 2: Care Coordination",
    color: "bg-secondary",
    capabilities: [
      { label: "Vitals Monitoring", allowed: true },
      { label: "Task Execution", allowed: true },
      { label: "Prescription Entry", allowed: false },
      { label: "Patient Onboarding", allowed: true }
    ]
  },
  {
    role: "Family / Patient",
    level: "Tier 3: View-Only Portal",
    color: "bg-blue-600",
    capabilities: [
      { label: "View Vitals History", allowed: true },
      { label: "Download Reports", allowed: true },
      { label: "Request Appointments", allowed: true },
      { label: "Clinical Edits", allowed: false }
    ]
  }
];

export default function Access() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 max-w-[1200px] mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight">Access Control Center</h2>
            <p className="text-outline text-sm font-medium">Managing 256-bit encrypted role-based permissions</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Security Protocol active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {ROLES.map((role) => (
          <div key={role.role} className="bg-white rounded-[40px] border border-outline-variant/30 shadow-sm flex flex-col group overflow-hidden">
            <div className="p-8 pb-4">
              <div className={cn("w-12 h-12 rounded-2xl mb-6 shadow-lg flex items-center justify-center text-white", role.color)}>
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-primary tracking-tight mb-1">{role.role}</h3>
              <p className="text-[10px] font-black text-outline uppercase tracking-widest leading-none mb-6">{role.level}</p>
              
              <div className="space-y-4 pt-6 border-t border-outline-variant/10">
                {role.capabilities.map((cap) => (
                  <div key={cap.label} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-outline">{cap.label}</span>
                    {cap.allowed ? (
                      <Eye className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-error" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-surface-container/50 border-t border-outline-variant/10 flex justify-center">
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
                Audit Scope <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">IAM Identity Log</h4>
              <p className="text-sm text-white/60 font-medium mb-8">Full audit trail of all clinical credential interactions for last 24 hours.</p>
              <button className="px-6 py-3 bg-white text-primary font-black text-xs rounded-2xl uppercase tracking-widest hover:bg-surface-container transition-all">
                Export Audit XML
              </button>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-4xl font-black text-white">0</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Violations</span>
            </div>
          </div>
        </div>

        <div className="bg-error/5 p-8 rounded-[40px] border border-error/20 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-error/10 text-error rounded-2xl flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-black text-primary uppercase tracking-tight">Security Hardening</h4>
                    <p className="text-xs font-bold text-error">Current Threat Level: LOW</p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white/50 border border-error/10 rounded-2xl">
                    <Smartphone className="w-4 h-4 text-outline" />
                    <span className="text-xs font-bold text-primary">Biometric Enforcement (MF-A)</span>
                    <span className="ml-auto text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">ALIGNED</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 border border-error/10 rounded-2xl">
                    <Edit3 className="w-4 h-4 text-outline" />
                    <span className="text-xs font-bold text-primary">Write-Gate Validation Policy</span>
                    <span className="ml-auto text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">ENFORCED</span>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
