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
import { Services } from './sections/Services';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen bg-darkBg text-white selection:bg-accentViolet selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent-gradient origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Sticky Premium Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Assembled Footer */}
      <Footer />

      {/* Floating Action Elements */}
      <WhatsAppButton />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:border-accentViolet/50 hover:shadow-glow-violet transition-all duration-300 active:scale-90 ${
          showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
}

export default App;
