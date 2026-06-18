import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, AlertCircle } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

const certificates: Certificate[] = [
  { title: 'OCI 2025 Certified Generative AI Professional', issuer: 'Oracle', year: '2025', credentialId: 'OCI-GENAI-2025' },
  { title: 'OCI 2025 Certified AI Foundations Associate', issuer: 'Oracle', year: '2025', credentialId: 'OCI-AIF-2025' },
  { title: 'AWS Academy Graduate - Cloud Foundations', issuer: 'Amazon Web Services (AWS)', year: '2025', credentialId: 'AWS-ACAD-CF' },
  { title: 'Python Essentials I and II', issuer: 'Cisco Networking Academy', year: '2024', credentialId: 'CISCO-PY-ESS' },
];

export const Certifications: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);

  const handleCertClick = (cert: Certificate) => {
    const filename = cert.credentialId ? `${cert.credentialId}.pdf` : `${cert.title.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    setToast(`Opening ${cert.issuer} Certificate PDF...`);
    setTimeout(() => setToast(null), 3000);
    window.open(`/certificates/${filename}`, '_blank');
  };

  return (
    <section id="certifications" className="relative py-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-themePanel border border-themeBorderHeavy text-slate-800 dark:text-white shadow-lg flex items-center gap-2.5 text-xs font-semibold"
          >
            <AlertCircle size={14} className="text-primaryBlue" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Credentials</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Certifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Verified academic and industry qualifications in cloud computing, AI, and scripting.
          </p>
        </div>

        {/* Certificates Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ 
                scale: 1.01,
                borderColor: 'rgba(59, 130, 246, 0.25)',
                boxShadow: '0 10px 20px -10px rgba(59, 130, 246, 0.12)'
              }}
              onClick={() => handleCertClick(cert)}
              className="p-5 rounded-2xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 cursor-pointer hover:bg-themePanel/70 dark:hover:bg-themePanel/40 transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2.5">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-blue-500/10 text-primaryBlue border border-blue-500/10">
                    <Award size={10} /> {cert.issuer}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 font-mono">
                    <Calendar size={10} /> {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors font-sans leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* Bottom footer with ID and action */}
              <div className="flex items-center justify-between pt-2 border-t border-themeBorder">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  {cert.credentialId || 'ID: VERIFIED'}
                </span>
                <span className="text-[10px] font-bold text-primaryBlue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View PDF</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
