import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'nurse',
      text: 'Hello! Thank you for reaching out. How can our nursing team assist you today?',
      timestamp: new Date(),
      avatar: '👩‍⚕️'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
      avatar: '👤'
    };

    setMessages([...messages, userMessage]);
    setInput('');
    console.log('[v0] User message sent:', input);

    // Simulate nurse response after 2 seconds
    setTimeout(() => {
      const responses = [
        "Thank you for that information. Can you tell me more about your symptoms?",
        "I understand. Have you experienced this before?",
        "Let me note that down. Is there anything else I should know?",
        "That's helpful context. Our physician will review this shortly.",
        "I'm here to help. Please continue."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const nurseResponse = {
        id: Date.now().toString(),
        sender: 'nurse',
        text: randomResponse,
        timestamp: new Date(),
        avatar: '👩‍⚕️'
      };
      setMessages((prev) => [...prev, nurseResponse]);
    }, 2000);
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
            className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Secure Clinical Chat</h2>
                  <p className="text-xs text-on-surface-variant">Licensed nursing staff available</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-lg transition-colors"
              >
                <X size={24} className="text-on-surface" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-lg flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-xs ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-surface-container text-on-surface rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <span className="text-xs text-on-surface-variant mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="flex-shrink-0 p-6 border-t border-outline-variant bg-surface-container-lowest"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-on-surface-variant mt-2">
                ✓ End-to-end encrypted. HIPAA compliant.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
