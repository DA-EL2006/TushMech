"use client";
import Image from "next/image";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20 pt-16">
      <TopAppBar />
      <main className="flex-grow flex flex-col gap-8 p-6 pt-8 md:pt-12 max-w-7xl mx-auto w-full">
        {/* Digital Garage Widget */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Your Digital Garage</h2>
            <Link href="/customer/garage" className="text-sm font-semibold text-[var(--secondary)] hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <Link href="/customer/garage" className="bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] shadow-level-1 p-6 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden hover:border-[var(--secondary)] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-bright)] to-transparent opacity-50 z-0 pointer-events-none" />
            <div className="relative z-10 w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-[var(--outline-variant)]">
              <Image className="w-full h-full object-cover" src="/images/car_camry.jpg" alt="2016 Toyota Camry" fill sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="relative z-10 flex-grow flex flex-col gap-2 w-full">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">2016 Toyota Camry</h3>
                  <p className="text-base text-[var(--on-surface-variant)] uppercase tracking-wider">ABC-1234</p>
                </div>
                <div className="bg-[var(--on-tertiary-container)]/10 px-4 py-1 rounded-full border border-[var(--on-tertiary-container)]/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--on-tertiary-container)]" />
                  <span className="text-sm font-semibold text-[var(--on-tertiary-fixed-variant)]">System Optimal</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-[var(--surface-container-low)] p-4 rounded-lg border border-[var(--outline-variant)] flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--secondary)]">speed</span>
                  <div>
                    <p className="text-xs font-medium text-[var(--on-surface-variant)]">Odometer</p>
                    <p className="text-sm font-semibold text-[var(--primary)]">64,250 km</p>
                  </div>
                </div>
                <div className="bg-[var(--surface-container-low)] p-4 rounded-lg border border-[var(--outline-variant)] flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--secondary)]">battery_charging_full</span>
                  <div>
                    <p className="text-xs font-medium text-[var(--on-surface-variant)]">Battery</p>
                    <p className="text-sm font-semibold text-[var(--primary)]">Good (12.6V)</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/customer/booking" className="bg-[var(--primary-container)] text-[var(--on-primary)] rounded-xl p-6 flex flex-col justify-between aspect-[2/1] md:aspect-[4/3] shadow-level-2 hover:shadow-level-3 transition-all group relative overflow-hidden text-left border border-[var(--primary-container)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 pointer-events-none" />
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-[32px]">handyman</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">Request Mobile Mechanic</h3>
              <p className="text-base text-[var(--inverse-primary)] opacity-80">On-demand service at your location</p>
            </div>
          </Link>
          <Link href="/customer/shop" className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-6 flex flex-col justify-between aspect-[2/1] md:aspect-[4/3] shadow-level-1 hover:shadow-level-2 hover:border-[var(--secondary)] transition-all group text-left">
            <div className="bg-[var(--secondary-container)]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[var(--secondary)] text-[32px]">shopping_cart</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--primary)] mb-1">Shop Spare Parts</h3>
              <p className="text-base text-[var(--on-surface-variant)]">Verified OEM &amp; aftermarket parts</p>
            </div>
          </Link>
        </section>

        {/* Upcoming Maintenance */}
        <section className="flex flex-col gap-4 pb-12">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Upcoming Maintenance</h2>
            <button className="text-sm font-semibold text-[var(--secondary)] hover:underline">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
            {[
              { icon: "oil_barrel", title: "Oil Change", due: "Due in 400km", color: "error", pct: 85 },
              { icon: "tire_repair", title: "Tire Rotation", due: "Due in 2,500km", color: "secondary", pct: 40 },
              { icon: "build", title: "Brake Inspection", due: "Due in 5,000km", color: "secondary", pct: 20 },
            ].map((item) => (
              <div key={item.title} className="snap-start flex-shrink-0 w-72 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-full ${item.color === 'error' ? 'bg-[var(--error-container)]/20' : 'bg-[var(--secondary-container)]/10'} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${item.color === 'error' ? 'text-[var(--error)]' : 'text-[var(--secondary)]'}`}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--primary)]">{item.title}</p>
                    <p className={`text-xs font-medium ${item.color === 'error' ? 'text-[var(--error)]' : 'text-[var(--on-surface-variant)]'}`}>{item.due}</p>
                  </div>
                </div>
                <div className="w-full bg-[var(--surface-variant)] rounded-full h-2 mb-4 overflow-hidden">
                  <div className={`${item.color === 'error' ? 'bg-[var(--error)]' : 'bg-[var(--secondary)]'} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <button className="w-full py-2 bg-[var(--surface-container-low)] hover:bg-[var(--surface-variant)] text-[var(--primary)] text-sm font-semibold rounded-lg transition-colors border border-[var(--outline-variant)]">
                  {item.color === 'error' ? 'Schedule Now' : 'Details'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNavBar activeTab="Home" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/dashboard" },
      ]} />
    </div>
  );
}
