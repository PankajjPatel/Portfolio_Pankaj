import React, { useState } from 'react';
import { Award, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

const certificates: Certificate[] = [
  { title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', issuer: 'Oracle Cloud Infrastructure (OCI)', year: '2025', credentialId: 'OCI-GENAI-2025' },
  { title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate', issuer: 'Oracle Cloud Infrastructure (OCI)', year: '2025', credentialId: 'OCI-AIF-2025' },
  { title: 'AWS Academy Graduate – Cloud Foundations', issuer: 'Amazon Web Services (AWS)', year: '2025', credentialId: 'AWS-ACAD-CF' },
  { title: 'Python Essentials', issuer: 'Cisco Networking Academy', year: '2024', credentialId: 'CISCO-PY-ESS' },
  { title: 'Red Hat Linux Fundamentals', issuer: 'Red Hat Academy', year: '2024', credentialId: 'RH-LINUX-FUND' },
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
    <section id="certifications" className="relative py-28 px-6 bg-[#0C0C0C] border-b border-white/5 select-none">
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg bg-[#111827] border border-white/10 text-white shadow-lg flex items-center gap-2.5 text-xs font-semibold">
          <AlertCircle size={14} className="text-primaryBlue" />
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent-gradient" />
            <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Achievements</span>
            <span className="h-[2px] w-8 bg-accent-gradient" />
          </div>
          <h2 className="text-[10vw] sm:text-[7vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
            Certifications
          </h2>
          <p className="text-slate-400 font-light text-base max-w-xl">
            Professional credentials in cloud infrastructure, AI concepts, Linux administration, and programming.
          </p>
        </div>

        {/* Timeline list */}
        <div className="relative border-l border-white/5 pl-6 md:pl-8 ml-4 md:ml-6 flex flex-col gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              onClick={() => handleCertClick(cert)}
              className="relative flex flex-col gap-2 group cursor-pointer"
            >
              {/* Checkpoint bullet */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#0C0C0C] border border-white/10 flex items-center justify-center group-hover:border-primaryBlue group-hover:bg-[#111827] transition-colors">
                <CheckCircle size={12} className="text-slate-500 group-hover:text-primaryBlue transition-colors" />
              </span>

              {/* Certificate Card */}
              <div 
                className="p-5 rounded-2xl border border-white/5 bg-[#111827]/80 shadow-md hover:border-primaryBlue/40 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span className="flex items-center gap-1.5 text-primaryBlue">
                    <Award size={13} />
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {cert.year}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-white group-hover:text-secondaryBlue transition-colors">
                  {cert.title}
                </h3>
                
                {cert.credentialId && (
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    Credential ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
