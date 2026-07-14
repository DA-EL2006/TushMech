"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { pusherClient } from "@/app/lib/pusherClient";

type Phase = "idle" | "broadcasting" | "matched" | "enroute" | "arrived";

const EMERGENCY_TYPES = [
  { id: "breakdown", icon: "car_crash", label: "Complete Breakdown", desc: "Vehicle won't start or stalled mid-road", color: "#EF4444" },
  { id: "tyre", icon: "tire_repair", label: "Flat Tyre / Blowout", desc: "Need a spare fitted or tyre change", color: "#F97316" },
  { id: "accident", icon: "emergency", label: "Minor Accident / Damage", desc: "Fender bender — safe but needs assessment", color: "#EAB308" },
  { id: "battery", icon: "battery_alert", label: "Dead Battery / Jump Start", desc: "Battery flat, need a jump start or replacement", color: "#8B5CF6" },
  { id: "overheating", icon: "thermostat", label: "Engine Overheating", desc: "Temperature gauge in red, steam from hood", color: "#EF4444" },
  { id: "fuel", icon: "local_gas_station", label: "Out of Fuel", desc: "Stranded — need fuel delivery", color: "#06B6D4" },
];

export default function GuestSOSPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  
  const [location, setLocation] = useState("Locating...");
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [manualLocation, setManualLocation] = useState("");
  const [isManualLocation, setIsManualLocation] = useState(false);

  const [responder, setResponder] = useState<any>(null);
  const [eta, setEta] = useState(6);
  const [jobId, setJobId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  // Attempt Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Location error:", error);
          setLocation("Location access denied.");
          setIsManualLocation(true);
        }
      );
    } else {
      setLocation("Geolocation not supported.");
      setIsManualLocation(true);
    }
  }, []);

  // Pusher Subscription
  useEffect(() => {
    if (!customerId) return;
    
    const channel = pusherClient?.subscribe(`customer-${customerId}`);
    
    channel?.bind("job_updated", (data: any) => {
      if (jobId && data.job.id !== jobId) return;
      
      if (data.job.status === "ASSIGNED") {
        setResponder({
          name: data.job.mechanic,
          rating: "4.9",
          eta: 6,
          dist: "1.2 km",
          badge: "Verified"
        });
        setPhase("matched");
        
        setTimeout(() => {
          setPhase("enroute");
          let e = 6;
          const interval = setInterval(() => {
            e -= 1;
            setEta(e);
            if (e <= 0) { clearInterval(interval); setPhase("arrived"); }
          }, 1000);
        }, 2500);
      }
    });

    return () => {
      pusherClient?.unsubscribe(`customer-${customerId}`);
    };
  }, [customerId, jobId]);

  const handleSOS = async () => {
    if (!selected) return alert("Please select an emergency type.");
    if (!phone || phone.length < 10) return alert("Please enter a valid phone number.");
    if (isManualLocation && !manualLocation.trim()) return alert("Please enter your current location.");
    
    setPhase("broadcasting");
    
    const finalAddress = isManualLocation ? manualLocation : location;
    const finalLat = coords ? coords.lat : 9.0765; // fallback
    const finalLng = coords ? coords.lng : 7.3986; // fallback

    try {
      const emergency = EMERGENCY_TYPES.find(e => e.id === selected);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_guest: true,
          phone,
          reported_issue: emergency?.label,
          latitude: finalLat,
          longitude: finalLng,
          address: finalAddress,
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setJobId(data.job.id);
        setCustomerId(data.customer_id);
      } else {
        const errData = await res.json();
        alert(`Failed to broadcast SOS: ${errData.message}`);
        setPhase("idle");
      }
    } catch (err) {
      console.error(err);
      setPhase("idle");
    }
  };

  const emergency = EMERGENCY_TYPES.find(e => e.id === selected);

  if (phase === "broadcasting") return (
    <div className="min-h-screen bg-[#0F0A0A] flex flex-col items-center justify-center px-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-red-600/20 flex items-center justify-center animate-ping absolute inset-0" />
        <div className="w-32 h-32 rounded-full bg-red-600/30 flex items-center justify-center animate-ping absolute inset-0" style={{ animationDelay: "0.3s" }} />
        <div className="relative w-32 h-32 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
          <span className="material-symbols-outlined text-white text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-3 text-center">SOS Broadcasted</h2>
      <p className="text-red-300 text-center mb-2">Alerting all nearby TushMech responders...</p>
      <p className="text-white/50 text-sm text-center">{isManualLocation ? manualLocation : location}</p>
      <div className="mt-8 flex gap-1">
        {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
      </div>
    </div>
  );

  if (phase === "matched" || phase === "enroute") return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <header className="px-6 py-4 flex items-center justify-center border-b border-[var(--outline-variant)]">
        <Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <span className="material-symbols-outlined text-green-600 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {phase === "matched" ? "engineering" : "directions_car"}
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            {phase === "matched" ? "Responder Matched!" : `En Route — ETA ${eta} min`}
          </h2>
          {responder && <p className="text-[var(--on-surface-variant)] mt-1">{responder.name} · ⭐ {responder.rating} · {responder.dist} away</p>}
        </div>
        <div className="w-full max-w-sm bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--on-surface-variant)]">Emergency Type</span>
            <span className="text-sm font-bold text-[var(--primary)]">{emergency?.label}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--on-surface-variant)]">Your Location</span>
            <span className="text-sm font-semibold text-[var(--primary)] truncate ml-4">{isManualLocation ? manualLocation : location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--on-surface-variant)]">TushMech Badge</span>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{responder?.badge}</span>
          </div>
        </div>
        <button className="w-full max-w-sm h-12 border-2 border-red-500 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">call</span>Call Responder
        </button>
      </main>
    </div>
  );

  if (phase === "arrived") return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 space-y-6">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-green-600 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Responder Arrived!</h2>
        <p className="text-[var(--on-surface-variant)] mt-1">{responder?.name} is with you. Stay safe.</p>
      </div>
      <Link href="/login" className="w-full max-w-xs h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined">person</span>Complete Registration
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="px-4 h-16 flex items-center gap-3 border-b border-[var(--outline-variant)] sticky top-0 bg-[var(--surface-bright)] z-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--primary)]">arrow_back</span>
          <span className="font-semibold text-[var(--primary)]">Back</span>
        </Link>
      </header>

      <main className="py-8 max-w-lg mx-auto px-4 pb-24">
        {/* SOS Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-lg">
            <span className="material-symbols-outlined text-white text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--primary)]">Frictionless SOS</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-2">No account required. Request immediate assistance and we'll dispatch a verified TushMech responder instantly.</p>
        </div>

        {/* Contact & Location */}
        <div className="bg-[var(--surface-container-lowest)] p-5 rounded-2xl border border-[var(--outline-variant)] shadow-sm mb-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1 block">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="e.g. 08012345678" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-[var(--primary)] text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1 block">Current Location</label>
            {isManualLocation ? (
              <input 
                type="text" 
                placeholder="Enter nearby landmark or address..." 
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-[var(--primary)] text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              />
            ) : (
              <div className="flex items-center justify-between h-12 px-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                <span className="text-sm text-[var(--primary)] font-medium truncate mr-2">{location}</span>
                <span className="material-symbols-outlined text-[var(--secondary)] text-[18px]">my_location</span>
              </div>
            )}
            {!isManualLocation && (
              <button onClick={() => setIsManualLocation(true)} className="text-xs text-[var(--secondary)] font-semibold mt-2 hover:underline">
                Location inaccurate? Type it manually
              </button>
            )}
          </div>
        </div>

        {/* Emergency type grid */}
        <h2 className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-3 px-1">What's the emergency?</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {EMERGENCY_TYPES.map(e => (
            <button key={e.id} onClick={() => setSelected(e.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${selected === e.id ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:border-[var(--outline)]"}`}>
              <span className="material-symbols-outlined text-[28px] mb-2 block" style={{ color: e.color, fontVariationSettings: "'FILL' 1" }}>{e.icon}</span>
              <p className="text-xs font-bold text-[var(--primary)] leading-snug mb-0.5">{e.label}</p>
              <p className="text-[10px] text-[var(--on-surface-variant)] leading-snug">{e.desc}</p>
              {selected === e.id && <span className="mt-2 inline-flex items-center text-[10px] font-bold text-red-600"><span className="material-symbols-outlined text-[12px] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>radio_button_checked</span>Selected</span>}
            </button>
          ))}
        </div>

        {/* SOS Button */}
        <button onClick={handleSOS} disabled={!selected || !phone}
          className={`w-full h-16 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 transition-all shadow-lg ${selected && phone ? "bg-red-600 hover:bg-red-700 text-white active:scale-[0.98]" : "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] cursor-not-allowed opacity-60"}`}>
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
          SEND HELP NOW
        </button>
      </main>
    </div>
  );
}
