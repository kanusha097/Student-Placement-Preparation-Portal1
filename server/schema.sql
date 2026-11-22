-- ========================================================
-- STUDENT PLACEMENT PREPARATION PORTAL - MySQL Schema
-- ========================================================

CREATE DATABASE IF NOT EXISTS placement_portal;
USE placement_portal;

-- 1. Users Table (Authentication & Roles)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
);

-- 2. Student Profiles
CREATE TABLE IF NOT EXISTS student_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    college_name VARCHAR(200) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    year_of_study VARCHAR(50) NOT NULL,
    skills TEXT,
    streak INT DEFAULT 1,
    placement_readiness INT DEFAULT 60,
    avatar_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Coding Questions
CREATE TABLE IF NOT EXISTS coding_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
    category VARCHAR(100) NOT NULL,
    companies VARCHAR(255),
    description TEXT NOT NULL,
    sample_input TEXT,
    sample_output TEXT,
    starter_code_java TEXT,
    starter_code_python TEXT,
    starter_code_cpp TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Coding Submissions
CREATE TABLE IF NOT EXISTS coding_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    language VARCHAR(30) NOT NULL,
    code TEXT NOT NULL,
    status ENUM('Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error') DEFAULT 'Accepted',
    execution_time_ms INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES coding_questions(id) ON DELETE CASCADE
);

-- 5. Aptitude Questions
CREATE TABLE IF NOT EXISTS aptitude_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Aptitude Attempts
CREATE TABLE IF NOT EXISTS aptitude_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option CHAR(1) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES aptitude_questions(id) ON DELETE CASCADE
);

-- 7. Mock Tests
CREATE TABLE IF NOT EXISTS mock_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company_name VARCHAR(100),
    duration_minutes INT NOT NULL,
    total_questions INT NOT NULL,
    pass_marks INT DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Mock Test Questions
CREATE TABLE IF NOT EXISTS mock_test_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mock_test_id INT NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    marks INT DEFAULT 3,
    negative_marks INT DEFAULT 1,
    FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE
);

-- 9. Mock Test Attempts
CREATE TABLE IF NOT EXISTS mock_test_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mock_test_id INT NOT NULL,
    score INT NOT NULL,
    total_marks INT NOT NULL,
    accuracy_percentage DECIMAL(5,2),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE
);

-- 10. Interview Questions
CREATE TABLE IF NOT EXISTS interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('HR', 'Technical') NOT NULL,
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    model_answer TEXT,
    tips TEXT
);

-- 11. Interview Attempts
CREATE TABLE IF NOT EXISTS interview_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    user_answer TEXT NOT NULL,
    ai_score INT DEFAULT 0,
    ai_feedback TEXT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE
);

-- 12. Resumes
CREATE TABLE IF NOT EXISTS resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    template_name VARCHAR(50) DEFAULT 'modern',
    full_name VARCHAR(120),
    email VARCHAR(150),
    phone VARCHAR(30),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    education TEXT,
    skills TEXT,
    projects TEXT,
    internships TEXT,
    certifications TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 13. Companies
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    overview TEXT,
    eligibility_criteria TEXT,
    selection_process TEXT,
    key_topics TEXT,
    preparation_tips TEXT
);

-- 14. Student Progress
CREATE TABLE IF NOT EXISTS student_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    coding_count INT DEFAULT 0,
    aptitude_score DECIMAL(5,2) DEFAULT 0.0,
    mock_tests_count INT DEFAULT 0,
    interviews_count INT DEFAULT 0,
    last_active_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 15. Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    badge_title VARCHAR(100) NOT NULL,
    badge_icon VARCHAR(50),
    description VARCHAR(255),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
