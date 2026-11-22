import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Administrator Access Required</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          You are currently signed in as a <span className="font-bold text-royal-600">Student</span>. This area is reserved for placement officers and faculty coordinators.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Student Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
