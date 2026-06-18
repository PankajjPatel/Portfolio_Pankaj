import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText, ArrowRight } from 'lucide-react';


const roles = ["Full Stack Developer", "Python Developer", "Django Developer"];

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
    const target = document.querySelector('#contact');
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 px-4 sm:px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-primaryBlue/5 dark:bg-primaryBlue/8 blur-[120px] pointer-events-none -z-10" />

      {/* Centered Card Container */}
      <div className="w-full max-w-2xl mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-[2rem] border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 backdrop-blur-md p-6 sm:p-10 shadow-lg"
        >
          {/* Header Row: Available Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Python Intern @ Infotact Solutions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              B.Tech CSE Student @ CDGI
            </span>
          </div>

          {/* Profile Core Info (Avatar, Name, Title) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            {/* Avatar Circle */}
            <div className="relative w-20 h-20 rounded-full border border-themeBorderHeavy p-0.5 shrink-0 bg-themeBg">
              <img
                src="/avatar.jpg"
                alt="Pankaj Patel Portrait"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://github.com/PankajjPatel.png';
                }}
              />
            </div>

            {/* Profile Titles */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                Pankaj Patel
              </h1>
              
              {/* Rotating Roles */}
              <div className="h-6 overflow-hidden relative flex items-center justify-center sm:justify-start mt-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roles[roleIndex]}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-xs sm:text-sm font-bold text-primaryBlue font-sans"
                  >
                    {roles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Brief Bio / Objective */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8 text-center sm:text-left">
            Full Stack Developer with expertise in Python, Django, MySQL, REST APIs, responsive design, and AI-assisted tools. Seeking opportunity to deliver quality solutions in collaborative environments.
          </p>

          {/* Action buttons & Social Shortcuts Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-themeBorder">
            {/* Primary Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <a
                href="/resume.pdf"
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
