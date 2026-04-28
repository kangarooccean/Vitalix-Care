import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Contrast, 
  RotateCw, 
  FlipHorizontal, 
  CheckCircle2, 
  Share2,
  FileDown,
  Calendar,
  User,
  ChevronRight
} from 'lucide-react';

const reports = [
  { 
    id: 'SR-99201', 
    title: 'Lumbar Spine Lateral', 
    type: 'X-RAY', 
    date: 'Oct 24, 2023', 
    doctor: 'Dr. Alistair Vance', 
    img: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'SR-88412', 
    title: 'Cranial Neuro-Imaging', 
    type: 'MRI', 
    date: 'Sep 12, 2023', 
    doctor: 'Dr. Elena Rossetti', 
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'SR-77319', 
    title: 'Abdominal Contrast Study', 
    type: 'CT SCAN', 
    date: 'Aug 30, 2023', 
    doctor: 'Dr. Marcus Thorne', 
    img: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=400&auto=format&fit=crop' 
  },
];

export default function Reports() {
  const [selectedScan, setSelectedScan] = useState<any>(null);

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center text-secondary-container shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight">My Reports & Scans</h2>
            <p className="text-sm font-medium text-outline">Centralized diagnostic repository & imaging history</p>
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all font-bold">
          <FileDown className="w-4 h-4" /> Upload New Scan
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
        <div className="flex gap-8">
          {['All Scans', 'X-Rays', 'MRI Analysis', 'CT Scans'].map((tab, idx) => (
            <button 
              key={tab} 
              className={`text-sm font-bold pb-4 relative transition-colors ${idx === 0 ? 'text-primary' : 'text-outline hover:text-primary'}`}
            >
              {tab}
              {idx === 0 && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors"><Search className="w-4 h-4 text-outline" /></button>
          <button className="p-2 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors"><Filter className="w-4 h-4 text-outline" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <motion.div 
            key={report.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col group cursor-pointer"
            onClick={() => setSelectedScan(report)}
          >
            <div className="h-48 bg-slate-900 relative overflow-hidden">
              <img src={report.img} alt={report.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 text-primary px-4 py-2 rounded-full font-black text-xs shadow-xl tracking-tighter">OPEN VIEWER</div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[8px] font-black tracking-widest rounded-full uppercase">{report.type}</span>
              </div>
            </div>
            <div className="p-6 flex-1 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-primary mb-1">{report.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                    <Calendar className="w-3 h-3" /> {report.date}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-wider">
                    <User className="w-3 h-3" /> {report.doctor}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2.5 rounded-xl text-xs font-bold">View</button>
                <button className="px-3 border border-outline-variant/30 text-outline py-2.5 rounded-xl"><Download className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-primary/95 backdrop-blur-xl" onClick={() => setSelectedScan(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-black w-full h-full rounded-[40px] overflow-hidden flex flex-col shadow-2xl border border-white/5">
              <div className="h-20 bg-black border-b border-white/10 flex items-center justify-between px-10 shrink-0">
                <div className="flex items-center gap-6">
                  <button onClick={() => setSelectedScan(null)} className="w-10 h-10 rounded-2xl bg-white/5 text-white flex items-center justify-center"><X className="w-5 h-5" /></button>
                  <div>
                    <h4 className="text-white font-bold tracking-tight">Viewer: {selectedScan.id}.DICOM</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-black">Diagnostic Mode</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-10 px-8 py-2 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center gap-4 pr-6 border-r border-white/10">
                    <ZoomOut className="w-4 h-4 text-white/40" /><span className="text-white font-mono text-[10px]">100%</span><ZoomIn className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Sun className="w-4 h-4 text-white/40" /><input type="range" className="w-24 h-1 accent-secondary" /><Contrast className="w-4 h-4 text-white/40" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/5 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase"><Share2 className="w-3 h-3 inline mr-2" /> Share</button>
                  <button className="bg-secondary text-primary px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase">Export</button>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]">
                <div className="relative w-full max-w-4xl aspect-[4/3] bg-black shadow-2xl flex items-center justify-center overflow-hidden border border-white/5">
                  <img src={selectedScan.img} className="w-full h-full object-contain grayscale" alt="Main Scan" />
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-[45%] left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-secondary/30 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_15px_#90f2d1]" /></motion.div>
                </div>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 space-y-6">
                  <div><span className="text-white/30 text-[8px] font-black uppercase tracking-[0.2em] block mb-3">Metadata</span><div className="grid grid-cols-2 gap-4 text-[9px]"><div className="text-white/40">kV: 120.0</div><div className="text-white/40">mA: 250.0</div><div className="text-white/40">Exp: 10ms</div><div className="text-white/40">Slice: 5mm</div></div></div>
                  <div className="pt-6 border-t border-white/10"><div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-2xl border border-secondary/10"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /><p className="text-secondary text-[10px] font-bold leading-tight">No anomalies detected.</p></div></div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
