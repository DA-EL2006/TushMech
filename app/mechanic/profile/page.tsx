"use client";
import Image from "next/image";
import BottomNavBar from "../../components/BottomNavBar";

export default function MechanicProfile() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header Profile Area */}
      <div className="bg-[var(--primary-container)] text-white pt-12 pb-20 px-6 rounded-b-[2.5rem] shadow-level-2 relative">
        <div className="absolute top-4 right-4">
          <label className="flex items-center cursor-pointer gap-2">
            <span className="text-xs font-semibold text-[var(--tertiary-fixed)]">ONLINE</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="block bg-[var(--on-primary-container)] w-10 h-6 rounded-full border border-white/20"></div>
              <div className="dot absolute left-1 top-1 bg-[var(--tertiary-fixed)] w-4 h-4 rounded-full transition transform translate-x-4"></div>
            </div>
          </label>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-[var(--primary-container)] shadow-[0_0_0_2px_rgba(255,255,255,0.2)] mb-4 overflow-hidden">
             <Image src="/images/mechanic_profile.jpg" alt="Mechanic Profile" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">David O.</h1>
          <p className="text-[var(--primary-fixed-dim)] text-sm mb-4">Master Technician • ID: #TM-892</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">4.9</span>
              <span className="text-xs text-[var(--on-primary-container)] flex items-center gap-1"><span className="material-symbols-outlined fill text-[14px] text-[var(--warning-orange)]">star</span>Rating</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">342</span>
              <span className="text-xs text-[var(--on-primary-container)]">Jobs Done</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">3.2Y</span>
              <span className="text-xs text-[var(--on-primary-container)]">Tenure</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-10 space-y-6 relative z-10">
        {/* Certified Expertise */}
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-6">
          <h2 className="text-sm font-semibold text-[var(--primary)] mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            Certified Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {["EV Diagnostics", "Transmission Overhaul", "Heavy Duty Fleet", "Advanced Auto-Electrical"].map((skill) => (
              <span key={skill} className="bg-[var(--secondary-container)]/10 text-[var(--secondary)] border border-[var(--secondary)]/20 px-3 py-1.5 rounded-full text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Verified Equipment */}
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">handyman</span>
              Verified Equipment
            </h2>
            <button className="text-[var(--secondary)] text-xs font-semibold hover:underline">Request Upgrade</button>
          </div>
          <ul className="space-y-4">
            {[
              { name: "Snap-on Zeus+ Diagnostic Tool", status: "Verified", icon: "memory" },
              { name: "Heavy Duty Floor Jack (3-Ton)", status: "Verified", icon: "car_repair" },
              { name: "Complete Master Mechanic Toolset", status: "Verified", icon: "build_circle" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 pb-4 border-b border-[var(--outline-variant)] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-container-low)] flex items-center justify-center flex-shrink-0 text-[var(--secondary)]">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--on-surface)]">{item.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-[var(--verification-green)] fill">check_circle</span>
                    <span className="text-xs text-[var(--verification-green)]">{item.status}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Weekly Performance */}
        <section className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)] p-6">
          <h2 className="text-sm font-semibold text-[var(--primary)] mb-6 uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">bar_chart</span>
            Weekly Performance
          </h2>
          <div className="flex items-end justify-between h-32 gap-2">
            {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
              <div key={i} className="w-full bg-[var(--surface-container-low)] rounded-t-sm h-full relative group">
                <div className="absolute bottom-0 w-full bg-[var(--secondary)] rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }} />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[var(--on-surface-variant)] uppercase font-semibold">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </section>
      </main>

      <BottomNavBar activeTab="Profile" items={[
        { icon: "assignment", label: "Jobs", href: "/mechanic/dispatch" },
        { icon: "account_balance_wallet", label: "Wallet", href: "/mechanic/wallet" },
        { icon: "person", label: "Profile", href: "/mechanic/profile" },
      ]} />
    </div>
  );
}
