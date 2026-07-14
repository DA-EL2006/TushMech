"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

interface MechanicProfile { fullName: string; serviceArea: string; [key: string]: string; }

export default function MechanicDashboard() {
  const [profile, setProfile] = useState<MechanicProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tushmech_mechanic_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : "Sarah";
  const location = profile?.serviceArea || "Abuja FCT";

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopAppBar title="Mechanic Dashboard" />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">Welcome back, {firstName}</h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">{location} · Active Duty</p>
          </div>
          <div className="flex items-center gap-2 bg-[var(--verification-green)]/10 px-3 py-1.5 rounded-full border border-[var(--verification-green)]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--verification-green)] animate-pulse" />
            <span className="text-xs font-bold text-[var(--verification-green)] uppercase tracking-wider">Online</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-[var(--secondary)] text-[28px] mb-2">assignment_turned_in</span>
            <p className="text-2xl font-bold text-[var(--primary)]">12</p>
            <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Jobs Completed</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-amber-500 text-[28px] mb-2" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
            <p className="text-2xl font-bold text-[var(--primary)]">4.9</p>
            <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-green-600 text-[28px] mb-2" style={{fontVariationSettings:"'FILL' 1"}}>payments</span>
            <p className="text-2xl font-bold text-[var(--primary)]">₦ 84k</p>
            <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Earned This Week</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-blue-500 text-[28px] mb-2">schedule</span>
            <p className="text-2xl font-bold text-[var(--primary)]">38h</p>
            <p className="text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Hours Logged</p>
          </div>
        </div>

        {/* Current / Incoming Job */}
        <div className="bg-[var(--primary-container)] rounded-2xl p-6 shadow-level-2 border border-[var(--outline-variant)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--deep-navy)]/20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider animate-pulse">SOS Dispatch</span>
              <span className="text-sm font-semibold text-white/80">3.2 km away</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Toyota Camry 2016</h2>
            <p className="text-white/80 text-sm mb-4">Complete Breakdown · Stranded mid-road</p>
            
            <div className="flex gap-3 mt-6">
              <Link href="/mechanic/dispatch" className="flex-1 bg-white text-[var(--primary-container)] h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                <span className="material-symbols-outlined">navigation</span> View Route
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <h3 className="text-base font-bold text-[var(--primary)]">Recent Jobs</h3>
          </div>
          <div className="divide-y divide-[var(--outline-variant)]">
            {[
              { id: "JOB-4882", car: "Honda Civic 2018", type: "Full Servicing", status: "Completed", date: "Today, 10:30 AM" },
              { id: "JOB-4871", car: "Ford Explorer 2020", type: "Brake Pad Replacement", status: "Completed", date: "Yesterday, 2:15 PM" },
              { id: "JOB-4850", car: "Lexus RX350 2015", type: "Diagnostics", status: "Completed", date: "Oct 12, 4:00 PM" },
            ].map(job => (
              <div key={job.id} className="p-4 flex items-center justify-between hover:bg-[var(--surface-container-lowest)] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[var(--on-surface-variant)] text-[20px]">build</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--primary)]">{job.car}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{job.type} · {job.date}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[var(--on-surface-variant)]">{job.status}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-sm font-bold text-[var(--secondary)] hover:bg-[var(--surface-container-lowest)] transition-colors border-t border-[var(--outline-variant)]">
            View All History
          </button>
        </div>
      </main>

      <BottomNavBar activeTab="Home" items={[
        { icon: "dashboard", label: "Home", href: "/mechanic/dashboard" },
        { icon: "assignment", label: "Dispatch", href: "/mechanic/dispatch" },
        { icon: "account_balance_wallet", label: "Earnings", href: "/mechanic/wallet" },
        { icon: "person", label: "Profile", href: "/mechanic/profile" },
      ]} />
    </div>
  );
}
