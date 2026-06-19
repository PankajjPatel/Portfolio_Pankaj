import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const contactLinks = [
    { icon: <Mail size={14} />, href: 'mailto:pankajlucky678@gmail.com', label: 'Email' },
    { icon: <Phone size={14} />, href: 'tel:+919754789747', label: 'Phone' },
    { icon: <Github size={14} />, href: 'https://github.com/PankajjPatel', label: 'GitHub', target: '_blank' },
    { icon: <Linkedin size={14} />, href: 'https://linkedin.com/in/pankajpatel-dev', label: 'LinkedIn', target: '_blank' },
    { icon: <Twitter size={14} />, href: 'https://x.com/Pankajpatel536', label: 'Twitter', target: '_blank' },
  ];

  return (
    <footer className="relative pt-6 pb-2 px-6 flex flex-col items-center justify-center select-none text-center">
      {/* Divider */}
      <div className="w-full max-w-2xl border-t border-themeBorder pt-6 flex flex-col items-center justify-center gap-4">
        {/* Contact Icons Row */}
        <div className="flex items-center justify-center gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? "noopener noreferrer" : undefined}
              title={link.label}
              className="w-8 h-8 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer text block */}
        <div className="flex flex-col items-center gap-1 mt-2 font-mono tracking-wider">
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white"
          >
            Designed & Developed by Pankaj Patel
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[8px] sm:text-[9px] font-bold text-primaryBlue uppercase tracking-widest"
          >
            Python Developer | Django | Web Applications
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 font-light"
          >
            © 2026 All Rights Reserved
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
