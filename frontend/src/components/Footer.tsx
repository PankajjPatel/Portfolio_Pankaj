import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

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
    <footer className="bg-themeBg border-t border-themeBorder py-12 sm:py-16 px-4 sm:px-6 relative select-none">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="text-xl sm:text-2xl font-kanit font-black tracking-tight text-gradient uppercase hover:opacity-90 transition-opacity"
          >
            Pankaj Patel
          </a>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue" />
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 font-sans">
              Python & Django Developer
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-primaryBlue transition-colors duration-200">About</a>
          <a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')} className="hover:text-primaryBlue transition-colors duration-200">Skills</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="hover:text-primaryBlue transition-colors duration-200">Projects</a>
          <a href="#certifications" onClick={(e) => handleScrollTo(e, '#certifications')} className="hover:text-primaryBlue transition-colors duration-200">Certifications</a>
          <a href="#education" onClick={(e) => handleScrollTo(e, '#education')} className="hover:text-primaryBlue transition-colors duration-200">Education</a>
          <a href="#github" onClick={(e) => handleScrollTo(e, '#github')} className="hover:text-primaryBlue transition-colors duration-200">GitHub</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-primaryBlue transition-colors duration-200">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/PankajjPatel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-themePanel/80 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:border-primaryBlue/30 hover:bg-themePanel hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/pankaj-patel-196815311"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-themePanel/80 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:border-primaryBlue/30 hover:bg-themePanel hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://x.com/Pankajpatel536"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-themePanel/80 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:border-primaryBlue/30 hover:bg-themePanel hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300"
            aria-label="Twitter (X)"
          >
            <Twitter size={16} />
          </a>
          <a
            href="mailto:Pankajlucky678@gmail.com"
            className="w-10 h-10 rounded-full border border-white/5 bg-themePanel/80 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:border-primaryBlue/30 hover:bg-themePanel hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-10 pt-6 border-t border-themeBorder flex flex-col items-center justify-center gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-12 bg-slate-200/50 dark:bg-white/5" />
          <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue/50 animate-pulse" />
          <span className="h-[1px] w-12 bg-slate-200/50 dark:bg-white/5" />
        </div>
        <p className="font-kanit font-black tracking-[0.25em] text-[10px] uppercase text-gradient select-none">
          Developed and Designed by Pankaj
        </p>
      </div>
    </footer>
  );
};
