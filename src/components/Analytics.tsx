import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Users, 
  Clock, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_METRICS, MOCK_INSIGHTS } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const chartData = [
  { time: '08:00', volume: 85 },
  { time: '10:00', volume: 110 },
  { time: '12:00', volume: 125 },
  { time: '14:00', volume: 142 },
  { time: '16:00', volume: 138 },
  { time: '18:00', volume: 145 },
  { time: '20:00', volume: 130 },
];

export default function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1440px] mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Clinical Intelligence</h1>
          <p className="text-outline text-sm font-medium mt-1">Real-time performance analytics and predictive insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 border border-outline-variant/30 bg-white rounded-2xl text-sm font-bold hover:bg-surface-container transition-colors text-primary shadow-sm">
            Download Report
          </button>
          <button className="px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95">
            Customize Dashboard
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_METRICS.map((metric, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-outline-variant/30 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className={cn(
                "p-3 rounded-2xl",
                idx === 0 ? "bg-emerald-500/10 text-emerald-600" :
                idx === 1 ? "bg-amber-500/10 text-amber-600" :
                idx === 2 ? "bg-sky-500/10 text-sky-600" :
                "bg-indigo-500/10 text-indigo-600"
              )}>
                {idx === 0 ? <Users className="w-5 h-5" /> :
                 idx === 1 ? <Clock className="w-5 h-5" /> :
                 idx === 2 ? <Activity className="w-5 h-5" /> :
                 <TrendingUp className="w-5 h-5" />}
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                metric.trend === 'up' ? "text-emerald-600" : "text-amber-600"
              )}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {typeof metric.change === 'number' && metric.change > 0 ? `+${metric.change}` : metric.change}
              </div>
            </div>
            <h3 className="text-outline text-[10px] font-black uppercase tracking-widest group-hover:text-primary transition-colors">{metric.label}</h3>
            <p className="text-3xl font-black text-primary mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-outline-variant/30 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-primary tracking-tight">Patient Volume Trend</h2>
            <select className="bg-surface-container/50 border border-outline-variant/20 text-primary rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:bg-white transition-colors ring-1 ring-outline-variant/10">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006b54" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#006b54" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#73777f', fontSize: 10, fontWeight: 700}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#73777f', fontSize: 10, fontWeight: 700}} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#002645', 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    color: '#fff',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', marginBottom: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#006b54" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-primary tracking-tight flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Intelligence
              </h2>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-secondary/10">AI Active</span>
            </div>
            <div className="space-y-4">
              {MOCK_INSIGHTS.map((insight) => (
                <div key={insight.id} className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container/30 hover:border-secondary/40 hover:bg-white transition-all group cursor-pointer shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "mt-1.5 w-2 h-2 rounded-full shrink-0",
                      insight.priority === 'High' ? "bg-error shadow-[0_0_10px_rgba(186,26,26,0.5)] animate-pulse" : 
                      insight.priority === 'Medium' ? "bg-amber-500" : "bg-sky-500"
                    )} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{insight.title}</p>
                        <span className="text-[9px] font-bold text-outline">{insight.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-outline leading-relaxed line-clamp-2 font-medium">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-secondary font-black text-xs uppercase tracking-widest hover:bg-secondary/5 rounded-2xl transition-all">
              View Comprehensive Log
            </button>
          </div>

          <div className="bg-primary p-8 rounded-[32px] shadow-xl overflow-hidden relative group">
            <div className="relative z-10 text-white">
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">Hospital Capacity</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black text-white">92%</span>
                <span className="text-secondary-container text-[10px] mb-2 font-black uppercase tracking-widest">Critical Limit</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(144,242,209,0.5)]" style={{ width: '92%' }} />
              </div>
              <p className="text-xs text-white/50 mb-8 font-medium leading-relaxed italic">Emergency rerouting recommended for all non-trauma admissions immediately.</p>
              <button className="w-full bg-white text-primary py-4 rounded-2xl text-sm font-black hover:bg-surface-container transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest">
                <AlertCircle className="w-5 h-5" />
                INITIATE DIVERT
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
