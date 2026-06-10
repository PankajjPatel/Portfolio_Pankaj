import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  id: string;
  label: string;
}

const stats: StatItem[] = [
  { id: '01', label: 'Computer Science Student' },
  { id: '02', label: 'Focused on Python & Django' },
  { id: '03', label: 'Passionate About AI Tools' },
  { id: '04', label: 'Continuous Learner' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-slate-500/[0.03] dark:bg-black/40 border-y border-black/[0.02] dark:border-y-0">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accentViolet/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Floating 3D Geometric Shapes (Inline SVGs with CSS Floating animations) */}
      {/* Floating Torus/Donut shape */}
      <div className="absolute top-16 right-[15%] w-24 h-24 pointer-events-none animate-float opacity-30">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(182,0,168,0.5)]">
          <circle cx="50" cy="50" r="30" stroke="url(#torus-grad)" strokeWidth="15" />
          <defs>
            <linearGradient id="torus-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B600A8" />
              <stop offset="100%" stopColor="#7621B0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Cylinder/Capsule shape */}
      <div className="absolute bottom-16 left-[10%] w-20 h-28 pointer-events-none animate-float-reverse opacity-25">
        <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(190,76,0,0.5)]">
          <rect x="15" y="15" width="50" height="90" rx="25" stroke="url(#capsule-grad)" strokeWidth="10" />
          <defs>
            <linearGradient id="capsule-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BE4C00" />
              <stop offset="100%" stopColor="#B600A8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Bio Column (Grid: 7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-accent-gradient" />
              <span className="text-xs font-bold uppercase tracking-widest text-accentViolet">Who I Am</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              About Me
            </h2>
            
            <p className="text-slate-700 dark:text-gray-300 text-lg font-light leading-relaxed">
              I am a Computer Science student with a strong interest in web development, software engineering, and AI-powered solutions. I enjoy building responsive websites, scalable web applications, and solving practical problems through technology. I continuously explore modern tools and frameworks to improve my development skills and create impactful digital products.
            </p>

            <p className="text-slate-600 dark:text-gray-400 text-base font-light leading-relaxed">
              My core expertise revolves around the Python ecosystem, specifically the Django REST Framework for backend systems, combined with modern frontend technologies like React and Tailwind CSS. I leverage AI tools to accelerate my workflows, allowing me to build robust applications with maximum velocity.
            </p>
          </motion.div>
        </div>

        {/* Right Stats Grid Column (Grid: 5/12) */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.04,
                  y: -5,
                  boxShadow: '0 15px 30px -10px rgba(182, 0, 168, 0.25)',
                  borderColor: 'rgba(182, 0, 168, 0.3)'
                }}
                className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-black/5 dark:border-white/5 hover:border-accentViolet/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
              >
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-accent-gradient select-none">
                  {stat.id}
                </span>
                <p className="text-sm font-semibold tracking-wide text-slate-800 dark:text-gray-200 uppercase leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
