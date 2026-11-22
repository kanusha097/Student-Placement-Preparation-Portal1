import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB, isDBConnected } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import aptitudeRoutes from './routes/aptitudeRoutes.js';
import mockTestRoutes from './routes/mockTestRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import dbRoutes from './routes/dbRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/aptitude', aptitudeRoutes);
app.use('/api/mock-tests', mockTestRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Student Placement Preparation Portal API',
    version: '1.0.0',
    dbConnected: isDBConnected(),
    timestamp: new Date().toISOString()
  });
});

// Export Express app for Vercel Serverless / Services
export default app;

// Start DB connection attempt and launch server when run standalone
if (!process.env.VERCEL) {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[API Server] Running on http://localhost:${PORT}`);
    });
  });
} else {
  initDB().catch(err => console.error('[API Server] DB Init Error:', err));
}
