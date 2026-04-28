import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Brain, 
  ClipboardCheck, 
  Bell, 
  UserCircle, 
  AlertTriangle,
  Pill,
  Menu,
  X,
  ShieldCheck,
  Globe,
  HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import ResourcesModal from './modals/ResourcesModal';
import ComplianceModal from './modals/ComplianceModal';
import ContactModal from './modals/ContactModal';
import EmergencyAlertModal from './modals/EmergencyAlertModal';
import TermsModal from './modals/TermsModal';

// --- Mock Data ---

const VITALS_DATA = [
  { value: 40 },
  { value: 60 },
  { value: 55 },
  { value: 80 },
  { value: 70 },
  { value: 90 },
  { value: 85 },
  { value: 60 },
];

// --- Components ---

interface LandingProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

interface NavbarProps {
  onLoginClick: () => void;
  onResourcesClick: () => void;
  onComplianceClick: () => void;
  onContactClick: () => void;
  onEmergencyClick: () => void;
  onPresentationClick: () => void;
}

const Navbar = ({ onLoginClick, onResourcesClick, onComplianceClick, onContactClick, onEmergencyClick, onPresentationClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-container-max items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-primary">VITALIX</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="border-b-2 border-primary pb-1 text-sm font-semibold text-primary transition-colors">Portal</a>
          <button onClick={onResourcesClick} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Resources</button>
          <button onClick={onComplianceClick} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Compliance</button>
          <button onClick={onContactClick} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Contact</button>
          <button onClick={onPresentationClick} className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Deck</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLoginClick}
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors hidden sm:block"
          >
            Sign In
          </button>
          <button 
            onClick={onEmergencyClick}
            className="hidden items-center gap-2 rounded-lg bg-error px-4 py-2 text-xs font-bold text-on-error transition-all hover:opacity-90 active:scale-95 lg:flex"
          >
            <AlertTriangle size={14} />
            <span>EMERGENCY ALERT</span>
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-outline-variant bg-surface-container-lowest overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <a href="#" className="text-lg font-bold text-primary">Portal</a>
              <button onClick={onResourcesClick} className="text-lg font-bold text-on-surface-variant text-left">Resources</button>
              <button onClick={onComplianceClick} className="text-lg font-bold text-on-surface-variant text-left">Compliance</button>
              <button onClick={onContactClick} className="text-lg font-bold text-on-surface-variant text-left">Contact</button>
              <button onClick={onPresentationClick} className="text-lg font-bold text-on-surface-variant text-left">Presentation Deck</button>
              <button 
                onClick={onLoginClick}
                className="text-lg font-bold text-primary text-left"
              >
                Sign In
              </button>
              <button onClick={onEmergencyClick} className="flex items-center justify-center gap-2 rounded-lg bg-error py-3 text-sm font-bold text-on-error">
                <AlertTriangle size={18} />
                <span>EMERGENCY ALERT</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const VitalsMonitor = () => {
  return (
    <motion.div 
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative z-10 w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl"
    >
      <div className="flex items-center justify-between bg-primary px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <Activity size={16} className="text-on-secondary" />
          </div>
          <span className="text-sm font-bold tracking-tight text-on-primary">Patient Vitals Monitor</span>
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-on-primary/20" />
          <div className="h-2 w-2 rounded-full bg-on-primary/20" />
          <div className="h-2 w-2 rounded-full bg-on-primary/20" />
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-l-4 border-secondary bg-surface-container p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">HEART RATE</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-primary">72</span>
              <span className="text-[10px] font-bold text-secondary">BPM</span>
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-error bg-surface-container p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">OXYGEN SATURATION</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-primary">98</span>
              <span className="text-[10px] font-bold text-on-surface-variant">%</span>
            </div>
          </div>
        </div>

        <div className="h-44 rounded-lg bg-[#001D36] p-4 flex flex-col justify-between">
           <div className="text-[10px] tracking-wider text-on-primary/40">Real-time Bio-Telemetrics</div>
           <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VITALS_DATA}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {VITALS_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="#77d8b8" fillOpacity={0.8 + (index / 40)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-bright p-4">
          <div className="flex items-center gap-3">
            <Pill className="text-secondary" size={20} />
            <div>
              <p className="text-xs font-bold text-primary">Next Medication</p>
              <p className="text-[10px] text-on-surface-variant tracking-tight uppercase font-mono">Lisinopril 10mg</p>
            </div>
          </div>
          <span className="rounded bg-secondary-container px-2 py-1 text-[10px] font-bold text-on-secondary-container">IN 14 MIN</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ number, icon: Icon, title, description }: { number: string, icon: any, title: string, description: string }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm transition-all hover:border-primary hover:shadow-xl"
    >
      <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl font-extrabold text-on-primary shadow-lg">
        {number}
      </div>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container transition-transform group-hover:scale-110">
        <Icon size={32} className="text-primary" />
      </div>
      <h3 className="mb-4 text-xl font-bold tracking-tight text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </motion.div>
  );
};

export default function Landing({ onLoginClick, onRegisterClick }: LandingProps) {
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar 
        onLoginClick={onLoginClick}
        onResourcesClick={() => setShowResourcesModal(true)}
        onComplianceClick={() => setShowComplianceModal(true)}
        onContactClick={() => setShowContactModal(true)}
        onEmergencyClick={() => setShowEmergencyModal(true)}
      />

      <main>
        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden px-6 py-16 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                VITALIX CLINICAL INTELLIGENCE
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-primary lg:text-7xl">
                Your Complete Medical Journey, <span className="text-secondary">Tracked by AI.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
                Vitalix monitors your real-time vitals, manages complex medication schedules, and provides clinical-grade analytics to keep you and your healthcare team informed with mathematical precision.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onLoginClick}
                  className="rounded-lg bg-primary px-10 py-4 text-lg font-bold text-white transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
                >
                  Login
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="rounded-lg border-2 border-secondary bg-transparent px-10 py-4 text-lg font-bold text-secondary transition-all hover:bg-secondary/5 active:scale-95"
                >
                  Register
                </button>
              </div>

              <div className="flex items-center gap-6 border-t border-outline-variant pt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-mono">
                  TRUSTED BY <span className="font-bold text-primary">12,000+</span> MEDICAL PROFESSIONALS
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 -rotate-3 scale-110 bg-primary-container/10 blur-[100px]" />
              <VitalsMonitor />
            </div>
          </div>
        </section>

        {/* --- Process Section --- */}
        <section className="bg-surface-container-low py-28 px-6 lg:px-12">
          <div className="mx-auto max-w-container-max">
            <div className="mb-20 text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">Clinical Integration Process</h2>
              <p className="mx-auto max-w-2xl text-lg text-on-surface-variant">
                Our AI-driven workflow ensures seamless data synchronization between patient devices and institutional databases.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <ProcessStep 
                number="01"
                icon={Search}
                title="Initial Diagnosis"
                description="Synthesize current medical history and existing symptoms through our proprietary AI assessment tool."
              />
              <ProcessStep 
                number="02"
                icon={Brain}
                title="AI Processing"
                description="Our neural networks analyze vitals against millions of clinical data points to detect early warning signs."
              />
              <ProcessStep 
                number="03"
                icon={ClipboardCheck}
                title="Health Reports"
                description="Receive detailed, actionable reports shared instantly with your healthcare providers for precision care."
              />
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="px-6 py-20 lg:px-12">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-container-max overflow-hidden rounded-[2.5rem] bg-primary-container p-12 lg:p-24"
          >
            <div className="flex flex-col items-center text-center space-y-8">
                <h2 className="text-4xl font-bold tracking-tight text-on-primary-container md:text-5xl max-w-2xl">Ready for Clinical Precision?</h2>
                <p className="max-w-lg text-lg leading-relaxed text-on-primary-container/70 mx-auto">
                  Join thousands of medical professionals using Vitalix to revolutionize patient outcomes through AI monitoring.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={onLoginClick}
                    className="rounded-lg bg-secondary px-8 py-3 text-sm font-bold text-on-secondary transition-all hover:bg-secondary/90"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={onRegisterClick}
                    className="rounded-lg bg-surface-container-lowest px-8 py-3 text-sm font-bold text-primary transition-all hover:bg-surface-bright"
                  >
                    Register Family
                  </button>
                </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-primary pt-20 pb-12 text-on-primary">
        <div className="container mx-auto max-w-container-max px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="space-y-6">
              <span className="text-xl font-black tracking-tighter text-on-primary">VITALIX</span>
              <p className="text-[10px] uppercase tracking-widest text-on-primary/60 font-mono">
                © 2026 VITALIX AI MEDICAL SYSTEMS. CLINICAL PRECISION GUARANTEED.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <button onClick={() => setShowResourcesModal(true)} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-secondary font-mono">
                Hospital Directory
              </button>
              <button onClick={() => setShowContactModal(true)} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-secondary font-mono">
                Contact Support
              </button>
              <button onClick={() => setShowPrivacyModal(true)} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-secondary font-mono">
                Privacy Policy
              </button>
              <button onClick={() => setShowComplianceModal(true)} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-secondary font-mono">
                Compliance
              </button>
              <button onClick={() => setShowTermsModal(true)} className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-secondary font-mono">
                Terms of Service
              </button>
            </div>

            <div className="flex gap-4">
              <button className="flex h-10 w-10 items-center justify-center rounded bg-on-primary/10 transition-colors hover:bg-secondary">
                <Globe size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded bg-on-primary/10 transition-colors hover:bg-secondary">
                <ShieldCheck size={18} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResourcesModal isOpen={showResourcesModal} onClose={() => setShowResourcesModal(false)} />
      <ComplianceModal isOpen={showComplianceModal} onClose={() => setShowComplianceModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <EmergencyAlertModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} type="terms" />
      <TermsModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} type="privacy" />
    </div>
  );
}
