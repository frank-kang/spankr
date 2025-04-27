/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { authMiddleware, ClientError, errorMiddleware } from './lib/index.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

type Auth = {
  email: string;
  password: string;
};

type User = {
  userId: number;
  email: string;
  hashedPassword: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;
const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ClientError(
        400,
        'Invalid input: username and password required'
      );
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
    insert into "users" ("email", "hashedPassword")
    values ($1, $2)
    returning "userId", "email", "createdAt";
    `;
    const result = await db.query(sql, [email, hashedPassword]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body as Partial<Auth>;
    if (!email || !password) {
      throw new ClientError(401, 'Invalid log-in');
    }
    const sql = `
    select *
    from "users"
    where "email" = $1;
    `;
    const result = await db.query<User>(sql, [email]);
    const user = result.rows[0];
    if (!user) throw new ClientError(401, 'not authorized');
    if (!(await argon2.verify(user.hashedPassword, password))) {
      throw new ClientError(401, 'not authorized');
    }
    const payload = { email: user.email, userId: user.userId };
    const token = jwt.sign(payload, hashKey);
    res.json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
