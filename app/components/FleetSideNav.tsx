"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function FleetSideNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Fleet Overview", href: "/fleet/dashboard", icon: "dashboard" },
    { label: "Vehicles", href: "/fleet/vehicles", icon: "directions_car" },
    { label: "Service History", href: "/fleet/history", icon: "history" },
    { label: "Billing & Subscriptions", href: "/fleet/billing", icon: "receipt_long" },
    { label: "Driver Roster", href: "/fleet/drivers", icon: "groups" },
  ];

  return (
    <aside className="w-64 bg-[var(--surface-bright)] border-r border-[var(--outline-variant)] h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 pb-2">
        <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={40} height={40} className="rounded-xl mb-4" />
        <h2 className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Fleet Portal</h2>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--primary)]"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "fill text-[var(--electric-blue)]" : ""}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--outline-variant)]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-[var(--electric-blue)] text-white rounded-full flex items-center justify-center font-bold">
            AL
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--primary)] truncate">Abuja Logistics Co.</p>
            <p className="text-xs text-[var(--on-surface-variant)] truncate">Enterprise Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
