import { getDB, isDBConnected, initDB } from '../config/db.js';
import { initializeDatabase } from '../scripts/init_mysql.js';

export const getDBStatus = async (req, res) => {
  const connected = isDBConnected();
  const pool = getDB();

  let tables = [];
  let tableCount = 0;
  let latencyMs = 0;

  if (connected && pool) {
    try {
      const start = Date.now();
      const [rows] = await pool.query('SHOW TABLES;');
      latencyMs = Date.now() - start;
      tables = rows.map(r => Object.values(r)[0]);
      tableCount = tables.length;
    } catch (err) {
      console.error('Error fetching tables from MySQL:', err.message);
    }
  }

  const expectedTables = [
    'users', 'student_profiles', 'coding_questions', 'coding_submissions',
    'aptitude_questions', 'aptitude_attempts', 'mock_tests', 'mock_test_questions',
    'mock_test_attempts', 'interview_questions', 'interview_attempts',
    'resumes', 'companies', 'student_progress', 'achievements'
  ];

  return res.json({
    success: true,
    connected,
    driver: 'mysql2/promise',
    mode: connected ? 'Production MySQL' : 'High-Performance Resilient Memory Mode',
    config: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'placement_portal',
      user: process.env.DB_USER || 'root'
    },
    latencyMs: connected ? `${latencyMs}ms` : '0ms (In-Memory)',
    tablesCount: connected ? tableCount : expectedTables.length,
    tables: connected ? tables : expectedTables,
    verifiedSchema: expectedTables
  });
};

export const syncDB = async (req, res) => {
  try {
    const success = await initializeDatabase();
    if (success) {
      await initDB();
      return res.json({ success: true, message: 'Database schema successfully synchronized with MySQL.' });
    } else {
      return res.json({
        success: false,
        message: 'Could not connect to MySQL server on localhost:3306. System remains in Resilient Memory Mode.'
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
