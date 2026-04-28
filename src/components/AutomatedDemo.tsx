import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';

export default function AutomatedDemo() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      title: 'Vitalix Care - Emergency Healthcare Platform',
      description: 'AI-Powered Real-Time Crisis Response',
      content: 'One-Click Emergency Alerts | AI Health Assistant | Telehealth | Family Coordination',
      color: 'from-indigo-600 to-blue-600',
      icon: '🏥'
    },
    {
      title: 'Emergency Alert System',
      description: 'Activate in One Click',
      content: 'Location Sharing • Instant Provider Notification • Family Alerts • Real-time Response',
      color: 'from-red-500 to-orange-500',
      icon: '🚨'
    },
    {
      title: 'Patient Dashboard',
      description: 'Real-Time Health Monitoring',
      content: 'Vital Signs • Medical Records • Appointments • Medications • Health History',
      color: 'from-blue-500 to-cyan-500',
      icon: '📊'
    },
    {
      title: 'Google Gemini AI Assistant',
      description: 'Intelligent Health Guidance',
      content: 'Symptom Analysis • Medication Info • Health Q&A • Wellness Recommendations',
      color: 'from-purple-500 to-pink-500',
      icon: '🤖'
    },
    {
      title: 'Telehealth Integration',
      description: 'Video Consultations with Specialists',
      content: 'Quick Scheduling • Real-time Video • Secure Communication • Medical Records Sharing',
      color: 'from-green-500 to-emerald-500',
      icon: '📹'
    },
    {
      title: 'Secure Clinical Chat',
      description: 'Direct Access to Nursing Staff',
      content: 'Real-time Messaging • HIPAA Compliant • Instant Responses • Medical Guidance',
      color: 'from-cyan-500 to-blue-500',
      icon: '💬'
    },
    {
      title: 'Family Caregiver Portal',
      description: 'Unified Care Coordination',
      content: 'Multi-Member Management • Shared Alerts • Appointment Coordination • Health Tracking',
      color: 'from-pink-500 to-rose-500',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Resources & Compliance',
      description: 'Hospital Directory • Health Resources',
      content: 'HIPAA Compliant • Secure Data Storage • Encryption • Privacy Protection',
      color: 'from-orange-500 to-amber-500',
      icon: '📚'
    },
    {
      title: 'Technology Stack',
      description: 'Built on Modern Cloud Infrastructure',
      content: 'React • TypeScript • Google Cloud Run • Gemini AI • Vercel Deployment',
      color: 'from-slate-600 to-slate-800',
      icon: '⚙️'
    },
    {
      title: 'Live Deployment',
      description: 'Production Ready',
      content: 'https://vitalix-care-8o6b.vercel.app • GitHub: kangarooccean/Vitalix-Care',
      color: 'from-indigo-600 to-purple-600',
      icon: '🚀'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const current = steps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Demo Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${current.color} rounded-2xl p-12 text-white shadow-2xl mb-8 min-h-96 flex flex-col justify-center items-center text-center`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-7xl mb-6"
            >
              {current.icon}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold mb-4"
            >
              {current.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold mb-6 text-white/90"
            >
              {current.description}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/80 max-w-2xl leading-relaxed"
            >
              {current.content}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={() => setStep(0)}
            className="bg-slate-600 hover:bg-slate-700 text-white p-4 rounded-full shadow-lg transition-all"
          >
            <RotateCcw size={24} />
          </button>

          <a
            href="https://vitalix-care-8o6b.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-lg transition-all font-semibold flex items-center gap-2"
          >
            <Download size={20} />
            Try Live App
          </a>
        </div>

        {/* Step Counter */}
        <div className="text-center text-slate-400 text-lg">
          Step {step + 1} of {steps.length}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setStep(index);
                setIsPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === step ? 'bg-indigo-500 w-8' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
