import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Sample initial mock user to allow seamless exploration right away
const INITIAL_DEMO_USER = {
  id: 1,
  fullName: "Anusha Sharma",
  email: "anusha@placementprep.edu",
  role: "student", // 'student' or 'admin'
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
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('prep_user');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_USER;
  });

  const [token, setToken] = useState(() => localStorage.getItem('prep_token') || 'demo-jwt-token');

  useEffect(() => {
    if (user) {
      localStorage.setItem('prep_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('prep_user');
    }
  }, [user]);

  const login = (userData, jwtToken = 'demo-jwt-token') => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('prep_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('prep_token');
    localStorage.removeItem('prep_user');
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const switchRole = () => {
    // Convenient role toggle for testing admin vs student features
    setUser(prev => {
      if (!prev) return null;
      const nextRole = prev.role === 'admin' ? 'student' : 'admin';
      return {
        ...prev,
        role: nextRole,
        fullName: nextRole === 'admin' ? "Placement Administrator" : "Anusha Sharma"
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, updateProfile, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
