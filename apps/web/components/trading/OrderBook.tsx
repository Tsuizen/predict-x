"use client";

import { OrderBook as OrderBookType, formatPrice } from "@/lib/mockData";
import clsx from "clsx";

interface OrderBookProps {
  orderBook: OrderBookType;
}

export function OrderBook({ orderBook }: OrderBookProps) {
  const maxTotal = Math.max(
    ...orderBook.bids.map((b) => b.total),
    ...orderBook.asks.map((a) => a.total)
  );

  return (
    <div className="bg-background-secondary border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Order Book</h3>

      {/* Header */}
      <div className="grid grid-cols-3 gap-2 text-xs text-foreground-tertiary mb-2 px-1">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders) - reversed to show highest at top */}
      <div className="space-y-0.5 mb-2">
        {[...orderBook.asks].reverse().map((ask, index) => (
          <div
            key={`ask-${index}`}
            className="relative grid grid-cols-3 gap-2 text-xs py-1.5 px-1 rounded"
          >
            {/* Background bar */}
            <div
              className="absolute inset-y-0 right-0 bg-sell/10 rounded"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-sell font-medium">
              {formatPrice(ask.price)}
            </span>
            <span className="relative text-right text-foreground-secondary">
              {ask.size.toLocaleString()}
            </span>
            <span className="relative text-right text-foreground-secondary">
              {ask.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="flex items-center justify-center py-2 border-y border-border my-2">
        <span className="text-xs text-foreground-tertiary">
          Spread: {formatPrice(orderBook.spread)} ({((orderBook.spread) * 100).toFixed(1)}%)
        </span>
      </div>

      {/* Bids (Buy Orders) */}
      <div className="space-y-0.5">
        {orderBook.bids.map((bid, index) => (
          <div
            key={`bid-${index}`}
            className="relative grid grid-cols-3 gap-2 text-xs py-1.5 px-1 rounded"
          >
            {/* Background bar */}
            <div
              className="absolute inset-y-0 right-0 bg-buy/10 rounded"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-buy font-medium">
              {formatPrice(bid.price)}
            </span>
            <span className="relative text-right text-foreground-secondary">
              {bid.size.toLocaleString()}
            </span>
            <span className="relative text-right text-foreground-secondary">
              {bid.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
