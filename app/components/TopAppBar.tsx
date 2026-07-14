"use client";

import Image from "next/image";
import Link from "next/link";

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  showNotification?: boolean;
  showLogo?: boolean;
  centered?: boolean;
}

export default function TopAppBar({
  title = "TushMech",
  showBack = false,
  backHref = "/",
  showNotification = true,
  showLogo = true,
  centered = false,
}: TopAppBarProps) {
  return (
    <header className="fixed top-0 w-full bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 md:px-10 h-12 z-50">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link
            href={backHref}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface-container-low)] transition-colors active:opacity-80 -ml-2"
          >
            <span className="material-symbols-outlined text-[var(--on-surface-variant)]">arrow_back</span>
          </Link>
        )}
        {showLogo && (
          <Image
            className="w-8 h-8 rounded-md object-cover shadow-sm"
            src="/images/tushmech_logo.jpg"
            alt="TushMech Logo"
            width={32}
            height={32}
          />
        )}
        <span className="text-2xl font-semibold text-[var(--primary)] tracking-tight leading-8">
          {title}
        </span>
      </div>
      {centered && <div className="flex-1" />}
      <div className="flex items-center gap-2">
        {showNotification && (
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface-container-low)] transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[var(--primary)]">notifications</span>
          </button>
        )}
      </div>
    </header>
  );
}
