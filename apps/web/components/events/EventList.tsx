"use client";

import { useTranslations } from "next-intl";
import { Market } from "@/lib/mockData";
import { EventCard } from "./EventCard";

interface EventListProps {
  markets: Market[];
}

export function EventList({ markets }: EventListProps) {
  const t = useTranslations();

  if (markets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 border-2 border-border rounded-md flex items-center justify-center mb-4">
          <span className="text-2xl">∅</span>
        </div>
        <h3 className="text-base font-medium text-foreground mb-2">
          {t("market.noMarkets")}
        </h3>
        <p className="text-sm text-foreground-tertiary max-w-sm">
          {t("market.noMarketsDesc")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {markets.map((market, index) => (
        <EventCard key={market.id} market={market} index={index} />
      ))}
    </div>
  );
}
