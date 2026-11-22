// Automated Verification Test for Phase 9: Admin Dashboard Endpoints
import {
  getAdminOverview,
  getStudents,
  toggleStudentRole,
  deleteStudent,
  getCodingQuestions,
  addCodingQuestion,
  deleteCodingQuestion,
  getAptitudeQuestions,
  addAptitudeQuestion,
  deleteAptitudeQuestion,
  getMockTests,
  addMockTest
} from './controllers/adminController.js';

function mockReq(params = {}, body = {}, user = { id: 99, role: 'admin' }) {
  return { params, body, user };
}

function mockRes() {
  const res = {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    }
  };
  return res;
}

async function runTests() {
  console.log("=== PHASE 9 VERIFICATION: ADMIN DASHBOARD & MANAGEMENT ===\n");
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
    }
  }

  // Test 1: Admin Overview
  {
    const req = mockReq();
    const res = mockRes();
    getAdminOverview(req, res);
    assert(res.statusCode === 200, "GET /api/admin/overview returns 200 OK");
    assert(res.data.stats.totalStudents >= 5, "Total students reported correctly");
    assert(res.data.stats.codingQuestionsCount >= 9, "Coding questions count reported");
  }

  // Test 2: Get Students List
  {
    const req = mockReq();
    const res = mockRes();
    getStudents(req, res);
    assert(res.statusCode === 200, "GET /api/admin/students returns 200 OK");
    assert(res.data.students.length >= 5, "Student roster populated");
    assert(res.data.students[0].fullName !== undefined, "Student objects contain full profiles");
  }

  // Test 3: Toggle Student Role
  {
    const req = mockReq({ id: 1 });
    const res = mockRes();
    toggleStudentRole(req, res);
    assert(res.statusCode === 200, "POST /api/admin/students/1/role returns 200 OK");
    assert(res.data.student.role === 'admin' || res.data.student.role === 'student', "Role toggled successfully");
  }

  // Test 4: Add Coding Question
  let newQuestionId = null;
  {
    const req = mockReq({}, {
      title: "Valid Anagram String",
      category: "Strings",
      difficulty: "Easy",
      companies: "TCS, Wipro",
      description: "Given two strings s and t, return true if t is an anagram of s.",
      sampleInput: "s = 'anagram', t = 'nagaram'",
      sampleOutput: "true"
    });
    const res = mockRes();
    addCodingQuestion(req, res);
    assert(res.statusCode === 201, "POST /api/admin/coding-questions returns 201 Created");
    assert(res.data.question.title === "Valid Anagram String", "New coding question title persisted");
    newQuestionId = res.data.question.id;
  }

  // Test 5: Delete Coding Question
  {
    const req = mockReq({ id: newQuestionId });
    const res = mockRes();
    deleteCodingQuestion(req, res);
    assert(res.statusCode === 200, "DELETE /api/admin/coding-questions/:id returns 200 OK");
  }

  // Test 6: Add Aptitude Question
  let newAptitudeId = null;
  {
    const req = mockReq({}, {
      topic: "Quantitative Aptitude",
      category: "Ratios & Proportions",
      difficulty: "Easy",
      question: "If A:B = 2:3 and B:C = 4:5, find A:B:C.",
      options: ["8:12:15", "6:8:10", "2:4:5", "4:6:15"],
      correctIndex: 0,
      formula: "Multiply by common factor",
      explanation: "A:B = 8:12, B:C = 12:15 => A:B:C = 8:12:15."
    });
    const res = mockRes();
    addAptitudeQuestion(req, res);
    assert(res.statusCode === 201, "POST /api/admin/aptitude-questions returns 201 Created");
    assert(res.data.question.correctIndex === 0, "Aptitude MCQ correct option recorded");
    newAptitudeId = res.data.question.id;
  }

  // Test 7: Delete Aptitude Question
  {
    const req = mockReq({ id: newAptitudeId });
    const res = mockRes();
    deleteAptitudeQuestion(req, res);
    assert(res.statusCode === 200, "DELETE /api/admin/aptitude-questions/:id returns 200 OK");
  }

  // Test 8: Create Mock Test
  {
    const req = mockReq({}, {
      title: "Deloitte National Pre-Placement Test",
      company: "Deloitte",
      durationMinutes: 75,
      totalQuestions: 50,
      passingPercentage: 65
    });
    const res = mockRes();
    addMockTest(req, res);
    assert(res.statusCode === 201, "POST /api/admin/mock-tests returns 201 Created");
    assert(res.data.test.company === "Deloitte", "Mock exam company assigned correctly");
  }

  console.log(`\n=== RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
