"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        router.push("/login");
      }, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <Image
              src="/images/tushmech_logo.jpg"
              alt="TushMech Logo"
              width={120}
              height={120}
              className="rounded-2xl shadow-2xl border-2 border-white/10"
              priority
            />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white tracking-tight">TushMech</h1>
              <p className="text-sm text-[var(--inverse-primary)] mt-2 tracking-widest uppercase">Precision Autocare</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Hub Page */}
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] px-4 md:px-10 h-16 flex items-center gap-3">
          <Image
            src="/images/tushmech_logo.jpg"
            alt="TushMech"
            width={36}
            height={36}
            className="rounded-md shadow-sm"
          />
          <h1 className="text-2xl font-semibold text-[var(--primary)] tracking-tight">TushMech</h1>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8 md:py-12">
          {/* Hero */}
          <section className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] tracking-tight leading-tight mb-4">
              Precision Autocare<br />Ecosystem
            </h2>
            <p className="text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
              On-demand mobile mechanics, verified spare parts, embedded financing, and fleet-grade diagnostics — all in one premium O2O platform.
            </p>
          </section>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Customer */}
            <Link href="/customer/onboarding" className="group bg-[var(--primary-container)] text-[var(--on-primary)] rounded-xl p-8 flex flex-col justify-between min-h-[200px] shadow-level-2 hover:shadow-level-3 transition-all relative overflow-hidden border border-[var(--primary-container)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 pointer-events-none" />
              <div className="bg-white/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px] text-white">directions_car</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">Customer Portal</h3>
                <p className="text-[var(--inverse-primary)] opacity-80">Dashboard, book mechanics, shop parts, finance repairs</p>
              </div>
            </Link>

            {/* Mechanic */}
            <Link href="/mechanic/onboarding" className="group bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-8 flex flex-col justify-between min-h-[200px] shadow-level-1 hover:shadow-level-2 hover:border-[var(--secondary)] transition-all">
              <div className="bg-[var(--secondary-container)]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px] text-[var(--secondary)]">build</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--primary)] mb-1">Mechanic Portal</h3>
                <p className="text-[var(--on-surface-variant)]">Profile, wallet, dispatch, earnings & tool loans</p>
              </div>
            </Link>

            {/* Admin */}
            <Link href="/admin/onboarding" className="group bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-8 flex flex-col justify-between min-h-[200px] shadow-level-1 hover:shadow-level-2 hover:border-[var(--secondary)] transition-all">
              <div className="bg-[var(--secondary-container)]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px] text-[var(--secondary)]">admin_panel_settings</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--primary)] mb-1">Admin Control</h3>
                <p className="text-[var(--on-surface-variant)]">Live control room, QA queue, report review</p>
              </div>
            </Link>

            {/* Vendor */}
            <Link href="/vendor/inventory" className="group bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-8 flex flex-col justify-between min-h-[200px] shadow-level-1 hover:shadow-level-2 hover:border-[var(--secondary)] transition-all">
              <div className="bg-[var(--secondary-container)]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px] text-[var(--secondary)]">inventory_2</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--primary)] mb-1">Vendor Hub</h3>
                <p className="text-[var(--on-surface-variant)]">Inventory management, escrow payouts, QA reports</p>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "handyman", label: "Book Mechanic", href: "/customer/booking" },
              { icon: "shopping_cart", label: "Gadget Shop", href: "/customer/shop" },
              { icon: "receipt_long", label: "Checkout", href: "/customer/checkout" },
              { icon: "health_and_safety", label: "Diagnostics", href: "/customer/diagnostic-report" },
              { icon: "account_balance_wallet", label: "Wallet", href: "/mechanic/wallet" },
              { icon: "local_shipping", label: "Dispatch", href: "/mechanic/dispatch" },
              { icon: "calculate", label: "Finance", href: "/customer/finance" },
              { icon: "monitoring", label: "Earnings", href: "/mechanic/earnings" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-level-1 hover:border-[var(--secondary)] transition-all group"
              >
                <span className="material-symbols-outlined text-[28px] text-[var(--secondary)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-xs font-semibold text-[var(--on-surface)] text-center">{item.label}</span>
              </Link>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--outline-variant)] py-6 px-4 text-center">
          <p className="text-xs text-[var(--on-surface-variant)]">
            © 2026 TushMech — Precision Autocare Ecosystem. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
