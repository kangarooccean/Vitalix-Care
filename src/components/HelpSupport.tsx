import { 
  MessageSquare, 
  Phone, 
  Video, 
  HelpCircle, 
  Search, 
  ExternalLink,
  ShieldCheck,
  User 
} from 'lucide-react';
import { motion } from 'motion/react';

const supportCategories = [
  { 
    title: 'Clinical Inquiry', 
    desc: 'Contact your primary care physician or specialist regarding your treatment plan.',
    icon: User,
    action: 'Contact Clinical Team'
  },
  { 
    title: 'Medication Assistance', 
    desc: 'Speak with a nurse or pharmacist about dosage, refills, or side effects.',
    icon: ShieldCheck,
    action: 'Pharmacy Support'
  },
  { 
    title: 'Technical Support', 
    desc: 'Issues with portal login, data syncing, or device integration.',
    icon: HelpCircle,
    action: 'Get Tech Help'
  }
];

export default function HelpSupport() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Help & Clinical Support</h2>
          <p className="text-slate-500 font-medium">Direct access to your care team and portal assistance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-lg shadow-secondary/20 hover:brightness-110 active:scale-95 transition-all text-sm">
            <Video className="w-4 h-4" /> Start Telehealth Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportCategories.map((cat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <cat.icon className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">{cat.title}</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {cat.desc}
            </p>
            <button className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">
              {cat.action}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest">Knowledge Base</h3>
            </div>
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search articles on medications, procedures, or portal usage..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-4">
                {[
                  'How to interpret my diagnostic reports?',
                  'Managing persistent side effects of Beta Blockers',
                  'Filing insurance claims through the portal',
                  'When to use the Emergency Protocols vs General Support?'
                ].map((q, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-primary">{q}</span>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <MessageSquare className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg">Instant Chat</h3>
            </div>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Connect with our on-duty nursing staff for immediate non-emergency clinical guidance.
            </p>
            <button className="w-full py-4 bg-secondary text-white font-black rounded-xl text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all">
              Initialize Secure Chat
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-black text-primary text-sm uppercase tracking-widest mb-6">Emergency Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-primary">Emergency Response</p>
                  <p className="text-sm font-bold text-error">911</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-primary">MedCore Helpdesk</p>
                  <p className="text-sm font-bold text-slate-600">1-800-VITALIX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
