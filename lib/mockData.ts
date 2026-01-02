// Mock data for MVP development
export interface Platform {
  id: "polymarket" | "opinion";
  name: string;
}

export interface Market {
  id: string;
  platform: Platform["id"];
  title: string;
  description: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  yesChange24h: number;
  noChange24h: number;
  volume24h: number;
  liquidity: number;
  expiresAt: string;
  status: "active" | "resolved" | "paused";
  isHot?: boolean;
}

export interface Position {
  id: string;
  marketId: string;
  marketTitle: string;
  platform: Platform["id"];
  side: "yes" | "no";
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
}

// Mock Markets Data
export const mockMarkets: Market[] = [
  {
    id: "1",
    platform: "polymarket",
    title: "Will Bitcoin reach $100K by Dec 2024?",
    description: "This market will resolve to YES if the price of Bitcoin (BTC) reaches $100,000 USD or higher at any point before December 31, 2024 11:59 PM ET.",
    category: "Crypto",
    yesPrice: 0.45,
    noPrice: 0.55,
    yesChange24h: 2.3,
    noChange24h: -2.1,
    volume24h: 1250000,
    liquidity: 500000,
    expiresAt: "2024-12-31",
    status: "active",
    isHot: true,
  },
  {
    id: "2",
    platform: "opinion",
    title: "Trump wins 2024 Presidential Election",
    description: "This market will resolve to YES if Donald Trump wins the 2024 United States Presidential Election.",
    category: "Politics",
    yesPrice: 0.52,
    noPrice: 0.48,
    yesChange24h: 1.5,
    noChange24h: -1.5,
    volume24h: 2800000,
    liquidity: 1200000,
    expiresAt: "2024-11-05",
    status: "active",
    isHot: true,
  },
  {
    id: "3",
    platform: "polymarket",
    title: "ETH > $5K by June 2024",
    description: "This market will resolve to YES if Ethereum reaches $5,000 or higher before June 30, 2024.",
    category: "Crypto",
    yesPrice: 0.28,
    noPrice: 0.72,
    yesChange24h: -3.2,
    noChange24h: 1.8,
    volume24h: 650000,
    liquidity: 280000,
    expiresAt: "2024-06-30",
    status: "active",
  },
  {
    id: "4",
    platform: "opinion",
    title: "Fed cuts rates before July 2024",
    description: "Will the Federal Reserve cut interest rates before July 1, 2024?",
    category: "Economics",
    yesPrice: 0.38,
    noPrice: 0.62,
    yesChange24h: -1.2,
    noChange24h: 0.8,
    volume24h: 420000,
    liquidity: 185000,
    expiresAt: "2024-07-01",
    status: "active",
  },
  {
    id: "5",
    platform: "polymarket",
    title: "Apple announces new AI product in 2024",
    description: "Will Apple officially announce a new AI-focused product or major AI feature in 2024?",
    category: "Tech",
    yesPrice: 0.75,
    noPrice: 0.25,
    yesChange24h: 0.5,
    noChange24h: -0.5,
    volume24h: 380000,
    liquidity: 150000,
    expiresAt: "2024-12-31",
    status: "active",
  },
  {
    id: "6",
    platform: "opinion",
    title: "SpaceX Starship reaches orbit in 2024",
    description: "Will SpaceX successfully send Starship to orbit in 2024?",
    category: "Science",
    yesPrice: 0.68,
    noPrice: 0.32,
    yesChange24h: 4.2,
    noChange24h: -4.2,
    volume24h: 520000,
    liquidity: 230000,
    expiresAt: "2024-12-31",
    status: "active",
  },
  {
    id: "7",
    platform: "polymarket",
    title: "Lakers win 2024 NBA Championship",
    description: "Will the Los Angeles Lakers win the 2024 NBA Championship?",
    category: "Sports",
    yesPrice: 0.12,
    noPrice: 0.88,
    yesChange24h: -1.0,
    noChange24h: 0.3,
    volume24h: 180000,
    liquidity: 95000,
    expiresAt: "2024-06-20",
    status: "active",
  },
  {
    id: "8",
    platform: "opinion",
    title: "Solana flips Ethereum by market cap",
    description: "Will Solana's market cap exceed Ethereum's at any point in 2024?",
    category: "Crypto",
    yesPrice: 0.08,
    noPrice: 0.92,
    yesChange24h: 0.8,
    noChange24h: -0.2,
    volume24h: 290000,
    liquidity: 120000,
    expiresAt: "2024-12-31",
    status: "active",
  },
];

// Mock Positions Data
export const mockPositions: Position[] = [
  {
    id: "pos-1",
    marketId: "1",
    marketTitle: "Will Bitcoin reach $100K by Dec 2024?",
    platform: "polymarket",
    side: "yes",
    shares: 500,
    avgCost: 0.42,
    currentPrice: 0.45,
  },
  {
    id: "pos-2",
    marketId: "2",
    marketTitle: "Trump wins 2024 Presidential Election",
    platform: "opinion",
    side: "no",
    shares: 200,
    avgCost: 0.50,
    currentPrice: 0.48,
  },
];

// Mock OrderBook Data
export const mockOrderBook: OrderBook = {
  bids: [
    { price: 0.45, size: 30000, total: 30000 },
    { price: 0.44, size: 20000, total: 50000 },
    { price: 0.43, size: 15000, total: 65000 },
    { price: 0.42, size: 25000, total: 90000 },
    { price: 0.41, size: 18000, total: 108000 },
  ],
  asks: [
    { price: 0.55, size: 25000, total: 25000 },
    { price: 0.56, size: 12500, total: 37500 },
    { price: 0.57, size: 18000, total: 55500 },
    { price: 0.58, size: 22000, total: 77500 },
    { price: 0.59, size: 15000, total: 92500 },
  ],
  spread: 0.10,
};

// Categories
export const categories = [
  { id: "all", name: "All Markets", icon: "🌐" },
  { id: "crypto", name: "Crypto", icon: "₿" },
  { id: "politics", name: "Politics", icon: "🏛️" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "tech", name: "Tech", icon: "💻" },
  { id: "economics", name: "Economics", icon: "📊" },
  { id: "science", name: "Science", icon: "🔬" },
];

// Helper functions
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
