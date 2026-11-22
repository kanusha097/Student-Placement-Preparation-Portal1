import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Database, 
  Cpu, 
  Network, 
  Layers, 
  Code, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  FileText,
  Search,
  Sparkles,
  BookMarked
} from 'lucide-react';

const TECH_MODULES = [
  {
    id: 'dbms',
    name: 'DBMS & SQL',
    icon: Database,
    notes: [
      {
        title: "1. ACID Properties & Transaction Management",
        content: `Atomicity: Entire transaction completes or completely rolls back (e.g., Bank debit + credit).\nConsistency: Invariants and schema constraints remain valid before and after.\nIsolation: Concurrent transactions run independently without seeing intermediate dirty states.\nDurability: Committed transactions persist permanently in non-volatile storage.`
      },
      {
        title: "2. Database Normalization (1NF, 2NF, 3NF, BCNF)",
        content: `1NF: Disallows multivalued or nested composite attributes; each cell contains an atomic value.\n2NF: In 1NF and no non-prime attribute is partially dependent on any candidate key.\n3NF: In 2NF and no non-prime attribute is transitively dependent on any candidate key.\nBCNF: Strict 3NF where for every functional dependency X -> Y, X must be a super key.`
      },
      {
        title: "3. Clustered vs Non-Clustered Indexes",
        content: `Clustered Index: Sorts and stores the data rows in the table physically based on key values. Maximum 1 per table (Primary Key).\nNon-Clustered Index: Creates a separate logical B-Tree structure storing index keys with row locators (pointers) to physical records.`
      }
    ],
    mcqs: [
      {
        q: "Which normal form removes transitive functional dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        ans: 2,
        exp: "3NF eliminates transitive dependency (X -> Y and Y -> Z where Y is not a super key)."
      },
      {
        q: "What does the 'I' in ACID stand for?",
        options: ["Integrity", "Isolation", "Indexing", "Inheritance"],
        ans: 1,
        exp: "Isolation ensures concurrent transactions execute without cross-interference."
      }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: Cpu,
    notes: [
      {
        title: "1. Processes vs Threads",
        content: `Process: Independent program in execution with dedicated memory space, heap, stack, and file descriptors.\nThread: Lightweight unit of execution within a process; threads of the same process share code, data, and heap, but maintain individual stacks and program counters.`
      },
      {
        title: "2. Deadlocks & The 4 Coffman Conditions",
        content: `A deadlock occurs when processes are blocked waiting for resources held by each other.\n1. Mutual Exclusion: Resources cannot be shared simultaneously.\n2. Hold and Wait: Process holds a resource while requesting another.\n3. No Preemption: Resources cannot be forcibly taken away.\n4. Circular Wait: Closed cycle of processes waiting for each other.`
      },
      {
        title: "3. Virtual Memory & Paging",
        content: `Paging divides virtual memory into fixed-size Pages and physical RAM into Frames. The Page Table translates virtual addresses to physical addresses. Page Fault occurs when a referenced page is not currently in physical RAM.`
      }
    ],
    mcqs: [
      {
        q: "Which CPU scheduling algorithm can cause starvation?",
        options: ["Round Robin", "Shortest Job First (SJF)", "First-Come First-Served (FCFS)", "All of the above"],
        ans: 1,
        exp: "SJF can cause long jobs to starve indefinitely if shorter jobs continuously arrive."
      }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    icon: Network,
    notes: [
      {
        title: "1. The 7 Layers of the OSI Model",
        content: `7. Application (HTTP, DNS, FTP)\n6. Presentation (SSL/TLS, Encryption, Compression)\n5. Session (Session establishment & checkpoints)\n4. Transport (TCP, UDP, Port numbers)\n3. Network (IP, Routers, Logical addressing)\n2. Data Link (Ethernet, MAC, Framing, Switches)\n1. Physical (Bits, Cables, Radio frequencies)`
      },
      {
        title: "2. TCP vs UDP Protocol Comparison",
        content: `TCP: Connection-oriented (3-way handshake), reliable delivery with ACK/retransmission, flow control & congestion control. Ideal for Web (HTTP), Email, File Transfer.\nUDP: Connectionless, unreliable, low latency, no packet ordering guarantee. Ideal for Video Streaming, Gaming, DNS queries.`
      }
    ],
    mcqs: [
      {
        q: "Which OSI layer is responsible for routing packets across IP addresses?",
        options: ["Transport Layer", "Network Layer", "Data Link Layer", "Session Layer"],
        ans: 1,
        exp: "Layer 3 (Network Layer) handles routing and IP addressing."
      }
    ]
  },
  {
    id: 'oops',
    name: 'OOPs Concepts',
    icon: Layers,
    notes: [
      {
        title: "1. The 4 Fundamental Pillars of OOP",
        content: `Encapsulation: Restricting direct access to data by bundling methods with data (getters/setters).\nAbstraction: Hiding complex implementation and exposing clean APIs.\nInheritance: Reusing fields and methods from parent classes to child classes.\nPolymorphism: Static (Method Overloading) and Dynamic (Method Overriding).`
      },
      {
        title: "2. SOLID Principles of Object-Oriented Design",
        content: `Single Responsibility: A class should have only one reason to change.\nOpen/Closed: Open for extension, closed for modification.\nLiskov Substitution: Subclasses must be substitutable for base classes.\nInterface Segregation: Many client-specific interfaces are better than one general-purpose interface.\nDependency Inversion: Depend on abstractions, not on concretions.`
      }
    ],
    mcqs: [
      {
        q: "Method Overriding in Java is an example of:",
        options: ["Compile-time Polymorphism", "Runtime Polymorphism", "Encapsulation", "Abstraction"],
        ans: 1,
        exp: "Method overriding resolves dynamically at runtime based on the actual object type."
      }
    ]
  },
  {
    id: 'dsa',
    name: 'DSA Cheatsheet',
    icon: Code,
    notes: [
      {
        title: "1. Time & Space Complexity Master Sheet",
        content: `Array/Vector: Access O(1), Search O(n), Insert/Delete End O(1), Insert/Delete Middle O(n).\nLinked List: Access O(n), Search O(n), Insert/Delete Head O(1).\nHash Table: Average Search, Insert, Delete O(1); Worst Case O(n) under collisions.\nBinary Search Tree (Balanced): Search, Insert, Delete O(log n).\nQuick Sort: Avg O(n log n), Worst O(n^2). Merge Sort: O(n log n) stable.`
      }
    ],
    mcqs: [
      {
        q: "Which data structure is typically used for Breadth-First Search (BFS)?",
        options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
        ans: 1,
        exp: "BFS uses a FIFO Queue to visit neighbors level-by-level."
      }
    ]
  }
];

export default function TechnicalPrep() {
  const [selectedModule, setSelectedModule] = useState(TECH_MODULES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mcqAnswers, setMcqAnswers] = useState({});

  const handleSelectMCQ = (qIdx, optIdx) => {
    setMcqAnswers({ ...mcqAnswers, [qIdx]: optIdx });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpenCheck className="w-7 h-7 text-royal-600" />
          Technical CS Preparation & Cheatsheets
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Concise revision notes, architecture diagrams, and concept MCQs across DBMS, OS, Computer Networks, OOPs, DSA, Java & Python
        </p>
      </div>

      {/* Module Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {TECH_MODULES.map((mod) => {
          const Icon = mod.icon;
          const isSelected = selectedModule.id === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => { setSelectedModule(mod); setMcqAnswers({}); }}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                isSelected 
                  ? 'bg-royal-600 text-white border-royal-600 shadow-md shadow-royal-600/25 scale-[1.02]' 
                  : 'bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-bold">{mod.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Module Notes */}
      <div className="space-y-6">
        
        {/* Core Notes */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-purple-50 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-royal-600" />
              <span>{selectedModule.name} - Quick Revision Notes</span>
            </h3>
            <span className="text-xs text-royal-600 dark:text-royal-400 font-bold">
              {selectedModule.notes.length} Topics
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {selectedModule.notes.map((note, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700 text-xs space-y-2"
              >
                <h4 className="font-extrabold text-sm text-royal-700 dark:text-royal-300">
                  {note.title}
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Concept MCQs */}
        {selectedModule.mcqs && selectedModule.mcqs.length > 0 && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Quick Concept Self-Check MCQs</span>
            </h3>

            <div className="space-y-4 pt-1">
              {selectedModule.mcqs.map((mcq, mIdx) => {
                const selected = mcqAnswers[mIdx];
                const answered = selected !== undefined;
                return (
                  <div key={mIdx} className="p-4 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-3">
                    <p className="font-bold text-xs text-slate-900 dark:text-white">
                      {mIdx + 1}. {mcq.q}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {mcq.options.map((opt, oIdx) => {
                        let btnStyle = "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 text-slate-700 dark:text-slate-300";
                        if (answered) {
                          if (oIdx === mcq.ans) btnStyle = "border-emerald-500 bg-emerald-100 text-emerald-900 font-bold";
                          else if (oIdx === selected) btnStyle = "border-rose-500 bg-rose-100 text-rose-900 font-bold";
                        }
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectMCQ(mIdx, oIdx)}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between ${btnStyle}`}
                          >
                            <span>({String.fromCharCode(65 + oIdx)}) {opt}</span>
                            {answered && oIdx === mcq.ans && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-slate-800 text-[11px] text-royal-700 dark:text-royal-300">
                        <strong>Explanation:</strong> {mcq.exp}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
