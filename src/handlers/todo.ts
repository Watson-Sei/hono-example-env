import { Hono } from 'hono';
import { db } from '../db/client';
import { todos } from '../db/schema';
import { CreateRequestBody, CreateTodoObject, UpdateRequestBody } from '../types/api/todo';
import { eq, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';

type Variables = {
    user: string;
}

export const todoHandlers = new Hono<{ Variables: Variables }>();

todoHandlers.get('/todos', async (c) => {
    const result = await db.select().from(todos);
    return c.json(result, 200);
});

todoHandlers.use(authMiddleware);

todoHandlers.post('/todo', async (c) => {
    const body: CreateRequestBody = await c.req.json();
    const todo: CreateTodoObject = {
        ...body,
        creatorId: parseInt(c.get('user')),
    };
    await db.insert(todos).values(todo);
    return c.json({message: 'Todo created'}, 201);
});

todoHandlers.put('/todo', async (c) => {
    const body: UpdateRequestBody = await c.req.json();
    const user_id = parseInt(c.get('user'));
    if (body.creatorId !== user_id) {
        return c.text('Unauthorized', 401);
    }
    const result = await db.update(todos).set(body).where(eq(todos.id, body.id));
    return c.json(result, 200);
});

todoHandlers.delete('/todo/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    const user_id = parseInt(c.get('user'));
    const result = await db.delete(todos).where(and(eq(todos.id, id), eq(todos.creatorId, user_id))).returning({id: todos.id});
    if (result.length === 0) {
        return c.text('Not Found', 404);
    }
    return c.json(result, 200);
});