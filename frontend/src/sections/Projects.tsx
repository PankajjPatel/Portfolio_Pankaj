import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Personal Portfolio Website',
    description: 'Responsive portfolio website featuring a premium glassmorphic dark UI, high performance, and smooth animations.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Django', 'MySQL'],
    githubUrl: 'https://github.com/Pankajlucky678/portfolio-react-django',
    demoUrl: '#',
    imageUrl: '/project1.png',
  },
  {
    id: '02',
    title: 'Student Management System',
    description: 'A full-stack web application designed to manage student records, course enrollments, and academic transcripts with robust CRUD operations.',
    tech: ['Python', 'Django', 'MySQL', 'Bootstrap', 'HTML5'],
    githubUrl: 'https://github.com/Pankajlucky678/student-management-system',
    demoUrl: '#',
    imageUrl: '/project2.png',
  },
  {
    id: '03',
    title: 'Smart Queue Management System',
    description: 'A reliable queue management solution designed for hospitals, banks, and colleges, implementing an optimized relational database schema.',
    tech: ['Java Spring Boot', 'MySQL', 'SQL', 'Hibernate', 'Thymeleaf'],
    githubUrl: 'https://github.com/Pankajlucky678/queue-management-system',
    demoUrl: '#',
    imageUrl: '/project3.png',
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden bg-black/[0.02] dark:bg-black/20">
      {/* Background Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accentViolet/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-accentOrange/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-accentOrange">Works</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-light text-base max-w-xl">
            A selection of hand-crafted systems and web products showcasing my engineering abilities and architectural patterns.
          </p>
        </div>

        {/* Project Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                borderColor: 'rgba(182, 0, 168, 0.4)',
                boxShadow: '0 20px 40px -15px rgba(118, 33, 176, 0.25)',
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel border border-black/10 dark:border-white/5 bg-white/[0.01] transition-all duration-300 min-h-[460px] cursor-pointer"
            >
              {/* Top Section */}
              <div className="flex flex-col">
                {/* Image Container with Zoom */}
                <div className="relative overflow-hidden aspect-[16/10] border-b border-black/10 dark:border-white/5">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 z-20 px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur-md rounded-full text-accentOrange border border-white/10 uppercase tracking-widest">
                    Project {project.id}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-accentViolet transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="p-6 pt-0 flex flex-col gap-6">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-bold bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/5 rounded-md uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-800 dark:text-white font-semibold text-xs border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <Github size={14} className="group-hover/btn:rotate-12 transition-transform" />
                    Source Code
                  </a>
                  <a
                    href={project.demoUrl}
                    className="flex-1 py-3 px-4 rounded-xl bg-accent-gradient text-white font-semibold text-xs shadow-glow-violet hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
