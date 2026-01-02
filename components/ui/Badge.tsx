"use client";

import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "polymarket" | "opinion" | "success" | "danger" | "warning";
  size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center font-mono font-medium rounded-sm uppercase tracking-wider transition-colors";

    const variants = {
      default: "bg-background-tertiary text-foreground-secondary border border-border",
      polymarket: "bg-polymarket/10 text-polymarket border border-polymarket/30",
      opinion: "bg-opinion/10 text-opinion border border-opinion/30",
      success: "bg-color-buy/10 text-buy border border-buy/30",
      danger: "bg-color-sell/10 text-sell border border-sell/30",
      warning: "bg-accent-primary/10 text-accent border border-accent-primary/30",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-[10px]",
      md: "px-2.5 py-1 text-xs",
    };

    return (
      <span
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
