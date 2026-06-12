import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Award, Cpu } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: 'Web Development',
    description: 'Responsive and modern websites with excellent performance, SEO optimisation, and pixel-perfect design.',
    icon: <Layout className="w-8 h-8 text-accentViolet" />,
  },
  {
    title: 'Django Development',
    description: 'Custom web applications, REST APIs, microservices, secure backend systems, and admin control panels.',
    icon: <Server className="w-8 h-8 text-accentPurple" />,
  },
  {
    title: 'Database Design',
    description: 'Efficient MySQL database architecture, normalization, performance optimization, indexing, and modeling.',
    icon: <Database className="w-8 h-8 text-[#00758F]" />,
  },
  {
    title: 'Portfolio Website Design',
    description: 'Professional personal, creative, and business portfolios tailored to get you hired and stand out from peers.',
    icon: <Award className="w-8 h-8 text-accentOrange" />,
  },
  {
    title: 'AI-Assisted Development',
    description: 'Building modern AI-powered workflows, automated pipelines, prompt engineering, and LLM API integrations.',
    icon: <Cpu className="w-8 h-8 text-[#10B981]" />,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 px-6 bg-white dark:bg-darkBg text-black dark:text-white overflow-hidden transition-all duration-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accentViolet/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentOrange/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-accentPurple">What I Offer</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            My Services
          </h2>
          <p className="text-slate-500 dark:text-gray-400 font-light text-base max-w-xl">
            Providing high-quality development solutions to bring your digital concepts to life with professional engineering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)'
              }}
              className="group bg-slate-50 border border-slate-100 dark:bg-white/[0.02] dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-white/[0.04] hover:border-accentViolet/20 dark:hover:border-accentViolet/30 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[280px]"
            >
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-md dark:shadow-none border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-gray-100 group-hover:text-accentPurple dark:group-hover:text-accentViolet transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300 font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 h-1 w-0 group-hover:w-full bg-accent-gradient rounded-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
