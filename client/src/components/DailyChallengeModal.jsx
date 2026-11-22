import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Code2, Flame, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DailyChallengeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient */}
        <div className="relative p-6 bg-gradient-to-tr from-royal-700 via-royal-600 to-lavender-500 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Question of the Day
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> +50 XP
            </span>
          </div>

          <h3 className="text-xl font-black mt-2">
            Two Sum - Target Pair Indices
          </h3>
          <p className="text-purple-100 text-xs mt-1">
            Commonly asked in TCS Ninja, Infosys SP, and Accenture ASE
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold">
              Easy
            </span>
            <span className="text-slate-600 dark:text-slate-300">Topic: Arrays & Hash Maps</span>
            <span className="text-slate-600 dark:text-slate-300">•</span>
            <span className="text-slate-600 dark:text-slate-300">Solved by 1,482 students today</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Given an array of integers <code className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-slate-800 text-royal-600 dark:text-royal-400 font-mono text-xs">nums</code> and an integer <code className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-slate-800 text-royal-600 dark:text-royal-400 font-mono text-xs">target</code>, return indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p><span className="text-slate-400">Input:</span> nums = [2,7,11,15], target = 9</p>
            <p><span className="text-slate-400">Output:</span> [0,1]</p>
            <p><span className="text-slate-400">Explanation:</span> nums[0] + nums[1] == 9, return [0, 1].</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <Award className="w-4 h-4 text-royal-600" />
              <span>Maintains your learning streak</span>
            </div>

            <Link
              to="/coding?id=1"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-sm shadow-md shadow-royal-600/25 transition-all hover:scale-105"
            >
              <span>Solve in Editor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
