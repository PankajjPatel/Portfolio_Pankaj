import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText, ArrowRight } from 'lucide-react';


const roles = ["Full Stack Developer", "Python Developer", "Django Developer"];
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate roles continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center py-8 relative">
      {/* Background Soft Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-primaryBlue/5 dark:bg-primaryBlue/8 blur-[120px] pointer-events-none -z-10" />

      {/* Main Developer Profile Card */}
      <div className="w-full max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-[2rem] border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 backdrop-blur-md p-6 sm:p-10 shadow-lg"
        >
          {/* Top Status & Education Badges Row */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Python Intern @ Infotact Solutions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              B.Tech CSE Student @ CDGI
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar container */}
            <div className="relative w-24 h-28 rounded-2xl border border-themeBorderHeavy p-0.5 shrink-0 bg-themeBg overflow-hidden shadow-md">
              <img
                src="/avatar.png"
                alt="Pankaj Patel"
                className="w-full h-full rounded-xl object-cover"
                onError={(e) => {
                  // Fallback to jpg if png not present
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('avatar.jpg')) {
                    target.src = '/avatar.jpg';
                  }
                }}
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-kanit text-slate-900 dark:text-white">
                Pankaj Patel
              </h1>
              
              {/* Repeating role switcher */}
              <div className="h-6 overflow-hidden mt-1 text-sm font-semibold text-primaryBlue">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {roles[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Full Stack Developer with expertise in Python, Django, MySQL, REST APIs, responsive design, and AI-assisted tools. Seeking opportunity to deliver quality solutions in collaborative environments.
          </p>

          {/* Action buttons & Social Shortcuts Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-themeBorder">
            {/* Primary Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <a
                href={`${apiBaseUrl}/api/contact/resume/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                <FileText size={13} />
                <span>Resume</span>
              </a>

              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-themeBorder bg-themePanel hover:bg-themePanelHeavy text-slate-700 dark:text-slate-300 font-semibold text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/PankajjPatel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com/in/pankajpatel-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://x.com/Pankajpatel536"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Twitter (X)"
              >
                <Twitter size={15} />
              </a>
              <a
                href="mailto:pankajlucky678@gmail.com"
                className="w-8 h-8 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
