import { BellRing } from 'lucide-react';
import { motion } from 'motion/react';

type Alert = {
  type: 'success' | 'warning' | 'info';
  msg: string;
  time: string;
};

const alerts: Alert[] = [
  { type: 'success', msg: 'Lab results verified', time: '2h ago' },
  { type: 'warning', msg: 'Upcoming medication dose', time: '45m ago' },
  { type: 'info', msg: 'Appointment confirmed', time: '10m ago' },
];

const styles = {
  success: 'bg-secondary/5 border-secondary/20 text-secondary',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  info: 'bg-primary/5 border-primary/20 text-primary',
};

const dotColors = {
  success: 'bg-secondary',
  warning: 'bg-amber-500',
  info: 'bg-primary',
};

export default function AlertsSection() {
  return (
    <section id="clinical-alerts" className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/5 rounded-lg">
            <BellRing className="w-5 h-5 text-primary" />
          </div>
          <h4 className="text-lg font-bold text-primary">Recent Clinical Alerts</h4>
        </div>
        <button className="text-sm font-bold text-primary hover:underline transition-all">
          View All Notifications
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {alerts.map((alert, idx) => (
          <motion.div
            key={alert.msg}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-all cursor-pointer hover:scale-[1.02] ${styles[alert.type]}`}
          >
            <span className={`w-2 h-2 rounded-full ring-2 ring-white ${dotColors[alert.type]} ${alert.type === 'success' ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-semibold whitespace-nowrap">{alert.msg}</span>
            <span className="text-[10px] font-mono opacity-60 italic">{alert.time}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
