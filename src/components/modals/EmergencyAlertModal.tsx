import React, { useState } from 'react';
import { X, AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyAlertModal({ isOpen, onClose }: EmergencyAlertModalProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateEmergency = () => {
    setIsActivating(true);
    console.log('[v0] Emergency alert activated');
    // Simulate API call
    setTimeout(() => {
      alert('EMERGENCY ALERT ACTIVATED\n\nEmergency contacts have been notified. Emergency services are being dispatched to your location.');
      setIsActivating(false);
      onClose();
    }, 2000);
  };

  const emergencyContacts = [
    {
      title: "Emergency Medical Response",
      number: "911",
      description: "Immediate emergency services"
    },
    {
      title: "Poison Control",
      number: "1-800-222-1222",
      description: "For poisoning emergencies"
    },
    {
      title: "National Suicide Prevention",
      number: "988",
      description: "Mental health crisis support"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-error"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b-2 border-error bg-error/10 backdrop-blur">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-error animate-pulse" />
                <h2 className="text-2xl font-bold text-error">EMERGENCY ALERT</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Warning Banner */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-error/10 border-2 border-error rounded-xl p-6"
              >
                <p className="text-center font-bold text-error text-lg">
                  This will immediately notify emergency services and designated contacts of your location and medical information.
                </p>
              </motion.div>

              {/* Emergency Action */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">Activate Emergency Protocol</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleActivateEmergency}
                  disabled={isActivating}
                  className="w-full py-6 bg-error text-white font-black rounded-xl text-lg hover:bg-error/90 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isActivating ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <AlertTriangle size={24} />
                      </motion.div>
                      <span>ACTIVATING...</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={24} />
                      <span>ACTIVATE EMERGENCY ALERT</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Emergency Contacts */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">Emergency Contacts</h3>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-surface-container rounded-xl border border-outline-variant p-4 flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-primary">{contact.title}</p>
                        <p className="text-sm text-on-surface-variant">{contact.description}</p>
                      </div>
                      <a
                        href={`tel:${contact.number}`}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-colors flex-shrink-0"
                      >
                        <Phone size={18} />
                        <span className="font-mono text-lg">{contact.number}</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-3">
                <h4 className="font-bold text-amber-900">What happens when you activate this alert:</h4>
                <ul className="space-y-2 text-sm text-amber-900/80">
                  <li className="flex items-start gap-2">
                    <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Your GPS location is shared with emergency responders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Your complete medical history and allergies are transmitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Designated emergency contacts are notified immediately</span>
                  </li>
                </ul>
              </div>

              {/* Cancel Note */}
              <p className="text-center text-xs text-on-surface-variant">
                Need help but it's not a life-threatening emergency? Use our Help & Support section instead.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
