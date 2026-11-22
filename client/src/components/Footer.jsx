import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Linkedin, Twitter, Mail, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-purple-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-royal-700 to-royal-500 flex items-center justify-center text-white shadow-md shadow-royal-500/25">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-royal-700 via-royal-600 to-lavender-500 bg-clip-text text-transparent">
                PlacementPrep
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              The premier campus recruitment accelerator for engineering students. Empowering engineers with coding practice, aptitude training, mock exams, AI interviews, and company-specific modules.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free for Students
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Practice Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li><Link to="/coding" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Coding Challenges</Link></li>
              <li><Link to="/aptitude" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Aptitude & Reasoning</Link></li>
              <li><Link to="/mock-tests" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Full Mock Exams</Link></li>
              <li><Link to="/interview" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">HR & Tech Interviews</Link></li>
              <li><Link to="/technical" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">CS Notes & Cheatsheets</Link></li>
            </ul>
          </div>

          {/* Top Companies */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Top Companies
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li><Link to="/companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">TCS Ninja & Digital</Link></li>
              <li><Link to="/companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Infosys SP & DSE</Link></li>
              <li><Link to="/companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Wipro Elite NLTH</Link></li>
              <li><Link to="/companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Accenture ASE</Link></li>
              <li><Link to="/companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Deloitte & Capgemini</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Career Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li><Link to="/resume" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">ATS Resume Builder</Link></li>
              <li><Link to="/analytics" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Placement Readiness Score</Link></li>
              <li><Link to="/leaderboard" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Campus Leaderboard</Link></li>
              <li><Link to="/login" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Student Login</Link></li>
              <li><Link to="/admin" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Placement Officer Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-purple-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-300">
          <p>© {new Date().getFullYear()} PlacementPrep. Built for ambitious engineering students nationwide.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for campus placement success</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
