// Automated Test Script for Phase 7: Resume Builder & Company Preparation Endpoints
import { getCompanies, getCompanyById } from './controllers/companyController.js';
import { getResume, saveResume } from './controllers/resumeController.js';

function mockReq(params = {}, body = {}, user = { id: 1 }) {
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
  console.log("=== PHASE 7 VERIFICATION: RESUME & COMPANY MODULES ===\n");
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

  // Test 1: Get Companies
  {
    const req = mockReq();
    const res = mockRes();
    getCompanies(req, res);
    assert(res.statusCode === 200, "GET /api/companies returns 200 OK");
    assert(res.data.success === true, "GET /api/companies reports success: true");
    assert(res.data.count === 7, `GET /api/companies returns 7 companies (found ${res.data.count})`);
  }

  // Test 2: Get Company by ID
  {
    const req = mockReq({ id: 'tcs' });
    const res = mockRes();
    getCompanyById(req, res);
    assert(res.statusCode === 200, "GET /api/companies/tcs returns 200 OK");
    assert(res.data.company.name.includes("Tata"), "GET /api/companies/tcs contains correct company metadata");
    assert(res.data.company.rounds.length >= 3, "TCS includes 3 recruitment rounds");
  }

  // Test 3: Get Company by Invalid ID
  {
    const req = mockReq({ id: 'nonexistent_corp' });
    const res = mockRes();
    getCompanyById(req, res);
    assert(res.statusCode === 404, "GET /api/companies/invalid returns 404 Not Found");
  }

  // Test 4: Get Resume
  {
    const req = mockReq();
    const res = mockRes();
    getResume(req, res);
    assert(res.statusCode === 200, "GET /api/resume returns 200 OK");
    assert(res.data.resume.personal.fullName !== undefined, "GET /api/resume contains candidate personal profile");
    assert(res.data.resume.skills.languages.includes("Java"), "GET /api/resume contains technical skills");
  }

  // Test 5: Save Resume
  {
    const updatedData = {
      template: 'tech',
      personal: { fullName: "Anusha Sharma (Updated)", email: "anusha@example.com" },
      education: [],
      skills: { languages: "Java, Python, C++, Go" },
      projects: [],
      experience: [],
      certifications: [],
      achievements: []
    };
    const req = mockReq({}, { resumeData: updatedData });
    const res = mockRes();
    saveResume(req, res);
    assert(res.statusCode === 200, "POST /api/resume returns 200 OK");
    assert(res.data.resume.template === 'tech', "POST /api/resume updates template to 'tech'");
  }

  console.log(`\n=== RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
