import { createMiddleware } from 'hono/factory';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string;


export const authMiddleware = createMiddleware(async (c, next) => {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return c.json({message: 'Authentication token is missing'}, 401);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        c.set('user', decoded);
        await next();
    } catch (error) {
        return c.json({message: 'Invalid token'}, 401);
    }
})