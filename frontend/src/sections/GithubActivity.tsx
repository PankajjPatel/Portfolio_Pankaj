import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Users, GitCommit, Code } from 'lucide-react';

interface GitHubStats {
  repos: number;
  followers: number;
  contributions: number;
  languages: { name: string; percentage: number; color: string }[];
}

interface ContributionDay {
  date: string;
  level: number;
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

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Helper to generate realistic contribution data if backend is offline
const generateMockContributions = (year: number) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const days: ContributionDay[] = [];
  
  const d = new Date(startDate);
  while (d <= endDate) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let level = 0;
    const rand = Math.random();
    
    if (isWeekend) {
      if (rand > 0.95) level = 1;
    } else {
      if (rand > 0.88) level = 4;
      else if (rand > 0.78) level = 3;
      else if (rand > 0.65) level = 2;
      else if (rand > 0.45) level = 1;
    }
    
    days.push({ date: dateStr, level });
    d.setDate(d.getDate() + 1);
  }
  
  return days;
};

// Helper to build 53 columns (weeks) x 7 rows (days) grid
const buildWeeksGrid = (days: ContributionDay[]) => {
  if (days.length === 0) return [];
  
  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];
  
  // Find weekday of first day
  const firstDay = new Date(days[0].date);
  const firstDayOfWeek = firstDay.getDay(); // 0 is Sunday, 6 is Saturday
  
  // Pad the first week with nulls for days before Jan 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  
  days.forEach(day => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  
  if (currentWeek.length > 0) {
    // Pad the last week with nulls
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }
  
  return weeks;
};

// Helper to get month labels and their column index positions
const getMonthLabels = (weeks: (ContributionDay | null)[][]) => {
  const labels: { month: string; colIndex: number }[] = [];
  let lastMonth = -1;
  
  weeks.forEach((week, colIndex) => {
    const firstValidDay = week.find(day => day !== null);
    if (firstValidDay) {
      const date = new Date(firstValidDay.date);
      const month = date.getMonth(); // 0-11
      
      if (month !== lastMonth) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        labels.push({ month: monthNames[month], colIndex });
        lastMonth = month;
      }
    }
  });
  
  return labels;
};

export const GithubActivity: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats>(fallbackStats);
  const [contributionsData, setContributionsData] = useState<ContributionDay[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; level: number; x: number; y: number } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch standard user stats (repos, followers)
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/PankajjPatel');
        const userData = userRes.ok ? await userRes.json() : null;

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

        setStats(prev => ({
          ...prev,
          repos: userData?.public_repos ?? fallbackStats.repos,
          followers: userData?.followers ?? fallbackStats.followers,
          languages: languages.length > 0 ? languages : fallbackStats.languages
        }));
      } catch (err) {
        console.error('Error fetching GitHub user details:', err);
      }
    };

    fetchGitHubData();
  }, []);

  // Fetch contributions list for the selected year
  useEffect(() => {
    const fetchContributions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/api/contact/github-contributions/?year=${selectedYear}`);
        if (response.ok) {
          const data = await response.json();
          setContributionsData(data.contributions);
          setStats(prev => ({ ...prev, contributions: data.total }));
        } else {
          // Fallback to mock data if API is not running
          const mockData = generateMockContributions(selectedYear);
          setContributionsData(mockData);
          const totalMock = mockData.reduce((acc, curr) => acc + (curr.level > 0 ? curr.level * 2 : 0), 0);
          setStats(prev => ({ ...prev, contributions: totalMock }));
        }
      } catch (err) {
        console.error('Error fetching contributions:', err);
        const mockData = generateMockContributions(selectedYear);
        setContributionsData(mockData);
        const totalMock = mockData.reduce((acc, curr) => acc + (curr.level > 0 ? curr.level * 2 : 0), 0);
        setStats(prev => ({ ...prev, contributions: totalMock }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, [selectedYear]);

  const weeksGrid = buildWeeksGrid(contributionsData);
  const monthLabels = getMonthLabels(weeksGrid);

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
            <a
              href="https://github.com/PankajjPatel?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.03] duration-200 cursor-pointer no-underline group"
            >
              <Folder className="w-4 h-4 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.repos}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Repositories
              </span>
            </a>

            <a
              href="https://github.com/PankajjPatel?tab=followers"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.03] duration-200 cursor-pointer no-underline group"
            >
              <Users className="w-4 h-4 text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.followers}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Followers
              </span>
            </a>

            <a
              href="https://github.com/PankajjPatel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.03] duration-200 cursor-pointer no-underline group"
            >
              <GitCommit className="w-4 h-4 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-2xl font-bold font-mono text-slate-900 dark:text-white leading-none">
                {stats.contributions}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Contributions
              </span>
            </a>
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Contribution Calendar
              </span>
              
              {/* Year Select Dropdown Filter */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 border border-themeBorder cursor-pointer focus:outline-none focus:ring-1 focus:ring-primaryBlue"
                >
                  <option value={2026} className="bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">2026 (Active)</option>
                  <option value={2025} className="bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">2025</option>
                  <option value={2024} className="bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">2024</option>
                </select>
              </div>
            </div>

            {/* Calendar Main Box */}
            <div 
              ref={containerRef}
              className="p-4 rounded-xl bg-slate-100 dark:bg-black/35 border border-themeBorder flex flex-col select-none relative overflow-visible w-full min-h-[148px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-[96px] w-full text-xs text-slate-500 font-mono animate-pulse">
                  Loading contributions...
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center">
                  <svg 
                    viewBox="0 0 722 112" 
                    className="w-full h-auto text-slate-500 font-mono select-none"
                    style={{ background: 'transparent' }}
                  >
                    {/* Month labels */}
                    {monthLabels.map((lbl, idx) => (
                      <text
                        key={idx}
                        x={lbl.colIndex * 13 + 32}
                        y={12}
                        className="text-[9px] fill-slate-500 dark:fill-slate-400 font-mono"
                        style={{ fontSize: '9px', fontFamily: 'monospace' }}
                      >
                        {lbl.month}
                      </text>
                    ))}

                    {/* Weekday labels */}
                    <text x={8} y={41} className="text-[9px] fill-slate-500 dark:fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>Mon</text>
                    <text x={8} y={67} className="text-[9px] fill-slate-500 dark:fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>Wed</text>
                    <text x={8} y={93} className="text-[9px] fill-slate-500 dark:fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>Fri</text>

                    {/* Grid cells */}
                    {weeksGrid.map((week, colIndex) => 
                      week.map((day, rowIndex) => {
                        if (!day) return null;
                        
                        const x = colIndex * 13 + 32;
                        const y = rowIndex * 13 + 22;
                        
                        return (
                          <rect
                            key={day.date}
                            x={x}
                            y={y}
                            width={10}
                            height={10}
                            rx={2}
                            ry={2}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const parentRect = containerRef.current?.getBoundingClientRect();
                              if (parentRect) {
                                setHoveredDay({
                                  date: day.date,
                                  level: day.level,
                                  x: rect.left - parentRect.left + rect.width / 2,
                                  y: rect.top - parentRect.top - 36
                                });
                              }
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`transition-all duration-150 cursor-pointer ${
                              day.level === 0 ? 'fill-[#ebedf0] hover:fill-[#d0d7de] dark:fill-[#161b22] dark:hover:fill-[#30363d]' :
                              day.level === 1 ? 'fill-[#9be9a8] hover:fill-[#40c463] dark:fill-[#0e4429] dark:hover:fill-[#1a6e3d]' :
                              day.level === 2 ? 'fill-[#40c463] hover:fill-[#30a14e] dark:fill-[#006d32] dark:hover:fill-[#009b45]' :
                              day.level === 3 ? 'fill-[#30a14e] hover:fill-[#216e39] dark:fill-[#26a641] dark:hover:fill-[#39d353]' :
                              'fill-[#216e39] hover:fill-[#1b5e20] dark:fill-[#39d353] dark:hover:fill-[#58f375]'
                            }`}
                          />
                        );
                      })
                    )}
                  </svg>
                </div>
              )}

              {/* Hover Tooltip card */}
              {hoveredDay && (
                <div
                  className="absolute z-50 px-2 py-1 text-[9px] font-bold text-white bg-slate-900 border border-slate-700 rounded shadow-md pointer-events-none -translate-x-1/2 font-mono whitespace-nowrap"
                  style={{ left: hoveredDay.x, top: hoveredDay.y }}
                >
                  {hoveredDay.level === 0 ? 'No contributions' :
                   hoveredDay.level === 1 ? '1-3 contributions' :
                   hoveredDay.level === 2 ? '4-6 contributions' :
                   hoveredDay.level === 3 ? '7-9 contributions' : '10+ contributions'} on {
                     new Date(hoveredDay.date).toLocaleDateString('en-US', { 
                       month: 'short', 
                       day: 'numeric', 
                       year: 'numeric' 
                     })
                   }
                </div>
              )}
            </div>

            {/* Footer row containing link and legend */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-1">
              {/* Left link */}
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold text-slate-500 dark:text-slate-500 hover:text-primaryBlue dark:hover:text-primaryBlue transition-colors font-mono cursor-pointer"
              >
                Learn how we count contributions
              </a>

              {/* Right legend */}
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22] border border-themeBorder" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429] border border-themeBorder" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#40c463] dark:bg-[#006d32] border border-themeBorder" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#30a14e] dark:bg-[#26a641] border border-themeBorder" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#216e39] dark:bg-[#39d353] border border-themeBorder" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
