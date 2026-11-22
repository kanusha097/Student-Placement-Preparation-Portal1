import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Code2, 
  BrainCircuit, 
  FileCheck2, 
  Mic2, 
  BookOpenCheck, 
  FileText, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Award, 
  ShieldCheck,
  Star,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  Phone,
  MapPin
} from 'lucide-react';

export default function LandingPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', college: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ name: '', email: '', college: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="space-y-24 py-6 scroll-smooth">
      
      {/* 1. Hero Section */}
      <section id="home" className="relative text-center max-w-4xl mx-auto pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-royal-950/60 border border-purple-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-royal-600 dark:text-royal-400" />
          The All-in-One Campus Placement Preparation Suite
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Your Journey to a Successful <br />
          <span className="bg-gradient-to-r from-royal-600 via-royal-500 to-lavender-500 bg-clip-text text-transparent">
            Placement Starts Here.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Crack campus recruitment with hands-on coding practice in Java & Python, timed aptitude tests, mock examinations, AI interview feedback, and tailored blueprints for top MNCs.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-base shadow-lg shadow-royal-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700/60 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Explore Features
          </a>
        </div>

        {/* Highlight Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 50+ Real Coding Challenges</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant MCQ Explanations</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI-Powered Mock Interviews</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS Single-Page Resume</span>
        </div>
      </section>

      {/* 2. Success Statistics */}
      <section id="stats" className="relative p-8 rounded-3xl bg-gradient-to-r from-royal-700 via-royal-600 to-indigo-800 text-white shadow-2xl shadow-royal-600/20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black">Proven Student Success Statistics</h2>
          <p className="text-purple-200 text-sm mt-2">Measured across engineering universities nationwide</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">94.8%</p>
            <p className="text-xs sm:text-sm font-medium text-purple-100 mt-1">Placement Success Rate</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">15,000+</p>
            <p className="text-xs sm:text-sm font-medium text-purple-100 mt-1">Students Prepared</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">120+</p>
            <p className="text-xs sm:text-sm font-medium text-purple-100 mt-1">Mock Exam Blueprints</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">₹8.5 LPA</p>
            <p className="text-xs sm:text-sm font-medium text-purple-100 mt-1">Average Starting Package</p>
          </div>
        </div>
      </section>

      {/* 3. Feature Overview */}
      <section id="features" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400 uppercase tracking-widest">
            Modules & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Everything You Need for Campus Hiring
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm">
            Curated preparation modules designed by senior software architects and hiring managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-royal-100 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Coding Practice Arena</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Solve DSA problems in Java, Python, and C++ with test cases, syntax editor, and safe sandbox execution.
            </p>
            <Link to="/coding" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Open Coding Arena <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Aptitude & Reasoning</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Quantitative, Logical, Verbal, and Data Interpretation MCQs with detailed explanations for every step.
            </p>
            <Link to="/aptitude" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Practice Aptitude <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Full-Length Mock Exams</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Real examination simulator with countdown timer, question palette, review flags, and automated reports.
            </p>
            <Link to="/mock-tests" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Start Mock Exam <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mic2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">HR & AI Mock Interviews</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Structured behavioral templates (Tell me about yourself, Strengths) and interactive AI answer evaluation.
            </p>
            <Link to="/interview" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Practice Interview <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">ATS Resume Builder</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Design a recruiter-ready single-page resume with clean formatting and instant high-resolution PDF download.
            </p>
            <Link to="/resume" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Build My Resume <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Company Specific Modules</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Verified recruitment roadmaps, rounds, and syllabus for TCS, Infosys, Wipro, Accenture, Cognizant & Deloitte.
            </p>
            <Link to="/companies" className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 mt-4 group-hover:translate-x-1 transition-transform">
              Explore Companies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. How it Works */}
      <section id="how-it-works" className="space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400 uppercase tracking-widest">
            A Proven Preparation Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            Follow this 4-step framework to maximize your campus placement readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm text-center relative hover:scale-105 transition-transform">
            <span className="w-10 h-10 rounded-full bg-royal-600 text-white font-extrabold text-base flex items-center justify-center mx-auto mb-4 shadow-md">
              1
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Benchmark Skill Level</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Take an initial diagnostic test to discover your starting Placement Readiness Score and target weaknesses.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm text-center relative hover:scale-105 transition-transform">
            <span className="w-10 h-10 rounded-full bg-royal-600 text-white font-extrabold text-base flex items-center justify-center mx-auto mb-4 shadow-md">
              2
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Build Learning Streaks</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Solve the daily coding challenge and 15 aptitude problems every morning to build consistency.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm text-center relative hover:scale-105 transition-transform">
            <span className="w-10 h-10 rounded-full bg-royal-600 text-white font-extrabold text-base flex items-center justify-center mx-auto mb-4 shadow-md">
              3
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Simulate Live Exams</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Experience the actual TCS, Infosys, and Wipro test environments with timers and section navigation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm text-center relative hover:scale-105 transition-transform">
            <span className="w-10 h-10 rounded-full bg-royal-600 text-white font-extrabold text-base flex items-center justify-center mx-auto mb-4 shadow-md">
              4
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Secure the Offer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Refine your answers with AI mock interviews, polish your resume, and enter your campus drive with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Placed Student Testimonials */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400 uppercase tracking-widest">
            Student Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Placed at Dream Companies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "The TCS NQT mock examination simulator was identical to the actual exam. The timer and section navigation prepared me mentally and I got placed in TCS Digital with 7.5 LPA!"
            </p>
            <div className="pt-2 border-t border-purple-50 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center font-bold text-xs">
                AK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Aakash Kumar</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Placed at TCS Digital</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "The AI mock interview feedback helped me structure my answers using the STAR method. I used to struggle with 'Tell me about yourself', but during my Infosys round I nailed it!"
            </p>
            <div className="pt-2 border-t border-purple-50 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                PM
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Pooja Mishra</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Placed at Infosys SP (9.5 LPA)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "The ATS Resume builder formatted my project experience in one clean page. The recruiters at Accenture specifically praised the clear layout and technical skill breakdown."
            </p>
            <div className="pt-2 border-t border-purple-50 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                RS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Rohan Sen</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Placed at Accenture ASE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. About the Platform */}
      <section id="about" className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400 uppercase tracking-widest">
            About PlacementPrep
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Bridging Academics & Corporate Placement Readiness
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
            Engineering curriculums often focus on theoretical depth, while campus recruitment evaluates rapid algorithmic problem-solving, cognitive speed, and articulate communication under intense time limits. 
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
            PlacementPrep bridges this gap by unifying coding sandboxes, quantitative aptitude trainers, mock examination halls, and corporate interview prep into a single, cohesive educational SaaS platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-50 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50">
            <h4 className="font-bold text-sm text-royal-700 dark:text-royal-300">Open Access</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Built to democratize high-quality placement training for all engineering students.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50">
            <h4 className="font-bold text-sm text-royal-700 dark:text-royal-300">Industry Curated</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Questions and patterns continuously refreshed to mirror ongoing campus drive trends.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50">
            <h4 className="font-bold text-sm text-royal-700 dark:text-royal-300">Analytics Driven</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Every attempt calculates percentile metrics, topic strengths, and daily consistency streaks.</p>
          </div>
        </div>
      </section>

      {/* 7. Contact Us Section */}
      <section id="contact" className="p-8 sm:p-12 rounded-3xl bg-purple-50/60 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400 uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contact PlacementPrep
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            Have questions about college partnerships, bulk access, or need guidance on placement rounds? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-royal-600" />
                <span>Placement Support Desk</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                National Technology Innovation Park, Bangalore, Karnataka, India
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-600" />
                <span>Email Assistance</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                support@placementprep.edu (Response within 24 hours)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-royal-600" />
                <span>Helpline</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                +91 (080) 4123-9870 (Mon - Sat, 9:00 AM - 6:00 PM)
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-sm">
            {contactSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Inquiry Received!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you for reaching out. A placement counselor will respond to <strong className="font-semibold">{contactForm.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Anusha Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-royal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="student@college.edu"
                      className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-royal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College / Institution</label>
                  <input
                    type="text"
                    value={contactForm.college}
                    onChange={(e) => setContactForm({ ...contactForm, college: e.target.value })}
                    placeholder="National Institute of Technology"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we help your placement preparation?"
                    className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-royal-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-xs shadow-md shadow-royal-600/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
