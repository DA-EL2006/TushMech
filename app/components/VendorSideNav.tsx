"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface VendorProfile { contactName: string; businessName: string; [key: string]: string; }

interface VendorSideNavProps {
  activeItem?: string;
}

const navItems = [
  { icon: "grid_view", label: "Overview", href: "/vendor/overview" },
  { icon: "inventory_2", label: "Inventory", href: "/vendor/inventory" },
  { icon: "receipt_long", label: "Orders", href: "/vendor/orders" },
  { icon: "account_balance", label: "Payouts", href: "/vendor/payouts" },
  { icon: "fact_check", label: "QA Reports", href: "/vendor/qa-reports" },
];

export default function VendorSideNav({ activeItem = "Inventory" }: VendorSideNavProps) {
  const [profile, setProfile] = useState<VendorProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tushmech_vendor_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const vendorName = profile?.contactName || "Sarah Jenkins";
  const businessName = profile?.businessName || "Vendor Relations";

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
          <p className="text-sm font-medium text-[var(--on-primary)] line-clamp-1">{vendorName}</p>
          <p className="text-xs text-[var(--on-primary-container)] line-clamp-1">{businessName}</p>
        </div>
      </div>
    </aside>
  );
}
