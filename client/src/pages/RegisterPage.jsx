import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const COMMON_SKILLS = [
  'Java', 'Python', 'C++', 'C', 'SQL', 'Data Structures', 
  'React.js', 'Node.js', 'DBMS', 'Operating Systems', 'Computer Networks'
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeName: '',
    branch: 'Computer Science and Engineering',
    yearOfStudy: '4th Year (Final Year)',
  });

  const [skillsList, setSkillsList] = useState(['Java', 'Python', 'SQL', 'Data Structures']);
  const [customSkill, setCustomSkill] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
    }
    setCustomSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  // Password strength checker
  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { score: 0, text: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, text: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, text: 'Good', color: 'bg-emerald-400' };
    return { score: 4, text: 'Strong', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.collegeName) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: skillsList
      };

      const res = await authAPI.register(payload);
      if (res && res.user) {
        login(res.user, res.token || 'verified-jwt-token');
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl transition-all">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-royal-700 to-royal-500 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-royal-500/25">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Student Registration</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Create your student account to access coding practice, aptitude training, and mock examinations
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Anusha Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              College Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="anusha@college.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className={`h-full ${strength.color}`} style={{ width: `${(strength.score / 4) * 100}%` }} />
                </div>
                <span className="text-[10px] font-semibold text-slate-500">{strength.text}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* College Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            College / University Name *
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="e.g. National Institute of Technology"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Branch & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Engineering Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics and Communication">Electronics and Communication</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Data Science & Artificial Intelligence">Data Science & AI</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Year of Study
            </label>
            <select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              <option value="4th Year (Final Year)">4th Year (Final Year)</option>
              <option value="3rd Year (Pre-final Year)">3rd Year (Pre-final Year)</option>
              <option value="2nd Year">2nd Year</option>
              <option value="1st Year">1st Year</option>
              <option value="Recent Graduate">Recent Graduate</option>
            </select>
          </div>
        </div>

        {/* Technical Skills Tag Manager */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Technical Skills ({skillsList.length} selected)
          </label>
          
          {/* Selected badges */}
          <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 mb-2 min-h-[46px]">
            {skillsList.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-100 dark:bg-royal-950/80 text-royal-700 dark:text-royal-300 text-xs font-bold shadow-sm"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-500 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Quick-add suggestions */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(customSkill); } }}
              placeholder="Type custom skill and press Enter..."
              className="flex-1 px-3 py-1.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(customSkill)}
              className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-slate-700 text-royal-700 dark:text-royal-300 text-xs font-bold hover:bg-purple-200"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="text-slate-500 font-semibold self-center mr-1">Suggestions:</span>
            {COMMON_SKILLS.filter(s => !skillsList.includes(s)).slice(0, 6).map((suggested) => (
              <button
                key={suggested}
                type="button"
                onClick={() => handleAddSkill(suggested)}
                className="px-2 py-0.5 rounded-lg border border-purple-100 dark:border-slate-700 hover:bg-purple-50 text-slate-600 dark:text-slate-300 flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" />
                <span>{suggested}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-sm shadow-md shadow-royal-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 mt-6"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Complete Student Registration</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-purple-50 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-300">
        Already registered?{' '}
        <Link to="/login" className="font-bold text-royal-600 dark:text-royal-400 hover:underline">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}
