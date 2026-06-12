import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface GitHubStats {
  avatar_url: string;
  login: string;
  name: string;
  bio: string;
}

export const GithubActivity: React.FC = () => {
  const [userData, setUserData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/PankajjPatel');
        if (response.ok) {
          const data = await response.json();
          setUserData({
            avatar_url: data.avatar_url,
            login: data.login,
            name: data.name || 'Pankaj Patel',
            bio: data.bio || 'Python Developer | Django Developer',
          });
        }
      } catch (err) {
        console.error('Error fetching GitHub user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const avatarUrl = userData?.avatar_url || 'https://github.com/PankajjPatel.png';

  return (
    <section id="github" className="relative py-28 px-6 bg-[#0C0C0C] border-b border-white/5 overflow-hidden select-none">
      {/* Texture Background Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      {/* Floating profile avatar on the far left - overlapping slightly (matches screenshot style) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block z-20">
        <div className="w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden shadow-lg shadow-black/80 hover:scale-105 transition-transform duration-300">
          <img
            src={avatarUrl}
            alt="Pankaj Patel"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* GitHub Header Row (matches screenshot) */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <Github className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider font-kanit">GitHub Activity</span>
          </div>

          <a
            href="https://github.com/PankajjPatel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-white text-xs font-bold transition-all active:scale-95"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Follow</span>
          </a>
        </div>

        {/* GitHub Activity Main Card */}
        {loading ? (
          <div className="p-8 rounded-3xl border border-white/5 bg-[#111827]/80 shadow-md flex items-center justify-center min-h-[220px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primaryBlue border-t-transparent animate-spin" />
              <span className="text-xs font-semibold text-slate-500 font-mono">Loading contribution calendar...</span>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#111827]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full"
          >
            {/* Header inside the card: Large commits count */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-kanit font-black text-white leading-none">867</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Commits Shipped in the Last 365 Days
              </span>
            </div>

            {/* Contribution Grid Graph (from screenshot) */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center overflow-x-auto select-none">
                <img
                  src="https://ghchart.rshah.org/2563EB/PankajjPatel"
                  alt="Pankaj Patel's GitHub Contributions"
                  className="min-w-[650px] max-w-full h-auto dark:invert dark:hue-rotate-180 dark:contrast-[1.15]"
                  loading="lazy"
                />
              </div>

              {/* Less / More Legend (matches screenshot) */}
              <div className="flex items-center justify-end gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-900/40 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-700/60 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/80 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-primaryBlue border border-white/5" />
                <span>More</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
