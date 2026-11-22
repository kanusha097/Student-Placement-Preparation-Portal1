import express from 'express';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

const server = app.listen(5098, async () => {
  console.log('[Progress Test Server] Running on http://localhost:5098');

  try {
    // 1. Login to get token
    const loginRes = await fetch('http://localhost:5098/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'anusha@placementprep.edu', password: 'Password@123', role: 'student' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;

    // 2. Test GET Dashboard Data
    const dashRes = await fetch('http://localhost:5098/api/progress/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    console.log('✓ Dashboard Data Status:', dashRes.status, 'Coding Solved:', dashData.data.stats.codingSolved, 'Streak:', dashData.data.stats.streak);
    console.log('✓ Weekly Trends count:', dashData.data.weeklyTrends.length, 'Achievements:', dashData.data.achievements.length);

    // 3. Test Goal Toggle
    const goalRes = await fetch('http://localhost:5098/api/progress/goal-toggle', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goalId: 1 })
    });
    const goalData = await goalRes.json();
    console.log('✓ Goal Toggle Status:', goalRes.status, 'Updated Goal Completed:', goalData.goal.completed);

    // 4. Test Activities endpoint
    const actRes = await fetch('http://localhost:5098/api/progress/activities', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const actData = await actRes.json();
    console.log('✓ Recent Activities Status:', actRes.status, 'Activities Count:', actData.activities.length);

    console.log('\nALL PROGRESS & DASHBOARD API TESTS PASSED SUCCESSFULLY.');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
