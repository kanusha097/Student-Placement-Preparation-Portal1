import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Terminal, 
  Award, 
  Sparkles, 
  Filter, 
  Search, 
  History, 
  Trophy, 
  RotateCcw, 
  Copy, 
  Check, 
  Send,
  SlidersHorizontal,
  Flame,
  Layers,
  Clock,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { codingAPI } from '../services/api';

const TOPIC_CATEGORIES = [
  'All', 
  'Arrays', 
  'Strings', 
  'Loops', 
  'Recursion', 
  'Sorting', 
  'Searching', 
  'Linked Lists', 
  'Trees', 
  'Dynamic Programming'
];

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: "Two Sum - Target Pair",
    category: "Arrays",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Accenture", "Cognizant"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    sampleTestCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]", explanation: "nums[0] + nums[1] == 2 + 7 == 9, return [0, 1]." },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]", explanation: "nums[1] + nums[2] == 2 + 4 == 6, return [1, 2]." },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]", explanation: "nums[0] + nums[1] == 3 + 3 == 6, return [0, 1]." }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your O(n) or O(n^2) algorithm here\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) {\n                    return new int[]{i, j};\n                }\n            }\n        }\n        return new int[]{};\n    }\n}`,
      python: `def two_sum(nums, target):\n    # Hash map one-pass algorithm\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (mp.count(comp)) return {mp[comp], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    int* res = (int*)malloc(2 * sizeof(int));\n    *returnSize = 2;\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j;\n                return res;\n            }\n        }\n    }\n    *returnSize = 0;\n    return res;\n}`
    }
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    category: "Strings",
    difficulty: "Medium",
    companies: ["Infosys", "Wipro", "Deloitte"],
    description: "Given a string s, find the length of the longest substring without duplicate characters.",
    sampleTestCases: [
      { input: "s = 'abcabcbb'", expected: "3", explanation: "'abc' has length 3." },
      { input: "s = 'bbbbb'", expected: "1", explanation: "'b' has length 1." },
      { input: "s = 'pwwkew'", expected: "3", explanation: "'wke' has length 3." }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        int maxLen = 0;\n        int[] last = new int[128];\n        for (int l = 0, r = 0; r < s.length(); r++) {\n            l = Math.max(l, last[s.charAt(r)]);\n            maxLen = Math.max(maxLen, r - l + 1);\n            last[s.charAt(r)] = r + 1;\n        }\n        return maxLen;\n    }\n}`,
      python: `def length_of_longest_substring(s: str) -> int:\n    char_map = {}\n    left = max_len = 0\n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> dict(256, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i < s.length(); i++) {\n            if (dict[s[i]] > start) start = dict[s[i]];\n            dict[s[i]] = i;\n            maxLen = max(maxLen, i - start);\n        }\n        return maxLen;\n    }\n};`,
      c: `int lengthOfLongestSubstring(char* s) {\n    int map[256];\n    for (int i = 0; i < 256; i++) map[i] = -1;\n    int maxLen = 0, start = -1;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        if (map[(unsigned char)s[i]] > start) start = map[(unsigned char)s[i]];\n        map[(unsigned char)s[i]] = i;\n        if (i - start > maxLen) maxLen = i - start;\n    }\n    return maxLen;\n}`
    }
  },
  {
    id: 3,
    title: "Spiral Matrix Traversal",
    category: "Loops",
    difficulty: "Medium",
    companies: ["TCS Digital", "Capgemini"],
    description: "Given an m x n matrix, return all elements of the matrix in clockwise spiral order.",
    sampleTestCases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", expected: "[1,2,3,6,9,8,7,4,5]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        // Write clockwise matrix traversal\n        return res;\n    }\n}`,
      python: `def spiral_order(matrix):\n    # Write clockwise matrix traversal\n    return []`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        return {};\n    }\n};`,
      c: `int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) { *returnSize = 0; return NULL; }`
    }
  },
  {
    id: 4,
    title: "Subsets Generation (Power Set)",
    category: "Recursion",
    difficulty: "Medium",
    companies: ["Infosys", "Deloitte"],
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set) using recursion and backtracking.",
    sampleTestCases: [
      { input: "nums = [1,2,3]", expected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(0, nums, new ArrayList<>(), result);\n        return result;\n    }\n    private void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> result) {\n        result.add(new ArrayList<>(path));\n        for (int i = start; i < nums.length; i++) {\n            path.add(nums[i]);\n            backtrack(i + 1, nums, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n}`,
      python: `def subsets(nums):\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) { return {}; }\n};`,
      c: `// C subsets`
    }
  },
  {
    id: 5,
    title: "Merge Overlapping Intervals",
    category: "Sorting",
    difficulty: "Medium",
    companies: ["TCS", "Accenture"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    sampleTestCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        int[] curr = intervals[0];\n        res.add(curr);\n        for (int[] inv : intervals) {\n            if (inv[0] <= curr[1]) curr[1] = Math.max(curr[1], inv[1]);\n            else { curr = inv; res.add(curr); }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}`,
      python: `def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for inv in intervals:\n        if not merged or merged[-1][1] < inv[0]:\n            merged.append(inv)\n        else:\n            merged[-1][1] = max(merged[-1][1], inv[1])\n    return merged`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) { return {}; }\n};`,
      c: `// C merge`
    }
  },
  {
    id: 6,
    title: "Search in Rotated Sorted Array",
    category: "Searching",
    difficulty: "Medium",
    companies: ["Infosys", "Wipro"],
    description: "Given the array nums after unknown rotation and a target, return its index in O(log n) time.",
    sampleTestCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expected: "4" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}`,
      python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1`,
      cpp: `// C++ binary search`,
      c: `// C search`
    }
  },
  {
    id: 7,
    title: "Reverse a Singly Linked List",
    category: "Linked Lists",
    difficulty: "Easy",
    companies: ["TCS", "Accenture", "Capgemini"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list head.",
    sampleTestCases: [
      { input: "head = [1,2,3,4,5]", expected: "[5,4,3,2,1]" }
    ],
    starterCode: {
      java: `public class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}`,
      python: `def reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`,
      cpp: `// C++ reverse`,
      c: `// C reverse`
    }
  },
  {
    id: 8,
    title: "Maximum Depth of Binary Tree",
    category: "Trees",
    difficulty: "Easy",
    companies: ["Cognizant", "TCS", "Deloitte"],
    description: "Given the root of a binary tree, return its maximum depth.",
    sampleTestCases: [
      { input: "root = [3,9,20,null,null,15,7]", expected: "3" }
    ],
    starterCode: {
      java: `public class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}`,
      python: `def max_depth(root):\n    if not root: return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      cpp: `// C++ tree depth`,
      c: `// C tree depth`
    }
  },
  {
    id: 9,
    title: "0/1 Knapsack Problem",
    category: "Dynamic Programming",
    difficulty: "Hard",
    companies: ["Infosys SP", "Deloitte", "TCS Digital"],
    description: "Find the maximum total value subset of n items that can be packed in a knapsack of capacity W.",
    sampleTestCases: [
      { input: "W = 50, wt = [10, 20, 30], val = [60, 100, 120], n = 3", expected: "220" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int knapSack(int W, int wt[], int val[], int n) {\n        int dp[][] = new int[n + 1][W + 1];\n        for (int i = 0; i <= n; i++) {\n            for (int w = 0; w <= W; w++) {\n                if (i == 0 || w == 0) dp[i][w] = 0;\n                else if (wt[i - 1] <= w)\n                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n                else\n                    dp[i][w] = dp[i - 1][w];\n            }\n        }\n        return dp[n][W];\n    }\n}`,
      python: `def knapsack(W, wt, val, n):\n    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(W + 1):\n            if wt[i - 1] <= w:\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])\n            else:\n                dp[i][w] = dp[i - 1][w]\n    return dp[n][W]`,
      cpp: `// C++ knapsack`,
      c: `// C knapsack`
    }
  }
];

export default function CodingPractice() {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState(DEFAULT_QUESTIONS[0]);
  const [language, setLanguage] = useState('java'); // java, python, cpp, c
  const [code, setCode] = useState(DEFAULT_QUESTIONS[0].starterCode.java);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Navigation tabs: 'workspace' | 'submissions' | 'leaderboard'
  const [activeMainTab, setActiveMainTab] = useState('workspace');
  
  // Execution state
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [outputTab, setOutputTab] = useState('results'); // 'results' | 'console'
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  
  // Data for Submissions and Leaderboard
  const [submissionsList, setSubmissionsList] = useState([]);
  const [leaderboardList, setLeaderboardList] = useState([]);

  // Load from API if online
  useEffect(() => {
    async function initData() {
      const qList = await codingAPI.getQuestions();
      if (qList && qList.length > 0) {
        setQuestions(qList);
        setSelectedQuestion(qList[0]);
        setCode(qList[0].starterCode[language] || qList[0].starterCode.java);
      }
      const subRes = await codingAPI.getSubmissions();
      if (subRes && subRes.submissions) {
        setSubmissionsList(subRes.submissions);
      }
      const leadRes = await codingAPI.getLeaderboard();
      if (leadRes && leadRes.leaderboard) {
        setLeaderboardList(leadRes.leaderboard);
      }
    }
    initData();
  }, []);

  const handleSelectQuestion = (q) => {
    setSelectedQuestion(q);
    setCode(q.starterCode[language] || q.starterCode.java || '');
    setExecutionResult(null);
    setActiveTestCaseTab(0);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(selectedQuestion.starterCode[newLang] || selectedQuestion.starterCode.java || '');
  };

  const handleResetCode = () => {
    setCode(selectedQuestion.starterCode[language] || '');
  };

  // Run Code (Sample Test Cases)
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutputTab('results');
    try {
      const res = await codingAPI.runCode({
        questionId: selectedQuestion.id,
        language,
        code,
        customInput
      });
      setExecutionResult(res);
    } catch (err) {
      setExecutionResult({
        success: false,
        status: 'Error',
        consoleOutput: `Runtime Error: ${err.message}`
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code (All & Hidden Test Cases)
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setOutputTab('results');
    try {
      const res = await codingAPI.submitCode({
        questionId: selectedQuestion.id,
        language,
        code
      });
      setExecutionResult(res);

      if (res.status === 'Accepted') {
        // Trigger celebration confetti!
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Update local submissions list
        if (res.submission) {
          setSubmissionsList([res.submission, ...submissionsList]);
        }
      }
    } catch (err) {
      setExecutionResult({
        success: false,
        status: 'Runtime Error',
        consoleOutput: `Submission Error: ${err.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered Question List
  const filteredQuestions = questions.filter(q => {
    const matchCat = selectedCategory === 'All' || q.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchDiff = selectedDifficulty === 'All' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        q.companies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchDiff && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-7 h-7 text-royal-600" />
            Interactive Coding Practice Arena
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Solve campus recruitment questions with real-time evaluation across Java, Python, C++, and C
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex p-1 rounded-2xl bg-purple-50 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveMainTab('workspace')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMainTab === 'workspace' 
                ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' 
                : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Workspace</span>
          </button>
          <button
            onClick={() => setActiveMainTab('submissions')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMainTab === 'submissions' 
                ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' 
                : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
            }`}
          >
            <History className="w-4 h-4" />
            <span>My Submissions ({submissionsList.length})</span>
          </button>
          <button
            onClick={() => setActiveMainTab('leaderboard')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMainTab === 'leaderboard' 
                ? 'bg-royal-600 text-white shadow-md shadow-royal-600/20' 
                : 'text-slate-600 dark:text-slate-300 hover:text-royal-600'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Coding Leaderboard</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CODING WORKSPACE */}
      {activeMainTab === 'workspace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Problem Bank & Active Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search problem, topic or company (e.g. TCS)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              {/* Topic Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {TOPIC_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-royal-600 text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 bg-purple-50 dark:bg-slate-800 hover:bg-purple-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Difficulty selector */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-semibold text-[11px]">Difficulty:</span>
                <div className="flex items-center gap-1 text-[11px]">
                  {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        selectedDifficulty === d ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions scroll area */}
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {filteredQuestions.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-purple-100 dark:border-slate-800">
                  No coding challenges matched your filters.
                </div>
              ) : (
                filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedQuestion.id === q.id 
                        ? 'bg-purple-50 dark:bg-royal-950/40 border-royal-500 shadow-sm' 
                        : 'bg-white dark:bg-slate-900 border-purple-100 dark:border-slate-800 hover:border-purple-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{q.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className={`font-bold ${
                          q.difficulty === 'Easy' ? 'text-emerald-600' : q.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span>•</span>
                        <span>{q.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {q.companies.slice(0, 2).map(c => (
                        <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected Question Details */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedQuestion.title}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  selectedQuestion.difficulty === 'Easy' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : selectedQuestion.difficulty === 'Medium' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {selectedQuestion.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-royal-100 text-royal-700">Topic: {selectedQuestion.category}</span>
                {selectedQuestion.companies.map(c => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">
                    {c}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedQuestion.description}
              </p>

              {/* Sample Test Case Previews */}
              <div className="space-y-2 pt-2 border-t border-purple-50 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Examples & Expected Output:</h4>
                {selectedQuestion.sampleTestCases.map((tc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs space-y-1">
                    <p><span className="text-slate-400">Input:</span> {tc.input}</p>
                    <p><span className="text-slate-400">Output:</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">{tc.expected}</span></p>
                    {tc.explanation && (
                      <p className="font-sans text-[11px] text-slate-500 pt-0.5">{tc.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Code Editor & Execution Console (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Editor Container */}
            <div className="rounded-2xl bg-slate-950 text-white border border-slate-800 overflow-hidden shadow-xl">
              
              {/* Editor Header Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    Solution.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : 'java'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none font-semibold cursor-pointer"
                  >
                    <option value="java">Java 17 (OpenJDK)</option>
                    <option value="python">Python 3.10</option>
                    <option value="cpp">C++ 20 (GCC)</option>
                    <option value="c">C (GCC 11)</option>
                  </select>

                  {/* Reset Code */}
                  <button
                    onClick={handleResetCode}
                    title="Reset to starter template"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Run Code */}
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning || isSubmitting}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>

                  {/* Submit Code */}
                  <button
                    onClick={handleSubmitCode}
                    disabled={isRunning || isSubmitting}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Evaluating...' : 'Submit Code'}</span>
                  </button>
                </div>
              </div>

              {/* Code TextArea / Monaco Style Area */}
              <div className="relative flex">
                {/* Line number gutter */}
                <div className="w-10 bg-slate-950 text-slate-600 font-mono text-xs text-right pr-2 select-none py-3 hidden sm:block border-r border-slate-900">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={15}
                  className="flex-1 p-3 bg-slate-950 text-emerald-300 font-mono text-xs leading-6 focus:outline-none resize-none selection:bg-purple-900"
                  spellCheck="false"
                />
              </div>

            </div>

            {/* Test Case Inputs & Execution Results Console */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm overflow-hidden">
              
              {/* Console Tabs */}
              <div className="px-4 py-2.5 bg-purple-50/50 dark:bg-slate-950 border-b border-purple-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOutputTab('results')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      outputTab === 'results' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Test Cases & Output
                  </button>
                  <button
                    onClick={() => setOutputTab('console')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      outputTab === 'console' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Console Trace
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  Engine: Safe Sandbox Execution
                </span>
              </div>

              {/* Console Body */}
              <div className="p-4 space-y-3">
                
                {outputTab === 'results' && (
                  <>
                    {/* Execution status banner if result exists */}
                    {executionResult && (
                      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                        executionResult.status === 'Accepted' || executionResult.allPassed
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-300'
                      }`}>
                        <div className="flex items-center gap-2">
                          {executionResult.status === 'Accepted' || executionResult.allPassed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                          <span>Status: {executionResult.status || 'Accepted'}</span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span>Runtime: {executionResult.runtimeMs}ms</span>
                          <span>Memory: {executionResult.memoryMb} MB</span>
                        </div>
                      </div>
                    )}

                    {/* Test Case Tab Selector */}
                    <div className="flex items-center gap-2 border-b border-purple-50 dark:border-slate-800 pb-2">
                      {selectedQuestion.sampleTestCases.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTestCaseTab(i)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                            activeTestCaseTab === i 
                              ? 'bg-purple-100 dark:bg-slate-700 text-royal-700 dark:text-royal-300' 
                              : 'text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Case {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setActiveTestCaseTab(99)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          activeTestCaseTab === 99 
                            ? 'bg-purple-100 dark:bg-slate-700 text-royal-700 dark:text-royal-300' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        Custom Input
                      </button>
                    </div>

                    {/* Active Test Case Content */}
                    {activeTestCaseTab !== 99 ? (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 font-mono text-xs space-y-1.5">
                        <p><span className="text-slate-400">Input:</span> {selectedQuestion.sampleTestCases[activeTestCaseTab]?.input}</p>
                        <p><span className="text-slate-400">Expected:</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedQuestion.sampleTestCases[activeTestCaseTab]?.expected}</span></p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500">Custom Input Stream:</label>
                        <textarea
                          rows={2}
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          placeholder="e.g. nums = [1, 2, 3], target = 5"
                          className="w-full p-2.5 rounded-xl border border-purple-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono focus:outline-none"
                        />
                      </div>
                    )}
                  </>
                )}

                {outputTab === 'console' && (
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs min-h-[90px] whitespace-pre-wrap">
                    {executionResult?.consoleOutput || "[Ready] Click 'Run Code' or 'Submit Code' to compile and execute."}
                  </pre>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: SUBMISSIONS HISTORY */}
      {activeMainTab === 'submissions' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-royal-600" />
              <span>Past Submissions & Evaluation Log</span>
            </h3>
            <span className="text-xs text-slate-500">{submissionsList.length} submissions recorded</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-50 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3 px-3">Problem Title</th>
                <th className="pb-3 px-3">Language</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Runtime</th>
                <th className="pb-3 px-3">Memory</th>
                <th className="pb-3 px-3 text-right">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 dark:divide-slate-800">
              {submissionsList.map((sub) => (
                <tr key={sub.id} className="hover:bg-purple-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-slate-800 dark:text-white">{sub.questionTitle}</td>
                  <td className="py-3 px-3 font-mono text-purple-700 dark:text-purple-300 font-semibold">{sub.language}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">{sub.runtimeMs} ms</td>
                  <td className="py-3 px-3 font-mono">{sub.memoryMb} MB</td>
                  <td className="py-3 px-3 text-right text-slate-400">{sub.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: CODING LEADERBOARD */}
      {activeMainTab === 'leaderboard' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Campus Coding Leaderboard</span>
            </h3>
            <span className="text-xs text-slate-500">Live rankings based on problems solved & points</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-50 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3 px-3">Rank</th>
                <th className="pb-3 px-3">Student Name</th>
                <th className="pb-3 px-3">College</th>
                <th className="pb-3 px-3">Problems Solved</th>
                <th className="pb-3 px-3">Daily Streak</th>
                <th className="pb-3 px-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 dark:divide-slate-800">
              {leaderboardList.map((entry) => (
                <tr key={entry.rank} className={`hover:bg-purple-50/50 dark:hover:bg-slate-800/40 ${entry.isMe ? 'bg-purple-50 dark:bg-royal-950/40 font-bold' : ''}`}>
                  <td className="py-3 px-3 font-extrabold text-sm">
                    {entry.rank === 1 && "🥇 1"}
                    {entry.rank === 2 && "🥈 2"}
                    {entry.rank === 3 && "🥉 3"}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </td>
                  <td className="py-3 px-3">{entry.name}</td>
                  <td className="py-3 px-3 text-slate-500">{entry.college}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-600">{entry.solved} Solved</td>
                  <td className="py-3 px-3 text-orange-500 font-semibold">{entry.streak} days 🔥</td>
                  <td className="py-3 px-3 text-right font-black text-royal-600">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
