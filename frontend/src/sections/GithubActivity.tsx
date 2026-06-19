import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Users, GitCommit, Code } from 'lucide-react';

interface GitHubStats {
  repos: number;
  followers: number;
  contributions: number;
  languages: { name: string; percentage: number; color: string }[];
}

const fallbackStats: GitHubStats = {
  repos: 4,
  followers: 0,
  contributions: 70,
  languages: [
    { name: 'HTML/CSS', percentage: 40, color: 'bg-orange-500' },
    { name: 'JavaScript', percentage: 35, color: 'bg-yellow-500' },
    { name: 'TypeScript', percentage: 20, color: 'bg-blue-600' },
    { name: 'Python', percentage: 5, color: 'bg-blue-500' }
  ]
};

export const GithubActivity: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats>(fallbackStats);


  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/PankajjPatel');
        if (!userRes.ok) {

          return;
        }
        const userData = await userRes.ok ? await userRes.json() : null;

        const reposRes = await fetch('https://api.github.com/users/PankajjPatel/repos?per_page=100');
        let starCount = 0;
        const langCounts: Record<string, number> = {};

        if (reposRes.ok) {
          interface GitHubRepo {
            stargazers_count: number;
            language: string | null;
          }
          const reposData = (await reposRes.json()) as GitHubRepo[];
          reposData.forEach((repo) => {
            starCount += repo.stargazers_count;
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
          });
        }

        // Calculate language breakdown percentages
        const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const languageColors: Record<string, string> = {
          Python: 'bg-blue-500',
          JavaScript: 'bg-yellow-500',
          TypeScript: 'bg-blue-600',
          HTML: 'bg-orange-500',
          CSS: 'bg-purple-500',
          Shell: 'bg-gray-600',
          Vue: 'bg-emerald-500'
        };

        const languages = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / (totalLangs || 1)) * 100),
            color: languageColors[name] || 'bg-slate-500'
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        setStats({
          repos: userData?.public_repos ?? fallbackStats.repos,
          followers: userData?.followers ?? fallbackStats.followers,
          contributions: 70,
          languages: languages.length > 0 ? languages : fallbackStats.languages
        });
      } catch (err) {
        console.error('Error fetching GitHub user details:', err);
      } finally {

      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="relative py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[30%] left-10 w-[200px] h-[200px] bg-primaryBlue/5 rounded-full filter blur-[90px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue">Contributions</span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            GitHub Activity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Real-time developer analytics fetched directly from my GitHub profile.
          </p>
        </div>

        {/* Outer Card Compartment */}
        <div className="rounded-3xl border border-themeBorder bg-themePanel/45 dark:bg-themePanel/25 p-5 sm:p-8 flex flex-col gap-6 shadow-sm">
          {/* Header row: GitHub Logo and Follow button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-themeBorderHeavy">
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white leading-none">
                  PankajjPatel
                </h3>
                <span className="text-[9px] font-semibold text-slate-500 tracking-wider font-mono">
                  github.com/PankajjPatel
                </span>
              </div>
            </div>

            <a
              href="https://github.com/PankajjPatel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-themeBorder bg-themePanel hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-[10px] uppercase tracking-wider transition-all active:scale-95"
            >
              <span>Follow</span>
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 text-center flex flex-col items-center justify-center">
              <Folder className="w-4 h-4 text-blue-500 mb-1" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.repos}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Repositories
              </span>
            </div>

            <div className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 text-center flex flex-col items-center justify-center">
              <Users className="w-4 h-4 text-emerald-500 mb-1" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.followers}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Followers
              </span>
            </div>

            <div className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 text-center flex flex-col items-center justify-center">
              <GitCommit className="w-4 h-4 text-amber-500 mb-1" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.contributions}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Contributions
              </span>
            </div>
          </div>

          {/* Languages Breakdown */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-themeBorder bg-slate-200/20 dark:bg-white/5">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
              <Code size={12} />
              <span>Most Used Languages</span>
            </div>

            <div className="flex flex-col gap-3">
              {stats.languages.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-300">{lang.name}</span>
                    <span className="text-slate-500 font-mono">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${lang.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Graph Calendar */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Contribution Calendar
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/35 border border-themeBorder flex items-center justify-center select-none overflow-hidden">
              <img
                src="https://ghchart.rshah.org/2563EB/PankajjPatel"
                alt="Pankaj Patel's GitHub Contributions"
                className="w-full h-auto dark:invert dark:hue-rotate-180 dark:contrast-[1.15]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ghchart.rshah.org/3b82f6/PankajjPatel';
                }}
              />
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center justify-end gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              <span>Less</span>
              <span className="w-2 h-2 rounded-sm bg-slate-900 border border-themeBorder" />
              <span className="w-2 h-2 rounded-sm bg-blue-900/30 border border-themeBorder" />
              <span className="w-2 h-2 rounded-sm bg-blue-700/50 border border-themeBorder" />
              <span className="w-2 h-2 rounded-sm bg-blue-500/70 border border-themeBorder" />
              <span className="w-2 h-2 rounded-sm bg-primaryBlue border border-themeBorder" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
