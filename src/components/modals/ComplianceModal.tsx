import React from 'react';
import { X, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplianceModal({ isOpen, onClose }: ComplianceModalProps) {
  const compliance = [
    {
      title: "HIPAA Compliance",
      icon: Shield,
      description: "Full compliance with Health Insurance Portability and Accountability Act (HIPAA). All patient data is encrypted end-to-end and securely stored with 256-bit encryption.",
      certifications: ["HIPAA Privacy Rule", "HIPAA Security Rule", "HIPAA Breach Notification Rule"]
    },
    {
      title: "Data Security",
      icon: Shield,
      description: "Enterprise-grade security protocols including multi-factor authentication, role-based access control, and comprehensive audit logs.",
      certifications: ["SOC 2 Type II Certified", "ISO 27001 Certified", "PCI DSS Compliant"]
    },
    {
      title: "Regulatory Standards",
      icon: Shield,
      description: "Adherence to international healthcare standards and regulations to ensure patient safety and data integrity.",
      certifications: ["FDA 21 CFR Part 11", "GDPR Compliant", "State Medical Board Approved"]
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
            className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur">
              <h2 className="text-2xl font-bold text-primary">Compliance & Security</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Intro */}
              <p className="text-base leading-relaxed text-on-surface-variant">
                Vitalix is committed to maintaining the highest standards of data protection, privacy, and regulatory compliance. All our systems and procedures are designed to ensure your medical information remains confidential and secure.
              </p>

              {/* Compliance Cards */}
              <div className="space-y-6">
                {compliance.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-surface-container rounded-xl border border-outline-variant p-6"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4">{item.description}</p>
                      <div className="space-y-2">
                        {item.certifications.map((cert, certIdx) => (
                          <div key={certIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span className="text-sm font-semibold text-on-surface">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="bg-secondary/10 rounded-xl border border-secondary/20 p-6">
                <h4 className="font-bold text-secondary mb-3">Privacy Policy & Terms</h4>
                <p className="text-sm text-on-surface-variant mb-4">
                  We are fully transparent about how we collect, use, and protect your data. For detailed information about our practices, please review our complete privacy policy and terms of service.
                </p>
                <div className="flex gap-3">
                  <button className="text-sm font-bold text-secondary hover:text-secondary/80 transition-colors">
                    Read Privacy Policy
                  </button>
                  <span className="text-on-surface-variant">•</span>
                  <button className="text-sm font-bold text-secondary hover:text-secondary/80 transition-colors">
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
