"use client";

import Image from "next/image";
import Link from "next/link";

interface AdminSideNavProps {
  activeItem?: string;
}

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin/control-room" },
  { icon: "my_location", label: "Live Control", href: "/admin/control-room" },
  { icon: "build", label: "Mechanics", href: "#" },
  { icon: "assignment", label: "QA Queue", href: "/admin/qa-queue" },
  { icon: "settings", label: "Settings", href: "#" },
];

export default function AdminSideNav({ activeItem = "Live Control" }: AdminSideNavProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[var(--surface-container-lowest)] border-r border-[var(--outline-variant)] shadow-[4px_0_8px_rgba(0,0,0,0.02)] z-40 fixed h-full left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-[var(--outline-variant)] gap-3">
        <Image
          alt="TushMech Logo"
          className="h-8 w-8 object-contain rounded-md shadow-sm border border-[var(--outline-variant)]/30"
          src="/images/tushmech_logo.jpg"
          width={32}
          height={32}
        />
        <span className="text-2xl font-semibold text-[var(--primary)] tracking-tight">TushMech</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors group ${
                isActive
                  ? "bg-[var(--secondary-container)]/10 text-[var(--secondary)] border-r-2 border-[var(--secondary)] relative"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]"
              }`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? "text-[var(--secondary)]" : "text-[var(--outline)] group-hover:text-[var(--primary)]"} transition-colors`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-[var(--outline-variant)]">
        <div className="flex items-center space-x-2">
          <Image
            className="w-8 h-8 rounded-full object-cover"
            src="/images/admin_user.jpg"
            alt="Admin User"
            width={32}
            height={32}
          />
          <div>
            <div className="text-xs font-semibold text-[var(--on-surface)]">Admin User</div>
            <div className="text-xs text-[var(--on-surface-variant)]">System Operator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
