import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel-heavy py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="text-2xl font-black tracking-wider bg-accent-gradient bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          PANKAJ PATEL
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accentViolet relative py-1 ${
                activeSection === item.href ? 'text-accentViolet' : 'text-gray-300'
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-gradient rounded-full" />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-accent-gradient text-white shadow-glow-violet hover:shadow-glow-purple hover:scale-105 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] z-40 glass-panel-heavy shadow-2xl flex flex-col p-8 pt-24 gap-6 transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            className={`text-lg font-semibold tracking-wide transition-colors duration-300 hover:text-accentViolet ${
              activeSection === item.href ? 'text-accentViolet' : 'text-gray-300'
            }`}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleScrollTo(e, '#contact')}
          className="mt-4 w-full text-center py-3 rounded-full bg-accent-gradient text-white shadow-glow-violet hover:shadow-glow-purple transition-all duration-300 font-semibold"
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </nav>
  );
};
