"use client";

import { useTranslations } from "next-intl";
import { X, Filter } from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  selectedPlatform: string;
  onPlatformSelect: (platform: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategorySelect,
  selectedPlatform,
  onPlatformSelect,
}: SidebarProps) {
  const t = useTranslations();

  const platforms = [
    { id: "all", name: t("filter.allPlatforms"), color: "bg-foreground-tertiary" },
    { id: "polymarket", name: "Polymarket", color: "bg-polymarket" },
    { id: "opinion", name: "Opinion Labs", color: "bg-opinion" },
  ];

  const categories = [
    { id: "all", name: t("category.all"), icon: "🌐" },
    { id: "crypto", name: t("category.crypto"), icon: "₿" },
    { id: "politics", name: t("category.politics"), icon: "🏛️" },
    { id: "sports", name: t("category.sports"), icon: "⚽" },
    { id: "tech", name: t("category.tech"), icon: "💻" },
    { id: "economics", name: t("category.economics"), icon: "📈" },
    { id: "science", name: t("category.science"), icon: "🔬" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:sticky top-0 lg:top-16 left-0 z-40 h-screen lg:h-[calc(100vh-4rem)] w-72 lg:w-64",
          "bg-background border-r border-border",
          "transform transition-transform duration-300 ease-out",
          "lg:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-accent" />
              <span className="font-semibold">{t("filter.filters")}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-background-tertiary rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Platform Filter */}
          <div className="mb-8">
            <h3 className="label-caps mb-3">
              {t("filter.platform")}
            </h3>
            <div className="space-y-0.5">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => onPlatformSelect(platform.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                    selectedPlatform === platform.id
                      ? "bg-background-tertiary text-foreground border-l-2 border-l-accent-primary"
                      : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                  )}
                >
                  <span className={clsx("h-2 w-2 rounded-full", platform.color)} />
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="label-caps mb-3">
              {t("filter.category")}
            </h3>
            <div className="space-y-0.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                    selectedCategory === category.id
                      ? "bg-background-tertiary text-foreground border-l-2 border-l-accent-primary"
                      : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                  )}
                >
                  <span className="text-base">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
