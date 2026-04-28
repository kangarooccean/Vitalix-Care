import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Key, Eye, Globe, Database, Smartphone, Check } from 'lucide-react';
import { motion } from 'motion/react';

const settingsSections = [
  { 
    id: 'general', 
    label: 'Institution Profile', 
    icon: Globe, 
    desc: 'Public identities and contact information' 
  },
  { 
    id: 'security', 
    label: 'Security Protocols', 
    icon: Shield, 
    desc: '2FA settings and access logs' 
  },
  { 
    id: 'auth', 
    label: 'Authentication', 
    icon: Key, 
    desc: 'Password policies and biometrics' 
  },
  { 
    id: 'notifications', 
    label: 'Alert Configurations', 
    icon: Bell, 
    desc: 'Push notifications and system emails' 
  },
  { 
    id: 'data', 
    label: 'Data Governance', 
    icon: Database, 
    desc: 'Auto-archiving and storage limits' 
  },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('security');
  const [toggles, setToggles] = useState({
    twoFactor: true,
    biometric: false,
    timeout: '15 Minutes'
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-primary tracking-tight">Portal Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">Manage system-wide preferences and security standards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {settingsSections.map((sec) => (
            <button 
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all border ${
                    activeSection === sec.id 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/20 text-white' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                }`}
            >
              <sec.icon className={`w-5 h-5 ${activeSection === sec.id ? 'text-white' : 'text-slate-400'}`} />
              <div>
                <p className="text-sm font-extrabold uppercase tracking-widest font-mono leading-none mb-1">{sec.label}</p>
                <p className={`text-[10px] font-medium leading-none ${activeSection === sec.id ? 'text-white/60' : 'text-slate-400'}`}>{sec.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
          >
            {activeSection === 'security' ? (
              <>
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/5 rounded-xl">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-primary">Security Protocols</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-mono font-bold">Clinical Data Protection Layer</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Setting 1 */}
                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-primary flex items-center gap-2">Two-Factor Authentication <Shield className="w-3.5 h-3.5 text-secondary" /></p>
                            <p className="text-xs text-slate-500">Require clinical device verification for every session.</p>
                        </div>
                        <button 
                          onClick={() => setToggles(t => ({ ...t, twoFactor: !t.twoFactor }))}
                          className={`w-12 h-6 rounded-full relative transition-colors shadow-inner ${toggles.twoFactor ? 'bg-secondary' : 'bg-slate-200'}`}
                        >
                            <motion.span 
                              animate={{ x: toggles.twoFactor ? 24 : 0 }}
                              className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" 
                            />
                        </button>
                    </div>

                    <div className="h-px bg-slate-50" />

                    {/* Setting 2 */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-primary">Biometric Gatekeeper</p>
                            <p className="text-xs text-slate-500">Enable FaceID or fingerprint unlock for staff mobile portal.</p>
                        </div>
                        <button 
                          onClick={() => setToggles(t => ({ ...t, biometric: !t.biometric }))}
                          className={`w-12 h-6 rounded-full relative transition-colors shadow-inner ${toggles.biometric ? 'bg-secondary' : 'bg-slate-200'}`}
                        >
                            <motion.span 
                               animate={{ x: toggles.biometric ? 24 : 0 }}
                               className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                            />
                        </button>
                    </div>

                    <div className="h-px bg-slate-50" />

                    {/* Setting 3 */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-primary">Session Auto-Timeout</p>
                            <p className="text-xs text-slate-500">Automatically logout after 15 minutes of inactivity.</p>
                        </div>
                        <select 
                          value={toggles.timeout}
                          onChange={(e) => setToggles(t => ({ ...t, timeout: e.target.value }))}
                          className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        >
                            <option>15 Minutes</option>
                            <option>30 Minutes</option>
                            <option>1 Hour</option>
                        </select>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-surface-container rounded-2xl border border-primary/5">
                    <div className="flex items-center gap-4 mb-4">
                        <Smartphone className="w-8 h-8 text-primary/30" />
                        <p className="text-xs font-bold text-primary uppercase tracking-widest font-mono">Institutional Device Policy</p>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6">
                        All administrative staff must use the company-issued Vitalix biometric hardware for high-risk operations including patient record export and medication ordering.
                    </p>
                    <button className="w-full py-2.5 bg-white border border-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-white shadow-sm transition-all uppercase tracking-widest font-mono">
                        Audit Managed Devices
                    </button>
                </div>
              </>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Database className="w-8 h-8 text-slate-200" />
                </div>
                <div>
                    <h3 className="text-primary font-bold">{settingsSections.find(s => s.id === activeSection)?.label} Content</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">Undergoing Clinical Validation</p>
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex justify-end gap-3 mt-4">
            <button className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-primary transition-all uppercase tracking-widest font-mono">Discard</button>
            <button 
              onClick={handleSave}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all uppercase tracking-widest font-mono flex items-center gap-2 ${
                saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:brightness-110'
              }`}
            >
              {saveStatus === 'saving' ? 'Syncing...' : saveStatus === 'saved' ? <><Check className="w-4 h-4" /> Fixed</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
