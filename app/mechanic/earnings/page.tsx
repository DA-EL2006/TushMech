"use client";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

export default function MechanicEarnings() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      <TopAppBar title="Earnings & Loans" centered={true} showNotification={true} />
      
      <main className="pt-16 px-4 md:px-8 max-w-2xl mx-auto space-y-6 mt-4">
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-6 text-center">
          <h2 className="text-sm font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">Total Earnings (This Month)</h2>
          <p className="text-4xl font-bold text-[var(--primary)] mb-4">₦ 458,000</p>
          <div className="flex justify-center gap-4">
            <div className="bg-[var(--surface-container-low)] px-4 py-2 rounded-lg">
              <span className="text-xs text-[var(--on-surface-variant)] block">Completed</span>
              <span className="font-semibold">32 Jobs</span>
            </div>
            <div className="bg-[var(--surface-container-low)] px-4 py-2 rounded-lg">
              <span className="text-xs text-[var(--on-surface-variant)] block">Avg/Job</span>
              <span className="font-semibold">₦ 14,312</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] flex justify-between items-center">
            <h3 className="font-semibold text-[var(--primary)]">Earnings Breakdown</h3>
            <span className="material-symbols-outlined text-[var(--on-surface-variant)]">bar_chart</span>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { label: "Diagnostics", value: "₦ 120,000", pct: 30 },
                { label: "Labor (Repairs)", value: "₦ 280,000", pct: 60 },
                { label: "Tips", value: "₦ 58,000", pct: 10 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full bg-[var(--surface-container)] rounded-full h-2">
                    <div className="bg-[var(--electric-blue)] h-2 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Loan Application Widget (from screenshot ref) */}
        <section className="bg-[var(--surface-container-lowest)] border-2 border-[var(--electric-blue)] rounded-xl overflow-hidden shadow-level-2">
          <div className="bg-[var(--electric-blue)] p-4 text-white">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="material-symbols-outlined fill">hardware</span>
              Tool Advancement Loan
            </h3>
            <p className="text-sm opacity-90">Finance new equipment. Repay with future jobs.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-end border-b border-[var(--outline-variant)] pb-4">
              <div>
                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wide">Available Credit</p>
                <p className="text-2xl font-bold text-[var(--primary)]">₦ 200,000</p>
              </div>
              <span className="bg-[var(--verification-green)]/10 text-[var(--verification-green)] text-xs font-bold px-2 py-1 rounded">ELIGIBLE</span>
            </div>
            
            <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
              Based on your 4.9 rating and consistent job completion, you are pre-approved for a tool advancement loan. Repayment is automatically deducted as a 10% cut from future earnings.
            </p>
            <button className="w-full h-12 bg-[var(--deep-navy)] text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Apply Now <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNavBar activeTab="Wallet" items={[
        { icon: "assignment", label: "Jobs", href: "/mechanic/dispatch" },
        { icon: "account_balance_wallet", label: "Wallet", href: "/mechanic/wallet" },
        { icon: "person", label: "Profile", href: "/mechanic/profile" },
      ]} />
    </div>
  );
}
