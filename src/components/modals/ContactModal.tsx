import React, { useState } from 'react';
import { X, Mail, Phone, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Show success message (in real app, would send to backend)
    alert('Thank you for your message. Our team will contact you within 24 hours.');
    onClose();
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      info: "+1-800-VITALIX",
      hours: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "support@vitalix.health",
      hours: "Response within 2 hours"
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
              <h2 className="text-2xl font-bold text-primary">Contact Support</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactMethods.map((method, idx) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-surface-container rounded-xl border border-outline-variant p-6"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className="p-3 bg-secondary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary">{method.title}</h3>
                          <p className="text-sm text-on-surface-variant">{method.hours}</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-secondary ml-2">{method.info}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-primary mb-4">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
