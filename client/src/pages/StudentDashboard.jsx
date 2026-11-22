import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  BrainCircuit, 
  FileCheck2, 
  Mic2, 
  TrendingUp, 
  Flame, 
  Target, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  BookOpenCheck,
  Building2,
  Sparkles,
  BarChart2,
  Calendar,
  CheckSquare,
  Square,
  Lock,
  ChevronRight,
  Zap,
  Activity,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartMetric, setChartMetric] = useState('problems'); // 'problems' or 'hours'
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await progressAPI.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggleGoal = async (goalId) => {
    if (!dashboardData) return;
    const updatedGoals = dashboardData.dailyGoals.map(g => 
      g.id === goalId ? { ...g, completed: !g.completed } : g
    );
    setDashboardData({
      ...dashboardData,
      dailyGoals: updatedGoals
    });
    await progressAPI.toggleGoal(goalId);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = dashboardData?.stats || {
    codingSolved: user?.codingSolved || 42,
    codingEasy: 24,
    codingMedium: 15,
    codingHard: 3,
    aptitudeScore: user?.aptitudeScore || 84.5,
    aptitudeAttempted: 18,
    aptitudeAccuracy: '88.5%',
    mockTestsTaken: user?.mockTestsTaken || 6,
    mockAverageScore: '82%',
    highestMockPercentile: 94,
    interviewScore: user?.interviewScore || 80,
    interviewsCompleted: 4,
    placementReadiness: user?.placementReadiness || 78,
    streak: user?.streak || 12
  };

  const dailyGoals = dashboardData?.dailyGoals || [];
  const completedGoalsCount = dailyGoals.filter(g => g.completed).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Welcome & Readiness Hero Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-royal-800 via-royal-700 to-indigo-900 text-white shadow-xl shadow-royal-600/20 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-purple-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Placement Season 2026</span>
              </span>
              <span className="text-xs text-purple-200 font-medium">
                {user?.collegeName || "NIT"} • {user?.branch || "Computer Science"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {getTimeGreeting()}, {user?.fullName ? user.fullName.split(' ')[0] : 'Student'}! 👋
            </h1>

            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
              You are currently on a <span className="font-bold text-amber-300">{stats.streak}-day learning streak</span>. 
              Keep up the momentum to reach your placement goal of <strong className="text-white">85%+ readiness</strong> before campus recruitment begins.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/coding?id=1"
                className="px-4 py-2 rounded-xl bg-white text-royal-700 hover:bg-purple-50 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Solve Today's Challenge</span>
              </Link>
              <Link
                to="/mock-tests"
                className="px-4 py-2 rounded-xl bg-royal-600/70 hover:bg-royal-600 text-white border border-white/20 font-bold text-xs transition-all"
              >
                Take Company Mock
              </Link>
            </div>
          </div>

          {/* Placement Readiness Gauge Card */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center flex flex-col items-center min-w-[220px]">
            <span className="text-[11px] font-bold tracking-wider text-purple-200 uppercase">
              Placement Readiness Score
            </span>
            <div className="my-2 flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-black text-amber-300">{stats.placementReadiness}%</span>
            </div>
            
            {/* Meter Bar */}
            <div className="w-full h-2 rounded-full bg-black/30 overflow-hidden mb-2">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-700" 
                style={{ width: `${stats.placementReadiness}%` }}
              />
            </div>

            <span className="text-[11px] text-purple-100 font-medium">
              Ahead of <strong className="text-white">84%</strong> of batch peers
            </span>
          </div>
        </div>
      </div>

      {/* 2. Four Core Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Coding Solved */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coding Problems</span>
            <div className="p-2 rounded-xl bg-royal-100 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.codingSolved}</p>
            <span className="text-xs text-slate-400">/ {stats.totalCodingAvailable || 65} total</span>
          </div>

          {/* Difficulty progress bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div style={{ width: `${(stats.codingEasy / stats.codingSolved) * 100}%` }} className="bg-emerald-500" title="Easy" />
              <div style={{ width: `${(stats.codingMedium / stats.codingSolved) * 100}%` }} className="bg-amber-500" title="Medium" />
              <div style={{ width: `${(stats.codingHard / stats.codingSolved) * 100}%` }} className="bg-rose-500" title="Hard" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400">{stats.codingEasy} Easy</span>
              <span className="text-amber-600 dark:text-amber-400">{stats.codingMedium} Med</span>
              <span className="text-rose-600 dark:text-rose-400">{stats.codingHard} Hard</span>
            </div>
          </div>
        </div>

        {/* Card 2: Aptitude Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aptitude Score</span>
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.aptitudeScore}%</p>
            <span className="text-xs text-emerald-600 font-semibold">Accuracy: {stats.aptitudeAccuracy}</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {stats.aptitudeAttempted} practice sets across Quant, Logical & Verbal
          </p>
        </div>

        {/* Card 3: Mock Test Performance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mock Examinations</span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.mockTestsTaken}</p>
            <span className="text-xs text-slate-400">completed</span>
          </div>
          <p className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            Highest: {stats.highestMockPercentile}th percentile (TCS NQT)
          </p>
        </div>

        {/* Card 4: AI Interview Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Progress</span>
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Mic2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.interviewScore}/100</p>
            <span className="text-xs text-emerald-600 font-semibold">STAR Aligned</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {stats.interviewsCompleted} sessions evaluated with AI feedback
          </p>
        </div>

      </div>

      {/* 3. Middle Section: Daily Goals & Interactive Weekly Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Daily Learning Goals (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-royal-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Daily Learning Goals</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300">
              {completedGoalsCount} of {dailyGoals.length} Completed
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Click any task to mark it done. Completing daily tasks keeps your learning streak active!
          </p>

          <div className="space-y-2.5 pt-1">
            {dailyGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleToggleGoal(goal.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  goal.completed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                    : 'bg-purple-50/40 dark:bg-slate-800/40 border-purple-100 dark:border-slate-700 hover:border-royal-400'
                }`}
              >
                <button type="button" className="mt-0.5 shrink-0 text-slate-400">
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold leading-relaxed ${goal.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                    {goal.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-royal-100 dark:bg-royal-900/60 text-royal-700 dark:text-royal-300">
                      {goal.category}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      +{goal.xp} XP
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Weekly Performance Graph (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-royal-600" />
                <span>Weekly Performance Activity</span>
              </h3>
              <p className="text-xs text-slate-500">Practice consistency over the last 7 days</p>
            </div>

            {/* Metric Toggle */}
            <div className="flex p-1 rounded-xl bg-purple-50 dark:bg-slate-800 text-xs font-bold">
              <button
                onClick={() => setChartMetric('problems')}
                className={`px-3 py-1 rounded-lg transition-all ${chartMetric === 'problems' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
              >
                Problems Solved
              </button>
              <button
                onClick={() => setChartMetric('hours')}
                className={`px-3 py-1 rounded-lg transition-all ${chartMetric === 'hours' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
              >
                Study Hours
              </button>
            </div>
          </div>

          {/* Stylized Bar Chart */}
          <div className="h-48 pt-6 pb-2 border-b border-purple-50 dark:border-slate-800 flex items-end justify-between gap-3 px-2">
            {(dashboardData?.weeklyTrends || []).map((trend, idx) => {
              const value = chartMetric === 'problems' ? trend.problems : trend.hours;
              const maxVal = chartMetric === 'problems' ? 20 : 5.0;
              const heightPercent = `${Math.min(100, (value / maxVal) * 100)}%`;

              return (
                <div 
                  key={trend.day}
                  onMouseEnter={() => setHoveredBar(trend)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                >
                  {/* Tooltip */}
                  {hoveredBar?.day === trend.day && (
                    <div className="absolute -top-10 px-2 py-1 bg-slate-900 text-white text-[10px] rounded-md shadow-lg whitespace-nowrap z-20 font-mono">
                      {chartMetric === 'problems' ? `${trend.problems} problems` : `${trend.hours} hrs`}
                    </div>
                  )}

                  <div 
                    className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-royal-600 via-royal-500 to-lavender-400 group-hover:from-royal-700 group-hover:to-lavender-300 transition-all shadow-sm"
                    style={{ height: heightPercent }}
                  />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{trend.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-royal-700 dark:text-royal-300">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              Highest Day: Saturday (16 problems, 4.5 hrs)
            </span>
            <Link to="/analytics" className="font-bold text-royal-600 hover:underline">
              Full Analytics →
            </Link>
          </div>
        </div>

      </div>

      {/* 4. Learning Streak Calendar & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Learning Streak Tracker (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span>Learning Streak</span>
            </h3>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600">
              {stats.streak} Days
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Consistent daily practice dramatically increases cognitive speed during placement tests.
          </p>

          {/* 7-day pill row */}
          <div className="grid grid-cols-7 gap-1.5 pt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-sm">
                  <Flame className="w-4 h-4 fill-white" />
                </div>
                <span className="text-[10px] font-bold text-slate-500">{d}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300">Next Milestone:</span>
            <p className="text-slate-600 dark:text-slate-300">Reach a 15-day streak to unlock the "Placement Warrior" profile badge.</p>
          </div>
        </div>

        {/* Recent Activities (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-royal-600" />
              <span>Recent Activity Feed</span>
            </h3>
            <span className="text-xs text-slate-500">Auto-recorded from all modules</span>
          </div>

          <div className="space-y-3">
            {(dashboardData?.recentActivities || []).map((act) => (
              <div 
                key={act.id} 
                className="p-3.5 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-purple-200 dark:border-slate-600 flex items-center justify-center text-royal-600 shrink-0">
                    {act.type === 'coding' && <Code2 className="w-4 h-4" />}
                    {act.type === 'aptitude' && <BrainCircuit className="w-4 h-4" />}
                    {act.type === 'interview' && <Mic2 className="w-4 h-4" />}
                    {act.type === 'resume' && <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{act.title}</h4>
                    <p className="text-[11px] text-slate-500">{act.time} • <span className="font-semibold text-emerald-600">{act.score}</span></p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 shrink-0">
                  {act.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Personalized Recommendations Based on Campus Drives */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-royal-600" />
            <span>Recommended for Your Target Companies</span>
          </h3>
          <Link to="/companies" className="text-xs font-bold text-royal-600 hover:underline">
            View All 7 Companies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(dashboardData?.recommendations || []).map((rec) => (
            <div 
              key={rec.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:border-royal-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-royal-700 dark:text-royal-300 uppercase">
                  {rec.company}
                </span>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white mt-1">{rec.title}</h4>
                <p className="text-xs text-slate-500">{rec.reason}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-50 dark:border-slate-800 flex justify-end">
                <Link
                  to={rec.link}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Achievement Badges Showcase */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Placement Preparation Badges</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            5 of 6 Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(dashboardData?.achievements || []).map((ach) => (
            <div 
              key={ach.id}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                ach.unlocked
                  ? 'bg-purple-50/50 dark:bg-slate-800/60 border-purple-200 dark:border-slate-700'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                ach.unlocked ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' : 'bg-slate-200 text-slate-400'
              }`}>
                {ach.unlocked ? <Award className="w-5 h-5 text-amber-300" /> : <Lock className="w-4 h-4" />}
              </div>
              <div>
                <p className="font-bold text-xs text-slate-800 dark:text-white">{ach.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
