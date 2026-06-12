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
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-themeBorder py-12 px-6 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Pankaj Patel<span className="text-primaryBlue">.</span>
          </a>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Python Developer | Django Developer
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <a href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-primaryBlue transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')} className="hover:text-primaryBlue transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="hover:text-primaryBlue transition-colors">Projects</a>
          <a href="#certifications" onClick={(e) => handleScrollTo(e, '#certifications')} className="hover:text-primaryBlue transition-colors">Certifications</a>
          <a href="#education" onClick={(e) => handleScrollTo(e, '#education')} className="hover:text-primaryBlue transition-colors">Education</a>
          <a href="#github" onClick={(e) => handleScrollTo(e, '#github')} className="hover:text-primaryBlue transition-colors">GitHub</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-primaryBlue transition-colors">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/PankajjPatel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-themeBorder bg-themePanel flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/40 transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/pankaj-patel-196815311"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-themeBorder bg-themePanel flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/40 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://x.com/Pankajpatel536"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-themeBorder bg-themePanel flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/40 transition-colors"
            aria-label="Twitter (X)"
          >
            <Twitter size={16} />
          </a>
          <a
            href="mailto:Pankajlucky678@gmail.com"
            className="w-9 h-9 rounded-md border border-themeBorder bg-themePanel flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/40 transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-themeBorder/40 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-12 bg-white/5" />
          <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue/50 animate-pulse" />
          <span className="h-[1px] w-12 bg-white/5" />
        </div>
        <p className="font-kanit font-black tracking-[0.25em] text-[11px] uppercase text-gradient select-none">
          Developed and Designed by Pankaj
        </p>
      </div>
    </footer>
  );
};
