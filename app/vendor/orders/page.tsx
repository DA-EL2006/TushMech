"use client";
import { useState, useEffect } from "react";
import VendorSideNav from "../../components/VendorSideNav";
import BottomNavBar from "../../components/BottomNavBar";

type Status = "All" | "Pending" | "Shipped" | "Delivered" | "Disputed";

const MOCK_ORDERS = [
  { id: "ORD-8821", part: "Brembo Brake Pad Set — Front", customer: "Amara Okafor", date: "Oct 24, 2024", amount: 32000, status: "Pending", address: "14 Gwarinpa Estate, Abuja", escrow: "Held", qty: 1 },
  { id: "ORD-8819", part: "Castrol Edge 5W-30 (5L)", customer: "Emeka Chukwu", date: "Oct 23, 2024", amount: 22000, status: "Shipped", address: "Plot 45, Wuse Zone 5, Abuja", escrow: "Held", qty: 2 },
  { id: "ORD-8815", part: "Bosch Iridium Spark Plugs", customer: "Fatima Bello", date: "Oct 22, 2024", amount: 14500, status: "Delivered", address: "22 Maitama Close, Abuja", escrow: "Released", qty: 1 },
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
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<Status>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vendor/orders")
      .then(res => res.json())
      .then(data => {
        if (data.orders && data.orders.length > 0) {
          const formatted = data.orders.map((o: any) => ({
            id: o.id.substring(0,8).toUpperCase(),
            raw_id: o.id,
            part: o.part_name,
            customer: o.job?.customer ? `${o.job.customer.first_name} ${o.job.customer.last_name || ''}` : "Customer",
            date: new Date(o.created_at).toLocaleDateString(),
            amount: o.amount,
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase(),
            address: "Escrow Locked Address",
            escrow: o.escrow_status.charAt(0).toUpperCase() + o.escrow_status.slice(1).toLowerCase(),
            qty: o.quantity
          }));
          setOrders(formatted);
        }
      });
  }, []);

  const handleMarkShipped = async (orderId: string, rawId: string) => {
    try {
      const res = await fetch("/api/vendor/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: rawId, status: "SHIPPED" })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "Shipped" } : o));
        alert("Order marked as SHIPPED!");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
                                  {order.status === "Pending" && (
                                    <button onClick={() => handleMarkShipped(order.id, order.raw_id)}
                                      className="h-9 px-4 bg-[var(--secondary)] text-[var(--on-secondary)] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 w-fit">
                                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>Mark as Shipped
                                    </button>
                                  )}
                                  {order.status === "Shipped" && (
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
      <BottomNavBar activeTab="Orders" items={[
  { icon: "grid_view", label: "Overview", href: "/vendor/overview" },
  { icon: "inventory_2", label: "Inventory", href: "/vendor/inventory" },
  { icon: "receipt_long", label: "Orders", href: "/vendor/orders" },
  { icon: "account_balance", label: "Payouts", href: "/vendor/payouts" },
  { icon: "fact_check", label: "QA Reports", href: "/vendor/qa-reports" },
]} />
    </div>
  );
}
