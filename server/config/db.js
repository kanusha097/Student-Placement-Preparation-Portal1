import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool = null;
let isConnected = false;

export const initDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'placement_portal',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    isConnected = true;
    console.log('[DB] Connected to MySQL database successfully.');
    conn.release();
    return true;
  } catch (error) {
    console.warn('[DB] MySQL server not reachable on localhost:3306. Operating in Fallback Safe Memory Mode.');
    console.warn(`[DB Details]: ${error.message}`);
    isConnected = false;
    return false;
  }
};

export const getDB = () => pool;
export const isDBConnected = () => isConnected;
