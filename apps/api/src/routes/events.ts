import { Hono } from 'hono';
import type {
  Market,
  ApiResponse,
  PaginatedResponse,
  EventsQueryParams
} from '@predict-x/types';

const app = new Hono();

// Mock data - will be replaced with real API calls
const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $150,000 by end of 2026?',
    description:
      'This market resolves YES if BTC price reaches $150,000 USD on any major exchange before December 31, 2026.',
    platform: 'polymarket',
    category: 'crypto',
    yesPrice: 0.42,
    noPrice: 0.58,
    yesChange24h: 5.2,
    noChange24h: -5.2,
    volume24h: 1250000,
    liquidity: 5800000,
    expiresAt: '2026-12-31T23:59:59Z',
    isHot: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Will Ethereum ETF be approved in 2026?',
    description:
      'This market resolves YES if the SEC approves a spot Ethereum ETF in 2026.',
    platform: 'opinion-labs',
    category: 'crypto',
    yesPrice: 0.78,
    noPrice: 0.22,
    yesChange24h: 2.1,
    noChange24h: -2.1,
    volume24h: 890000,
    liquidity: 3200000,
    expiresAt: '2026-12-31T23:59:59Z',
    isHot: false,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Will OpenAI release GPT-5 in 2026?',
    description:
      'This market resolves YES if OpenAI publicly releases GPT-5 before December 31, 2026.',
    platform: 'polymarket',
    category: 'tech',
    yesPrice: 0.65,
    noPrice: 0.35,
    yesChange24h: -1.5,
    noChange24h: 1.5,
    volume24h: 2100000,
    liquidity: 8500000,
    expiresAt: '2026-12-31T23:59:59Z',
    isHot: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

// GET /api/v1/events - List all events
app.get('/', (c) => {
  const query: EventsQueryParams = {
    platform: c.req.query('platform') as EventsQueryParams['platform'],
    category: c.req.query('category'),
    search: c.req.query('search'),
    sortBy: c.req.query('sortBy') as EventsQueryParams['sortBy'],
    page: c.req.query('page') ? parseInt(c.req.query('page')!) : 1,
    pageSize: c.req.query('pageSize') ? parseInt(c.req.query('pageSize')!) : 20
  };

  let filtered = [...mockMarkets];

  // Filter by platform
  if (query.platform) {
    filtered = filtered.filter((m) => m.platform === query.platform);
  }

  // Filter by category
  if (query.category) {
    filtered = filtered.filter((m) => m.category === query.category);
  }

  // Search
  if (query.search) {
    const search = query.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search)
    );
  }

  // Sort
  if (query.sortBy) {
    filtered.sort((a, b) => {
      switch (query.sortBy) {
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'liquidity':
          return b.liquidity - a.liquidity;
        case 'change':
          return Math.abs(b.yesChange24h) - Math.abs(a.yesChange24h);
        case 'expiry':
          return (
            new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
          );
        default:
          return 0;
      }
    });
  }

  // Pagination
  const page = query.page || 1;
  const pageSize = query.pageSize || 20;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const response: ApiResponse<PaginatedResponse<Market>> = {
    success: true,
    data: {
      items: paginated,
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + pageSize < filtered.length
    }
  };

  return c.json(response);
});

// GET /api/v1/events/:id - Get single event
app.get('/:id', (c) => {
  const id = c.req.param('id');
  const market = mockMarkets.find((m) => m.id === id);

  if (!market) {
    return c.json<ApiResponse<null>>(
      { success: false, error: 'Market not found' },
      404
    );
  }

  return c.json<ApiResponse<Market>>({
    success: true,
    data: market
  });
});

export { app as eventsRoutes };
