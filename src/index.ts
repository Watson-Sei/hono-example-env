import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { TodoRequestBody } from './types/todo';
import { todos } from '../db/schema';
import { eq } from 'drizzle-orm';

const client = createClient({
  url: "http://127.0.0.1:8080",
})
const db = drizzle(client);

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// all todo response
app.get('/todos', async (c) => {
  const result = await db.select().from(todos);
  return c.json(result, 200);
})

// create todo request
app.post('/todo', async (c) => {
  const body: TodoRequestBody = await c.req.json()
  await db.insert(todos).values(body);
  return c.text('', 201);
})

// update complete status request
app.put('/todo/:id', async (c) => {
  const id: number = parseInt(c.req.param('id'))
  const tags = c.req.queries('isCompleted')
  
  let isCompleted: boolean;
  switch (tags![0]) {
    case 'true':
      isCompleted = true;
      break;
    case 'false':
      isCompleted = false;
      break;
    default:
      return c.text('', 400);
  }
  await db.update(todos).set({isCompleted: isCompleted}).where(eq(todos.id, id));
  return c.text('', 200);
})

// delete target id todo
app.delete('/todo/:id', async (c) => {
  const id: number = parseInt(c.req.param('id'))
  await db.delete(todos).where(eq(todos.id, id))
  return c.text('', 200);
})

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app
