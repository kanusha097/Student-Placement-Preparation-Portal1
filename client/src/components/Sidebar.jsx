import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  BrainCircuit,
  FileCheck2,
  Mic2,
  BookOpenCheck,
  FileText,
  Building2,
  TrendingUp,
  Trophy,
  ShieldAlert,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Coding Practice', path: '/coding', icon: Code2, badge: '50+ Qs' },
  { name: 'Aptitude Training', path: '/aptitude', icon: BrainCircuit, badge: '4 Topics' },
  { name: 'Mock Examination', path: '/mock-tests', icon: FileCheck2 },
  { name: 'Interview Prep', path: '/interview', icon: Mic2, badge: 'AI Mode' },
  { name: 'Technical Notes', path: '/technical', icon: BookOpenCheck },
  { name: 'Resume Builder', path: '/resume', icon: FileText, badge: 'PDF' },
  { name: 'Company Modules', path: '/companies', icon: Building2, badge: '7 Top MNCs' },
  { name: 'Progress Analytics', path: '/analytics', icon: TrendingUp },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const location = useLocation();

  const readinessScore = user?.placementReadiness || 78;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 
        border-r border-purple-100 dark:border-slate-800 flex flex-col 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation links scroll area */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
            Preparation Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-royal-600 to-royal-700 text-white shadow-md shadow-royal-600/20' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/80 hover:text-royal-700 dark:hover:text-royal-300'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-royal-600 dark:text-royal-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-purple-100 dark:bg-slate-800 text-royal-700 dark:text-royal-300 group-hover:bg-purple-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Admin section link */}
          {user?.role === 'admin' && (
            <div className="pt-3 mt-3 border-t border-purple-100 dark:border-slate-800">
              <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
                Administration
              </div>
              <NavLink
                to="/admin"
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive 
                    ? 'bg-purple-800 text-white shadow-md' 
                    : 'text-royal-700 dark:text-royal-300 bg-purple-50/70 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/40'}
                `}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-royal-600 dark:text-royal-400" />
                  <span>Admin Console</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </NavLink>
            </div>
          )}
        </div>

        {/* Readiness Score Progress Card */}
        <div className="p-3.5 border-t border-purple-100 dark:border-slate-800 bg-purple-50/50 dark:bg-slate-900/50">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-royal-600 via-royal-700 to-indigo-800 text-white shadow-lg shadow-royal-600/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Placement Readiness</span>
              </div>
              <span className="text-sm font-extrabold text-white">{readinessScore}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${readinessScore}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-2.5 text-[11px] text-purple-200">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                {user?.streak || 12} days streak
              </span>
              <NavLink to="/analytics" className="underline hover:text-white font-medium">
                View Details
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
