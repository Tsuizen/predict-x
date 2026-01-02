import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';

import { eventsRoutes } from './routes/events';
import { ordersRoutes } from './routes/orders';
import { positionsRoutes } from './routes/positions';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  })
);

// Health check
app.get('/', (c) => {
  return c.json({
    name: 'PredictX API',
    version: '0.0.1',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.route('/api/v1/events', eventsRoutes);
app.route('/api/v1/orders', ordersRoutes);
app.route('/api/v1/positions', positionsRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json({ success: false, error: err.message }, 500);
});

// Start server
const port = process.env.PORT ? parseInt(process.env.PORT) : 8787;

console.log(`🚀 PredictX API running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
