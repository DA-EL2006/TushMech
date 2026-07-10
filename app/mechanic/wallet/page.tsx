"use client";
import BottomNavBar from "../../components/BottomNavBar";
import TopAppBar from "../../components/TopAppBar";

export default function MechanicWallet() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      <TopAppBar title="Wallet" centered={true} showNotification={true} />
      
      <main className="pt-16 px-4 md:px-8 max-w-2xl mx-auto space-y-6 mt-4">
        {/* Balance Card with Fintech Glow */}
        <section className="bg-[var(--deep-navy)] rounded-2xl p-6 text-white fintech-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--electric-blue)] opacity-20 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-[var(--primary-fixed-dim)] text-sm font-medium mb-1 uppercase tracking-wider">Available Balance</p>
              <h2 className="text-4xl font-bold tracking-tight">₦ 124,500</h2>
            </div>
            <div className="bg-white/10 rounded-lg p-2 border border-white/20">
              <span className="material-symbols-outlined text-white">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <button className="flex-1 bg-[var(--electric-blue)] hover:bg-blue-600 transition-colors py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              Withdraw
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-[18px]">history</span>
              History
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-[var(--outline-variant)] shadow-sm">
            <p className="text-xs text-[var(--on-surface-variant)] font-semibold uppercase tracking-wider mb-1">Today's Earnings</p>
            <p className="text-xl font-bold text-[var(--primary)]">₦ 32,000</p>
            <p className="text-[10px] text-[var(--verification-green)] font-semibold mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +12% vs yesterday</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--outline-variant)] shadow-sm">
            <p className="text-xs text-[var(--on-surface-variant)] font-semibold uppercase tracking-wider mb-1">Pending Clearance</p>
            <p className="text-xl font-bold text-[var(--primary)]">₦ 45,000</p>
            <p className="text-[10px] text-[var(--warning-orange)] font-semibold mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> Escrow clearing</p>
          </div>
        </div>

        {/* Tool Loan Widget */}
        <section className="bg-[var(--surface-container-lowest)] border-2 border-[var(--electric-blue)]/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <span className="material-symbols-outlined text-[120px] text-[var(--electric-blue)]">build</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--electric-blue)]">hardware</span>
                <h3 className="font-semibold text-[var(--primary)]">TushMech Tool Loan</h3>
              </div>
              <span className="text-[10px] bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded-full font-bold">PRE-APPROVED</span>
            </div>
            <p className="text-sm text-[var(--on-surface-variant)] mb-4 max-w-[200px]">Upgrade your gear now. Pay gradually from your earnings.</p>
            <button className="text-sm font-semibold text-[var(--electric-blue)] hover:underline flex items-center gap-1">
              Apply up to ₦200,000 <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Recent Jobs */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[var(--primary)]">Recent Jobs</h3>
            <button className="text-xs font-semibold text-[var(--secondary)]">See All</button>
          </div>
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm overflow-hidden">
            {[
              { id: "TM-8824", title: "Diagnostic & Oil Change", date: "Today, 2:30 PM", amt: "+₦ 15,000", status: "Cleared" },
              { id: "TM-8819", title: "Brake Pad Replacement", date: "Yesterday", amt: "+₦ 28,000", status: "Cleared" },
              { id: "TM-8805", title: "Battery Jump Start", date: "Oct 24", amt: "+₦ 8,500", status: "Cleared" },
            ].map((j, i) => (
              <div key={i} className="flex justify-between items-center p-4 border-b border-[var(--outline-variant)] last:border-0 hover:bg-[var(--surface-container-low)] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-container-high)] flex items-center justify-center text-[var(--on-surface-variant)]">
                    <span className="material-symbols-outlined text-[20px]">directions_car</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--primary)]">{j.title}</p>
                    <p className="text-xs text-[var(--on-surface-variant)]">{j.id} • {j.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--verification-green)]">{j.amt}</p>
                  <p className="text-[10px] font-semibold text-[var(--on-surface-variant)]">{j.status}</p>
                </div>
              </div>
            ))}
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
