import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/authMiddleware.js';
import { getDB, isDBConnected } from '../config/db.js';

// In-memory data store for safe fallback mode or when MySQL is initialising
let inMemoryUsers = [
  {
    id: 1,
    fullName: "Anusha Sharma",
    email: "anusha@placementprep.edu",
    passwordHash: bcrypt.hashSync("Password@123", 10),
    role: "student",
    collegeName: "National Institute of Technology",
    branch: "Computer Science and Engineering",
    yearOfStudy: "4th Year (Final Year)",
    skills: ["Java", "Python", "SQL", "React", "Data Structures"],
    streak: 12,
    placementReadiness: 78,
    codingSolved: 42,
    aptitudeScore: 84,
    mockTestsTaken: 6,
    interviewScore: 80,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
  },
  {
    id: 99,
    fullName: "Dr. K. Raman (Placement Officer)",
    email: "admin@placementprep.edu",
    passwordHash: bcrypt.hashSync("Admin@123", 10),
    role: "admin",
    collegeName: "National Institute of Technology",
    branch: "Training & Placement Cell",
    yearOfStudy: "Faculty Admin",
    skills: ["Placement Coordination", "Technical Evaluation", "Corporate Relations"],
    streak: 30,
    placementReadiness: 100,
    codingSolved: 120,
    aptitudeScore: 98,
    mockTestsTaken: 25,
    interviewScore: 95,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"
  }
];

// 1. REGISTER
export const register = async (req, res) => {
  try {
    const { fullName, email, password, collegeName, branch, yearOfStudy, skills } = req.body;

    // Validation
    if (!fullName || !email || !password || !collegeName) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory fields.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists in DB or in-memory
    if (isDBConnected()) {
      const pool = getDB();
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const [result] = await pool.query(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [fullName, normalizedEmail, passwordHash, 'student']
      );

      const userId = result.insertId;
      const skillsStr = Array.isArray(skills) ? skills.join(', ') : (skills || '');

      await pool.query(
        'INSERT INTO student_profiles (user_id, college_name, branch, year_of_study, skills, streak, placement_readiness) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, collegeName, branch || 'Computer Science', yearOfStudy || '4th Year', skillsStr, 1, 65]
      );

      const newUser = {
        id: userId,
        fullName,
        email: normalizedEmail,
        role: 'student',
        collegeName,
        branch: branch || 'Computer Science',
        yearOfStudy: yearOfStudy || '4th Year',
        skills: Array.isArray(skills) ? skills : skillsStr.split(',').map(s => s.trim()),
        streak: 1,
        placementReadiness: 65,
        codingSolved: 0,
        aptitudeScore: 0,
        mockTestsTaken: 0,
        interviewScore: 0
      };

      const token = generateToken(newUser);
      return res.status(201).json({ success: true, message: 'Registration successful!', user: newUser, token });
    } else {
      // In-Memory Mode
      const existing = inMemoryUsers.find(u => u.email === normalizedEmail);
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const parsedSkills = Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []);

      const newUser = {
        id: inMemoryUsers.length + 1,
        fullName,
        email: normalizedEmail,
        passwordHash,
        role: 'student',
        collegeName,
        branch: branch || 'Computer Science and Engineering',
        yearOfStudy: yearOfStudy || '4th Year (Final Year)',
        skills: parsedSkills,
        streak: 1,
        placementReadiness: 65,
        codingSolved: 0,
        aptitudeScore: 0,
        mockTestsTaken: 0,
        interviewScore: 0,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
      };

      inMemoryUsers.push(newUser);
      const token = generateToken(newUser);

      const { passwordHash: _, ...userWithoutHash } = newUser;
      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        user: userWithoutHash,
        token
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration.', error: err.message });
  }
};

// 2. LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDBConnected()) {
      const pool = getDB();
      const [rows] = await pool.query(
        `SELECT u.id, u.full_name, u.email, u.password_hash, u.role, 
                p.college_name, p.branch, p.year_of_study, p.skills, p.streak, p.placement_readiness, p.avatar_url
         FROM users u
         LEFT JOIN student_profiles p ON u.id = p.user_id
         WHERE u.email = ?`,
        [normalizedEmail]
      );

      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const userRecord = rows[0];
      const isMatch = await bcrypt.compare(password, userRecord.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      // Check role if specified
      if (role && userRecord.role !== role) {
        return res.status(403).json({ success: false, message: `Account is not registered as ${role}.` });
      }

      const userObj = {
        id: userRecord.id,
        fullName: userRecord.full_name,
        email: userRecord.email,
        role: userRecord.role,
        collegeName: userRecord.college_name || 'NIT',
        branch: userRecord.branch || 'CSE',
        yearOfStudy: userRecord.year_of_study || '4th Year',
        skills: userRecord.skills ? userRecord.skills.split(',').map(s => s.trim()) : [],
        streak: userRecord.streak || 1,
        placementReadiness: userRecord.placement_readiness || 70,
        avatar: userRecord.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userRecord.full_name)}`
      };

      const token = generateToken(userObj);
      return res.json({ success: true, message: 'Login successful!', user: userObj, token });
    } else {
      // In-Memory Mode
      const found = inMemoryUsers.find(u => u.email === normalizedEmail);
      if (!found) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, found.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      if (role && found.role !== role) {
        return res.status(403).json({ success: false, message: `Account is registered as ${found.role}, not ${role}.` });
      }

      const { passwordHash: _, ...safeUser } = found;
      const token = generateToken(safeUser);
      return res.json({ success: true, message: 'Login successful!', user: safeUser, token });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login.', error: err.message });
  }
};

// 3. GET CURRENT PROFILE
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (isDBConnected()) {
      const pool = getDB();
      const [rows] = await pool.query(
        `SELECT u.id, u.full_name, u.email, u.role, 
                p.college_name, p.branch, p.year_of_study, p.skills, p.streak, p.placement_readiness, p.avatar_url
         FROM users u
         LEFT JOIN student_profiles p ON u.id = p.user_id
         WHERE u.id = ?`,
        [userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      const userRecord = rows[0];
      return res.json({
        success: true,
        user: {
          id: userRecord.id,
          fullName: userRecord.full_name,
          email: userRecord.email,
          role: userRecord.role,
          collegeName: userRecord.college_name,
          branch: userRecord.branch,
          yearOfStudy: userRecord.year_of_study,
          skills: userRecord.skills ? userRecord.skills.split(',').map(s => s.trim()) : [],
          streak: userRecord.streak,
          placementReadiness: userRecord.placement_readiness,
          avatar: userRecord.avatar_url
        }
      });
    } else {
      const user = inMemoryUsers.find(u => u.id === userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
      const { passwordHash: _, ...safeUser } = user;
      return res.json({ success: true, user: safeUser });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching profile.', error: err.message });
  }
};

// 4. UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, collegeName, branch, yearOfStudy, skills, avatar } = req.body;

    if (isDBConnected()) {
      const pool = getDB();
      if (fullName) {
        await pool.query('UPDATE users SET full_name = ? WHERE id = ?', [fullName, userId]);
      }
      const skillsStr = Array.isArray(skills) ? skills.join(', ') : skills;
      await pool.query(
        `UPDATE student_profiles 
         SET college_name = COALESCE(?, college_name),
             branch = COALESCE(?, branch),
             year_of_study = COALESCE(?, year_of_study),
             skills = COALESCE(?, skills),
             avatar_url = COALESCE(?, avatar_url)
         WHERE user_id = ?`,
        [collegeName, branch, yearOfStudy, skillsStr, avatar, userId]
      );
      return res.json({ success: true, message: 'Profile updated successfully!' });
    } else {
      const index = inMemoryUsers.findIndex(u => u.id === userId);
      if (index === -1) return res.status(404).json({ success: false, message: 'User not found.' });

      inMemoryUsers[index] = {
        ...inMemoryUsers[index],
        fullName: fullName || inMemoryUsers[index].fullName,
        collegeName: collegeName || inMemoryUsers[index].collegeName,
        branch: branch || inMemoryUsers[index].branch,
        yearOfStudy: yearOfStudy || inMemoryUsers[index].yearOfStudy,
        skills: skills ? (Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim())) : inMemoryUsers[index].skills,
        avatar: avatar || inMemoryUsers[index].avatar
      };

      const { passwordHash: _, ...safeUser } = inMemoryUsers[index];
      return res.json({ success: true, message: 'Profile updated successfully!', user: safeUser });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update profile.', error: err.message });
  }
};

// 5. FORGOT PASSWORD
export const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Simulate password reset token generation
  const resetToken = Math.random().toString(36).substring(2, 10).toUpperCase();
  return res.json({
    success: true,
    message: `Password reset instructions and verification code sent to ${email}.`,
    demoResetCode: resetToken
  });
};
