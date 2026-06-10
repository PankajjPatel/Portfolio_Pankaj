import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Toast {
  type: 'success' | 'error';
  message: string;
}

export const Contact: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Validation & Loading States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      tempErrors.name = 'Full Name is required.';
    } else if (formData.name.length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setToast(null);

    try {
      // Connect to Django REST endpoint (relative URL or configured base domain)
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiBaseUrl}/api/contact/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setToast({
          type: 'success',
          message: 'Message sent successfully! Pankaj will contact you soon.',
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Something went wrong. Please try again later.';
      
      if (err.response) {
        if (err.response.status === 429) {
          errMsg = 'Too many submissions. Please wait an hour before trying again.';
        } else if (err.response.data) {
          // Join serializer validation messages if available
          const data = err.response.data;
          const messages = Object.entries(data)
            .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
            .join(' | ');
          if (messages) errMsg = messages;
        }
      }
      
      setToast({
        type: 'error',
        message: errMsg,
      });
    } finally {
      setIsLoading(false);
      // Auto-hide toast after 5s
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Background Decorative glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accentOrange/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accentViolet/5 rounded-full filter blur-[100px] pointer-events-none -z-10 animate-pulse" />

      {/* Slide-in Toast Notifications */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 max-w-md w-full">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`p-4 rounded-2xl shadow-2xl flex items-start gap-3 border ${
                toast.type === 'success'
                  ? 'bg-green-950/80 border-green-500/30 text-green-200 backdrop-blur-md'
                  : 'bg-red-950/80 border-red-500/30 text-red-200 backdrop-blur-md'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-sm font-semibold tracking-wide leading-snug">
                {toast.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Content (Grid: 5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent-gradient" />
              <span className="text-xs font-bold uppercase tracking-widest text-accentOrange">Contact</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Let's Build Something Amazing
            </h2>
            
            <p className="text-gray-300 font-light text-base leading-relaxed">
              I'm always open to discussing projects, internships, freelance opportunities, collaborations, and innovative ideas. Feel free to shoot a message!
            </p>

            {/* Social Contact Details */}
            <div className="flex flex-col gap-4 mt-6">
              <a
                href="mailto:Pankajlucky678@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-accentViolet transition-colors duration-300 w-fit"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <Mail size={16} className="text-accentViolet" />
                </span>
                Pankajlucky678@gmail.com
              </a>

              <a
                href="https://linkedin.com/in/pankaj-patel-lucky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-accentViolet transition-colors duration-300 w-fit"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <Linkedin size={16} className="text-accentPurple" />
                </span>
                linkedin.com/in/pankaj-patel-lucky
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side Glass Form (Grid: 7/12) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.01] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-white/10 focus:border-accentViolet/50 focus:bg-white/[0.03]'
                    }`}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                  {errors.name && <span className="text-xs text-red-400 font-semibold">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-white/10 focus:border-accentViolet/50 focus:bg-white/[0.03]'
                    }`}
                    placeholder="john@example.com"
                    disabled={isLoading}
                  />
                  {errors.email && <span className="text-xs text-red-400 font-semibold">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    errors.subject
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-white/10 focus:border-accentViolet/50 focus:bg-white/[0.03]'
                  }`}
                  placeholder="Freelance Project Inquiry"
                  disabled={isLoading}
                />
                {errors.subject && <span className="text-xs text-red-400 font-semibold">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                    errors.message
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-white/10 focus:border-accentViolet/50 focus:bg-white/[0.03]'
                  }`}
                  placeholder="Tell me more about your requirements..."
                  disabled={isLoading}
                />
                {errors.message && <span className="text-xs text-red-400 font-semibold">{errors.message}</span>}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-accent-gradient text-white font-semibold text-sm shadow-glow-violet hover:shadow-glow-purple flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://github.com/Pankajlucky678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  View GitHub
                </motion.a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
