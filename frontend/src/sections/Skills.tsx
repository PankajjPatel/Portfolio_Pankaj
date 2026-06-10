import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Layout, Palette, Database, GitBranch, Github, Send, Cpu, Layers } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: string;
  category: 'Backend' | 'Frontend' | 'Database & Tools';
}

const skills: Skill[] = [
  { name: 'Python', icon: <Code className="w-8 h-8 text-accentViolet" />, level: 'Advanced', category: 'Backend' },
  { name: 'Django', icon: <Server className="w-8 h-8 text-accentPurple" />, level: 'Advanced', category: 'Backend' },
  { name: 'HTML5', icon: <Layout className="w-8 h-8 text-accentOrange" />, level: 'Intermediate', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: <Palette className="w-8 h-8 text-[#06B6D4]" />, level: 'Advanced', category: 'Frontend' },
  { name: 'MySQL', icon: <Database className="w-8 h-8 text-[#00758F]" />, level: 'Advanced', category: 'Database & Tools' },
  { name: 'Git', icon: <GitBranch className="w-8 h-8 text-[#F05032]" />, level: 'Intermediate', category: 'Database & Tools' },
  { name: 'GitHub', icon: <Github className="w-8 h-8 text-gray-200" />, level: 'Advanced', category: 'Database & Tools' },
  { name: 'Postman', icon: <Send className="w-8 h-8 text-[#FF6C37]" />, level: 'Intermediate', category: 'Database & Tools' },
  { name: 'AI Development Tools', icon: <Cpu className="w-8 h-8 text-[#10B981]" />, level: 'Advanced', category: 'Database & Tools' },
  { name: 'Database Design', icon: <Layers className="w-8 h-8 text-accentOrange" />, level: 'Advanced', category: 'Database & Tools' },
];

export const Skills: React.FC = () => {
  // Group by category if we want tabs or headings
  const categories = ['Backend', 'Frontend', 'Database & Tools'] as const;

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-accentPurple/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accentOrange/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-accentOrange">Expertise</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Technical Skills
          </h2>
          <p className="text-gray-400 font-light text-base max-w-xl">
            My technology stack and toolsets for crafting robust backend architectures and sleek frontend interfaces.
          </p>
        </div>

        {/* Categories Layout */}
        <div className="flex flex-col gap-12">
          {categories.map((category) => {
            const filteredSkills = skills.filter((s) => s.category === category);
            return (
              <div key={category} className="flex flex-col gap-6">
                <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-300 border-b border-white/5 pb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -8,
                        boxShadow: '0 10px 30px -10px rgba(118, 33, 176, 0.4)',
                        borderColor: 'rgba(182, 0, 168, 0.3)'
                      }}
                      className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center gap-4 border border-white/5 transition-all duration-300 group cursor-pointer"
                    >
                      {/* Icon wrapper with glow on hover */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold tracking-wide text-gray-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-accentOrange transition-colors duration-300">
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
