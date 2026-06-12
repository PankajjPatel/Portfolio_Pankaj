import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Upload } from 'lucide-react';
import { ResumeUploadModal } from './ResumeUploadModal';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section on scroll
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-50 transition-all duration-200 border-x border-white/5 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0F172A]/95 border-b border-themeBorder py-4 shadow-sm backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span>Pankaj Patel</span>
            <span className="w-2 h-2 rounded-full bg-primaryBlue"></span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                  activeSection === item.href
                    ? 'text-primaryBlue'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primaryBlue dark:hover:text-primaryBlue'
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primaryBlue rounded-full" />
                )}
              </a>
            ))}
            
            {/* Resume Button with subtle Upload trigger */}
            <div className="flex items-center pl-2 border-l border-themeBorder">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-md border border-themeBorder bg-themePanel text-slate-700 dark:text-slate-200 hover:bg-themePanelHeavy hover:border-themeBorderHeavy transition-colors shadow-xs"
              >
                Resume
              </a>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-primaryBlue transition-colors"
                title="Update Resume PDF"
                aria-label="Update resume"
              >
                <Upload size={13} />
              </button>
            </div>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-4 py-2 text-xs font-semibold rounded-md bg-primaryBlue hover:bg-blue-700 text-white transition-colors duration-200 shadow-sm"
            >
              Hire Me
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-themeBorder bg-themePanel text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-primaryBlue/30 transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-yellow-500" />
              ) : (
                <Moon size={16} className="text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile Toggle & Theme control side-by-side */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-themeBorder bg-themePanel text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-yellow-500" />
              ) : (
                <Moon size={16} className="text-blue-600" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-[260px] z-40 bg-white dark:bg-[#1E293B] border-l border-themeBorder shadow-lg flex flex-col p-8 pt-24 gap-5 transition-transform duration-300 ease-out md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-base font-semibold tracking-wide transition-colors duration-200 ${
                activeSection === item.href ? 'text-primaryBlue' : 'text-slate-600 dark:text-slate-300 hover:text-primaryBlue'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Resume Link */}
          <div className="flex items-center justify-between border-t border-themeBorder pt-4 mt-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-primaryBlue"
            >
              View Resume
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsUploadModalOpen(true);
              }}
              className="p-2 text-slate-400 hover:text-primaryBlue"
              aria-label="Update resume"
            >
              <Upload size={16} />
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="mt-2 w-full text-center py-2.5 rounded-md bg-primaryBlue text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"
          />
        )}
      </nav>

      {/* Shared Admin Upload Modal */}
      <ResumeUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </>
  );
};
