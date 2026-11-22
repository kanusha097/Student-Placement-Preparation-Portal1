import { getDB, isDBConnected } from '../config/db.js';

// Realistic mock data store for student progress
let mockDashboardData = {
  stats: {
    codingSolved: 42,
    codingEasy: 24,
    codingMedium: 15,
    codingHard: 3,
    totalCodingAvailable: 65,
    aptitudeScore: 84.5,
    aptitudeAttempted: 18,
    aptitudeAccuracy: '88.5%',
    mockTestsTaken: 6,
    mockAverageScore: '82%',
    highestMockPercentile: 94,
    interviewScore: 80,
    interviewsCompleted: 4,
    placementReadiness: 78,
    streak: 12
  },
  dailyGoals: [
    { id: 1, text: "Solve 1 Medium Dynamic Programming challenge", category: "Coding", completed: true, xp: 50 },
    { id: 2, text: "Complete 20 Quantitative Aptitude questions", category: "Aptitude", completed: true, xp: 40 },
    { id: 3, text: "Practice 1 AI HR behavioral interview answer", category: "Interview", completed: false, xp: 30 },
    { id: 4, text: "Review Operating Systems Deadlock cheatsheet", category: "Technical", completed: false, xp: 20 }
  ],
  weeklyTrends: [
    { day: 'Mon', problems: 8, hours: 2.5 },
    { day: 'Tue', problems: 12, hours: 3.2 },
    { day: 'Wed', problems: 6, hours: 1.8 },
    { day: 'Thu', problems: 14, hours: 4.0 },
    { day: 'Fri', problems: 10, hours: 2.8 },
    { day: 'Sat', problems: 16, hours: 4.5 },
    { day: 'Sun', problems: 11, hours: 3.0 }
  ],
  streakDays: [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: true },
    { day: 'S', active: true },
    { day: 'S', active: true }
  ],
  recentActivities: [
    {
      id: 1,
      title: "Solved 'Two Sum - Target Pair Indices'",
      type: "coding",
      time: "2 hours ago",
      score: "Accepted (3/3 Test Cases)",
      badge: "Easy",
      icon: "Code2"
    },
    {
      id: 2,
      title: "Completed TCS NQT Quantitative Practice Set",
      type: "aptitude",
      time: "4 hours ago",
      score: "Score: 18/20 (90%)",
      badge: "Time & Work",
      icon: "BrainCircuit"
    },
    {
      id: 3,
      title: "Attempted AI HR Mock: 'Why should we hire you?'",
      type: "interview",
      time: "Yesterday",
      score: "AI Score: 85/100",
      badge: "Communication",
      icon: "Mic2"
    },
    {
      id: 4,
      title: "Exported Single-Page ATS Resume",
      type: "resume",
      time: "2 days ago",
      score: "ATS Rating: 92/100",
      badge: "Modern Template",
      icon: "FileText"
    }
  ],
  achievements: [
    { id: 1, title: "Algo Novice", desc: "Solved 25 coding questions", unlocked: true, icon: "Award" },
    { id: 2, title: "10-Day Streak", desc: "Maintained 10 days continuous practice", unlocked: true, icon: "Flame" },
    { id: 3, title: "Quant Wizard", desc: "Achieved >85% in Quantitative Aptitude", unlocked: true, icon: "BrainCircuit" },
    { id: 4, title: "Mock Conqueror", desc: "Completed 5 full-length mock examinations", unlocked: true, icon: "FileCheck2" },
    { id: 5, title: "Interview Ready", desc: "Scored 80+ in AI Mock Interview", unlocked: true, icon: "Mic2" },
    { id: 6, title: "DSA Master", desc: "Solve 50 coding questions", unlocked: false, icon: "Code2" }
  ],
  recommendations: [
    {
      id: 1,
      company: "TCS Ninja / Digital",
      title: "Numerical Ability: Profit & Loss Speed Drills",
      reason: "High frequency in TCS Foundation section",
      link: "/aptitude",
      actionText: "Practice 15 MCQs"
    },
    {
      id: 2,
      company: "Infosys Specialist Programmer",
      title: "Dynamic Programming: Longest Common Subsequence",
      reason: "Frequently asked in Round 1 coding round",
      link: "/coding",
      actionText: "Solve Problem"
    },
    {
      id: 3,
      company: "Accenture ASE",
      title: "Full-Length Cognitive & Technical Simulator",
      reason: "Recommended to test overall section timing",
      link: "/mock-tests",
      actionText: "Launch Mock"
    }
  ]
};

// 1. GET DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;

    if (isDBConnected()) {
      const pool = getDB();
      // Fetch progress from database
      const [rows] = await pool.query(
        'SELECT * FROM student_progress WHERE user_id = ?',
        [userId]
      );

      if (rows.length > 0) {
        const row = rows[0];
        mockDashboardData.stats.codingSolved = row.coding_count || mockDashboardData.stats.codingSolved;
        mockDashboardData.stats.aptitudeScore = row.aptitude_score || mockDashboardData.stats.aptitudeScore;
        mockDashboardData.stats.mockTestsTaken = row.mock_tests_count || mockDashboardData.stats.mockTestsTaken;
      }
    }

    return res.json({
      success: true,
      data: mockDashboardData
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching dashboard metrics.' });
  }
};

// 2. TOGGLE DAILY GOAL
export const toggleDailyGoal = (req, res) => {
  const { goalId } = req.body;
  const goal = mockDashboardData.dailyGoals.find(g => g.id === parseInt(goalId));
  if (goal) {
    goal.completed = !goal.completed;
    return res.json({ success: true, message: 'Goal updated', goal, allGoals: mockDashboardData.dailyGoals });
  }
  return res.status(404).json({ success: false, message: 'Goal not found' });
};

// 3. GET ACTIVITIES
export const getActivities = (req, res) => {
  return res.json({ success: true, activities: mockDashboardData.recentActivities });
};
