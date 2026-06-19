import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface Toast {
  type: 'success' | 'error';
  message: string;
}

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const copy = { ...prev }; delete copy[name]; return copy; });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required.';
    else if (formData.name.length < 2) tempErrors.name = 'Name must be at least 2 characters.';
    
    if (!formData.email.trim()) tempErrors.email = 'Email Address is required.';
    else if (!emailRegex.test(formData.email)) tempErrors.email = 'Please enter a valid email address.';
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    else if (formData.subject.length < 4) tempErrors.subject = 'Subject must be at least 4 characters.';

    if (!formData.message.trim()) tempErrors.message = 'Message is required.';
    else if (formData.message.length < 10) tempErrors.message = 'Message must be at least 10 characters.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setToast(null);
    try {
      const response = await axios.post(`${apiBaseUrl}/api/contact/`, formData, { 
        headers: { 'Content-Type': 'application/json' } 
      });
      if (response.status === 201) {
        setToast({ type: 'success', message: 'Message sent successfully! Pankaj will contact you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: unknown) {
      console.error(err);
      let errMsg = 'Something went wrong. Please try again later.';
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 429) {
            errMsg = 'Too many submissions. Please wait an hour before trying again.';
          } else if (err.response.data) {
            const data = err.response.data as Record<string, unknown>;
            const messages = Object.entries(data)
              .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
              .join(' | ');
            if (messages) errMsg = messages;
          }
        }
      }
      setToast({ type: 'error', message: errMsg });
    } finally {
      setIsLoading(false);
      setTimeout(() => { setToast(null); }, 5000);
    }
  };

  return (
    <section id="contact" className="relative pt-10 pb-2 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Toast Alert */}
      <div className="fixed top-24 left-4 right-4 sm:left-auto sm:right-6 z-50 flex flex-col gap-3 max-w-md w-auto sm:w-full">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`p-4 rounded-xl shadow-lg flex items-start gap-3 border ${
                toast.type === 'success' 
                  ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200' 
                  : 'bg-rose-950/90 border-rose-500/30 text-rose-200'
              }`}
            >
              {toast.type === 'success' 
                ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              <div className="flex-1 text-xs font-semibold leading-snug">{toast.message}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Soft Glow */}
      <div className="absolute top-[30%] right-10 w-[200px] h-[200px] bg-primaryBlue/5 rounded-full filter blur-[90px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Get in Touch</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Contact Me
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            I'm always open to discussing internships, placements, open-source projects, and technical collaborations.
          </p>
        </div>

        {/* Outer Card Compartment */}
        <div className="rounded-3xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 p-5 sm:p-8 flex flex-col gap-8 shadow-sm">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-themeBorder focus:border-primaryBlue/50'
                  }`} 
                  placeholder="John Doe" 
                  disabled={isLoading} 
                />
                {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-themeBorder focus:border-primaryBlue/50'
                  }`} 
                  placeholder="john@example.com" 
                  disabled={isLoading} 
                />
                {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.subject 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-themeBorder focus:border-primaryBlue/50'
                }`} 
                placeholder="Inquiry / Internship / Project Collaboration" 
                disabled={isLoading} 
              />
              {errors.subject && <span className="text-[10px] text-red-500 font-semibold">{errors.subject}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange} 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none resize-none transition-colors ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-themeBorder focus:border-primaryBlue/50'
                }`} 
                placeholder="Detail your requirements..." 
                disabled={isLoading} 
              />
              {errors.message && <span className="text-[10px] text-red-500 font-semibold">{errors.message}</span>}
            </div>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full sm:w-auto flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-zinc-100 text-white dark:text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 size={13} className="animate-spin" />Sending...</>
                ) : (
                  <><Send size={13} />Send Message</>
                )}
              </motion.button>

              <a
                href={`${apiBaseUrl}/api/contact/resume/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <FileText size={13} />
                <span>Download Resume</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
