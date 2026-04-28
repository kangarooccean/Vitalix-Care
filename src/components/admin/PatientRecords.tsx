import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, User, FileX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialPatients = [
  { id: 'PAT-88421', name: 'Elena Rodriguez', room: '302-A', condition: 'Stable', status: 'Inpatient', lastUpdate: '2h ago' },
  { id: 'PAT-88422', name: 'James Wilson', room: 'ICU-04', condition: 'Critical', status: 'Inpatient', lastUpdate: '15m ago' },
  { id: 'PAT-88423', name: 'Sarah Chen', room: '215-B', condition: 'Recovering', status: 'Observation', lastUpdate: '5h ago' },
  { id: 'PAT-88424', name: 'Michael Brown', room: '401-C', condition: 'Stable', status: 'Discharge Pending', lastUpdate: '1h ago' },
  { id: 'PAT-88425', name: 'Linda Johnson', room: '108-A', condition: 'Stable', status: 'Inpatient', lastUpdate: '3h ago' },
];

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPatients = initialPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || patient.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Patient Records</h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage and monitor all active hospital residents</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 font-mono uppercase tracking-wider">
            + New Admission
          </button>
          
          <select 
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 font-mono uppercase tracking-wider outline-none"
          >
            <option value="All">All Status</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Observation">Observation</option>
            <option value="Discharge Pending">Discharge Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto text-left">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-mono font-extrabold tracking-widest">
              <th className="px-8 py-4">Patient</th>
              <th className="px-8 py-4">Room/Unit</th>
              <th className="px-8 py-4">Condition</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Last Update</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {filteredPatients.map((patient) => (
                <motion.tr 
                  key={patient.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-slate-700 hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{patient.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-medium">{patient.room}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      patient.condition === 'Critical' ? 'bg-error/10 text-error' :
                      patient.condition === 'Recovering' ? 'bg-secondary/10 text-secondary' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-500">{patient.status}</td>
                  <td className="px-8 py-5 text-slate-500">{patient.lastUpdate}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {filteredPatients.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FileX className="w-8 h-8 text-slate-300" />
             </div>
             <p className="text-slate-500 font-bold">No patient records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

