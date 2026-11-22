import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  MicOff, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  RefreshCw, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  ThumbsUp, 
  AlertCircle, 
  Volume2, 
  Copy, 
  Check, 
  Layers,
  ArrowRight,
  Database,
  Cpu,
  Network
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { interviewAPI } from '../services/api';

const DEFAULT_HR_QUESTIONS = [
  {
    id: 1,
    question: "Tell me about yourself.",
    category: "Introduction",
    framework: "Present, Past, Future Model",
    keyPoints: [
      "Present: Degree, college, core technical skills (Java/Python, Full-Stack, DSA).",
      "Past: Key accomplishments, real-world projects, or internship achievements.",
      "Future: Why you are passionate about joining this specific engineering team."
    ],
    sampleAnswer: "I am a final-year Computer Science student at National Institute of Technology with a strong passion for scalable full-stack development and data structures. Recently, I built an end-to-end placement preparation platform and completed an internship where I optimized API response times by 35%. I'm now eager to bring my problem-solving skills and fast learning agility to your engineering team.",
    pitfall: "Avoid reciting your resume line-by-line or talking about personal non-professional hobbies."
  },
  {
    id: 2,
    question: "What are your greatest strengths and weaknesses?",
    category: "Self-Awareness",
    framework: "Self-Awareness & Continuous Improvement",
    keyPoints: [
      "Strength: Focus on technical resilience, rapid adaptability, or deep debugging ability.",
      "Weakness: Pick a genuine non-fatal trait (e.g. hesitating to delegate early) and explain your active remediation steps."
    ],
    sampleAnswer: "My greatest strength is analytical resilience; when faced with complex production bugs or algorithmic problems, I systematically trace logs and break down inputs. A weakness I previously had was spending too long trying to solve a roadblock alone before asking for guidance. I now set a strict 45-minute timer to attempt troubleshooting before consulting peers, which has boosted my team productivity.",
    pitfall: "Never say 'I have no weaknesses' or 'I work too hard'—interviewers see right through fake answers."
  },
  {
    id: 3,
    question: "Why should we hire you over other candidates?",
    category: "Value Proposition",
    framework: "Competence + Culture Fit + Dedication",
    keyPoints: [
      "Technical alignment with the company's stack.",
      "Demonstrated consistency through coding streaks and project delivery.",
      "Enthusiasm to take ownership and adapt quickly to team practices."
    ],
    sampleAnswer: "While many candidates possess the requisite technical qualifications, I combine strong algorithmic foundations with hands-on full-stack development and team collaboration. My track record of maintaining a 30-day coding streak and delivering production-ready web applications demonstrates high discipline and self-motivation, enabling me to contribute value from day one.",
    pitfall: "Do not disparage other applicants; keep the focus strictly on your unique combination of skills and work ethic."
  },
  {
    id: 4,
    question: "Where do you see yourself in 3 to 5 years?",
    category: "Career Vision",
    framework: "Growth, Mastery & Contribution",
    keyPoints: [
      "Aspiration to achieve deep technical expertise in distributed systems or cloud architecture.",
      "Taking on module ownership and mentoring incoming junior developers.",
      "Contributing directly to the company's core engineering deliverables."
    ],
    sampleAnswer: "In the next 3 to 5 years, I envision myself growing from an associate software engineer into a senior technical contributor. I want to develop deep expertise in distributed systems and cloud architecture, while taking on the responsibility of mentoring incoming campus hires and driving mission-critical projects within the company.",
    pitfall: "Don't say you plan to leave for higher studies (MBA/MS) or start your own startup within a year."
  },
  {
    id: 5,
    question: "Describe a time when you had a conflict with a team member and how you resolved it.",
    category: "Teamwork & Behavioral",
    framework: "STAR Method (Situation, Task, Action, Result)",
    keyPoints: [
      "Situation: Academic or hackathon project deadline.",
      "Conflict: Difference in technical architecture or library choice.",
      "Action: Objective discussion with pros/cons and data-driven benchmark.",
      "Result: Successful delivery and improved mutual trust."
    ],
    sampleAnswer: "During our final-year capstone project, a teammate and I disagreed on whether to use MongoDB or PostgreSQL for storing user profiles. Instead of arguing opinion, I proposed setting up a rapid benchmark comparing query latency and schema stability for our specific use case. The test proved PostgreSQL was better suited for our relational queries. We implemented it, finished 3 days ahead of deadline, and achieved top marks.",
    pitfall: "Never place personal blame on the other party; emphasize data-driven consensus and mutual respect."
  }
];

const DEFAULT_TECH_TOPICS = {
  java: [
    {
      q: "Explain the internal working of HashMap in Java.",
      answer: "HashMap works on the principle of hashing. It uses an array of Node (buckets) where each Node contains hash, key, value, and next. In Java 8+, when bucket collisions exceed 8 nodes (TREEIFY_THRESHOLD) and array size is >= 64, the linked list converts into a balanced Red-Black Tree, reducing lookup from O(n) to O(log n)."
    },
    {
      q: "What is the difference between String, StringBuilder, and StringBuffer?",
      answer: "String is immutable and stored in the String Constant Pool. StringBuilder is mutable, fast, but not thread-safe (non-synchronized). StringBuffer is mutable and thread-safe because its methods are synchronized, making it slightly slower than StringBuilder in single-threaded environments."
    }
  ],
  python: [
    {
      q: "What is the Global Interpreter Lock (GIL) in Python, and how does it affect multithreading?",
      answer: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once in CPython. For CPU-bound tasks, multithreading does not provide true parallelism; multiprocessing or asyncio should be used instead. For I/O-bound tasks, the GIL is released during I/O operations."
    },
    {
      q: "Explain Generators and the 'yield' keyword in Python.",
      answer: "Generators are functions that return an iterator that yields one item at a time using 'yield'. Unlike normal functions that return an entire list in memory, generators maintain local state between calls and produce values on-the-fly (lazy evaluation), saving memory when processing massive data streams."
    }
  ],
  dbms: [
    {
      q: "Explain ACID properties in detail with real banking examples.",
      answer: "Atomicity: Entire transaction succeeds or rolls back (transfer of ₹1000 debits Account A and credits Account B together). Consistency: Database constraints remain valid before and after. Isolation: Concurrent transactions do not see intermediate uncommitted states. Durability: Once committed, updates persist permanently even after a system crash."
    },
    {
      q: "Differentiate between Clustered and Non-Clustered Indexes.",
      answer: "A Clustered Index alters the physical ordering of records in a table; there can only be one clustered index per table (typically the Primary Key). A Non-Clustered Index is a separate B-tree structure holding key values with pointers to the actual data row; multiple non-clustered indexes can exist on a table."
    }
  ],
  sql: [
    {
      q: "Write a SQL query to find the second highest salary from an Employee table.",
      answer: "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);\n\nOr using window functions:\nSELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) t WHERE rnk = 2;"
    },
    {
      q: "What is the difference between WHERE and HAVING clause in SQL?",
      answer: "WHERE filters individual rows before grouping occurs and cannot be used with aggregate functions. HAVING filters aggregated groups after GROUP BY has executed (e.g. HAVING COUNT(*) > 5)."
    }
  ],
  os: [
    {
      q: "What is Deadlock and what are the 4 necessary Coffman conditions?",
      answer: "A Deadlock occurs when a set of processes are blocked because each is holding a resource and waiting for another resource held by another process. The 4 conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait."
    },
    {
      q: "Differentiate between Process and Thread.",
      answer: "A Process is an executing program with its own dedicated memory space, registers, and file handles. A Thread is a lightweight subunit of execution within a process that shares code, data, and OS resources with sibling threads, but maintains its own stack and program counter."
    }
  ],
  cn: [
    {
      q: "Explain the TCP 3-Way Handshake mechanism.",
      answer: "1. Client sends SYN (synchronize) packet with initial sequence number x to Server.\n2. Server responds with SYN-ACK packet containing sequence number y and acknowledgment x + 1.\n3. Client replies with ACK packet acknowledging y + 1. Connection is established."
    },
    {
      q: "What is the difference between TCP and UDP?",
      answer: "TCP is connection-oriented, reliable (guarantees packet order and delivery via retransmissions), with congestion control. UDP is connectionless, unreliable (best-effort delivery without acknowledgments), but faster and with lower latency, ideal for video streaming and gaming."
    }
  ],
  oops: [
    {
      q: "Explain the 4 pillars of OOPs with real-world examples.",
      answer: "1. Encapsulation: Bundling data and methods into a single class with access control.\n2. Abstraction: Hiding internal complexity and exposing only essential interfaces.\n3. Inheritance: Reusing attributes and methods from a base class.\n4. Polymorphism: Performing a single action in different ways (Overloading & Overriding)."
    },
    {
      q: "What are SOLID design principles?",
      answer: "S: Single Responsibility Principle.\nO: Open/Closed Principle.\nI: Liskov Substitution Principle.\nI: Interface Segregation Principle.\nD: Dependency Inversion Principle."
    }
  ],
  dsa: [
    {
      q: "When would you prefer a Linked List over an Array?",
      answer: "Prefer a Linked List when dynamic size is critical, frequent insertions and deletions at the head/middle are required in O(1) time without contiguous memory reallocation, and when random indexed access is not needed."
    },
    {
      q: "Explain the difference between BFS and DFS graph traversals.",
      answer: "BFS uses a Queue to explore neighbor nodes level-by-level, making it optimal for finding the shortest path in unweighted graphs. DFS uses a Stack (or recursion) to explore as deep as possible along each branch before backtracking, useful for topological sort and cycle detection."
    }
  ]
};

const AI_QUESTIONS = [
  {
    id: 1,
    q: "Tell me about a challenging technical project you built, the architecture decisions you made, and how you handled difficulties under pressure.",
    domain: "Project Deep Dive & Architecture"
  },
  {
    id: 2,
    q: "How do you handle working under tight deadlines with conflicting requirements from stakeholders?",
    domain: "Behavioral & Prioritization"
  },
  {
    id: 3,
    q: "Explain the concept of RESTful APIs and how HTTP status codes are used appropriately.",
    domain: "System Design & Web Fundamentals"
  }
];

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('hr'); // 'hr', 'technical', 'ai'
  const [expandedHR, setExpandedHR] = useState({});
  const [selectedTechTopic, setSelectedTechTopic] = useState('java');

  // AI Mock Interview state
  const [currentAIIndex, setCurrentAIIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Toggle HR question expansion
  const toggleHRExpansion = (id) => {
    setExpandedHR(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Web Speech API Voice Recognition
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser. Please use Chrome or Edge, or type your answer directly.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setUserAnswer(prev => prev ? `${prev} ${currentTranscript}` : currentTranscript);
    };

    recognition.onerror = (e) => {
      console.error('Speech error:', e);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Submit Answer to AI Evaluator
  const handleEvaluateAI = async () => {
    if (!userAnswer.trim() || userAnswer.trim().length < 15) {
      alert("Please provide a more detailed response (at least 2-3 sentences) so the AI evaluator can analyze your communication.");
      return;
    }

    setIsEvaluating(true);
    try {
      const activeQ = AI_QUESTIONS[currentAIIndex];
      const res = await interviewAPI.evaluateAIAnswer(activeQ.id, userAnswer);
      if (res && res.evaluation) {
        setEvaluationResult(res.evaluation);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextAIQuestion = () => {
    setCurrentAIIndex((prev) => (prev + 1) % AI_QUESTIONS.length);
    setUserAnswer('');
    setEvaluationResult(null);
  };

  const currentQ = AI_QUESTIONS[currentAIIndex];
  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Mic2 className="w-7 h-7 text-rose-500" />
          Campus Placement Interview Preparation
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Master behavioral HR interviews, core CS technical concepts, and evaluate your voice & typed answers with the AI Mock Interviewer
        </p>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex p-1.5 rounded-2xl bg-purple-50 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-xs font-bold max-w-xl">
        <button
          onClick={() => setActiveTab('hr')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'hr' ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>HR Interview Masterclass</span>
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'technical' ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Technical Interview Hub</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'ai' ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>AI Mock Interview</span>
        </button>
      </div>

      {/* SECTION 1: HR INTERVIEW MASTERCLASS */}
      {activeTab === 'hr' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span className="font-semibold">💡 Top 5 High-Impact HR Behavioral Questions asked by TCS, Infosys, and Accenture</span>
            <span className="text-royal-600 dark:text-royal-400 font-bold">STAR Framework Ready</span>
          </div>

          {DEFAULT_HR_QUESTIONS.map((item, idx) => {
            const isExpanded = !!expandedHR[item.id];
            return (
              <div 
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4 transition-all"
              >
                <div 
                  onClick={() => toggleHRExpansion(item.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-royal-100 text-royal-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{item.question}</h3>
                      <p className="text-[11px] text-royal-600 dark:text-royal-400 font-semibold mt-0.5">
                        Category: {item.category} • Framework: {item.framework}
                      </p>
                    </div>
                  </div>

                  <button className="p-1.5 rounded-xl hover:bg-purple-50 text-slate-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-royal-600" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-purple-50 dark:border-slate-800 text-xs animate-in fade-in">
                    
                    {/* Key structural points */}
                    <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700 space-y-1.5">
                      <span className="font-bold text-royal-700 dark:text-royal-300 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Key Talking Points:
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-4 list-disc">
                        {item.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Model Answer */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommended Model Response:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed italic font-serif text-sm">
                        "{item.sampleAnswer}"
                      </p>
                    </div>

                    {/* Common Pitfall */}
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span><strong>Common Pitfall:</strong> {item.pitfall}</span>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: TECHNICAL INTERVIEW HUB */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          
          {/* Topic Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'java', name: 'Java' },
              { id: 'python', name: 'Python' },
              { id: 'dbms', name: 'DBMS' },
              { id: 'sql', name: 'SQL' },
              { id: 'os', name: 'Operating Systems' },
              { id: 'cn', name: 'Computer Networks' },
              { id: 'oops', name: 'OOPs Concepts' },
              { id: 'dsa', name: 'Data Structures' }
            ].map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTechTopic(topic.id)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedTechTopic === topic.id 
                    ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-purple-100 dark:border-slate-800 hover:bg-purple-50'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          {/* Technical Q&A Cards */}
          <div className="space-y-4">
            {(DEFAULT_TECH_TOPICS[selectedTechTopic] || []).map((tech, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-royal-100 text-royal-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-relaxed">
                    {tech.q}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 text-xs space-y-1.5 pl-6">
                  <span className="font-bold text-royal-700 dark:text-royal-300">Technical Answer & Architecture:</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                    {tech.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SECTION 3: INTERACTIVE AI MOCK INTERVIEW */}
      {activeTab === 'ai' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Question Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-royal-900 via-royal-800 to-indigo-950 text-white relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Interviewer • Question {currentAIIndex + 1} of {AI_QUESTIONS.length}</span>
              </span>
              <span className="text-xs text-purple-200 font-semibold">{currentQ.domain}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold leading-relaxed mt-2">
              "{currentQ.q}"
            </h3>
          </div>

          {/* Voice Input & Text Answer Workspace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>Your Answer:</span>
                <span className="font-normal text-slate-400">({wordCount} words)</span>
              </label>

              {/* Voice Input Toggle Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isRecording 
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse' 
                    : 'bg-purple-50 dark:bg-slate-800 border-purple-200 dark:border-slate-700 text-royal-700 dark:text-royal-300 hover:bg-purple-100'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic2 className="w-4 h-4 text-royal-600" />}
                <span>{isRecording ? 'Listening (Click to Stop)...' : 'Use Voice Input (Mic)'}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your response or click 'Use Voice Input' to speak your answer naturally. Follow the STAR framework (Situation, Task, Action, Result)..."
              className="w-full p-4 rounded-2xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-royal-500 leading-relaxed font-sans"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleEvaluateAI}
              disabled={isEvaluating || !userAnswer.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-xs shadow-md shadow-royal-600/25 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isEvaluating ? 'Evaluating with AI Rubric...' : 'Evaluate Answer with AI'}</span>
            </button>

            <button
              onClick={handleNextAIQuestion}
              className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-slate-700 hover:bg-purple-50 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Detailed AI Evaluation Report */}
          {evaluationResult && (
            <div className="p-6 rounded-3xl bg-purple-50/70 dark:bg-royal-950/30 border border-purple-200 dark:border-royal-900/60 space-y-4 animate-in fade-in duration-300">
              
              {/* Header metrics */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 dark:border-royal-900/40 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-royal-600" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base">AI Evaluation Scorecard</h4>
                    <p className="text-[11px] text-slate-500">Evaluated on Relevance, Technical Precision & Clarity</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
                    <p className="text-2xl font-black text-royal-600">{evaluationResult.score}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Clarity</span>
                    <p className="text-sm font-bold text-emerald-600">{evaluationResult.clarity}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tone</span>
                    <p className="text-sm font-bold text-indigo-600">{evaluationResult.communication}</p>
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Strengths Observed:
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {evaluationResult.strengths?.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 space-y-1">
                  <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> Areas for Improvement:
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {evaluationResult.improvements?.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggested Model Answer */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 text-xs space-y-1.5">
                <span className="font-bold text-royal-700 dark:text-royal-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Suggested Model Answer for Campus Drive:
                </span>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed italic font-serif text-sm">
                  "{evaluationResult.suggestedAnswer}"
                </p>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
