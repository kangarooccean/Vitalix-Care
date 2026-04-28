import React, { useState } from 'react';
import { UserSquare2, Mail, Phone, MapPin, MoreHorizontal, ShieldCheck, MailPlus, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const staffData = [
  { id: 'STA-101', name: 'Dr. Sameer Sharma', role: 'Chief Medical Officer', dept: 'Administration', email: 'sshama@vitalix.com', phone: '+1 (555) 012-3490', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100', status: 'On-Duty' },
  { id: 'STA-102', name: 'Dr. Sarah Johnson', role: 'Head of Cardiology', dept: 'Cardiology', email: 'sjohnson@vitalix.com', phone: '+1 (555) 012-3491', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100&h=100', status: 'On-Duty' },
  { id: 'STA-103', name: 'Nurse Michael Chen', role: 'Senior ICU Nurse', dept: 'Emergency Care', email: 'mchen@vitalix.com', phone: '+1 (555) 012-3492', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100', status: 'Break' },
  { id: 'STA-104', name: 'Dr. Elena Vance', role: 'Neurologist', dept: 'Neurology', email: 'evance@vitalix.com', phone: '+1 (555) 012-3493', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100', status: 'Offline' },
];

const departments = ['All', 'Administration', 'Cardiology', 'Emergency Care', 'Neurology'];

export default function StaffDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('All');

  const filteredStaff = staffData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = activeDept === 'All' || member.dept === activeDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">Medical Staff Directory</h2>
          <p className="text-sm text-slate-500 mt-1">Manage institutional human resources and personnel</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all font-mono uppercase tracking-widest">
            Assign Roster
          </button>
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
            <MailPlus className="w-4 h-4" /> Contact All Staff
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md py-4 -mx-4 px-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search staff by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all uppercase tracking-widest font-mono border ${
                activeDept === dept 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-primary/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member, index) => (
            <motion.div 
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:border-primary/20 hover:shadow-md transition-all h-full flex flex-col"
            >
              <div className="relative h-24 bg-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-600" />
                  </button>
              </div>
              
              <div className="px-6 pb-6 text-center relative flex-1 flex flex-col">
                  <div className="relative -mt-12 mb-4 mx-auto w-24 h-24">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'On-Duty' ? 'bg-secondary' :
                      member.status === 'Break' ? 'bg-amber-400' : 'bg-slate-300'
                    }`} />
                  </div>

                  <h3 className="font-extrabold text-primary group-hover:text-secondary transition-colors">{member.name}</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-4">{member.role}</p>

                  <div className="p-3 bg-slate-50 rounded-xl mb-6 text-left space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> {member.dept}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {member.phone}
                      </div>
                  </div>

                  <div className="flex gap-2">
                      <button className="flex-1 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:brightness-110 transition-all font-mono uppercase tracking-widest text-[10px]">
                          Profile
                      </button>
                      <button className="flex-1 py-2 text-xs font-bold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all font-mono uppercase tracking-widest text-[10px]">
                          Message
                      </button>
                  </div>
              </div>
            </motion.div>
          ))}
          
          {searchTerm === '' && activeDept === 'All' && (
            <motion.button 
              layout
              className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-primary/30 transition-all group h-full min-h-[380px]"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <UserSquare2 className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors uppercase tracking-[0.2em] font-mono">Add New Member</span>
            </motion.button>
          )}
        </div>
      </AnimatePresence>
      
      {filteredStaff.length === 0 && (
        <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-primary">No staff found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

