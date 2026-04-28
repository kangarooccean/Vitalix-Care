import { useState } from 'react';
import Sidebar from '../admin/AdminSidebar';
import Header from '../admin/AdminHeader';
import PhysicianSchedule from './PhysicianSchedule';
import PatientClinicalFile from './PatientClinicalFile';
import StatCard from '../admin/StatCard';
import MedicalReports from '../admin/MedicalReports';
import AdminSettings from '../admin/AdminSettings';
import PatientRecords from '../admin/PatientRecords';
import StaffDirectory from '../admin/StaffDirectory';
import HospitalOperations from '../admin/HospitalOperations';
import Analytics from '../Analytics';
import { Users, Droplets, Activity, FileText, Construction } from 'lucide-react';

interface PhysicianDashboardProps {
  onLogout?: () => void;
  onHome?: () => void;
}

export default function PhysicianDashboard({ onLogout, onHome }: PhysicianDashboardProps) {
  const [currentView, setCurrentView] = useState('appointments');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const renderContent = () => {
    switch (currentView) {
      case 'patients':
        return <PatientRecords />;
      case 'reports':
        return <MedicalReports />;
      case 'analytics':
        return <Analytics />;
      case 'operations':
        return <HospitalOperations />;
      case 'directory':
        return <StaffDirectory />;
      case 'settings':
        return <AdminSettings />;
      case 'appointments':
      case 'admin-dashboard': // Fallback for the first link in sidebar
        return (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[600px]">
            {/* Left: Schedule */}
            <div className="lg:col-span-5 xl:col-span-4">
              <PhysicianSchedule onSelectPatient={setSelectedPatient} />
            </div>

            {/* Right: Detailed Patient Info */}
            <div className="lg:col-span-7 xl:col-span-8">
              <PatientClinicalFile patient={selectedPatient} />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <Construction className="w-12 h-12 text-slate-300" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary">Module Restricted</h2>
              <p className="text-sm">This section is being validated for clinical security.</p>
            </div>
            <button 
              onClick={() => setCurrentView('appointments')}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold active:scale-95 transition-all"
            >
              Return to Schedule
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10">
      <Sidebar 
        onLogout={onLogout} 
        onHome={onHome}
        currentView={currentView === 'appointments' ? 'admin-dashboard' : currentView} 
        onViewChange={(view) => setCurrentView(view === 'admin-dashboard' ? 'appointments' : view)} 
      />
      
      <main className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        <div className="p-8 max-w-[1440px] w-full mx-auto flex-1 flex flex-col">
          {/* Header Stats for Physician */}
          {currentView === 'appointments' || currentView === 'admin-dashboard' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                label="Today's Patients" 
                value="12" 
                icon={Users} 
                trend="3 Remain" 
                trendType="alert"
                progress={75}
                progressColor="bg-primary"
              />
              <StatCard 
                label="Critical Alerts" 
                value="2" 
                icon={Activity} 
                trend="Requires Action" 
                trendType="down"
                progress={100}
                progressColor="bg-error"
              />
              <StatCard 
                label="Lab Results" 
                value="8" 
                icon={Droplets} 
                trend="4 Pending" 
                trendType="stable"
                progress={50}
                progressColor="bg-secondary"
              />
              <StatCard 
                label="Clinical Notes" 
                value="15" 
                icon={FileText} 
                trend="All Synced" 
                trendType="up"
                progress={100}
                progressColor="bg-blue-500"
              />
            </div>
          ) : null}

          {renderContent()}
          
          <footer className="mt-8 py-6 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Vitalix Medical Systems</span>
            <div className="flex gap-6">
              <span className="text-secondary">Physician Node: SEA-082</span>
              <span>Encrypted via AES-256</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
