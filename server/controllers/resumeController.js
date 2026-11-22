import { getDB, isDBConnected } from '../config/db.js';

let userResumes = {
  1: {
    template: 'modern',
    personal: {
      fullName: "Anusha Sharma",
      email: "anusha@placementprep.edu",
      phone: "+91 98765 43210",
      location: "Bangalore, India",
      linkedin: "linkedin.com/in/anusha-sharma",
      github: "github.com/anusha-sharma",
      portfolio: "anushasharma.dev"
    },
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "National Institute of Technology",
        score: "8.92 / 10 CGPA",
        year: "2022 - 2026"
      },
      {
        degree: "Class XII (Senior Secondary)",
        institution: "Delhi Public School",
        score: "94.6%",
        year: "2022"
      }
    ],
    skills: {
      languages: "Java, Python, C++, SQL, JavaScript",
      frameworks: "React.js, Node.js, Express, Tailwind CSS",
      developerTools: "Git, GitHub, Docker, Postman, Linux",
      coreConcepts: "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks"
    },
    projects: [
      {
        title: "Student Placement Preparation Portal",
        technologies: "React, Node.js, Express, MySQL, Tailwind CSS",
        bullets: [
          "Developed a full-stack campus preparation SaaS featuring sandboxed code execution and real-time test evaluation.",
          "Implemented automated mock exams with negative marking, timers, and comprehensive analytical scorecards.",
          "Architected responsive UI supporting dark mode, speech recognition AI interviews, and ATS resume generation."
        ]
      },
      {
        title: "Distributed Key-Value Store",
        technologies: "Java, Socket Programming, Multithreading",
        bullets: [
          "Built a fault-tolerant in-memory distributed cache supporting concurrent GET and SET operations via TCP sockets.",
          "Integrated master-replica synchronization with eventual consistency and thread-safe hash indexing."
        ]
      }
    ],
    experience: [
      {
        role: "Software Development Intern",
        company: "Tech Labs India",
        duration: "May 2025 - July 2025",
        bullets: [
          "Optimized backend database queries and Redis caching, cutting average API response times by 35%.",
          "Collaborated in Agile sprints to ship 4 production microservice endpoints."
        ]
      }
    ],
    certifications: [
      "Oracle Certified Professional: Java SE 11 Developer",
      "AWS Certified Cloud Practitioner"
    ],
    achievements: [
      "Solved 250+ algorithmic problems across LeetCode and GeeksforGeeks.",
      "Finalist at National Smart India Hackathon (SIH 2025)."
    ]
  }
};

export const getResume = (req, res) => {
  const userId = req.user ? req.user.id : 1;
  const resume = userResumes[userId] || userResumes[1];
  return res.json({ success: true, resume });
};

export const saveResume = (req, res) => {
  const userId = req.user ? req.user.id : 1;
  const { resumeData } = req.body;
  if (!resumeData) {
    return res.status(400).json({ success: false, message: "Resume data is required" });
  }

  userResumes[userId] = resumeData;

  if (isDBConnected()) {
    try {
      const pool = getDB();
      pool.query(
        `INSERT INTO resumes (user_id, template_name, full_name, email, phone, linkedin, github, education, skills, projects, internships, certifications)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         template_name = VALUES(template_name), full_name = VALUES(full_name), email = VALUES(email), phone = VALUES(phone),
         linkedin = VALUES(linkedin), github = VALUES(github), education = VALUES(education), skills = VALUES(skills),
         projects = VALUES(projects), internships = VALUES(internships), certifications = VALUES(certifications);`,
        [
          userId,
          resumeData.template || 'modern',
          resumeData.personal?.fullName || '',
          resumeData.personal?.email || '',
          resumeData.personal?.phone || '',
          resumeData.personal?.linkedin || '',
          resumeData.personal?.github || '',
          JSON.stringify(resumeData.education || []),
          JSON.stringify(resumeData.skills || {}),
          JSON.stringify(resumeData.projects || []),
          JSON.stringify(resumeData.experience || []),
          JSON.stringify(resumeData.certifications || [])
        ]
      ).catch(e => console.warn('[DB] Resume save to MySQL error:', e.message));
    } catch (err) {
      console.warn('[DB] Could not persist resume to MySQL:', err.message);
    }
  }

  return res.json({ success: true, message: "Resume saved successfully", resume: resumeData });
};
