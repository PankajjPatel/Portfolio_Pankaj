import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Wrench, Layers, CheckCircle2 } from 'lucide-react';

interface Skill {
  name: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: <Code2 className="w-5 h-5 text-blue-500" />,
    skills: [
      { name: 'Python' },
      { name: 'C' },
      { name: 'C++' }
    ]
  },
  {
    id: 'technologies',
    title: 'Technologies / Frameworks',
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    skills: [
      { name: 'Django (Framework)' },
      { name: 'MySQL' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Tailwind CSS' }
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: <Wrench className="w-5 h-5 text-amber-500" />,
    skills: [
      { name: 'VS Code' },
      { name: 'Git & GitHub' },
      { name: 'Render' },
      { name: 'Railway' },
      { name: 'AI-Assisted Development Tools' }
    ]
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    icon: <Layers className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: 'OOPs' },
      { name: 'CRUD Operations' },
      { name: 'REST APIs Development' },
      { name: 'Version Control' },
      { name: 'Problem Solving' }
    ]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[40%] right-10 w-[250px] h-[250px] bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Capabilities</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Technical Skills
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Professional stack, tools, and computer science concepts verified from my resume.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ 
                y: -4,
                borderColor: 'rgba(59, 130, 246, 0.25)',
                boxShadow: '0 10px 20px -10px rgba(59, 130, 246, 0.12)'
              }}
              className="p-5 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-themeBorder">
                <div className="p-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 border border-themeBorderHeavy">
                  {category.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/30 dark:bg-white/5 border border-themeBorderHeavy hover:border-primaryBlue/30 hover:bg-slate-200/50 dark:hover:bg-zinc-800/60 transition-all duration-200"
                  >
                    <CheckCircle2 size={11} className="text-primaryBlue" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
