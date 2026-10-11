import 'dotenv/config';
import { Pool } from 'pg';

console.log('DB password type:', typeof process.env.DB_PASSWORD);
console.log('DB password value:', process.env.DB_PASSWORD);
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;