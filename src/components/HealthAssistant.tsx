import React, { useState } from 'react';
import { MessageSquare, Loader, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askHealthQuestion, analyzeHealthSymptoms } from '../services/gemini';

interface HealthAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HealthAssistant({ isOpen, onClose }: HealthAssistantProps) {
  const [mode, setMode] = useState<'question' | 'symptoms'>('question');
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskQuestion = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    setResponse('');
    
    try {
      const result = await askHealthQuestion(input);
      setResponse(result);
      setInput('');
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('[v0] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSymptom = () => {
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom)) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom('');
    }
  };

  const handleAnalyzeSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setLoading(true);
    setError('');
    setResponse('');
    
    try {
      const result = await analyzeHealthSymptoms(symptoms);
      setResponse(`${result.analysis}\n\nRecommendations:\n${result.recommendations.map(r => `- ${r}`).join('\n')}`);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      console.error('[v0] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setSymptoms([]);
    setCurrentSymptom('');
    setResponse('');
    setError('');
    setMode('question');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 text-white flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Health Assistant</h2>
                <p className="text-white/80 text-sm">Powered by Google Gemini</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Mode Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => { setMode('question'); handleReset(); }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                  mode === 'question'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Ask a Question
              </button>
              <button
                onClick={() => { setMode('symptoms'); handleReset(); }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                  mode === 'symptoms'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Analyze Symptoms
              </button>
            </div>

            {/* Question Mode */}
            {mode === 'question' && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-primary">Ask your health question</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="E.g., What are the symptoms of high blood pressure? How long do COVID-19 symptoms last?"
                  className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl resize-none focus:border-primary outline-none transition-colors"
                  disabled={loading}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={loading || !input.trim()}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Answer'
                  )}
                </button>
              </div>
            )}

            {/* Symptoms Mode */}
            {mode === 'symptoms' && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-primary">Add your symptoms</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom()}
                    placeholder="E.g., Fever, Cough, Headache"
                    className="flex-1 p-3 border-2 border-slate-200 rounded-xl focus:border-primary outline-none transition-colors"
                    disabled={loading}
                  />
                  <button
                    onClick={handleAddSymptom}
                    disabled={loading || !currentSymptom.trim()}
                    className="px-6 py-3 bg-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-300 disabled:opacity-50 transition-all"
                  >
                    Add
                  </button>
                </div>

                {/* Added Symptoms */}
                {symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                      >
                        {symptom}
                        <button
                          onClick={() => setSymptoms(symptoms.filter((_, i) => i !== idx))}
                          className="hover:text-primary/80"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleAnalyzeSymptoms}
                  disabled={loading || symptoms.length === 0}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Symptoms'
                  )}
                </button>
              </div>
            )}

            {/* Response */}
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-primary font-bold">
                  <CheckCircle className="w-5 h-5" />
                  AI Response
                </div>
                <div className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {response}
                </div>
                <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                  Disclaimer: This information is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for diagnosis and treatment.
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-error/10 border-2 border-error text-error p-4 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>{error}</div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
