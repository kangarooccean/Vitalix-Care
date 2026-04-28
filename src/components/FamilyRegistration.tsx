import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  Mail, 
  Upload, 
  Info, 
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronDown,
  HeartPulse
} from 'lucide-react';

interface FamilyRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
  onHome?: () => void;
}

export default function FamilyRegistration({ onBack, onSuccess, onHome }: FamilyRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    relationship: '',
    patientId: '',
    phone: '',
    email: '',
    otp: ['', '', '', '', '', '']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData({ ...formData, otp: newOtp });
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const avatars = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-outline-variant/20"
        >
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-secondary/20">
            <CheckCircle2 className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">Application Received</h2>
          <p className="text-outline text-lg mb-10 leading-relaxed font-medium">
            Your identity verification and relationship details have been submitted. Our compliance team will review your application within 24 hours.
          </p>
          <div className="bg-surface-container rounded-2xl p-6 mb-10 text-left border border-outline-variant/10">
            <p className="text-[10px] font-black text-primary tracking-widest uppercase mb-2">Next Steps</p>
            <ul className="space-y-3">
              <li className="flex gap-3 text-xs font-bold text-outline">
                <ShieldCheck size={16} className="text-secondary shrink-0" />
                Hospital verification of patient permission
              </li>
              <li className="flex gap-3 text-xs font-bold text-outline">
                <ShieldCheck size={16} className="text-secondary shrink-0" />
                Access credential generation
              </li>
              <li className="flex gap-3 text-xs font-bold text-outline">
                <ShieldCheck size={16} className="text-secondary shrink-0" />
                Welcome email with portal instructions
              </li>
            </ul>
          </div>
          <button 
            onClick={onSuccess}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20"
          >
            Return to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="px-8 py-4 flex justify-between items-center bg-white border-b border-outline-variant/10 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <HeartPulse className="text-white w-5 h-5" />
          </div>
          <span className="text-primary text-xl font-black tracking-tighter">VITALIX</span>
        </div>
        {onHome && (
          <button 
            onClick={onHome}
            className="text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-all flex items-center gap-2 hover:translate-x-1"
          >
            ← Back to Home
          </button>
        )}
      </nav>
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Left Section: Branding & Info */}
        <section className="lg:w-[40%] bg-surface-container p-8 lg:p-16 xl:p-24 flex flex-col justify-between border-r border-outline-variant/30 overflow-hidden relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <div className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <HeartPulse className="text-white w-5 h-5" />
              </div>
              <span className="text-primary text-2xl font-black tracking-tighter">VITALIX</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-on-surface text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight">
                Stay Connected with your loved ones' health journey.
              </h1>
              <p className="text-on-surface-variant text-lg max-w-md">
                Register to gain real-time access to clinical updates, vital monitors, and direct communication with the care team.
              </p>
            </div>
          </motion.div>

          {/* Family Illustration Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="my-12 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 transform -z-10" />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa32i1UjwdS7PfVe6EXlMfowgNX5KbsWVNoG-VDToRSle8SDLopA5LOUkfmHchTx_ybti5FFU_KkAP5f40YTKrfj0nT9qq5lasc_wXw3PnRwdt08rDaX8uCLCsePeJGBcjLSFAs_Byv8wjpcqHvd8wMqX7Pk3lM00FwpOkwcmt1zPfsThoz-aMn_migTBOJDhBN1l8p4mgW47VqK1nsxYZBQdi5CW3DesaEX5dY-0dJgmY70ZkCgorXgCoCkb44br9W_yVR5mSJW4" 
                alt="Supportive family group" 
                className="w-full h-auto object-contain rounded-2xl drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mt-auto pt-8 border-t border-outline-variant/30"
          >
            <div className="flex -space-x-3">
              {avatars.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-outline-variant" 
                  alt="User" 
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-on-surface-variant font-mono uppercase tracking-wider">
              Trusted by 5,000+ family members
            </p>
          </motion.div>
        </section>

        {/* Right Section: Form */}
        <section className="lg:w-[60%] bg-white p-8 lg:p-16 xl:p-24 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl w-full mx-auto"
          >
            {onHome && (
              <button 
                onClick={onHome}
                className="flex items-center gap-2 text-xs font-bold text-outline hover:text-primary transition-colors mb-6 uppercase tracking-widest font-mono"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Home / Registration</span>
              </button>
            )}
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-surface-container rounded-xl">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">Register as Family Member</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/10 border-outline-variant/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                    Relationship
                  </label>
                  <div className="relative">
                    <select required className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer">
                      <option value="">Select relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                      <option value="sibling">Sibling</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                  Patient ID
                </label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="VX-9988-21"
                    required
                    className="flex-grow px-4 py-3 bg-white border border-outline-variant/30 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 transition-all uppercase"
                  />
                  <button 
                    type="button"
                    onClick={() => setIsVerified(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      isVerified ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                    }`}
                  >
                    {isVerified ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    {isVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant font-medium mt-1 pl-1">
                  Found on the patient's wristband or admission documents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 border border-r-0 border-outline-variant/30 rounded-l-xl bg-surface-container text-on-surface-variant font-semibold text-sm">
                      +1
                    </span>
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000"
                      required
                      className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-r-xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant/30 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest pl-1">
                  Upload Government ID
                </label>
                <div className="border-2 border-dashed border-outline-variant rounded-2xl p-10 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container/30 transition-all cursor-pointer group">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-primary w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-on-surface">Click to upload or drag and drop</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-1">PNG, JPG or PDF (max. 5MB)</p>
                </div>
              </div>

              <div className="p-6 bg-surface-container rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface font-mono uppercase tracking-widest">
                    Verify OTP sent to phone
                  </label>
                  <button type="button" className="text-xs font-bold text-primary hover:underline">
                    Resend Code
                  </button>
                </div>
                <div className="flex justify-between gap-3">
                  {formData.otp.map((digit, i) => (
                    <input 
                      key={i}
                      id={`otp-${i}`}
                      type="text" 
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold bg-white border border-outline-variant/30 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 flex gap-4 items-start">
                <div className="p-1 bg-amber-100 rounded-lg">
                  <Info className="text-amber-700 w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-900 leading-none">Identity Verification Required</p>
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    Your application will be manually reviewed by the hospital administration. Access is typically granted within 24 hours.
                  </p>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-95 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 relative overflow-hidden"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Submit for Approval
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-on-surface-variant leading-relaxed">
              Already registered? <button onClick={onBack} className="text-primary font-bold hover:underline inline-flex items-center gap-1">Login to Portal <Lock className="w-3 h-3" /></button>
            </p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 z-20">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex items-center gap-2">
            <HeartPulse className="text-white w-6 h-6" />
            <span className="text-xl font-black tracking-tighter text-white">VITALIX</span>
          </div>
          <p className="text-white/50 text-xs font-mono tracking-widest uppercase">Clinical Precision Guaranteed</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {['Hospital Directory', 'Contact Support', 'Privacy Policy', 'Compliance', 'Terms of Service'].map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="text-xs font-medium text-white/40 text-center md:text-right">
          © {new Date().getFullYear()} Vitalix Medical Systems.<br /> All rights reserved.
        </div>
      </footer>
    </div>
  );
}
