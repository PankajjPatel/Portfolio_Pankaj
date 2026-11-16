import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  companyUrl?: string;
  isCurrent?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Python Development Intern',
    company: 'Infotact Solutions',
    location: 'Remote',
    period: 'May 2026 — Sep 2026',
    description: 'Worked as a backend developer on Python scripting, data preprocessing, and database optimization.',
    responsibilities: [
      'Developed Python scripts and optimized backend logic for internal tools.',
      'Built and maintained data preprocessing scripts for analytics pipelines.',
      'Optimized MySQL/PostgreSQL queries and database schemas for faster data retrieval.',
      'Explored Generative AI concepts and LLM integration for internal projects.'
    ],
    skills: ['Python', 'Django', 'MySQL', 'SQL Optimization', 'Generative AI', 'REST APIs'],
    companyUrl: 'https://infotact.in',
    isCurrent: false
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Career History</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Work Experience
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Professional roles, internships, and engineering contributions in software development.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 p-6 hover:border-primaryBlue/30 hover:bg-themePanel/60 dark:hover:bg-themePanel/30 transition-all duration-300"
            >
              {/* Highlight bar for current role */}
              {item.isCurrent && (
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-primaryBlue/50" />
              )}

              <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    {/* Icon Container */}
                    <div className="p-3 rounded-xl bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 group-hover:scale-105 transition-transform duration-300">
                      <Briefcase size={18} />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans">
                          {item.role}
                        </h3>
                        {item.isCurrent ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 animate-pulse">
                            Current
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20">
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-primaryBlue mt-0.5">
                        {item.companyUrl ? (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            {item.company}
                            <ExternalLink size={10} className="opacity-75" />
                          </a>
                        ) : (
                          item.company
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date & Location column */}
                  <div className="flex flex-row sm:flex-col sm:items-end justify-between sm:justify-start gap-1 sm:text-right shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 font-mono bg-slate-200/50 dark:bg-white/5 border border-themeBorderHeavy px-2 py-0.5 rounded">
                      <Calendar size={9} className="inline mr-1" />
                      {item.period}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin size={9} />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Detailed Responsibilities */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-themeBorder">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Key Contributions & Responsibilities:
                  </span>
                  <ul className="flex flex-col gap-2 list-none pl-0">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-normal">
                        <CheckCircle2 size={12} className="text-primaryBlue mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-themeBorder">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[9px] font-semibold bg-slate-200/40 dark:bg-white/5 text-slate-700 dark:text-slate-400 rounded-md border border-themeBorder uppercase tracking-wide group-hover:border-primaryBlue/25 group-hover:text-primaryBlue transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
