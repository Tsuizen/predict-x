"use client";

import { useState } from "react";
import { Lock, Info } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Market, formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TradingPanelProps {
  market: Market;
}

export function TradingPanel({ market }: TradingPanelProps) {
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const currentPrice = side === "yes" ? market.yesPrice : market.noPrice;
  const estimatedShares = amount
    ? parseFloat(amount) / currentPrice
    : 0;

  const quickAmounts = [100, 500, 1000];

  return (
    <div className="bg-background-secondary border border-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Place Order</h3>

      {/* Side Selection */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setSide("yes")}
          className={cn(
            "py-3 rounded-lg font-semibold text-sm transition-all",
            side === "yes"
              ? "bg-buy text-white shadow-lg"
              : "bg-buy/10 text-buy hover:bg-buy/20"
          )}
        >
          YES {formatPrice(market.yesPrice)}
        </button>
        <button
          onClick={() => setSide("no")}
          className={cn(
            "py-3 rounded-lg font-semibold text-sm transition-all",
            side === "no"
              ? "bg-sell text-white shadow-lg"
              : "bg-sell/10 text-sell hover:bg-sell/20"
          )}
        >
          NO {formatPrice(market.noPrice)}
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="text-xs text-foreground-tertiary block mb-2">
          Order Type
        </label>
        <div className="flex bg-background-tertiary rounded-lg p-1">
          <button
            onClick={() => setOrderType("market")}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-all",
              orderType === "market"
                ? "bg-accent-solid text-white shadow"
                : "text-foreground-tertiary hover:text-foreground"
            )}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-all",
              orderType === "limit"
                ? "bg-accent-solid text-white shadow"
                : "text-foreground-tertiary hover:text-foreground"
            )}
          >
            Limit
          </button>
        </div>
      </div>

      {/* Limit Price (if limit order) */}
      {orderType === "limit" && (
        <div className="mb-4">
          <label className="text-xs text-foreground-tertiary block mb-2">
            Limit Price
          </label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.00"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              USDC
            </span>
          </div>
        </div>
      )}

      {/* Amount */}
      <div className="mb-4">
        <label className="text-xs text-foreground-tertiary block mb-2">
          Amount
        </label>
        <div className="relative">
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pr-14"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            USDC
          </span>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex gap-2 mb-4">
        {quickAmounts.map((qa) => (
          <button
            key={qa}
            onClick={() => setAmount(qa.toString())}
            className="flex-1 py-2 text-sm font-medium bg-background-tertiary text-foreground-secondary rounded-lg hover:bg-background-elevated hover:text-foreground border border-border transition-all"
          >
            ${qa}
          </button>
        ))}
        <button
          onClick={() => setAmount("10000")}
          className="flex-1 py-2 text-sm font-medium bg-background-tertiary text-foreground-secondary rounded-lg hover:bg-background-elevated hover:text-foreground border border-border transition-all"
        >
          Max
        </button>
      </div>

      {/* Estimate */}
      <div className="bg-background-tertiary rounded-lg p-3 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-foreground-tertiary">Est. Shares</span>
          <span className="text-foreground font-medium">
            {estimatedShares.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-tertiary">Price per Share</span>
          <span className="text-foreground font-medium">
            {formatPrice(orderType === "limit" && limitPrice ? parseFloat(limitPrice) : currentPrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-tertiary flex items-center gap-1">
            Slippage
            <Info className="h-3 w-3" />
          </span>
          <span className="text-foreground font-medium">~0.5%</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        variant={side === "yes" ? "success" : "danger"}
        size="lg"
        className="w-full"
      >
        <Lock className="h-4 w-4" />
        Connect Wallet to Trade
      </Button>
    </div>
  );
}
