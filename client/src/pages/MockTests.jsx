import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  Building, 
  Bookmark, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  PieChart,
  BarChart,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockTestAPI } from '../services/api';

const DEFAULT_MOCK_TESTS = [
  {
    id: 1,
    title: "TCS National Qualifier Test (NQT) Comprehensive Simulator",
    company: "TCS",
    durationMinutes: 90,
    totalQuestions: 10,
    sections: ["Numerical Ability", "Reasoning Ability", "Verbal Ability", "Coding Logic"],
    difficulty: "Medium",
    passingPercentage: 65,
    marksPerQuestion: 3,
    negativeMarks: 1,
    description: "Matches the latest TCS NQT Foundation & Advanced cognitive pattern with negative marking.",
    questions: [
      {
        id: 101,
        section: "Numerical Ability",
        q: "A sum of ₹12,500 amounts to ₹15,500 in 4 years at simple interest. What is the rate of interest per annum?",
        options: ["5%", "6%", "7.5%", "8%"],
        correctIndex: 1,
        explanation: "Simple Interest = 15,500 - 12,500 = ₹3,000. SI = (P * R * T) / 100 => 3000 = (12500 * R * 4) / 100 => 3000 = 500 * R => R = 6%."
      },
      {
        id: 102,
        section: "Numerical Ability",
        q: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?",
        options: ["10 mins", "12 mins", "15 mins", "25 mins"],
        correctIndex: 1,
        explanation: "1/T = 1/20 + 1/30 = 5/60 = 1/12 => T = 12 minutes."
      },
      {
        id: 103,
        section: "Numerical Ability",
        q: "If 15 workers can construct a road in 20 days, how many days will 25 workers take working at the identical pace?",
        options: ["10 days", "12 days", "14 days", "16 days"],
        correctIndex: 1,
        explanation: "M1 * D1 = M2 * D2 => 15 * 20 = 25 * D2 => 300 = 25 * D2 => D2 = 12 days."
      },
      {
        id: 104,
        section: "Reasoning Ability",
        q: "Find the next missing number in the sequence: 4, 9, 25, 49, 121, ?",
        options: ["144", "169", "196", "225"],
        correctIndex: 1,
        explanation: "Squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2 = 169."
      },
      {
        id: 105,
        section: "Reasoning Ability",
        q: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that same cipher?",
        options: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "EOJDJFEM"],
        correctIndex: 0,
        explanation: "Reverse letters and increment inner characters by +1."
      },
      {
        id: 106,
        section: "Reasoning Ability",
        q: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
        options: ["Mother", "Sister", "Grandmother", "Aunt"],
        correctIndex: 0,
        explanation: "The only daughter of the woman's mother is the woman herself. Thus, she is his mother."
      },
      {
        id: 107,
        section: "Verbal Ability",
        q: "Select the word with the correct spelling:",
        options: ["Accomodate", "Accommodate", "Acommodate", "Accommadate"],
        correctIndex: 1,
        explanation: "Accommodate has double 'c' and double 'm'."
      },
      {
        id: 108,
        section: "Verbal Ability",
        q: "Fill in the blank: The team lead was delighted _______ the rapid turnaround of the sprint deliverables.",
        options: ["at", "with", "by", "on"],
        correctIndex: 1,
        explanation: "Standard usage with persons/outcomes is 'pleased/delighted with'."
      },
      {
        id: 109,
        section: "Coding Logic",
        q: "What is the search time complexity in a balanced Binary Search Tree (AVL Tree)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "Balanced height ensures lookup is always bounded to O(log n)."
      },
      {
        id: 110,
        section: "Coding Logic",
        q: "What will be the output of: int a = 5; int b = a++ + ++a; in C/Java?",
        options: ["11", "12", "13", "14"],
        correctIndex: 1,
        explanation: "a++ evaluates to 5 (a is 6). ++a increments to 7 and evaluates to 7. 5 + 7 = 12."
      }
    ]
  },
  {
    id: 2,
    title: "Infosys Specialist Programmer (SP) Assessment",
    company: "Infosys",
    durationMinutes: 100,
    totalQuestions: 2,
    sections: ["Mathematical Thinking", "Pseudocode Trace"],
    difficulty: "Hard",
    passingPercentage: 70,
    marksPerQuestion: 3,
    negativeMarks: 1,
    description: "Advanced algorithmic problem-solving and mathematical aptitude simulator.",
    questions: [
      {
        id: 201,
        section: "Mathematical Thinking",
        q: "How many trailing zeros does 100! (100 factorial) have?",
        options: ["20", "22", "24", "28"],
        correctIndex: 2,
        explanation: "Zeros = floor(100/5) + floor(100/25) = 20 + 4 = 24."
      },
      {
        id: 202,
        section: "Pseudocode Trace",
        q: "What is the output of standard Fibonacci f(4) where f(0)=1, f(1)=1?",
        options: ["3", "5", "8", "13"],
        correctIndex: 1,
        explanation: "f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5."
      }
    ]
  },
  {
    id: 3,
    title: "Wipro Elite National Talent Hunt (NLTH)",
    company: "Wipro",
    durationMinutes: 80,
    totalQuestions: 2,
    sections: ["Quantitative", "English"],
    difficulty: "Medium",
    passingPercentage: 60,
    marksPerQuestion: 3,
    negativeMarks: 1,
    description: "Standard Wipro NLTH cognitive and verbal reasoning test format.",
    questions: [
      {
        id: 301,
        section: "Quantitative",
        q: "A sum doubles in 8 years under simple interest. What is the annual interest rate?",
        options: ["10%", "12.5%", "15%", "16.6%"],
        correctIndex: 1,
        explanation: "SI = P. P = (P * R * 8)/100 => 8R = 100 => R = 12.5%."
      },
      {
        id: 302,
        section: "English",
        q: "Choose the synonym for 'CANDID':",
        options: ["Dishonest", "Frank & Outspoken", "Secretive", "Shy"],
        correctIndex: 1,
        explanation: "Candid means truthful and straightforward; frank."
      }
    ]
  },
  {
    id: 4,
    title: "Accenture ASE Placement Simulator",
    company: "Accenture",
    durationMinutes: 90,
    totalQuestions: 2,
    sections: ["Cognitive Assessment", "Technical Fundamentals"],
    difficulty: "Medium",
    passingPercentage: 65,
    marksPerQuestion: 3,
    negativeMarks: 0,
    description: "No negative marking exam format evaluating cloud, networking, and critical reasoning.",
    questions: [
      {
        id: 401,
        section: "Technical Fundamentals",
        q: "Which layer of the OSI model is responsible for packet routing across networks?",
        options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
        correctIndex: 1,
        explanation: "Layer 3 (Network Layer) performs IP routing."
      },
      {
        id: 402,
        section: "Cognitive Assessment",
        q: "Find the odd one out: 27, 64, 125, 144, 216",
        options: ["27", "64", "144", "216"],
        correctIndex: 2,
        explanation: "27=3^3, 64=4^3, 125=5^3, 216=6^3 are all cubes. 144 is a square (12^2), not a cube."
      }
    ]
  }
];

export default function MockTests() {
  const [catalog, setCatalog] = useState(DEFAULT_MOCK_TESTS);
  const [activeTest, setActiveTest] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [report, setReport] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load from API if online
  useEffect(() => {
    async function initCatalog() {
      const tests = await mockTestAPI.getTests();
      if (tests && tests.length > 0) {
        // If server summary is returned, keep detailed defaults for offline robustness
      }
    }
    initCatalog();
  }, []);

  // Countdown Timer
  useEffect(() => {
    let timer = null;
    if (activeTest && !examFinished && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest, examFinished, secondsRemaining]);

  const handleStartTest = (test) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setExamFinished(false);
    setReport(null);
    setSecondsRemaining(test.durationMinutes * 60);
  };

  const handleSelectOption = (optIndex) => {
    const qId = activeTest.questions[currentQIndex].id;
    setAnswers({ ...answers, [qId]: optIndex });
  };

  const handleClearResponse = () => {
    const qId = activeTest.questions[currentQIndex].id;
    const newAnswers = { ...answers };
    delete newAnswers[qId];
    setAnswers(newAnswers);
  };

  const handleToggleReview = () => {
    const qId = activeTest.questions[currentQIndex].id;
    setMarkedForReview({
      ...markedForReview,
      [qId]: !markedForReview[qId]
    });
  };

  const handleAutoSubmit = () => {
    handleSubmitExam();
  };

  const handleSubmitExam = async () => {
    setShowConfirmModal(false);
    setExamFinished(true);

    const questions = activeTest.questions;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    let marks = 0;
    const totalMarks = questions.length * activeTest.marksPerQuestion;

    const reviewList = questions.map((q) => {
      const chosen = answers[q.id];
      const isAnswered = chosen !== undefined && chosen !== null;
      const isCorrect = isAnswered && chosen === q.correctIndex;

      if (isAnswered) {
        if (isCorrect) {
          correct++;
          marks += activeTest.marksPerQuestion;
        } else {
          wrong++;
          marks -= activeTest.negativeMarks;
        }
      } else {
        unattempted++;
      }

      return {
        questionId: q.id,
        section: q.section,
        questionText: q.q,
        options: q.options,
        chosenOption: chosen,
        correctOption: q.correctIndex,
        isCorrect,
        isAnswered,
        explanation: q.explanation
      };
    });

    const finalMarks = Math.max(0, marks);
    const percentage = Math.round((finalMarks / totalMarks) * 100);
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const percentile = Math.min(99, Math.max(50, Math.round(50 + (percentage / 2))));

    const calculatedReport = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      company: activeTest.company,
      score: finalMarks,
      totalMarks,
      percentage,
      accuracy,
      percentile,
      correctCount: correct,
      wrongCount: wrong,
      unattemptedCount: unattempted,
      passed: percentage >= activeTest.passingPercentage,
      reviewList
    };

    setReport(calculatedReport);

    if (calculatedReport.passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // Attempt API save
    await mockTestAPI.submitTest(activeTest.id, answers);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // If in an active exam session
  if (activeTest && !examFinished) {
    const currentQ = activeTest.questions[currentQIndex];
    const isAnswered = answers[currentQ.id] !== undefined;
    const isMarked = !!markedForReview[currentQ.id];

    return (
      <div className="space-y-6">
        
        {/* Top Exam Header */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-royal-100 text-royal-700 uppercase">
                {activeTest.company}
              </span>
              <span className="text-xs text-slate-500 font-semibold">Section: {currentQ.section}</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1">
              {activeTest.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono font-bold text-sm shadow-sm ${
              secondsRemaining < 300 
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse' 
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 text-amber-800 dark:text-amber-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Time Left: {formatTimer(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-xs shadow-md"
            >
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Exam Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question Interface (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Question Info Bar */}
            <div className="flex items-center justify-between border-b border-purple-50 dark:border-slate-800 pb-3 text-xs">
              <span className="font-bold text-royal-600 uppercase">
                Question {currentQIndex + 1} of {activeTest.questions.length}
              </span>
              <span className="text-slate-500 font-medium">
                Marking: <strong className="text-emerald-600">+{activeTest.marksPerQuestion}</strong> / <strong className="text-rose-600">-{activeTest.negativeMarks}</strong>
              </span>
            </div>

            {/* Question Statement */}
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
              {currentQ.q}
            </p>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-100/70 dark:bg-royal-950/60 border-royal-600 text-royal-900 dark:text-white shadow-sm font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-purple-50 hover:border-royal-300 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span>
                      <strong className="text-slate-400 mr-3 font-mono">({String.fromCharCode(65 + optIdx)})</strong>
                      {option}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-royal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-50 dark:border-slate-800 text-xs">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReview}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
                    isMarked 
                      ? 'bg-amber-100 border-amber-300 text-amber-800' 
                      : 'border-slate-200 text-slate-600 hover:bg-purple-50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>

                {isAnswered && (
                  <button
                    onClick={handleClearResponse}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 font-semibold"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  disabled={currentQIndex === activeTest.questions.length - 1}
                  onClick={() => setCurrentQIndex(prev => Math.min(activeTest.questions.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold disabled:opacity-40 shadow-sm flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Question Palette (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Question Navigation Palette</h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" /> Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" /> Marked for Review
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-royal-600 inline-block" /> Current Question
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700 inline-block" /> Not Visited
              </span>
            </div>

            {/* Grid of numbers */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-purple-50 dark:border-slate-800">
              {activeTest.questions.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isRev = !!markedForReview[q.id];
                const isCur = currentQIndex === idx;

                let colorClass = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
                if (isCur) colorClass = "bg-royal-600 text-white ring-2 ring-royal-400 font-extrabold";
                else if (isRev) colorClass = "bg-amber-500 text-white font-bold";
                else if (isAns) colorClass = "bg-emerald-500 text-white font-bold";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-mono transition-all flex items-center justify-center ${colorClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Summary counters */}
            <div className="pt-3 border-t border-purple-50 dark:border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total Answered:</span>
                <span className="font-bold text-emerald-600">{Object.keys(answers).length}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Marked for Review:</span>
                <span className="font-bold text-amber-600">{Object.values(markedForReview).filter(Boolean).length}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Remaining:</span>
                <span className="font-bold">{activeTest.questions.length - Object.keys(answers).length}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-royal-100 text-royal-600 flex items-center justify-center mx-auto">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Submit Examination?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You have answered <strong>{Object.keys(answers).length}</strong> of <strong>{activeTest.questions.length}</strong> questions. 
                Are you ready to submit and calculate your detailed placement report?
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  Return to Exam
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold shadow-md"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // If viewing post-exam performance report
  if (report) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        
        {/* Report Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl ${
          report.passed 
            ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-royal-800' 
            : 'bg-gradient-to-r from-rose-800 via-purple-800 to-indigo-900'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 uppercase tracking-wider">
                Exam Performance Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">{report.testTitle}</h2>
              <p className="text-xs text-purple-100 mt-1">
                Verdict: <strong className="text-white text-sm">{report.passed ? 'PASSED (Eligible for Next Round)' : 'NEEDS IMPROVEMENT'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 min-w-[100px]">
                <p className="text-3xl font-black text-amber-300">{report.score} / {report.totalMarks}</p>
                <p className="text-[10px] uppercase font-bold text-purple-200">Total Marks</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 min-w-[100px]">
                <p className="text-3xl font-black text-emerald-300">{report.percentile}th</p>
                <p className="text-[10px] uppercase font-bold text-purple-200">Percentile</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Score Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Percentage</span>
            <p className="text-2xl font-black text-royal-600 mt-1">{report.percentage}%</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{report.accuracy}%</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Correct Answers</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{report.correctCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Incorrect (-1 each)</span>
            <p className="text-2xl font-black text-rose-600 mt-1">{report.wrongCount}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Detailed Question-by-Question Review</h3>
          <button
            onClick={() => { setActiveTest(null); setReport(null); }}
            className="px-4 py-2 rounded-xl bg-royal-600 text-white font-bold text-xs shadow-md"
          >
            Return to Mock Catalog
          </button>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {report.reviewList.map((q, idx) => (
            <div 
              key={q.questionId}
              className={`p-5 rounded-2xl border ${
                q.isCorrect 
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' 
                  : q.isAnswered 
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 border">
                  Question {idx + 1} • {q.section}
                </span>
                <span className={`font-bold flex items-center gap-1 ${
                  q.isCorrect ? 'text-emerald-600' : q.isAnswered ? 'text-rose-600' : 'text-slate-400'
                }`}>
                  {q.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : q.isAnswered ? <XCircle className="w-4 h-4" /> : null}
                  {q.isCorrect ? '+3 Marks' : q.isAnswered ? '-1 Mark (Wrong)' : 'Unattempted (0 Marks)'}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                {q.questionText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                {q.options.map((opt, oIdx) => {
                  const isUserSelection = q.chosenOption === oIdx;
                  const isCorrect = q.correctOption === oIdx;
                  let style = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900";
                  if (isCorrect) style = "border-emerald-500 bg-emerald-100 text-emerald-900 font-bold";
                  else if (isUserSelection && !isCorrect) style = "border-rose-500 bg-rose-100 text-rose-900 font-bold";

                  return (
                    <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                      <span>({String.fromCharCode(65 + oIdx)}) {opt}</span>
                      {isCorrect && <span className="text-[10px] text-emerald-700 font-bold">✓ Correct</span>}
                      {isUserSelection && !isCorrect && <span className="text-[10px] text-rose-700 font-bold">✗ Your Choice</span>}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-royal-700 dark:text-royal-300">Explanation: </strong>
                <span className="text-slate-600 dark:text-slate-300">{q.explanation}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  // DEFAULT: Mock Test Catalog
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck2 className="w-7 h-7 text-royal-600" />
          Full-Length Mock Examination Hall
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Simulate full-length campus recruitment exams with real company patterns, section navigation, negative marking, and automated reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {catalog.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-royal-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-royal-700 dark:text-royal-300 uppercase">
                  {test.company}
                </span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {test.durationMinutes} Minutes
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{test.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{test.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {test.sections.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-purple-50 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-semibold">
                <span>{test.totalQuestions} Questions • {test.difficulty}</span>
              </div>

              <button
                onClick={() => handleStartTest(test)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-700 hover:to-royal-800 text-white font-bold text-xs shadow-md shadow-royal-600/20 transition-all hover:scale-105"
              >
                <span>Launch Mock Exam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
