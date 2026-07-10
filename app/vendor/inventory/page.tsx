"use client";
import Image from "next/image";
import VendorSideNav from "../../components/VendorSideNav";

export default function VendorInventory() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <VendorSideNav activeItem="Inventory" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center px-4 h-16 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)]">
          <div className="flex items-center gap-2">
            <Image src="/images/tushmech_logo.jpg" alt="Logo" width={24} height={24} className="rounded object-cover" />
            <h1 className="text-xl font-semibold text-[var(--primary)]">TushMech</h1>
          </div>
          <Image src="/images/vendor_manager.jpg" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--on-surface)] tracking-tight">Vendor Inventory</h2>
              <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage and track spare parts across all active vendors.</p>
            </div>
            <button className="flex items-center gap-2 px-4 h-10 bg-[var(--secondary)] text-white rounded-md text-sm font-semibold shadow-sm hover:bg-[var(--secondary)]/90 transition-colors">
              <span className="material-symbols-outlined text-[18px]">upload_file</span> Upload CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Total Parts Sold</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">12,482</div>
              <div className="text-xs font-semibold text-[var(--verification-green)] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% from last month
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Revenue in Escrow</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">$142.5K</div>
              <div className="text-xs font-semibold text-[var(--on-surface-variant)] mt-2">Pending clearance</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Active Orders</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">843</div>
              <div className="text-xs font-semibold text-[var(--warning-orange)] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span> 24 require attention
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)]/30 overflow-hidden">
            <div className="p-4 border-b border-[var(--outline-variant)]/30 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[var(--on-surface)]">Current Stock</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] text-[18px]">search</span>
                <input className="pl-9 pr-4 py-2 rounded-md border border-[var(--outline-variant)]/50 bg-white text-sm focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none w-64 shadow-sm" placeholder="Search inventory..." type="text" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--outline-variant)]/30 bg-[var(--surface-container-low)]/50">
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Part Name</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Type</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Compatibility</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold text-right">Price</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Stock Level</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[var(--outline-variant)]/30">
                  {[
                    {n:"Brembo Brake Pads X1",t:"OEM",c:"Honda Civic, Accord",p:"$85.00",stk:"150 / 200",pct:75,stat:"In Stock",col:"green"},
                    {n:"Bosch Spark Plug Iridium",t:"Aftermarket",c:"Universal",p:"$12.50",stk:"12 / 80",pct:15,stat:"Low Stock",col:"red"},
                    {n:"Castrol Edge 5W-30 (5qt)",t:"OEM",c:"Universal",p:"$28.99",stk:"450 / 500",pct:90,stat:"In Stock",col:"green"},
                    {n:"Air Filter Element 4X",t:"Aftermarket",c:"Toyota Camry, RAV4",p:"$18.25",stk:"45 / 100",pct:45,stat:"In Stock",col:"green"},
                  ].map((i, idx) => (
                    <tr key={idx} className="hover:bg-[var(--surface-container-low)]/30 transition-colors group cursor-pointer">
                      <td className="p-4 font-semibold text-[var(--on-surface)]">{i.n}</td>
                      <td className="p-4 text-[var(--on-surface-variant)]">{i.t}</td>
                      <td className="p-4 text-[var(--on-surface-variant)]">{i.c}</td>
                      <td className="p-4 text-right font-semibold text-[var(--on-surface)]">{i.p}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[var(--surface-variant)] rounded-full h-1.5 overflow-hidden">
                            <div className={`${i.pct < 20 ? 'bg-[var(--error)]' : i.pct < 50 ? 'bg-[var(--warning-orange)]' : 'bg-[var(--secondary)]'} h-1.5 rounded-full`} style={{ width: `${i.pct}%` }} />
                          </div>
                          <span className="text-xs text-[var(--on-surface-variant)]">{i.stk}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${i.col === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{i.stat}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-24 md:hidden" />
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.02)] border-t border-[var(--outline-variant)]/30 rounded-t-xl">
        {["Overview", "Map", "Inventory", "More"].map((n, i) => (
          <button key={n} className={`flex flex-col items-center justify-center ${n === "Inventory" ? "text-[var(--secondary)] bg-[var(--secondary)]/10 rounded-full px-4 py-1" : "text-[var(--on-surface-variant)]"}`}>
            <span className={`material-symbols-outlined ${n === "Inventory" ? "fill" : ""}`}>{['grid_view', 'map', 'inventory_2', 'more_horiz'][i]}</span>
            <span className={`text-[10px] ${n === "Inventory" ? "font-bold" : ""}`}>{n}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
