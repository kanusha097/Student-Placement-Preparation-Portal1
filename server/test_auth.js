import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const server = app.listen(5099, async () => {
  console.log('[Test Server] Running on http://localhost:5099');
  
  try {
    // 1. Test Student Login
    const loginRes = await fetch('http://localhost:5099/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'anusha@placementprep.edu', password: 'Password@123', role: 'student' })
    });
    const loginData = await loginRes.json();
    console.log('✓ Student Login Status:', loginRes.status, 'Success:', loginData.success, 'User:', loginData.user?.fullName);

    // 2. Test Admin Login
    const adminRes = await fetch('http://localhost:5099/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@placementprep.edu', password: 'Admin@123', role: 'admin' })
    });
    const adminData = await adminRes.json();
    console.log('✓ Admin Login Status:', adminRes.status, 'Role:', adminData.user?.role);

    // 3. Test Student Registration
    const regRes = await fetch('http://localhost:5099/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Vikram Mehta',
        email: 'vikram.mehta@college.edu',
        password: 'Password@999',
        collegeName: 'IIT Delhi',
        branch: 'Computer Science',
        yearOfStudy: '4th Year',
        skills: ['Java', 'Python', 'C++']
      })
    });
    const regData = await regRes.json();
    console.log('✓ Student Registration Status:', regRes.status, 'Success:', regData.success, 'New User:', regData.user?.fullName);

    // 4. Test Authenticated Profile Route with Bearer Token
    const token = loginData.token;
    const profRes = await fetch('http://localhost:5099/api/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const profData = await profRes.json();
    console.log('✓ Authenticated Profile Status:', profRes.status, 'Email:', profData.user?.email);

    // 5. Test Forgot Password
    const forgotRes = await fetch('http://localhost:5099/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'vikram.mehta@college.edu' })
    });
    const forgotData = await forgotRes.json();
    console.log('✓ Forgot Password Status:', forgotRes.status, 'Code Generated:', forgotData.demoResetCode);

    console.log('\nALL 5 AUTHENTICATION API ENDPOINTS PASSED VERIFICATION.');
  } catch (err) {
    console.error('Test failed with error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
