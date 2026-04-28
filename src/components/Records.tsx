import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  History, 
  Activity,
  Heart,
  Pill,
  UserCheck
} from 'lucide-react';

const patients = [
  {
    id: "VK-20941",
    name: "Ramesh Kumar",
    age: 68,
    blood: "O+",
    status: "Active",
    ward: "4B-12",
    lastVitals: "15m ago",
    bpm: 72,
    spO2: 98,
    avatar: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "VK-21045",
    name: "Elena Rodriguez",
    age: 42,
    blood: "A-",
    status: "Observation",
    ward: "3A-05",
    lastVitals: "1h ago",
    bpm: 84,
    spO2: 96,
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "VK-19882",
    name: "Robert Chen",
    age: 71,
    blood: "B+",
    status: "Critical",
    ward: "ICU-02",
    lastVitals: "2m ago",
    bpm: 110,
    spO2: 92,
    avatar: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=100&auto=format&fit=crop"
  }
];

export default function Records() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1440px] mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight">Patient Directory</h2>
            <p className="text-sm font-medium text-outline">Accessing 1,240 secure medical profiles</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder="Search by ID, name, or ward..." 
              className="pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-2xl text-sm w-80 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <button className="p-3 bg-white border border-outline-variant/30 rounded-2xl text-outline hover:bg-surface-container transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {patients.map((patient) => (
          <motion.div 
            key={patient.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col group"
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-[24px] overflow-hidden shadow-md ring-4 ring-surface-container">
                  <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    patient.status === 'Critical' ? 'bg-error text-white' : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {patient.status}
                  </span>
                  <p className="text-[10px] font-mono text-outline mt-2">{patient.id}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-primary tracking-tight mb-1">{patient.name}</h3>
                <p className="text-xs font-bold text-outline">{patient.age} Years • Blood {patient.blood} • Ward {patient.ward}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-2 mb-2 text-outline">
                    <Heart className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-wider">Heart Rate</span>
                  </div>
                  <p className="text-xl font-black text-primary">{patient.bpm}<span className="text-[10px] font-bold text-outline ml-1">BPM</span></p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                  <div className="flex items-center gap-2 mb-2 text-secondary">
                    <Activity className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-wider">SpO2</span>
                  </div>
                  <p className="text-xl font-black text-secondary">{patient.spO2}<span className="text-[10px] font-bold text-outline ml-1">%</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20 text-xs font-bold text-outline">
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> {patient.lastVitals}
                </div>
                <div className="flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5" /> 4 Meds
                </div>
              </div>
            </div>

            <div className="mt-auto bg-surface-container py-4 px-8 flex justify-between items-center group-hover:bg-primary transition-colors cursor-pointer">
              <span className="text-xs font-bold text-primary group-hover:text-white">ACCESS PATIENT FILE</span>
              <ChevronRight className="w-4 h-4 text-primary group-hover:text-white" />
            </div>
          </motion.div>
        ))}
        
        <button className="h-full min-h-[400px] border-4 border-dashed border-outline-variant/30 rounded-[32px] flex flex-col items-center justify-center p-8 group hover:border-primary/30 transition-all bg-surface/30">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-outline group-hover:text-primary group-hover:scale-110 transition-all shadow-sm mb-4">
            <UserCheck className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-primary">Onboard New Patient</h4>
          <p className="text-xs text-outline font-medium text-center mt-2 px-6">Secure entry for next admission cycle</p>
        </button>
      </div>
    </motion.div>
  );
}
