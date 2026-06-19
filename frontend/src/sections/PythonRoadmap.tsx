import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Cloud, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface RoadmapStep {
  phase: string;
  title: string;
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  skills: string[];
  color: string;
  glowColor: string;
}

export const PythonRoadmap: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const roadmapData: RoadmapStep[] = [
    {
      phase: 'Phase 01',
      title: 'Python Core & OOPs',
      icon: <Code2 className="w-5 h-5" />,
      status: 'completed',
      description: 'Understanding Python basics, built-in collections, data structures, and Object-Oriented Programming (OOPs) concepts.',
      skills: ['Variables & Data Types', 'Built-in Collections (List, Dict, Set)', 'Functions & Lambda Expressions', 'OOPs: Classes, Inheritance, Polymorphism', 'Exception Handling & Custom Exceptions'],
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      glowColor: 'group-hover:border-blue-500/35'
    },
    {
      phase: 'Phase 02',
      title: 'Advanced Python Concepts',
      icon: <Cpu className="w-5 h-5" />,
      status: 'in-progress',
      description: 'Learning advanced features like decorators, generators, asynchronous code, and performance optimization techniques.',
      skills: ['Decorators & Generators', 'Context Managers (with statements)', 'List & Dict Comprehensions', 'Multi-threading & Multiprocessing', 'Asynchronous Programming (Asyncio)'],
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      glowColor: 'group-hover:border-purple-500/35'
    },
    {
      phase: 'Phase 03',
      title: 'Database & SQL Integration',
      icon: <Database className="w-5 h-5" />,
      status: 'in-progress',
      description: 'Working with database schema design, SQL CRUD operations, and Django ORM queries.',
      skills: ['MySQL & PostgreSQL Schema Design', 'CRUD Operations & Indexing', 'Joins, Subqueries & Transactions', 'Django ORM Database Queries', 'Database Integrity & Triggers'],
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'group-hover:border-emerald-500/35'
    },
    {
      phase: 'Phase 04',
      title: 'Web Frameworks & API Development',
      icon: <Globe className="w-5 h-5" />,
      status: 'in-progress',
      description: 'Developing web backends and REST APIs using Django, Django REST Framework, and FastAPI.',
      skills: ['Django MVC Architecture', 'Django REST Framework (DRF)', 'FastAPI Basics', 'Token-based Authentication (JWT)', 'RESTful API Best Practices'],
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      glowColor: 'group-hover:border-indigo-500/35'
    },
    {
      phase: 'Phase 05',
      title: 'Testing, DevOps & Deployment',
      icon: <Cloud className="w-5 h-5" />,
      status: 'in-progress',
      description: 'Learning testing workflows, basic containerization, and hosting backends on cloud platforms.',
      skills: ['Unit Testing (PyTest)', 'Git & GitHub Workflows', 'Docker Containerization', 'Deploying on Render / Railway', 'API Logging & Monitoring'],
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      glowColor: 'group-hover:border-amber-500/35'
    }
  ];

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <section id="roadmap" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[25%] left-10 w-[200px] h-[200px] bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Learning Path</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Python Roadmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            My structured learning milestones, checklist, and expertise timeline in full-stack Python engineering.
          </p>
        </div>

        {/* Outer Accordion List (Without timeline border on the outside) */}
        <div className="flex flex-col gap-4">
          {roadmapData.map((step, index) => {
            const isExpanded = expandedStep === index;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 transition-all duration-300 overflow-hidden ${step.glowColor}`}
              >
                {/* Header click area */}
                <div
                  onClick={() => toggleStep(index)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    {/* Glowing Stage Icon */}
                    <div className={`p-2.5 rounded-xl border shrink-0 ${step.color} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                      {step.icon}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-extrabold uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400">
                          {step.phase}
                        </span>
                        {step.status === 'completed' ? (
                          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[7px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[7px] font-bold uppercase tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Learning
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mt-0.5 font-sans">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-slate-500 dark:text-slate-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Dynamic Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-themeBorder bg-themePanel/20 dark:bg-black/5"
                    >
                      <div className="p-5 flex flex-col gap-4">
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                          {step.description}
                        </p>

                        {/* Inner timeline flow for details */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-themeBorder">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1">
                            <Star size={10} className="text-primaryBlue" /> Learning Flow:
                          </span>
                          
                          <div className="relative border-l border-slate-200 dark:border-zinc-800 ml-4 pl-8 flex flex-col gap-5 mt-2">
                            {step.skills.map((skill) => (
                              <div
                                key={skill}
                                className="relative flex items-center text-xs font-semibold text-slate-800 dark:text-slate-200"
                              >
                                {/* Inner timeline dot */}
                                <span className={`absolute -left-[40px] w-4 h-4 rounded-full bg-themeBg border-2 ${step.status === 'completed' ? 'border-emerald-500' : 'border-blue-500'} flex items-center justify-center`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                </span>
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
