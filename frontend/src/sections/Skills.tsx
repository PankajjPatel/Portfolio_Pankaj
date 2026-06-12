import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Database, Palette, Github, Cpu, Brain, Users, RefreshCw, MessageSquare } from 'lucide-react';

interface SkillItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const techSkills: SkillItem[] = [
  {
    id: '01',
    title: 'Python',
    description: 'Creation of backend systems, automation scripts and web applications.',
    icon: <Code className="w-7 h-7 text-primaryBlue" />,
  },
  {
    id: '02',
    title: 'Django',
    description: 'Building scalable and maintainable web applications.',
    icon: <Server className="w-7 h-7 text-secondaryBlue" />,
  },
  {
    id: '03',
    title: 'MySQL',
    description: 'Database design, optimization and management.',
    icon: <Database className="w-7 h-7 text-blue-500" />,
  },
  {
    id: '04',
    title: 'Tailwind CSS',
    description: 'Responsive and modern UI development.',
    icon: <Palette className="w-7 h-7 text-indigo-400" />,
  },
  {
    id: '05',
    title: 'Git & GitHub',
    description: 'Version control and collaborative development.',
    icon: <Github className="w-7 h-7 text-slate-300" />,
  },
  {
    id: '06',
    title: 'AI-Assisted Development',
    description: 'Leveraging modern AI tools to accelerate development workflows.',
    icon: <Cpu className="w-7 h-7 text-emerald-400" />,
  },
];

const behavioralSkills: SkillItem[] = [
  {
    id: '01',
    title: 'Problem Solving',
    description: 'Analyzing complex coding challenges, designing database schemas, and building optimized algorithms.',
    icon: <Brain className="w-7 h-7 text-amber-400" />,
  },
  {
    id: '02',
    title: 'Team Collaboration',
    description: 'Working in group settings, participating in class projects, and using Git for shared repository workflows.',
    icon: <Users className="w-7 h-7 text-sky-400" />,
  },
  {
    id: '03',
    title: 'Adaptability',
    description: 'Quickly learning new tech stacks, exploring modern web frameworks, and embracing AI-assisted dev workflows.',
    icon: <RefreshCw className="w-7 h-7 text-pink-400" />,
  },
  {
    id: '04',
    title: 'Communication',
    description: 'Presenting project architectures, writing clear documentation, and explaining technical logic clearly.',
    icon: <MessageSquare className="w-7 h-7 text-violet-400" />,
  },
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');

  const currentSkills = activeTab === 'technical' ? techSkills : behavioralSkills;

  return (
    <section id="skills" className="relative py-28 px-6 bg-[#0C0C0C] border-b border-white/5 overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Capabilities</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-[10vw] sm:text-[7vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
            SKILLS & ABILITIES
          </h2>
          <p className="text-slate-400 font-light text-base max-w-xl">
            My engineering expertise and behavioral strengths built through academic courses and practical engineering.
          </p>

          {/* Premium Sliding Toggle Selector */}
          <div className="relative flex p-1 rounded-full bg-white/5 border border-white/10 w-[320px] mx-auto mt-4 overflow-hidden">
            {/* Sliding Pill */}
            <motion.div
              layoutId="activeTabPill"
              className="absolute top-1 bottom-1 rounded-full bg-primaryBlue"
              style={{
                left: activeTab === 'technical' ? '4px' : 'calc(50% + 2px)',
                width: 'calc(50% - 6px)',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab('technical')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeTab === 'technical' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Technical
            </button>
            <button
              onClick={() => setActiveTab('behavioral')}
              className={`relative z-10 w-1/2 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeTab === 'behavioral' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Behavioral
            </button>
          </div>
        </div>

        {/* Grid Layout with AnimatePresence */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentSkills.map((skill) => (
                <motion.div
                  key={skill.title}
                  whileHover={{ 
                    y: -8,
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.15)'
                  }}
                  className="group bg-[#111827]/40 border border-white/5 rounded-3xl p-8 hover:bg-[#111827]/80 hover:border-primaryBlue/30 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[250px]"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header: Icon & Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        {skill.id}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-secondaryBlue transition-colors duration-300">
                        {skill.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom animated expander line */}
                  <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-accent-gradient rounded-full transition-all duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
