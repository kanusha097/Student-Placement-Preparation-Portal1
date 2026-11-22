import React, { useState } from 'react';
import { 
  TrendingUp, Award, Flame, Target, CheckCircle2, AlertTriangle, 
  Code2, BrainCircuit, FileCheck2, Mic2, ArrowUpRight, BarChart3,
  Calendar, Zap, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProgressAnalytics() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('weekly');

  const readinessScore = user?.placementReadiness || 78;

  const weeklyData = [
    { day: "Mon", coding: 4, hours: 2.5, aptitude: 15 },
    { day: "Tue", coding: 6, hours: 3.2, aptitude: 20 },
    { day: "Wed", coding: 3, hours: 1.8, aptitude: 10 },
    { day: "Thu", coding: 8, hours: 4.0, aptitude: 25 },
    { day: "Fri", coding: 5, hours: 2.7, aptitude: 18 },
    { day: "Sat", coding: 9, hours: 4.5, aptitude: 30 },
    { day: "Sun", coding: 7, hours: 3.5, aptitude: 22 }
  ];

  const monthlyData = [
    { week: "Week 1", coding: 22, hours: 14.5, aptitude: 85 },
    { week: "Week 2", coding: 31, hours: 18.0, aptitude: 110 },
    { week: "Week 3", coding: 28, hours: 16.2, aptitude: 95 },
    { week: "Week 4", coding: 42, hours: 24.5, aptitude: 140 }
  ];

  const currentChartData = timeframe === 'weekly' ? weeklyData : monthlyData;

  const topicStrengths = [
    { topic: "Arrays & Two Pointers", mastery: 92, status: "Mastered", color: "bg-emerald-500" },
    { topic: "Quantitative Aptitude (Time & Work)", mastery: 88, status: "Strong", color: "bg-emerald-500" },
    { topic: "Database Normalization & SQL", mastery: 85, status: "Strong", color: "bg-royal-500" },
    { topic: "Behavioral HR (STAR Framework)", mastery: 82, status: "Proficient", color: "bg-royal-500" }
  ];

  const improvementAreas = [
    { topic: "Dynamic Programming (Knapsack & Trees)", mastery: 58, advice: "Practice 5 medium recursion-memoization problems this week.", link: "/coding" },
    { topic: "Logical Reasoning (Circular Seating)", mastery: 64, advice: "Review step-by-step constraint elimination technique.", link: "/aptitude" },
    { topic: "Operating Systems (Virtual Memory & Thrashing)", mastery: 68, advice: "Revise page fault replacement algorithms in Technical Notes.", link: "/technical" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-royal-600" />
            <span>Progress & Performance Analytics</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Topic-wise mastery, historical accuracy trends, and personalized placement improvement recommendations
          </p>
        </div>

        <div className="flex items-center p-1 bg-purple-50 dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-slate-700">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-royal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'monthly'
                ? 'bg-royal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
            }`}
          >
            Monthly Growth
          </button>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Readiness */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-500">Placement Readiness</span>
            <Target className="w-4 h-4 text-royal-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-royal-600">{readinessScore}%</span>
            <span className="text-[11px] font-bold text-emerald-600">+6% this month</span>
          </div>
          <div className="mt-3 h-2 w-full bg-purple-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-royal-600 to-purple-500 rounded-full" style={{ width: `${readinessScore}%` }} />
          </div>
        </div>

        {/* Coding */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-500">Coding Practice</span>
            <Code2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{user?.codingSolved || 42}</span>
            <span className="text-[11px] font-bold text-slate-500">/ 100 Goal</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Easy: 24</span>
            <span>Med: 15</span>
            <span>Hard: 3</span>
          </div>
        </div>

        {/* Aptitude Accuracy */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-500">Aptitude Accuracy</span>
            <BrainCircuit className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{user?.aptitudeScore || 84}%</span>
            <span className="text-[11px] font-bold text-emerald-600">Top 15%</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium">
            180 Questions attempted across 4 topics
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-500">Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-500">{user?.streak || 12}</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">consecutive days</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 font-medium">
            Personal record: 19 days (May 2025)
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Performance Chart + Topic Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Performance Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-royal-600" />
                <span>{timeframe === 'weekly' ? 'Weekly Daily Practice Velocity' : 'Monthly Performance Trends'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Problems solved vs hours dedicated</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-royal-600">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-600" />
                Problems Solved
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                Study Hours
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800 px-2">
            {currentChartData.map((item, idx) => {
              const label = item.day || item.week;
              const probHeight = Math.min(100, (item.coding / (timeframe === 'weekly' ? 10 : 50)) * 100);
              const hourHeight = Math.min(100, (item.hours / (timeframe === 'weekly' ? 5 : 30)) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Problems Bar */}
                    <div
                      className="w-3 sm:w-4 bg-royal-600 rounded-t-md transition-all group-hover:bg-royal-700 relative"
                      style={{ height: `${probHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {item.coding} Qs
                      </div>
                    </div>
                    {/* Hours Bar */}
                    <div
                      className="w-3 sm:w-4 bg-purple-300 dark:bg-purple-800 rounded-t-md transition-all group-hover:bg-purple-400 relative"
                      style={{ height: `${hourHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-purple-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {item.hours}h
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{label}</span>
                </div>
              );
            })}
          </div>

          {/* Insight Summary Footer */}
          <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
            <span>Peak study velocity achieved on <strong>Saturdays</strong> averaging 4.5 hours.</span>
            <span className="font-bold text-royal-600 dark:text-purple-300">Cohort Rank: #4</span>
          </div>
        </div>

        {/* Strengths & Weaknesses (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Topic Strengths */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Topic-Wise Strengths</span>
            </h3>

            <div className="space-y-3">
              {topicStrengths.map((t, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{t.topic}</span>
                    <span className="text-emerald-600">{t.mastery}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.mastery}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Improvement Areas */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Recommended Improvement Areas</span>
            </h3>

            <div className="space-y-3">
              {improvementAreas.map((imp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{imp.topic}</span>
                    <span className="text-[10px] font-black text-amber-600">{imp.mastery}% Mastery</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                    {imp.advice}
                  </p>
                  <Link
                    to={imp.link}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-royal-600 dark:text-purple-400 hover:underline pt-0.5"
                  >
                    <span>Practice now</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
