import React from 'react';
import { 
  Activity, 
  AlertCircle, 
  Heart, 
  Download, 
  Brain, 
  AlertTriangle, 
  Info,
  Clock,
  ChevronRight,
  History as HistoryIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { User } from '../types';

interface HealthSummaryProps {
  user: User | null;
}

interface VitalProps {
  label: string;
  value: string;
  unit: string;
  status: 'CRITICAL' | 'HIGH' | 'STABLE' | 'BORDERLINE' | 'NORMAL' | 'BASELINE';
  statusColor: string;
  textColor: string;
}

interface DiagnosisItem {
  date: string;
  title: string;
  description: string;
  icd: string;
  isRecent?: boolean;
}

interface LabResult {
  analyte: string;
  category: string;
  value: string;
  reference: string;
  status: 'HIGH' | 'LOW' | 'NORMAL';
}

const VitalCard: React.FC<VitalProps> = ({ label, value, unit, status, statusColor, textColor }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm border-t-4 border-t-primary"
  >
    <div className="flex justify-between items-start mb-3">
      <span className="text-outline text-[10px] font-black uppercase tracking-wider">{label}</span>
      <span className={`${statusColor} px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider`}>{status}</span>
    </div>
    <div className={`text-2xl font-black ${textColor} tracking-tight`}>{value}</div>
    <div className="text-[10px] text-outline font-bold uppercase mt-1">{unit}</div>
  </motion.div>
);

const LabRow: React.FC<{ result: LabResult }> = ({ result }) => {
  const statusStyles = {
    HIGH: 'bg-error text-white',
    LOW: 'bg-primary text-white',
    NORMAL: 'bg-secondary text-white'
  };

  return (
    <tr className="hover:bg-surface-container/30 transition-colors group">
      <td className="px-6 py-5">
        <div className="font-black text-primary group-hover:text-secondary transition-colors text-sm">{result.analyte}</div>
        <div className="text-[10px] text-outline font-bold uppercase tracking-tight">{result.category}</div>
      </td>
      <td className={`px-6 py-5 font-black text-sm ${result.status !== 'NORMAL' ? 'text-error' : 'text-secondary'}`}>{result.value}</td>
      <td className="px-6 py-5 text-xs text-outline font-mono">{result.reference}</td>
      <td className="px-6 py-5 text-right">
        <span className={`${statusStyles[result.status]} px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest`}>
          {result.status}
        </span>
      </td>
    </tr>
  );
};

export default function HealthSummary({ user }: HealthSummaryProps) {
  const vitals: VitalProps[] = [
    { label: 'BP', value: '145/95', unit: 'mmHg', status: 'CRITICAL', statusColor: 'bg-error/10 text-error', textColor: 'text-error' },
    { label: 'Glucose', value: '210', unit: 'mg/dL', status: 'HIGH', statusColor: 'bg-error/10 text-error', textColor: 'text-error' },
    { label: 'HR', value: '98', unit: 'BPM', status: 'STABLE', statusColor: 'bg-secondary/10 text-secondary', textColor: 'text-secondary' },
    { label: 'SpO2', value: '94%', unit: 'Saturation', status: 'BORDERLINE', statusColor: 'bg-primary/10 text-primary', textColor: 'text-primary' },
    { label: 'Temp', value: '99.2', unit: '°F', status: 'NORMAL', statusColor: 'bg-secondary/10 text-secondary', textColor: 'text-secondary' },
    { label: 'Weight', value: '82kg', unit: 'Stable', status: 'BASELINE', statusColor: 'bg-surface-container text-outline', textColor: 'text-outline' },
  ];

  const diagnosis: DiagnosisItem[] = [
    { date: 'OCTOBER 2023', title: 'Type 2 Diabetes Mellitus', description: 'Primary diagnosis with associated metabolic syndrome markers.', icd: 'ICD-10: E11.9', isRecent: true },
    { date: 'JUNE 2022', title: 'Essential Hypertension', description: 'Managed via lifestyle intervention and pharmacological therapy.', icd: 'ICD-10: I10' },
    { date: 'MARCH 2021', title: 'Mild Hyperlipidemia', description: 'Periodic monitoring required. Baseline dietary adjustments recommended.', icd: 'ICD-10: E78.5' },
  ];

  const labResults: LabResult[] = [
    { analyte: 'HbA1c', category: 'Glycated Hemoglobin', value: '8.4%', reference: '4.0 - 5.6%', status: 'HIGH' },
    { analyte: 'Creatinine', category: 'Serum Analysis', value: '1.8 mg/dL', reference: '0.7 - 1.3 mg/dL', status: 'HIGH' },
    { analyte: 'Hemoglobin', category: 'Complete Blood Count', value: '11.2 g/dL', reference: '13.5 - 17.5 g/dL', status: 'LOW' },
    { analyte: 'Potassium', category: 'Electrolytes', value: '4.2 mEq/L', reference: '3.5 - 5.1 mEq/L', status: 'NORMAL' },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      {/* Dashboard Header */}
      <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-primary/20">
            <Heart className="w-10 h-10 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity size={16} className="text-primary" />
              <span className="text-[10px] font-black text-outline uppercase tracking-widest leading-none">Clinical Overview</span>
            </div>
            <h2 className="text-3xl font-black text-primary tracking-tight leading-none">My Health Summary</h2>
            <div className="flex items-center gap-2 text-outline mt-3 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>Last Clinical Assessment: Today, 09:24 AM</span>
            </div>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
        >
          <Download className="w-4 h-4" />
          Download Full Report
        </motion.button>
      </section>

      {/* Vitals Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {vitals.map((vital, idx) => (
          <VitalCard key={idx} {...vital} />
        ))}
      </section>

      {/* AI Insight Box */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-surface-container/50 border border-primary/20 rounded-[32px] p-8 flex flex-col md:flex-row gap-8 items-start shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Brain size={120} className="text-primary" />
          </div>
          <div className="bg-primary text-white p-5 rounded-2xl shrink-0 shadow-2xl shadow-primary-container relative z-10">
            <Brain className="w-12 h-12" />
          </div>
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h3 className="text-2xl font-black text-primary tracking-tight">Intelligent Clinical Summary</h3>
              <span className="text-[9px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full tracking-[0.2em] uppercase border border-primary/20">
                AI Augmented
              </span>
            </div>
            <p className="text-primary/70 leading-relaxed mb-6 font-bold text-sm max-w-4xl">
              Patient presents with significant elevations in glucose and systolic blood pressure. 
              Current trends suggest an acute metabolic shift. Immediate review of medication adherence is recommended. 
              Renal function markers in recent labs require close monitoring due to elevated creatinine levels.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-error/10 text-error px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black tracking-widest uppercase border border-error/20">
                <AlertTriangle className="w-4 h-4" />
                Hyperglycemia Risk
              </div>
              <div className="bg-error/10 text-error px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black tracking-widest uppercase border border-error/20">
                <AlertTriangle className="w-4 h-4" />
                Stage 2 Hypertension
              </div>
              <div className="bg-primary/5 text-primary px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black tracking-widest uppercase border border-primary/10">
                <Info className="w-4 h-4" />
                Medication Review Req.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Secondary Content: History & Lab Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Diagnosis History */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-primary tracking-tight">Diagnosis History</h3>
              <HistoryIcon className="text-outline w-6 h-6" />
            </div>
            <div className="relative space-y-12 flex-1">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-outline-variant/20" />
              {diagnosis.map((item, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center ${
                    item.isRecent ? 'bg-primary' : 'bg-outline-variant'
                  }`}>
                    {item.isRecent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
                    item.isRecent ? 'text-primary' : 'text-outline'
                  }`}>
                    {item.date}
                  </div>
                  <h4 className="font-black text-primary text-lg leading-none mb-2">{item.title}</h4>
                  <p className="text-sm text-outline font-medium leading-relaxed mb-3">{item.description}</p>
                  <div className="inline-block px-3 py-1 bg-surface-container text-[10px] font-black text-outline uppercase tracking-widest rounded-lg border border-outline-variant/20">
                    {item.icd}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Lab Results */}
        <section className="lg:col-span-7">
          <div className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-8 border-b border-outline-variant/20 flex items-center justify-between bg-white sticky top-0 z-20">
              <h3 className="text-xl font-black text-primary tracking-tight">Recent Lab Results</h3>
              <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                View All Panels
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface">
                    <th className="px-6 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Analyte</th>
                    <th className="px-6 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Value</th>
                    <th className="px-6 py-5 text-[10px] font-black text-outline uppercase tracking-widest">Reference Range</th>
                    <th className="px-6 py-5 text-[10px] font-black text-outline uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {labResults.map((result, idx) => (
                    <LabRow key={idx} result={result} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-auto p-6 bg-surface border-t border-outline-variant/20">
              <div className="flex items-center gap-3 text-[10px] text-outline font-black uppercase tracking-widest">
                <Info className="w-4 h-4 text-primary" />
                <span>Verified by Clinical Lab 7B • Ward 4B Pathology</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

