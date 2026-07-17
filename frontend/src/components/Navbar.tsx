import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Upload } from 'lucide-react';
import { ResumeUploadModal } from './Admin';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];


interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Lock body scroll when mobile drawer is open (robust for iOS/Android)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section on scroll
      const scrollPosition = window.scrollY + 120;
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-themeBg/85 border-b border-themeBorder py-4 shadow-xs backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          {/* Minimal Lowercase Dot Logo like the reference image */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center hover:opacity-85 transition-opacity font-sans mr-4"
          >
            <span>pankaj.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 py-1 ${
                  activeSection === item.href
                    ? 'text-primaryBlue'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center ml-2"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-yellow-500" />
              ) : (
                <Moon size={15} className="text-blue-600" />
              )}
            </button>
            
            {/* Admin Console Modal trigger */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="p-1.5 rounded-md text-slate-500 hover:text-primaryBlue dark:text-slate-400 dark:hover:text-primaryBlue transition-colors cursor-pointer flex items-center justify-center"
              title="Admin"
              aria-label="Admin"
            >
              <Upload size={14} />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-yellow-500" />
              ) : (
                <Moon size={15} className="text-blue-600" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-[70vw] max-w-[260px] z-[100] bg-[#0c0c0c] border-l border-themeBorder shadow-2xl flex flex-col p-6 pt-24 gap-5 transition-transform duration-300 ease-out lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                activeSection === item.href ? 'text-primaryBlue' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          {/* Spacer to separate Contact from Admin Console */}
          <div className="flex-1" />
          
          <button
            onClick={() => {
              setIsOpen(false);
              setIsUploadModalOpen(true);
            }}
            className="mb-16 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <Upload size={13} />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] lg:hidden"
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
