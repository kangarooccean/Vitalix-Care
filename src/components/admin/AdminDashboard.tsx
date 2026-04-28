import { useState } from 'react';
import Sidebar from './AdminSidebar';
import Header from './AdminHeader';
import StatCard from './StatCard';
import DepartmentChart from './DepartmentChart';
import PendingApprovals from './PendingApprovals';
import RecentActivity from './RecentActivity';
import PatientRecords from './PatientRecords';
import AdminAppointments from './AdminAppointments';
import MedicalReports from './MedicalReports';
import StaffDirectory from './StaffDirectory';
import AdminSettings from './AdminSettings';
import HospitalOperations from './HospitalOperations';
import Analytics from '../Analytics';
import { Users, Bed, Activity, ClipboardCheck, Construction } from 'lucide-react';

interface AdminDashboardProps {
    onLogout?: () => void;
    onHome?: () => void;
}

export default function AdminDashboard({ onLogout, onHome }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState('admin-dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'patients':
        return <PatientRecords />;
      case 'appointments':
        return <AdminAppointments />;
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
      case 'admin-dashboard':
        return (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                label="Hospital Flow" 
                value="842" 
                icon={Users} 
                trend="+12%" 
                trendType="up"
                progress={70}
                progressColor="bg-primary"
                onClick={() => setCurrentView('patients')}
              />
              <StatCard 
                label="Bed Occupancy" 
                value="88%" 
                icon={Bed} 
                trend="HIGH" 
                trendType="alert"
                progress={88}
                progressColor="bg-secondary"
                onClick={() => setCurrentView('operations')}
              />
              <StatCard 
                label="System Health" 
                value="99.9" 
                icon={Activity} 
                trend="STABLE" 
                trendType="stable"
                progress={100}
                progressColor="bg-blue-500"
                onClick={() => setCurrentView('operations')}
              />
              <StatCard 
                label="Ops Efficiency" 
                value="94%" 
                icon={ClipboardCheck} 
                trend="+2%" 
                trendType="up"
                progress={94}
                progressColor="bg-primary"
                onClick={() => setCurrentView('directory')}
              />
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
              <DepartmentChart />
              <PendingApprovals />
            </div>

            {/* Audit Log */}
            <RecentActivity />
          </>
        );
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="p-4 bg-slate-50 rounded-full">
              <Construction className="w-12 h-12 text-slate-300" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary">Section Under Maintenance</h2>
              <p className="text-sm">The {currentView.replace('-', ' ')} module is being updated for clinical precision.</p>
            </div>
            <button 
              onClick={() => setCurrentView('admin-dashboard')}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold active:scale-95 transition-all"
            >
              Return to Dashboard
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
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      
      <main className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        <div className="p-8 max-w-[1440px] w-full mx-auto flex-1 flex flex-col">
          {renderContent()}
          
          <footer className="mt-auto py-6 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} MedCore Portal Systems</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">Compliance Log</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
