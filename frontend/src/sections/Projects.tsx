import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, AlertCircle, CheckCircle, Database, Layout } from 'lucide-react';

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
  role?: string;
}

const allProjects: Project[] = [
  {
    id: '01',
    title: 'Smart Queue Management System',
    description: 'Collaborated in a team to develop a Smart Queue Management System for hospitals, banks, and colleges. Developed key administrative dashboard portals and scheduled counters.',
    tech: ['Spring Boot (Java)', 'React.js', 'Tailwind CSS', 'MySQL'],
    githubUrl: 'https://github.com/PankajjPatel/Smart-Queue-System.git',
    demoUrl: 'https://github.com/PankajjPatel/Smart-Queue-System.git',
    repoName: 'Smart-Queue-System',
    image: '/project1.png',
    role: 'Database Design & Management',
    features: [
      'Designed and managed MySQL database schemas, relationships, and SQL queries',
      'Supported admin functionalities for managing organizations, staff, and queue records',
      'Engineered relational database triggers and constraints to optimize transaction performance'
    ],
  },
  {
    id: '02',
    title: 'Student Management System',
    description: 'Developed a full-stack student management system handling 500+ records with complete CRUD functionality. Implemented CRUD operations and database integration using MySQL. Designed responsive user interfaces with Tailwind CSS.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'Tailwind CSS'],
    githubUrl: 'https://github.com/PankajjPatel/Campus-Core',
    demoUrl: 'https://campus-core-portal.onrender.com',
    repoName: 'Campus-Core',
    image: '/project2.png',
    features: [
      'Developed a full-stack student management system handling 500+ records with complete CRUD functionality',
      'Implemented CRUD operations and database integration using MySQL',
      'Designed responsive user interfaces with Tailwind CSS',
      'Improved data management through efficient database operations'
    ],
  },
  {
    id: '03',
    title: 'Personal Portfolio Website',
    description: 'Developed a responsive portfolio website to showcase projects and technical skills. Implemented dark/light mode and mobile-friendly layouts. Utilized Git and GitHub for version control and deployment.',
    tech: ['Python', 'Django', 'HTML5', 'Tailwind CSS', 'Git', 'GitHub'],
    githubUrl: 'https://github.com/PankajjPatel/Portfolio_Pankaj',
    demoUrl: 'https://pankaj-portfolio.up.railway.app',
    repoName: 'Portfolio_Pankaj',
    image: '/project3.png',
    features: [
      'Developed a responsive portfolio website to showcase projects and technical skills',
      'Implemented dark/light mode and mobile-friendly layouts',
      'Utilized Git and GitHub for version control and deployment'
    ],
  },
  {
    id: '04',
    title: 'SiteeForgeStudio',
    description: 'Developed a production-grade web application tailored for a web development/design agency. Features a unified setup architecture where a modern React-based SPA frontend is built and served directly as static assets from a Django-based REST API backend.',
    tech: ['Python', 'Django', 'React.js', 'MySQL', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/PankajjPatel/Siteeforgestudio',
    demoUrl: 'https://github.com/PankajjPatel/Siteeforgestudio',
    repoName: 'Siteeforgestudio',
    image: '/project4.png',
    features: [
      'Built a unified setup architecture serving React static assets from Django REST backend',
      'Integrated SMTP mail system to dispatch real-time client leads to agency admins',
      'Designed database schemas for services, founder profiles, testimonials, and contact messages in MySQL'
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
    // Dynamically retrieve repository metadata from GitHub API
    // This allows us to keep the repository links and demo URLs in sync with the live GitHub state
    const fetchGithubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/PankajjPatel/repos');
        if (!response.ok) return;
        interface GitHubRepo {
          name: string;
          html_url: string;
          homepage?: string | null;
        }
        const repos = (await response.json()) as GitHubRepo[];
        
        // Map the API results to a key-value pair where the key is the lowercase repo name.
        // This makes it easy to look up remote repository details for any listed project.
        const repoMap: Record<string, RepoInfo> = {};
        repos.forEach((repo) => {
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


  const handleLiveClick = (e: React.MouseEvent, project: Project, resolvedDemoUrl: string) => {
    if (project.title === 'Personal Portfolio Website' && window.location.hostname !== 'localhost') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerToast('You are currently viewing this live portfolio!', 'success');
      return;
    }
    if (resolvedDemoUrl === '#' || !resolvedDemoUrl) {
      e.preventDefault();
      triggerToast(`Live demo for "${project.title}" will be deployed soon.`);
    }
  };

  const featuredProject = allProjects[0];
  const secondaryProjects = allProjects.slice(1);

  return (
    <section id="projects" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Toast Message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-themePanel border border-themeBorderHeavy text-slate-800 dark:text-white shadow-lg flex items-center gap-2.5 text-xs font-semibold"
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

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Works</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Projects
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Hand-crafted solutions demonstrating automation, database optimizations, and full-stack developments.
          </p>
        </div>

        {/* 1. FEATURED PROJECT SHOWCASE CARD */}
        <div className="mb-10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primaryBlue mb-3 font-mono flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue animate-ping" />
            <span>Featured Showcase</span>
          </div>

          {(() => {
            const repoData = githubRepos[featuredProject.repoName.toLowerCase()];
            const resolvedGithubUrl = repoData ? repoData.githubUrl : featuredProject.githubUrl;
            const resolvedDemoUrl = (repoData && repoData.demoUrl) ? repoData.demoUrl : featuredProject.demoUrl;

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.01,
                  borderColor: 'rgba(59, 130, 246, 0.25)',
                  boxShadow: '0 10px 20px -10px rgba(59, 130, 246, 0.12)'
                }}
                className="rounded-3xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 p-5 sm:p-8 flex flex-col gap-6 transition-all duration-300"
              >
                {/* Image Showcase */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 border border-themeBorder relative group cursor-pointer">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primaryBlue px-2.5 py-1 rounded text-white flex items-center gap-1.5">
                      <Database size={11} /> Team Project
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                        {featuredProject.title}
                      </h3>
                      {featuredProject.role && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-primaryBlue border border-blue-500/15">
                          Role: {featuredProject.role}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-1">
                      {featuredProject.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-themeBorder">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                      Database & Schema Management Focus:
                    </span>
                    <ul className="flex flex-col gap-1.5 list-none pl-0">
                      {featuredProject.features.map((feat, i) => (
                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-tight">
                          <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[9px] font-bold bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-slate-400 rounded-md border border-themeBorderHeavy uppercase tracking-wider font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={resolvedGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-zinc-800/80 text-slate-900 dark:text-white font-semibold text-xs border border-themeBorderHeavy transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Github size={13} />
                      Code Repository
                    </a>
                    
                    <a
                      href={resolvedDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink size={13} />
                      View Demo Link
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* 2. SECONDARY PROJECTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {secondaryProjects.map((project, idx) => {
            const repoData = githubRepos[project.repoName.toLowerCase()];
            const resolvedGithubUrl = repoData ? repoData.githubUrl : project.githubUrl;
            const resolvedDemoUrl = (repoData && repoData.demoUrl) ? repoData.demoUrl : project.demoUrl;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.01,
                  borderColor: 'rgba(59, 130, 246, 0.25)',
                  boxShadow: '0 10px 20px -10px rgba(59, 130, 246, 0.12)'
                }}
                className="rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 p-5 flex flex-col gap-4 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-[1.6] rounded-xl overflow-hidden bg-black/40 border border-themeBorder relative group cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-900/90 text-slate-300 border border-white/5">
                      <Layout size={9} /> {project.title.includes('Portfolio') ? 'Personal' : 'Core App'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight font-sans">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[8px] font-bold bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-slate-400 rounded border border-themeBorderHeavy uppercase tracking-wider font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-themeBorder">
                    <a
                      href={resolvedGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-zinc-800/80 text-slate-900 dark:text-white font-semibold text-[10px] border border-themeBorderHeavy transition-colors flex items-center justify-center gap-1"
                    >
                      <Github size={11} />
                      Code
                    </a>
                    
                    <a
                      href={resolvedDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleLiveClick(e, project, resolvedDemoUrl)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-[10px] transition-colors flex items-center justify-center gap-1"
                    >
                      <ExternalLink size={11} />
                      Live Demo
                    </a>
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
