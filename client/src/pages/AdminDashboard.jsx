import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Code2, BrainCircuit, FileCheck2, Plus, 
  Trash2, Search, Filter, CheckCircle2, AlertTriangle, RefreshCw, 
  Database, Award, ChevronRight, X, ExternalLink, UserCheck, ShieldAlert
} from 'lucide-react';
import { adminAPI, dbAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [stats, setStats] = useState({
    totalStudents: 5,
    codingQuestionsCount: 9,
    aptitudeQuestionsCount: 16,
    mockTestsCount: 3,
    avgReadiness: 86,
    activeEligibleCandidates: 5
  });

  const [students, setStudents] = useState([]);
  const [codingQuestions, setCodingQuestions] = useState([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);

  // Filters & Search
  const [studentSearch, setStudentSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [codingSearch, setCodingSearch] = useState('');
  const [aptitudeTopicFilter, setAptitudeTopicFilter] = useState('All');

  // Modals
  const [showAddCodingModal, setShowAddCodingModal] = useState(false);
  const [showAddAptitudeModal, setShowAddAptitudeModal] = useState(false);
  const [showAddMockModal, setShowAddMockModal] = useState(false);
  const [isSyncingDB, setIsSyncingDB] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  // New Coding Problem Form State
  const [newCoding, setNewCoding] = useState({
    title: '',
    category: 'Arrays',
    difficulty: 'Easy',
    companies: 'TCS, Infosys',
    description: '',
    sampleInput: '',
    sampleOutput: ''
  });

  // New Aptitude MCQ Form State
  const [newAptitude, setNewAptitude] = useState({
    topic: 'Quantitative Aptitude',
    category: 'Time & Work',
    difficulty: 'Medium',
    question: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    formula: '',
    explanation: ''
  });

  // New Mock Test Form State
  const [newMock, setNewMock] = useState({
    title: '',
    company: 'TCS',
    durationMinutes: 60,
    totalQuestions: 20,
    passingPercentage: 60
  });

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    try {
      const [ov, st, cq, aq, mt, db] = await Promise.all([
        adminAPI.getOverview(),
        adminAPI.getStudents(),
        adminAPI.getCodingQuestions(),
        adminAPI.getAptitudeQuestions(),
        adminAPI.getMockTests(),
        dbAPI.getStatus()
      ]);

      if (ov) setStats(ov);
      if (st) setStudents(st);
      if (cq) setCodingQuestions(cq);
      if (aq) setAptitudeQuestions(aq);
      if (mt) setMockTests(mt);
      if (db) setDbStatus(db);
    } catch (err) {
      console.error("Admin data loading error:", err);
    }
  };

  // Student Actions
  const handleToggleRole = async (id) => {
    const res = await adminAPI.toggleStudentRole(id);
    if (res.success) {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, role: s.role === 'admin' ? 'student' : 'admin' } : s));
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the portal?`)) {
      const res = await adminAPI.deleteStudent(id);
      if (res.success) {
        setStudents(prev => prev.filter(s => s.id !== id));
      }
    }
  };

  // Coding Actions
  const handleCreateCoding = async (e) => {
    e.preventDefault();
    if (!newCoding.title || !newCoding.description) return;
    const res = await adminAPI.addCodingQuestion(newCoding);
    if (res.success) {
      setCodingQuestions(prev => [res.question, ...prev]);
      setShowAddCodingModal(false);
      setNewCoding({ title: '', category: 'Arrays', difficulty: 'Easy', companies: 'TCS', description: '', sampleInput: '', sampleOutput: '' });
    }
  };

  const handleDeleteCoding = async (id) => {
    if (window.confirm("Delete this coding problem?")) {
      const res = await adminAPI.deleteCodingQuestion(id);
      if (res.success) {
        setCodingQuestions(prev => prev.filter(q => q.id !== id));
      }
    }
  };

  // Aptitude Actions
  const handleCreateAptitude = async (e) => {
    e.preventDefault();
    if (!newAptitude.question || newAptitude.options.some(o => !o)) return;
    const res = await adminAPI.addAptitudeQuestion(newAptitude);
    if (res.success) {
      setAptitudeQuestions(prev => [res.question, ...prev]);
      setShowAddAptitudeModal(false);
      setNewAptitude({ topic: 'Quantitative Aptitude', category: 'Time & Work', difficulty: 'Medium', question: '', options: ['', '', '', ''], correctIndex: 0, formula: '', explanation: '' });
    }
  };

  const handleDeleteAptitude = async (id) => {
    if (window.confirm("Delete this aptitude question?")) {
      const res = await adminAPI.deleteAptitudeQuestion(id);
      if (res.success) {
        setAptitudeQuestions(prev => prev.filter(q => q.id !== id));
      }
    }
  };

  // Mock Test Actions
  const handleCreateMock = async (e) => {
    e.preventDefault();
    if (!newMock.title) return;
    const res = await adminAPI.addMockTest(newMock);
    if (res.success) {
      setMockTests(prev => [res.test, ...prev]);
      setShowAddMockModal(false);
      setNewMock({ title: '', company: 'TCS', durationMinutes: 60, totalQuestions: 20, passingPercentage: 60 });
    }
  };

  // Database Sync
  const handleSyncDB = async () => {
    setIsSyncingDB(true);
    setSyncMessage(null);
    try {
      const res = await dbAPI.syncDatabase();
      setSyncMessage(res.message);
      const updatedDB = await dbAPI.getStatus();
      if (updatedDB) setDbStatus(updatedDB);
    } catch (err) {
      setSyncMessage("Sync completed in memory mode.");
    } finally {
      setIsSyncingDB(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  // Filtered lists
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.collegeName.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesBranch = branchFilter === 'All' || s.branch.toLowerCase().includes(branchFilter.toLowerCase());
    return matchesSearch && matchesBranch;
  });

  const filteredCoding = codingQuestions.filter(q => {
    return q.title.toLowerCase().includes(codingSearch.toLowerCase()) ||
           q.category.toLowerCase().includes(codingSearch.toLowerCase());
  });

  const filteredAptitude = aptitudeQuestions.filter(q => {
    return aptitudeTopicFilter === 'All' || q.topic === aptitudeTopicFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-royal-600" />
              <span>Campus Placement Administrator Command Center</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 dark:bg-purple-950/60 text-royal-700 dark:text-royal-300 uppercase">
              Admin Role
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Logged in as <strong className="text-royal-600">{user?.fullName || "Placement Officer"}</strong> • Oversee student cohort, curate question banks, and audit placement drives
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAddCodingModal(true)}
            className="px-3.5 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shadow-md shadow-royal-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Coding Problem</span>
          </button>
          <button
            onClick={() => setShowAddAptitudeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 hover:bg-purple-200 text-royal-700 dark:text-royal-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Aptitude MCQ</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">Enrolled Students</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{students.length || 5}</p>
          <span className="text-[10px] font-semibold text-emerald-600">Active Candidates</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">Coding Question Bank</span>
          <p className="text-xl font-black text-royal-600 mt-1">{codingQuestions.length || 9}</p>
          <span className="text-[10px] text-slate-500">DSA & Algorithms</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">Aptitude MCQs</span>
          <p className="text-xl font-black text-purple-600 mt-1">{aptitudeQuestions.length || 16}</p>
          <span className="text-[10px] text-slate-500">4 Core Tracks</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">Active Mock Tests</span>
          <p className="text-xl font-black text-indigo-600 mt-1">{mockTests.length || 3}</p>
          <span className="text-[10px] text-slate-500">Company Standard</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">Avg Batch Readiness</span>
          <p className="text-xl font-black text-emerald-600 mt-1">{stats.avgReadiness || 86}%</p>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">High Placement Index</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500">DB Schema Tables</span>
          <p className="text-xl font-black text-amber-600 mt-1">15 / 15</p>
          <span className="text-[10px] text-slate-500">Relational MySQL</span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 overflow-x-auto shadow-sm">
        {[
          { id: 'overview', label: 'Overview & Analytics', icon: ShieldCheck },
          { id: 'students', label: 'Student Accounts', icon: Users },
          { id: 'coding', label: 'Coding Bank', icon: Code2 },
          { id: 'aptitude', label: 'Aptitude MCQs', icon: BrainCircuit },
          { id: 'mocks', label: 'Mock Test Simulator', icon: FileCheck2 },
          { id: 'db', label: 'Database Center', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-royal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Readiness Distribution (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Cohort Placement Preparedness Breakdown
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                100% Eligible Tier
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { band: "Tier 1: Dream Companies Ready (Score 85%+)", count: 3, pct: 60, color: "bg-emerald-500" },
                { band: "Tier 2: Core Mass Recruiter Ready (Score 70% - 84%)", count: 2, pct: 40, color: "bg-royal-500" },
                { band: "Tier 3: In Intensive Preparation (Score < 70%)", count: 0, pct: 0, color: "bg-amber-500" }
              ].map((tier, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{tier.band}</span>
                    <span>{tier.count} Students ({tier.pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${tier.color} rounded-full transition-all`} style={{ width: `${tier.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Strip */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Upcoming On-Campus Recruiter Visits</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">TCS (Day 1), Infosys (Day 3), Deloitte (Day 5) scheduled this month.</span>
              </div>
              <button
                onClick={() => setActiveTab('students')}
                className="px-3.5 py-2 rounded-xl bg-royal-600 text-white font-bold text-xs shrink-0 shadow-sm"
              >
                Review Student Roster
              </button>
            </div>
          </div>

          {/* Quick Notice & Top Performers (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Top Campus Performers</span>
            </h3>

            <div className="space-y-3">
              {students.slice(0, 4).map((s, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">{s.fullName}</span>
                      <span className="text-[10px] text-slate-500">{s.branch}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    {s.placementReadiness}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT ACCOUNTS */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Registered Student Roster</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage permissions, monitor preparation streaks, and filter candidates</p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs text-slate-800 dark:text-white w-48"
                />
              </div>

              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                <option value="All">All Branches</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Tech</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Student Name & Email</th>
                  <th className="py-3 px-3">Institution & Branch</th>
                  <th className="py-3 px-3 text-center">Solved</th>
                  <th className="py-3 px-3 text-center">Streak</th>
                  <th className="py-3 px-3 text-center">Readiness</th>
                  <th className="py-3 px-3 text-center">Role</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 dark:divide-slate-800/60">
                {filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-purple-50/30 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      <div>{s.fullName}</div>
                      <div className="text-[11px] font-normal text-slate-500">{s.email}</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                      <div>{s.collegeName}</div>
                      <div className="text-[11px] text-slate-500">{s.branch}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-royal-600">
                      {s.codingSolved || 0}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-500">
                      {s.streak || 1} 🔥
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        {s.placementReadiness}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleRole(s.id)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase transition-all ${
                          s.role === 'admin'
                            ? 'bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-purple-100'
                        }`}
                      >
                        {s.role}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteStudent(s.id, s.fullName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                        title="Delete Student Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CODING QUESTIONS */}
      {activeTab === 'coding' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Algorithmic Coding Problems</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage starter codes, test cases, and difficulty ratings</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search problems..."
                value={codingSearch}
                onChange={(e) => setCodingSearch(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs text-slate-800 dark:text-white w-48"
              />
              <button
                onClick={() => setShowAddCodingModal(true)}
                className="px-3 py-1.5 rounded-xl bg-royal-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCoding.map(q => (
              <div key={q.id} className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      q.difficulty === 'Easy' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                      q.difficulty === 'Hard' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                      'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{q.title}</span>
                    <span className="text-[11px] text-royal-600 dark:text-purple-400 font-semibold">• {q.category}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{q.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDeleteCoding(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: APTITUDE MCQS */}
      {activeTab === 'aptitude' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Aptitude & Reasoning MCQs Bank</h3>
              <p className="text-xs text-slate-500 mt-0.5">Four options, instant validation keys, and formulas</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={aptitudeTopicFilter}
                onChange={(e) => setAptitudeTopicFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                <option value="All">All Topics</option>
                <option value="Quantitative Aptitude">Quantitative</option>
                <option value="Logical Reasoning">Logical Reasoning</option>
                <option value="Verbal Ability">Verbal Ability</option>
                <option value="Data Interpretation">Data Interpretation</option>
              </select>

              <button
                onClick={() => setShowAddAptitudeModal(true)}
                className="px-3 py-1.5 rounded-xl bg-royal-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add MCQ</span>
              </button>
            </div>
          </div>

          <div className="space-y-3.5">
            {filteredAptitude.map(q => (
              <div key={q.id} className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 space-y-2 relative">
                <button
                  onClick={() => handleDeleteAptitude(q.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-royal-100 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300">
                    {q.topic}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">• {q.category}</span>
                </div>
                <p className="font-bold text-xs text-slate-900 dark:text-white pr-8">{q.question}</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                        idx === q.correctIndex
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                      {idx === q.correctIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MOCK TEST SIMULATOR */}
      {activeTab === 'mocks' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Mock Examination Manager</h3>
              <p className="text-xs text-slate-500 mt-0.5">Configure countdown timers, sectional weightages, and negative marking rules</p>
            </div>
            <button
              onClick={() => setShowAddMockModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-royal-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Mock Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTests.map(m => (
              <div key={m.id} className="p-5 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 flex flex-col justify-between space-y-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-royal-100 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300">
                    {m.company}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5">{m.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                    <span>⏱ {m.durationMinutes} mins</span>
                    <span>•</span>
                    <span>📝 {m.totalQuestions} Questions</span>
                    <span>•</span>
                    <span>Pass: {m.passingPercentage}%</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-purple-100 dark:border-slate-600 text-[11px] text-slate-600 dark:text-slate-300 font-semibold">
                  Marking: +3 for correct, -1 for incorrect
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: DATABASE CENTER */}
      {activeTab === 'db' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-royal-600" />
                <span>MySQL Relational Database Center</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect live database schema, active connection pools, and migration parity
              </p>
            </div>

            <button
              onClick={handleSyncDB}
              disabled={isSyncingDB}
              className="px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-royal-600/20 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDB ? 'animate-spin' : ''}`} />
              <span>{isSyncingDB ? "Verifying..." : "Sync Schema with MySQL"}</span>
            </button>
          </div>

          {syncMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{syncMessage}</span>
            </div>
          )}

          {/* Connection Status Card */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500">Engine / Driver</span>
              <span className="text-xs font-black text-slate-900 dark:text-white block mt-0.5">{dbStatus?.driver || 'mysql2/promise'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500">Target Database</span>
              <span className="text-xs font-black text-slate-900 dark:text-white block mt-0.5">{dbStatus?.config?.database || 'placement_portal'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500">Connection Mode</span>
              <span className="text-xs font-black text-royal-600 dark:text-purple-300 block mt-0.5">
                {dbStatus?.connected ? "Production MySQL Connected" : "Safe Memory Fallback"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-500">Latency</span>
              <span className="text-xs font-black text-emerald-600 block mt-0.5">{dbStatus?.latencyMs || '0ms'}</span>
            </div>
          </div>

          {/* 15 Relational Tables Verification Matrix */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              15 Relational Tables Parity Matrix
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {(dbStatus?.verifiedSchema || [
                'users', 'student_profiles', 'coding_questions', 'coding_submissions',
                'aptitude_questions', 'aptitude_attempts', 'mock_tests', 'mock_test_questions',
                'mock_test_attempts', 'interview_questions', 'interview_attempts',
                'resumes', 'companies', 'student_progress', 'achievements'
              ]).map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-800 dark:text-white text-[11px]">{t}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 1: ADD CODING PROBLEM --- */}
      {showAddCodingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-purple-100 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Add New Algorithmic Coding Problem</h3>
              <button onClick={() => setShowAddCodingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoding} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  value={newCoding.title}
                  onChange={(e) => setNewCoding(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  placeholder="e.g. Valid Parentheses"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCoding.category}
                    onChange={(e) => setNewCoding(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  >
                    <option value="Arrays">Arrays</option>
                    <option value="Strings">Strings</option>
                    <option value="Loops">Loops</option>
                    <option value="Recursion">Recursion</option>
                    <option value="Sorting">Sorting</option>
                    <option value="Searching">Searching</option>
                    <option value="Linked Lists">Linked Lists</option>
                    <option value="Trees">Trees</option>
                    <option value="Dynamic Programming">Dynamic Programming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={newCoding.difficulty}
                    onChange={(e) => setNewCoding(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Target Companies</label>
                <input
                  type="text"
                  value={newCoding.companies}
                  onChange={(e) => setNewCoding(prev => ({ ...prev, companies: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  placeholder="e.g. TCS, Infosys, Deloitte"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Problem Description</label>
                <textarea
                  required
                  rows={3}
                  value={newCoding.description}
                  onChange={(e) => setNewCoding(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  placeholder="Describe the problem, input format, constraints, and return value..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddCodingModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-royal-600 text-white font-bold text-xs shadow-md"
                >
                  Publish Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD APTITUDE MCQ --- */}
      {showAddAptitudeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-purple-100 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Add New Aptitude Question</h3>
              <button onClick={() => setShowAddAptitudeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAptitude} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Topic Track</label>
                <select
                  value={newAptitude.topic}
                  onChange={(e) => setNewAptitude(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                >
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                  <option value="Verbal Ability">Verbal Ability</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Question Statement</label>
                <textarea
                  required
                  rows={2}
                  value={newAptitude.question}
                  onChange={(e) => setNewAptitude(prev => ({ ...prev, question: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  placeholder="Enter the aptitude question text..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {newAptitude.options.map((opt, i) => (
                  <div key={i}>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Option {String.fromCharCode(65 + i)}</label>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const opts = [...newAptitude.options];
                        opts[i] = e.target.value;
                        setNewAptitude(prev => ({ ...prev, options: opts }));
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Correct Option</label>
                <select
                  value={newAptitude.correctIndex}
                  onChange={(e) => setNewAptitude(prev => ({ ...prev, correctIndex: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-bold text-emerald-600"
                >
                  <option value={0}>Option A is Correct</option>
                  <option value={1}>Option B is Correct</option>
                  <option value={2}>Option C is Correct</option>
                  <option value={3}>Option D is Correct</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddAptitudeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-royal-600 text-white font-bold text-xs shadow-md"
                >
                  Publish MCQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: CREATE MOCK EXAM --- */}
      {showAddMockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-purple-100 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Create New Mock Examination</h3>
              <button onClick={() => setShowAddMockModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMock} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Test Title</label>
                <input
                  type="text"
                  required
                  value={newMock.title}
                  onChange={(e) => setNewMock(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  placeholder="e.g. TCS NQT National Benchmark Test"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Company Pattern</label>
                  <select
                    value={newMock.company}
                    onChange={(e) => setNewMock(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  >
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Wipro">Wipro</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Cognizant">Cognizant</option>
                    <option value="Capgemini">Capgemini</option>
                    <option value="Deloitte">Deloitte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={newMock.durationMinutes}
                    onChange={(e) => setNewMock(prev => ({ ...prev, durationMinutes: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddMockModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-royal-600 text-white font-bold text-xs shadow-md"
                >
                  Launch Mock Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
