import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Milestone, Award, Star } from 'lucide-react';

interface AchievementItem {
  id: string;
  type: 'internship' | 'achievement' | 'milestone' | 'certification';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
}

const achievementsData: AchievementItem[] = [
  {
    id: 'internship-1',
    type: 'internship',
    title: 'Python Development Intern',
    subtitle: 'Infotact Solutions (3-Month Ongoing Internship)',
    date: 'May 2026 — Present',
    description: 'Working on python-based algorithms, designing data preprocessing scripts, optimizing database queries, and exploring generative AI foundations.',
    icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
    tags: ['Python', 'SQL Optimization', 'Internship']
  },
  {
    id: 'cloud-certifications',
    type: 'certification',
    title: 'Cloud & AI Certifications',
    subtitle: 'Oracle & AWS Academy Credentials',
    date: '2025',
    description: 'Achieved verified OCI 2025 Certified Generative AI Professional and OCI 2025 Certified AI Foundations Associate credentials. Completed AWS Graduate training.',
    icon: <Award className="w-4 h-4 text-blue-500" />,
    tags: ['Generative AI', 'Oracle Cloud', 'AWS Academy']
  },
  {
    id: 'project-success',
    type: 'achievement',
    title: 'Django Student Management System Deployment',
    subtitle: 'Campus-Core Portal Deployment',
    date: '2024',
    description: 'Successfully built and deployed Student Management System handling 500+ records with complete MySQL database CRUD capabilities.',
    icon: <Star className="w-4 h-4 text-amber-500" />,
    tags: ['Django Backend', 'MySQL CRUD', 'Render Deployment']
  },
  {
    id: 'academic-start',
    type: 'milestone',
    title: 'Admission to CDGI, Indore',
    subtitle: 'Chameli Devi Group of Institutions',
    date: '2023',
    description: 'Began Bachelor of Technology (B.Tech) in Computer Science Engineering. Studying Object-Oriented Programming, Database Normalization, and Algorithms.',
    icon: <Milestone className="w-4 h-4 text-purple-500" />,
    tags: ['Computer Science', 'CDGI', 'B.Tech']
  }
];

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[30%] right-10 w-[200px] h-[200px] bg-primaryBlue/5 rounded-full filter blur-[90px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Timeline</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Achievements
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Chronological log of professional internships, certifications, and academic milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 sm:ml-6 flex flex-col gap-10">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Connector Dot */}
              <span className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-themeBg border border-slate-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-primaryBlue/50 transition-colors">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-themePanel group-hover:text-primaryBlue transition-all">
                  {item.icon}
                </span>
              </span>

              {/* Card Compartment */}
              <div className="p-5 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/20 hover:border-themeBorderHeavy hover:bg-themePanel/60 dark:hover:bg-themePanel/30 transition-all duration-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-500 font-mono bg-slate-200/50 dark:bg-white/5 border border-themeBorderHeavy px-2 py-0.5 rounded shrink-0">
                    {item.date}
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-primaryBlue mb-3 font-sans">
                  {item.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-themeBorder">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-semibold bg-slate-200/40 dark:bg-white/5 text-slate-700 dark:text-slate-400 rounded-md border border-themeBorder uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
