"use client";

import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input, Button } from "@/components/ui";
import clsx from "clsx";

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterClick: () => void;
}

export function EventFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onFilterClick,
}: EventFiltersProps) {
  const t = useTranslations();
  
  const sortOptions = [
    { id: "volume", name: t("sort.volume") },
    { id: "liquidity", name: t("sort.liquidity") },
    { id: "expiry", name: t("sort.expiry") },
    { id: "change", name: t("sort.change") },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
      {/* Search */}
      <div className="flex-1">
        <Input
          placeholder={t("action.search")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Sort Tabs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-mono text-foreground-tertiary uppercase tracking-wider">
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t("sort.sort")}</span>
        </div>
        <div className="flex bg-background-secondary border border-border rounded-md p-0.5">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={clsx(
                "px-3 py-1.5 text-xs font-medium rounded-sm transition-all",
                sortBy === option.id
                  ? "bg-accent-primary text-background"
                  : "text-foreground-tertiary hover:text-foreground"
              )}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <Button
        variant="secondary"
        size="md"
        className="lg:hidden"
        onClick={onFilterClick}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("filter.filters")}
      </Button>
    </div>
  );
}
