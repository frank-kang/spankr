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

app.put('/api/users/:userId', authMiddleware, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      longDescription,
      zipCode,
      skillId,
      playTypeId,
      genderId,
      handednessId,
    } = req.body;
    const { userId } = req.params;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !longDescription ||
      !zipCode ||
      !skillId ||
      !playTypeId ||
      !genderId ||
      !handednessId
    ) {
      throw new ClientError(
        400,
        'Invalid input: first name, last name, description zipcode,  required'
      );
    }
    const sql = `
      update "users"
      set "firstName" = $1,
          "lastName" = $2,
          "email" = $3,
          "longDescription" = $4,
          "zipCode" = $5,
          "skillId" = $6,
          "playTypeId" = $7,
          "genderId" = $8,
          "handednessId" = $9
      where "userId" = $10
      returning *;
    `;
    if (Number(userId) !== req.user?.userId) {
      throw new ClientError(403, 'Not authorized');
    }
    const params = [
      firstName,
      lastName,
      email,
      longDescription,
      zipCode,
      skillId,
      playTypeId,
      genderId,
      handednessId,
      userId,
    ];
    const result = await db.query<User>(sql, params);
    const user = result.rows[0];
    if (!user) throw new ClientError(404, 'User not found');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users/:userId', authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const sql = `
      select *
      from "users"
      where "userId" = $1;
    `;
    const result = await db.query<User>(sql, [userId]);
    const user = result.rows[0];
    if (!user) throw new ClientError(404, 'User not found');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/api/users/location/:zipcode',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { zipcode } = req.params;
      const sql = `
      select *
      from "users"
      where "zipCode" = $1;
    `;
      const result = await db.query<User>(sql, [zipcode]);
      const user = result.rows[0];
      if (!user) throw new ClientError(404, 'User not found');
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
