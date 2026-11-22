import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Flame, 
  Moon, 
  Sun, 
  Bell, 
  Search, 
  User, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X,
  Target,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenNotifications, onOpenDailyChallenge, onToggleSidebar }) {
  const { user, logout, switchRole } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-purple-100 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Mobile Sidebar Button */}
          <div className="flex items-center gap-3">
            {!isLandingPage && !isAuthPage && (
              <button 
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5 text-royal-600 dark:text-royal-400" />
              </button>
            )}

            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-royal-700 to-royal-500 flex items-center justify-center text-white shadow-md shadow-royal-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-royal-700 via-royal-600 to-lavender-500 bg-clip-text text-transparent">
                  PlacementPrep
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase -mt-1">
                  Campus Ready Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Landing page nav links */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#features" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">How It Works</a>
              <a href="#companies" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Companies</a>
              <a href="#stats" className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors">Success Rates</a>
            </nav>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Streak & Daily Challenge (Shown for logged in user) */}
            {user && (
              <>
                <button
                  onClick={onOpenDailyChallenge}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-semibold shadow-sm hover:shadow hover:scale-105 transition-all"
                >
                  <Flame className="w-4 h-4 text-orange-500 animate-pulse fill-orange-500" />
                  <span>{user.streak || 12} Day Streak</span>
                </button>

                <button
                  onClick={onOpenDailyChallenge}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800/40 text-royal-700 dark:text-royal-300 text-xs font-semibold hover:bg-royal-100 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-royal-600 dark:text-royal-400" />
                  <span>Daily Challenge</span>
                </button>

                {/* Role Switcher Pill for Testing */}
                <button
                  onClick={switchRole}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all bg-purple-50 hover:bg-purple-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-purple-200 dark:border-slate-700 text-royal-700 dark:text-royal-300"
                  title="Switch between Student and Administrator mode"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-royal-600 dark:text-royal-400" />
                  <span>{user.role === 'admin' ? 'Admin Mode' : 'Student Mode'}</span>
                </button>
              </>
            )}

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 border border-transparent hover:border-purple-100 dark:hover:border-slate-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-royal-600" />}
            </button>

            {/* Notifications Button */}
            {user && (
              <button
                onClick={onOpenNotifications}
                aria-label="Open notifications"
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-royal-600 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
              </button>
            )}

            {/* User Profile or Login CTA */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-purple-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-xs font-semibold hidden md:inline text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-royal-100 dark:bg-royal-900 border border-royal-300 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-royal-600 dark:text-royal-300" />
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-purple-50 dark:border-slate-800">
                      <p className="text-xs text-slate-600 dark:text-slate-300">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.fullName}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-md bg-royal-100 dark:bg-royal-900/60 text-royal-700 dark:text-royal-300 uppercase">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
                      >
                        <User className="w-4 h-4 text-royal-600" />
                        My Profile & Resume
                      </Link>
                      
                      <Link
                        to="/analytics"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
                      >
                        <Target className="w-4 h-4 text-royal-600" />
                        Performance Analytics
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-royal-700 dark:text-royal-300 font-semibold hover:bg-purple-50 dark:hover:bg-slate-800"
                        >
                          <ShieldCheck className="w-4 h-4 text-royal-600" />
                          Admin Portal
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-purple-50 dark:border-slate-800 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-royal-700 dark:text-royal-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 rounded-xl shadow-md shadow-royal-500/20 transition-all hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
