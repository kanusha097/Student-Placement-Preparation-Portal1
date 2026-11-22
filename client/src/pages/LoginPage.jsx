import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('anusha@placementprep.edu');
  const [password, setPassword] = useState('Password@123');
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoFill = (targetRole) => {
    setError('');
    if (targetRole === 'admin') {
      setRole('admin');
      setEmail('admin@placementprep.edu');
      setPassword('Admin@123');
    } else {
      setRole('student');
      setEmail('anusha@placementprep.edu');
      setPassword('Password@123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.login(email, password, role);
      if (res && res.user) {
        login(res.user, res.token || 'verified-jwt-token');
        navigate(res.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl transition-all">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-royal-700 to-royal-500 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-royal-500/25">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome Back</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Sign in to your PlacementPrep account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Role Toggle Tab */}
      <div className="flex p-1 rounded-xl bg-purple-50 dark:bg-slate-800 mb-5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => handleDemoFill('student')}
          className={`flex-1 py-2 rounded-lg transition-all ${role === 'student' ? 'bg-white dark:bg-slate-700 text-royal-700 dark:text-royal-300 shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
        >
          Student Login
        </button>
        <button
          type="button"
          onClick={() => handleDemoFill('admin')}
          className={`flex-1 py-2 rounded-lg transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 text-royal-700 dark:text-royal-300 shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
        >
          Administrator
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
              placeholder="student@college.edu"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-royal-600 dark:text-royal-400 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-royal-600 focus:ring-royal-500"
            />
            <span>Remember this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-sm shadow-md shadow-royal-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In as {role === 'admin' ? 'Administrator' : 'Student'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Demo helper card */}
      <div className="mt-5 p-3 rounded-2xl bg-purple-50/70 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-royal-700 dark:text-royal-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Quick Demo Credentials:
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDemoFill('student')}
            className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-700 rounded-lg font-medium text-[11px] text-slate-700 dark:text-slate-200 border border-purple-100 dark:border-slate-600 hover:border-royal-400"
          >
            Auto-fill Student
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill('admin')}
            className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-700 rounded-lg font-medium text-[11px] text-slate-700 dark:text-slate-200 border border-purple-100 dark:border-slate-600 hover:border-royal-400"
          >
            Auto-fill Admin
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-purple-50 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-300">
        Don't have an account yet?{' '}
        <Link to="/register" className="font-bold text-royal-600 dark:text-royal-400 hover:underline">
          Register Here
        </Link>
      </div>
    </div>
  );
}
