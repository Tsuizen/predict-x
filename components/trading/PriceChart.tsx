"use client";

import { AreaChart, TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice, formatPercentage } from "@/lib/mockData";
import clsx from "clsx";

interface PriceChartProps {
  title: string;
  yesPrice: number;
  noPrice: number;
  yesChange: number;
}

export function PriceChart({ title, yesPrice, noPrice, yesChange }: PriceChartProps) {
  const isUp = yesChange >= 0;

  return (
    <div className="bg-background-secondary border border-border rounded-xl p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-tertiary">YES:</span>
              <span className="text-lg font-bold text-buy">{formatPrice(yesPrice)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-tertiary">NO:</span>
              <span className="text-lg font-bold text-sell">{formatPrice(noPrice)}</span>
            </div>
            <span
              className={clsx(
                "flex items-center gap-1 text-sm font-medium",
                isUp ? "text-buy" : "text-sell"
              )}
            >
              {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {formatPercentage(yesChange)}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-48 bg-background-tertiary rounded-lg flex items-center justify-center border border-border">
        <div className="text-center">
          <AreaChart className="h-12 w-12 text-foreground-tertiary mx-auto mb-2" />
          <p className="text-sm text-foreground-tertiary">
            Price Chart
          </p>
          <p className="text-xs text-foreground-tertiary">
            TradingView integration coming soon
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mt-4">
        {["1H", "4H", "1D", "1W", "1M"].map((tf, index) => (
          <button
            key={tf}
            className={clsx(
              "flex-1 py-1.5 text-xs font-medium rounded-md transition-all",
              index === 2
                ? "bg-accent-solid text-white"
                : "bg-background-tertiary text-foreground-tertiary hover:text-foreground hover:bg-background-elevated"
            )}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}
