"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { Position, formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface PositionListProps {
  positions: Position[];
}

export function PositionList({ positions }: PositionListProps) {
  if (positions.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            No Positions
          </h3>
          <p className="text-xs text-foreground-tertiary">
            Your active positions will appear here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="bg-background-secondary border border-border rounded-xl">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">My Positions</h3>
      </div>

      <div className="divide-y divide-border">
        {positions.map((position) => {
          const pnl = (position.currentPrice - position.avgCost) * position.shares;
          const pnlPercent = ((position.currentPrice - position.avgCost) / position.avgCost) * 100;
          const isProfit = pnl >= 0;

          return (
            <div key={position.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={position.side === "yes" ? "success" : "danger"}
                      size="sm"
                    >
                      {position.side.toUpperCase()}
                    </Badge>
                    <Badge
                      variant={position.platform === "polymarket" ? "polymarket" : "opinion"}
                      size="sm"
                    >
                      {position.platform === "polymarket" ? "PM" : "OL"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">
                    {position.marketTitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-foreground-tertiary block mb-0.5">Shares</span>
                  <span className="text-foreground font-medium">
                    {position.shares}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-tertiary block mb-0.5">Avg Cost</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(position.avgCost)}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-tertiary block mb-0.5">Current</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(position.currentPrice)}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-tertiary block mb-0.5">P&L</span>
                  <span
                    className={cn(
                      "font-medium flex items-center gap-1",
                      isProfit ? "text-buy" : "text-sell"
                    )}
                  >
                    {isProfit ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isProfit ? "+" : ""}${pnl.toFixed(2)} ({pnlPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
