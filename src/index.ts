import { Hono } from 'hono';
import { route } from './routes/api';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors({ origin: ['*'] }));

app.route('/api', route);

export default app;
