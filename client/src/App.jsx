import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import NotificationModal from './components/NotificationModal';
import DailyChallengeModal from './components/DailyChallengeModal';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import StudentDashboard from './pages/StudentDashboard';
import CodingPractice from './pages/CodingPractice';
import AptitudePractice from './pages/AptitudePractice';
import MockTests from './pages/MockTests';
import InterviewPrep from './pages/InterviewPrep';
import TechnicalPrep from './pages/TechnicalPrep';
import ResumeBuilder from './pages/ResumeBuilder';
import CompanyPrep from './pages/CompanyPrep';
import ProgressAnalytics from './pages/ProgressAnalytics';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dailyChallengeOpen, setDailyChallengeOpen] = useState(false);
  
  const location = useLocation();
  const { user } = useAuth();

  const isPublicPage = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenDailyChallenge={() => setDailyChallengeOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex">
        
        {/* Sidebar on authenticated app pages */}
        {!isPublicPage && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        )}

        {/* Content Container */}
        <main className={`flex-1 flex flex-col transition-all duration-300 ${!isPublicPage ? 'lg:pl-64' : ''}`}>
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Protected Student Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
              <Route path="/coding" element={<ProtectedRoute><CodingPractice /></ProtectedRoute>} />
              <Route path="/aptitude" element={<ProtectedRoute><AptitudePractice /></ProtectedRoute>} />
              <Route path="/mock-tests" element={<ProtectedRoute><MockTests /></ProtectedRoute>} />
              <Route path="/interview/*" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
              <Route path="/technical" element={<ProtectedRoute><TechnicalPrep /></ProtectedRoute>} />
              <Route path="/resume" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
              <Route path="/companies/*" element={<ProtectedRoute><CompanyPrep /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><ProgressAnalytics /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* Role-Restricted Admin Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute roleRequired="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Popups & Modals */}
      <NotificationModal 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />

      <DailyChallengeModal 
        isOpen={dailyChallengeOpen} 
        onClose={() => setDailyChallengeOpen(false)} 
      />

    </div>
  );
}
