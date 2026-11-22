import React, { useState, useEffect } from 'react';
import { 
  Building2, CheckCircle2, ChevronRight, FileText, ArrowRight,
  Clock, ShieldAlert, Award, Code2, BrainCircuit, MessageSquare, 
  Lightbulb, ExternalLink, Sparkles, BookOpen, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyAPI } from '../services/api';

const DEFAULT_COMPANIES = [
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    tag: "TCS NQT",
    roles: ["Ninja (3.36 - 3.6 LPA)", "Digital (7.0 - 7.5 LPA)", "Prime (9.0 - 11.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout 10th, 12th, and B.Tech",
      backlogs: "Maximum 1 active backlog permitted at the time of examination",
      gapInStudies: "Maximum 24 months allowable with valid documentation"
    },
    overview: "TCS is India's largest IT multinational and a premier campus recruiter. The National Qualifier Test (NQT) is the primary gateway into Ninja, Digital, and Prime bands.",
    rounds: [
      {
        name: "Round 1: TCS NQT Cognitive & Technical Test",
        duration: "75 - 120 mins",
        details: "Section 1: Numerical Ability, Reasoning Ability, Verbal Ability.\nSection 2 (Advanced): Advanced Quantitative, Advanced Reasoning, and Hands-on Coding (2 problems)."
      },
      {
        name: "Round 2: Technical Interview",
        duration: "30 - 45 mins",
        details: "Core technical review covering Java/Python, OOPs, DBMS (SQL queries), project architecture, and coding logic tested in Round 1."
      },
      {
        name: "Round 3: Managerial & HR Round",
        duration: "20 - 30 mins",
        details: "Behavioral assessment, willingness to relocate, flexibility with shifts, situational judgment, and communication evaluation."
      }
    ],
    sampleAptitude: [
      { q: "Work & Time: If 12 men or 18 women can do a work in 14 days, how many days will 8 men and 16 women take?", ans: "9 days. Convert women to men: 18 women = 12 men => 1 woman = 2/3 man. 8 men + 16(2/3) men = 56/3 men. 12 * 14 = (56/3) * D => D = 9 days." },
      { q: "Profit & Loss: An article is marked 40% above cost price and sold with a 15% discount. Find the profit percentage.", ans: "19% profit. SP = CP * 1.40 * 0.85 = 1.19 CP." },
      { q: "Arrangements: In how many ways can 5 boys and 4 girls sit in a row such that girls always sit together?", ans: "17,280 ways. Treat 4 girls as 1 unit: 6! * 4! = 720 * 24 = 17,280." }
    ],
    sampleCoding: [
      { title: "Sweet Jar Optimization (Greedy)", level: "Easy", desc: "Given N jars each with a capacity and M coins, find maximum jars purchasable." },
      { title: "Spiral Matrix Traversal", level: "Medium", desc: "Print all elements of an N x M matrix in clockwise spiral sequence." },
      { title: "Group Anagrams", level: "Medium", desc: "Given an array of strings, group anagrams together in O(N * K) time." }
    ],
    technicalQuestions: [
      { q: "Why is Java not purely object-oriented? What is the role of wrapper classes?", ans: "Java supports primitive types (int, float, boolean) for performance, which are not objects. Wrapper classes (Integer, Double) wrap primitives into objects when collections or generics require reference types." },
      { q: "Write a query to find the department with the highest average salary.", ans: "SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id ORDER BY avg_sal DESC LIMIT 1;" },
      { q: "Explain the difference between call by value and call by reference.", ans: "Java is strictly call by value. For primitive types, the actual bit-value is copied; for objects, the memory address reference value is copied by value." }
    ],
    hrQuestions: [
      { q: "Why do you want to start your professional career at TCS?", ans: "Highlight TCS's global client footprint, initial learning training programs (ILP), stability, and immense scope to work on emerging cloud and AI digital transformation initiatives." },
      { q: "Are you comfortable working in rotating shifts or relocating to another base branch?", ans: "Always answer affirmatively with flexibility: 'As an engineering graduate at the beginning of my career, I am eager to embrace new challenges, locations, and working shifts to support project milestones.'" }
    ],
    tips: [
      "Accuracy matters heavily in the cognitive section due to negative marking in advanced questions.",
      "Ensure your coding solutions pass boundary cases (empty arrays, negative numbers, extreme constraints)."
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    tag: "InfyTQ / SP",
    roles: ["Systems Engineer (3.6 LPA)", "Digital Specialist Engineer - DSE (6.25 LPA)", "Specialist Programmer - SP (9.5 LPA)"],
    eligibility: {
      cgpa: "65% or 6.5 CGPA in engineering with no active backlogs",
      backlogs: "Zero active backlogs at time of joining",
      gapInStudies: "Up to 2 years allowable with medical/educational justification"
    },
    overview: "Infosys conducts on-campus and off-campus drives via InfyTQ and HackWithInfy, placing strong weight on pseudocode, algorithmic depth, and logical puzzles.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        duration: "100 mins",
        details: "Reasoning Ability (15 Qs), Technical Ability / Mathematical Thinking (10 Qs), Verbal Ability (20 Qs), and Pseudocode (5 Qs)."
      },
      {
        name: "Round 2: Technical & HR Discussion",
        duration: "35 - 50 mins",
        details: "In-depth code walkthrough, data structures (Trees & Dynamic Programming for SP/DSE), and culture fitment."
      }
    ],
    sampleAptitude: [
      { q: "Logical: 8 friends A, B, C, D, E, F, G, H are seated in a circle facing the center. If A is 3rd to right of B...", ans: "Standard circular permutation arrangement with 2 constraints. Trace step-by-step positions." },
      { q: "Series: Find the next term in 2, 6, 12, 20, 30, 42, ?", ans: "56. Difference sequence: +4, +6, +8, +10, +12, +14 => 42 + 14 = 56." }
    ],
    sampleCoding: [
      { title: "Longest Increasing Subsequence with Cost", level: "Hard", desc: "Find the maximum sum of strictly increasing elements in an array." },
      { title: "Network Delay Time (Dijkstra)", level: "Medium", desc: "Calculate shortest signal transmission delay across N routers." }
    ],
    technicalQuestions: [
      { q: "How does JVM perform Garbage Collection? What are Young and Old generations?", ans: "JVM heap is divided into Young Generation (Eden, S0, S1) and Old Generation. Minor GC collects short-lived objects in Young Gen; survivors get promoted to Old Gen where Major GC collects them." },
      { q: "Explain database indexing and when an index might degrade performance.", ans: "Indexes use B+ Trees to speed up SELECT lookups from O(N) to O(log N). However, each INSERT, UPDATE, or DELETE requires rebalancing index trees, degrading high-throughput write performance." }
    ],
    hrQuestions: [
      { q: "What did you learn from an internship or academic project failure?", ans: "Describe a real challenge, the root cause identified, corrective steps taken, and the positive takeaway (e.g., adding automated tests or better peer code reviews)." }
    ],
    tips: [
      "Pseudocode questions often test pointer dereferencing and recursion trace.",
      "For Specialist Programmer (SP), practice Medium/Hard Dynamic Programming questions on LeetCode."
    ]
  },
  {
    id: "wipro",
    name: "Wipro",
    tag: "Elite NLTH",
    roles: ["Project Engineer (3.5 LPA)", "Turbo Band (6.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout 10th, 12th, and Graduation",
      backlogs: "Max 1 active backlog allowed at test; 0 at joining",
      gapInStudies: "Maximum 3 years gap permitted"
    },
    overview: "Wipro Elite National Talent Hunt (NLTH) assesses engineering talent nationwide. Key differentiator is the rigorous written communication (essay) evaluation alongside coding.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        duration: "128 mins",
        details: "Section 1: Aptitude (Quant, Logical, Verbal - 48 mins).\nSection 2: Written Communication Essay (20 mins).\nSection 3: Coding (2 questions - 60 mins)."
      },
      {
        name: "Round 2: Technical & HR Discussion",
        duration: "30 - 45 mins",
        details: "Final combined interview discussing projects, problem-solving, and adaptability."
      }
    ],
    sampleAptitude: [
      { q: "A train running at 54 km/hr crosses an 180m bridge in 20 seconds. Find the length of the train.", ans: "120 meters. Speed = 54 * (5/18) = 15 m/s. Total distance = 15 * 20 = 300m. Train length = 300 - 180 = 120m." }
    ],
    sampleCoding: [
      { title: "Find Array Second Maximum without Sorting", level: "Easy", desc: "Single pass O(N) scan maintaining max and secondMax variables." },
      { title: "Palindrome Substring Count", level: "Medium", desc: "Count all palindromic substrings expanding around possible centers." }
    ],
    technicalQuestions: [
      { q: "What are the 4 pillars of OOPs and provide real-world examples for each?", ans: "Encapsulation (ATM machine hides cash dispensation mechanics), Abstraction (Car driving interface without internal engine details), Inheritance (SavingsAccount extends Account), Polymorphism (Shape.draw() executed by Circle or Square)." }
    ],
    hrQuestions: [
      { q: "Where do you see yourself in 3 years at Wipro?", ans: "Aim to grow from a graduate engineer into a certified module lead or cloud solutions engineer delivering mission-critical applications." }
    ],
    tips: [
      "In the essay round, ensure no spelling mistakes and adhere strictly to 200-400 words.",
      "Code quality and clean variable naming are evaluated in Wipro's compiler."
    ]
  },
  {
    id: "accenture",
    name: "Accenture",
    tag: "ASE & FSE",
    roles: ["Associate Software Engineer - ASE (4.5 LPA)", "Full Stack Engineer - FSE (6.5 LPA)"],
    eligibility: {
      cgpa: "65% or 6.5 CGPA in engineering with no active backlogs",
      backlogs: "0 backlogs permitted at examination",
      gapInStudies: "Maximum 1 year gap allowable"
    },
    overview: "Accenture follows a multi-stage elimination model. Candidates must clear Cognitive & Technical before unlocking Coding and the AI-driven Communication Assessment.",
    rounds: [
      {
        name: "Round 1: Cognitive & Technical Assessment",
        duration: "90 mins",
        details: "90 questions: Cognitive (English, Critical Thinking, Abstract Reasoning) + Technical (Common App & MS Office, Pseudocode, Networking & Cloud)."
      },
      {
        name: "Round 2: Coding Assessment",
        duration: "45 mins",
        details: "2 algorithmic problems (Easy to Medium) testing arrays, strings, and hash tables."
      },
      {
        name: "Round 3: AI Communication Assessment",
        duration: "20 mins",
        details: "Automated spoken English test evaluating reading, sentence repetition, vocabulary, and impromptu storytelling."
      },
      {
        name: "Round 4: Technical & HR Interview",
        duration: "25 - 35 mins",
        details: "Resume verification, situational scenarios, and willingness to learn newer enterprise stacks."
      }
    ],
    sampleAptitude: [
      { q: "Abstract Reasoning: Sequence pattern recognition with 90-degree clockwise rotations and alternating symbols.", ans: "Track dot count and line rotations independently." }
    ],
    sampleCoding: [
      { title: "Binary String Operations", level: "Easy", desc: "Evaluate binary string with AND, OR, XOR operators from left to right." },
      { title: "Password Security Checker", level: "Easy", desc: "Validate length, at least 1 digit, 1 capital letter, and no spaces." }
    ],
    technicalQuestions: [
      { q: "What is the difference between TCP and UDP? When is UDP preferred?", ans: "TCP is connection-oriented, reliable, with 3-way handshakes and flow control (used for HTTP, email). UDP is connectionless and low-latency, preferred for video streaming, voice calls, and multiplayer gaming where packet loss is acceptable." }
    ],
    hrQuestions: [
      { q: "Tell me about a time you worked with an uncooperative team member.", ans: "Use STAR method: explain the context, how you had an open 1-on-1 dialogue to understand their blockers, aligned on shared tasks, and shipped the project successfully." }
    ],
    tips: [
      "MS Office, Cloud fundamentals, and Pseudocode questions are eliminate-or-proceed filters in Round 1.",
      "For the communication assessment, use a noise-canceling headset and speak at a steady, deliberate pace."
    ]
  },
  {
    id: "cognizant",
    name: "Cognizant",
    tag: "GenC & GenC Next",
    roles: ["GenC (4.0 LPA)", "GenC Elevate (4.5 - 5.25 LPA)", "GenC Next (6.75 - 7.0 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA in 10th, 12th, and B.Tech",
      backlogs: "Maximum 1 active backlog permitted during evaluation",
      gapInStudies: "Maximum 2 years gap allowed"
    },
    overview: "Cognizant conducts recruitment through GenC (service-oriented), GenC Elevate, and GenC Next (niche product/full-stack engineering).",
    rounds: [
      {
        name: "Round 1: Cognitive Aptitude or Skill-Based Assessment",
        duration: "80 - 100 mins",
        details: "GenC: Quantitative, Logical, and Verbal.\nGenC Next: Hands-on Full-Stack Coding, Database queries, and Cloud/API questions."
      },
      {
        name: "Round 2: Technical & HR Interview",
        duration: "30 - 45 mins",
        details: "In-depth interrogation on DBMS, SQL queries, system design basics, and candidate projects."
      }
    ],
    sampleAptitude: [
      { q: "Data Interpretation: Table showing quarterly revenue across 4 branches. Calculate branch B's percentage share.", ans: "Sum total revenue, divide branch B revenue by total and multiply by 100." }
    ],
    sampleCoding: [
      { title: "Reverse Words in a String", level: "Easy", desc: "Reverse the order of words without reversing individual word characters." },
      { title: "Find All Anagram Indices", level: "Medium", desc: "Sliding window string matching with frequency maps." }
    ],
    technicalQuestions: [
      { q: "Write an SQL query to retrieve the second highest salary without using LIMIT.", ans: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);" },
      { q: "Explain the difference between Primary Key and Unique Key.", ans: "A Primary Key uniquely identifies each record and NEVER permits NULL values (only 1 per table). A Unique Key prevents duplicate entries but permits NULLs (multiple unique keys allowed)." }
    ],
    hrQuestions: [
      { q: "Why Cognizant over other competitors?", ans: "Focus on Cognizant's deep client partnerships in healthcare and financial services, modern digital engineering focus, and diverse training cohorts." }
    ],
    tips: [
      "SQL queries involving JOINs, GROUP BY, and HAVING are almost guaranteed in Cognizant interviews.",
      "Understand the software development lifecycle (SDLC) models: Waterfall vs Agile Scrum."
    ]
  },
  {
    id: "capgemini",
    name: "Capgemini",
    tag: "Exceller",
    roles: ["Analyst (4.0 LPA)", "Senior Analyst (5.75 - 7.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout 10th, 12th, and Graduation",
      backlogs: "Zero active backlogs at time of assessment",
      gapInStudies: "Maximum 1 year gap permitted"
    },
    overview: "Capgemini Exceller process features a unique Game-Based Aptitude Assessment followed by Technical Assessment and Behavioral Profiling.",
    rounds: [
      {
        name: "Round 1: Technical & Game-Based Assessment",
        duration: "80 mins",
        details: "Section 1: Pseudocode (30 Qs - 30 mins).\nSection 2: English Communication (30 Qs - 30 mins).\nSection 3: Game-based Aptitude (4 games - 20 mins: Grid Challenge, Motion Challenge, Switch Challenge, Digit Challenge)."
      },
      {
        name: "Round 2: Behavioral Profiling",
        duration: "20 mins",
        details: "Psychometric personality assessment with situational scenarios. Non-elimination round."
      },
      {
        name: "Round 3: Technical & HR Interview",
        duration: "25 - 40 mins",
        details: "Project discussion, OOPs, database normalization, and cultural fitment."
      }
    ],
    sampleAptitude: [
      { q: "Game Challenge: Deduce 4-symbol rule transformations based on color and directional shifting in 15 seconds.", ans: "Tests working memory and rapid spatial cognitive reaction speed." }
    ],
    sampleCoding: [
      { title: "Matrix Diagonal Sum Difference", level: "Easy", desc: "Calculate absolute difference between principal and secondary diagonals." },
      { title: "Coin Change (Greedy / DP)", level: "Medium", desc: "Find minimum coins needed to make change for amount V." }
    ],
    technicalQuestions: [
      { q: "What is database normalization? Explain 1NF, 2NF, and 3NF.", ans: "Normalization reduces data redundancy and anomalies. 1NF ensures atomic columns; 2NF removes partial functional dependencies on candidate keys; 3NF removes transitive dependencies." }
    ],
    hrQuestions: [
      { q: "How do you prioritize multiple deadlines when exams and projects overlap?", ans: "Show maturity: prioritize with an Eisenhower matrix (urgent vs important), break tasks into daily milestones, and communicate proactively with mentors." }
    ],
    tips: [
      "Practice game-based cognitive apps (Dual N-Back, Lumosity) to sharpen reaction speed for the Game Round.",
      "Pseudocode questions heavily emphasize data type overflow and recursive termination."
    ]
  },
  {
    id: "deloitte",
    name: "Deloitte",
    tag: "Consulting / USI",
    roles: ["Analyst - Advisory & Consulting (4.5 - 7.6 LPA)", "Associate Analyst (4.0 - 5.0 LPA)"],
    eligibility: {
      cgpa: "60% or 6.5 CGPA in engineering with no active backlogs",
      backlogs: "No backlogs allowed",
      gapInStudies: "Maximum 1 year gap permitted"
    },
    overview: "Deloitte USI (U.S. India Offices) focuses on high-caliber business technology consulting, evaluating cognitive brilliance, case study problem solving, and leadership.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        duration: "75 mins",
        details: "Quantitative Ability (14 Qs), Logical Reasoning (14 Qs), and Verbal Ability (22 Qs). High sectional cutoffs."
      },
      {
        name: "Round 2: Group Discussion / Case Study Round",
        duration: "30 mins",
        details: "Case study problem analysis: Candidates are provided a business scenario and collaborate to propose a viable tech-enabled solution."
      },
      {
        name: "Round 3: Technical & Partner Interview",
        duration: "35 - 50 mins",
        details: "Deep dive into candidate background, architecture decisions, business understanding, and leadership principles."
      }
    ],
    sampleAptitude: [
      { q: "Pipes & Cisterns: Pipe A can fill a tank in 12 hours and Pipe B in 15 hours. If both open together, how long to fill?", ans: "6 hours 40 minutes. 1/12 + 1/15 = 9/60 = 3/20 tank/hr => 20/3 hours = 6 hours 40 mins." },
      { q: "Probability: Two dice are rolled simultaneously. What is the probability that the sum of faces is at least 10?", ans: "1/6. Pairs with sum >= 10: (4,6), (5,5), (5,6), (6,4), (6,5), (6,6) = 6 pairs. 6/36 = 1/6." }
    ],
    sampleCoding: [
      { title: "Two Sum with Pair Tracking", level: "Easy", desc: "Return 1-based indices of the two numbers that add up to target." },
      { title: "Stock Buy & Sell for Maximum Profit", level: "Easy", desc: "Calculate max profit achievable with a single transaction in O(N)." }
    ],
    technicalQuestions: [
      { q: "Explain the differences between SQL and NoSQL and when to choose each for enterprise apps.", ans: "SQL (relational) has predefined schemas, ACID compliance, and vertical scalability (best for financial transactions). NoSQL (document/key-value) offers flexible schema, eventual consistency, and horizontal scaling across clusters (best for unstructured big data and IoT)." },
      { q: "What is microservices architecture and how does API Gateway work?", ans: "Microservices decompose monolithic applications into autonomous, loosely coupled services communicating via REST or gRPC. The API Gateway serves as the single reverse-proxy entry point handling routing, auth, rate limiting, and SSL termination." }
    ],
    hrQuestions: [
      { q: "Walk me through a project where you solved a real business or user problem.", ans: "Emphasize user empathy, efficiency gains, and how your architectural choices delivered quantifiable business value." },
      { q: "Why Deloitte Consulting over pure product-based software companies?", ans: "Highlight desire to combine strong software engineering expertise with strategic business advisory across varied global industries." }
    ],
    tips: [
      "In the case study/discussion round, focus on structured communication; listen actively and build upon team points.",
      "Know the business impact of your academic projects (metrics, users, efficiency gained)."
    ]
  }
];

export default function CompanyPrep() {
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [selectedCompanyId, setSelectedCompanyId] = useState('tcs');
  const [activeSection, setActiveSection] = useState('overview');
  const [revealedAptitude, setRevealedAptitude] = useState({});

  useEffect(() => {
    companyAPI.getCompanies().then(data => {
      if (data && data.length > 0) {
        setCompanies(data);
      }
    });
  }, []);

  const activeCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const toggleAptitudeReveal = (idx) => {
    setRevealedAptitude(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-7 h-7 text-royal-600" />
            <span>Company-Specific Placement Preparation</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Complete syllabus, selection blueprints, eligibility criteria, real aptitude, coding & interview questions for top tier recruiters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/mock-tests"
            className="px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-royal-700 dark:text-royal-300 hover:bg-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Company Mock Tests</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/coding"
            className="px-3.5 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-royal-600/20 transition-all"
          >
            <span>Solve Coding Problems</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 7 Company Selector Badges / Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {companies.map(comp => {
          const isSelected = comp.id === activeCompany.id;
          return (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedCompanyId(comp.id);
                setRevealedAptitude({});
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-royal-600 to-royal-800 text-white border-royal-600 shadow-lg shadow-royal-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-purple-100 dark:border-slate-800 hover:border-royal-400 dark:hover:border-royal-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-100 dark:bg-purple-950/50 text-royal-700 dark:text-royal-300'
                  }`}>
                    {comp.tag || comp.id.toUpperCase()}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-purple-200" />}
                </div>
                <div className="font-extrabold text-xs line-clamp-1">
                  {comp.name.split('(')[0].trim()}
                </div>
              </div>

              <div className="mt-2 text-[10px] opacity-80 line-clamp-1">
                {comp.roles ? comp.roles[0] : "Multiple Bands"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Company Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-royal-900 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-royal-600/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-black bg-purple-500/30 text-purple-200 border border-purple-400/30 uppercase tracking-wider">
                Recruitment Blueprint
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Hiring Process
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {activeCompany.name}
            </h2>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              {activeCompany.overview}
            </p>

            {/* Hiring Bands */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-bold text-purple-300">Package Bands:</span>
              {activeCompany.roles?.map((r, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to="/mock-tests"
              className="px-4 py-2.5 rounded-xl bg-white text-royal-900 hover:bg-purple-50 font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Award className="w-4 h-4 text-royal-700" />
              <span>Take {activeCompany.id.toUpperCase()} Mock Exam</span>
            </Link>
            <Link
              to="/interview"
              className="px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-800 border border-purple-500/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Mock Interview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-purple-100 dark:border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Selection Process & Eligibility', icon: UserCheck },
          { id: 'aptitude', label: 'Aptitude Practice', icon: BrainCircuit },
          { id: 'coding', label: 'Coding Challenges', icon: Code2 },
          { id: 'technical', label: 'Technical Interview', icon: BookOpen },
          { id: 'hr', label: 'HR & Behavioral', icon: MessageSquare },
          { id: 'tips', label: 'Insider Tips & Hacks', icon: Lightbulb }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="space-y-6">

        {/* 1. OVERVIEW & ROUNDS */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Rounds Pipeline (8 Cols) */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-royal-600" />
                <span>Selection Pipeline & Round Breakdown</span>
              </h3>

              <div className="space-y-4">
                {activeCompany.rounds?.map((round, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700/60 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-extrabold text-xs text-royal-700 dark:text-purple-300">
                        {round.name}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-royal-100 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300 shrink-0">
                        Duration: {round.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {round.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Requirements (4 Cols) */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Eligibility Criteria</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] font-bold uppercase text-slate-500">CGPA / Percentage Cutoff</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">
                    {activeCompany.eligibility?.cgpa}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] font-bold uppercase text-slate-500">Active Backlogs Policy</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">
                    {activeCompany.eligibility?.backlogs}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] font-bold uppercase text-slate-500">Permitted Study Gap</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">
                    {activeCompany.eligibility?.gapInStudies}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300">
                Ensure official marks cards, provisional degree, and bonafide college ID are verified before campus test day.
              </div>
            </div>
          </div>
        )}

        {/* 2. APTITUDE PRACTICE */}
        {activeSection === 'aptitude' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-royal-600" />
                  <span>Frequently Tested Aptitude Patterns in {activeCompany.name}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click 'Reveal Solution' to verify formulas, shortcuts, and step-by-step logic
                </p>
              </div>

              <Link
                to="/aptitude"
                className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-royal-950/60 hover:bg-purple-200 text-royal-700 dark:text-royal-300 font-bold text-xs"
              >
                Go to Full Aptitude Module
              </Link>
            </div>

            <div className="space-y-3.5">
              {activeCompany.sampleAptitude?.map((item, idx) => {
                const questionText = typeof item === 'string' ? item : item.q;
                const answerText = typeof item === 'string' ? "Master formulas for work, time, and ratios with speed practice." : item.ans;
                const isRevealed = !!revealedAptitude[idx];

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-bold text-xs text-slate-800 dark:text-white leading-relaxed">
                        <span className="text-royal-600 mr-2 font-black">Q{idx + 1}.</span>
                        {questionText}
                      </div>
                      <button
                        onClick={() => toggleAptitudeReveal(idx)}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 text-royal-700 dark:text-purple-300 font-bold text-[11px] border border-purple-200 dark:border-slate-600 shadow-sm shrink-0"
                      >
                        {isRevealed ? "Hide Solution" : "Reveal Solution"}
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                        <strong className="block text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
                          Step-by-step Solution:
                        </strong>
                        {answerText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. CODING CHALLENGES */}
        {activeSection === 'coding' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-royal-600" />
                  <span>Curated Coding Challenges for {activeCompany.name}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Problems selected from actual recent campus recruitment drives
                </p>
              </div>

              <Link
                to="/coding"
                className="px-3.5 py-1.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shadow-sm"
              >
                Launch Code Editor
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeCompany.sampleCoding?.map((code, idx) => {
                const title = typeof code === 'string' ? code : code.title;
                const level = typeof code === 'string' ? 'Medium' : code.level;
                const desc = typeof code === 'string' ? 'Solve within constraints passing all edge cases.' : code.desc;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          level === 'Easy' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                          level === 'Hard' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                          'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                        }`}>
                          {level}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">Problem #{idx + 1}</span>
                      </div>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2">
                        {title}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-3">
                        {desc}
                      </p>
                    </div>

                    <Link
                      to="/coding"
                      className="w-full py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-purple-100 border border-purple-200 dark:border-slate-600 text-royal-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Solve in IDE</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. TECHNICAL INTERVIEW */}
        {activeSection === 'technical' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-royal-600" />
              <span>Technical Interview Questions & Recommended Answers</span>
            </h3>

            <div className="space-y-3.5">
              {activeCompany.technicalQuestions?.map((tq, idx) => {
                const question = typeof tq === 'string' ? tq : tq.q;
                const answer = typeof tq === 'string' ? 'Prepare clear conceptual explanations with simple diagrams or code snippets.' : tq.ans;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/30 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 space-y-2">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 flex items-center justify-center text-[10px] font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span>{question}</span>
                    </div>
                    <div className="pl-7 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-royal-600 dark:text-purple-400">Model Answer: </strong>
                      {answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. HR & BEHAVIORAL */}
        {activeSection === 'hr' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-royal-600" />
              <span>HR & Managerial Behavioral Questions</span>
            </h3>

            <div className="space-y-3.5">
              {activeCompany.hrQuestions?.map((hq, idx) => {
                const question = typeof hq === 'string' ? hq : hq.q;
                const answer = typeof hq === 'string' ? 'Adopt the STAR framework (Situation, Task, Action, Result) with honest, positive communication.' : hq.ans;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/30 dark:bg-slate-800/40 border border-purple-100 dark:border-slate-700 space-y-2">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 flex items-center justify-center text-[10px] font-black shrink-0">
                        HR
                      </span>
                      <span>{question}</span>
                    </div>
                    <div className="pl-7 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-royal-600 dark:text-purple-400">Winning Strategy: </strong>
                      {answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. INSIDER TIPS */}
        {activeSection === 'tips' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Placement Insider Tips & Exam Quirks for {activeCompany.name}</span>
            </h3>

            <div className="space-y-3">
              {activeCompany.tips?.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Ready to test your preparedness?</span>
                <span className="text-[11px] text-slate-500">Attempt our timed, realistic online mock exam simulation.</span>
              </div>
              <Link
                to="/mock-tests"
                className="px-4 py-2 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold text-xs shrink-0 shadow-sm"
              >
                Start Mock Test
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
