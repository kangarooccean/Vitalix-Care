import React from 'react';
import { X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';

  const termsContent = [
    {
      heading: 'Acceptance of Terms',
      content: 'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      heading: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Vitalix Care for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on Vitalix Care.'
    },
    {
      heading: 'Disclaimer',
      content: 'The materials on Vitalix Care are provided on an "as is" basis. Vitalix Care makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
    },
    {
      heading: 'Limitations',
      content: 'In no event shall Vitalix Care or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vitalix Care.'
    }
  ];

  const privacyContent = [
    {
      heading: 'Information Collection',
      content: 'We collect information you provide directly to us, such as when you create an account, complete your medical profile, or contact us for support. This may include your name, email, phone number, medical history, and vital sign data.'
    },
    {
      heading: 'Information Use',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you service-related announcements, and respond to your requests. Your medical information is used exclusively for your clinical care and improving our medical AI algorithms.'
    },
    {
      heading: 'Data Protection',
      content: 'We implement appropriate technical and organizational measures designed to protect your personal information against accidental or unlawful destruction, alteration, disclosure, or access. All data is encrypted both in transit and at rest using industry-standard encryption protocols.'
    },
    {
      heading: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information at any time. You may also opt-out of certain marketing communications. For any privacy-related requests, please contact our Privacy Officer at privacy@vitalix.health.'
    }
  ];

  const content = isTerms ? termsContent : privacyContent;

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
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
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
              <p className="text-on-surface-variant leading-relaxed">
                Last Updated: January 1, 2026
              </p>

              {content.map((section, idx) => (
                <motion.section
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="space-y-3"
                >
                  <h3 className="text-lg font-bold text-primary">{section.heading}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    {section.content}
                  </p>
                </motion.section>
              ))}

              <div className="bg-surface-container rounded-xl border border-outline-variant p-6 mt-8">
                <h4 className="font-bold text-primary mb-3">Questions About This Policy?</h4>
                <p className="text-sm text-on-surface-variant mb-4">
                  If you have any questions about our {isTerms ? 'Terms of Service' : 'Privacy Policy'}, please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-on-surface-variant">
                    <span className="font-semibold">Email:</span> legal@vitalix.health
                  </p>
                  <p className="text-on-surface-variant">
                    <span className="font-semibold">Phone:</span> +1-800-VITALIX
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
