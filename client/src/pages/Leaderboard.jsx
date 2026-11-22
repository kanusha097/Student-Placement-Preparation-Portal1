import React from 'react';
import { Trophy, Medal, Award, Flame, User } from 'lucide-react';

const LEADERBOARD_USERS = [
  { rank: 1, name: "Rahul Verma", college: "IIT Madras", score: 2840, streak: 28, solved: 142 },
  { rank: 2, name: "Sneha Nair", college: "NIT Surathkal", score: 2710, streak: 25, solved: 135 },
  { rank: 3, name: "Ananya Roy", college: "BITS Pilani", score: 2650, streak: 21, solved: 129 },
  { rank: 4, name: "Anusha Sharma (You)", college: "NIT", score: 2480, streak: 12, solved: 42, isMe: true },
  { rank: 5, name: "Vikram Malhotra", college: "DTU Delhi", score: 2390, streak: 18, solved: 110 }
];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-500" />
          Campus Leaderboard & Badges
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Top engineering students ranked by placement readiness, coding problems solved, and practice consistency
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-purple-50 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3 px-3">Rank</th>
              <th className="pb-3 px-3">Student</th>
              <th className="pb-3 px-3">College</th>
              <th className="pb-3 px-3">Problems Solved</th>
              <th className="pb-3 px-3">Daily Streak</th>
              <th className="pb-3 px-3 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 dark:divide-slate-800">
            {LEADERBOARD_USERS.map((u) => (
              <tr key={u.rank} className={`hover:bg-purple-50/50 dark:hover:bg-slate-800/40 transition-colors ${u.isMe ? 'bg-purple-50 dark:bg-royal-950/30 font-bold' : ''}`}>
                <td className="py-3 px-3 font-extrabold">
                  {u.rank === 1 && <span className="text-amber-500 text-base">🥇 1</span>}
                  {u.rank === 2 && <span className="text-slate-400 text-base">🥈 2</span>}
                  {u.rank === 3 && <span className="text-amber-700 text-base">🥉 3</span>}
                  {u.rank > 3 && `#${u.rank}`}
                </td>
                <td className="py-3 px-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center font-bold text-xs">
                    {u.name[0]}
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{u.college}</td>
                <td className="py-3 px-3 font-semibold text-emerald-600">{u.solved} solved</td>
                <td className="py-3 px-3 flex items-center gap-1 text-orange-500 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{u.streak}d</span>
                </td>
                <td className="py-3 px-3 text-right font-black text-royal-600">{u.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
