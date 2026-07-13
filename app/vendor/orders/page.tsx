"use client";
import { useState } from "react";
import VendorSideNav from "../../components/VendorSideNav";

type Status = "All" | "Pending" | "Shipped" | "Delivered" | "Disputed";

const orders = [
  { id: "ORD-8821", part: "Brembo Brake Pad Set — Front", customer: "Amara Okafor", date: "Oct 24, 2024", amount: 32000, status: "Pending", address: "14 Gwarinpa Estate, Abuja", escrow: "Held", qty: 1 },
  { id: "ORD-8819", part: "Castrol Edge 5W-30 (5L)", customer: "Emeka Chukwu", date: "Oct 23, 2024", amount: 22000, status: "Shipped", address: "Plot 45, Wuse Zone 5, Abuja", escrow: "Held", qty: 2 },
  { id: "ORD-8815", part: "Bosch Iridium Spark Plugs", customer: "Fatima Bello", date: "Oct 22, 2024", amount: 14500, status: "Delivered", address: "22 Maitama Close, Abuja", escrow: "Released", qty: 1 },
  { id: "ORD-8810", part: "Mann-Filter Cabin Air Filter", customer: "Uche Eze", date: "Oct 21, 2024", amount: 7500, status: "Delivered", address: "7 Kubwa New Layout, Abuja", escrow: "Released", qty: 3 },
  { id: "ORD-8807", part: "Denso Oxygen Sensor — Front", customer: "Aisha Musa", date: "Oct 20, 2024", amount: 18500, status: "Disputed", address: "33 Garki Area 11, Abuja", escrow: "Frozen", qty: 1 },
  { id: "ORD-8804", part: "Bosch Alternator Belt", customer: "Tunde Adeleke", date: "Oct 19, 2024", amount: 12500, status: "Shipped", address: "5 Jabi District, Abuja", escrow: "Held", qty: 1 },
];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Disputed: "bg-red-100 text-red-700",
};

const escrowColors: Record<string, string> = {
  Held: "text-[var(--warning-orange)]",
  Released: "text-[var(--verification-green)]",
  Frozen: "text-[var(--error)]",
};

export default function VendorOrders() {
  const [filter, setFilter] = useState<Status>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [shipped, setShipped] = useState<string[]>([]);

  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  const counts: Record<Status, number> = {
    All: orders.length,
    Pending: orders.filter(o => o.status === "Pending").length,
    Shipped: orders.filter(o => o.status === "Shipped").length,
    Delivered: orders.filter(o => o.status === "Delivered").length,
    Disputed: orders.filter(o => o.status === "Disputed").length,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <VendorSideNav activeItem="Orders" />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center px-4 h-16 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)]">
          <h1 className="text-xl font-semibold text-[var(--primary)]">Orders</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--on-surface)] tracking-tight">Order Management</h2>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Track shipments, manage disputes, and monitor escrow status.</p>
          </div>

          {/* Status tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["All", "Pending", "Shipped", "Delivered", "Disputed"] as Status[]).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 h-9 rounded-full text-sm font-semibold border transition-all flex items-center gap-1.5 ${filter === s ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>
                {s}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${filter === s ? "bg-white/20" : "bg-[var(--surface-container)] text-[var(--on-surface-variant)]"}`}>{counts[s]}</span>
              </button>
            ))}
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--outline-variant)]/30 bg-[var(--surface-container-low)]/50">
                    {["Order ID", "Part", "Customer", "Date", "Qty", "Amount", "Status", "Escrow", ""].map(h => (
                      <th key={h} className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[var(--outline-variant)]/30">
                  {filtered.map(order => (
                    <>
                      <tr key={order.id} className="hover:bg-[var(--surface-container-low)]/30 transition-colors cursor-pointer"
                        onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                        <td className="p-4 font-mono font-semibold text-[var(--secondary)] text-xs">{order.id}</td>
                        <td className="p-4 font-semibold text-[var(--on-surface)] max-w-[180px]">
                          <span className="line-clamp-2">{order.part}</span>
                        </td>
                        <td className="p-4 text-[var(--on-surface-variant)]">{order.customer}</td>
                        <td className="p-4 text-[var(--on-surface-variant)] whitespace-nowrap">{order.date}</td>
                        <td className="p-4 text-center font-semibold">{order.qty}</td>
                        <td className="p-4 font-bold text-[var(--on-surface)]">₦ {order.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[order.status]}`}>{order.status}</span>
                        </td>
                        <td className={`p-4 text-xs font-bold ${escrowColors[order.escrow]}`}>{order.escrow}</td>
                        <td className="p-4">
                          <span className="material-symbols-outlined text-[var(--on-surface-variant)] text-[18px] transition-transform block"
                            style={{ transform: expanded === order.id ? "rotate(180deg)" : "rotate(0)" }}>
                            expand_more
                          </span>
                        </td>
                      </tr>
                      {expanded === order.id && (
                        <tr key={`${order.id}-detail`}>
                          <td colSpan={9} className="bg-[var(--surface-container-lowest)] border-b border-[var(--outline-variant)] p-0">
                            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Delivery Address</p>
                                <p className="text-sm font-semibold text-[var(--on-surface)]">{order.customer}</p>
                                <p className="text-sm text-[var(--on-surface-variant)] mt-0.5">{order.address}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Escrow Status</p>
                                <span className={`text-sm font-bold ${escrowColors[order.escrow]}`}>{order.escrow}</span>
                                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                                  {order.escrow === "Held" && "Funds held until delivery is confirmed by customer."}
                                  {order.escrow === "Released" && "Funds cleared to your wallet."}
                                  {order.escrow === "Frozen" && "Funds frozen pending dispute resolution."}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1">Actions</p>
                                {order.status === "Pending" && !shipped.includes(order.id) && (
                                  <button onClick={() => setShipped(p => [...p, order.id])}
                                    className="h-9 px-4 bg-[var(--secondary)] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 w-fit">
                                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>Mark as Shipped
                                  </button>
                                )}
                                {(order.status === "Pending" && shipped.includes(order.id)) && (
                                  <span className="text-xs font-bold text-[var(--verification-green)] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>Marked Shipped
                                  </span>
                                )}
                                {order.status === "Disputed" && (
                                  <button className="h-9 px-4 bg-[var(--error)] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 w-fit">
                                    <span className="material-symbols-outlined text-[16px]">gavel</span>Raise Dispute
                                  </button>
                                )}
                                {(order.status === "Delivered" || order.status === "Shipped") && (
                                  <span className="text-xs text-[var(--on-surface-variant)]">No actions required</span>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-[var(--on-surface-variant)]">
                  <span className="material-symbols-outlined text-5xl opacity-30 block mb-2">inventory</span>
                  <p className="font-semibold">No {filter} orders</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-16 bg-white border-t border-[var(--outline-variant)] rounded-t-xl">
        {[["grid_view","Overview","#"],["inventory_2","Inventory","/vendor/inventory"],["receipt_long","Orders","/vendor/orders"],["more_horiz","More","#"]].map(([icon,label,href])=>(
          <a key={label} href={href} className={`flex flex-col items-center justify-center ${label==="Orders"?"text-[var(--secondary)]":"text-[var(--on-surface-variant)]"}`}>
            <span className={`material-symbols-outlined ${label==="Orders"?"fill":""}`}>{icon}</span>
            <span className={`text-[10px] ${label==="Orders"?"font-bold":""}`}>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
