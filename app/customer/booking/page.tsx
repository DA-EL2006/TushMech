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
  const [trackingPhase, setTrackingPhase] = useState<"idle"|"finding"|"assigned"|"enroute"|"arriving"|"done">("idle");
  const [eta, setEta] = useState(12);

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
    setLoading(true);
    // Simulate finding mechanic
    setTrackingPhase("finding");
    setTimeout(() => {
      setTrackingPhase("assigned");
      setTimeout(() => {
        setTrackingPhase("enroute");
        // Count down ETA
        let e = 12;
        const interval = setInterval(() => {
          e -= 1;
          setEta(e);
          if (e <= 2) {
            setTrackingPhase("arriving");
          }
          if (e <= 0) {
            clearInterval(interval);
            setTrackingPhase("done");
          }
        }, 800);
      }, 2000);
    }, 2500);
    setLoading(false);
  };

  // Tracking status config
  const phases = [
    { key: "finding", label: "Finding nearest mechanic...", icon: "search", color: "var(--warning-orange)" },
    { key: "assigned", label: "Mechanic Assigned!", icon: "engineering", color: "var(--electric-blue)" },
    { key: "enroute", label: `En Route — ETA ${eta} min`, icon: "directions_car", color: "var(--secondary)" },
    { key: "arriving", label: "Mechanic is arriving!", icon: "location_on", color: "var(--verification-green)" },
    { key: "done", label: "Job Complete ✓", icon: "check_circle", color: "var(--verification-green)" },
  ];
  const currentPhase = phases.find(p => p.key === trackingPhase);

  if (trackingPhase !== "idle") return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <TopAppBar showBack backHref="/customer/dashboard" />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 mt-12">
        <div className="w-full max-w-sm text-center space-y-8">
          {/* Animated icon */}
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center shadow-level-2" style={{ background: `${currentPhase?.color}20`, border: `2px solid ${currentPhase?.color}40` }}>
            <span className="material-symbols-outlined text-5xl" style={{ color: currentPhase?.color, fontVariationSettings: "'FILL' 1" }}>{currentPhase?.icon}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">{currentPhase?.label}</h2>
            {trackingPhase === "enroute" && <p className="text-[var(--on-surface-variant)] text-sm">David O. — TushMech Technician</p>}
          </div>
          {/* Progress steps */}
          <div className="flex justify-between items-center">
            {["finding","assigned","enroute","arriving","done"].map((step, i) => {
              const phaseOrder = ["finding","assigned","enroute","arriving","done"];
              const current = phaseOrder.indexOf(trackingPhase);
              const done = i <= current;
              return (
                <div key={step} className="flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                    style={{ background: done ? "var(--secondary)" : "var(--surface-container-low)", border: done ? "none" : "2px solid var(--outline-variant)" }}>
                    {done && <span className="material-symbols-outlined text-[14px] text-white" style={{fontVariationSettings:"'FILL' 1"}}>check</span>}
                  </div>
                  {i < 4 && <div className="w-10 h-0.5" style={{ background: i < current ? "var(--secondary)" : "var(--outline-variant)" }} />}
                </div>
              );
            })}
          </div>
          {trackingPhase === "done" ? (
            <div className="space-y-3">
              <p className="text-sm text-[var(--on-surface-variant)]">Your vehicle has been serviced. Rate your experience!</p>
              <a href="/customer/rate-job" className="block w-full h-14 bg-[var(--primary)] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined">star</span>Rate This Job
              </a>
              <a href="/customer/dashboard" className="block w-full h-12 border border-[var(--outline-variant)] text-[var(--on-surface-variant)] rounded-xl text-sm font-semibold flex items-center justify-center hover:bg-[var(--surface-container-low)] transition-colors">Back to Dashboard</a>
            </div>
          ) : (
            <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4">
              <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1">Selected Service</p>
              <p className="text-sm font-bold text-[var(--primary)]">{services[selected].title}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );

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
