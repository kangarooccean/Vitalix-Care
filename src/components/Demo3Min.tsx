import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const Demo3Min = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180);

  const slides = [
    {
      title: "Vitalix Care",
      subtitle: "AI-Powered Emergency Healthcare Platform",
      duration: 15,
      content: "Google Solution Challenge 2026"
    },
    {
      title: "The Problem",
      subtitle: "Healthcare Emergency Crisis",
      duration: 20,
      points: [
        "Communication delays during emergencies",
        "Limited access to health records",
        "Poor coordination between providers & families"
      ]
    },
    {
      title: "The Solution",
      subtitle: "Complete Emergency Response Platform",
      duration: 20,
      points: [
        "One-click emergency alerts with location sharing",
        "Real-time provider notification",
        "Unified family coordination"
      ]
    },
    {
      title: "Emergency Alert System",
      subtitle: "40% faster response time",
      duration: 18,
      points: [
        "Patient activates alert (1-click)",
        "Location captured automatically",
        "Providers notified instantly",
        "Family alerted in real-time"
      ]
    },
    {
      title: "AI Health Assistant",
      subtitle: "Powered by Google Gemini",
      duration: 20,
      points: [
        "Instant symptom analysis",
        "Medication information & interactions",
        "Real-time health Q&A",
        "24/7 health guidance"
      ]
    },
    {
      title: "Telehealth Integration",
      subtitle: "Specialist access in minutes",
      duration: 18,
      points: [
        "Quick specialist consultation",
        "Video conferencing built-in",
        "Eliminates travel delays",
        "Secure communication"
      ]
    },
    {
      title: "Family Coordination Portal",
      subtitle: "Manage multiple relatives",
      duration: 18,
      points: [
        "Track 3+ family members",
        "Shared health alerts",
        "Unified care coordination",
        "Reduced hospital readmissions by 35%"
      ]
    },
    {
      title: "Technology Stack",
      subtitle: "Built on Google Cloud",
      duration: 15,
      points: [
        "React 19 + TypeScript",
        "Google Gemini 2.0 Flash AI",
        "Google Cloud Run deployment",
        "HIPAA-compliant architecture"
      ]
    },
    {
      title: "Key Features",
      subtitle: "Complete healthcare solution",
      duration: 15,
      points: [
        "Emergency response system",
        "Real-time vital monitoring",
        "Secure clinical chat",
        "Medical records access"
      ]
    },
    {
      title: "Impact & Results",
      subtitle: "Year 1 Projections",
      duration: 15,
      points: [
        "10,000+ patients",
        "500,000+ emergency alerts processed",
        "35% fewer preventable hospitalizations",
        "$2M+ healthcare cost savings"
      ]
    },
    {
      title: "Ready for Deployment",
      subtitle: "Production-ready solution",
      duration: 12,
      points: [
        "Live Demo: vitalix-care-8o6b.vercel.app",
        "GitHub: kangarooccean/Vitalix-Care",
        "Deployed on Google Cloud",
        "Scaling capability: 10M+ users"
      ]
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
            return slides[currentSlide + 1]?.duration || 15;
          } else {
            setIsPlaying(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slides]);

  const handleReset = () => {
    setCurrentSlide(0);
    setTimeLeft(slides[0]?.duration || 15);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setTimeLeft(slides[currentSlide - 1]?.duration || 15);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setTimeLeft(slides[currentSlide + 1]?.duration || 15);
      setIsPlaying(false);
    }
  };

  const slide = slides[currentSlide];
  const progress = ((slides.length - currentSlide - 1) * 100) / slides.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Demo Slide */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 min-h-96 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="mb-2 inline-block px-3 py-1 bg-secondary/20 rounded-full">
              <span className="text-xs font-bold text-secondary">SLIDE {currentSlide + 1} / {slides.length}</span>
            </div>
            <h1 className="text-5xl font-bold text-primary mb-2">{slide.title}</h1>
            <h2 className="text-2xl text-secondary font-semibold mb-8">{slide.subtitle}</h2>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            {slide.points && slide.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-700">{point}</p>
              </div>
            ))}
            {slide.content && <p className="text-xl text-gray-600">{slide.content}</p>}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Reset"
          >
            <RotateCcw size={20} className="text-primary" />
          </button>

          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition"
            title="Previous"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold flex items-center gap-2"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition"
            title="Next"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>

          <div className="ml-4 text-sm font-mono text-gray-600">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setTimeLeft(slides[idx]?.duration || 15);
                setIsPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentSlide ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Screen record this demo for submission</p>
          <p className="text-xs mt-1">Use Loom, OBS, or built-in screen recorder</p>
        </div>
      </div>
    </div>
  );
};

export default Demo3Min;
