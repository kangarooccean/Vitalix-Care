import { MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

const departments = [
  { name: 'Emergency Care', count: 142, percentage: 82, opacity: 'bg-primary' },
  { name: 'Cardiology', count: 98, percentage: 65, opacity: 'bg-primary/80' },
  { name: 'Pediatrics', count: 74, percentage: 50, opacity: 'bg-primary/60' },
  { name: 'Neurology', count: 56, percentage: 38, opacity: 'bg-primary/40' },
];

export default function DepartmentChart() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-xl font-bold text-primary tracking-tight">Departmental Patient Distribution</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live census by medical specialty</p>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors group">
          <MoreVertical className="w-5 h-5 text-slate-400 group-hover:text-primary" />
        </button>
      </div>
      
      <div className="p-8 space-y-8 flex-1">
        {departments.map((dept, index) => (
          <div key={dept.name} className="group cursor-default">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[11px] text-slate-700 font-bold uppercase tracking-wider font-mono">{dept.name}</span>
              <span className="text-sm text-primary font-extrabold font-sans transition-transform group-hover:scale-105 inline-block">{dept.count} Patients</span>
            </div>
            <div className="h-9 w-full bg-slate-50 rounded-lg overflow-hidden flex border border-slate-100 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${dept.percentage}%` }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className={`${dept.opacity} h-full relative group-hover:brightness-110 transition-all`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
