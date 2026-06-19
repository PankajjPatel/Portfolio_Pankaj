import React from 'react';
import { motion } from 'framer-motion';
import { Target, GraduationCap, Brain } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[30%] left-10 w-[200px] h-[200px] bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Overview</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            About Me
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            My professional objectives, academic foundations, and key engineering concepts.
          </p>
        </div>

        {/* Structured Info Cards */}
        <div className="flex flex-col gap-6">
          {/* Career Objective Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 flex gap-4"
          >
            <div className="p-2 h-fit rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 shrink-0">
              <Target size={16} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Career Objective
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                Full Stack Developer with expertise in Python, Django, MySQL, REST APIs, responsive design, and AI-assisted tools. Proficient in database design, version control, and building scalable web applications. Seeking opportunity to deliver quality solutions in collaborative environments.
              </p>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="p-6 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 flex gap-4"
          >
            <div className="p-2 h-fit rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/15 shrink-0">
              <GraduationCap size={16} />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <p className="text-xs font-semibold text-primaryBlue">
                    Computer Science Engineering
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 font-mono bg-slate-200/50 dark:bg-white/5 border border-themeBorderHeavy px-2.5 py-0.5 rounded">
                  2023 — 2027
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
                <a
                  href="https://www.cdgi.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primaryBlue dark:hover:text-primaryBlue underline decoration-dotted transition-colors cursor-pointer"
                >
                  Chameli Devi Group of Institutions
                </a>
                , Indore.
              </p>

              <div className="flex gap-2 pt-2 border-t border-themeBorder">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded">
                  CGPA: 7.07 / 10
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-themeBorderHeavy rounded">
                  Indore, MP
                </span>
              </div>
            </div>
          </motion.div>

          {/* Core Concepts Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="p-6 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 flex gap-4"
          >
            <div className="p-2 h-fit rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/15 shrink-0">
              <Brain size={16} />
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Core Engineering Concepts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                Strong focus on foundational software engineering concepts that ensure reliable, robust, and scalable app architectures.
              </p>
              
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['OOPs', 'CRUD Operations', 'REST APIs Development', 'Version Control', 'Problem Solving'].map((concept) => (
                  <span
                    key={concept}
                    className="px-2 py-1 text-[9px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md border border-purple-500/10 uppercase tracking-wide"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
