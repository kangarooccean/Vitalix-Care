import { LucideIcon, TrendingUp, TrendingDown, CheckCircle2, Timer } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'stable' | 'alert';
  progress: number;
  progressColor: string;
  onClick?: () => void;
}

export default function StatCard({ label, value, icon: Icon, trend, trendType, progress, progressColor, onClick }: StatCardProps) {
  const getTrendIcon = () => {
    switch (trendType) {
      case 'up': return <TrendingUp className="w-3 h-3" />;
      case 'down': return <TrendingDown className="w-3 h-3" />;
      case 'stable': return <CheckCircle2 className="w-3 h-3" />;
      case 'alert': return <Timer className="w-3 h-3" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trendType) {
      case 'up': return 'text-secondary';
      case 'down': return 'text-error';
      case 'stable': return 'text-secondary';
      case 'alert': return 'text-amber-600';
      default: return 'text-slate-500';
    }
  };

  const getIconBg = () => {
    switch (label) {
        case 'Total Patients': return 'bg-blue-50 text-blue-900';
        case 'Bed Occupancy': return 'bg-emerald-50 text-emerald-700';
        case 'Staff On-Duty': return 'bg-amber-50 text-amber-700';
        case 'Pending Approvals': return 'bg-slate-50 text-slate-900';
        default: return 'bg-slate-50 text-slate-900';
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`bg-white p-6 rounded-xl border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer hover:border-primary/20' : ''}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-2.5 rounded-lg ${getIconBg()}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`flex items-center gap-1.5 ${getTrendColor()} text-[12px] font-bold font-mono tracking-wider`}>
            {getTrendIcon()}
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-slate-500 text-[10px] uppercase font-mono font-bold tracking-widest mb-1.5">{label}</h3>
        <p className="text-3xl font-extrabold text-primary tracking-tight font-sans">{value}</p>
      </div>

      <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${progressColor}`}
        />
      </div>
    </motion.div>
  );
}
