import { getDB, isDBConnected } from '../config/db.js';

export const MOCK_TESTS_DATA = [
  {
    id: 1,
    title: "TCS National Qualifier Test (NQT) Comprehensive Simulator",
    company: "TCS",
    durationMinutes: 90,
    totalQuestions: 10, // Full sample set for practice
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
        q: "A sum of ₹12,500 amounts to ₹15,500 in 4 years at the rate of simple interest. What is the rate of interest per annum?",
        options: ["5%", "6%", "7.5%", "8%"],
        correctIndex: 1,
        explanation: "Simple Interest = 15,500 - 12,500 = ₹3,000. SI = (P * R * T) / 100 => 3000 = (12500 * R * 4) / 100 => 3000 = 500 * R => R = 6%."
      },
      {
        id: 102,
        section: "Numerical Ability",
        q: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:",
        options: ["10 mins", "12 mins", "15 mins", "25 mins"],
        correctIndex: 1,
        explanation: "1/Time = 1/20 + 1/30 = (3+2)/60 = 5/60 = 1/12. Time = 12 minutes."
      },
      {
        id: 103,
        section: "Numerical Ability",
        q: "If 15 men can build a wall in 20 days, in how many days can 25 men build the same wall working at the same pace?",
        options: ["10 days", "12 days", "14 days", "16 days"],
        correctIndex: 1,
        explanation: "M1 * D1 = M2 * D2 => 15 * 20 = 25 * D2 => 300 = 25 * D2 => D2 = 12 days."
      },
      {
        id: 104,
        section: "Reasoning Ability",
        q: "Find the missing number in the series: 4, 9, 25, 49, 121, ?",
        options: ["144", "169", "196", "225"],
        correctIndex: 1,
        explanation: "The series represents squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2 = 169."
      },
      {
        id: 105,
        section: "Reasoning Ability",
        q: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that same code?",
        options: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "EOJDJFEM"],
        correctIndex: 0,
        explanation: "Reverse the letters and replace intermediate characters with the following alphabetical character."
      },
      {
        id: 106,
        section: "Reasoning Ability",
        q: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
        options: ["Mother", "Sister", "Grandmother", "Aunt"],
        correctIndex: 0,
        explanation: "The only daughter of the woman's mother is the woman herself. Thus, the woman is the man's mother."
      },
      {
        id: 107,
        section: "Verbal Ability",
        q: "Choose the word with the correct spelling:",
        options: ["Accomodate", "Accommodate", "Acommodate", "Accommadate"],
        correctIndex: 1,
        explanation: "The correct spelling is 'Accommodate' with double 'c' and double 'm'."
      },
      {
        id: 108,
        section: "Verbal Ability",
        q: "Fill in the blank: The manager was pleased _______ the dedication of the newly joined engineers.",
        options: ["at", "with", "by", "on"],
        correctIndex: 1,
        explanation: "The standard preposition used with 'pleased' when referring to actions or qualities of people is 'with'."
      },
      {
        id: 109,
        section: "Coding Logic",
        q: "What is the time complexity of searching an element in a balanced Binary Search Tree (AVL Tree)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "A balanced BST keeps height strictly bounded to log(n), so lookup requires O(log n) time."
      },
      {
        id: 110,
        section: "Coding Logic",
        q: "What will be the output of: int a = 5; int b = a++ + ++a; printf('%d', b);",
        options: ["11", "12", "13", "14"],
        correctIndex: 1,
        explanation: "a++ evaluates to 5 (a becomes 6). Then ++a increments a to 7 and evaluates to 7. 5 + 7 = 12."
      }
    ]
  },
  {
    id: 2,
    title: "Infosys Specialist Programmer (SP) Assessment",
    company: "Infosys",
    durationMinutes: 100,
    totalQuestions: 6,
    sections: ["Mathematical Thinking", "Logical Analysis", "Pseudocode Trace"],
    difficulty: "Hard",
    passingPercentage: 70,
    marksPerQuestion: 3,
    negativeMarks: 1,
    description: "High-level aptitude, dynamic programming logic and algorithmic pseudocode test.",
    questions: [
      {
        id: 201,
        section: "Mathematical Thinking",
        q: "How many trailing zeros does 100! (100 factorial) have?",
        options: ["20", "22", "24", "28"],
        correctIndex: 2,
        explanation: "Number of zeros = floor(100/5) + floor(100/25) = 20 + 4 = 24 trailing zeros."
      },
      {
        id: 202,
        section: "Pseudocode Trace",
        q: "What is the output of the function f(4) where f(n) = if n <= 1 return 1 else return f(n-1) + f(n-2)?",
        options: ["3", "5", "8", "13"],
        correctIndex: 1,
        explanation: "Standard Fibonacci: f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5."
      }
    ]
  },
  {
    id: 3,
    title: "Wipro Elite National Talent Hunt (NLTH)",
    company: "Wipro",
    durationMinutes: 80,
    totalQuestions: 6,
    sections: ["Quantitative", "Logical", "Verbal"],
    difficulty: "Medium",
    passingPercentage: 60,
    marksPerQuestion: 3,
    negativeMarks: 1,
    description: "Standard Wipro Elite entrance test with cognitive reasoning and English grammar.",
    questions: [
      {
        id: 301,
        section: "Quantitative",
        q: "A sum doubles in 8 years at simple interest. What is the annual rate of interest?",
        options: ["10%", "12.5%", "15%", "16.6%"],
        correctIndex: 1,
        explanation: "SI = P. P = (P * R * 8) / 100 => 8R = 100 => R = 12.5%."
      }
    ]
  },
  {
    id: 4,
    title: "Accenture Associate Software Engineer Placement Test",
    company: "Accenture",
    durationMinutes: 90,
    totalQuestions: 6,
    sections: ["Cognitive Assessment", "Technical Fundamentals", "Pseudocode"],
    difficulty: "Medium",
    passingPercentage: 65,
    marksPerQuestion: 3,
    negativeMarks: 0,
    description: "No negative marking Accenture pattern focusing on pseudocode and abstract logic.",
    questions: [
      {
        id: 401,
        section: "Technical Fundamentals",
        q: "Which layer of the OSI model is responsible for end-to-end packet routing?",
        options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
        correctIndex: 1,
        explanation: "The Network Layer (Layer 3) handles routing, IP addressing, and packet forwarding."
      }
    ]
  }
];

let mockAttemptsHistory = [
  {
    id: 1,
    testId: 1,
    testTitle: "TCS National Qualifier Test (NQT) Comprehensive Simulator",
    score: 26,
    totalMarks: 30,
    percentage: 86.6,
    accuracy: 90.0,
    percentile: 94,
    completedAt: "3 days ago"
  }
];

export const getMockTests = (req, res) => {
  const summary = MOCK_TESTS_DATA.map(t => ({
    id: t.id,
    title: t.title,
    company: t.company,
    durationMinutes: t.durationMinutes,
    totalQuestions: t.questions.length,
    sections: t.sections,
    difficulty: t.difficulty,
    passingPercentage: t.passingPercentage
  }));
  return res.json({ success: true, count: summary.length, tests: summary });
};

export const getMockTestById = (req, res) => {
  const test = MOCK_TESTS_DATA.find(t => t.id === parseInt(req.params.id));
  if (!test) {
    return res.status(404).json({ success: false, message: 'Mock test not found' });
  }
  return res.json({ success: true, test });
};

export const submitMockTest = (req, res) => {
  const { testId, answers = {} } = req.body;
  const test = MOCK_TESTS_DATA.find(t => t.id === parseInt(testId));

  if (!test) {
    return res.status(404).json({ success: false, message: 'Mock test not found' });
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let marksObtained = 0;
  const totalMarks = test.questions.length * test.marksPerQuestion;

  const reviewList = test.questions.map((q) => {
    const chosen = answers[q.id];
    const isAnswered = chosen !== undefined && chosen !== null;
    const isCorrect = isAnswered && chosen === q.correctIndex;

    if (isAnswered) {
      if (isCorrect) {
        correctCount++;
        marksObtained += test.marksPerQuestion;
      } else {
        wrongCount++;
        marksObtained -= test.negativeMarks;
      }
    } else {
      unattemptedCount++;
    }

    return {
      questionId: q.id,
      section: q.section,
      questionText: q.q,
      options: q.options,
      chosenOption: chosen !== undefined ? chosen : null,
      correctOption: q.correctIndex,
      isCorrect,
      isAnswered,
      explanation: q.explanation
    };
  });

  const finalScore = Math.max(0, marksObtained);
  const percentage = Math.round((finalScore / totalMarks) * 100);
  const attempted = correctCount + wrongCount;
  const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
  const percentile = Math.min(99, Math.max(50, Math.round(50 + (percentage / 2))));

  const attemptResult = {
    id: Date.now(),
    testId: test.id,
    testTitle: test.title,
    score: finalScore,
    totalMarks,
    percentage,
    accuracy,
    percentile,
    correctCount,
    wrongCount,
    unattemptedCount,
    passed: percentage >= test.passingPercentage,
    completedAt: "Just now",
    reviewList
  };

  mockAttemptsHistory.unshift({
    id: attemptResult.id,
    testId: test.id,
    testTitle: test.title,
    score: finalScore,
    totalMarks,
    percentage,
    accuracy,
    percentile,
    completedAt: "Just now"
  });

  if (isDBConnected()) {
    try {
      const pool = getDB();
      const userId = req.user ? req.user.id : 1;
      pool.query(
        'INSERT INTO mock_test_attempts (user_id, mock_test_id, score, total_marks, accuracy_percentage) VALUES (?, ?, ?, ?, ?)',
        [userId, test.id, finalScore, totalMarks, accuracy]
      ).catch(e => console.warn('[DB] Mock test attempt save error:', e.message));
    } catch (err) {
      console.warn('[DB] Could not log mock test attempt:', err.message);
    }
  }

  return res.json({ success: true, report: attemptResult });
};

export const getAttempts = (req, res) => {
  return res.json({ success: true, attempts: mockAttemptsHistory });
};
