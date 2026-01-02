// Shared types for PredictX

export type Platform = 'polymarket' | 'opinion-labs';

export interface Market {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  category: string;
  yesPrice: number;
  noPrice: number;
  yesChange24h: number;
  noChange24h: number;
  volume24h: number;
  liquidity: number;
  expiresAt: string;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  marketId: string;
  userId: string;
  side: 'yes' | 'no';
  type: 'market' | 'limit';
  price: number;
  amount: number;
  filled: number;
  status: 'pending' | 'open' | 'filled' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  marketId: string;
  marketTitle: string;
  userId: string;
  platform: Platform;
  side: 'yes' | 'no';
  shares: number;
  avgCost: number;
  currentPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface User {
  id: string;
  walletAddress: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Query parameters
export interface EventsQueryParams {
  platform?: Platform;
  category?: string;
  search?: string;
  sortBy?: 'volume' | 'liquidity' | 'expiry' | 'change';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
