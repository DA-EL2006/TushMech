"use client";
import { useState } from "react";
import VendorSideNav from "../../components/VendorSideNav";

type PayoutStatus = "All" | "Pending" | "Processing" | "Paid";

const payouts = [
  { id: "PAY-4421", period: "Oct 16–31, 2024", orders: 5, gross: 92500, fee: 9250, net: 83250, status: "Pending" },
  { id: "PAY-4418", period: "Oct 1–15, 2024",  orders: 7, gross: 134000, fee: 13400, net: 120600, status: "Processing" },
  { id: "PAY-4412", period: "Sep 16–30, 2024", orders: 4, gross: 68000,  fee: 6800,  net: 61200,  status: "Paid" },
  { id: "PAY-4408", period: "Sep 1–15, 2024",  orders: 6, gross: 113500, fee: 11350, net: 102150, status: "Paid" },
  { id: "PAY-4401", period: "Aug 16–31, 2024", orders: 3, gross: 52000,  fee: 5200,  net: 46800,  status: "Paid" },
];

const bank = { name: "Zenith Bank", account: "••••4821", holder: "AutoParts Pro Ltd." };

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
};

export default function VendorPayouts() {
  const [filter, setFilter] = useState<PayoutStatus>("All");
  const [requested, setRequested] = useState(false);

  const filtered = filter === "All" ? payouts : payouts.filter(p => p.status === filter);
  const pendingTotal = payouts.filter(p => p.status === "Pending").reduce((s, p) => s + p.net, 0);

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <VendorSideNav activeItem="Payouts" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex justify-between items-center px-4 h-16 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)]">
          <h1 className="text-xl font-semibold text-[var(--primary)]">Payouts</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--on-surface)] tracking-tight">Escrow Payouts</h2>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Funds are released every 2 weeks once orders are confirmed delivered.</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[var(--outline-variant)] rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)] mb-2">Available to Request</p>
              <p className="text-3xl font-bold text-[var(--primary)]">₦ {pendingTotal.toLocaleString()}</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">From 1 pending cycle</p>
              {!requested ? (
                <button onClick={() => setRequested(true)}
                  className="mt-4 w-full h-10 bg-[var(--secondary)] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>Request Payout
                </button>
              ) : (
                <div className="mt-4 flex items-center gap-2 text-green-700 text-sm font-semibold">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>Request Submitted
                </div>
              )}
            </div>
            <div className="bg-white border border-[var(--outline-variant)] rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)] mb-2">Total Earned (Lifetime)</p>
              <p className="text-3xl font-bold text-[var(--primary)]">₦ 414,000</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">Across 25 orders · 5 payout cycles</p>
            </div>
            <div className="bg-white border border-[var(--outline-variant)] rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)] mb-2">Linked Bank Account</p>
              <p className="text-base font-bold text-[var(--primary)] mt-1">{bank.name}</p>
              <p className="text-sm text-[var(--on-surface-variant)]">{bank.account} · {bank.holder}</p>
              <button className="mt-3 text-xs font-bold text-[var(--secondary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">edit</span>Update Account
              </button>
            </div>
          </div>

          {/* How escrow works */}
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-5">
            <h3 className="text-sm font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[var(--secondary)]">info</span>How TushMech Escrow Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: "shopping_cart", step: "1", title: "Order Placed", desc: "Customer pays. Funds enter TushMech escrow." },
                { icon: "local_shipping", step: "2", title: "You Ship", desc: "Mark order shipped. Customer has 3 days to confirm." },
                { icon: "verified_user", step: "3", title: "Confirmed", desc: "Customer confirms delivery. Escrow released." },
                { icon: "account_balance", step: "4", title: "Payout", desc: "Net amount (after 10% platform fee) sent bi-weekly." },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[var(--secondary)]">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--primary)]">{s.title}</p>
                    <p className="text-[11px] text-[var(--on-surface-variant)] mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payout history */}
          <div className="bg-white rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--outline-variant)] flex-wrap gap-3">
              <h3 className="text-base font-bold text-[var(--primary)]">Payout History</h3>
              <div className="flex gap-1.5">
                {(["All", "Pending", "Processing", "Paid"] as PayoutStatus[]).map(s => (
                  <button key={s} onClick={() => setFilter(s)}
                    className={`px-3 h-7 rounded-full text-xs font-semibold border transition-all ${filter === s ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface-container-low)]/50 border-b border-[var(--outline-variant)]">
                    {["Ref", "Period", "Orders", "Gross", "Platform Fee (10%)", "Net Payout", "Status"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)]">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-[var(--secondary)]">{p.id}</td>
                      <td className="px-5 py-4 text-[var(--on-surface-variant)]">{p.period}</td>
                      <td className="px-5 py-4 text-center font-semibold">{p.orders}</td>
                      <td className="px-5 py-4 font-semibold text-[var(--on-surface)]">₦ {p.gross.toLocaleString()}</td>
                      <td className="px-5 py-4 text-red-500 font-semibold">− ₦ {p.fee.toLocaleString()}</td>
                      <td className="px-5 py-4 font-bold text-[var(--primary)]">₦ {p.net.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[p.status]}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-10 text-[var(--on-surface-variant)]">
                  <span className="material-symbols-outlined text-4xl opacity-30 block mb-2">receipt_long</span>
                  <p className="font-semibold text-sm">No {filter} payouts</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
