"use client";

import Image from "next/image";
import Link from "next/link";

interface VendorSideNavProps {
  activeItem?: string;
}

const navItems = [
  { icon: "grid_view", label: "Overview", href: "#" },
  { icon: "map", label: "Live Map", href: "#" },
  { icon: "inventory_2", label: "Inventory", href: "/vendor/inventory" },
  { icon: "payments", label: "Escrow Payouts", href: "#" },
  { icon: "fact_check", label: "QA Reports", href: "#" },
];

export default function VendorSideNav({ activeItem = "Inventory" }: VendorSideNavProps) {
  return (
    <aside className="w-64 bg-[var(--primary-container)] text-[var(--on-primary)] h-full hidden md:flex flex-col flex-shrink-0 z-20 shadow-level-2">
      <div className="p-6 border-b border-[var(--surface-tint)]/50 flex items-center gap-3">
        <Image
          className="w-8 h-8 object-contain rounded"
          src="/images/tushmech_logo.jpg"
          alt="TushMech Logo"
          width={32}
          height={32}
        />
        <h1 className="text-2xl font-semibold text-[var(--on-primary)] tracking-tight">TushMech</h1>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--on-primary)] shadow-sm"
                  : "text-[var(--on-primary-container)] hover:bg-[var(--surface-tint)] hover:text-[var(--on-primary)]"
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-[var(--surface-tint)]/50 flex items-center gap-3 hover:bg-[var(--surface-tint)] transition-colors cursor-pointer">
        <Image
          className="w-9 h-9 rounded-full object-cover border-2 border-[var(--surface-tint)]"
          src="/images/vendor_manager.jpg"
          alt="Vendor Manager"
          width={36}
          height={36}
        />
        <div>
          <p className="text-sm font-medium text-[var(--on-primary)]">Sarah Jenkins</p>
          <p className="text-xs text-[var(--on-primary-container)]">Vendor Relations</p>
        </div>
      </div>
    </aside>
  );
}
