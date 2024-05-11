import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Hono } from 'hono';
import { todoHandlers } from '../../../src/handlers/todo';
import { authMiddleware } from '../../../src/middleware/auth';


vi.mock('../../src/db/client', () => {
    return {
        db: {
            select: vi.fn().mockReturnThis(),
            from: vi.fn().mockReturnThis(),
            insert: vi.fn().mockReturnThis(),
            update: vi.fn().mockReturnThis(),
            delete: vi.fn().mockReturnThis(),
            where: vi.fn().mockReturnThis(),
            values: vi.fn().mockResolvedValue({}),
            returning: vi.fn().mockReturnThis(),
            eq: vi.fn(),
            and: vi.fn()
        },
    }
});

describe('Todo Handlers', () => {
    let app: Hono;

    beforeEach(() => {
        app = new Hono();
        app.route('/api', todoHandlers);
    })

    it('should get all todo', async () => {
        const mcokRequest = new Request('http://localhost/api/todos', {
            method: 'GET',
        })

        const response = await app.request(mcokRequest);
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.length).toBe(0);
    })
})