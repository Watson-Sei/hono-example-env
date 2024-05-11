import { Hono } from "hono";
import * as jwt from 'jsonwebtoken';
import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const SECRET_KEY = process.env.SECRET_KEY as string;

export const userHandlers = new Hono();

userHandlers.post('/signup', async (c) => {
    const { username, password } = await c.req.json();
    const passwordHash: string = await Bun.password.hash(password)
    const newUser = { username, passwordHash };
    await db.insert(users).values(newUser);
    return c.json({message: 'User Signuped'}, 201);
})

userHandlers.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
    console.log(await Bun.password.verify(password, user[0].passwordHash))
    if (!user || !await Bun.password.verify(password, user[0].passwordHash)) {
        return c.json({message: 'Invalid credentials'}, 400);
    }
    const token = jwt.sign({ userId: user[0].id, username: user[0].username }, SECRET_KEY, { expiresIn: '1h' });
    return c.json({ token }, 200);
})