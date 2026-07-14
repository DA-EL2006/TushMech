"use client";
import VendorSideNav from "../../components/VendorSideNav";

export default function VendorQAReports() {
  return (
    <div className="flex h-screen bg-[var(--background)]">
      <VendorSideNav activeItem="QA Reports" />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white px-8 py-6 border-b border-[var(--outline-variant)] sticky top-0 z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Quality Assurance Reports</h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Review part performance, return rates, and mechanic feedback.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">search</span>
              <input type="text" placeholder="Search SKU or Product..." className="h-10 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm w-full md:w-64 focus:border-[var(--secondary)] outline-none transition-all" />
            </div>
            <button className="h-10 px-4 border border-[var(--outline-variant)] rounded-lg flex items-center gap-2 hover:bg-[var(--surface-container-low)] transition-colors bg-white">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="text-sm font-semibold hidden md:inline">Export</span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white to-[var(--surface-container-lowest)] p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[var(--verification-green)]">verified</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">Overall Quality Score</h3>
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">98.4%</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-2">Based on 1,240 completed mechanic installations.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-[var(--surface-container-lowest)] p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[var(--warning-orange)]">assignment_return</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">Return Rate (30-day)</h3>
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">1.2%</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-2">15 returns out of 1,240 parts sold.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-[var(--surface-container-lowest)] p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-red-500">warning</span>
                <h3 className="text-sm font-bold text-[var(--primary)]">Active Recalls / Alerts</h3>
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">0</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-2">No active QA alerts on your inventory.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--outline-variant)] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] flex justify-between items-center">
              <h2 className="text-lg font-bold text-[var(--primary)]">Recent QA Flags &amp; Returns</h2>
              <select className="h-8 px-2 text-sm border border-[var(--outline-variant)] rounded-md outline-none bg-white font-medium text-[var(--primary)]">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[var(--surface-container-low)] border-b border-[var(--outline-variant)]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Report ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Product</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Issue Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Mechanic Feedback</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)]">
                  {[
                    { id: "QA-1092", prod: "Denso Radiator Fan", sku: "RAD-882", cat: "Defective Part", msg: "Fan motor bearing making abnormal noise upon installation.", stat: "Resolved (Refunded)" },
                    { id: "QA-1085", prod: "OEM Brake Rotors (Pair)", sku: "BRK-102", cat: "Wrong Item Shipped", msg: "Box labeled front rotors, but contained rear rotors.", stat: "Pending Return" },
                    { id: "QA-1044", prod: "Castrol GTX 20W-50", sku: "LUB-405", cat: "Damaged in Transit", msg: "Bottle seal broken, leaking into packaging.", stat: "Resolved (Replaced)" },
                  ].map(r => (
                    <tr key={r.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-[var(--secondary)] text-xs">{r.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-[var(--primary)]">{r.prod}</p>
                        <p className="text-xs text-[var(--on-surface-variant)] font-mono mt-0.5">{r.sku}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-amber-100 text-amber-700">
                          {r.cat}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[var(--on-surface-variant)] max-w-xs truncate" title={r.msg}>
                        "{r.msg}"
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${r.stat.includes('Resolved') ? 'text-green-600' : 'text-blue-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${r.stat.includes('Resolved') ? 'bg-green-600' : 'bg-blue-600'}`} />
                          {r.stat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Empty State / Pagination */}
            <div className="p-4 border-t border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-center text-xs text-[var(--on-surface-variant)]">
              Showing all 3 records from the selected time period.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
