import React, { useState } from 'react';
import { 
  Heart, 
  Pill, 
  FileText, 
  ExternalLink, 
  File, 
  Info, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const TIMELINE_DATA = [
  { name: 'Mon', bp: 120, glucose: 95 },
  { name: 'Tue', bp: 118, glucose: 98 },
  { name: 'Wed', bp: 125, glucose: 102 },
  { name: 'Thu', bp: 121, glucose: 100 },
  { name: 'Fri', bp: 119, glucose: 97 },
  { name: 'Sat', bp: 117, glucose: 96 },
  { name: 'Sun', bp: 122, glucose: 99 },
];

const MESSAGES = [
  {
    id: '1',
    sender: 'doctor',
    text: "Hello Kavitha, Ramesh's blood pressure has stabilized over the last 48 hours. We are keeping him on the current dosage of Metformin. Any questions?",
    timestamp: '10:45 AM',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    sender: 'family',
    text: "Thank you, doctor. Is it safe for him to walk in the garden tomorrow morning?",
    timestamp: '11:02 AM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    sender: 'doctor',
    text: "Yes, a 15-minute gentle walk is highly recommended. Just ensure he stays hydrated.",
    timestamp: '11:15 AM',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop'
  }
];

const HealthCard = ({ title, value, unit, icon: Icon, color, trend, badge }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-primary transition-colors group-hover:bg-primary-container group-hover:text-white">
        <Icon size={20} />
      </div>
      {badge && (
        <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase tracking-tighter">
          {badge}
        </span>
      )}
    </div>
    <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
    <div className="flex items-baseline gap-1 mt-1">
      <span className="text-2xl font-black text-primary">{value}</span>
      <span className="text-xs text-slate-400 uppercase font-bold">{unit}</span>
    </div>
    {trend && (
      <div className="mt-4 flex items-end gap-1 h-8">
        {[0.4, 0.6, 1, 0.7, 0.5].map((h, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-t-sm transition-all duration-300 ${i === 2 ? 'bg-primary' : 'bg-slate-100'}`} 
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    )}
  </motion.div>
);

export default function FamilyOverview({ onViewChange }: { onViewChange: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

  return (
    <div className="space-y-8">
      {/* Read Only Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-50 border border-amber-100 rounded-xl px-6 py-4 flex items-center gap-4 text-amber-900"
      >
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
          <Info size={20} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">Read-Only Access Enabled</p>
          <p className="text-xs opacity-75 mt-0.5">
            You are viewing a shared record. Modifications are disabled to maintain medical integrity.
          </p>
        </div>
        <button className="text-xs font-bold underline hover:no-underline px-4 py-2">Learn More</button>
      </motion.div>

      {/* Quick Action Clinical Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { id: 'summary', label: 'Health Summary', icon: Heart, color: 'text-primary' },
          { id: 'medications', label: 'Prescriptions', icon: Pill, color: 'text-secondary' },
          { id: 'reports', label: 'Reports', icon: FileText, color: 'text-primary' },
          { id: 'appointments', label: 'Appointments', icon: ExternalLink, color: 'text-primary' },
          { id: 'billing', label: 'Billing', icon: File, color: 'text-primary' },
          { id: 'help', label: 'Help & Support', icon: MessageSquare, color: 'text-secondary' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg hover:border-primary/20 transition-all group"
          >
            <div className={`p-3 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white transition-colors ${item.color}`}>
              <item.icon size={20} />
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthCard 
          title="Health Overview" 
          value="98" 
          unit="BPM" 
          icon={Heart} 
          color="bg-primary" 
          badge="Stable"
          trend
        />
        <HealthCard 
          title="Current Meds" 
          value="4" 
          unit="Active" 
          icon={Pill} 
          color="bg-secondary" 
        />
        <div className="bg-white rounded-xl border border-slate-100 p-6 relative shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
          <div className="flex justify-between mb-4">
            <FileText size={20} className="text-slate-400" />
            <ExternalLink size={14} className="text-slate-300" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Recent Reports</h3>
          <p className="text-xs text-slate-500 mt-1">Lipid Profile - 2 days ago</p>
          <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group cursor-pointer hover:border-error/20">
            <div className="text-error bg-error/10 p-1.5 rounded">
              <File size={14} />
            </div>
            <span className="text-[10px] font-bold truncate">LAB_R_OCT23.pdf</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6 relative shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
          <FileText size={20} className="text-primary-container mb-4" />
          <h3 className="font-bold text-sm text-slate-900">Next Visit</h3>
          <p className="text-lg font-black text-primary mt-1">OCT 28, 2023</p>
          <p className="text-xs text-slate-500 font-medium">with Dr. Sharma (Cardio)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Chart and Team */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Health Timeline</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Biometric indicators for past 7 days</p>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button 
                  onClick={() => setActiveTab('week')}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'week' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  WEEK
                </button>
                <button 
                  onClick={() => setActiveTab('month')}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${activeTab === 'month' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  MONTH
                </button>
              </div>
            </div>

            <div className="h-[280px] w-full medical-grid rounded-xl p-4 border border-slate-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA}>
                  <defs>
                    <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a3c5e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1a3c5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    itemStyle={{fontSize: '12px', fontWeight: 700}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bp" 
                    stroke="#1a3c5e" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorBp)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="glucose" 
                    stroke="#006b54" 
                    strokeWidth={2} 
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BP Systolic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Glucose</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Primary Care Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Dr. Vivek Sharma', role: 'Chief Cardiologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' },
                { name: 'Nurse Elena Vance', role: 'Care Coordinator', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=100&h=100&fit=crop' },
              ].map((member) => (
                <motion.div 
                  key={member.name}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 hover:border-primary/10 transition-all cursor-pointer bg-surface/50"
                >
                  <img src={member.img} alt={member.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">{member.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Messaging */}
        <div className="lg:sticky lg:top-28">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden h-[600px] flex flex-col">
            <div className="p-5 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MessageSquare size={18} className="text-secondary-container" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Message Dr. Sharma</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></div>
                    <span className="text-[10px] font-medium text-white/60">Active Now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/30">
              <div className="flex justify-center">
                <span className="text-[9px] font-black text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Today</span>
              </div>

              {MESSAGES.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-3 ${msg.sender === 'family' ? 'flex-row-reverse' : ''}`}
                >
                  <img src={msg.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />
                  <div className={`max-w-[85%] ${msg.sender === 'family' ? 'text-right' : ''}`}>
                    <div className={`p-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'family' 
                        ? 'bg-primary text-white rounded-2xl rounded-tr-none' 
                        : 'bg-white text-slate-700 rounded-2xl rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold mt-1.5 block px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-white border-t border-slate-100">
              <div className="relative group">
                <input 
                  disabled
                  type="text" 
                  placeholder="Messaging is restricted..." 
                  className="w-full bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-xs text-slate-400 cursor-not-allowed group-hover:bg-slate-100 transition-colors" 
                />
                <button 
                  disabled
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-200 text-white rounded-full transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-tight italic opacity-60">
                Emergency contact available via main switchboard
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
