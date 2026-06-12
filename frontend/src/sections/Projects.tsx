import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  repoName: string;
  image: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Smart Queue Management System',
    description: 'Queue management solution for hospitals, banks and colleges.',
    tech: ['MySQL', 'SQL', 'Database Design'],
    githubUrl: 'https://github.com/PankajjPatel',
    demoUrl: '#',
    repoName: 'Smart-Queue-Management',
    image: '/project1.png',
    features: [
      'Appointment booking integration',
      'Queue tracking algorithms',
      'Token management workflows',
      'Normalized relational database schema design'
    ],
  },
  {
    id: '02',
    title: 'Student Management System',
    description: 'Web-based application for efficient student record management.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'Tailwind CSS'],
    githubUrl: 'https://github.com/PankajjPatel/Campus-Core',
    demoUrl: 'https://campus-core-j9e0.onrender.com',
    repoName: 'Campus-Core',
    image: '/project2.png',
    features: [
      'CRUD operations for student profiles',
      'Student record tracking',
      'MySQL database integration',
      'Responsive user interface'
    ],
  },
  {
    id: '03',
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio website showcasing projects, skills and certifications.',
    tech: ['Python', 'Django', 'Tailwind CSS', 'Git', 'GitHub'],
    githubUrl: 'https://github.com/PankajjPatel/Portfolio_Pankaj',
    demoUrl: '/',
    repoName: 'Portfolio_Pankaj',
    image: '/project3.png',
    features: [
      'Passcode-protected interactive resume uploader modal',
      'Dynamic visitor sessions and download counter API',
      'Fully responsive, clean grid layout with dark mode variables'
    ],
  },
];

interface RepoInfo {
  githubUrl: string;
  demoUrl: string;
}

export const Projects: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' } | null>(null);
  const [githubRepos, setGithubRepos] = useState<Record<string, RepoInfo>>({});

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/PankajjPatel/repos');
        if (!response.ok) return;
        const repos = await response.json();
        
        const repoMap: Record<string, RepoInfo> = {};
        repos.forEach((repo: any) => {
          repoMap[repo.name.toLowerCase()] = {
            githubUrl: repo.html_url,
            demoUrl: repo.homepage || '',
          };
        });
        setGithubRepos(repoMap);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };
    
    fetchGithubRepos();
  }, []);

  const triggerToast = (message: string, type: 'info' | 'success' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSourceCodeClick = (e: React.MouseEvent, resolvedGithubUrl: string) => {
    if (resolvedGithubUrl === '#') {
      e.preventDefault();
      triggerToast('Source code is being prepared for release. It will be public on GitHub soon!');
    }
  };

  const handleLiveClick = (e: React.MouseEvent, project: Project, resolvedDemoUrl: string) => {
    if (project.title === 'Portfolio Website') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerToast('You are currently viewing the Live Demo!', 'success');
      return;
    }
    if (resolvedDemoUrl === '#') {
      e.preventDefault();
      triggerToast(`Live demo for "${project.title}" will be deployed soon.`);
    }
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-themeBg border-b border-themeBorder overflow-hidden select-none">
      {/* Toast Message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-themePanel border border-themeBorderHeavy text-white shadow-lg flex items-center gap-2.5 text-xs font-semibold"
          >
            {toast.type === 'success' ? (
              <CheckCircle size={14} className="text-green-500" />
            ) : (
              <AlertCircle size={14} className="text-primaryBlue" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glowing Orb */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primaryBlue/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 md:gap-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Works</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-xl">
            A selection of hand-crafted systems and web products showcasing my backend and frontend engineering abilities.
          </p>
        </div>

        {/* Sticky Stacking Cards Deck */}
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 max-w-4xl mx-auto w-full relative">
          {projects.map((project, idx) => {
            const repoData = githubRepos[project.repoName.toLowerCase()];
            const resolvedGithubUrl = repoData ? repoData.githubUrl : project.githubUrl;
            const resolvedDemoUrl = (repoData && repoData.demoUrl) ? repoData.demoUrl : project.demoUrl;

            return (
              <motion.div
                key={project.id}
                style={{ top: `calc(100px + ${idx * 35}px)` }}
                className="md:sticky rounded-2xl sm:rounded-3xl border border-themeBorder bg-themePanel shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-10 items-center">
                  
                  {/* Left Column: Details (Grid: 5/12) */}
                  <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono font-bold text-primaryBlue uppercase tracking-wider">
                        Project {project.id}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-kanit uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Key Features
                      </span>
                      <ul className="flex flex-col gap-1.5 list-none pl-0">
                        {project.features.map((feat, i) => (
                          <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-themeBorder">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[9px] font-bold bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-md border border-themeBorderHeavy uppercase tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={resolvedGithubUrl}
                        target={resolvedGithubUrl === '#' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        onClick={(e) => handleSourceCodeClick(e, resolvedGithubUrl)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-200/50 dark:bg-white/5 hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-xs border border-themeBorderHeavy transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Github size={14} />
                        Code
                      </a>
                      
                      <a
                        href={resolvedDemoUrl}
                        target={resolvedDemoUrl === '#' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        onClick={(e) => handleLiveClick(e, project, resolvedDemoUrl)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-accent-gradient text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Screenshot Visual (Grid: 7/12) */}
                  <div className="md:col-span-7 aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 border border-themeBorder relative group/img cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover/img:scale-105 group-hover/img:opacity-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
