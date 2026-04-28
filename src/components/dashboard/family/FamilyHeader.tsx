import React from 'react';
import { User, Lock, Bell, AlertCircle } from 'lucide-react';

export default function FamilyHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20">
      <div className="h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white shadow-inner">
            <User size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-primary">Ramesh Kumar</h2>
              <Lock size={14} className="text-slate-400" />
            </div>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              Patient ID: VK-20941 • Age: 68 • Blood: O+
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            <AlertCircle size={16} />
            Emergency Alert
          </button>
        </div>
      </div>
    </header>
  );
}
