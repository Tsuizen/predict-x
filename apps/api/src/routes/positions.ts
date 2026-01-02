import { Hono } from 'hono';
import type { Position, ApiResponse } from '@predict-x/types';

const app = new Hono();

// Mock positions
const mockPositions: Position[] = [
  {
    id: 'pos_1',
    marketId: '1',
    marketTitle: 'Will Bitcoin reach $150,000 by end of 2026?',
    userId: 'user_1',
    platform: 'polymarket',
    side: 'yes',
    shares: 500,
    avgCost: 0.38,
    currentPrice: 0.42,
    createdAt: '2024-06-15T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pos_2',
    marketId: '3',
    marketTitle: 'Will OpenAI release GPT-5 in 2026?',
    userId: 'user_1',
    platform: 'polymarket',
    side: 'no',
    shares: 200,
    avgCost: 0.32,
    currentPrice: 0.35,
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

// GET /api/v1/positions - List user's positions
app.get('/', (c) => {
  const userId = c.req.query('userId');

  let positions = [...mockPositions];
  if (userId) {
    positions = positions.filter((p) => p.userId === userId);
  }

  // Calculate P&L for each position
  const positionsWithPnL = positions.map((p) => ({
    ...p,
    pnl: (p.currentPrice - p.avgCost) * p.shares,
    pnlPercent: ((p.currentPrice - p.avgCost) / p.avgCost) * 100
  }));

  return c.json<ApiResponse<typeof positionsWithPnL>>({
    success: true,
    data: positionsWithPnL
  });
});

// GET /api/v1/positions/:id - Get single position
app.get('/:id', (c) => {
  const id = c.req.param('id');
  const position = mockPositions.find((p) => p.id === id);

  if (!position) {
    return c.json<ApiResponse<null>>(
      { success: false, error: 'Position not found' },
      404
    );
  }

  return c.json<ApiResponse<Position>>({
    success: true,
    data: position
  });
});

export { app as positionsRoutes };
