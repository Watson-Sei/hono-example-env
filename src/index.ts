import { Hono } from 'hono'
import { userHandlers } from './handlers/user';

const app = new Hono();

app.route('/api/auth', userHandlers);

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app
