import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, Folder, Users, GitCommit, Star, Code, RefreshCw, GitPullRequest, ExternalLink, Flame, Activity } from 'lucide-react';

interface GitHubStats {
  repos: number;
  followers: number;
  following: number;
  totalStars: number;
  contributions: number;
  languages: { name: string; percentage: number; color: string }[];
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  tooltip?: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
  };
}

const fallbackStats: GitHubStats = {
  repos: 4,
  followers: 1,
  following: 2,
  totalStars: 5,
  contributions: 1549,
  languages: [
    { name: 'Python', percentage: 48, color: 'bg-blue-500' },
    { name: 'TypeScript', percentage: 28, color: 'bg-blue-600' },
    { name: 'JavaScript', percentage: 14, color: 'bg-yellow-500' },
    { name: 'HTML/CSS', percentage: 10, color: 'bg-orange-500' }
  ]
};

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const GITHUB_USERNAME = 'PankajjPatel';

// Helper to format date cleanly
const formatDateTooltip = (dateStr: string, count: number, originalTooltip?: string) => {
  if (originalTooltip && originalTooltip.trim().length > 0) {
    return originalTooltip;
  }
  const dateObj = new Date(dateStr + 'T00:00:00');
  const formatted = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  if (count === 0) {
    return `No contributions on ${formatted}`;
  } else if (count === 1) {
    return `1 contribution on ${formatted}`;
  } else {
    return `${count} contributions on ${formatted}`;
  }
};

// Helper to calculate time ago
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

// Build 7 rows (Sunday=0 to Saturday=6) x N columns (weeks)
const buildCalendarWeeks = (days: ContributionDay[]) => {
  if (days.length === 0) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  const firstDate = new Date(days[0].date + 'T00:00:00');
  const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday, 6 is Saturday

  // Pad days before the first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

// Compute month label positions
const computeMonthLabels = (weeks: (ContributionDay | null)[][]) => {
  const labels: { month: string; colIndex: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, colIndex) => {
    const firstValidDay = week.find((day) => day !== null);
    if (firstValidDay) {
      const date = new Date(firstValidDay.date + 'T00:00:00');
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
  const [selectedYear, setSelectedYear] = useState<string>('last');
  const [totalContributions, setTotalContributions] = useState<number>(1549);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'calendar' | 'events'>('calendar');
  const [recentEvents, setRecentEvents] = useState<GitHubEvent[]>([]);
  const [hoveredDay, setHoveredDay] = useState<{
    tooltip: string;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub User Profile & Repos for Live Stats
  const fetchProfileAndStats = async () => {
    try {
      // 1. Fetch user basic info
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      const userData = userRes.ok ? await userRes.json() : null;

      // 2. Fetch user repositories (up to 100)
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
      let stars = 0;
      const langCounts: Record<string, number> = {};

      if (reposRes.ok) {
        interface RepoItem {
          stargazers_count?: number;
          language?: string | null;
        }
        const reposData = (await reposRes.json()) as RepoItem[];
        reposData.forEach((repo) => {
          stars += repo.stargazers_count || 0;
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });
      }

      const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
      const languageColors: Record<string, string> = {
        Python: 'bg-blue-500',
        JavaScript: 'bg-yellow-400',
        TypeScript: 'bg-blue-600',
        HTML: 'bg-orange-500',
        CSS: 'bg-purple-500',
        Java: 'bg-red-600',
        Shell: 'bg-emerald-600',
        C: 'bg-slate-500',
        'C++': 'bg-pink-600',
        SQL: 'bg-cyan-500'
      };

      const languages = Object.entries(langCounts)
        .map(([name, count]) => ({
          name,
          percentage: Math.round((count / (totalLangs || 1)) * 100),
          color: languageColors[name] || 'bg-primaryBlue'
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 4);

      setStats((prev) => ({
        ...prev,
        repos: userData?.public_repos ?? prev.repos,
        followers: userData?.followers ?? prev.followers,
        following: userData?.following ?? prev.following,
        totalStars: stars,
        languages: languages.length > 0 ? languages : fallbackStats.languages
      }));
    } catch (err) {
      console.error('Error fetching live GitHub user stats:', err);
    }
  };

  // Fetch Live GitHub Activity Stream (PushEvents, commits)
  const fetchRecentEvents = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=12`);
      if (res.ok) {
        const events = (await res.json()) as GitHubEvent[];
        const filtered = events.filter((e) => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'WatchEvent');
        setRecentEvents(filtered.length > 0 ? filtered : events.slice(0, 6));
      }
    } catch (err) {
      console.error('Error fetching GitHub live events:', err);
    }
  };

  // Fetch Real Contributions Calendar Data
  const fetchContributions = async (year: string) => {
    setIsLoading(true);
    try {
      // Primary: High-speed Public GitHub Contributions API
      const primaryUrl = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`;
      const response = await fetch(primaryUrl);

      if (response.ok) {
        const data = await response.json();
        const rawContributions: { date: string; count: number; level: number }[] = data.contributions || [];
        
        let sumTotal = 0;
        if (data.total) {
          if (typeof data.total === 'number') {
            sumTotal = data.total;
          } else if (typeof data.total === 'object') {
            sumTotal = data.total[year] || Object.values(data.total as Record<string, number>).reduce((a, b) => a + b, 0);
          }
        }
        if (!sumTotal && rawContributions.length > 0) {
          sumTotal = rawContributions.reduce((acc, curr) => acc + (curr.count || 0), 0);
        }

        const mapped: ContributionDay[] = rawContributions.map((d) => ({
          date: d.date,
          count: d.count,
          level: d.level,
          tooltip: formatDateTooltip(d.date, d.count)
        }));

        setContributionsData(mapped);
        setTotalContributions(sumTotal || 1549);
        setStats((prev) => ({ ...prev, contributions: sumTotal || 1549 }));
        setIsLoading(false);
        return;
      }

      // Fallback: Custom Backend Django Proxy
      const backendUrl = `${apiBaseUrl}/api/contact/github-contributions/?year=${year}&username=${GITHUB_USERNAME}`;
      const backendRes = await fetch(backendUrl);
      if (backendRes.ok) {
        const data = await backendRes.json();
        const mapped: ContributionDay[] = (data.contributions || []).map((d: any) => ({
          date: d.date,
          count: d.count || (d.level > 0 ? d.level * 3 : 0),
          level: d.level,
          tooltip: d.tooltip || formatDateTooltip(d.date, d.count || 0)
        }));
        setContributionsData(mapped);
        setTotalContributions(data.total || mapped.reduce((acc, curr) => acc + curr.count, 0));
        setStats((prev) => ({ ...prev, contributions: data.total }));
      }
    } catch (err) {
      console.error('Error fetching contributions, using fallback parse:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchProfileAndStats(),
      fetchRecentEvents(),
      fetchContributions(selectedYear)
    ]);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    fetchProfileAndStats();
    fetchRecentEvents();
  }, []);

  useEffect(() => {
    fetchContributions(selectedYear);
  }, [selectedYear]);

  const weeksGrid = useMemo(() => buildCalendarWeeks(contributionsData), [contributionsData]);
  const monthLabels = useMemo(() => computeMonthLabels(weeksGrid), [weeksGrid]);

  // GitHub Theme Colors for levels (0, 1, 2, 3, 4)
  const getCellColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'fill-[#9be9a8] hover:fill-[#40c463] dark:fill-[#0e4429] dark:hover:fill-[#1a6e3d]';
      case 2:
        return 'fill-[#40c463] hover:fill-[#30a14e] dark:fill-[#006d32] dark:hover:fill-[#009b45]';
      case 3:
        return 'fill-[#30a14e] hover:fill-[#216e39] dark:fill-[#26a641] dark:hover:fill-[#39d353]';
      case 4:
        return 'fill-[#216e39] hover:fill-[#1b5e20] dark:fill-[#39d353] dark:hover:fill-[#58f375]';
      case 0:
      default:
        return 'fill-[#ebedf0] hover:fill-[#d0d7de] dark:fill-[#161b22] dark:hover:fill-[#30363d]';
    }
  };

  return (
    <section id="github" className="relative py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primaryBlue/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-3xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primaryBlue flex items-center gap-1">
              <Activity size={12} /> Live GitHub Sync
            </span>
            <span className="h-[2px] w-6 bg-primaryBlue/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            GitHub Activity & Metrics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Live developer analytics, active contribution calendar, and commit activity fetched straight from GitHub.
          </p>
        </div>

        {/* Outer Card Compartment */}
        <div className="rounded-3xl border border-themeBorder bg-themePanel/60 dark:bg-themePanel/30 backdrop-blur-md p-5 sm:p-7 flex flex-col gap-6 shadow-sm">
          {/* Header Row: Profile Info & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-themeBorder">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-200/60 dark:bg-white/5 border border-themeBorderHeavy shadow-inner">
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-none">
                    {GITHUB_USERNAME}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </span>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-500 hover:text-primaryBlue transition-colors font-mono tracking-tight mt-1 flex items-center gap-1"
                >
                  github.com/{GITHUB_USERNAME}
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="Refresh Live Data"
                className="p-2 rounded-xl border border-themeBorder bg-slate-200/40 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-primaryBlue' : ''} />
              </button>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-themeBorder bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-[10px] uppercase tracking-wider transition-all hover:opacity-90 active:scale-95 shadow-sm"
              >
                <span>View Profile</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* 4-Column Live Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Folder className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Repositories
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">
                {stats.repos}
              </span>
            </a>

            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=followers`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Followers
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">
                {stats.followers}
              </span>
            </a>

            <div className="p-3.5 rounded-2xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Total Stars
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">
                {stats.totalStars}
              </span>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl border border-themeBorder bg-slate-200/30 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <GitCommit className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Contributions
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white leading-none text-emerald-500 dark:text-emerald-400">
                {totalContributions.toLocaleString()}+
              </span>
            </a>
          </div>

          {/* Languages Breakdown */}
          <div className="flex flex-col gap-3 p-4 rounded-2xl border border-themeBorder bg-slate-200/20 dark:bg-white/5">
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500">
              <div className="flex items-center gap-1.5">
                <Code size={13} className="text-primaryBlue" />
                <span>Primary Languages (Real-time Repo Scan)</span>
              </div>
              <span className="font-mono text-[9px] text-slate-400">Calculated across all public repos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {stats.languages.map((lang) => (
                <div key={lang.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                      <span className="text-slate-800 dark:text-slate-200 font-mono text-xs">{lang.name}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{lang.percentage}%</span>
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

          {/* Navigation Tabs (Contribution Calendar vs Live Push Events) */}
          <div className="flex items-center justify-between gap-2 border-b border-themeBorder pb-2">
            <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-black/40 p-1 rounded-xl border border-themeBorder">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Contribution Graph
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'events'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Flame size={11} className="text-amber-500" />
                Live Commits ({recentEvents.length})
              </button>
            </div>

            {activeTab === 'calendar' && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[9px] font-mono text-slate-400 font-semibold">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-slate-200/60 dark:bg-zinc-900 border border-themeBorder cursor-pointer focus:outline-none focus:ring-1 focus:ring-primaryBlue"
                >
                  <option value="last">Last 1 Year (Active)</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB 1: CONTRIBUTION GRAPH CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="flex flex-col gap-3">
              {/* Header Label matching GitHub */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                  <span className="text-primaryBlue font-black">{totalContributions.toLocaleString()}</span> contributions in {selectedYear === 'last' ? 'the last year' : selectedYear}
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  Real data from GitHub API
                </span>
              </div>

              {/* Calendar Container Box */}
              <div
                ref={containerRef}
                className="p-3 sm:p-4 rounded-2xl bg-slate-100/90 dark:bg-black/40 border border-themeBorder flex flex-col select-none relative overflow-x-auto overflow-y-visible w-full min-h-[148px]"
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-[110px] w-full gap-2 text-xs text-slate-500 font-mono">
                    <RefreshCw className="animate-spin text-primaryBlue" size={18} />
                    <span>Fetching live GitHub contributions...</span>
                  </div>
                ) : (
                  <div className="w-full min-w-[660px] flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 722 112"
                      className="w-full h-auto text-slate-500 font-mono select-none"
                      style={{ background: 'transparent' }}
                    >
                      {/* Month Labels */}
                      {monthLabels.map((lbl, idx) => (
                        <text
                          key={idx}
                          x={lbl.colIndex * 13 + 30}
                          y={12}
                          className="text-[9px] fill-slate-500 dark:fill-slate-400 font-mono"
                          style={{ fontSize: '9px', fontFamily: 'monospace' }}
                        >
                          {lbl.month}
                        </text>
                      ))}

                      {/* Weekday Labels (Mon, Wed, Fri) */}
                      <text x={6} y={41} className="text-[9px] fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
                        Mon
                      </text>
                      <text x={6} y={67} className="text-[9px] fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
                        Wed
                      </text>
                      <text x={6} y={93} className="text-[9px] fill-slate-400 font-mono" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
                        Fri
                      </text>

                      {/* Contribution Grid Cells */}
                      {weeksGrid.map((week, colIndex) =>
                        week.map((day, rowIndex) => {
                          if (!day) return null;

                          const x = colIndex * 13 + 30;
                          const y = rowIndex * 13 + 20;

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
                                    tooltip: day.tooltip || formatDateTooltip(day.date, day.count),
                                    x: rect.left - parentRect.left + rect.width / 2,
                                    y: rect.top - parentRect.top - 34
                                  });
                                }
                              }}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`transition-all duration-150 cursor-pointer ${getCellColorClass(day.level)}`}
                            />
                          );
                        })
                      )}
                    </svg>
                  </div>
                )}

                {/* Exact Tooltip Floating Popover */}
                {hoveredDay && (
                  <div
                    className="absolute z-50 px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900/95 dark:bg-zinc-900 border border-slate-700/80 dark:border-zinc-700 rounded-lg shadow-xl pointer-events-none -translate-x-1/2 font-mono whitespace-nowrap backdrop-blur-md"
                    style={{ left: hoveredDay.x, top: hoveredDay.y }}
                  >
                    {hoveredDay.tooltip}
                  </div>
                )}
              </div>

              {/* Footer Row with Docs Link and Less/More Legend */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-1">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-semibold text-slate-500 hover:text-primaryBlue dark:hover:text-primaryBlue transition-colors font-mono cursor-pointer"
                >
                  Learn how we count contributions
                </a>

                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
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
          )}

          {/* TAB 2: LIVE RECENT COMMITS & PUSH EVENTS */}
          {activeTab === 'events' && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-semibold px-1">
                <span>Recent Commit Stream</span>
                <span>Live from GitHub Events API</span>
              </div>

              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                {recentEvents.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 font-mono">
                    No recent events found.
                  </div>
                ) : (
                  recentEvents.map((ev) => {
                    const repoShort = ev.repo.name.replace(`${GITHUB_USERNAME}/`, '');
                    const commitMsg = ev.payload.commits?.[0]?.message || `${ev.type.replace('Event', '')} event`;
                    const commitSha = ev.payload.commits?.[0]?.sha?.slice(0, 7);

                    return (
                      <div
                        key={ev.id}
                        className="p-3 rounded-xl border border-themeBorder bg-slate-100/70 dark:bg-white/5 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="p-1.5 rounded-lg bg-primaryBlue/10 text-primaryBlue mt-0.5 shrink-0">
                            {ev.type === 'PushEvent' ? <GitCommit size={13} /> : <GitPullRequest size={13} />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <a
                                href={`https://github.com/${ev.repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-slate-900 dark:text-white hover:text-primaryBlue transition-colors font-mono truncate"
                              >
                                {repoShort}
                              </a>
                              {commitSha && (
                                <span className="px-1.5 py-0.2 text-[8px] font-mono rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400">
                                  {commitSha}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5">
                              {commitMsg}
                            </p>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono text-slate-400 shrink-0 mt-0.5">
                          {timeAgo(ev.created_at)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
