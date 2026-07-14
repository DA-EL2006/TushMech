"use client";
import { useState } from "react";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

const HUB_LOCATIONS = [
  { id: "wuse", name: "TushMech Hub — Wuse Zone 5", address: "14 Lobito Crescent, Wuse Zone 5, Abuja", hours: "Mon–Sat · 7am–8pm", bays: 8, wait: "~45 min" },
  { id: "gwarinpa", name: "TushMech Hub — Gwarinpa", address: "Plot 88, 1st Avenue, Gwarinpa Estate, Abuja", hours: "Mon–Sat · 7am–7pm", bays: 6, wait: "~30 min" },
  { id: "garki", name: "TushMech Hub — Garki", address: "22 Moshood Abiola Way, Garki Area 11, Abuja", hours: "Mon–Sun · 8am–6pm", bays: 4, wait: "~1 hr" },
];

const SERVICES = [
  { id: "full", label: "Full Mechanical Overhaul", duration: "2–4 days", price: "From ₦85,000" },
  { id: "engine", label: "Engine Rebuild / Diagnosis", duration: "3–5 days", price: "From ₦150,000" },
  { id: "suspension", label: "Suspension & Steering", duration: "1–2 days", price: "From ₦55,000" },
  { id: "auto", label: "Automatic Gearbox Service", duration: "1–3 days", price: "From ₦70,000" },
  { id: "body", label: "Body & Paint Work", duration: "3–7 days", price: "From ₦120,000" },
  { id: "ac", label: "A/C Overhaul", duration: "1 day", price: "From ₦45,000" },
];

const TIME_SLOTS = ["7:00 AM", "8:30 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

const TOMORROW = () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function HubDropOff() {
  const [step, setStep] = useState<1 | 2 | 3 | "done">(1);
  const [hubId, setHubId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const hub = HUB_LOCATIONS.find(h => h.id === hubId);
  const service = SERVICES.find(s => s.id === serviceId);

  const refNum = `HUB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopAppBar showBack backHref="/customer/dashboard" title="Hub Drop-off" centered={false} />
      <main className="pt-16 max-w-lg mx-auto px-4">

        {/* Progress stepper */}
        {step !== "done" && (
          <div className="flex items-center justify-center gap-2 py-6">
            {([1, 2, 3] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-[var(--secondary)] text-white" : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]"}`}>
                  {step > s ? <span className="material-symbols-outlined text-[14px]">check</span> : s}
                </div>
                <span className={`text-xs font-semibold ${step === s ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`}>
                  {["Select Hub", "Service & Time", "Confirm"][i]}
                </span>
                {i < 2 && <div className={`w-8 h-0.5 ${step > s ? "bg-[var(--secondary)]" : "bg-[var(--outline-variant)]"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Select Hub */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--primary)]">Choose a Hub Location</h2>
            <p className="text-sm text-[var(--on-surface-variant)]">Select the TushMech hub closest to you in Abuja.</p>
            {HUB_LOCATIONS.map(h => (
              <button key={h.id} onClick={() => setHubId(h.id)}
                className={`w-full p-5 rounded-xl border-2 text-left transition-all ${hubId === h.id ? "border-[var(--secondary)] bg-[var(--secondary)]/5" : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:border-[var(--outline)]"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-[var(--primary)] text-sm mb-1">{h.name}</p>
                    <p className="text-xs text-[var(--on-surface-variant)] mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>{h.address}
                    </p>
                    <div className="flex gap-3">
                      <span className="text-[10px] font-semibold text-[var(--on-surface-variant)] bg-[var(--surface-container-low)] px-2 py-0.5 rounded-full">
                        🕐 {h.hours}
                      </span>
                      <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        {h.bays} bays available
                      </span>
                    </div>
                  </div>
                  {hubId === h.id && <span className="material-symbols-outlined text-[var(--secondary)] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                </div>
              </button>
            ))}
            <button onClick={() => hubId && setStep(2)} disabled={!hubId}
              className={`w-full h-14 rounded-xl font-bold text-white transition-all ${hubId ? "bg-[var(--secondary)] hover:opacity-90" : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] cursor-not-allowed"}`}>
              Continue to Service Selection →
            </button>
          </div>
        )}

        {/* STEP 2: Service + Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--primary)] mb-1">Select Service</h2>
              <p className="text-xs text-[var(--on-surface-variant)] flex items-center gap-1 mb-4">
                <span className="material-symbols-outlined text-[14px]">location_on</span>{hub?.name}
              </p>
              <div className="space-y-2">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => setServiceId(s.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${serviceId === s.id ? "border-[var(--secondary)] bg-[var(--secondary)]/5" : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:border-[var(--outline)]"}`}>
                    <div>
                      <p className="font-semibold text-sm text-[var(--primary)]">{s.label}</p>
                      <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Est. {s.duration}</p>
                    </div>
                    <span className="text-xs font-bold text-[var(--secondary)] flex-shrink-0 ml-2">{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[var(--primary)] mb-1">Pick a Drop-off Time</h2>
              <p className="text-xs text-[var(--on-surface-variant)] mb-3">{TOMORROW()}</p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => setSlot(t)}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${slot === t ? "border-[var(--secondary)] bg-[var(--secondary)] text-white" : "border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:border-[var(--secondary)]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Additional Notes (optional)</label>
              <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Check the suspension noise too..." className="w-full p-3 rounded-xl border border-[var(--outline-variant)] outline-none focus:border-[var(--secondary)] text-sm resize-none bg-[var(--surface)]" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="h-14 px-6 rounded-xl border border-[var(--outline-variant)] font-semibold text-sm text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors">← Back</button>
              <button onClick={() => serviceId && slot && setStep(3)} disabled={!serviceId || !slot}
                className={`flex-1 h-14 rounded-xl font-bold text-white transition-all ${serviceId && slot ? "bg-[var(--secondary)] hover:opacity-90" : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] cursor-not-allowed"}`}>
                Review Booking →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-[var(--primary)]">Confirm Drop-off</h2>
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl overflow-hidden">
              {[
                ["Hub", hub?.name],
                ["Address", hub?.address],
                ["Service", service?.label],
                ["Estimated Duration", service?.duration],
                ["Drop-off Date", TOMORROW()],
                ["Drop-off Time", slot],
                ["Starting From", service?.price],
              ].map(([label, val]) => (
                <div key={String(label)} className="flex justify-between items-start px-5 py-3.5 border-b border-[var(--outline-variant)] last:border-0">
                  <span className="text-sm text-[var(--on-surface-variant)]">{label}</span>
                  <span className="text-sm font-semibold text-[var(--primary)] text-right max-w-[55%]">{val}</span>
                </div>
              ))}
              {note && (
                <div className="px-5 py-3.5">
                  <span className="text-sm text-[var(--on-surface-variant)]">Notes</span>
                  <p className="text-sm font-semibold text-[var(--primary)] mt-0.5">{note}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="h-14 px-6 rounded-xl border border-[var(--outline-variant)] font-semibold text-sm text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors">← Back</button>
              <button onClick={() => setStep("done")}
                className="flex-1 h-14 rounded-xl bg-[var(--secondary)] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">event_available</span>Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* DONE state */}
        {step === "done" && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary)]">Drop-off Confirmed!</h2>
              <p className="text-[var(--on-surface-variant)] mt-1 text-sm">Your slot is reserved. We'll send a reminder 1 hour before.</p>
            </div>
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl px-6 py-4 w-full max-w-xs">
              <p className="text-xs text-[var(--on-surface-variant)] mb-1">Booking Reference</p>
              <p className="text-xl font-mono font-bold text-[var(--secondary)]">{refNum}</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-2">{hub?.name}</p>
              <p className="text-xs font-semibold text-[var(--primary)]">{TOMORROW()} · {slot}</p>
            </div>
            <Link href="/customer/dashboard" className="w-full max-w-xs h-14 bg-[var(--primary)] text-white rounded-xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity">
              Back to Dashboard
            </Link>
          </div>
        )}

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
