import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Database, 
  ChevronRight,
  LogOut,
  Check
} from 'lucide-react';

interface SettingsProps {
  onLogout?: () => void;
}

export default function Settings({ onLogout }: SettingsProps) {
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    "Display Theme": true
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const toggleItem = (label: string) => {
    setActiveToggles(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const sections = [
    {
      title: "Profile & Identity",
      items: [
        { icon: User, label: "Personal Information", desc: "Update your name, title, and contact details" },
        { icon: Shield, label: "Security & Authentication", desc: "Change password and MFA settings" }
      ]
    },
    {
      title: "Platform Preferences",
      items: [
        { icon: Bell, label: "Notifications", desc: "Configure alerts for vitals and tasks" },
        { icon: Globe, label: "Localization", desc: "Change language and timezone (UTC+5:30)" },
        { icon: Moon, label: "Display Theme", desc: "Switch between Clinical Light and Surgeon Dark", toggle: true }
      ]
    },
    {
      title: "System & Compliance",
      items: [
        { icon: Database, label: "Cloud Sync Statistics", desc: "Manage local cache and storage limits" },
        { icon: Shield, label: "Compliance Logs", desc: "Review HIPAA/GDPR audit trails" }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1000px] mx-auto space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Control Center</h2>
          <p className="text-outline text-sm">System configuration and security parameters</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest font-mono flex items-center gap-2"
        >
          {showSaveSuccess ? <Check className="w-4 h-4" /> : null}
          {showSaveSuccess ? "Synced" : "Sync Changes"}
        </button>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-[10px] font-black text-outline uppercase tracking-[0.2em] ml-1">{section.title}</h3>
            <div className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden">
              {section.items.map((item, idx) => (
                <div 
                  key={item.label} 
                  onClick={() => item.toggle && toggleItem(item.label)}
                  className={`p-6 flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer ${idx !== 0 ? 'border-t border-outline-variant/20' : ''}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-primary shadow-sm ring-1 ring-outline-variant/10">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base text-primary leading-tight mb-1">{item.label}</p>
                      <p className="text-xs text-outline font-medium">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className={`w-12 h-6 rounded-full relative p-1 transition-colors ${activeToggles[item.label] ? 'bg-secondary' : 'bg-outline-variant'}`}>
                      <motion.div 
                        animate={{ x: activeToggles[item.label] ? 24 : 0 }}
                        className="w-4 h-4 bg-white rounded-full shadow-md" 
                      />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-outline" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6">
          <button 
            onClick={onLogout}
            className="w-full p-6 bg-error/5 border border-error/20 rounded-[32px] flex items-center justify-between group hover:bg-error transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-error/10 rounded-2xl flex items-center justify-center text-error group-hover:bg-white group-hover:text-error transition-all shadow-sm">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-base text-error group-hover:text-white leading-tight mb-1">Sign Out of Vitalix</p>
                <p className="text-xs text-error/60 group-hover:text-white/60 font-medium tracking-tight">Active session terminates immediately upon click</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-error group-hover:text-white" />
          </button>
          <p className="text-[10px] text-center mt-8 text-outline font-bold uppercase tracking-widest">
            Vitalix Pro v2.4.1-Stable • Build 9982 • Protected by Clinical KMS
          </p>
        </div>
      </div>
    </motion.div>
  );
}
