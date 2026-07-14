"use client";
import Image from "next/image";
import BottomNavBar from "../../components/BottomNavBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function CustomerProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState({ fullName: "TushMech Customer", phone: "08102909304", email: "demo@tushmech.ng" });
  const [stats, setStats] = useState({ vehicles: 0, repairs: 0, spent: "₦0" });

  useEffect(() => {
    if (status === "authenticated") {
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/user/profile");
          if (res.ok) {
            const data = await res.json();
            setProfile({
              fullName: data.user.name || "TushMech Customer",
              phone: data.user.phone || "No phone added",
              email: data.user.email || "No email added",
            });
          }
          
          // Also fetch vehicle count
          const vRes = await fetch("/api/vehicles");
          if (vRes.ok) {
            const vData = await vRes.json();
            setStats(s => ({ ...s, vehicles: vData.vehicles.length }));
          }
        } catch (e) {}
      };
      fetchProfile();
    } else if (status === "unauthenticated") {
      // Fallback for demo
      const storedStr = localStorage.getItem("tushmech_user");
      if (storedStr) {
        try {
          const stored = JSON.parse(storedStr);
          if (stored.fullName) {
            setProfile(stored);
          }
        } catch (e) {}
      }
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header Profile Area */}
      <div className="bg-[var(--primary-container)] text-white pt-12 pb-20 px-6 rounded-b-[2.5rem] shadow-level-2 relative">
        <div className="flex flex-col items-center mt-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-[var(--primary-container)] shadow-[0_0_0_2px_rgba(255,255,255,0.2)] mb-4 overflow-hidden bg-white flex items-center justify-center">
             <span className="material-symbols-outlined text-[48px] text-[var(--primary)]">person</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{profile.fullName}</h1>
          <p className="text-[var(--primary-fixed-dim)] text-sm mb-4">{profile.email}</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{stats.vehicles}</span>
              <span className="text-xs text-[var(--on-primary-container)]">Vehicles</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{stats.repairs}</span>
              <span className="text-xs text-[var(--on-primary-container)]">Repairs</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{stats.spent}</span>
              <span className="text-xs text-[var(--on-primary-container)]">Spent</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-10 space-y-6 relative z-10">
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/customer/garage" className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[var(--surface-container-low)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[var(--primary-container)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--primary)]">garage</span>
            </div>
            <span className="text-sm font-semibold text-[var(--on-surface)]">My Garage</span>
          </Link>
          <Link href="/customer/my-report" className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-4 flex flex-col items-center justify-center gap-2 hover:bg-[var(--surface-container-low)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[var(--secondary-container)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--secondary)]">receipt_long</span>
            </div>
            <span className="text-sm font-semibold text-[var(--on-surface)]">Invoices</span>
          </Link>
        </div>

        {/* Account Details */}
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] overflow-hidden">
          <div className="p-6 border-b border-[var(--outline-variant)]">
            <h2 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              Account Details
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[var(--outline-variant)]">
              <div>
                <p className="text-xs text-[var(--on-surface-variant)] mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-[var(--on-surface)]">{profile.phone}</p>
              </div>
              <button className="text-[var(--secondary)] text-sm font-semibold">Edit</button>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[var(--outline-variant)]">
              <div>
                <p className="text-xs text-[var(--on-surface-variant)] mb-1">Email Address</p>
                <p className="text-sm font-semibold text-[var(--on-surface)]">{profile.email}</p>
              </div>
              <button className="text-[var(--secondary)] text-sm font-semibold">Edit</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-[var(--on-surface-variant)] mb-1">Password</p>
                <p className="text-sm font-semibold text-[var(--on-surface)]">••••••••</p>
              </div>
              <button className="text-[var(--secondary)] text-sm font-semibold">Change</button>
            </div>
          </div>
        </section>

        {/* Preferences & Support */}
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] overflow-hidden mb-4">
          <div className="p-6 space-y-4">
            <Link href="#" className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[var(--on-surface-variant)]">notifications</span>
                <span className="text-sm font-semibold text-[var(--on-surface)]">Notification Settings</span>
              </div>
              <span className="material-symbols-outlined text-[var(--on-surface-variant)]">chevron_right</span>
            </Link>
            <Link href="#" className="flex items-center justify-between hover:opacity-80 transition-opacity pt-4 border-t border-[var(--outline-variant)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[var(--on-surface-variant)]">help</span>
                <span className="text-sm font-semibold text-[var(--on-surface)]">Help & Support</span>
              </div>
              <span className="material-symbols-outlined text-[var(--on-surface-variant)]">chevron_right</span>
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center justify-between hover:opacity-80 transition-opacity pt-4 border-t border-[var(--outline-variant)] text-[var(--error)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-semibold">Log Out</span>
              </div>
            </button>
          </div>
        </section>
      </main>

      <BottomNavBar activeTab="Profile" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/profile" },
      ]} />
    </div>
  );
}
