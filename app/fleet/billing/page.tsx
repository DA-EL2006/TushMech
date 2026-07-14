"use client";
import React from "react";
import FleetSideNav from "../../components/FleetSideNav";

export default function FleetBilling() {
  const currentVehicles = 24;
  const ratePerVehicle = 25000;
  const monthlyTotal = currentVehicles * ratePerVehicle;

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <FleetSideNav />
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Billing & Subscriptions</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage your enterprise retainer plan and payment methods.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Billing Card */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Plan */}
            <section className="bg-white border border-[var(--outline-variant)] rounded-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">workspace_premium</span>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">Active Plan</span>
                    <h2 className="text-2xl font-bold text-[var(--primary)]">TushMech Fleet Premium</h2>
                    <p className="text-sm text-[var(--on-surface-variant)] mt-1">Billed monthly on the 1st of every month.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-[var(--primary)]">₦{monthlyTotal.toLocaleString()}</p>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-1 font-medium">{currentVehicles} Vehicles @ ₦{ratePerVehicle.toLocaleString()}/ea</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Unlimited Mobile Triage
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 15% Off OEM Parts
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Free Quarterly Oil Changes
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Dedicated Account Manager
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-[var(--outline-variant)]">
                  <button className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                    Manage Subscription
                  </button>
                  <button className="px-6 py-2.5 bg-[var(--surface-container-low)] text-[var(--primary)] border border-[var(--outline-variant)] rounded-lg text-sm font-semibold hover:bg-[var(--surface-variant)] transition-colors">
                    Add Vehicles
                  </button>
                </div>
              </div>
            </section>

            {/* Invoice History */}
            <section className="bg-white border border-[var(--outline-variant)] rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)]">
                <h3 className="font-bold text-[var(--primary)]">Invoice History</h3>
              </div>
              <div className="divide-y divide-[var(--outline-variant)]">
                {[
                  { date: "July 1, 2026", id: "INV-2026-07", amount: monthlyTotal, status: "Paid" },
                  { date: "June 1, 2026", id: "INV-2026-06", amount: monthlyTotal, status: "Paid" },
                  { date: "May 1, 2026", id: "INV-2026-05", amount: monthlyTotal - ratePerVehicle, status: "Paid" }, // Assumed 23 vehicles in May
                ].map((inv) => (
                  <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-[var(--surface-container-lowest)] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--surface-container-low)] flex items-center justify-center text-[var(--on-surface-variant)]">
                        <span className="material-symbols-outlined">receipt</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[var(--primary)]">{inv.date}</p>
                        <p className="text-xs text-[var(--on-surface-variant)]">{inv.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold text-[var(--primary)]">₦{inv.amount.toLocaleString()}</span>
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">{inv.status}</span>
                      <button className="text-[var(--electric-blue)] hover:underline text-sm font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">download</span> PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <section className="bg-white border border-[var(--outline-variant)] rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--secondary)]">credit_card</span>
                Payment Method
              </h3>
              <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold italic">VISA</div>
                  <div>
                    <p className="text-sm font-bold text-[var(--primary)]">Visa ending in 4242</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">Expires 12/28</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--electric-blue)] bg-blue-50 px-2 py-1 rounded-full">Primary</span>
              </div>
              <button className="w-full py-2.5 border border-dashed border-[var(--outline-variant)] text-[var(--on-surface-variant)] rounded-xl text-sm font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">add</span> Add Payment Method
              </button>
            </section>

            <section className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-[var(--primary)] mb-2">Need a custom SLA?</h3>
              <p className="text-sm text-[var(--on-surface-variant)] mb-4">For fleets larger than 50 vehicles, we offer custom Service Level Agreements (SLAs) with dedicated on-site mechanics.</p>
              <button className="w-full py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                Contact Enterprise Sales
              </button>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
