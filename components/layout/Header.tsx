"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    setLocale(cookieLocale || "en");
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    setLocale(newLocale);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Amber accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
      
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-background-tertiary rounded-md transition-colors focus-ring"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 border-2 border-accent-primary rounded-sm rotate-45 group-hover:rotate-[50deg] transition-transform duration-300" />
              <div className="w-3 h-3 bg-accent-primary rounded-[1px]" />
            </div>
            <span className="text-xl font-display tracking-tight hidden sm:block">
              Predict<span className="text-accent">X</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"}>
              {t("nav.markets")}
            </NavLink>
            <NavLink href="/portfolio" active={pathname === "/portfolio"}>
              {t("nav.portfolio")}
            </NavLink>
            <NavLink href="/activity" active={pathname === "/activity"}>
              {t("nav.activity")}
            </NavLink>
          </nav>
        </div>

        {/* Right: Theme Toggle, Language, Connect Wallet */}
        <div className="flex items-center gap-2">
          {/* Language Toggle - Fixed width to prevent layout shift */}
          <button
            onClick={toggleLocale}
            className="w-10 h-10 flex items-center justify-center hover:bg-background-tertiary rounded-md transition-colors text-foreground-secondary hover:text-foreground focus-ring"
            title={mounted && locale === "en" ? "切换到中文" : "Switch to English"}
          >
            <span className="text-xs font-mono font-medium">
              {mounted ? (locale === "en" ? "中" : "EN") : ""}
            </span>
          </button>

          {/* Theme Toggle - Fixed width to prevent layout shift */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center hover:bg-background-tertiary rounded-md transition-colors text-foreground-secondary hover:text-foreground focus-ring"
            title={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" /> // Placeholder to prevent layout shift
            )}
          </button>

          {/* Connect Wallet Button */}
          <Button variant="primary" size="default">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{t("action.connectWallet")}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        active
          ? "text-foreground bg-background-tertiary"
          : "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent-primary rounded-full" />
      )}
    </Link>
  );
}
