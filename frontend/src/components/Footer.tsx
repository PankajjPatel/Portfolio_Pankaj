import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-black/5 dark:bg-black/60 border-t border-black/5 dark:border-white/5 py-12 px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="text-2xl font-black bg-accent-gradient bg-clip-text text-transparent"
          >
            PANKAJ PATEL
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Python Developer &amp; AI-Powered Web Creator
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-accentViolet transition-colors duration-300">About</a>
          <a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')} className="hover:text-accentViolet transition-colors duration-300">Skills</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-accentViolet transition-colors duration-300">Services</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="hover:text-accentViolet transition-colors duration-300">Projects</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-accentViolet transition-colors duration-300">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/PankajjPatel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-accentViolet transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/pankaj-patel-196815311"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-accentViolet transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:Pankajlucky678@gmail.com"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-accentViolet transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
        <p>© 2026 Pankaj Patel. All Rights Reserved.</p>
        <p>Designed and built with Framer Motion, React, and Django.</p>
      </div>
    </footer>
  );
};
