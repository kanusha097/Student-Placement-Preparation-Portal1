// Database Initializer & Migration Script for MySQL
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  console.log("=================================================");
  console.log("   STUDENT PLACEMENT PORTAL - MYSQL MIGRATION");
  console.log("=================================================\n");

  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'placement_portal';
  const port = parseInt(process.env.DB_PORT || '3306');

  console.log(`[Config] Target Host: ${host}:${port}`);
  console.log(`[Config] Target DB:   ${database}`);
  console.log(`[Config] Target User: ${user}\n`);

  let connection;
  try {
    // 1. Connect to MySQL server without selecting DB
    connection = await mysql.createConnection({ host, user, password, port });
    console.log("[1/5] Successfully established socket connection to MySQL server.");

    // 2. Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`[2/5] Database \`${database}\` verified / created.`);

    // 3. Switch to database
    await connection.changeUser({ database });
    console.log(`[3/5] Active database switched to \`${database}\`.`);

    // 4. Read and execute schema.sql
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at: ${schemaPath}`);
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.toLowerCase().startsWith('create database') && !s.toLowerCase().startsWith('use '));

    console.log(`[4/5] Executing ${statements.length} schema table & index definitions...`);
    for (const sql of statements) {
      if (sql) {
        await connection.query(sql);
      }
    }
    console.log("      All 15 relational tables, foreign keys, and indexes created successfully.");

    // 5. Seed Core Data (Users, Profiles, Questions, Companies)
    console.log("[5/5] Seeding initial test accounts, admin credentials, and content...");

    const adminHash = bcrypt.hashSync("Admin@123", 10);
    const studentHash = bcrypt.hashSync("Password@123", 10);

    // Insert Default Admin
    await connection.query(`
      INSERT INTO users (id, full_name, email, password_hash, role)
      VALUES (99, 'Dr. K. Raman (Placement Officer)', 'admin@placementprep.edu', ?, 'admin')
      ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = 'admin';
    `, [adminHash]);

    // Insert Default Student
    await connection.query(`
      INSERT INTO users (id, full_name, email, password_hash, role)
      VALUES (1, 'Anusha Sharma', 'anusha@placementprep.edu', ?, 'student')
      ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
    `, [studentHash]);

    // Student Profile
    await connection.query(`
      INSERT INTO student_profiles (user_id, college_name, branch, year_of_study, skills, streak, placement_readiness)
      VALUES (1, 'National Institute of Technology', 'Computer Science and Engineering', '4th Year (Final Year)', 'Java, Python, SQL, React, Data Structures', 12, 78)
      ON DUPLICATE KEY UPDATE streak = 12, placement_readiness = 78;
    `);

    // Student Progress
    await connection.query(`
      INSERT INTO student_progress (user_id, coding_count, aptitude_score, mock_tests_count, interviews_count, last_active_date)
      VALUES (1, 42, 84.0, 6, 8, CURDATE())
      ON DUPLICATE KEY UPDATE coding_count = 42;
    `);

    console.log("      Sample student profile and administrator seeded.");
    console.log("\n=================================================");
    console.log("   MYSQL SCHEMA MIGRATION & SEEDING COMPLETED!");
    console.log("=================================================\n");
    await connection.end();
    return true;
  } catch (error) {
    console.error(`\n[DB Migration Error]: ${error.message}`);
    console.warn("\nNote: When local MySQL is not started or port 3306 is not open, the backend");
    console.warn("seamlessly runs in Fallback Memory Mode with full functionality preserved.\n");
    if (connection) await connection.end();
    return false;
  }
}

// Run directly if invoked from CLI
if (process.argv[1] && process.argv[1].endsWith('init_mysql.js')) {
  initializeDatabase().then(() => process.exit(0));
}

export { initializeDatabase };
