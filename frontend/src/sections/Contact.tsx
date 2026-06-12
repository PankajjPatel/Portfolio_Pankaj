import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Loader2, CheckCircle2, AlertCircle, Twitter, Phone } from 'lucide-react';

interface Toast {
  type: 'success' | 'error';
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiBaseUrl}/api/contact/`, formData, { headers: { 'Content-Type': 'application/json' } });
      if (response.status === 201) {
        setToast({ type: 'success', message: 'Message sent successfully! Pankaj will contact you soon.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Something went wrong. Please try again later.';
      if (err.response) {
        if (err.response.status === 429) errMsg = 'Too many submissions. Please wait an hour before trying again.';
        else if (err.response.data) {
          const data = err.response.data;
          const messages = Object.entries(data).map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`).join(' | ');
          if (messages) errMsg = messages;
        }
      }
      setToast({ type: 'error', message: errMsg });
    } finally {
      setIsLoading(false);
      setTimeout(() => { setToast(null); }, 5000);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-themeBg border-t border-themeBorder select-none">
      <div className="fixed top-24 left-4 right-4 sm:left-auto sm:right-6 z-50 flex flex-col gap-3 max-w-md w-auto sm:w-full">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`p-4 rounded-lg shadow-lg flex items-start gap-3 border ${
                toast.type === 'success' 
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-200' 
                  : 'bg-rose-950/80 border-rose-500/30 text-rose-200'
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent-gradient" />
              <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Contact</span>
            </div>
            <h2 className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
              Let's Connect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light text-base leading-relaxed">
              I'm always open to discussing internships, collaborations, freelance work, and technical projects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 mt-4 w-full">
              {/* Mail Card */}
              <a href="mailto:Pankajlucky678@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/40 hover:bg-themePanel transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                  <Mail size={18} className="text-primaryBlue" />
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Email</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">Pankajlucky678@gmail.com</span>
                </div>
              </a>

              {/* Phone Card */}
              <a href="tel:+919754789747" className="flex items-center gap-4 p-4 rounded-2xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/40 hover:bg-themePanel transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                  <Phone size={18} className="text-primaryBlue" />
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Phone / WhatsApp</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">+91 97547 89747</span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a href="https://linkedin.com/in/pankajpatel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/40 hover:bg-themePanel transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                  <Linkedin size={18} className="text-primaryBlue" />
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">LinkedIn</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">pankajpatel-dev</span>
                </div>
              </a>

              {/* GitHub Card */}
              <a href="https://github.com/PankajjPatel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/40 hover:bg-themePanel transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                  <Github size={18} className="text-primaryBlue" />
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">GitHub</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">PankajjPatel</span>
                </div>
              </a>

              {/* Twitter Card */}
              <a href="https://x.com/Pankajpatel536" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/40 hover:bg-themePanel transition-colors group">
                <span className="w-10 h-10 rounded-lg bg-slate-200/50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                  <Twitter size={18} className="text-primaryBlue" />
                </span>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Twitter (X)</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">@Pankajpatel536</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-themeBorder bg-themePanel/80 shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className={`w-full px-3.5 py-3 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-themeBorder focus:border-primaryBlue/50'
                    }`} 
                    placeholder="John Doe" 
                    disabled={isLoading} 
                  />
                  {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`w-full px-3.5 py-3 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-themeBorder focus:border-primaryBlue/50'
                    }`} 
                    placeholder="john@example.com" 
                    disabled={isLoading} 
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email}</span>}
                </div>
              </div>

              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange} 
                  className={`w-full px-3.5 py-3 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none resize-none transition-colors ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-themeBorder focus:border-primaryBlue/50'
                  }`} 
                  placeholder="Detail your requirements..." 
                  disabled={isLoading} 
                />
                {errors.message && <span className="text-[10px] text-red-500 font-bold">{errors.message}</span>}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="flex-1 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-blue-600/10" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 size={14} className="animate-spin" />Sending...</>
                  ) : (
                    <><Send size={14} />Send Message</>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
