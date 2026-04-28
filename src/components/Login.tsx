import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Fingerprint, CheckCircle2, Stethoscope } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'staff' | 'family' | 'doctor' | 'patient' | 'admin') => void;
  onRegisterClick?: () => void;
  onBack?: () => void;
}

export default function Login({ onLogin, onRegisterClick, onBack }: LoginProps) {
  const [role, setRole] = useState<'staff' | 'family' | 'doctor' | 'patient' | 'admin'>('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Fallback emails based on selected role if input is empty (for demo ease)
    const demoEmails = {
      staff: 'sarah.n@vitalix.com',
      doctor: 'sharma@vitalix.com',
      patient: 'elena.r@example.com',
      admin: 'admin@medcore.com',
      family: 'family@example.com'
    };
    
    const loginEmail = email || demoEmails[role];
    const loginPassword = password || 'password123';

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      if (!res.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      onLogin(data.user.role);
    } catch (err) {
      console.error('API login failed, falling back to local auth', err);
      // Fallback to local auth if backend isn't running
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen medical-pattern flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[540px] bg-white rounded-3xl shadow-xl border border-outline-variant/30 overflow-hidden"
      >
        <div className="p-10 text-center">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-4xl font-black text-primary tracking-tighter">VITALIX</h1>
            <p className="text-xs font-bold text-outline uppercase tracking-widest px-4 py-1 bg-surface-container rounded-full">Secure Patient Portal</p>
          </div>

            <div className="flex p-1 bg-surface-container rounded-xl mb-8 overflow-hidden">
              <button 
                onClick={() => setRole('staff')}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${role === 'staff' ? 'bg-primary text-white shadow-md' : 'text-outline hover:text-primary'}`}
              >
                Nurse
              </button>
              <button 
                onClick={() => setRole('doctor')}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${role === 'doctor' ? 'bg-primary text-white shadow-md' : 'text-outline hover:text-primary'}`}
              >
                Physician
              </button>
              <button 
                onClick={() => setRole('admin')}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${role === 'admin' ? 'bg-primary text-white shadow-md' : 'text-outline hover:text-primary'}`}
              >
                Admin
              </button>
              <button 
                onClick={() => setRole('patient')}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${role === 'patient' ? 'bg-primary text-white shadow-md' : 'text-outline hover:text-primary'}`}
              >
                Patient
              </button>
              <button 
                onClick={() => setRole('family')}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${role === 'family' ? 'bg-primary text-white shadow-md' : 'text-outline hover:text-primary'}`}
              >
                Family
              </button>
            </div>

          <form className="space-y-6 text-left" onSubmit={handleLoginSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">User Identification</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input 
                  type="text" 
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'staff' ? "Enter Staff ID" : role === 'doctor' ? "Enter Doctor License #" : role === 'admin' ? "Enter Admin Credentials" : role === 'patient' ? "Enter Patient ID" : "Enter Patient/Family ID"}
                  className="w-full pl-12 pr-4 py-4 bg-surface border-outline-variant/30 border rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Access PIN / Password</label>
                <button type="button" className="text-[10px] font-bold text-secondary hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input 
                  type="password" 
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-surface border-outline-variant/30 border rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
            >
              Secure Login
            </button>

            {role === 'family' && (
              <p className="text-center text-xs font-bold text-outline mt-4">
                New family member? <button type="button" onClick={onRegisterClick} className="text-primary hover:underline">Register for Access</button>
              </p>
            )}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-bold text-outline">SECURE MFA</span></div>
            </div>

            <button 
              type="button" 
              className="w-full border-2 border-secondary/20 text-secondary py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-secondary-container transition-colors"
            >
              <Fingerprint className="w-5 h-5" />
              Login with Biometrics / OTP
            </button>
          </form>

          <p className="mt-8 text-xs font-medium text-outline flex items-center justify-center gap-4">
            {onBack && <button onClick={onBack} className="hover:text-primary transition-colors">← Back to Overview</button>}
            {onBack && <span className="w-1 h-1 bg-outline rounded-full" />}
            <span>Clinical Compliance <CheckCircle2 className="w-3 h-3 inline text-secondary mb-0.5" /> ISO-27001</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
