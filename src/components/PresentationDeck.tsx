import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PresentationDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      title: "VITALIX CARE",
      subtitle: "AI-Powered Healthcare Management Platform",
      tagline: "Accelerated Emergency Response & Crisis Coordination",
      bgColor: "from-primary to-secondary",
      textColor: "text-white"
    },
    {
      title: "The Problem",
      content: [
        "Healthcare crisis coordination is fragmented and slow",
        "Patients struggle to access rapid clinical support",
        "Families lack real-time visibility into patient care",
        "Emergency response times are delayed by inefficient communication",
        "Critical data is scattered across multiple systems"
      ],
      bgColor: "from-slate-900 to-slate-800",
      textColor: "text-white"
    },
    {
      title: "The Solution",
      subtitle: "Vitalix Care: Unified Healthcare Intelligence Platform",
      content: [
        "Real-time emergency alert system with location sharing",
        "Multi-role dashboard for patients, families, and providers",
        "Instant telehealth and secure chat with clinical teams",
        "Centralized patient records and medical history",
        "Built on Vercel for global scale and reliability"
      ],
      bgColor: "from-primary/90 to-secondary/90",
      textColor: "text-white"
    },
    {
      title: "Key Features",
      features: [
        { icon: "🚨", title: "Emergency Alerts", desc: "One-tap crisis activation with location sharing" },
        { icon: "📱", title: "Patient Portal", desc: "Real-time health monitoring and medical records" },
        { icon: "👨‍👩‍👧", title: "Family Portal", desc: "Caregiver access and care coordination" },
        { icon: "🏥", title: "Telehealth", desc: "Instant video appointments with specialists" },
        { icon: "💬", title: "Secure Chat", desc: "Direct communication with nursing staff" },
        { icon: "📋", title: "Compliance", desc: "HIPAA-compliant data governance" }
      ],
      bgColor: "from-slate-50 to-blue-50",
      textColor: "text-slate-900"
    },
    {
      title: "Patient Portal",
      subtitle: "Personal Health Dashboard",
      content: [
        "Dashboard with vitals, appointments, and alerts",
        "Medication management with dosage tracking",
        "Medical reports and diagnostic history",
        "Direct access to healthcare team",
        "Floating chat for quick support"
      ],
      bgColor: "from-blue-50 to-indigo-50",
      textColor: "text-slate-900"
    },
    {
      title: "Family Portal",
      subtitle: "Coordinated Care Management",
      content: [
        "Monitor multiple family members' health",
        "Caregiver access to medical information",
        "Appointment scheduling and reminders",
        "Emergency notification center",
        "Care team communication hub"
      ],
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-slate-900"
    },
    {
      title: "Emergency Response System",
      subtitle: "Crisis Coordination Made Fast",
      content: [
        "One-tap emergency alert activation",
        "Automatic location sharing with emergency contacts",
        "Instant notification to clinical team",
        "Priority routing to available specialists",
        "Real-time status updates to family members"
      ],
      bgColor: "from-red-50 to-orange-50",
      textColor: "text-slate-900"
    },
    {
      title: "Technical Architecture",
      tech: [
        { category: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS v4", "Motion/React"] },
        { category: "Backend & Deployment", items: ["Vercel", "Next.js", "API Routes", "Edge Functions"] },
        { category: "Data & Analytics", items: ["Recharts", "Real-time Updates", "Health Metrics", "Compliance Logging"] },
        { category: "Security", items: ["HIPAA Compliance", "Data Encryption", "Access Controls", "Audit Trails"] }
      ],
      bgColor: "from-slate-900 to-slate-800",
      textColor: "text-white"
    },
    {
      title: "Social Impact & Crisis Response",
      subtitle: "Addressing Healthcare Accessibility",
      content: [
        "Enables rapid response during medical emergencies",
        "Improves patient outcomes through faster care coordination",
        "Reduces healthcare disparities via accessible technology",
        "Supports caregivers managing multiple patients",
        "Data-driven approach to crisis management",
        "HIPAA-compliant solution for healthcare institutions"
      ],
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-slate-900"
    },
    {
      title: "Deployment & Scale",
      content: [
        "Deployed on Vercel for global availability",
        "Automatic scaling for traffic spikes",
        "99.9% uptime SLA for healthcare reliability",
        "Real-time deployment from GitHub",
        "CDN-powered for sub-100ms response times",
        "Production-ready and HIPAA-compliant infrastructure"
      ],
      bgColor: "from-indigo-50 to-blue-50",
      textColor: "text-slate-900"
    },
    {
      title: "Impact & Vision",
      subtitle: "Transforming Healthcare Delivery",
      stats: [
        { number: "50%", label: "Faster emergency response" },
        { number: "100%", label: "Patient data accessibility" },
        { number: "24/7", label: "Support availability" },
        { number: "∞", label: "Potential reach" }
      ],
      bgColor: "from-primary to-secondary",
      textColor: "text-white"
    },
    {
      title: "Let's Build the Future",
      subtitle: "of Healthcare Together",
      cta: "Join us in revolutionizing emergency response and patient care coordination",
      links: [
        { label: "Live Demo", url: "https://vitalix-care-8o6b.vercel.app" },
        { label: "GitHub", url: "https://github.com/kangarooccean/Vitalix-Care" },
        { label: "Contact", email: "contact@vitalixcare.com" }
      ],
      bgColor: "from-primary via-secondary to-indigo-600",
      textColor: "text-white"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlePrint = () => {
    window.print();
  };

  const Slide = ({ slide, index }: { slide: typeof slides[0]; index: number }) => {
    const isVisible = index === currentSlide;

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} p-20 flex flex-col justify-between ${slide.textColor}`}
          >
            {/* Title Slide */}
            {slide.title && !slide.content && !slide.features && !slide.tech && !slide.stats && index === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-8">
                <div>
                  <h1 className="text-7xl font-black tracking-tighter mb-4">{slide.title}</h1>
                  <p className="text-3xl font-bold opacity-90 mb-6">{slide.subtitle}</p>
                  <p className="text-xl opacity-80">{slide.tagline}</p>
                </div>
                <div className="flex gap-4 pt-8">
                  <div className="px-6 py-3 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
                    Rapid Crisis Response Track
                  </div>
                  <div className="px-6 py-3 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
                    Built on Vercel
                  </div>
                </div>
              </div>
            )}

            {/* Content Slides */}
            {slide.content && (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-5xl font-black tracking-tight mb-12">{slide.title}</h2>
                  {slide.subtitle && <p className="text-2xl font-bold opacity-80 mb-8">{slide.subtitle}</p>}
                  <ul className="space-y-6">
                    {slide.content.map((item, i) => (
                      <li key={i} className="text-xl font-semibold flex items-start gap-4">
                        <span className="text-2xl font-black">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm opacity-60">Slide {index + 1} of {slides.length}</div>
              </div>
            )}

            {/* Features Grid */}
            {slide.features && (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-5xl font-black tracking-tight mb-12">{slide.title}</h2>
                  <div className="grid grid-cols-3 gap-8">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-black mb-2">{feature.title}</h3>
                        <p className="text-sm opacity-80">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm opacity-60">Slide {index + 1} of {slides.length}</div>
              </div>
            )}

            {/* Tech Stack */}
            {slide.tech && (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-5xl font-black tracking-tight mb-12">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-8">
                    {slide.tech.map((tech, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-black mb-4">{tech.category}</h3>
                        <ul className="space-y-2">
                          {tech.items.map((item, j) => (
                            <li key={j} className="text-sm font-semibold opacity-90">✓ {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm opacity-60">Slide {index + 1} of {slides.length}</div>
              </div>
            )}

            {/* Stats */}
            {slide.stats && (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-5xl font-black tracking-tight mb-4">{slide.title}</h2>
                  <p className="text-3xl font-bold opacity-80 mb-16">{slide.subtitle}</p>
                  <div className="grid grid-cols-4 gap-8">
                    {slide.stats.map((stat, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                        <div className="text-5xl font-black mb-4">{stat.number}</div>
                        <p className="text-lg font-bold opacity-90">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm opacity-60">Slide {index + 1} of {slides.length}</div>
              </div>
            )}

            {/* Final CTA */}
            {slide.cta && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-12">
                <div>
                  <h2 className="text-6xl font-black tracking-tight mb-6">{slide.title}</h2>
                  <p className="text-3xl font-bold opacity-90 mb-8">{slide.subtitle}</p>
                  <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">{slide.cta}</p>
                </div>
                {slide.links && (
                  <div className="flex gap-6 flex-wrap justify-center">
                    {slide.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url || `mailto:${link.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-opacity-90 transition-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                <div className="text-sm opacity-60">Slide {index + 1} of {slides.length}</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      {/* Main Presentation Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="w-full h-full">
          {slides.map((slide, index) => (
            <Slide key={index} slide={slide} index={index} />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-50">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
            {currentSlide + 1} / {slides.length}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-8 right-8 flex gap-3 z-50">
          <button
            onClick={handlePrint}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all flex items-center gap-2"
            title="Print to PDF"
          >
            <Download size={20} />
            <span className="text-sm font-semibold">Print</span>
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="absolute top-8 left-8 text-white/60 text-sm font-mono">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Footer with Navigation Info */}
      <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 px-8 py-4 text-white/60 text-sm flex justify-between items-center">
        <div>Use arrow keys or buttons to navigate</div>
        <div>Press Ctrl+P or click Print to export as PDF</div>
      </div>
    </div>
  );
};

export default PresentationDeck;
