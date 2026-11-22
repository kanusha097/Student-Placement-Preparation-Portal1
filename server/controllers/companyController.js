export const COMPANIES_DATA = [
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    roles: ["Ninja (3.36 - 3.6 LPA)", "Digital (7.0 - 7.5 LPA)", "Prime (9.0 - 11.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout 10th, 12th, and B.Tech",
      backlogs: "Maximum 1 active backlog permitted at the time of examination",
      gapInStudies: "Maximum 24 months allowable with valid documentation"
    },
    overview: "TCS is India's largest IT multinational and a premier campus recruiter. The National Qualifier Test (NQT) is the primary gateway into Ninja, Digital, and Prime bands.",
    rounds: [
      {
        name: "Round 1: TCS NQT Cognitive & Technical Test",
        duration: "75 - 120 mins",
        details: "Section 1: Numerical Ability, Reasoning Ability, Verbal Ability.\nSection 2 (Advanced): Advanced Quantitative, Advanced Reasoning, and Hands-on Coding (2 problems)."
      },
      {
        name: "Round 2: Technical Interview",
        duration: "30 - 45 mins",
        details: "Core technical review covering Java/Python, OOPs, DBMS (SQL queries), project architecture, and coding logic tested in Round 1."
      },
      {
        name: "Round 3: Managerial & HR Round",
        duration: "20 - 30 mins",
        details: "Behavioral assessment, willingness to relocate, flexibility with shifts, situational judgment, and communication evaluation."
      }
    ],
    sampleAptitude: [
      "Work and Time problems with alternating workers (A & B).",
      "Profit and Loss calculations with successive discounts.",
      "Data Interpretation involving stacked bar and pie charts."
    ],
    sampleCoding: [
      "Find the number of sweet jars that can be bought given coins (Greedy).",
      "Spiral matrix traversal and boundary element manipulation.",
      "String anagram groupings and character frequency queries."
    ],
    technicalQuestions: [
      "Why is Java not purely object-oriented? What is the role of wrapper classes?",
      "Write a query to find the department with the highest average salary.",
      "Explain the difference between call by value and call by reference."
    ],
    hrQuestions: [
      "Why do you want to start your professional career at TCS?",
      "Are you comfortable working in rotating shifts or relocating to another base branch?",
      "Tell me about a challenging situation you handled during college events."
    ],
    tips: [
      "Accuracy matters heavily in the cognitive section due to negative marking in advanced questions.",
      "Ensure your coding solutions pass boundary cases (empty arrays, negative numbers)."
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    roles: ["Systems Engineer (3.6 LPA)", "Digital Specialist Engineer - DSE (6.25 LPA)", "Specialist Programmer - SP (9.5 LPA)"],
    eligibility: {
      cgpa: "65% or 6.5 CGPA in engineering with no active backlogs",
      backlogs: "Zero active backlogs at time of joining",
      gapInStudies: "Up to 2 years allowable with medical/educational justification"
    },
    overview: "Infosys conducts on-campus and off-campus drives via the InfyTQ and HackWithInfy platforms, placing strong weight on pseudocode and algorithmic depth.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        duration: "100 mins",
        details: "Reasoning Ability (15 Qs), Technical Ability / Mathematical Thinking (10 Qs), Verbal Ability (20 Qs), and Pseudocode (5 Qs)."
      },
      {
        name: "Round 2: Technical & HR Discussion",
        duration: "35 - 50 mins",
        details: "In-depth code walkthrough, data structures (Trees & Dynamic Programming for SP/DSE), and culture fitment."
      }
    ],
    sampleAptitude: [
      "Logical deduction and seating arrangement with circular tables.",
      "Permutations and Combinations with conditional constraints.",
      "Critical reasoning and reading comprehension passages."
    ],
    sampleCoding: [
      "Longest Increasing Subsequence with cost constraints.",
      "Graph shortest path using Dijkstra or BFS.",
      "Bit manipulation puzzles (Find unique element where others repeat thrice)."
    ],
    technicalQuestions: [
      "How does JVM perform Garbage Collection? What are Young and Old generations?",
      "Explain indexing in databases and when an index might degrade write performance.",
      "What is the difference between Abstract Class and Interface in Java 8+?"
    ],
    hrQuestions: [
      "What did you learn from an internship or academic project failure?",
      "Where do you see yourself contributing in the software lifecycle?",
      "How do you keep yourself updated with rapid tech changes like Cloud & AI?"
    ],
    tips: [
      "Pseudocode questions often test pointer dereferencing and recursion trace.",
      "For Specialist Programmer (SP), practice Medium/Hard Dynamic Programming questions on LeetCode."
    ]
  },
  {
    id: "wipro",
    name: "Wipro",
    roles: ["Elite NLTH (3.5 LPA)", "Turbo (6.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout 10th, 12th, and graduation",
      backlogs: "Maximum 1 active backlog permitted during assessment",
      gapInStudies: "Maximum 3 years education gap allowed"
    },
    overview: "Wipro Elite National Talent Hunt (NLTH) evaluates candidates on cognitive reasoning, written communication, and fundamental programming.",
    rounds: [
      {
        name: "Round 1: Online Assessment (Cognitive & Coding)",
        duration: "128 mins",
        details: "Section 1: Quantitative, Logical & English (48 mins).\nSection 2: Written Communication (Essay writing, 20 mins).\nSection 3: Coding Assessment (2 questions, 60 mins)."
      },
      {
        name: "Round 2: Technical & HR Interview",
        duration: "30 mins",
        details: "Project discussion, OOPs concepts, basic SQL queries, and company values."
      }
    ],
    sampleAptitude: [
      "Simple and Compound interest difference equations.",
      "Coding-decoding and alphanumeric sequences.",
      "Sentence correction and vocabulary contextual usage."
    ],
    sampleCoding: [
      "Array element rotation by K steps without extra memory.",
      "Matrix element summation and palindrome verification.",
      "Subarray with given sum (Two-pointer technique)."
    ],
    technicalQuestions: [
      "Explain the concept of method overloading vs method overriding.",
      "What is a primary key vs foreign key? Explain cascade delete.",
      "How do processes communicate with each other in an Operating System?"
    ],
    hrQuestions: [
      "Tell me about your background and why you chose engineering.",
      "Are you willing to work across diverse software domains?",
      "Describe a project you worked on as a team."
    ],
    tips: [
      "In the essay round, ensure clean grammar and avoid spelling errors; automated NLP evaluates your essay.",
      "Write clean, modular code with descriptive variable names in the coding round."
    ]
  },
  {
    id: "accenture",
    name: "Accenture",
    roles: ["Associate Software Engineer - ASE (4.5 LPA)", "Advanced ASE - AASE (6.5 LPA)"],
    eligibility: {
      cgpa: "6.5 CGPA or 65% aggregate with zero active backlogs",
      backlogs: "No active backlogs at time of application",
      gapInStudies: "Maximum 1 year gap allowed"
    },
    overview: "Accenture follows a multi-stage elimination model: Cognitive & Technical Assessment, Coding Assessment, and a specialized Communication Assessment.",
    rounds: [
      {
        name: "Round 1: Cognitive & Technical Assessment",
        duration: "90 mins",
        details: "Cognitive: Critical Thinking, Abstract Reasoning, English.\nTechnical: Common Applications & MS Office, Cloud Fundamentals, Network Security, Pseudocode. (No negative marking)."
      },
      {
        name: "Round 2: Coding Assessment",
        duration: "45 mins",
        details: "2 algorithmic problems in C, C++, Java, or Python (mandatory qualification for Advanced ASE)."
      },
      {
        name: "Round 3: Communication Assessment",
        duration: "20 mins",
        details: "Automated voice-based assessment testing reading, sentence repetition, vocabulary, and impromptu storytelling."
      },
      {
        name: "Round 4: Technical & HR Interview",
        duration: "25 mins",
        details: "Project evaluation, problem solving approach, and cultural fitment."
      }
    ],
    sampleAptitude: [
      "Abstract reasoning: Shape sequence pattern progression.",
      "MS Office / Outlook shortcuts and cloud storage mechanisms.",
      "Pseudocode tracing loop counters and bitwise operators (&, |, ^)."
    ],
    sampleCoding: [
      "Calculate maximum binary string toggles.",
      "Find total count of carry digits in addition of two integers.",
      "Replace elements in an array with nearest greater element on right."
    ],
    technicalQuestions: [
      "What is Cloud Computing, and differentiate IaaS, PaaS, and SaaS.",
      "Explain the difference between synchronous and asynchronous calls.",
      "What is database indexing and how does it speed up queries?"
    ],
    hrQuestions: [
      "Why Accenture and what do you know about our core service pillars?",
      "Give an example of when you learned a new technology quickly under pressure.",
      "How do you resolve disagreement with a peer?"
    ],
    tips: [
      "Since there is no negative marking in Round 1, attempt all 90 questions strategically.",
      "Speak clearly and with constant pace in the automated Communication assessment."
    ]
  },
  {
    id: "cognizant",
    name: "Cognizant",
    roles: ["GenC (4.0 LPA)", "GenC Next (6.75 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA throughout academic career",
      backlogs: "Zero active backlogs",
      gapInStudies: "Up to 1 year gap permitted"
    },
    overview: "Cognizant divides recruitment into GenC (standard foundational track) and GenC Next (advanced software engineering track with full-stack and cloud focus).",
    rounds: [
      {
        name: "Round 1: Aptitude & Skill Assessment",
        duration: "80 mins",
        details: "Quantitative, Logical, Verbal reasoning followed by Domain Assessment (Java, SQL, Web fundamentals)."
      },
      {
        name: "Round 2: Technical & HR Interview",
        duration: "30 - 40 mins",
        details: "Live coding demonstration on screen, SQL query execution, and scenario discussions."
      }
    ],
    sampleAptitude: [
      "Ratio and proportions with mixtures and alligations.",
      "Data sufficiency problems across statements I & II.",
      "Para jumbles and error spotting in compound sentences."
    ],
    sampleCoding: [
      "Validate balanced brackets string using Stack.",
      "Find prime factors of a number and print in ascending order.",
      "String compression (e.g. 'aabcccccaaa' -> 'a2b1c5a3')."
    ],
    technicalQuestions: [
      "Write a query using INNER JOIN vs LEFT JOIN and explain the difference.",
      "Explain Exception Handling in Java: Checked vs Unchecked exceptions.",
      "What is REST API and what is the difference between PUT and PATCH?"
    ],
    hrQuestions: [
      "Why Cognizant? What are our recent technology initiatives?",
      "Are you open to continuous retraining and certification programs?",
      "Describe a situation where you managed competing academic deadlines."
    ],
    tips: [
      "Practice SQL queries involving GROUP BY and aggregate functions.",
      "Be prepared to share your screen and write executable code in the interview."
    ]
  },
  {
    id: "capgemini",
    name: "Capgemini",
    roles: ["Analyst (4.0 - 4.25 LPA)", "Senior Analyst (5.75 - 7.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.0 CGPA in 10th, 12th, and Graduation",
      backlogs: "Zero backlogs allowed at time of assessment",
      gapInStudies: "Maximum 1 year gap allowable"
    },
    overview: "Capgemini features a distinctive Game-Based Aptitude section evaluating cognitive speed, inductive reasoning, and spatial memory.",
    rounds: [
      {
        name: "Round 1: Cognitive & Game-Based Assessment",
        duration: "60 mins",
        details: "English Communication (30 Qs), Game-Based Aptitude (Grid challenge, Motion challenge, Switch challenge), Pseudocode test."
      },
      {
        name: "Round 2: Behavioral Profiling",
        duration: "20 mins",
        details: "Work personality questionnaire."
      },
      {
        name: "Round 3: Technical & HR Interview",
        duration: "30 mins",
        details: "OOPs concepts, data structures, and resume project discussions."
      }
    ],
    sampleAptitude: [
      "Grid Challenge: Memorizing dynamic positions of dots on 4x4 matrix.",
      "Motion Challenge: Solving sliding tile puzzles within fewest moves.",
      "Switch Challenge: Identifying transformation rules across geometric symbols."
    ],
    sampleCoding: [
      "Matrix symmetry check and diagonal sums.",
      "Count frequency of words in a sentence.",
      "Binary to decimal conversion and vice-versa without built-in methods."
    ],
    technicalQuestions: [
      "What is Polymorphism and give a real-world example of both types.",
      "Explain normalization vs denormalization in relational databases.",
      "What happens when you enter a URL into a browser address bar?"
    ],
    hrQuestions: [
      "What motivates you to work in an IT consulting company?",
      "Tell me about a time you had to adapt to a sudden project change.",
      "Do you have any questions for the interview panel?"
    ],
    tips: [
      "Familiarize yourself with cognitive game challenges beforehand; speed and spatial memory are measured.",
      "Always have 1-2 thoughtful questions prepared to ask the panel at the end."
    ]
  },
  {
    id: "deloitte",
    name: "Deloitte",
    roles: ["Associate Analyst (4.5 - 5.0 LPA)", "Consulting Analyst (7.6 - 8.5 LPA)"],
    eligibility: {
      cgpa: "60% or 6.5 CGPA in engineering with no active backlogs",
      backlogs: "No active backlogs allowed",
      gapInStudies: "Up to 1 year permitted"
    },
    overview: "Deloitte hires for consulting, cyber risk, and software development, placing high emphasis on structured business problem-solving, case studies, and articulate communication.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        duration: "75 mins",
        details: "Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Computer Fundamentals."
      },
      {
        name: "Round 2: Group Discussion or Case Study Presentation",
        duration: "30 mins",
        details: "Team evaluation on a digital transformation or business scenario."
      },
      {
        name: "Round 3: Partner & Technical Interview",
        duration: "30 - 45 mins",
        details: "Scenario analysis, project discussion, business acumen, and culture fit."
      }
    ],
    sampleAptitude: [
      "Advanced Probability and Bayes' Theorem applications.",
      "Data Interpretation involving quarterly sales and growth forecasts.",
      "Statement and Assumption deduction."
    ],
    sampleCoding: [
      "Optimal stock buying and selling for maximum profit (Kadane / DP).",
      "Shortest path in a grid with obstacles.",
      "Detect and remove cycle in a singly linked list."
    ],
    technicalQuestions: [
      "Explain the differences between SQL and NoSQL and when to choose each for enterprise apps.",
      "What is microservices architecture and how does API Gateway work?",
      "How do you ensure data security and prevent SQL Injection attacks?"
    ],
    hrQuestions: [
      "Walk me through a project where you solved a real business or user problem.",
      "How do you handle ambiguous requirements when a client does not know what they want?",
      "Why Deloitte Consulting over pure product-based companies?"
    ],
    tips: [
      "In the case study/discussion round, focus on structured communication; listen actively and build upon team points.",
      "Know the business impact of your academic projects (metrics, users, efficiency gained)."
    ]
  }
];

export const getCompanies = (req, res) => {
  return res.json({ success: true, count: COMPANIES_DATA.length, companies: COMPANIES_DATA });
};

export const getCompanyById = (req, res) => {
  const company = COMPANIES_DATA.find(c => c.id.toLowerCase() === req.params.id.toLowerCase());
  if (!company) {
    return res.status(404).json({ success: false, message: "Company not found" });
  }
  return res.json({ success: true, company });
};
