// Automated Test for Phase 8: Backend & MySQL Database Integration
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDBStatus } from './controllers/dbController.js';
import { isDBConnected } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mockReq() {
  return {};
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
  console.log("=== PHASE 8 VERIFICATION: BACKEND & MYSQL INTEGRATION ===\n");
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

  // Test 1: Verify Schema File Exists and Contains 15 Tables
  const schemaPath = path.join(__dirname, 'schema.sql');
  assert(fs.existsSync(schemaPath), "schema.sql exists in server root");

  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  const expectedTables = [
    'users',
    'student_profiles',
    'coding_questions',
    'coding_submissions',
    'aptitude_questions',
    'aptitude_attempts',
    'mock_tests',
    'mock_test_questions',
    'mock_test_attempts',
    'interview_questions',
    'interview_attempts',
    'resumes',
    'companies',
    'student_progress',
    'achievements'
  ];

  expectedTables.forEach(tableName => {
    const tableRegex = new RegExp(`CREATE TABLE IF NOT EXISTS\\s+${tableName}`, 'i');
    assert(tableRegex.test(schemaContent), `Schema defines table: \`${tableName}\``);
  });

  // Test 2: Foreign Key Constraints Check
  assert(schemaContent.includes("FOREIGN KEY (user_id) REFERENCES users(id)"), "Foreign keys reference users(id)");
  assert(schemaContent.includes("FOREIGN KEY (question_id) REFERENCES coding_questions(id)"), "Foreign keys reference coding_questions(id)");
  assert(schemaContent.includes("FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id)"), "Foreign keys reference mock_tests(id)");

  // Test 3: DB Status Endpoint
  {
    const req = mockReq();
    const res = mockRes();
    await getDBStatus(req, res);
    assert(res.statusCode === 200, "GET /api/db/status returns 200 OK");
    assert(res.data.success === true, "GET /api/db/status success is true");
    assert(res.data.driver === "mysql2/promise", "Driver is configured as mysql2/promise");
    assert(res.data.verifiedSchema.length === 15, "Status confirms all 15 verified schema tables");
    assert(res.data.config.database === "placement_portal", "Config targets `placement_portal`");
  }

  // Test 4: Migration Script Integrity
  const migrationScriptPath = path.join(__dirname, 'scripts', 'init_mysql.js');
  assert(fs.existsSync(migrationScriptPath), "Migration script `init_mysql.js` exists in server/scripts/");

  console.log(`\n=== RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
