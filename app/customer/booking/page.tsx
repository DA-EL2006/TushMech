"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import TopAppBar from "../../components/TopAppBar";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Dynamically import Leaflet map (client-side only)
const MapComponent = dynamic(() => import("../../components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--surface-container-low)] flex items-center justify-center animate-pulse"><span className="material-symbols-outlined text-[var(--secondary)] text-4xl animate-spin">progress_activity</span></div>
});

export default function BookingMap() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const services = [
    { icon: "health_and_safety", title: "Diagnostics", desc: "Check engine light or weird noises." },
    { icon: "oil_barrel", title: "Oil Change", desc: "Standard or synthetic oil refresh." },
    { icon: "battery_charging_full", title: "Battery", desc: "Jump start or replacement." },
    { icon: "more_horiz", title: "Custom", desc: "Describe your issue to a tech." },
  ];

  // Hardcoded for demo - in production this would use Geolocation API
  const userLocation: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria
  
  // Simulated nearby mechanics
  const mechanicMarkers = useMemo(() => [
    { lat: 6.5260, lng: 3.3780, isMechanic: true, title: "TushMech T1" },
    { lat: 6.5220, lng: 3.3820, isMechanic: true, title: "TushMech T2" },
    { lat: 6.5255, lng: 3.3850, isMechanic: true, title: "TushMech T3" }
  ], []);

  const handleRequestTriage = async () => {
    if (!session?.user?.id) {
      alert("Please sign in to request a mechanic.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      // 1. We assume the user has a vehicle. In a real app we'd let them select it.
      // For MVP, we will fetch their vehicle or use a fallback.
      // Since we just need to hit the API, we'll send a request to a temporary vehicle ID if we don't know it,
      // but the API expects `vehicle_id`. Let's assume the seeded vehicle or fetch it.
      // For Hackathon speed, we can fetch their vehicles first or just use a dummy one if it fails.
      
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: session.user.id,
          // HACK: Hardcoded for MVP since we don't have a vehicle selector UI built in this view yet.
          // In a real scenario, this would come from a dropdown.
          // Using a placeholder UUID or the API will handle it if we adjust the API.
          // Wait, our API requires a real vehicle_id for the Prisma foreign key.
          // We will modify the API or just send a dummy string and handle it on the server.
          // Let's send a flag and let the server pick their first vehicle.
          fetch_first_vehicle: true, 
          reported_issue: services[selected].title,
          latitude: userLocation[0],
          longitude: userLocation[1],
          address: "Lekki Phase 1, Lagos"
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("Mechanic requested! They are reviewing your triage request.");
      router.push("/customer/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to request mechanic");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-container-lowest)] text-[var(--on-surface)] flex flex-col relative overflow-hidden antialiased">
      <TopAppBar showBack backHref="/customer/dashboard" />
      
      {/* Map Area */}
      <main className="flex-1 relative mt-12 mb-[400px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <MapComponent center={userLocation} zoom={14} markers={mechanicMarkers} />
        </div>
        
        {/* Map Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-container-lowest)]/40 via-transparent to-[var(--surface-container-lowest)]/80 z-10 pointer-events-none" />
        
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
          <button 
            onClick={handleRequestTriage}
            disabled={loading}
            className="w-full h-14 bg-[var(--primary)] text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-[var(--primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : (
              <>
                <span>Request Triage</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
