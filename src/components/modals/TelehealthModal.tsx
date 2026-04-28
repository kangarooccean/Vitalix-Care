import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TelehealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TelehealthModal({ isOpen, onClose }: TelehealthModalProps) {
  const [step, setStep] = useState<'select' | 'form' | 'confirm'>('select');
  const [formData, setFormData] = useState({
    reason: '',
    date: '',
    time: '',
    notes: ''
  });

  const availableReasons = [
    { id: 'consultation', label: 'General Consultation', icon: '👨‍⚕️' },
    { id: 'followup', label: 'Follow-up Visit', icon: '📋' },
    { id: 'prescription', label: 'Prescription Refill', icon: '💊' },
    { id: 'results', label: 'Test Results Review', icon: '📊' }
  ];

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Telehealth appointment scheduled:', formData);
    setStep('confirm');
  };

  const handleConfirm = () => {
    alert('Telehealth appointment scheduled successfully! You will receive a confirmation email shortly.');
    onClose();
    // Reset
    setStep('select');
    setFormData({ reason: '', date: '', time: '', notes: '' });
  };

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
            className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-bold text-primary">Start Telehealth Call</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {step === 'select' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="text-on-surface-variant">
                    What is the reason for your telehealth consultation today?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableReasons.map((reason) => (
                      <motion.button
                        key={reason.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          setFormData({ ...formData, reason: reason.id });
                          setStep('form');
                        }}
                        className="p-6 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-surface-container transition-all text-left"
                      >
                        <span className="text-3xl mb-3 block">{reason.icon}</span>
                        <p className="font-bold text-primary">{reason.label}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'form' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setStep('select')}
                    className="text-sm text-secondary hover:text-secondary/80 mb-4"
                  >
                    ← Back to reason selection
                  </button>

                  <form onSubmit={handleSchedule} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Preferred Time
                      </label>
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="Any specific symptoms or concerns you'd like to discuss?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar size={18} />
                      Schedule Appointment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'confirm' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ scale: [0.8, 1.1, 1] }}
                      className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center"
                    >
                      <Video className="w-8 h-8 text-secondary" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Appointment Confirmed!</h3>
                    <p className="text-on-surface-variant">
                      Your telehealth appointment has been scheduled. A confirmation link and call details will be sent to your email.
                    </p>
                  </div>

                  <div className="bg-surface-container rounded-xl p-4 space-y-2 text-left">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-on-surface-variant">Date & Time</p>
                        <p className="font-bold text-primary">{formData.date} at {formData.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-on-surface-variant">
                      Join 5-10 minutes early. Make sure you have a stable internet connection and proper lighting.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
