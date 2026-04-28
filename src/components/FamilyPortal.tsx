import React from 'react';
import FamilySidebar from './dashboard/family/FamilySidebar';
import FamilyHeader from './dashboard/family/FamilyHeader';
import FamilyOverview from './dashboard/family/FamilyOverview';
import HealthSummary from './HealthSummary';
import Appointments from './Appointments';
import Reports from './Reports';
import Settings from './Settings';
import Billing from './Billing';
import Medications from './Medications';
import Access from './Access';
import HelpSupport from './HelpSupport';
import { User } from '../types';

interface FamilyPortalProps {
  user: User | null;
  activeView: string;
  onViewChange: (view: any) => void;
  onLogout?: () => void;
  onHome?: () => void;
}

export default function FamilyPortal({ user, activeView, onViewChange, onLogout, onHome }: FamilyPortalProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <FamilyOverview onViewChange={onViewChange} />;
      case 'summary':
        return <HealthSummary user={user} />;
      case 'appointments':
        return <Appointments />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings onLogout={onLogout} />;
      case 'billing':
        return <Billing role="family" />;
      case 'medications':
        return <Medications />;
      case 'access':
        return <Access />;
      case 'help':
        return <HelpSupport />;
      default:
        return (
          <div className="p-20 text-center">
            <h3 className="text-2xl font-bold text-outline">Section Coming Soon</h3>
            <p className="text-secondary mt-2">Developing Clinical Modules...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <FamilySidebar 
        activeTab={activeView} 
        onTabChange={onViewChange} 
        onLogout={onLogout} 
        onHome={onHome} 
      />
      
      <main className="flex-1 ml-64 min-h-screen relative">
        <FamilyHeader />
        
        <div className="p-8 max-w-[1440px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
