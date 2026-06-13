import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const roles = ["Full Stack Developer", "Python Developer", "Django Developer", "Software Developer"];

export const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  // Mouse movement parallax effect for the right side render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownloadResume = () => {
    console.log('Downloading resume...');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 bg-themeBg text-themeText grid-texture sub-grid-texture radial-glow overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Slow Glowing Center Pool */}
      <div className="absolute top-[35%] left-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full bg-primaryBlue/5 dark:bg-primaryBlue/10 blur-[130px] pointer-events-none animate-slow-glow" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
        {/* Left Content (Grid: 7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Tagline Badge */}
            <div className="self-center sm:self-start px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-themeBorder bg-themePanel text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primaryBlue shadow-xs">
              Computer Science Student
            </div>

            {/* Massive Awwwards Title */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5vw] font-kanit font-black leading-[0.85] tracking-tighter uppercase text-gradient select-none">
                HI, I'M <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">PANKAJ</span>
              </h1>
              
              {/* Role Switcher */}
              <div className="h-8 sm:h-10 md:h-12 overflow-hidden relative flex items-center justify-center sm:justify-start mt-2 sm:mt-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roles[roleIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#60A5FA] font-sans"
                  >
                    {roles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans">
              A passionate Computer Science student focused on building modern web applications and digital experiences using Python, Django and MySQL.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`${apiBaseUrl}/api/contact/resume/`}
                onClick={handleDownloadResume}
                download="Pankaj_Patel_Resume.pdf"
                className="group px-4 sm:px-6 py-3 sm:py-3.5 rounded-md bg-accent-gradient text-white font-semibold text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 transition-all duration-200 shadow-lg shadow-blue-600/10 active:scale-98"
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/PankajjPatel"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-md border border-themeBorder bg-themePanel hover:bg-themePanelHeavy transition-all duration-200 text-center shadow-xs flex items-center gap-2 text-xs sm:text-sm"
              >
                <Github size={16} />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://linkedin.com/in/pankajpatel-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-md border border-themeBorder bg-themePanel hover:bg-themePanelHeavy transition-all duration-200 text-center shadow-xs flex items-center gap-2 text-xs sm:text-sm"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </motion.a>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-themeBorder">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primaryBlue">7.07</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1 flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
                  <GraduationCap size={12} className="text-primaryBlue sm:w-3.5 sm:h-3.5" /> CGPA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primaryBlue">3</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1 flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
                  <Briefcase size={12} className="text-primaryBlue sm:w-3.5 sm:h-3.5" /> Projects
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primaryBlue">5</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1 flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
                  <Award size={12} className="text-primaryBlue sm:w-3.5 sm:h-3.5" /> Credentials
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Visualizer (Grid: 5/12) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={isMobile ? { transformStyle: 'preserve-3d' } : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] aspect-square rounded-3xl glass-panel p-3 sm:p-4 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-themeBorder hover:border-themeBorderHeavy transition-all duration-500 cursor-pointer overflow-hidden group mx-auto"
          >
            {/* Soft Glow behind render */}
            <motion.div
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 bg-gradient-to-tr from-primaryBlue/20 to-secondaryBlue/20 blur-2xl rounded-3xl -z-10"
            />

            {/* Inner Border Ring */}
            <div className="absolute inset-2 border border-dashed border-themeBorderHeavy rounded-2xl pointer-events-none" />

            {/* Workspace / Avatar Render */}
            <motion.img
              src="/avatar.jpg"
              alt="Pankaj Patel Profile"
              className="w-[94%] h-[94%] object-cover rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.4)] select-none pointer-events-none animate-float group-hover:scale-[1.02] transition-transform duration-500"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
