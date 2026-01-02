import { Hono } from 'hono';
import type { Order, ApiResponse } from '@predict-x/types';

const app = new Hono();

// Mock orders storage
const mockOrders: Order[] = [];

// POST /api/v1/orders - Create order
app.post('/', async (c) => {
  const body = await c.req.json();

  const order: Order = {
    id: `order_${Date.now()}`,
    marketId: body.marketId,
    userId: body.userId || 'anonymous',
    side: body.side,
    type: body.type || 'market',
    price: body.price,
    amount: body.amount,
    filled: 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockOrders.push(order);

  // Simulate order processing
  setTimeout(() => {
    order.status = 'filled';
    order.filled = order.amount;
    order.updatedAt = new Date().toISOString();
  }, 1000);

  return c.json<ApiResponse<Order>>(
    {
      success: true,
      data: order,
      message: 'Order created successfully'
    },
    201
  );
});

// GET /api/v1/orders - List user's orders
app.get('/', (c) => {
  const userId = c.req.query('userId');

  let orders = [...mockOrders];
  if (userId) {
    orders = orders.filter((o) => o.userId === userId);
  }

  return c.json<ApiResponse<Order[]>>({
    success: true,
    data: orders
  });
});

// GET /api/v1/orders/:id - Get single order
app.get('/:id', (c) => {
  const id = c.req.param('id');
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return c.json<ApiResponse<null>>(
      { success: false, error: 'Order not found' },
      404
    );
  }

  return c.json<ApiResponse<Order>>({
    success: true,
    data: order
  });
});

// DELETE /api/v1/orders/:id - Cancel order
app.delete('/:id', (c) => {
  const id = c.req.param('id');
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return c.json<ApiResponse<null>>(
      { success: false, error: 'Order not found' },
      404
    );
  }

  if (order.status === 'filled') {
    return c.json<ApiResponse<null>>(
      { success: false, error: 'Cannot cancel filled order' },
      400
    );
  }

  order.status = 'cancelled';
  order.updatedAt = new Date().toISOString();

  return c.json<ApiResponse<Order>>({
    success: true,
    data: order,
    message: 'Order cancelled successfully'
  });
});

export { app as ordersRoutes };
