"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Star, TrendingUp, Clock } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { Market, formatCurrency, formatPrice, formatPercentage, formatDate } from "@/lib/mockData";
import clsx from "clsx";

interface EventCardProps {
  market: Market;
  index?: number;
}

export function EventCard({ market, index = 0 }: EventCardProps) {
  const t = useTranslations();
  
  const priceChangeClass = (change: number) =>
    change >= 0 ? "text-buy" : "text-sell";

  return (
    <Card 
      hover 
      variant="accent"
      padding="none" 
      className={clsx(
        "overflow-hidden animate-stagger-in",
        index === 0 && "stagger-1",
        index === 1 && "stagger-2",
        index === 2 && "stagger-3",
        index === 3 && "stagger-4",
        index === 4 && "stagger-5",
        index === 5 && "stagger-6",
        index === 6 && "stagger-7",
        index === 7 && "stagger-8",
      )}
    >
      <div className="p-4">
        {/* Header: Platform + Hot Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant={market.platform === "polymarket" ? "polymarket" : "opinion"}
          >
            {market.platform === "polymarket" ? "Polymarket" : "Opinion"}
          </Badge>
          <div className="flex items-center gap-2">
            {market.isHot && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent">
                <span className="hot-dot" />
                {t("market.hot")}
              </span>
            )}
            <button className="p-1.5 hover:bg-background-tertiary rounded-md transition-colors text-foreground-tertiary hover:text-accent">
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/events/${market.id}`}>
          <h3 className="text-sm font-medium text-foreground mb-4 hover:text-accent transition-colors line-clamp-2 leading-snug">
            {market.title}
          </h3>
        </Link>

        {/* Prices - Terminal Style */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-color-buy/5 border border-buy/20 rounded-sm p-3">
            <div className="label-caps mb-1">{t("market.yes")}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-mono font-bold text-buy tabular-nums">
                {formatPrice(market.yesPrice)}
              </span>
              <span
                className={clsx("text-xs font-mono font-medium tabular-nums", priceChangeClass(market.yesChange24h))}
              >
                {formatPercentage(market.yesChange24h)}
              </span>
            </div>
          </div>
          <div className="bg-color-sell/5 border border-sell/20 rounded-sm p-3">
            <div className="label-caps mb-1">{t("market.no")}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-mono font-bold text-sell tabular-nums">
                {formatPrice(market.noPrice)}
              </span>
              <span
                className={clsx("text-xs font-mono font-medium tabular-nums", priceChangeClass(market.noChange24h))}
              >
                {formatPercentage(market.noChange24h)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats - Monospace Data */}
        <div className="flex items-center justify-between text-[11px] font-mono text-foreground-tertiary mb-4 tabular-nums">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{t("market.vol")} {formatCurrency(market.volume24h)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(market.expiresAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="success" size="sm" className="flex-1">
            {t("action.buyYes")}
          </Button>
          <Button variant="danger" size="sm" className="flex-1">
            {t("action.buyNo")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
