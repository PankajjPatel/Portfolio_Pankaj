import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Layout, Terminal, Cpu, Activity, Settings } from 'lucide-react';

interface MarqueeItem {
  title: string;
  category: string;
  icon: React.ReactNode;
  image: string;
}

const row1Items: MarqueeItem[] = [
  { title: 'Smart Queue System', category: 'MySQL & Database', icon: <Database className="w-5 h-5 text-blue-500" />, image: '/project1.png' },
  { title: 'Student Management', category: 'Django & Python', icon: <Terminal className="w-5 h-5 text-blue-400" />, image: '/project2.png' },
  { title: 'Portfolio Website', category: 'React & Tailwind', icon: <Layout className="w-5 h-5 text-indigo-500" />, image: '/project3.png' },
  { title: 'Django Dashboards', category: 'Metrics & Data', icon: <Activity className="w-5 h-5 text-blue-500" />, image: '/project1.png' },
];

const row2Items: MarqueeItem[] = [
  { title: 'Custom Admin Panels', category: 'Django custom UI', icon: <Settings className="w-5 h-5 text-indigo-400" />, image: '/project2.png' },
  { title: 'Database Visuals', category: 'SQL Schema normalization', icon: <Database className="w-5 h-5 text-blue-500" />, image: '/project1.png' },
  { title: 'Modern UI Components', category: 'CSS & Layouts', icon: <Layout className="w-5 h-5 text-blue-400" />, image: '/project3.png' },
  { title: 'Python Automation', category: 'Scripts & API hooks', icon: <Cpu className="w-5 h-5 text-indigo-500" />, image: '/project2.png' },
];

export const MarqueeShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the marquee container relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to horizontal translation (GPU accelerated x transform)
  const x1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section 
      ref={containerRef}
      className="relative py-14 sm:py-18 md:py-24 bg-themeBg border-b border-themeBorder overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primaryBlue/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col gap-10">
        
        {/* Row 1: Shifting Right */}
        <div className="flex overflow-hidden w-full">
          <motion.div 
            style={{ x: x1 }}
            className="flex gap-6 whitespace-nowrap w-max px-4"
          >
            {/* Render items twice to ensure seamless flow */}
            {[...row1Items, ...row1Items].map((item, idx) => (
              <div 
                key={idx}
                className="w-[280px] sm:w-[360px] aspect-[16/10] shrink-0 rounded-2xl border border-themeBorder bg-themePanel/80 overflow-hidden relative group cursor-pointer shadow-lg hover:border-primaryBlue/30 transition-all duration-300"
              >
                {/* Background image mockup with gradient overlay */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Visual Glass Header overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/50 border border-themeBorderHeavy text-white backdrop-blur-md">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-kanit uppercase">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Shifting Left */}
        <div className="flex overflow-hidden w-full">
          <motion.div 
            style={{ x: x2 }}
            className="flex gap-6 whitespace-nowrap w-max px-4"
          >
            {[...row2Items, ...row2Items].map((item, idx) => (
              <div 
                key={idx}
                className="w-[280px] sm:w-[360px] aspect-[16/10] shrink-0 rounded-2xl border border-themeBorder bg-themePanel/80 overflow-hidden relative group cursor-pointer shadow-lg hover:border-primaryBlue/30 transition-all duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/50 border border-themeBorderHeavy text-white backdrop-blur-md">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-kanit uppercase">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
