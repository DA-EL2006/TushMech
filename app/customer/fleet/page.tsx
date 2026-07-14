"use client";
import { useState } from "react";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

const FLEET_VEHICLES = [
  { id: "FLT-001", make: "Toyota", model: "Hiace", plate: "ABJ-823XY", status: "Active", nextService: "12 Nov 2024", mileage: "125,400 km" },
  { id: "FLT-002", make: "Toyota", model: "Hilux", plate: "ABJ-912XZ", status: "In Workshop", nextService: "Currently in Service", mileage: "89,200 km" },
  { id: "FLT-003", make: "Ford", model: "Transit", plate: "ABJ-445AQ", status: "Active", nextService: "28 Nov 2024", mileage: "142,100 km" },
  { id: "FLT-004", make: "Toyota", model: "Corolla", plate: "ABJ-118BB", status: "Requires Attention", nextService: "Overdue (2 days)", mileage: "210,500 km" },
];

const INVOICES = [
  { id: "INV-2024-10", date: "31 Oct 2024", amount: 450000, status: "Unpaid", due: "15 Nov 2024", jobs: 12 },
  { id: "INV-2024-09", date: "30 Sep 2024", amount: 385000, status: "Paid", due: "15 Oct 2024", jobs: 9 },
  { id: "INV-2024-08", date: "31 Aug 2024", amount: 512000, status: "Paid", due: "15 Sep 2024", jobs: 14 },
];

export default function FleetModule() {
  const [tab, setTab] = useState<"vehicles" | "billing">("vehicles");

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopAppBar showBack backHref="/customer/dashboard" title="Fleet Management" centered={false} />
      
      <main className="pt-16 max-w-4xl mx-auto px-4">
        {/* Header / Summary */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary)]">Corporate Fleet</h1>
              <p className="text-sm text-[var(--on-surface-variant)] mt-1">Abuja Logistics Branch</p>
            </div>
            <div className="bg-[var(--secondary)]/10 p-3 rounded-xl border border-[var(--secondary)]/20 text-center">
              <p className="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-wider">Credit Limit</p>
              <p className="text-lg font-bold text-[var(--primary)]">₦2.5M</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-[var(--primary)]">14</p>
              <p className="text-[10px] font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mt-1">Total Vehicles</p>
            </div>
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-amber-500">2</p>
              <p className="text-[10px] font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mt-1">Needs Service</p>
            </div>
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-red-500">1</p>
              <p className="text-[10px] font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mt-1">Unpaid Invoice</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--outline-variant)] mb-6">
            {(["vehicles", "billing"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-semibold capitalize relative transition-colors ${tab === t ? "text-[var(--secondary)]" : "text-[var(--on-surface-variant)]"}`}>
                {t === "vehicles" ? "Fleet Vehicles" : "Consolidated Billing"}
                {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--secondary)] rounded-full" />}
              </button>
            ))}
          </div>

          {/* Tab Content: Vehicles */}
          {tab === "vehicles" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-sm">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] text-[20px]">search</span>
                  <input type="text" placeholder="Search by plate or ID..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-sm focus:border-[var(--secondary)] outline-none" />
                </div>
                <button className="h-10 px-4 ml-3 bg-[var(--secondary)] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span> Add Vehicle
                </button>
              </div>

              <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--surface-container-low)]/50 border-b border-[var(--outline-variant)]">
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Vehicle ID</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Details</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Status</th>
                        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Next Service</th>
                        <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--outline-variant)]">
                      {FLEET_VEHICLES.map(v => (
                        <tr key={v.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors">
                          <td className="px-5 py-4 font-mono text-xs font-bold text-[var(--secondary)]">{v.id}</td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-[var(--primary)]">{v.make} {v.model}</p>
                            <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">{v.plate} • {v.mileage}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                              v.status === "Active" ? "bg-green-100 text-green-700" :
                              v.status === "In Workshop" ? "bg-blue-100 text-blue-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {v.status === "Requires Attention" && <span className="material-symbols-outlined text-[14px]">warning</span>}
                              {v.status}
                            </span>
                          </td>
                          <td className={`px-5 py-4 text-xs font-semibold ${v.nextService.includes('Overdue') ? 'text-red-600' : 'text-[var(--on-surface-variant)]'}`}>
                            {v.nextService}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <Link href="/customer/booking" className="text-[var(--secondary)] hover:bg-[var(--secondary)]/10 p-2 rounded-full inline-flex transition-colors">
                              <span className="material-symbols-outlined text-[20px]">build</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Billing */}
          {tab === "billing" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[var(--primary-container)] to-[var(--deep-navy)] rounded-xl p-6 text-white shadow-level-2 border border-[var(--primary-container)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-1">Current Outstanding Balance</p>
                    <p className="text-4xl font-bold">₦450,000</p>
                    <p className="text-white/70 text-xs mt-2">Due by 15 Nov 2024</p>
                  </div>
                  <button className="bg-[var(--secondary)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap">
                    Pay Current Invoice
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Invoice History</h3>
                <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[var(--surface-container-low)]/50 border-b border-[var(--outline-variant)]">
                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Invoice #</th>
                          <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Date</th>
                          <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Jobs Covered</th>
                          <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Amount</th>
                          <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Status</th>
                          <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">PDF</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--outline-variant)]">
                        {INVOICES.map(inv => (
                          <tr key={inv.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors">
                            <td className="px-5 py-4 font-mono text-xs font-bold text-[var(--secondary)]">{inv.id}</td>
                            <td className="px-5 py-4 text-xs font-medium text-[var(--on-surface-variant)]">{inv.date}</td>
                            <td className="px-5 py-4 text-center font-semibold">{inv.jobs}</td>
                            <td className="px-5 py-4 text-right font-bold text-[var(--primary)]">₦{inv.amount.toLocaleString()}</td>
                            <td className="px-5 py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-center">
                              <button className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <BottomNavBar activeTab="Profile" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/dashboard" },
      ]} />
    </div>
  );
}
