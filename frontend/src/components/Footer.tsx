import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-2 pb-6 px-6 flex flex-col items-center justify-center select-none text-center">
      {/* Divider */}
      <div className="w-full max-w-2xl border-t border-themeBorder pt-4 flex flex-col items-center justify-center gap-2">
        {/* Contact details row */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight">
          <a href="mailto:pankajlucky678@gmail.com" className="hover:text-primaryBlue transition-colors flex items-center gap-1">
            <Mail size={11} className="shrink-0" />
            <span>pankajlucky678@gmail.com</span>
          </a>
          <span className="hidden sm:inline text-slate-700 dark:text-zinc-800">•</span>
          <a href="tel:+919754789747" className="hover:text-primaryBlue transition-colors flex items-center gap-1">
            <Phone size={11} className="shrink-0" />
            <span>+91 97547 89747</span>
          </a>
          <span className="hidden sm:inline text-slate-700 dark:text-zinc-800">•</span>
          <a href="https://github.com/PankajjPatel" target="_blank" rel="noopener noreferrer" className="hover:text-primaryBlue transition-colors flex items-center gap-1">
            <Github size={11} className="shrink-0" />
            <span>GitHub</span>
          </a>
          <span className="hidden sm:inline text-slate-700 dark:text-zinc-800">•</span>
          <a href="https://linkedin.com/in/pankajpatel-dev" target="_blank" rel="noopener noreferrer" className="hover:text-primaryBlue transition-colors flex items-center gap-1">
            <Linkedin size={11} className="shrink-0" />
            <span>LinkedIn</span>
          </a>
          <span className="hidden sm:inline text-slate-700 dark:text-zinc-800">•</span>
          <a href="https://x.com/Pankajpatel536" target="_blank" rel="noopener noreferrer" className="hover:text-primaryBlue transition-colors flex items-center gap-1">
            <Twitter size={11} className="shrink-0" />
            <span>Twitter</span>
          </a>
        </div>

        {/* Footer text */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider font-mono leading-relaxed mt-1"
        >
          Designed & Developed by Pankaj Patel © 2026
        </motion.p>
      </div>
    </footer>
  );
};
