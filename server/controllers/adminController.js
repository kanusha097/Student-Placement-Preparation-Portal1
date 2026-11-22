import { getDB, isDBConnected } from '../config/db.js';
import { CODING_QUESTIONS_DATA } from './codingController.js';
import { APTITUDE_BANK } from './aptitudeController.js';
import { MOCK_TESTS_DATA } from './mockTestController.js';
import { COMPANIES_DATA } from './companyController.js';

let registeredStudents = [
  {
    id: 1,
    fullName: "Anusha Sharma",
    email: "anusha@placementprep.edu",
    collegeName: "National Institute of Technology",
    branch: "Computer Science and Engineering",
    yearOfStudy: "4th Year (Final Year)",
    skills: ["Java", "Python", "SQL", "React", "Data Structures"],
    role: "student",
    streak: 12,
    placementReadiness: 78,
    codingSolved: 42,
    aptitudeScore: 84,
    mockTestsTaken: 6,
    interviewScore: 80,
    registeredAt: "2025-08-15"
  },
  {
    id: 2,
    fullName: "Rahul Verma",
    email: "rahul.v@iitm.ac.in",
    collegeName: "IIT Madras",
    branch: "Electrical & Computer Engg",
    yearOfStudy: "4th Year",
    skills: ["C++", "Algorithms", "System Design", "Python"],
    role: "student",
    streak: 28,
    placementReadiness: 94,
    codingSolved: 142,
    aptitudeScore: 92,
    mockTestsTaken: 14,
    interviewScore: 90,
    registeredAt: "2025-07-20"
  },
  {
    id: 3,
    fullName: "Sneha Nair",
    email: "sneha.nair@nits.ac.in",
    collegeName: "NIT Surathkal",
    branch: "Information Technology",
    yearOfStudy: "4th Year",
    skills: ["Java", "Spring Boot", "Microservices", "Docker"],
    role: "student",
    streak: 25,
    placementReadiness: 91,
    codingSolved: 135,
    aptitudeScore: 90,
    mockTestsTaken: 11,
    interviewScore: 88,
    registeredAt: "2025-08-01"
  },
  {
    id: 4,
    fullName: "Ananya Roy",
    email: "ananya.roy@pilani.bits.edu",
    collegeName: "BITS Pilani",
    branch: "Computer Science",
    yearOfStudy: "3rd Year",
    skills: ["Python", "Machine Learning", "PyTorch", "SQL"],
    role: "student",
    streak: 21,
    placementReadiness: 86,
    codingSolved: 129,
    aptitudeScore: 88,
    mockTestsTaken: 9,
    interviewScore: 85,
    registeredAt: "2025-09-10"
  },
  {
    id: 5,
    fullName: "Vikram Malhotra",
    email: "vikram.m@dtu.ac.in",
    collegeName: "DTU Delhi",
    branch: "Software Engineering",
    yearOfStudy: "4th Year",
    skills: ["Node.js", "React", "MongoDB", "Express", "TypeScript"],
    role: "student",
    streak: 18,
    placementReadiness: 82,
    codingSolved: 110,
    aptitudeScore: 81,
    mockTestsTaken: 8,
    interviewScore: 78,
    registeredAt: "2025-08-25"
  }
];

let adminCodingQuestions = [...CODING_QUESTIONS_DATA];
let adminAptitudeQuestions = [...APTITUDE_BANK];
let adminMockTests = [...MOCK_TESTS_DATA];

// 1. OVERVIEW STATS
export const getAdminOverview = (req, res) => {
  const totalStudents = registeredStudents.length;
  const avgReadiness = Math.round(
    registeredStudents.reduce((acc, s) => acc + (s.placementReadiness || 0), 0) / (totalStudents || 1)
  );

  return res.json({
    success: true,
    stats: {
      totalStudents,
      codingQuestionsCount: adminCodingQuestions.length,
      aptitudeQuestionsCount: adminAptitudeQuestions.length,
      mockTestsCount: adminMockTests.length,
      companiesCount: COMPANIES_DATA.length,
      avgReadiness,
      activeEligibleCandidates: registeredStudents.filter(s => s.placementReadiness >= 75).length,
      placementSeasonProgress: "Batch 2026 - Active Campus Phase"
    }
  });
};

// 2. STUDENTS MANAGEMENT
export const getStudents = (req, res) => {
  return res.json({
    success: true,
    count: registeredStudents.length,
    students: registeredStudents
  });
};

export const toggleStudentRole = (req, res) => {
  const { id } = req.params;
  const student = registeredStudents.find(s => s.id === parseInt(id));
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  student.role = student.role === 'admin' ? 'student' : 'admin';
  return res.json({
    success: true,
    message: `User role updated to ${student.role}`,
    student
  });
};

export const deleteStudent = (req, res) => {
  const { id } = req.params;
  const idx = registeredStudents.findIndex(s => s.id === parseInt(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const removed = registeredStudents.splice(idx, 1)[0];
  return res.json({
    success: true,
    message: `Account for ${removed.fullName} deleted successfully.`
  });
};

// 3. CODING QUESTIONS CRUD
export const getCodingQuestions = (req, res) => {
  return res.json({ success: true, count: adminCodingQuestions.length, questions: adminCodingQuestions });
};

export const addCodingQuestion = (req, res) => {
  const { title, category, difficulty, companies, description, sampleInput, sampleOutput, starterCode } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ success: false, message: "Title, category, and description are required." });
  }

  const newQuestion = {
    id: Date.now(),
    title,
    category,
    difficulty: difficulty || "Easy",
    companies: Array.isArray(companies) ? companies : (companies ? companies.split(',').map(c => c.trim()) : ["TCS"]),
    description,
    sampleTestCases: [
      { input: sampleInput || "input = [1, 2, 3]", expected: sampleOutput || "[1, 2, 3]", explanation: "Standard validation case." }
    ],
    hiddenTestCases: [
      { input: "input = []", expected: "[]" }
    ],
    starterCode: starterCode || {
      java: `public class Solution {\n    // Write code here\n}`,
      python: `def solve():\n    pass`,
      cpp: `class Solution {\npublic:\n    void solve() {}\n};`,
      c: `void solve() {}`
    }
  };

  adminCodingQuestions.unshift(newQuestion);
  return res.status(201).json({
    success: true,
    message: "Coding problem created successfully",
    question: newQuestion
  });
};

export const deleteCodingQuestion = (req, res) => {
  const { id } = req.params;
  const idx = adminCodingQuestions.findIndex(q => q.id === parseInt(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Coding question not found" });
  }

  adminCodingQuestions.splice(idx, 1);
  return res.json({ success: true, message: "Coding question removed successfully" });
};

// 4. APTITUDE QUESTIONS CRUD
export const getAptitudeQuestions = (req, res) => {
  return res.json({ success: true, count: adminAptitudeQuestions.length, questions: adminAptitudeQuestions });
};

export const addAptitudeQuestion = (req, res) => {
  const { topic, category, difficulty, question, options, correctIndex, formula, explanation } = req.body;
  if (!question || !options || options.length < 4) {
    return res.status(400).json({ success: false, message: "Question and all 4 options are required." });
  }

  const newMCQ = {
    id: Date.now(),
    topic: topic || "Quantitative Aptitude",
    category: category || "General Aptitude",
    difficulty: difficulty || "Medium",
    question,
    options,
    correctIndex: parseInt(correctIndex) || 0,
    formula: formula || "Standard formula applicable.",
    explanation: explanation || "Step-by-step mathematical reasoning."
  };

  adminAptitudeQuestions.unshift(newMCQ);
  return res.status(201).json({
    success: true,
    message: "Aptitude question added successfully",
    question: newMCQ
  });
};

export const deleteAptitudeQuestion = (req, res) => {
  const { id } = req.params;
  const idx = adminAptitudeQuestions.findIndex(q => q.id === parseInt(id));
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Aptitude question not found" });
  }

  adminAptitudeQuestions.splice(idx, 1);
  return res.json({ success: true, message: "Aptitude question deleted successfully" });
};

// 5. MOCK TESTS CRUD
export const getMockTests = (req, res) => {
  return res.json({ success: true, count: adminMockTests.length, tests: adminMockTests });
};

export const addMockTest = (req, res) => {
  const { title, company, category, durationMinutes, totalQuestions, passingPercentage } = req.body;
  if (!title || !durationMinutes) {
    return res.status(400).json({ success: false, message: "Title and duration are mandatory." });
  }

  const newTest = {
    id: Date.now(),
    title,
    company: company || "General Placement",
    category: category || "Company Specific",
    durationMinutes: parseInt(durationMinutes) || 60,
    totalQuestions: parseInt(totalQuestions) || 20,
    marksPerQuestion: 3,
    negativeMarks: 1,
    passingPercentage: parseInt(passingPercentage) || 60,
    sections: ["Quantitative", "Reasoning", "Verbal", "Technical Core"],
    questions: []
  };

  adminMockTests.unshift(newTest);
  return res.status(201).json({
    success: true,
    message: "Mock examination created successfully",
    test: newTest
  });
};
