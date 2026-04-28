import { Activity, Thermometer, Droplets, Heart, FileText, Clipboard, History, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function ClinicalNotesSection() {
    const [notes, setNotes] = useState([
        { id: 1, text: "Patient responding well to Lisinopril. Marginal improvement in diastolic pressure observed.", author: "Dr. Sharma", time: "2h ago" }
    ]);
    const [newNote, setNewNote] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        setIsSaving(true);
        setTimeout(() => {
            setNotes([{ id: Date.now(), text: newNote, author: "Dr. Sharma (Me)", time: "Just now" }, ...notes]);
            setNewNote('');
            setIsSaving(false);
        }, 800);
    };

    return (
        <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest font-mono">
                <Clipboard className="w-4 h-4" /> Clinical Observations
            </h3>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                <textarea 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter observation notes..."
                    className="w-full bg-transparent border-none resize-none text-sm outline-none placeholder:text-slate-300 min-h-[80px]"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={handleAddNote}
                        disabled={isSaving || !newNote.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isSaving ? <Activity className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        {isSaving ? 'Synching...' : 'Commit Note'}
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {notes.map(note => (
                        <motion.div 
                            key={note.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <CheckCircle2 size={32} className="text-secondary" />
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed mb-2 pr-6">"{note.text}"</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest">{note.author}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">{note.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

interface PatientClinicalFileProps {
  patient: {
    patientName: string;
    type: string;
    vitals: {
      hr: number;
      bp: string;
      temp: string;
    };
  } | null;
}

export default function PatientClinicalFile({ patient }: PatientClinicalFileProps) {
  if (!patient) {
    return (
      <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Clipboard className="w-10 h-10 text-slate-200" />
        </div>
        <p className="font-bold text-slate-500 uppercase tracking-widest text-xs font-mono">No Patient Selected</p>
        <p className="text-sm mt-2">Select a patient from your schedule to view clinical details and start the encounter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-xl">
                    {patient.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-primary tracking-tight">{patient.patientName}</h2>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] font-mono">{patient.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-secondary uppercase tracking-[0.15em] font-mono">Current Resident</span>
                    </div>
                </div>
            </div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
                Edit Record
            </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
            {[
                { label: 'Heart Rate', value: `${patient.vitals.hr} BPM`, icon: Heart, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Blood Pressure', value: patient.vitals.bp, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Temperature', value: patient.vitals.temp, icon: Thermometer, color: 'text-error', bg: 'bg-error/5' }
            ].map(vital => (
                <div key={vital.label} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">{vital.label}</p>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${vital.bg} ${vital.color}`}>
                            <vital.icon className="w-4 h-4" />
                        </div>
                        <p className="text-xl font-black text-primary">{vital.value}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="p-8 flex-1 grid grid-cols-2 gap-8 overflow-y-auto">
        <div className="space-y-6">
            <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4">
                    <History className="w-4 h-4" /> Clinical History
                </h3>
                <div className="space-y-3">
                    {[
                        { date: 'Oct 15', event: 'Initial post-op evaluation completed' },
                        { date: 'Oct 12', event: 'Primary coronary intervention (PCI)' },
                        { date: 'Oct 12', event: 'Emergency admission - Chest pain' }
                    ].map((h, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <span className="text-[10px] font-black text-slate-400 uppercase font-mono mt-1 w-12">{h.date}</span>
                            <div className="relative pb-4 pl-4 border-l border-slate-100 last:border-0">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-200" />
                                <p className="text-sm font-medium text-slate-600">{h.event}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ClinicalNotesSection />
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest font-mono mb-4">
                    <FileText className="w-4 h-4" /> Recent Diagnostics
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {['Chest X-Ray (Oct 14)', 'Full Metabolic Panel (Oct 13)', '12-Lead ECG (Oct 12)'].map(report => (
                        <button key={report} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{report}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <button className="w-full py-4 bg-secondary text-white rounded-xl font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest font-mono">
                    Initiate Video Consultation
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight } from 'lucide-react';
