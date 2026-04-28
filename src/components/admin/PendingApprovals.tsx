import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const initialApprovals = [
  {
    id: 1,
    initials: 'RM',
    name: 'Robert Miller',
    type: 'Cardiology Transfer',
    note: '"Patient requires step-down care following successful stent procedure."',
  },
  {
    id: 2,
    initials: 'EL',
    name: 'Elena Lopez',
    type: 'New Family Representative',
    note: '"Verification of kinship documents for minor patient ICU visitation."',
  },
  {
    id: 3,
    initials: 'JW',
    name: 'John White',
    type: 'Discharge Authority',
    note: '"Final signature required for palliative home care coordination."',
  },
];

export default function PendingApprovals() {
  const [approvals, setApprovals] = useState(initialApprovals);

  const handleAction = (id: number) => {
    setApprovals(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-white">
        <h2 className="text-xl font-bold text-primary tracking-tight">Pending Approvals</h2>
        <p className="text-sm text-slate-500 mt-0.5">Requires administrative verification</p>
      </div>
      
      <div className="p-4 flex-1 space-y-4 overflow-y-auto max-h-[520px] custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {approvals.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              className="p-5 rounded-xl border border-slate-100 bg-surface-container-lowest shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-full bg-primary-container text-white flex items-center justify-center font-extrabold text-sm shadow-inner group-hover:scale-110 transition-transform">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-widest">{item.type}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 italic font-medium leading-relaxed">
                {item.note}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleAction(item.id)}
                  className="flex-1 py-2.5 bg-secondary text-white text-[12px] font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm font-mono tracking-wider uppercase"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleAction(item.id)}
                  className="flex-1 py-2.5 border border-error text-error text-[12px] font-bold rounded-lg hover:bg-error-container/10 active:scale-95 transition-all font-mono tracking-wider uppercase"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
          {approvals.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-slate-400"
            >
              <p className="text-sm font-medium">All cleared!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
