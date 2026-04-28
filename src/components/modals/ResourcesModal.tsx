import React from 'react';
import { X, Building2, MapPin, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HospitalCard = ({ name, address, phone, hours }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-primary/10 rounded-lg">
        <Building2 className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-primary mb-1">{name}</h3>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-on-surface-variant">{address}</p>
      </div>
      <div className="flex items-center gap-3">
        <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
        <p className="text-sm font-semibold text-primary">{phone}</p>
      </div>
      <div className="flex items-start gap-3">
        <Clock className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-on-surface-variant">{hours}</p>
      </div>
    </div>
  </motion.div>
);

export default function ResourcesModal({ isOpen, onClose }: ResourcesModalProps) {
  const hospitals = [
    {
      name: "Memorial Medical Center",
      address: "1500 Main Street, Downtown Medical District",
      phone: "+1-800-VITALIX",
      hours: "24/7 Emergency • Mon-Fri 8AM-6PM Regular Hours"
    },
    {
      name: "St. Claire Clinical Hospital",
      address: "2800 Healthcare Boulevard, Suite 200",
      phone: "+1-888-CLINICAL",
      hours: "24/7 Emergency • Mon-Sun 9AM-5PM Outpatient"
    },
    {
      name: "Research Institute Advanced Care",
      address: "500 Innovation Drive, Medical Park",
      phone: "+1-844-RESEARCH",
      hours: "Mon-Fri 8AM-5PM • Specialized Services Available"
    }
  ];

  const resources = [
    {
      title: "Medical Library",
      description: "Access comprehensive medical articles, research papers, and clinical guidelines"
    },
    {
      title: "Medication Database",
      description: "Search drug interactions, side effects, and dosage information"
    },
    {
      title: "Telehealth Services",
      description: "Connect with licensed physicians for remote consultations"
    },
    {
      title: "Health Tips & Articles",
      description: "Stay informed with evidence-based health and wellness content"
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
              <h2 className="text-2xl font-bold text-primary">Medical Resources</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-12">
              {/* Hospital Directory */}
              <section>
                <h3 className="text-lg font-bold text-primary mb-4">Hospital Directory</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hospitals.map((hospital, idx) => (
                    <HospitalCard key={idx} {...hospital} />
                  ))}
                </div>
              </section>

              {/* Additional Resources */}
              <section>
                <h3 className="text-lg font-bold text-primary mb-4">Available Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-left p-4 rounded-lg border border-outline-variant hover:bg-surface-container hover:border-primary transition-all group"
                    >
                      <h4 className="font-bold text-primary group-hover:text-secondary mb-1">{resource.title}</h4>
                      <p className="text-sm text-on-surface-variant">{resource.description}</p>
                    </motion.button>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
