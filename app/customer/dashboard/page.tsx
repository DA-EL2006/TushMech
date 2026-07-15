"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";
import { findMatchingCarImage } from "../../lib/carDatabase";

interface GarageVehicle { make: string; model: string; year: string; mileage: string; licensePlate: string; knownIssues: string; [key: string]: string; }

export default function CustomerDashboard() {
  const [primaryCar, setPrimaryCar] = useState<GarageVehicle | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tushmech_garage");
      if (raw) {
        const parsed: GarageVehicle[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) setPrimaryCar(parsed[0]);
      }
    } catch {}
  }, []);

  const carName = primaryCar ? `${primaryCar.year} ${primaryCar.make} ${primaryCar.model}`.trim() : "2016 Toyota Camry";
  const carPlate = primaryCar?.licensePlate || "ABC-1234";
  const carMileage = primaryCar?.mileage ? `${parseInt(primaryCar.mileage).toLocaleString()} km` : "64,250 km";
  const hasIssues = !!primaryCar?.knownIssues;

  const carImageUrl = primaryCar ? findMatchingCarImage({
    make: primaryCar.make,
    model: primaryCar.model,
    year: primaryCar.year,
    transmission: primaryCar.transmission,
    fuelType: primaryCar.fuelType,
    engine: primaryCar.engine
  }) : findMatchingCarImage({ make: "Toyota", model: "Camry", year: 2016 });

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20 pt-16">
      <TopAppBar />
      <main className="flex-grow flex flex-col gap-8 p-6 pt-8 md:pt-12 max-w-7xl mx-auto w-full">
        
        {/* Pending Action Banner */}
        <section>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-900 mb-1">Diagnostic Report Ready</h3>
                <p className="text-sm text-blue-800">Your mechanic has completed the inspection for your 2022 Tesla Model 3. Review the findings to approve repairs.</p>
              </div>
            </div>
            <Link href="/customer/report" className="w-full md:w-auto flex-shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors text-center whitespace-nowrap shadow-sm">
              View Report
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Your Digital Garage</h2>
            <Link href="/customer/garage" className="text-sm font-semibold text-[var(--secondary)] hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <Link href="/customer/garage" className="bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] shadow-level-1 p-6 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden hover:border-[var(--secondary)] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-bright)] to-transparent opacity-50 z-0 pointer-events-none" />
            {/* Vehicle Image */}
            <div className="relative z-10 w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-[var(--outline-variant)] bg-gradient-to-br from-[var(--primary-container)] to-[var(--deep-navy)] flex items-center justify-center">
              {carImageUrl ? (
                <img src={carImageUrl} alt={carName} className="w-full h-full object-cover opacity-90 mix-blend-screen" />
              ) : (
                <span className="material-symbols-outlined text-white/60 text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
              )}
            </div>
            <div className="relative z-10 flex-grow flex flex-col gap-2 w-full">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">{carName}</h3>
                  <p className="text-base text-[var(--on-surface-variant)] uppercase tracking-wider">{carPlate}</p>
                </div>
                <div className={`px-4 py-1 rounded-full border flex items-center gap-2 ${
                  hasIssues
                    ? "bg-amber-100 border-amber-300"
                    : "bg-[var(--on-tertiary-container)]/10 border-[var(--on-tertiary-container)]/20"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${hasIssues ? "bg-amber-500" : "bg-[var(--on-tertiary-container)]"}`} />
                  <span className={`text-sm font-semibold ${hasIssues ? "text-amber-700" : "text-[var(--on-tertiary-fixed-variant)]"}`}>
                    {hasIssues ? "Check Required" : "System Optimal"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-[var(--surface-container-low)] p-4 rounded-lg border border-[var(--outline-variant)] flex items-center gap-4">
                  <span className="material-symbols-outlined text-[var(--secondary)]">speed</span>
                  <div>
                    <p className="text-xs font-medium text-[var(--on-surface-variant)]">Odometer</p>
                    <p className="text-sm font-semibold text-[var(--primary)]">{carMileage}</p>
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

      {/* Floating SOS Button */}
      <Link href="/customer/sos" className="fixed bottom-24 right-6 w-16 h-16 bg-[var(--error)] rounded-full shadow-[0_8px_30px_rgb(186,26,26,0.4)] flex items-center justify-center text-white z-40 hover:scale-105 transition-transform group">
        <div className="absolute inset-0 rounded-full bg-[var(--error)] opacity-40 animate-ping" />
        <div className="relative flex flex-col items-center">
          <span className="material-symbols-outlined text-[28px] leading-none mb-0.5">sos</span>
          <span className="text-[9px] font-bold tracking-wider leading-none">HELP</span>
        </div>
      </Link>

      <BottomNavBar activeTab="Home" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/dashboard" },
      ]} />
    </div>
  );
}
