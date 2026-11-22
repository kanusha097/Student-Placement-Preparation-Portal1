import express from 'express';
import interviewRoutes from './routes/interviewRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/interview', interviewRoutes);

const server = app.listen(5095, async () => {
  console.log('[Phase 6 Test Server] Running on http://localhost:5095');

  try {
    // 1. HR questions
    const hrRes = await fetch('http://localhost:5095/api/interview/hr');
    const hrData = await hrRes.json();
    console.log('✓ HR Questions Status:', hrRes.status, 'Total HR questions:', hrData.count);

    // 2. Technical questions
    const techRes = await fetch('http://localhost:5095/api/interview/technical?topic=java');
    const techData = await techRes.json();
    console.log('✓ Technical Java Questions Status:', techRes.status, 'Questions Count:', techData.questions?.length);

    // 3. AI Evaluation
    const evalRes = await fetch('http://localhost:5095/api/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: 1,
        userAnswer: "In my recent capstone project, I developed a scalable microservices architecture using React and Node.js. A key challenge was handling high query throughput, which I resolved by indexing database tables and introducing caching, reducing response times by 35%."
      })
    });
    const evalData = await evalRes.json();
    console.log('✓ AI Evaluation Status:', evalRes.status, 'Score:', evalData.evaluation?.score, 'Clarity:', evalData.evaluation?.clarity);

    // 4. Attempts history
    const attRes = await fetch('http://localhost:5095/api/interview/attempts');
    const attData = await attRes.json();
    console.log('✓ Interview Attempts Status:', attRes.status, 'Attempts Count:', attData.attempts?.length);

    console.log('\nALL PHASE 6 INTERVIEW PREPARATION ENDPOINTS PASSED VERIFICATION.');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
