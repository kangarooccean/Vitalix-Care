import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PatientPortal from './components/PatientPortal';
import FamilyPortal from './components/FamilyPortal';
import FamilyRegistration from './components/FamilyRegistration';
import Reports from './components/Reports';
import Login from './components/Login';
import Appointments from './components/Appointments';
import Records from './components/Records';
import Settings from './components/Settings';
import Billing from './components/Billing';
import HealthSummary from './components/HealthSummary';
import Analytics from './components/Analytics';
import Access from './components/Access';
import Medications from './components/Medications';
import AdminDashboard from './components/admin/AdminDashboard';
import PhysicianDashboard from './components/dashboard/PhysicianDashboard';
import NurseDashboard from './components/dashboard/NurseDashboard';
import PresentationDeck from './components/PresentationDeck';

import Landing from './components/Landing';

type AppState = 'landing' | 'presentation' | 'auth' | 'family-registration' | 'dashboard' | 'records' | 'appointments' | 'reports' | 'settings' | 'billing' | 'summary' | 'analytics' | 'access' | 'medications';
type UserRole = 'staff' | 'family' | 'doctor' | 'patient' | 'admin';

export default function App() {
  const [view, setView] = useState<AppState>('landing');
  const [role, setRole] = useState<UserRole>('staff');

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('dashboard');
  };

  const user = { 
    id: '1', 
    name: role === 'doctor' ? 'Dr. Sharma' : role === 'staff' ? 'Nurse Sarah' : role === 'patient' ? 'Elena Rodriguez' : role === 'admin' ? 'Systems Admin' : 'Rodriguez Family', 
    email: role === 'doctor' ? 'sharma@vitalix.com' : role === 'staff' ? 'sarah.n@vitalix.com' : role === 'admin' ? 'admin@medcore.com' : 'elena.r@example.com', 
    role 
  };

  if (view === 'landing') {
    return (
      <Landing 
        onLoginClick={() => setView('auth')} 
        onRegisterClick={() => setView('family-registration')}
        onPresentationClick={() => setView('presentation')}
      />
    );
  }

  if (view === 'presentation') {
    return <PresentationDeck />;
  }

  if (view === 'auth') {
    return (
      <Login 
        onLogin={handleLogin} 
        onRegisterClick={() => setView('family-registration')}
        onBack={() => setView('landing')}
      />
    );
  }

  if (view === 'family-registration') {
    return (
      <FamilyRegistration 
        onBack={() => setView('auth')}
        onHome={() => setView('landing')}
        onSuccess={() => {
          setView('auth');
          // Optional: show a success toast or message
        }}
      />
    );
  }

  if (role === 'patient') {
    return (
      <PatientPortal 
        user={user as any} 
        activeView={view} 
        onViewChange={(v) => setView(v as AppState)}
        onLogout={() => setView('auth')}
        onHome={() => setView('landing')}
      />
    );
  }

  if (role === 'family') {
    return (
      <FamilyPortal 
        user={user as any} 
        activeView={view} 
        onViewChange={(v) => setView(v as AppState)}
        onLogout={() => setView('auth')}
        onHome={() => setView('landing')}
      />
    );
  }

  if (role === 'admin') {
    return (
      <AdminDashboard onLogout={() => setView('auth')} onHome={() => setView('landing')} />
    );
  }

  if (role === 'staff') {
    return (
      <NurseDashboard onLogout={() => setView('auth')} onHome={() => setView('landing')} />
    );
  }

  if (role === 'doctor') {
    return (
      <PhysicianDashboard onLogout={() => setView('auth')} onHome={() => setView('landing')} />
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar 
        activeTab={view} 
        onTabChange={(tab) => setView(tab as AppState)} 
        onLogout={() => setView('auth')}
        onHome={() => setView('landing')}
        userRole={role === 'doctor' ? 'doctor' : role}
      />
      <div className="flex flex-col">
        <Header 
          title={role === 'doctor' ? "Physician Portal" : role === 'staff' ? "Nursing Station" : "Family Connection"} 
          subtitle={role === 'doctor' ? "Lead Cardiologist • Ward 4B" : role === 'staff' ? "Senior Nurse • Ward 4B" : "Elena Rodriguez • VK-20941"}
        />
        <main className="pl-64 pb-20">
          {view === 'dashboard' && <Dashboard user={user as any} onNavigate={(v) => setView(v as AppState)} />}
          {view === 'reports' && <Reports />}
          {view === 'appointments' && <Appointments />}
          {view === 'records' && <Records />}
          {view === 'billing' && <Billing role={role} />}
          {view === 'summary' && <HealthSummary user={user as any} />}
          {view === 'analytics' && <Analytics />}
          {view === 'access' && <Access />}
          {view === 'medications' && <Medications />}
          {view === 'settings' && <Settings onLogout={() => setView('auth')} />}
          {view !== 'dashboard' && view !== 'reports' && view !== 'appointments' && view !== 'records' && view !== 'settings' && view !== 'billing' && view !== 'summary' && view !== 'analytics' && view !== 'access' && view !== 'medications' && (
            <div className="p-20 text-center">
              <h3 className="text-2xl font-bold text-outline">Section Coming Soon</h3>
              <p className="text-secondary mt-2">Developing Clinical Modules...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
