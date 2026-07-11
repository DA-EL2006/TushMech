"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // placeholder to prevent layout shift
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors active:scale-95"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined text-[24px]">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
