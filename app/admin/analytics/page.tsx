"use client";
import { useState } from "react";
import AdminSideNav from "../../components/AdminSideNav";

const NEIGHBOURHOODS = [
  { name: "Wuse Zone 5", jobs: 38, revenue: 1420000, mechanics: 7, rating: 4.9 },
  { name: "Gwarinpa", jobs: 31, revenue: 1180000, mechanics: 5, rating: 4.7 },
  { name: "Garki Area 11", jobs: 26, revenue: 940000, mechanics: 4, rating: 4.8 },
  { name: "Maitama", jobs: 22, revenue: 1105000, mechanics: 3, rating: 4.9 },
  { name: "Jabi District", jobs: 19, revenue: 760000, mechanics: 4, rating: 4.6 },
  { name: "Kubwa", jobs: 15, revenue: 540000, mechanics: 3, rating: 4.5 },
  { name: "Asokoro", jobs: 13, revenue: 650000, mechanics: 2, rating: 4.8 },
];

const MONTHLY = [
  { month: "Apr", jobs: 84, revenue: 3200000 },
  { month: "May", jobs: 97, revenue: 3750000 },
  { month: "Jun", jobs: 112, revenue: 4280000 },
  { month: "Jul", jobs: 128, revenue: 4920000 },
  { month: "Aug", jobs: 119, revenue: 4560000 },
  { month: "Sep", jobs: 143, revenue: 5480000 },
  { month: "Oct", jobs: 164, revenue: 6350000 },
];

const TOP_SERVICES = [
  { name: "Diagnostics", pct: 34, color: "#2196F3" },
  { name: "Oil & Filter", pct: 22, color: "#4CAF50" },
  { name: "Brake Service", pct: 16, color: "#FF9800" },
  { name: "Suspension", pct: 12, color: "#9C27B0" },
  { name: "Engine Work", pct: 10, color: "#F44336" },
  { name: "Others", pct: 6, color: "#9E9E9E" },
];

const maxJobs = Math.max(...MONTHLY.map(m => m.jobs));
const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue));

function Kpi({ icon, label, value, sub, color }: { icon: string; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">{label}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <span className="material-symbols-outlined text-[20px]" style={{ color }}>{icon}</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-[var(--primary)]">{value}</p>
      <p className="text-xs text-[var(--on-surface-variant)]">{sub}</p>
    </div>
  );
}

export default function AdminAnalytics() {
  const [period, setPeriod] = useState<"week" | "month" | "all">("month");

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="Analytics" />
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] px-6 md:px-10 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Analytics Dashboard</h1>
            <p className="text-xs text-[var(--on-surface-variant)]">Abuja FCT Operations · Live data</p>
          </div>
          <div className="flex gap-1.5 border border-[var(--outline-variant)] rounded-lg p-1 bg-[var(--surface-container-low)]">
            {(["week","month","all"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 h-7 rounded text-xs font-semibold capitalize transition-all ${period === p ? "bg-[var(--primary)] text-white" : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]"}`}>
                {p === "all" ? "All Time" : p === "month" ? "This Month" : "This Week"}
              </button>
            ))}
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">

          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Kpi icon="handyman" label="Total Jobs" value="164" sub="+14.7% vs last month" color="#2196F3" />
            <Kpi icon="payments" label="Total Revenue" value="₦6.35M" sub="+17.3% vs last month" color="#4CAF50" />
            <Kpi icon="engineering" label="Active Mechanics" value="28" sub="Abuja FCT · 3 on SOS standby" color="#FF9800" />
            <Kpi icon="star" label="Avg. Rating" value="4.82 ★" sub="Across all completed jobs" color="#9C27B0" />
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-[var(--primary)]">Jobs & Revenue — Monthly Trend</h2>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#2196F3] inline-block" />Jobs</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#4CAF50] inline-block" />Revenue</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-44">
              {MONTHLY.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-end gap-0.5 w-full">
                    <div className="flex-1 bg-[#2196F3] rounded-t-sm transition-all hover:opacity-80 relative group"
                      style={{ height: `${(m.jobs / maxJobs) * 160}px` }}>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{m.jobs} jobs</span>
                    </div>
                    <div className="flex-1 bg-[#4CAF50] rounded-t-sm transition-all hover:opacity-80 relative group"
                      style={{ height: `${(m.revenue / maxRevenue) * 160}px` }}>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">₦{(m.revenue/1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--on-surface-variant)]">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services + Neighbourhood side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service breakdown */}
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-6 shadow-sm">
              <h2 className="text-base font-bold text-[var(--primary)] mb-5">Top Services This Month</h2>
              <div className="space-y-3">
                {TOP_SERVICES.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[var(--on-surface)]">{s.name}</span>
                      <span className="font-bold" style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="h-2 bg-[var(--surface-container-low)] rounded-full overflow-hidden">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighbourhood performance */}
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--outline-variant)]">
                <h2 className="text-base font-bold text-[var(--primary)]">Performance by Neighbourhood</h2>
                <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Abuja FCT · October 2024</p>
              </div>
              <div className="divide-y divide-[var(--outline-variant)]">
                {NEIGHBOURHOODS.map((n, i) => (
                  <div key={n.name} className="px-5 py-3 flex items-center gap-3 hover:bg-[var(--surface-container-lowest)] transition-colors">
                    <span className="text-sm font-bold text-[var(--on-surface-variant)] w-5">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--primary)]">{n.name}</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">{n.mechanics} mechanics · ⭐ {n.rating}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-[var(--primary)]">{n.jobs} jobs</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">₦{(n.revenue/1000).toFixed(0)}k</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOS & Hub summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">SOS Dispatches</h3>
              </div>
              <p className="text-3xl font-bold text-[var(--primary)]">23</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">This month · Avg. response 6.4 min</p>
              <div className="mt-3 flex gap-2 text-[10px]">
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">8 Breakdowns</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">6 Flat Tyres</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>warehouse</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">Hub Drop-offs</h3>
              </div>
              <p className="text-3xl font-bold text-[var(--primary)]">41</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">This month · 3 hubs across Abuja</p>
              <div className="mt-3 flex gap-2 text-[10px]">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">18 Overhauls</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">9 Engine</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">Escrow Cleared</h3>
              </div>
              <p className="text-3xl font-bold text-[var(--primary)]">₦4.1M</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">This month · 94% on-time release rate</p>
              <div className="mt-3 flex gap-2 text-[10px]">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">2 Disputes</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-semibold">1 Pending</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
