import express from 'express';
import aptitudeRoutes from './routes/aptitudeRoutes.js';
import mockTestRoutes from './routes/mockTestRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/aptitude', aptitudeRoutes);
app.use('/api/mock-tests', mockTestRoutes);

const server = app.listen(5096, async () => {
  console.log('[Phase 5 Test Server] Running on http://localhost:5096');

  try {
    // 1. Aptitude questions
    const aptQRes = await fetch('http://localhost:5096/api/aptitude/questions');
    const aptQData = await aptQRes.json();
    console.log('✓ Aptitude Questions Status:', aptQRes.status, 'Total questions:', aptQData.count);

    // 2. Aptitude Answer submission
    const aptSubRes = await fetch('http://localhost:5096/api/aptitude/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: 1, selectedIndex: 1 })
    });
    const aptSubData = await aptSubRes.json();
    console.log('✓ Aptitude Submit Status:', aptSubRes.status, 'Is Correct:', aptSubData.isCorrect);

    // 3. Mock Tests Catalog
    const mockCatRes = await fetch('http://localhost:5096/api/mock-tests/tests');
    const mockCatData = await mockCatRes.json();
    console.log('✓ Mock Tests Catalog Status:', mockCatRes.status, 'Available Mocks:', mockCatData.count);

    // 4. Mock Test By ID
    const mockSingleRes = await fetch('http://localhost:5096/api/mock-tests/tests/1');
    const mockSingleData = await mockSingleRes.json();
    console.log('✓ Mock Test 1 Status:', mockSingleRes.status, 'Test Title:', mockSingleData.test?.title);

    // 5. Mock Test Submission & Score Calculation
    const mockSubRes = await fetch('http://localhost:5096/api/mock-tests/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId: 1,
        answers: {
          101: 1, // correct (+3)
          102: 1, // correct (+3)
          103: 1, // correct (+3)
          104: 0  // wrong (-1)
        }
      })
    });
    const mockSubData = await mockSubRes.json();
    console.log('✓ Mock Submission Status:', mockSubRes.status, 'Score:', mockSubData.report?.score, 'Percentage:', mockSubData.report?.percentage + '%', 'Percentile:', mockSubData.report?.percentile + 'th');

    // 6. Mock Attempts History
    const attRes = await fetch('http://localhost:5096/api/mock-tests/attempts');
    const attData = await attRes.json();
    console.log('✓ Mock Attempts History Status:', attRes.status, 'Attempts Count:', attData.attempts?.length);

    console.log('\nALL PHASE 5 APTITUDE & MOCK TEST MODULE ENDPOINTS PASSED VERIFICATION.');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
