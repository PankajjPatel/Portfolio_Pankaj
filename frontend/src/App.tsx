import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Components & Sections
import { Navbar } from './components/Navbar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Education } from './sections/Education';
import { GithubActivity } from './sections/GithubActivity';
import { Contact } from './sections/Contact';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Framer motion scroll progress indicator setup
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

    // Call dynamic Django visit logging endpoint
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
    <>
      <div className="max-w-[1440px] mx-auto min-h-screen bg-themeBg text-themeText selection:bg-primaryBlue selection:text-white sm:border-x border-themeBorder shadow-none sm:shadow-[0_0_80px_rgba(37,99,235,0.15)] relative transition-colors duration-200">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-primaryBlue origin-left z-[100]"
          style={{ scaleX }}
        />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <GithubActivity />
          <Contact />
        </main>

        {/* Assembled Footer */}
        <Footer />
      </div>

      {/* Floating Action Elements */}
      <WhatsAppButton />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 floating-button-right z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-themeBorder bg-themePanel flex items-center justify-center text-slate-500 hover:text-primaryBlue hover:border-primaryBlue/40 shadow-sm transition-all duration-200 active:scale-95 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={16} />
      </button>
    </>
  );
}

export default App;
