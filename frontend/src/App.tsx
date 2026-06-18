import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Components
import { Navbar } from './components/Navbar';

import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

// Sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Achievements } from './sections/Achievements';
import { GithubActivity } from './sections/GithubActivity';
import { Contact } from './sections/Contact';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Shared theme state
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

  // Framer motion scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    // Dynamic Django visit logging endpoint
    const logVisit = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        const isUniqueKey = 'pankaj_portfolio_visited';
        let isUnique = false;
        if (!localStorage.getItem(isUniqueKey)) {
          localStorage.setItem(isUniqueKey, 'true');
          isUnique = true;
        }
        await fetch(`${apiBaseUrl}/api/contact/stats/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_unique: isUnique }),
        });
      } catch (err) {
        console.error('Failed to log visit stats:', err);
      }
    };
    logVisit();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen text-themeText selection:bg-primaryBlue selection:text-white transition-colors duration-200">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primaryBlue origin-left z-50"
        style={{ scaleX }}
      />

      {/* Sticky Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Centered Portfolio Layout Wrapper */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative pb-28 pt-4">
        {/* Sections in user requested order */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <GithubActivity />
        <Contact />
        <Footer />
      </main>

      {/* Floating Action Elements */}
      <WhatsAppButton />



      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 z-30 w-10 h-10 rounded-full border border-themeBorder bg-themePanel/80 flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/45 shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}

export default App;
