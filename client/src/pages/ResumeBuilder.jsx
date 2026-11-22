import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Eye, Sparkles, Plus, Trash2, CheckCircle2, 
  Save, RefreshCw, Briefcase, GraduationCap, Code2, Award, 
  ExternalLink, User, Mail, Phone, MapPin, Globe, Linkedin, Github,
  Check, AlertCircle, LayoutTemplate
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resumeAPI } from '../services/api';

const DEFAULT_RESUME = {
  template: 'modern',
  personal: {
    fullName: "Anusha Sharma",
    email: "anusha@placementprep.edu",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/anusha-sharma",
    github: "github.com/anusha-sharma",
    portfolio: "anushasharma.dev"
  },
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "National Institute of Technology",
      score: "8.92 / 10 CGPA",
      year: "2022 - 2026"
    },
    {
      degree: "Senior Secondary (Class XII)",
      institution: "Delhi Public School",
      score: "94.6%",
      year: "2022"
    }
  ],
  skills: {
    languages: "Java, Python, C++, SQL, JavaScript",
    frameworks: "React.js, Node.js, Express, Tailwind CSS, Spring Boot",
    developerTools: "Git, GitHub, Docker, Postman, Linux, VS Code",
    coreConcepts: "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks"
  },
  projects: [
    {
      title: "Student Placement Preparation Portal",
      technologies: "React, Node.js, Express, MySQL, Tailwind CSS",
      bullets: [
        "Architected an end-to-end placement suite supporting 12+ preparation modules, sandboxed code execution, and mock exams.",
        "Implemented secure JWT authentication, negative marking timers, and real-time algorithmic evaluation with sub-50ms latency.",
        "Designed responsive dark/light theme interfaces with ATS-friendly automated PDF resume generation."
      ]
    },
    {
      title: "Distributed Key-Value Store",
      technologies: "Java, Socket Programming, Multithreading, Concurrency",
      bullets: [
        "Engineered an in-memory distributed cache supporting concurrent TCP GET/SET operations with thread-safe hash indexing.",
        "Integrated master-replica synchronization with eventual consistency and automated heartbeat failover."
      ]
    }
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Tech Labs India",
      duration: "May 2025 - July 2025",
      bullets: [
        "Optimized MySQL database queries and indexed foreign keys, cutting average API response times by 35%.",
        "Collaborated in Agile sprints to ship 4 production microservices with 90%+ unit test coverage."
      ]
    }
  ],
  certifications: [
    "Oracle Certified Professional: Java SE 11 Developer",
    "AWS Certified Cloud Practitioner (CLF-C02)"
  ],
  achievements: [
    "Solved 350+ algorithmic problems across LeetCode, Codeforces, and GeeksforGeeks.",
    "National Finalist at Smart India Hackathon (SIH 2025) out of 15,000+ participating teams."
  ]
};

export default function ResumeBuilder() {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    resumeAPI.getResume().then(saved => {
      if (saved) {
        setResumeData(saved);
      } else if (user) {
        setResumeData(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            fullName: user.fullName || prev.personal.fullName,
            email: user.email || prev.personal.email
          }
        }));
      }
    });
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await resumeAPI.saveResume(resumeData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Education Helpers
  const handleAddEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", score: "", year: "" }]
    }));
  };

  const handleUpdateEducation = (idx, field, value) => {
    const updated = [...resumeData.education];
    updated[idx][field] = value;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  const handleRemoveEducation = (idx) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  // Projects Helpers
  const handleAddProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", technologies: "", bullets: [""] }]
    }));
  };

  const handleUpdateProject = (idx, field, value) => {
    const updated = [...resumeData.projects];
    updated[idx][field] = value;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleAddProjectBullet = (projIdx) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets.push("");
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleUpdateProjectBullet = (projIdx, bulletIdx, value) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets[bulletIdx] = value;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleRemoveProjectBullet = (projIdx, bulletIdx) => {
    const updated = [...resumeData.projects];
    updated[projIdx].bullets = updated[projIdx].bullets.filter((_, i) => i !== bulletIdx);
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const handleRemoveProject = (idx) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  // Experience Helpers
  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", duration: "", bullets: [""] }]
    }));
  };

  const handleUpdateExperience = (idx, field, value) => {
    const updated = [...resumeData.experience];
    updated[idx][field] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleAddExpBullet = (expIdx) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets.push("");
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleUpdateExpBullet = (expIdx, bulletIdx, value) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets[bulletIdx] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleRemoveExpBullet = (expIdx, bulletIdx) => {
    const updated = [...resumeData.experience];
    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleRemoveExperience = (idx) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  // Certifications & Achievements Helpers
  const handleAddCertification = () => {
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, ""] }));
  };

  const handleUpdateCertification = (idx, val) => {
    const updated = [...resumeData.certifications];
    updated[idx] = val;
    setResumeData(prev => ({ ...prev, certifications: updated }));
  };

  const handleRemoveCertification = (idx) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }));
  };

  const handleAddAchievement = () => {
    setResumeData(prev => ({ ...prev, achievements: [...prev.achievements, ""] }));
  };

  const handleUpdateAchievement = (idx, val) => {
    const updated = [...resumeData.achievements];
    updated[idx] = val;
    setResumeData(prev => ({ ...prev, achievements: updated }));
  };

  const handleRemoveAchievement = (idx) => {
    setResumeData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== idx) }));
  };

  const calculateATS = () => {
    let score = 50;
    if (resumeData.personal.fullName && resumeData.personal.email && resumeData.personal.phone) score += 10;
    if (resumeData.education.length > 0) score += 10;
    if (resumeData.skills.languages && resumeData.skills.frameworks) score += 10;
    if (resumeData.projects.length >= 2) score += 10;
    if (resumeData.experience.length > 0) score += 5;
    if (resumeData.certifications.length > 0) score += 5;
    return Math.min(score, 98);
  };

  const atsScore = calculateATS();

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-royal-600" />
            <span>Interactive ATS Resume Builder</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Build recruiter-approved single-page resumes formatted for campus placements & automated ATS screening
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Template Selection Pill */}
          <div className="flex items-center p-1 bg-purple-50 dark:bg-slate-800 rounded-xl border border-purple-200 dark:border-slate-700">
            {[
              { id: 'modern', label: 'Modern Minimalist' },
              { id: 'classic', label: 'Executive Classic' },
              { id: 'tech', label: 'Tech Developer' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setResumeData(prev => ({ ...prev, template: t.id }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  resumeData.template === t.id
                    ? 'bg-royal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-royal-500 font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-royal-600" />
                <span>{isSaving ? "Saving..." : "Save Draft"}</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-black text-xs shadow-md shadow-royal-600/25 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download as PDF</span>
          </button>
        </div>
      </div>

      {/* Quick ATS & Progress Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-lavender-50 to-white dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 border border-purple-100 dark:border-purple-900/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-royal-100 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 font-black text-sm">
            {atsScore}%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 dark:text-white">ATS Friendliness Score</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                Placement Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Standard section headings, chronological ordering, and action-verb metric bullets optimized for top campus ATS parsing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Active Template:</span>
          <span className="capitalize px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950/50 text-royal-700 dark:text-royal-300">
            {resumeData.template}
          </span>
        </div>
      </div>

      {/* Main Split Grid: Editor (Left) & Real Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Multi-Section Form */}
        <div className="lg:col-span-5 space-y-4 resume-editor-pane">
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800 overflow-x-auto shadow-sm">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Code2 },
              { id: 'projects', label: 'Projects', icon: FileText },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'extra', label: 'Extras', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-royal-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Tab Body */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* TAB: Personal Details */}
            {activeTab === 'personal' && (
              <div className="space-y-3.5">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-royal-600" />
                  <span>Personal & Contact Information</span>
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personal.fullName}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, fullName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    placeholder="e.g. Anusha Sharma"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.personal.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, phone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={resumeData.personal.location}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, location: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    placeholder="e.g. Bangalore, India"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.personal.linkedin}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, linkedin: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub</label>
                    <input
                      type="text"
                      value={resumeData.personal.github}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personal: { ...prev.personal, github: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Portfolio / Website</label>
                  <input
                    type="text"
                    value={resumeData.personal.portfolio}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, portfolio: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    placeholder="e.g. anushasharma.dev"
                  />
                </div>
              </div>
            )}

            {/* TAB: Education */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-royal-600" />
                    <span>Education Entries</span>
                  </h3>
                  <button
                    onClick={handleAddEducation}
                    className="px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950/50 hover:bg-royal-200 text-royal-700 dark:text-royal-300 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2.5 relative">
                    <button
                      onClick={() => handleRemoveEducation(idx)}
                      className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Degree / Certificate</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">College / Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">CGPA / %</label>
                        <input
                          type="text"
                          value={edu.score}
                          onChange={(e) => handleUpdateEducation(idx, 'score', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Duration / Year</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleUpdateEducation(idx, 'year', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: Technical Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-3.5">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-royal-600" />
                  <span>Technical Skills</span>
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Programming Languages
                  </label>
                  <input
                    type="text"
                    value={resumeData.skills.languages}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      skills: { ...prev.skills, languages: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white"
                    placeholder="Java, Python, C++, SQL, JavaScript"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Frameworks & Web Technologies
                  </label>
                  <input
                    type="text"
                    value={resumeData.skills.frameworks}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      skills: { ...prev.skills, frameworks: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white"
                    placeholder="React.js, Node.js, Express, Tailwind CSS"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Developer Tools & Cloud
                  </label>
                  <input
                    type="text"
                    value={resumeData.skills.developerTools}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      skills: { ...prev.skills, developerTools: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white"
                    placeholder="Git, GitHub, Docker, Postman, Linux"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Core CS Fundamentals
                  </label>
                  <input
                    type="text"
                    value={resumeData.skills.coreConcepts}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      skills: { ...prev.skills, coreConcepts: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-purple-50/20 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-white"
                    placeholder="Data Structures & Algorithms, DBMS, Operating Systems"
                  />
                </div>
              </div>
            )}

            {/* TAB: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-royal-600" />
                    <span>Projects</span>
                  </h3>
                  <button
                    onClick={handleAddProject}
                    className="px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950/50 hover:bg-royal-200 text-royal-700 dark:text-royal-300 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {resumeData.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveProject(pIdx)}
                      className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(pIdx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => handleUpdateProject(pIdx, 'technologies', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Bullet Points (Action Verbs)</label>
                        <button
                          onClick={() => handleAddProjectBullet(pIdx)}
                          className="text-[11px] font-bold text-royal-600 hover:underline"
                        >
                          + Bullet
                        </button>
                      </div>
                      {proj.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => handleUpdateProjectBullet(pIdx, bIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                            placeholder="e.g. Developed scalable REST API..."
                          />
                          <button
                            onClick={() => handleRemoveProjectBullet(pIdx, bIdx)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-royal-600" />
                    <span>Work Experience & Internships</span>
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950/50 hover:bg-royal-200 text-royal-700 dark:text-royal-300 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                {resumeData.experience.map((exp, eIdx) => (
                  <div key={eIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveExperience(eIdx)}
                      className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Role / Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(eIdx, 'role', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(eIdx, 'company', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => handleUpdateExperience(eIdx, 'duration', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Impact & Accomplishments</label>
                        <button
                          onClick={() => handleAddExpBullet(eIdx)}
                          className="text-[11px] font-bold text-royal-600 hover:underline"
                        >
                          + Bullet
                        </button>
                      </div>
                      {exp.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={b}
                            onChange={(e) => handleUpdateExpBullet(eIdx, bIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                          />
                          <button
                            onClick={() => handleRemoveExpBullet(eIdx, bIdx)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: Extras (Certifications & Achievements) */}
            {activeTab === 'extra' && (
              <div className="space-y-5">
                {/* Certifications */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                      Certifications
                    </h4>
                    <button
                      onClick={handleAddCertification}
                      className="text-xs font-bold text-royal-600 hover:underline"
                    >
                      + Add Cert
                    </button>
                  </div>
                  {resumeData.certifications.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={c}
                        onChange={(e) => handleUpdateCertification(idx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                      <button
                        onClick={() => handleRemoveCertification(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <button
                      onClick={handleAddAchievement}
                      className="text-xs font-bold text-royal-600 hover:underline"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  {resumeData.achievements.map((a, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={a}
                        onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                      />
                      <button
                        onClick={() => handleRemoveAchievement(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live A4 Printable ATS Resume Preview */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="font-bold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-royal-600" />
              Live A4 Document Preview
            </span>
            <span>Formatted for automated ATS parsing</span>
          </div>

          {/* Printable White Paper Document */}
          <div className="bg-slate-200 dark:bg-slate-950/60 p-4 sm:p-6 rounded-3xl border border-purple-100 dark:border-slate-800 overflow-x-auto shadow-inner">
            <div 
              id="resume-printable-document"
              className={`resume-print-area max-w-[800px] mx-auto bg-white text-slate-900 shadow-xl rounded-xl p-8 sm:p-10 font-sans transition-all text-[12.5px] leading-relaxed ${
                resumeData.template === 'classic' ? 'font-serif' : ''
              }`}
            >
              
              {/* --- TEMPLATE 1: MODERN MINIMALIST --- */}
              {resumeData.template === 'modern' && (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="border-b-2 border-royal-600 pb-3 text-center">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                      {resumeData.personal.fullName || "Your Full Name"}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-600 text-[11px] font-semibold mt-1">
                      {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                      {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
                      {resumeData.personal.location && <span>• {resumeData.personal.location}</span>}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-royal-700 text-[11px] font-semibold mt-0.5">
                      {resumeData.personal.linkedin && <span>{resumeData.personal.linkedin}</span>}
                      {resumeData.personal.github && <span>• {resumeData.personal.github}</span>}
                      {resumeData.personal.portfolio && <span>• {resumeData.personal.portfolio}</span>}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline">
                          <div>
                            <span className="font-bold text-slate-900">{edu.institution}</span>
                            <span className="text-slate-600 block text-[11.5px]">{edu.degree}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-800">{edu.score}</span>
                            <span className="text-slate-500 block text-[11px]">{edu.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      Technical Skills
                    </h2>
                    <div className="space-y-1 text-[11.5px]">
                      <div><strong className="text-slate-900">Languages:</strong> <span className="text-slate-700">{resumeData.skills.languages}</span></div>
                      <div><strong className="text-slate-900">Frameworks:</strong> <span className="text-slate-700">{resumeData.skills.frameworks}</span></div>
                      <div><strong className="text-slate-900">Developer Tools:</strong> <span className="text-slate-700">{resumeData.skills.developerTools}</span></div>
                      <div><strong className="text-slate-900">Core Fundamentals:</strong> <span className="text-slate-700">{resumeData.skills.coreConcepts}</span></div>
                    </div>
                  </div>

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                        Professional Experience
                      </h2>
                      <div className="space-y-2.5">
                        {resumeData.experience.map((exp, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>{exp.role} — <span className="text-royal-700">{exp.company}</span></span>
                              <span className="text-slate-500 text-[11px]">{exp.duration}</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-700 text-[11.5px] space-y-0.5 mt-1">
                              {exp.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="leading-tight">{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  <div>
                    <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      Academic & Engineering Projects
                    </h2>
                    <div className="space-y-2.5">
                      {resumeData.projects.map((proj, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{proj.title}</span>
                            <span className="text-slate-500 text-[11px] font-medium">{proj.technologies}</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-700 text-[11.5px] space-y-0.5 mt-1">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-tight">{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications & Achievements */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                        Certifications
                      </h2>
                      <ul className="list-disc list-inside text-slate-700 text-[11px] space-y-0.5">
                        {resumeData.certifications.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xs font-black text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                        Achievements
                      </h2>
                      <ul className="list-disc list-inside text-slate-700 text-[11px] space-y-0.5">
                        {resumeData.achievements.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TEMPLATE 2: EXECUTIVE CLASSIC --- */}
              {resumeData.template === 'classic' && (
                <div className="space-y-4 font-serif">
                  {/* Header */}
                  <div className="border-b-2 border-slate-800 pb-2 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-normal">
                      {resumeData.personal.fullName}
                    </h1>
                    <div className="text-[11px] text-slate-700 mt-1">
                      {resumeData.personal.location} | {resumeData.personal.phone} | {resumeData.personal.email}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5 font-sans">
                      {resumeData.personal.linkedin} • {resumeData.personal.github}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2 font-sans text-slate-900">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between text-[12px]">
                          <div>
                            <strong>{edu.institution}</strong>, {edu.degree}
                          </div>
                          <div>
                            <span>{edu.score} | {edu.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2 font-sans text-slate-900">
                      Technical Skills
                    </h2>
                    <div className="space-y-1 text-[11.5px] font-sans">
                      <div><strong>Languages:</strong> {resumeData.skills.languages}</div>
                      <div><strong>Frameworks & Libraries:</strong> {resumeData.skills.frameworks}</div>
                      <div><strong>Tools & Platforms:</strong> {resumeData.skills.developerTools}</div>
                      <div><strong>Core Concepts:</strong> {resumeData.skills.coreConcepts}</div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2 font-sans text-slate-900">
                      Projects
                    </h2>
                    <div className="space-y-2.5">
                      {resumeData.projects.map((proj, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-[12px] font-sans">
                            <strong>{proj.title}</strong>
                            <em className="text-slate-600 text-[11px]">{proj.technologies}</em>
                          </div>
                          <ul className="list-disc list-inside text-slate-800 text-[11.5px] space-y-0.5 mt-0.5">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2 font-sans text-slate-900">
                        Experience
                      </h2>
                      <div className="space-y-2">
                        {resumeData.experience.map((exp, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-[12px]">
                              <strong>{exp.company} — {exp.role}</strong>
                              <span>{exp.duration}</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-800 text-[11.5px] space-y-0.5 mt-0.5">
                              {exp.bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Honors & Certifications */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2 font-sans text-slate-900">
                      Certifications & Honors
                    </h2>
                    <ul className="list-disc list-inside text-slate-800 text-[11px] space-y-0.5">
                      {resumeData.certifications.concat(resumeData.achievements).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* --- TEMPLATE 3: TECH DEVELOPER --- */}
              {resumeData.template === 'tech' && (
                <div className="space-y-4">
                  {/* Top Bar Terminal Style */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h1 className="text-xl font-mono font-bold text-white tracking-wide">
                          {resumeData.personal.fullName}
                        </h1>
                        <p className="text-purple-300 text-xs font-mono mt-0.5">
                          Full-Stack Engineer & Problem Solver
                        </p>
                      </div>
                      <div className="text-right text-[11px] font-mono text-slate-300">
                        <div>{resumeData.personal.email}</div>
                        <div>{resumeData.personal.phone}</div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-3 text-[10.5px] font-mono text-purple-200">
                      <span>github: {resumeData.personal.github}</span>
                      <span>•</span>
                      <span>linkedin: {resumeData.personal.linkedin}</span>
                      <span>•</span>
                      <span>web: {resumeData.personal.portfolio}</span>
                    </div>
                  </div>

                  {/* Skills Section with Tags */}
                  <div>
                    <h2 className="text-xs font-mono font-bold text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      // TECHNICAL PROFICIENCIES
                    </h2>
                    <div className="space-y-1.5 text-[11.5px]">
                      <div>
                        <span className="font-mono text-slate-500 font-bold">LANGUAGES: </span>
                        <span className="font-semibold text-slate-800">{resumeData.skills.languages}</span>
                      </div>
                      <div>
                        <span className="font-mono text-slate-500 font-bold">STACK: </span>
                        <span className="font-semibold text-slate-800">{resumeData.skills.frameworks}</span>
                      </div>
                      <div>
                        <span className="font-mono text-slate-500 font-bold">INFRA & TOOLS: </span>
                        <span className="font-semibold text-slate-800">{resumeData.skills.developerTools}</span>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h2 className="text-xs font-mono font-bold text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      // FEATURED CODE BASES
                    </h2>
                    <div className="space-y-2.5">
                      {resumeData.projects.map((proj, idx) => (
                        <div key={idx} className="border-l-2 border-royal-500 pl-3">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900">{proj.title}</span>
                            <span className="font-mono text-[10.5px] text-royal-700 font-semibold">{proj.technologies}</span>
                          </div>
                          <ul className="text-slate-700 text-[11.5px] space-y-0.5 mt-1 list-disc list-inside">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div>
                      <h2 className="text-xs font-mono font-bold text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                        // INDUSTRY EXPERIENCE
                      </h2>
                      <div className="space-y-2">
                        {resumeData.experience.map((exp, idx) => (
                          <div key={idx} className="border-l-2 border-purple-300 pl-3">
                            <div className="flex justify-between items-baseline font-bold text-slate-900">
                              <span>{exp.role} @ {exp.company}</span>
                              <span className="text-[11px] font-mono text-slate-500">{exp.duration}</span>
                            </div>
                            <ul className="text-slate-700 text-[11.5px] space-y-0.5 mt-1 list-disc list-inside">
                              {exp.bullets.map((b, bIdx) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  <div>
                    <h2 className="text-xs font-mono font-bold text-royal-700 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                      // ACADEMIC CREDENTIALS
                    </h2>
                    <div className="space-y-1.5">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between text-[11.5px]">
                          <div>
                            <span className="font-bold text-slate-900">{edu.institution}</span> — <span className="text-slate-600">{edu.degree}</span>
                          </div>
                          <div className="font-mono text-[11px] font-bold text-slate-700">
                            {edu.score} ({edu.year})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
