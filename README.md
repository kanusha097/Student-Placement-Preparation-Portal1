# Student Placement Preparation Portal

A modern, responsive, full-stack educational web application designed for engineering students preparing for campus placements. Features interactive coding practice, quantitative & logical aptitude training, company-specific mock examinations, AI interview preparation, ATS resume builder, and an administrative dashboard.

---

## 🚀 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router v6.
- **Backend**: Node.js & Express.js.
- **Database**: MySQL (with normalized 15-table relational schema & automatic fallback).
- **Design Theme**: Royal Purple, Lavender, Soft White, and Slate Dark Mode.

---

## 📁 Project Architecture

```
spp/
├── client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── index.html              # HTML5 entry with Inter font
│   ├── vite.config.js          # Vite config with API proxy
│   ├── tailwind.config.js      # Custom theme (Royal Purple & Lavender)
│   ├── src/
│   │   ├── main.jsx            # React root with Auth and Theme providers
│   │   ├── App.jsx             # Master route mapping & app shell
│   │   ├── index.css           # Tailwind base, utilities & glassmorphism
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Student & Admin session state
│   │   │   └── ThemeContext.jsx# Dark & Light theme manager
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky responsive navigation with streak & notifications
│   │   │   ├── Sidebar.jsx     # Modern collapsible navigation drawer
│   │   │   ├── Footer.jsx      # Educational portal footer
│   │   │   ├── NotificationModal.jsx # Live notifications center
│   │   │   └── DailyChallengeModal.jsx # Question of the Day modal
│   │   └── pages/
│   │       ├── LandingPage.jsx       # Hero, stats, features & how it works
│   │       ├── LoginPage.jsx         # Student & Admin authentication
│   │       ├── RegisterPage.jsx      # Student registration with college details
│   │       ├── ForgotPasswordPage.jsx# Password recovery
│   │       ├── StudentDashboard.jsx  # Metrics, goals & weekly graph
│   │       ├── CodingPractice.jsx    # Multi-language editor & tests
│   │       ├── AptitudePractice.jsx  # Topic-wise MCQs & explanations
│   │       ├── MockTests.jsx         # Timed company mock exams
│   │       ├── InterviewPrep.jsx     # HR, Tech & AI mock interviews
│   │       ├── TechnicalPrep.jsx     # CS notes & cheatsheets
│   │       ├── ResumeBuilder.jsx     # Live ATS resume generator
│   │       ├── CompanyPrep.jsx       # TCS, Infosys, Wipro, Accenture, etc.
│   │       ├── ProgressAnalytics.jsx # Streaks & readiness percentiles
│   │       ├── Leaderboard.jsx       # Student rankings & points
│   │       ├── AdminDashboard.jsx    # Portal management
│   │       └── ProfilePage.jsx       # Student profile & details
├── server/                     # Backend API (Express.js + MySQL)
│   ├── server.js               # Express API entry point
│   ├── schema.sql              # Normalized MySQL relational database schema
│   └── config/
│       └── db.js               # MySQL pool & database connection manager
├── package.json                # Project root workspace scripts
└── README.md
```

---

## 🛠️ Step-by-Step Execution Guide

### Prerequisites
- Node.js (v18+ or v20+) and npm.
- MySQL Server (optional for Phase 1; server runs in fallback safe mode if offline).

### 1. Install Dependencies
Run the following commands in the terminal:

```bash
# In the client directory
cd client
npm install

# In the server directory
cd ../server
npm install
```

### 2. Start the Application

#### One-Click Windows Launch:
Double-click `start_portal.bat` or run:
```cmd
start_portal.bat
```

#### Manual Terminal Commands:
```cmd
# Terminal 1: Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: React Frontend (Port 5173)
cd client
npm run dev
```

### 3. Database Migration (Optional when MySQL is installed)
```cmd
cd server
npm run db:init
```
*Note: If local MySQL is offline, the backend seamlessly operates in High-Performance Resilient Memory Mode with all 15 relational entities preserved.*

### 4. Running Verification Test Suites
```cmd
# Run Master End-to-End Test Suite across all 12 modules
node server/test_e2e_full_system.js

# Run Phase-Specific Test Suites
node server/test_auth.js
node server/test_progress.js
node server/test_coding.js
node server/test_aptitude_mock.js
node server/test_interview.js
node server/test_resume_company.js
node server/test_phase8_db.js
node server/test_admin.js
```

---

## 🔑 Pre-Configured Test Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Student (Demo)** | `anusha@placementprep.edu` | `Password@123` | Full student preparation modules |
| **Admin (Placement Officer)** | `admin@placementprep.edu` | `Admin@123` | Full admin dashboard, student roster, question management |

---

## 🎨 Theme & UI/UX Design

- **Primary Colors**: Royal Purple (`#7C3AED`, `#6D28D9`), Lavender (`#EDE9FE`, `#FAF8FF`).
- **Dark Mode**: Fully supported with persistence via localStorage.
- **Responsive Layout**: Fluid breakpoints for Mobile, Tablet, and Desktop.
- **ATS Resume Output**: Scoped `@media print` rules for clean single-page PDF downloads.
