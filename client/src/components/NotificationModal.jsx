import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  Calendar, 
  Award, 
  AlertCircle, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "TCS National Qualifier Test (NQT) Mock is Live!",
    category: "Mock Test",
    time: "10 mins ago",
    description: "Full length TCS pattern mock exam with Quantitative, Logical, Verbal and Coding sections.",
    actionUrl: "/mock-tests",
    read: false,
    type: "test"
  },
  {
    id: 2,
    title: "12-Day Practice Streak Achieved! 🔥",
    category: "Streak",
    time: "2 hours ago",
    description: "Great consistency! You've maintained your coding streak for 12 days in a row.",
    actionUrl: "/analytics",
    read: false,
    type: "achievement"
  },
  {
    id: 3,
    title: "Daily Coding Challenge Ready",
    category: "Coding",
    time: "5 hours ago",
    description: "Solve today's medium-difficulty dynamic programming question: Longest Increasing Subsequence.",
    actionUrl: "/coding",
    read: true,
    type: "daily"
  },
  {
    id: 4,
    title: "Infosys Placement Pattern Updated",
    category: "Company Prep",
    time: "Yesterday",
    description: "Updated pseudo-code questions and interview rounds for Infosys Specialist Programmer.",
    actionUrl: "/companies",
    read: true,
    type: "info"
  }
];

export default function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md h-full sm:h-auto sm:max-h-[85vh] bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-50 dark:border-slate-800 flex items-center justify-between bg-purple-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-royal-100 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Stay updated on mock tests & challenges</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Actions */}
        <div className="px-4 py-2.5 border-b border-purple-50 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-royal-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filter === 'unread' ? 'bg-royal-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50'}`}
            >
              Unread
            </button>
          </div>
          <button 
            onClick={markAllRead}
            className="text-royal-600 dark:text-royal-400 hover:underline font-semibold"
          >
            Mark all read
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-purple-50/50 dark:divide-slate-800/50">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No notifications in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id} 
                className={`pt-3 first:pt-0 p-2.5 rounded-2xl transition-all ${
                  !item.read ? 'bg-purple-50/60 dark:bg-royal-950/20 border border-purple-100 dark:border-royal-900/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-royal-100 dark:bg-royal-900/60 text-royal-700 dark:text-royal-300">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">{item.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2.5 flex justify-end">
                  <Link
                    to={item.actionUrl}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-royal-600 dark:text-royal-400 hover:underline"
                  >
                    <span>View Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-purple-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-center">
          <Link 
            to="/mock-tests" 
            onClick={onClose}
            className="text-xs font-semibold text-royal-700 dark:text-royal-300 hover:underline"
          >
            Explore upcoming placement test calendar →
          </Link>
        </div>
      </div>
    </div>
  );
}
