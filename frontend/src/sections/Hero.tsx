import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Award, Briefcase, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  // Mouse movement parallax effect for the right side render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (href: string) => {
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accentViolet/20 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accentPurple/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accentOrange/10 rounded-full filter blur-[140px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (Grid: 7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Tagline */}
            <div className="self-start px-4 py-1.5 rounded-full glass-panel text-xs font-semibold uppercase tracking-widest text-accentOrange border-accentOrange/30 shadow-[0_0_15px_rgba(190,76,0,0.15)]">
              🛡️ Computer Science Student
            </div>

            {/* Title */}
            <motion.h1
              animate={{
                rotateX: [0, 4, -4, 0],
                rotateY: [0, -6, 6, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
                textShadow: `
                  1px 1px 0px #B600A8,
                  2px 2px 0px #9d0091,
                  3px 3px 0px #84007a,
                  4px 4px 0px #6b0063,
                  5px 5px 8px rgba(0,0,0,0.4)
                `,
              }}
              className="text-4xl sm:text-6xl xl:text-7.5xl font-black leading-tight tracking-tight uppercase text-gray-900 dark:text-white cursor-default"
            >
              Hi, I'm{' '}
              <span className="block mt-2 text-[#B600A8] dark:text-[#E835D8] font-extrabold tracking-tight">
                Pankaj Patel
              </span>
            </motion.h1>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Python Developer, Django Developer, and AI-Powered Web Creator passionate about building modern web applications and solving real-world problems through technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('#contact')}
                className="group px-8 py-4 rounded-full bg-accent-gradient text-white font-semibold text-base shadow-glow-violet hover:shadow-glow-purple flex items-center gap-3 transition-all duration-300"
              >
                Contact Me
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('#projects')}
                className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-800 dark:text-white font-semibold text-base border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              >
                View Projects
              </motion.button>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-black/5 dark:border-white/5">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-accent-gradient">7.07</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1 flex items-center gap-1">
                  <GraduationCap size={14} className="text-accentViolet" /> CGPA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-accent-gradient">3+</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1 flex items-center gap-1">
                  <Briefcase size={14} className="text-accentOrange" /> Projects
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-accent-gradient">5+</span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1 flex items-center gap-1">
                  <Award size={14} className="text-accentPurple" /> Certs
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
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-[450px] aspect-square rounded-3xl glass-panel p-4 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
          >
            {/* Soft Glow behind render */}
            <motion.div
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 bg-gradient-to-tr from-accentViolet/20 to-accentOrange/20 blur-2xl rounded-3xl -z-10"
            />

            {/* Inner Border Ring */}
            <div className="absolute inset-2 border border-dashed border-black/10 dark:border-white/10 rounded-2xl pointer-events-none" />

            {/* Workspace / Avatar Render */}
            <motion.img
              src="/avatar.jpg"
              alt="Pankaj Patel Portrait"
              className="w-[94%] h-[94%] object-cover rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.2)] select-none pointer-events-none animate-float group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
