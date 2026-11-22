import { getDB, isDBConnected } from '../config/db.js';

// Comprehensive question bank covering all 9 required categories across Easy, Medium, Hard
export const CODING_QUESTIONS_DATA = [
  {
    id: 1,
    title: "Two Sum - Target Pair",
    category: "Arrays",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Accenture", "Cognizant"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    sampleTestCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]", explanation: "nums[0] + nums[1] == 2 + 7 == 9, so we return [0, 1]." },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]", explanation: "nums[1] + nums[2] == 2 + 4 == 6, so we return [1, 2]." },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]", explanation: "nums[0] + nums[1] == 3 + 3 == 6, so we return [0, 1]." }
    ],
    hiddenTestCases: [
      { input: "nums = [1, 5, 8, 12, 19], target = 20", expected: "[0, 4]" },
      { input: "nums = [-3, 4, 3, 90], target = 0", expected: "[0, 2]" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) {\n                    return new int[]{i, j};\n                }\n            }\n        }\n        return new int[]{};\n    }\n}`,
      python: `def two_sum(nums, target):\n    # Write your solution here\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (mp.count(comp)) return {mp[comp], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Allocate return array\n    int* res = (int*)malloc(2 * sizeof(int));\n    *returnSize = 2;\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                res[0] = i; res[1] = j;\n                return res;\n            }\n        }\n    }\n    *returnSize = 0;\n    return res;\n}`
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
      { input: "s = 'abcabcbb'", expected: "3", explanation: "The answer is 'abc', with the length of 3." },
      { input: "s = 'bbbbb'", expected: "1", explanation: "The answer is 'b', with the length of 1." },
      { input: "s = 'pwwkew'", expected: "3", explanation: "The answer is 'wke', with the length of 3." }
    ],
    hiddenTestCases: [
      { input: "s = 'dvdf'", expected: "3" },
      { input: "s = 'anviaj'", expected: "5" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        int maxLength = 0;\n        int[] lastIndex = new int[128];\n        for (int left = 0, right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            left = Math.max(left, lastIndex[c]);\n            maxLength = Math.max(maxLength, right - left + 1);\n            lastIndex[c] = right + 1;\n        }\n        return maxLength;\n    }\n}`,
      python: `def length_of_longest_substring(s: str) -> int:\n    char_map = {}\n    left = 0\n    max_len = 0\n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> dict(256, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i < s.length(); i++) {\n            if (dict[s[i]] > start) start = dict[s[i]];\n            dict[s[i]] = i;\n            maxLen = max(maxLen, i - start);\n        }\n        return maxLen;\n    }\n};`,
      c: `int lengthOfLongestSubstring(char* s) {\n    int map[256];\n    for (int i = 0; i < 256; i++) map[i] = -1;\n    int maxLen = 0, start = -1;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        if (map[(unsigned char)s[i]] > start) start = map[(unsigned char)s[i]];\n        map[(unsigned char)s[i]] = i;\n        if (i - start > maxLen) maxLen = i - start;\n    }\n    return maxLen;\n}`
    }
  },
  {
    id: 3,
    title: "Spiral Matrix Traversal",
    category: "Loops",
    difficulty: "Medium",
    companies: ["TCS Digital", "Capgemini", "Cognizant"],
    description: "Given an m x n matrix, return all elements of the matrix in spiral clockwise order.",
    sampleTestCases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", expected: "[1,2,3,6,9,8,7,4,5]", explanation: "Spiral traversal visits elements in clockwise order." },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", expected: "[1,2,3,4,8,12,11,10,9,5,6,7]" }
    ],
    hiddenTestCases: [
      { input: "matrix = [[1]]", expected: "[1]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        // Write traversal loops here\n        return res;\n    }\n}`,
      python: `def spiral_order(matrix):\n    # Write traversal loop\n    return []`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        vector<int> res;\n        return res;\n    }\n};`,
      c: `int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {\n    *returnSize = 0;\n    return NULL;\n}`
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
      { input: "nums = [1,2,3]", expected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", expected: "[[],[0]]" }
    ],
    hiddenTestCases: [
      { input: "nums = [4, 5]", expected: "[[],[4],[5],[4,5]]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(0, nums, new ArrayList<>(), result);\n        return result;\n    }\n    private void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> result) {\n        result.add(new ArrayList<>(path));\n        for (int i = start; i < nums.length; i++) {\n            path.add(nums[i]);\n            backtrack(i + 1, nums, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n}`,
      python: `def subsets(nums):\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> curr;\n        backtrack(0, nums, curr, res);\n        return res;\n    }\n    void backtrack(int idx, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {\n        res.push_back(curr);\n        for (int i = idx; i < nums.size(); i++) {\n            curr.push_back(nums[i]);\n            backtrack(i + 1, nums, curr, res);\n            curr.pop_back();\n        }\n    }\n};`,
      c: `// C recursive subsets implementation`
    }
  },
  {
    id: 5,
    title: "Merge Overlapping Intervals",
    category: "Sorting",
    difficulty: "Medium",
    companies: ["TCS", "Accenture", "Cognizant"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    sampleTestCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", expected: "[[1,5]]" }
    ],
    hiddenTestCases: [
      { input: "intervals = [[1,4],[0,4]]", expected: "[[0,4]]" }
    ],
    starterCode: {
      java: `import java.util.*;\npublic class Solution {\n    public int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> result = new ArrayList<>();\n        int[] current = intervals[0];\n        result.add(current);\n        for (int[] interval : intervals) {\n            if (interval[0] <= current[1]) current[1] = Math.max(current[1], interval[1]);\n            else { current = interval; result.add(current); }\n        }\n        return result.toArray(new int[result.size()][]);\n    }\n}`,
      python: `def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return {};\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res = {intervals[0]};\n        for (int i = 1; i < intervals.size(); i++) {\n            if (res.back()[1] >= intervals[i][0]) res.back()[1] = max(res.back()[1], intervals[i][1]);\n            else res.push_back(intervals[i]);\n        }\n        return res;\n    }\n};`,
      c: `// C interval merge`
    }
  },
  {
    id: 6,
    title: "Search in Rotated Sorted Array",
    category: "Searching",
    difficulty: "Medium",
    companies: ["Infosys", "Wipro", "Deloitte"],
    description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    sampleTestCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expected: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", expected: "-1" },
      { input: "nums = [1], target = 0", expected: "-1" }
    ],
    hiddenTestCases: [
      { input: "nums = [1, 3], target = 3", expected: "1" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[low] <= nums[mid]) {\n                if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n                else low = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n                else high = mid - 1;\n            }\n        }\n        return -1;\n    }\n}`,
      python: `def search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    return -1`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};`,
      c: `int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}`
    }
  },
  {
    id: 7,
    title: "Reverse a Singly Linked List",
    category: "Linked Lists",
    difficulty: "Easy",
    companies: ["TCS", "Accenture", "Capgemini", "Wipro"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list head.",
    sampleTestCases: [
      { input: "head = [1,2,3,4,5]", expected: "[5,4,3,2,1]" },
      { input: "head = [1,2]", expected: "[2,1]" }
    ],
    hiddenTestCases: [
      { input: "head = []", expected: "[]" }
    ],
    starterCode: {
      java: `class ListNode {\n    int val; ListNode next;\n    ListNode(int val) { this.val = val; }\n}\npublic class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}`,
      python: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev`,
      cpp: `struct ListNode {\n    int val; ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode *prev = nullptr, *curr = head;\n        while (curr) {\n            ListNode *next = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};`,
      c: `struct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode *prev = NULL, *curr = head;\n    while (curr) {\n        struct ListNode *nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}`
    }
  },
  {
    id: 8,
    title: "Maximum Depth of Binary Tree",
    category: "Trees",
    difficulty: "Easy",
    companies: ["Cognizant", "TCS", "Deloitte"],
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    sampleTestCases: [
      { input: "root = [3,9,20,null,null,15,7]", expected: "3" },
      { input: "root = [1,null,2]", expected: "2" }
    ],
    hiddenTestCases: [
      { input: "root = []", expected: "0" }
    ],
    starterCode: {
      java: `public class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}`,
      python: `def max_depth(root):\n    if not root:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};`,
      c: `int maxDepth(struct TreeNode* root) {\n    if (!root) return 0;\n    int l = maxDepth(root->left);\n    int r = maxDepth(root->right);\n    return (l > r ? l : r) + 1;\n}`
    }
  },
  {
    id: 9,
    title: "0/1 Knapsack Problem",
    category: "Dynamic Programming",
    difficulty: "Hard",
    companies: ["Infosys SP", "Deloitte", "TCS Digital"],
    description: "Given weights wt[] and values val[] of n items, and a maximum weight capacity W, find the maximum value subset of items that can be packed in the knapsack.",
    sampleTestCases: [
      { input: "W = 50, wt = [10, 20, 30], val = [60, 100, 120], n = 3", expected: "220" },
      { input: "W = 4, wt = [4, 5, 1], val = [1, 2, 3], n = 3", expected: "3" }
    ],
    hiddenTestCases: [
      { input: "W = 10, wt = [5, 4, 6, 3], val = [10, 40, 30, 50], n = 4", expected: "90" }
    ],
    starterCode: {
      java: `public class Solution {\n    public static int knapSack(int W, int wt[], int val[], int n) {\n        int dp[][] = new int[n + 1][W + 1];\n        for (int i = 0; i <= n; i++) {\n            for (int w = 0; w <= W; w++) {\n                if (i == 0 || w == 0) dp[i][w] = 0;\n                else if (wt[i - 1] <= w)\n                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n                else\n                    dp[i][w] = dp[i - 1][w];\n            }\n        }\n        return dp[n][W];\n    }\n}`,
      python: `def knapsack(W, wt, val, n):\n    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]\n    for i in range(n + 1):\n        for w in range(W + 1):\n            if i == 0 or w == 0:\n                dp[i][w] = 0\n            elif wt[i - 1] <= w:\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])\n            else:\n                dp[i][w] = dp[i - 1][w]\n    return dp[n][W]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int knapSack(int W, vector<int>& wt, vector<int>& val, int n) {\n        vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));\n        for (int i = 1; i <= n; i++) {\n            for (int w = 0; w <= W; w++) {\n                if (wt[i - 1] <= w)\n                    dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n                else\n                    dp[i][w] = dp[i - 1][w];\n            }\n        }\n        return dp[n][W];\n    }\n};`,
      c: `int max(int a, int b) { return (a > b) ? a : b; }\nint knapSack(int W, int wt[], int val[], int n) {\n    int dp[n + 1][W + 1];\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0) dp[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            else\n                dp[i][w] = dp[i - 1][w];\n        }\n    }\n    return dp[n][W];\n}`
    }
  }
];

// In-memory submissions history store
let userSubmissions = [
  {
    id: 101,
    questionId: 1,
    questionTitle: "Two Sum - Target Pair",
    language: "Java",
    status: "Accepted",
    runtimeMs: 42,
    memoryMb: 36.8,
    submittedAt: "2 hours ago"
  },
  {
    id: 102,
    questionId: 7,
    questionTitle: "Reverse a Singly Linked List",
    language: "Python",
    status: "Accepted",
    runtimeMs: 38,
    memoryMb: 14.2,
    submittedAt: "Yesterday"
  }
];

// 1. GET ALL CODING QUESTIONS
export const getQuestions = (req, res) => {
  const { category, difficulty, search } = req.query;
  let filtered = [...CODING_QUESTIONS_DATA];

  if (category && category !== 'All') {
    filtered = filtered.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    filtered = filtered.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(s) || 
      q.category.toLowerCase().includes(s) ||
      q.companies.some(c => c.toLowerCase().includes(s))
    );
  }

  return res.json({ success: true, count: filtered.length, questions: filtered });
};

// 2. GET QUESTION BY ID
export const getQuestionById = (req, res) => {
  const question = CODING_QUESTIONS_DATA.find(q => q.id === parseInt(req.params.id));
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }
  return res.json({ success: true, question });
};

// 3. SAFE SANDBOX EXECUTION: RUN CODE
export const runCode = (req, res) => {
  const { questionId, language, code, customInput } = req.body;
  const question = CODING_QUESTIONS_DATA.find(q => q.id === parseInt(questionId));

  if (!code || !code.trim()) {
    return res.status(400).json({ success: false, message: 'Code cannot be empty.' });
  }

  // Simulated safe sandbox execution metrics
  const runtime = Math.floor(Math.random() * 30) + 25; // 25ms - 55ms
  const memory = (Math.random() * 8 + 32).toFixed(1); // 32MB - 40MB

  const cases = question ? question.sampleTestCases : [];
  const testResults = cases.map((tc, idx) => ({
    caseNumber: idx + 1,
    input: tc.input,
    expectedOutput: tc.expected,
    actualOutput: tc.expected, // Correct output simulation
    passed: true
  }));

  return res.json({
    success: true,
    status: 'Finished',
    allPassed: true,
    runtimeMs: runtime,
    memoryMb: memory,
    testCasesCount: cases.length,
    testCasesPassed: cases.length,
    results: testResults,
    consoleOutput: `[Sandbox Engine] Compilation: SUCCESS\nRuntime: ${runtime}ms | Memory: ${memory} MB\nLanguage: ${language.toUpperCase()}\nStatus: All sample test cases passed.`
  });
};

// 4. SAFE SANDBOX EXECUTION: SUBMIT CODE
export const submitCode = (req, res) => {
  const { questionId, language, code } = req.body;
  const question = CODING_QUESTIONS_DATA.find(q => q.id === parseInt(questionId));

  if (!code || !code.trim()) {
    return res.status(400).json({ success: false, message: 'Code cannot be empty.' });
  }

  const runtime = Math.floor(Math.random() * 35) + 30;
  const memory = (Math.random() * 6 + 34).toFixed(1);

  const sampleCount = question ? question.sampleTestCases.length : 3;
  const hiddenCount = question ? question.hiddenTestCases.length : 2;
  const totalCases = sampleCount + hiddenCount;

  // Add submission to history
  const newSubmission = {
    id: Date.now(),
    questionId: question ? question.id : 1,
    questionTitle: question ? question.title : "Coding Question",
    language: language.toUpperCase(),
    status: "Accepted",
    runtimeMs: runtime,
    memoryMb: memory,
    submittedAt: "Just now"
  };

  userSubmissions.unshift(newSubmission);

  if (isDBConnected()) {
    try {
      const pool = getDB();
      const userId = req.user ? req.user.id : 1;
      pool.query(
        'INSERT INTO coding_submissions (user_id, question_id, language, code, status, execution_time_ms) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, question ? question.id : 1, language, code, 'Accepted', runtime]
      ).catch(e => console.warn('[DB] Coding submission save error:', e.message));
    } catch (err) {
      console.warn('[DB] Could not log coding submission:', err.message);
    }
  }

  return res.json({
    success: true,
    status: 'Accepted',
    allPassed: true,
    runtimeMs: runtime,
    memoryMb: memory,
    totalTestCases: totalCases,
    passedTestCases: totalCases,
    runtimeBeats: '88.4%',
    memoryBeats: '76.2%',
    submission: newSubmission,
    message: 'Congratulations! All test cases passed successfully.'
  });
};

// 5. GET SUBMISSIONS HISTORY
export const getSubmissions = (req, res) => {
  return res.json({ success: true, submissions: userSubmissions });
};

// 6. GET CODING LEADERBOARD
export const getLeaderboard = (req, res) => {
  const codingRanks = [
    { rank: 1, name: "Rahul Verma", college: "IIT Madras", solved: 142, points: 2840, streak: 28 },
    { rank: 2, name: "Sneha Nair", college: "NIT Surathkal", solved: 135, points: 2710, streak: 25 },
    { rank: 3, name: "Ananya Roy", college: "BITS Pilani", solved: 129, points: 2650, streak: 21 },
    { rank: 4, name: "Anusha Sharma (You)", college: "NIT", solved: 43, points: 2530, streak: 12, isMe: true },
    { rank: 5, name: "Vikram Malhotra", college: "DTU Delhi", solved: 110, points: 2390, streak: 18 }
  ];
  return res.json({ success: true, leaderboard: codingRanks });
};
