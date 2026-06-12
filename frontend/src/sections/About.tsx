import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Target, Heart } from 'lucide-react';

const aboutText = 
  "Computer Science student passionate about software development and modern web technologies. " +
  "Experienced with Python, Django, MySQL, Tailwind CSS and Git. " +
  "Focused on building practical solutions, learning new technologies and continuously improving as a developer.";

// Stagger container variant for character-by-character reveal
const sentenceVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.008,
    }
  }
};

// Character animation variant
const letterVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
} as const;

interface InfoCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const cards: InfoCard[] = [
  {
    title: "Who I Am",
    description: "A Computer Science student passionate about software engineering, building responsive websites, and solving practical real-world problems.",
    icon: <User className="w-5 h-5 text-primaryBlue" />
  },
  {
    title: "What I Build",
    description: "Scalable web applications with Python & Django, relational databases using MySQL, and fast modern interfaces with Tailwind CSS.",
    icon: <Code2 className="w-5 h-5 text-secondaryBlue" />
  },
  {
    title: "My Interests",
    description: "Exploring advanced AI-assisted development tools, web performance optimization, and robust backend system architectures.",
    icon: <Heart className="w-5 h-5 text-purple-400" />
  },
  {
    title: "My Goals",
    description: "Continuously improving as a software engineer, contributing to open-source systems, and securing professional placements or internships.",
    icon: <Target className="w-5 h-5 text-emerald-400" />
  }
];

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-themeBg border-b border-themeBorder overflow-hidden select-none"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      {/* Floating 3D Geometric Shapes (Inline SVGs with CSS Floating animations) */}
      {/* Torus / Donut */}
      <div className="absolute top-16 right-[15%] w-16 sm:w-24 h-16 sm:h-24 pointer-events-none animate-float opacity-25 hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <circle cx="50" cy="50" r="30" stroke="url(#torus-grad)" strokeWidth="14" />
          <defs>
            <linearGradient id="torus-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Cylinder / Capsule */}
      <div className="absolute bottom-16 left-[8%] w-12 sm:w-16 h-16 sm:h-24 pointer-events-none animate-float-reverse opacity-20 hidden sm:block">
        <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]">
          <rect x="15" y="15" width="50" height="90" rx="25" stroke="url(#capsule-grad)" strokeWidth="10" />
          <defs>
            <linearGradient id="capsule-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 md:gap-20 relative z-10">
        
        {/* Massive Awwwards Heading */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Background</span>
          </div>
          <h2 className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none select-none">
            ABOUT ME
          </h2>
        </div>

        {/* Character reveal paragraph container */}
        <div className="max-w-5xl mx-auto sm:mx-0 w-full">
          <motion.p
            variants={sentenceVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-slate-700 dark:text-slate-300 text-base sm:text-lg md:text-2xl font-light leading-relaxed tracking-wide font-sans text-center sm:text-left"
          >
            {aboutText.split("").map((char, index) => (
              <motion.span 
                key={index} 
                variants={letterVariant}
                className={char === " " ? "inline-block w-1.5" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8,
                borderColor: 'rgba(37, 99, 235, 0.25)',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
              }}
              className="bg-themePanel border border-themeBorder rounded-2xl p-6 hover:bg-themePanel/90 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-white/5 flex items-center justify-center border border-themeBorderHeavy">
                {card.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
