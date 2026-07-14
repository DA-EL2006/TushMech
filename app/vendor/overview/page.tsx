"use client";
import VendorSideNav from "../../components/VendorSideNav";
import { useState, useEffect } from "react";

export default function VendorOverview() {
  const [vendorName, setVendorName] = useState("AutoParts Pro Ltd.");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tushmech_vendor_profile");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.businessName) setVendorName(data.businessName);
      }
    } catch {}
  }, []);

  return (
    <div className="flex h-screen bg-[var(--background)]">
      <VendorSideNav activeItem="Overview" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-[var(--outline-variant)] sticky top-0 z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Welcome, {vendorName}</h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Here is your daily business summary.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 px-4 bg-white border border-[var(--outline-variant)] text-[var(--on-surface-variant)] text-sm font-semibold rounded-lg hover:bg-[var(--surface-container-low)] transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span> This Week
            </button>
            <button className="h-10 px-4 bg-[var(--primary-container)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--deep-navy)] transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span> Add Product
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-container)]/10 text-[var(--primary-container)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
              </div>
              <h3 className="text-[var(--on-surface-variant)] text-sm font-semibold uppercase tracking-wider mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-[var(--primary)]">₦ 1.2M</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+4.2%</span>
              </div>
              <h3 className="text-[var(--on-surface-variant)] text-sm font-semibold uppercase tracking-wider mb-1">Total Orders</h3>
              <p className="text-3xl font-bold text-[var(--primary)]">148</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <span className="text-xs font-bold text-[var(--on-surface-variant)] bg-[var(--surface-container)] px-2 py-1 rounded-full">Static</span>
              </div>
              <h3 className="text-[var(--on-surface-variant)] text-sm font-semibold uppercase tracking-wider mb-1">Active Listings</h3>
              <p className="text-3xl font-bold text-[var(--primary)]">42</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--warning-orange)]/10 text-[var(--warning-orange)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">-2.1%</span>
              </div>
              <h3 className="text-[var(--on-surface-variant)] text-sm font-semibold uppercase tracking-wider mb-1">Pending Fulfillment</h3>
              <p className="text-3xl font-bold text-[var(--primary)]">8</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Selling Products */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--outline-variant)] shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] flex justify-between items-center">
                <h2 className="text-lg font-bold text-[var(--primary)]">Top Selling Parts</h2>
                <button className="text-sm font-semibold text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">View Report</button>
              </div>
              <div className="p-6 flex-1">
                <div className="space-y-4">
                  {[
                    { name: "Bosch Premium Oil Filter (OF-204)", sku: "PRT-8821", sales: 45, revenue: "₦ 675,000", stock: 12 },
                    { name: "Mobil 1 Advanced Full Synthetic 5W-30", sku: "LUB-0112", sales: 38, revenue: "₦ 1,140,000", stock: 4 },
                    { name: "Brembo Ceramic Brake Pads (Front)", sku: "BRK-4009", sales: 22, revenue: "₦ 990,000", stock: 18 },
                    { name: "NGK Iridium IX Spark Plugs (4-Pack)", sku: "IGN-5542", sales: 19, revenue: "₦ 285,000", stock: 30 },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--outline-variant)] hover:bg-[var(--surface-container-lowest)] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--surface-container)] flex items-center justify-center text-[var(--on-surface-variant)]">
                          <span className="material-symbols-outlined">settings</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--primary)]">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-[var(--on-surface-variant)] font-mono">{product.sku}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock < 5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                              {product.stock} in stock
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[var(--primary)]">{product.revenue}</p>
                        <p className="text-xs text-[var(--on-surface-variant)]">{product.sales} units sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Stream */}
            <div className="bg-white rounded-2xl border border-[var(--outline-variant)] shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] flex justify-between items-center">
                <h2 className="text-lg font-bold text-[var(--primary)]">Order Stream</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {[
                  { id: "ORD-9923", time: "10 mins ago", status: "Processing", amount: "₦ 45,000" },
                  { id: "ORD-9922", time: "45 mins ago", status: "Ready for Pickup", amount: "₦ 120,000" },
                  { id: "ORD-9921", time: "2 hours ago", status: "Shipped", amount: "₦ 18,500" },
                  { id: "ORD-9920", time: "3 hours ago", status: "Delivered", amount: "₦ 240,000" },
                  { id: "ORD-9919", time: "5 hours ago", status: "Delivered", amount: "₦ 12,000" },
                ].map((order, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--outline-variant)] hover:border-[var(--primary-container)] transition-colors cursor-pointer bg-[var(--surface-bright)]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[var(--primary-container)]">{order.id}</span>
                      <span className="text-xs text-[var(--on-surface-variant)] font-medium">{order.time}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "Ready for Pickup" ? "bg-purple-100 text-purple-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-sm font-bold text-[var(--primary)]">{order.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-[var(--outline-variant)] bg-white text-center">
                <button className="text-sm font-bold text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">View All Orders</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
