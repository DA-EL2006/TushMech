"use client";
import { useState } from "react";
import Image from "next/image";
import TopAppBar from "../../components/TopAppBar";

export default function BookingMap() {
  const [selected, setSelected] = useState(1);
  const services = [
    { icon: "health_and_safety", title: "Diagnostics", desc: "Check engine light or weird noises." },
    { icon: "oil_barrel", title: "Oil Change", desc: "Standard or synthetic oil refresh." },
    { icon: "battery_charging_full", title: "Battery", desc: "Jump start or replacement." },
    { icon: "more_horiz", title: "Custom", desc: "Describe your issue to a tech." },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-container-lowest)] text-[var(--on-surface)] flex flex-col relative overflow-hidden antialiased">
      <TopAppBar showBack backHref="/customer/dashboard" />
      {/* Map Area */}
      <main className="flex-1 relative mt-12 mb-[400px]">
        <div className="absolute inset-0 w-full h-full z-0 opacity-90">
          <Image src="/images/sf_map.jpg" alt="Map" fill className="object-cover saturate-[0.8]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-container-lowest)]/60 via-transparent to-[var(--surface-container-lowest)]/90 z-10 pointer-events-none" />
        {/* User Location Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative pin-pulse flex flex-col items-center">
            <div className="w-14 h-14 bg-[var(--secondary)] text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,81,213,0.4)] border-[3px] border-white">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
            </div>
            <div className="w-3 h-3 bg-black/20 rounded-full mt-2 blur-[2px]" />
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-[var(--outline-variant)]/50 whitespace-nowrap">
            <p className="text-xs font-semibold tracking-wide">123 Market St.</p>
          </div>
        </div>
        {/* Mechanic Pins */}
        {[{ top: "33%", left: "25%" }, { bottom: "33%", right: "25%" }, { top: "25%", right: "33%" }].map((pos, i) => (
          <div key={i} className="absolute z-20" style={pos}>
            <div className="w-10 h-10 bg-white text-[var(--secondary)] rounded-full flex items-center justify-center shadow-md border border-[var(--outline-variant)]/30 opacity-90 hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">build</span>
            </div>
          </div>
        ))}
        <button className="absolute bottom-8 right-6 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[var(--outline-variant)]/50 flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] active:scale-95 transition-all">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </main>
      {/* Bottom Sheet */}
      <section className="absolute bottom-0 left-0 w-full bg-[var(--surface-container-lowest)] rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] border-t border-[var(--outline-variant)]/30 z-40 pt-4 px-6 pb-safe flex flex-col h-[400px]">
        <div className="bottom-sheet-handle w-12 h-1.5 bg-[var(--outline-variant)]/50 mx-auto" />
        <div className="mb-2 mt-1">
          <h2 className="text-2xl font-semibold text-[var(--primary)] tracking-tight">Select Service</h2>
          <p className="text-base text-[var(--on-surface-variant)] mt-1">What does your vehicle need today?</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 overflow-y-auto mb-6 pb-2 px-1">
          {services.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setSelected(i)}
              className={`service-card flex flex-col items-start p-4 border rounded-2xl text-left h-full shadow-sm hover:shadow-md ${selected === i ? "selected border-[var(--secondary)]" : "border-[var(--outline-variant)]/60 bg-white"}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selected === i ? "bg-[var(--secondary)] text-white shadow-sm" : "bg-[var(--surface-container-low)] text-[var(--secondary)]"}`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <h3 className={`text-sm font-semibold ${selected === i ? "text-[var(--primary)]" : "text-[var(--on-surface)]"}`}>{s.title}</h3>
              <p className="text-xs font-medium text-[var(--on-surface-variant)] mt-1">{s.desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-auto pt-2 pb-6 bg-gradient-to-t from-white via-white to-transparent -mx-6 px-6">
          <button className="w-full h-14 bg-[var(--primary)] text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-[var(--primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span>Request Triage</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
