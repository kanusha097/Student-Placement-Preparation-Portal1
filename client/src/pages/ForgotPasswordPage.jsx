import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code & new password, 3: success
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [demoReceivedCode, setDemoReceivedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.forgotPassword(email);
      setDemoReceivedCode(res.demoResetCode || 'PREP-7492');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send recovery code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (!resetCode) {
      setError('Please enter the verification code.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 700);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl text-center">
      
      {/* Step 1: Email Form */}
      {step === 1 && (
        <>
          <div className="w-12 h-12 rounded-2xl bg-royal-100 text-royal-600 flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Forgot Password?</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-6">
            Enter your college email address to receive your password reset verification code.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="relative text-left">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 text-white font-bold text-sm shadow-md shadow-royal-600/25 hover:from-royal-700 hover:to-royal-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Sending Code..." : "Send Reset Code"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-royal-600">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        </>
      )}

      {/* Step 2: Enter Code & New Password */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create New Password</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-4">
            We have generated a verification code for <strong className="text-royal-600">{email}</strong>.
          </p>

          <div className="p-3 mb-4 rounded-xl bg-purple-50 dark:bg-slate-800 border border-purple-100 text-xs">
            <span className="text-slate-500">Your verification code:</span>
            <span className="font-mono font-bold text-royal-700 dark:text-royal-300 ml-2 text-sm">{demoReceivedCode}</span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Enter 8-digit code"
                className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 text-white font-bold text-sm shadow-md"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </>
      )}

      {/* Step 3: Success Confirmation */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Password Updated!</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Your password has been successfully reset. You can now log into your student account with your new credentials.
          </p>
          <div className="pt-4">
            <Link
              to="/login"
              className="w-full py-3 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
