import { getDB, isDBConnected } from '../config/db.js';

export const HR_QUESTIONS_DATA = [
  {
    id: 1,
    question: "Tell me about yourself.",
    category: "Introduction",
    framework: "Present, Past, Future Model",
    keyPoints: [
      "Current status: Degree, college, key tech stack.",
      "Past accomplishments: Key projects, internships, leadership roles.",
      "Future goal: Why you are excited about this role and company."
    ],
    sampleAnswer: "I am a final-year Computer Science student at National Institute of Technology with a strong passion for scalable full-stack development and data structures. Recently, I built an end-to-end placement preparation platform and completed an internship where I optimized API response times by 35%. I'm now eager to bring my problem-solving skills and fast learning agility to your engineering team.",
    pitfall: "Avoid reciting your resume line-by-line or talking about personal non-professional hobbies."
  },
  {
    id: 2,
    question: "What are your greatest strengths and weaknesses?",
    category: "Self-Awareness",
    framework: "Self-Awareness & Continuous Improvement",
    keyPoints: [
      "Strength: Choose a skill backed by an actual achievement (e.g., perseverance in debugging, quick adaptability).",
      "Weakness: Pick a non-fatal trait (e.g., reluctance to delegate early) and explain the specific remedy you are implementing."
    ],
    sampleAnswer: "My greatest strength is analytical resilience; when faced with complex production bugs or algorithmic problems, I systematically trace logs and break down inputs. A weakness I previously had was spending too long trying to solve a roadblock alone before asking for guidance. I now set a strict 45-minute timer to attempt troubleshooting before consulting peers, which has boosted my team productivity.",
    pitfall: "Never say 'I have no weaknesses' or 'I work too hard'—interviewers see right through fake weaknesses."
  },
  {
    id: 3,
    question: "Why should we hire you over other candidates?",
    category: "Value Proposition",
    framework: "Competence + Culture Fit + Passion",
    keyPoints: [
      "Technical alignment with the company's tech stack.",
      "Proven consistency (e.g. coding streak, project completion).",
      "Willingness to take ownership and learn new technologies."
    ],
    sampleAnswer: "While many candidates possess the requisite technical qualifications, I combine strong algorithmic foundations with hands-on full-stack development and team collaboration. My track record of maintaining a 30-day coding streak and delivering production-ready web applications demonstrates high discipline and self-motivation, enabling me to contribute value from day one.",
    pitfall: "Do not disparage other applicants; keep the focus on your unique combination of skills and work ethic."
  },
  {
    id: 4,
    question: "Where do you see yourself in 3 to 5 years?",
    category: "Career Vision",
    framework: "Growth, Mastery & Contribution",
    keyPoints: [
      "Desire to become an expert in software architecture or domain.",
      "Aspiration to mentor junior developers and lead feature modules.",
      "Commitment to the company's long-term engineering vision."
    ],
    sampleAnswer: "In the next 3 to 5 years, I envision myself growing from an associate software engineer into a senior technical contributor. I want to develop deep expertise in distributed systems and cloud architecture, while taking on the responsibility of mentoring incoming campus hires and driving mission-critical projects within the company.",
    pitfall: "Don't say you plan to leave for higher studies (MBA/MS) or start your own startup within a year."
  },
  {
    id: 5,
    question: "Describe a time when you had a conflict with a team member and how you resolved it.",
    category: "Teamwork & Behavioral",
    framework: "STAR Method (Situation, Task, Action, Result)",
    keyPoints: [
      "Situation: Academic or hackathon project deadline.",
      "Conflict: Difference in technical approach or architecture.",
      "Action: Objective discussion with pros/cons and data-driven benchmark.",
      "Result: Successful project submission and strengthened working relationship."
    ],
    sampleAnswer: "During our final-year capstone project, a teammate and I disagreed on whether to use MongoDB or PostgreSQL for storing user profiles. Instead of arguing opinion, I proposed setting up a rapid benchmark comparing query latency and schema stability for our specific use case. The test proved PostgreSQL was better suited for our relational queries. We implemented it, finished 3 days ahead of deadline, and achieved top marks.",
    pitfall: "Never place personal blame on the other party; emphasize mutual respect and problem-solving."
  }
];

export const TECHNICAL_QUESTIONS_DATA = {
  java: [
    {
      q: "Explain the internal working of HashMap in Java.",
      answer: "HashMap works on the principle of hashing. It uses an array of Node (buckets) where each Node contains hash, key, value, and next. In Java 8+, when bucket collisions exceed 8 nodes (TREEIFY_THRESHOLD) and array size is >= 64, the linked list converts into a balanced Red-Black Tree, reducing lookup from O(n) to O(log n)."
    },
    {
      q: "What is the difference between String, StringBuilder, and StringBuffer?",
      answer: "String is immutable and stored in the String Constant Pool. StringBuilder is mutable, fast, but not thread-safe (non-synchronized). StringBuffer is mutable and thread-safe because its methods are synchronized, making it slightly slower than StringBuilder in single-threaded environments."
    }
  ],
  python: [
    {
      q: "What is the Global Interpreter Lock (GIL) in Python, and how does it affect multithreading?",
      answer: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once in CPython. For CPU-bound tasks, multithreading does not provide true parallelism; multiprocessing or asyncio should be used instead. For I/O-bound tasks, the GIL is released during I/O operations."
    },
    {
      q: "Explain Generators and the 'yield' keyword in Python.",
      answer: "Generators are functions that return an iterator that yields one item at a time using 'yield'. Unlike normal functions that return an entire list in memory, generators maintain local state between calls and produce values on-the-fly (lazy evaluation), saving memory when processing massive data streams."
    }
  ],
  dbms: [
    {
      q: "Explain ACID properties in detail with real banking examples.",
      answer: "Atomicity: Entire transaction succeeds or rolls back (transfer of ₹1000 debits Account A and credits Account B together). Consistency: Database constraints remain valid before and after. Isolation: Concurrent transactions do not see intermediate uncommitted states. Durability: Once committed, updates persist permanently even after a system crash."
    },
    {
      q: "Differentiate between Clustered and Non-Clustered Indexes.",
      answer: "A Clustered Index alters the physical ordering of records in a table; there can only be one clustered index per table (typically the Primary Key). A Non-Clustered Index is a separate B-tree structure holding key values with pointers to the actual data row; multiple non-clustered indexes can exist on a table."
    }
  ],
  sql: [
    {
      q: "Write a SQL query to find the second highest salary from an Employee table.",
      answer: "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee); Or using window function: SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) t WHERE rnk = 2;"
    },
    {
      q: "What is the difference between WHERE and HAVING clause in SQL?",
      answer: "WHERE filters rows before grouping occurs and cannot be used with aggregate functions. HAVING filters groups after GROUP BY aggregation has been applied (e.g. HAVING COUNT(*) > 5)."
    }
  ],
  os: [
    {
      q: "What is Deadlock and what are the 4 necessary Coffman conditions?",
      answer: "A Deadlock occurs when a set of processes are blocked because each is holding a resource and waiting for another resource held by another process. The 4 conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait."
    },
    {
      q: "Differentiate between Process and Thread.",
      answer: "A Process is an executing program with its own dedicated memory space, registers, and file handles. A Thread is a lightweight subunit of execution within a process that shares code, data, and OS resources with sibling threads, but maintains its own stack and program counter."
    }
  ],
  cn: [
    {
      q: "Explain the TCP 3-Way Handshake mechanism.",
      answer: "1. Client sends SYN (synchronize) packet with initial sequence number x to Server. 2. Server responds with SYN-ACK packet containing sequence number y and acknowledgment x + 1. 3. Client replies with ACK packet acknowledging y + 1. Connection is established."
    },
    {
      q: "What is the difference between TCP and UDP?",
      answer: "TCP is connection-oriented, reliable (guarantees packet order and delivery via retransmissions), with congestion control. UDP is connectionless, unreliable (best-effort delivery without acknowledgments), but faster and with lower latency, ideal for video streaming and VoIP."
    }
  ],
  oops: [
    {
      q: "Explain the 4 pillars of OOPs with real-world examples.",
      answer: "1. Encapsulation: Bundling data and methods into a single class with access control (getters/setters). 2. Abstraction: Hiding internal complexity and exposing only essential interfaces (e.g., driving a car without knowing internal engine mechanics). 3. Inheritance: Reusing attributes and methods from a base class. 4. Polymorphism: Performing a single action in different ways (Method Overloading & Overriding)."
    },
    {
      q: "What are SOLID design principles?",
      answer: "S: Single Responsibility Principle. O: Open/Closed Principle. L: Liskov Substitution Principle. I: Interface Segregation Principle. D: Dependency Inversion Principle."
    }
  ],
  dsa: [
    {
      q: "When would you prefer a Linked List over an Array?",
      answer: "Prefer a Linked List when dynamic size is critical, frequent insertions and deletions at the head/middle are required in O(1) time without contiguous memory reallocation, and when random access is not needed."
    },
    {
      q: "Explain the difference between BFS and DFS graph traversals.",
      answer: "BFS uses a Queue to explore neighbor nodes level-by-level, making it optimal for finding the shortest path in unweighted graphs. DFS uses a Stack (or recursion) to explore as deep as possible along each branch before backtracking, useful for topological sort, cycle detection, and maze paths."
    }
  ]
};

export const AI_MOCK_QUESTIONS = [
  {
    id: 1,
    q: "Tell me about a challenging technical project you built, the architecture decisions you made, and how you handled difficulties.",
    targetKeywords: ["architecture", "database", "api", "challenge", "solution", "result", "performance"],
    modelAnswer: "In my recent project, I developed a full-stack campus preparation portal using React, Node.js, and MySQL. An architectural challenge was handling concurrent code execution without blocking the server. I designed a safe sandbox evaluation pipeline that isolates execution and validates test cases. This reduced server latency by 40% and supported up to 50 concurrent students."
  },
  {
    id: 2,
    q: "How do you handle working under tight deadlines with conflicting requirements from stakeholders?",
    targetKeywords: ["prioritize", "communication", "timeline", "agile", "deliverable", "collaborate"],
    modelAnswer: "When faced with tight deadlines, I start by assessing requirements based on business impact and feasibility. I schedule a quick alignment meeting with stakeholders to negotiate scope, break the deliverable into prioritized sprints, and maintain transparent progress updates to ensure quality is not compromised."
  },
  {
    id: 3,
    q: "Explain the concept of RESTful APIs and how HTTP status codes are used appropriately.",
    targetKeywords: ["stateless", "http", "get", "post", "put", "delete", "status code", "200", "404", "500"],
    modelAnswer: "REST is an architectural style based on stateless client-server communication using standard HTTP methods. GET retrieves resources, POST creates them, PUT updates them, and DELETE removes them. Status codes communicate outcome: 200 OK for success, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, and 500 Internal Server Error."
  }
];

let interviewAttemptsHistory = [];

export const getHRQuestions = (req, res) => {
  return res.json({ success: true, count: HR_QUESTIONS_DATA.length, questions: HR_QUESTIONS_DATA });
};

export const getTechnicalQuestions = (req, res) => {
  const { topic } = req.query;
  if (topic && TECHNICAL_QUESTIONS_DATA[topic.toLowerCase()]) {
    return res.json({ success: true, topic, questions: TECHNICAL_QUESTIONS_DATA[topic.toLowerCase()] });
  }
  return res.json({ success: true, questions: TECHNICAL_QUESTIONS_DATA });
};

export const evaluateAIAnswer = (req, res) => {
  const { questionId, userAnswer } = req.body;
  const mockQ = AI_MOCK_QUESTIONS.find(q => q.id === parseInt(questionId)) || AI_MOCK_QUESTIONS[0];

  if (!userAnswer || userAnswer.trim().length < 15) {
    return res.status(400).json({
      success: false,
      message: "Answer is too brief. Please provide a detailed response (at least 2-3 complete sentences)."
    });
  }

  // Realistic evaluation algorithm based on length, structure, and keyword density
  const words = userAnswer.trim().split(/\s+/).length;
  const lowerAnswer = userAnswer.toLowerCase();
  
  let keywordMatches = 0;
  mockQ.targetKeywords.forEach(kw => {
    if (lowerAnswer.includes(kw)) keywordMatches++;
  });

  let score = 65;
  if (words >= 40) score += 15;
  else if (words >= 25) score += 8;

  score += Math.min(20, keywordMatches * 5);
  score = Math.min(95, score);

  let clarity = "Good";
  let relevance = "High";
  if (score >= 85) clarity = "Excellent";
  else if (score < 70) { clarity = "Needs Refinement"; relevance = "Moderate"; }

  const feedbackReport = {
    score: `${score}/100`,
    scoreNumber: score,
    clarity,
    relevance,
    communication: score >= 80 ? "Professional & Structured" : "Conversational",
    wordCount: words,
    keywordsIdentified: keywordMatches,
    strengths: [
      "Clear articulation of personal experience and intent.",
      "Good structure addressing the core problem directly."
    ],
    improvements: score < 85 ? [
      "Quantify your results with concrete percentages, metrics, or time savings.",
      "Incorporate more domain-specific technical terminology."
    ] : [
      "Well-balanced response that aligns closely with hiring expectations."
    ],
    suggestedAnswer: mockQ.modelAnswer
  };

  interviewAttemptsHistory.unshift({
    id: Date.now(),
    question: mockQ.q,
    userAnswer,
    score,
    timestamp: "Just now"
  });

  return res.json({ success: true, evaluation: feedbackReport });
};

export const getInterviewAttempts = (req, res) => {
  return res.json({ success: true, attempts: interviewAttemptsHistory });
};
