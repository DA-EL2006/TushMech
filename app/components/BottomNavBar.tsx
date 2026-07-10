"use client";

import Link from "next/link";

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

interface BottomNavBarProps {
  activeTab?: string;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
  { icon: "directions_car", label: "Garage", href: "/customer/booking" },
  { icon: "handshake", label: "Market", href: "/customer/shop" },
  { icon: "account_balance_wallet", label: "Profile", href: "/mechanic/wallet" },
];

export default function BottomNavBar({ activeTab = "Home", items = defaultItems }: BottomNavBarProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-[var(--surface-container-lowest)] shadow-[0_-4px_8px_rgba(0,0,0,0.02)] border-t border-[var(--outline-variant)] rounded-t-xl">
      {items.map((item) => {
        const isActive = item.label === activeTab;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all active:scale-95 duration-200 ${
              isActive
                ? "text-[var(--secondary)] bg-[var(--secondary-container)]/10 rounded-full px-4 py-1"
                : "text-[var(--on-surface-variant)] hover:text-[var(--secondary)]"
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? "fill" : ""}`}>{item.icon}</span>
            <span className={`text-xs mt-1 ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
