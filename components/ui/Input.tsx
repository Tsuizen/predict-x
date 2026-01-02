"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-foreground-tertiary">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full bg-background-secondary border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-sell focus:ring-sell/50"
              : "border-border hover:border-border-hover",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-foreground-tertiary">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
