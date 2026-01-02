"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Header, Sidebar } from "@/components/layout";
import { EventList, EventFilters } from "@/components/events";
import { mockMarkets } from "@/lib/mockData";

export default function Home() {
  const t = useTranslations();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let filtered = [...mockMarkets];

    // Platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter((m) => m.platform === selectedPlatform);
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (m) => m.category.toLowerCase() === selectedCategory
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "volume":
        filtered.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case "liquidity":
        filtered.sort((a, b) => b.liquidity - a.liquidity);
        break;
      case "expiry":
        filtered.sort(
          (a, b) =>
            new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
        );
        break;
      case "change":
        filtered.sort(
          (a, b) => Math.abs(b.yesChange24h) - Math.abs(a.yesChange24h)
        );
        break;
    }

    return filtered;
  }, [mockMarkets, selectedPlatform, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          selectedPlatform={selectedPlatform}
          onPlatformSelect={setSelectedPlatform}
        />

        <main className="flex-1 p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-display text-foreground mb-1">
              {t("page.marketsTitle")}
            </h1>
            <p className="text-sm text-foreground-tertiary">
              {t("page.marketsDesc")}
            </p>
          </div>

          {/* Filters */}
          <EventFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFilterClick={() => setSidebarOpen(true)}
          />

          {/* Results count */}
          <div className="text-xs font-mono text-foreground-tertiary mb-4 tabular-nums">
            {t("market.markets", { count: filteredMarkets.length })}
          </div>

          {/* Event List */}
          <EventList markets={filteredMarkets} />
        </main>
      </div>
    </div>
  );
}
