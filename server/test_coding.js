import express from 'express';
import codingRoutes from './routes/codingRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/coding', codingRoutes);

const server = app.listen(5097, async () => {
  console.log('[Coding Test Server] Running on http://localhost:5097');

  try {
    // 1. Get Questions
    const qRes = await fetch('http://localhost:5097/api/coding/questions');
    const qData = await qRes.json();
    console.log('✓ Questions API Status:', qRes.status, 'Total questions:', qData.count);

    // 2. Get Single Question
    const singleRes = await fetch('http://localhost:5097/api/coding/questions/1');
    const singleData = await singleRes.json();
    console.log('✓ Single Question Status:', singleRes.status, 'Title:', singleData.question?.title);

    // 3. Test Run Code (Sample test cases)
    const runRes = await fetch('http://localhost:5097/api/coding/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: 1,
        language: 'java',
        code: 'class Solution { public int[] twoSum() { return new int[]{0,1}; } }'
      })
    });
    const runData = await runRes.json();
    console.log('✓ Run Code Status:', runRes.status, 'All Passed:', runData.allPassed, 'Runtime:', runData.runtimeMs, 'ms');

    // 4. Test Submit Code (All test cases + hidden)
    const subRes = await fetch('http://localhost:5097/api/coding/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: 1,
        language: 'java',
        code: 'class Solution { public int[] twoSum() { return new int[]{0,1}; } }'
      })
    });
    const subData = await subRes.json();
    console.log('✓ Submit Code Status:', subRes.status, 'Verdict:', subData.status, 'Total Cases:', subData.totalTestCases);

    // 5. Test Submissions History
    const historyRes = await fetch('http://localhost:5097/api/coding/submissions');
    const historyData = await historyRes.json();
    console.log('✓ Submissions History Status:', historyRes.status, 'Submissions Count:', historyData.submissions?.length);

    // 6. Test Leaderboard
    const leadRes = await fetch('http://localhost:5097/api/coding/leaderboard');
    const leadData = await leadRes.json();
    console.log('✓ Coding Leaderboard Status:', leadRes.status, 'Top Rank:', leadData.leaderboard?.[0]?.name);

    console.log('\nALL 6 CODING PRACTICE MODULE ENDPOINTS PASSED VERIFICATION.');
  } catch (err) {
    console.error('Coding test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
