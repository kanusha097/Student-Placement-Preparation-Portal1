import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Filter,
  Sparkles,
  History,
  BookOpen,
  Calculator,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { aptitudeAPI } from '../services/api';

const DEFAULT_APTITUDE_QUESTIONS = [
  {
    id: 1,
    topic: "Quantitative Aptitude",
    category: "Time & Work",
    difficulty: "Medium",
    question: "A can complete a project in 12 days and B can complete it in 18 days. If they work together for 4 days, what fraction of the total project work remains?",
    options: ["1/3", "4/9", "5/9", "7/18"],
    correctIndex: 1,
    formula: "Combined Rate = 1/A + 1/B. Fraction Remaining = 1 - (Days worked * Combined rate)",
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Combined 1-day work = 1/12 + 1/18 = 5/36. In 4 days, work completed = 4 * (5/36) = 20/36 = 5/9. Work remaining = 1 - 5/9 = 4/9."
  },
  {
    id: 2,
    topic: "Quantitative Aptitude",
    category: "Profit & Loss",
    difficulty: "Easy",
    question: "A shopkeeper sells a book for ₹450, incurring a loss of 10%. At what price should he sell it to gain a profit of 15%?",
    options: ["₹525", "₹550", "₹575", "₹600"],
    correctIndex: 2,
    formula: "Cost Price (CP) = Selling Price / (1 - Loss%). Desired SP = CP * (1 + Profit%)",
    explanation: "CP = 450 / 0.90 = ₹500. To earn 15% profit: New SP = 500 * 1.15 = ₹575."
  },
  {
    id: 3,
    topic: "Quantitative Aptitude",
    category: "Speed, Distance & Time",
    difficulty: "Medium",
    question: "A train 180 meters long is running at a speed of 72 km/h. How many seconds will it take to cross an electric pole?",
    options: ["7 seconds", "8 seconds", "9 seconds", "10 seconds"],
    correctIndex: 2,
    formula: "Speed in m/s = Speed in km/h * (5/18). Time = Distance / Speed",
    explanation: "Speed = 72 * (5/18) = 20 m/s. Time to cross a pole = Train Length / Speed = 180 / 20 = 9 seconds."
  },
  {
    id: 4,
    topic: "Quantitative Aptitude",
    category: "Simple & Compound Interest",
    difficulty: "Hard",
    question: "The difference between compound interest (compounded annually) and simple interest on a sum of money at 10% per annum for 2 years is ₹65. What is the sum?",
    options: ["₹5,500", "₹6,000", "₹6,500", "₹7,000"],
    correctIndex: 2,
    formula: "Difference for 2 years = P * (R/100)^2",
    explanation: "65 = P * (10/100)^2 = P * (1/100). Therefore, Principal P = 65 * 100 = ₹6,500."
  },
  {
    id: 5,
    topic: "Logical Reasoning",
    category: "Blood Relations",
    difficulty: "Easy",
    question: "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is the girl in the photo related to Rohit?",
    options: ["Daughter", "Sister", "Cousin", "Aunt"],
    correctIndex: 1,
    formula: "Deduce relationship step-by-step from reference person.",
    explanation: "Rohit's grandfather's only son is Rohit's father. The daughter of Rohit's father is Rohit's sister. Therefore, the girl is Rohit's sister."
  },
  {
    id: 6,
    topic: "Logical Reasoning",
    category: "Syllogism",
    difficulty: "Medium",
    question: "Statements:\n1. All laptops are devices.\n2. Some devices are phones.\nConclusions:\nI. Some phones are laptops.\nII. Some devices are laptops.",
    options: ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither follows"],
    correctIndex: 1,
    formula: "Venn diagram intersection logic.",
    explanation: "Since all laptops are devices, the set of devices contains all laptops, so 'Some devices are laptops' is necessarily true (II follows). However, there is no guaranteed intersection between phones and laptops (I does not necessarily follow)."
  },
  {
    id: 7,
    topic: "Logical Reasoning",
    category: "Seating Arrangement",
    difficulty: "Hard",
    question: "Five colleagues P, Q, R, S, and T are seated in a row facing North. S is between T and Q. Q is immediately to the left of R. P is to the immediate left of T. Who is seated in the exact center?",
    options: ["P", "T", "S", "Q"],
    correctIndex: 2,
    formula: "Linear arrangement sequence alignment: P - T - S - Q - R.",
    explanation: "Arranging them according to conditions gives: P, T, S, Q, R. S is in the exact center."
  },
  {
    id: 8,
    topic: "Verbal Ability",
    category: "Sentence Correction",
    difficulty: "Easy",
    question: "Identify the grammatically correct sentence:",
    options: [
      "Neither of the two candidates have submitted their resume.",
      "Neither of the two candidates has submitted his resume.",
      "Neither candidates are ready for the interview round.",
      "Neither of them were present in the placement hall."
    ],
    correctIndex: 1,
    formula: "'Neither of' takes a singular verb and singular pronoun.",
    explanation: "'Neither of' is an indefinite pronoun treated as singular, requiring the singular verb 'has' and singular pronoun 'his'."
  },
  {
    id: 9,
    topic: "Verbal Ability",
    category: "Antonyms",
    difficulty: "Medium",
    question: "Select the word that is most nearly OPPOSITE in meaning to 'METICULOUS':",
    options: ["Fastidious", "Diligent", "Slapdash", "Precise"],
    correctIndex: 2,
    formula: "Meticulous = detailed. Slapdash = careless, hasty.",
    explanation: "'Slapdash' means done too hurriedly and carelessly, which is the direct antonym of meticulous."
  },
  {
    id: 10,
    topic: "Data Interpretation",
    category: "Tables & Percentages",
    difficulty: "Medium",
    question: "A tech firm produced 40,000 units in 2024 and 52,000 units in 2025. What was the percentage growth in production?",
    options: ["25%", "30%", "33.3%", "35%"],
    correctIndex: 1,
    formula: "Percentage Growth = ((New Value - Old Value) / Old Value) * 100",
    explanation: "Growth = 52,000 - 40,000 = 12,000. Percentage Growth = (12,000 / 40,000) * 100 = 30%."
  }
];

export default function AptitudePractice() {
  const [questions, setQuestions] = useState(DEFAULT_APTITUDE_QUESTIONS);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [answers, setAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [viewHistory, setViewHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const q = await aptitudeAPI.getQuestions();
      if (q && q.length > 0) setQuestions(q);
      const h = await aptitudeAPI.getHistory();
      if (h && h.history) setHistoryList(h.history);
    }
    loadData();
  }, []);

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations(prev => ({ ...prev, [questionId]: true }));

    const question = questions.find(q => q.id === questionId);
    if (question && question.correctIndex === optionIndex) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleResetSession = () => {
    setAnswers({});
    setShowExplanations({});
  };

  // Filtered Questions
  const filteredQuestions = questions.filter(q => {
    const matchTopic = selectedTopic === 'All' || q.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchDiff = selectedDifficulty === 'All' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchTopic && matchDiff;
  });

  // Calculate live scores
  const attemptedCount = Object.keys(answers).length;
  let correctCount = 0;
  Object.keys(answers).forEach(qId => {
    const q = questions.find(item => item.id === parseInt(qId));
    if (q && answers[qId] === q.correctIndex) {
      correctCount++;
    }
  });

  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-7 h-7 text-royal-600" />
            Aptitude & Reasoning Practice Arena
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Topic-wise practice across Quantitative, Logical Reasoning, Verbal Ability & Data Interpretation with instant step-by-step explanations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewHistory(!viewHistory)}
            className="px-3.5 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-purple-50 flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-royal-600" />
            <span>{viewHistory ? 'Back to Practice' : 'Practice History'}</span>
          </button>

          <button
            onClick={handleResetSession}
            title="Reset current answers"
            className="px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-purple-50 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live Score & Accuracy Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
            <p className="text-xl sm:text-2xl font-black text-royal-700 dark:text-royal-300">
              {correctCount} <span className="text-sm font-semibold text-slate-400">/ {attemptedCount} Attempted</span>
            </p>
          </div>

          <div className="h-8 w-px bg-purple-100 dark:bg-slate-800" />

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-600">
              {accuracy}%
            </p>
          </div>

          <div className="h-8 w-px bg-purple-100 dark:bg-slate-800 hidden sm:block" />

          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Questions</span>
            <p className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">
              {filteredQuestions.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>+10 XP Per Correct Answer</span>
          </span>
        </div>
      </div>

      {/* Practice History View Modal/Section */}
      {viewHistory ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-royal-600" />
            <span>Your Previous Aptitude Practice Sessions</span>
          </h3>

          <div className="divide-y divide-purple-50 dark:divide-slate-800 text-xs">
            {historyList.map((h) => (
              <div key={h.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{h.topic}</p>
                  <p className="text-slate-400 text-[11px]">{h.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-royal-600">{h.score}</p>
                  <p className="text-emerald-600 font-semibold">{h.accuracy} accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Topic & Difficulty Filters */}
          <div className="space-y-3">
            {/* Topics */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'].map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedTopic === topic
                      ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-purple-100 dark:border-slate-800 hover:bg-purple-50'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Difficulty Pills */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold text-[11px] mr-1">Difficulty:</span>
              {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    selectedDifficulty === d 
                      ? 'bg-purple-100 dark:bg-slate-700 text-royal-700 dark:text-royal-300' 
                      : 'text-slate-500 hover:bg-purple-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const selected = answers[q.id];
              const hasAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4 transition-all"
                >
                  {/* Question header info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300">
                        Q{idx + 1} • {q.topic}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">({q.category})</span>
                    </div>

                    {hasAnswered && (
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isCorrect ? 'Correct! (+10 XP)' : 'Incorrect'}
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                    {q.question}
                  </p>

                  {/* 4 Option Buttons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options.map((option, optIdx) => {
                      let optStyle = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-purple-50 hover:border-royal-300 text-slate-700 dark:text-slate-200";

                      if (hasAnswered) {
                        if (optIdx === q.correctIndex) {
                          optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold shadow-sm";
                        } else if (optIdx === selected) {
                          optStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-bold shadow-sm";
                        } else {
                          optStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={hasAnswered}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optStyle}`}
                        >
                          <span>
                            <strong className="text-slate-400 mr-2 font-mono">({String.fromCharCode(65 + optIdx)})</strong> 
                            {option}
                          </span>
                          {hasAnswered && optIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {hasAnswered && optIdx === selected && optIdx !== q.correctIndex && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Explanation and Formula */}
                  {showExplanations[q.id] && (
                    <div className="mt-4 p-4 rounded-2xl bg-purple-50/70 dark:bg-royal-950/30 border border-purple-200 dark:border-royal-900/60 text-xs space-y-2 animate-in fade-in duration-200">
                      {q.formula && (
                        <div className="flex items-start gap-1.5 font-mono text-[11px] text-royal-800 dark:text-royal-200 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-xl border border-purple-100 dark:border-slate-800">
                          <Calculator className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                          <span><strong>Key Concept / Formula:</strong> {q.formula}</span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-2 pt-1 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        <HelpCircle className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-royal-700 dark:text-royal-300">Step-by-Step Solution: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}
