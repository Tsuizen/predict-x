"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Users } from "lucide-react";
import { Header } from "@/components/layout";
import { OrderBook, TradingPanel, PositionList, PriceChart } from "@/components/trading";
import { Badge, Button } from "@/components/ui";
import {
  mockMarkets,
  mockOrderBook,
  mockPositions,
  formatCurrency,
  formatDate,
} from "@/lib/mockData";

export default function EventDetailPage() {
  const params = useParams();
  const marketId = params.id as string;

  // Find market by ID
  const market = mockMarkets.find((m) => m.id === marketId);

  if (!market) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Market not found
            </h2>
            <p className="text-foreground-tertiary mb-4">
              The market you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button variant="primary">Back to Markets</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter positions for this market
  const marketPositions = mockPositions.filter((p) => p.marketId === marketId);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Markets
        </Link>

        {/* Market Header */}
        <div className="bg-background-secondary border border-border rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <Badge
              variant={market.platform === "polymarket" ? "polymarket" : "opinion"}
              size="md"
            >
              {market.platform === "polymarket" ? "Polymarket" : "Opinion Labs"}
            </Badge>
            <Badge variant="default" size="md">
              {market.category}
            </Badge>
            {market.isHot && (
              <Badge variant="warning" size="md">
                🔥 Hot
              </Badge>
            )}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {market.title}
          </h1>

          <p className="text-foreground-secondary mb-6 max-w-3xl">
            {market.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-foreground-tertiary text-sm mb-1">
                <TrendingUp className="h-4 w-4" />
                24h Volume
              </div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(market.volume24h)}
              </div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-foreground-tertiary text-sm mb-1">
                <Users className="h-4 w-4" />
                Liquidity
              </div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(market.liquidity)}
              </div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-foreground-tertiary text-sm mb-1">
                <Clock className="h-4 w-4" />
                Expires
              </div>
              <div className="text-lg font-bold text-foreground">
                {formatDate(market.expiresAt)}
              </div>
            </div>
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-foreground-tertiary text-sm mb-1">
                <ExternalLink className="h-4 w-4" />
                Source
              </div>
              <a
                href="#"
                className="text-lg font-bold text-brand hover:underline"
              >
                View on {market.platform === "polymarket" ? "Polymarket" : "Opinion Labs"}
              </a>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart + Order Book */}
          <div className="lg:col-span-2 space-y-6">
            <PriceChart
              title={market.title}
              yesPrice={market.yesPrice}
              noPrice={market.noPrice}
              yesChange={market.yesChange24h}
            />
            <OrderBook orderBook={mockOrderBook} />
          </div>

          {/* Right: Trading Panel + Positions */}
          <div className="space-y-6">
            <TradingPanel market={market} />
            <PositionList positions={marketPositions} />
          </div>
        </div>
      </main>
    </div>
  );
}
