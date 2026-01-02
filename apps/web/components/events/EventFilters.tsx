"use client";

import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("action.search")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
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
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-sm transition-all",
                sortBy === option.id
                  ? "bg-accent-solid text-white shadow-sm"
                  : "text-foreground-tertiary hover:text-foreground hover:bg-background-tertiary"
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
        size="default"
        className="lg:hidden"
        onClick={onFilterClick}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("filter.filters")}
      </Button>
    </div>
  );
}
