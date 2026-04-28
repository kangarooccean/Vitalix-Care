import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import PatientSidebar from './dashboard/patient/PatientSidebar';
import TopBar from './dashboard/patient/TopBar';
import WelcomeBanner from './dashboard/patient/WelcomeBanner';
import QuickAccessGrid from './dashboard/patient/QuickAccessGrid';
import AlertsSection from './dashboard/patient/AlertsSection';
import HealthSummary from './HealthSummary';
import Appointments from './Appointments';
import Reports from './Reports';
import Settings from './Settings';
import Billing from './Billing';
import Medications from './Medications';
import Access from './Access';
import HelpSupport from './HelpSupport';
import ChatModal from './modals/ChatModal';
import { User } from '../types';

interface PatientPortalProps {
  user: User | null;
  activeView: string;
  onViewChange: (view: any) => void;
  onLogout?: () => void;
  onHome?: () => void;
}

export default function PatientPortal({ user, activeView, onViewChange, onLogout, onHome }: PatientPortalProps) {
  const [showChatModal, setShowChatModal] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <WelcomeBanner />
            <QuickAccessGrid onViewChange={onViewChange} />
            <AlertsSection />
          </>
        );
      case 'summary':
        return <HealthSummary user={user} />;
      case 'appointments':
        return <Appointments />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings onLogout={onLogout} />;
      case 'billing':
        return <Billing role="patient" />;
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
      <PatientSidebar 
        activeTab={activeView} 
        onTabChange={onViewChange} 
        onLogout={onLogout} 
        onHome={onHome} 
      />
      
      <main className="flex-1 ml-64 min-h-screen relative">
        <TopBar />
        
        <div className="p-8 max-w-[1440px] mx-auto">
          {renderContent()}
        </div>

        {/* Floating Chat FAB */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChatModal(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <MessageSquare className="w-6 h-6 relative z-10" />
        </motion.button>
      </main>

      {/* Chat Modal */}
      <ChatModal isOpen={showChatModal} onClose={() => setShowChatModal(false)} />
    </div>
  );
}


