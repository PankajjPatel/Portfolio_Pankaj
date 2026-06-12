import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  location?: string;
}

const educationData: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    institution: 'Chameli Devi Group of Institution',
    duration: '2023 — 2027',
    grade: 'CGPA: 7.07',
    location: 'Indore, Madhya Pradesh'
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-themeBg border-b border-themeBorder select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-12 md:gap-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Learning Journey</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
            Education
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-xl">
            My academic foundation in Computer Science and software engineering.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="flex flex-col gap-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-themeBorder bg-themePanel/80 shadow-md flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-200/50 dark:bg-white/5 text-primaryBlue flex items-center justify-center shrink-0 border border-themeBorderHeavy">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                      {edu.institution} {edu.location && `| ${edu.location}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 bg-slate-200/50 dark:bg-white/5 px-2.5 py-1 rounded-md border border-themeBorderHeavy">
                    <Calendar size={12} className="text-primaryBlue" />
                    {edu.duration}
                  </span>
                  {edu.grade && (
                    <span className="text-xs font-bold text-secondaryBlue flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-md border border-blue-500/20">
                      <Award size={12} className="text-secondaryBlue" />
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
