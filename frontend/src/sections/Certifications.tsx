import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  color: string;
}

const certificates: Certificate[] = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle Cloud Infrastructure (OCI)',
    year: '2025',
    credentialId: 'OCI-GENAI-2025',
    color: '#F80000', // Red/Orange theme
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle Cloud Infrastructure (OCI)',
    year: '2025',
    credentialId: 'OCI-AIF-2025',
    color: '#00758F', // Oracle blue
  },
  {
    title: 'AWS Academy Graduate – Cloud Foundations',
    issuer: 'Amazon Web Services (AWS)',
    year: '2025',
    credentialId: 'AWS-ACAD-CF',
    color: '#FF9900', // AWS orange
  },
  {
    title: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    credentialId: 'CISCO-PY-ESS',
    color: '#007A87', // Cisco teal
  },
  {
    title: 'Red Hat Linux Fundamentals',
    issuer: 'Red Hat Academy',
    year: '2024',
    credentialId: 'RH-LINUX-FUND',
    color: '#CC0000', // Red Hat red
  },
];

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-accentViolet/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-accentViolet">Achievements</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Certifications
          </h2>
          <p className="text-gray-400 font-light text-base max-w-xl">
            My industry-recognized certifications and professional credentials in AI, cloud systems, and core software engineering.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 pl-6 md:pl-8 ml-4 md:ml-6 flex flex-col gap-12">
          {/* Animated vertical track glow */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent-gradient -translate-x-[0.5px] pointer-events-none" />

          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col gap-2 group"
            >
              {/* Timeline Bullet (Node) */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-darkBg border-2 border-white/20 flex items-center justify-center group-hover:border-accentViolet transition-all duration-300">
                <CheckCircle size={12} className="text-white/40 group-hover:text-accentViolet transition-colors" />
              </span>

              {/* Certificate Card */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                {/* Issuer & Year */}
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <span className="flex items-center gap-1.5 text-accentOrange">
                    <Award size={14} />
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-accentViolet transition-colors duration-300">
                  {cert.title}
                </h3>

                {/* Credential ID */}
                {cert.credentialId && (
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
