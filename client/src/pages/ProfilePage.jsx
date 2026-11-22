import React, { useState } from 'react';
import {
  User,
  Mail,
  Building,
  BookOpen,
  Calendar,
  Award,
  FileText,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    collegeName: user?.collegeName || '',
    branch: user?.branch || '',
    yearOfStudy: user?.yearOfStudy || '',
    skills: user?.skills || []
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !editData.skills.includes(newSkillInput.trim())) {
      setEditData({ ...editData, skills: [...editData.skills, newSkillInput.trim()] });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSave = async () => {
    updateProfile(editData);
    await authAPI.updateProfile(editData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-7 h-7 text-royal-600" />
            Student Academic Profile
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Manage your personal profile, university credentials, technical skills, and placement records
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setEditData({
                  fullName: user?.fullName || '',
                  collegeName: user?.collegeName || '',
                  branch: user?.branch || '',
                  yearOfStudy: user?.yearOfStudy || '',
                  skills: user?.skills || []
                });
                setIsEditing(true);
              }}
              className="px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile updated successfully! All changes are synchronized.</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-6">

        {/* Top Info Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-purple-50 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-royal-700 to-royal-500 text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-royal-600/25 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.fullName ? user.fullName[0] : "S"
              )}
            </div>
            <div className="space-y-1">
              {isEditing ? (
                <div>
                  <label className="text-[10px] font-bold text-slate-500">Full Name</label>
                  <input
                    type="text"
                    value={editData.fullName}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    className="block px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{user?.fullName}</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-royal-600" /> {user?.email}
                  </p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold text-[10px] uppercase">
                    Role: {user?.role || "Student"}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700 text-center">
              <span className="text-xl font-black text-royal-600">{user?.placementReadiness || 78}%</span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Readiness</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border border-amber-100 dark:border-slate-700 text-center">
              <span className="text-xl font-black text-amber-500">{user?.streak || 12}d</span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Streak</span>
            </div>
          </div>
        </div>

        {/* Academic Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <span className="text-slate-500 font-semibold">College / University</span>
            {isEditing ? (
              <input
                type="text"
                value={editData.collegeName}
                onChange={(e) => setEditData({ ...editData, collegeName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              />
            ) : (
              <p className="font-bold text-slate-800 dark:text-white text-sm">{user?.collegeName || "National Institute of Technology"}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <span className="text-slate-500 font-semibold">Engineering Branch</span>
            {isEditing ? (
              <input
                type="text"
                value={editData.branch}
                onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              />
            ) : (
              <p className="font-bold text-slate-800 dark:text-white text-sm">{user?.branch || "Computer Science and Engineering"}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <span className="text-slate-500 font-semibold">Year of Graduation / Study</span>
            {isEditing ? (
              <select
                value={editData.yearOfStudy}
                onChange={(e) => setEditData({ ...editData, yearOfStudy: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              >
                <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                <option value="3rd Year (Pre-final Year)">3rd Year (Pre-final Year)</option>
                <option value="2nd Year">2nd Year</option>
                <option value="1st Year">1st Year</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            ) : (
              <p className="font-bold text-slate-800 dark:text-white text-sm">{user?.yearOfStudy || "4th Year (Final Year)"}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <span className="text-slate-500 font-semibold">Placement Preparation Status</span>
            <p className="font-bold text-emerald-600 text-sm">Active Candidate (Placement Drive 2026)</p>
          </div>

        </div>

        {/* Skills Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Technical Skills & proficiencies</h3>
            {isEditing && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="New skill (e.g. Docker)"
                  className="px-2.5 py-1 rounded-xl border border-purple-200 dark:border-slate-700 bg-slate-50 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-2.5 py-1 rounded-xl bg-royal-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {(isEditing ? editData.skills : (user?.skills || [])).map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 text-xs font-bold border border-purple-200 dark:border-royal-800"
              >
                <span>{s}</span>
                {isEditing && (
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link to Resume */}
        <div className="pt-4 border-t border-purple-50 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Need to create or update your campus resume?</span>
          <Link to="/resume" className="font-bold text-royal-600 dark:text-royal-400 hover:underline flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Launch Resume Builder →
          </Link>
        </div>

      </div>

    </div>
  );
}
