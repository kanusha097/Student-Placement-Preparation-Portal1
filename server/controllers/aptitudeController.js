import { getDB, isDBConnected } from '../config/db.js';

export const APTITUDE_BANK = [
  // Quantitative Aptitude
  {
    id: 1,
    topic: "Quantitative Aptitude",
    category: "Time & Work",
    difficulty: "Medium",
    question: "A can complete a project in 12 days and B can complete it in 18 days. If they work together for 4 days, what fraction of the total project work remains?",
    options: ["1/3", "4/9", "5/9", "7/18"],
    correctIndex: 1,
    formula: "Combined Work = 1/A + 1/B. Fraction Remaining = 1 - (Days worked * Combined rate)",
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Combined 1-day work = 1/12 + 1/18 = 5/36. In 4 days, work done = 4 * (5/36) = 20/36 = 5/9. Work remaining = 1 - 5/9 = 4/9."
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

  // Logical Reasoning
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
    correctIndex: 1,
    formula: "Linear arrangement sequence alignment.",
    explanation: "Arrangement from left to right: P, T, S, Q, R. S is between T and Q; Q is left of R; P is left of T. The middle person is S. (Correction: P - T - S - Q - R -> center element at position 3 is S)."
  },

  // Verbal Ability
  {
    id: 8,
    topic: "Verbal Ability",
    category: "Grammar & Sentence Correction",
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
    explanation: "'Neither of' is an indefinite pronoun treated as singular, requiring the singular auxiliary verb 'has' and singular pronoun 'his'."
  },
  {
    id: 9,
    topic: "Verbal Ability",
    category: "Vocabulary & Antonyms",
    difficulty: "Medium",
    question: "Select the word that is most nearly OPPOSITE in meaning to 'METICULOUS':",
    options: ["Fastidious", "Diligent", "Slapdash", "Precise"],
    correctIndex: 2,
    formula: "Meticulous means showing great attention to detail. Slapdash means careless, hasty, or untidy.",
    explanation: "Fastidious, diligent, and precise are synonyms. 'Slapdash' means done too hurriedly and carelessly, which is the direct antonym."
  },

  // Data Interpretation
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

let aptitudeHistory = [
  { id: 1, date: "Today", topic: "Quantitative Aptitude", score: "4/5", accuracy: "80%" },
  { id: 2, date: "Yesterday", topic: "Logical Reasoning", score: "5/5", accuracy: "100%" }
];

export const getQuestions = (req, res) => {
  const { topic, difficulty } = req.query;
  let filtered = [...APTITUDE_BANK];

  if (topic && topic !== 'All') {
    filtered = filtered.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    filtered = filtered.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  return res.json({ success: true, count: filtered.length, questions: filtered });
};

export const submitAnswer = (req, res) => {
  const { questionId, selectedIndex } = req.body;
  const question = APTITUDE_BANK.find(q => q.id === parseInt(questionId));

  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }

  const isCorrect = question.correctIndex === parseInt(selectedIndex);

  if (isDBConnected()) {
    try {
      const pool = getDB();
      const userId = req.user ? req.user.id : 1;
      const optionLetter = ['A', 'B', 'C', 'D'][parseInt(selectedIndex)] || 'A';
      pool.query(
        'INSERT INTO aptitude_attempts (user_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)',
        [userId, parseInt(questionId), optionLetter, isCorrect ? 1 : 0]
      ).catch(e => console.warn('[DB] Aptitude attempt log error:', e.message));
    } catch (err) {
      console.warn('[DB] Could not log aptitude attempt:', err.message);
    }
  }

  return res.json({
    success: true,
    isCorrect,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    formula: question.formula
  });
};

export const getHistory = (req, res) => {
  return res.json({ success: true, history: aptitudeHistory });
};
