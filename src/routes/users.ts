import express from 'express';
import { generalLimiter } from '../limiter/limiters';
import pool from '../db/pool';

const router = express.Router();

interface User {
  id: number;
  name: string;
  email: string;
}

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

/* GET a single user by id. */
router.get('/:id', generalLimiter, async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [Number(req.params.id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: { status: 404, message: 'User not found' } });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
