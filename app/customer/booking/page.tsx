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
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trackingPhase, setTrackingPhase] = useState<"idle"|"finding"|"assigned"|"enroute"|"arriving"|"done"|"scheduling"|"bay_assigned"|"dropoff_confirmed">("idle");
  const [eta, setEta] = useState(12);
  const [deliveryMethod, setDeliveryMethod] = useState<"mobile"|"hub">("mobile");

  const services = [
    { icon: "health_and_safety", title: "Diagnostics", desc: "Check engine light or weird noises." },
    { icon: "oil_barrel", title: "Oil Change", desc: "Standard or synthetic oil refresh." },
    { icon: "battery_charging_full", title: "Battery", desc: "Jump start or replacement." },
    { icon: "more_horiz", title: "Custom", desc: "Describe your issue to a tech." },
  ];

  // Hardcoded for demo - in production this would use Geolocation API
  const userLocation: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria
  const hubLocation: [number, number] = [9.0765, 7.3986]; // Abuja, Nigeria
  
  // Simulated nearby mechanics
  const mechanicMarkers = useMemo(() => [
    { lat: 6.5260, lng: 3.3780, isMechanic: true, title: "TushMech T1" },
    { lat: 6.5220, lng: 3.3820, isMechanic: true, title: "TushMech T2" },
    { lat: 6.5255, lng: 3.3850, isMechanic: true, title: "TushMech T3" }
  ], []);

  const mapCenter = deliveryMethod === "mobile" ? userLocation : hubLocation;
  const mapZoom = deliveryMethod === "mobile" ? 14 : 16;
  const mapMarkers = deliveryMethod === "mobile" ? mechanicMarkers : [{ lat: hubLocation[0], lng: hubLocation[1], isMechanic: true, title: "TushMech Hub Abuja" }];

  const handleRequest = async () => {
    setLoading(true);
    if (deliveryMethod === "mobile") {
      setTrackingPhase("finding");
      setTimeout(() => {
        setTrackingPhase("assigned");
        setTimeout(() => {
          setTrackingPhase("enroute");
          let e = 12;
          const interval = setInterval(() => {
            e -= 1;
            setEta(e);
            if (e <= 2) setTrackingPhase("arriving");
            if (e <= 0) {
              clearInterval(interval);
              setTrackingPhase("done");
            }
          }, 800);
        }, 2000);
      }, 2500);
    } else {
      setTrackingPhase("scheduling");
      setTimeout(() => {
        setTrackingPhase("bay_assigned");
        setTimeout(() => {
          setTrackingPhase("dropoff_confirmed");
        }, 2000);
      }, 2500);
    }
    setLoading(false);
  };

  // Tracking status config
  const mobilePhases = [
    { key: "finding", label: "Finding nearest mechanic...", icon: "search", color: "var(--warning-orange)" },
    { key: "assigned", label: "Mechanic Assigned!", icon: "engineering", color: "var(--electric-blue)" },
    { key: "enroute", label: `En Route — ETA ${eta} min`, icon: "directions_car", color: "var(--secondary)" },
    { key: "arriving", label: "Mechanic is arriving!", icon: "location_on", color: "var(--verification-green)" },
    { key: "done", label: "Job Complete ✓", icon: "check_circle", color: "var(--verification-green)" },
  ];
  
  const hubPhases = [
    { key: "scheduling", label: "Checking bay availability...", icon: "calendar_month", color: "var(--warning-orange)" },
    { key: "bay_assigned", label: "Service Bay Assigned", icon: "garage", color: "var(--electric-blue)" },
    { key: "dropoff_confirmed", label: "Drop-off Confirmed ✓", icon: "check_circle", color: "var(--verification-green)" },
  ];

  const currentPhase = [...mobilePhases, ...hubPhases].find(p => p.key === trackingPhase);

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
            {trackingPhase === "dropoff_confirmed" && <p className="text-[var(--on-surface-variant)] text-sm">Tomorrow, 10:00 AM @ Abuja Hub</p>}
          </div>
          {/* Progress steps */}
          <div className="flex justify-between items-center px-4">
            {(deliveryMethod === "mobile" ? ["finding","assigned","enroute","arriving","done"] : ["scheduling","bay_assigned","dropoff_confirmed"]).map((step, i, arr) => {
              const current = arr.indexOf(trackingPhase);
              const done = i <= current;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all z-10 shrink-0"
                    style={{ background: done ? "var(--secondary)" : "var(--surface-container-low)", border: done ? "none" : "2px solid var(--outline-variant)" }}>
                    {done && <span className="material-symbols-outlined text-[14px] text-white" style={{fontVariationSettings:"'FILL' 1"}}>check</span>}
                  </div>
                  {i < arr.length - 1 && <div className="h-0.5 flex-1 -ml-2 -mr-2" style={{ background: i < current ? "var(--secondary)" : "var(--outline-variant)" }} />}
                </div>
              );
            })}
          </div>
          {trackingPhase === "done" || trackingPhase === "dropoff_confirmed" ? (
            <div className="space-y-3 pt-6">
              <p className="text-sm text-[var(--on-surface-variant)]">
                {trackingPhase === "done" ? "Your vehicle has been serviced. Rate your experience!" : "Your drop-off slot is reserved. We'll send a reminder SMS."}
              </p>
              {trackingPhase === "done" && (
                <a href="/customer/rate-job" className="block w-full h-14 bg-[var(--primary)] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined">star</span>Rate This Job
                </a>
              )}
              <a href="/customer/dashboard" className={`block w-full h-14 border border-[var(--outline-variant)] text-[var(--on-surface-variant)] rounded-xl text-sm font-bold flex items-center justify-center hover:bg-[var(--surface-container-low)] transition-colors ${trackingPhase === "dropoff_confirmed" ? "bg-[var(--primary)] border-[var(--primary)] text-white hover:bg-[var(--primary)]/90" : ""}`}>
                Back to Dashboard
              </a>
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
      <main className="flex-1 relative mt-12 mb-[450px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <MapComponent center={mapCenter} zoom={mapZoom} markers={mapMarkers} />
        </div>
        
        {/* Map Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-container-lowest)]/40 via-transparent to-[var(--surface-container-lowest)]/80 z-10 pointer-events-none" />
        
        <button className="absolute bottom-8 right-6 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[var(--outline-variant)]/50 flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--primary)] active:scale-95 transition-all">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </main>

      {/* Bottom Sheet */}
      <section className="absolute bottom-0 left-0 w-full bg-[var(--surface-container-lowest)] rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] border-t border-[var(--outline-variant)]/30 z-40 pt-4 px-6 pb-safe flex flex-col h-[450px]">
        <div className="bottom-sheet-handle w-12 h-1.5 bg-[var(--outline-variant)]/50 mx-auto" />
        
        {/* Delivery Method Toggle */}
        <div className="mt-4 mb-5 flex p-1 bg-[var(--surface-container-low)] rounded-xl border border-[var(--outline-variant)]">
          <button 
            onClick={() => setDeliveryMethod("mobile")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-colors ${deliveryMethod === "mobile" ? "bg-white text-[var(--electric-blue)] shadow-sm" : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"}`}
          >
            <span className="material-symbols-outlined text-[18px]">engineering</span> Mobile Triage
          </button>
          <button 
            onClick={() => setDeliveryMethod("hub")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-colors ${deliveryMethod === "hub" ? "bg-white text-[var(--electric-blue)] shadow-sm" : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"}`}
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span> Hub Drop-off
          </button>
        </div>

        <div className="mb-2">
          <h2 className="text-xl font-semibold text-[var(--primary)] tracking-tight">
            {deliveryMethod === "mobile" ? "Select Triage Service" : "Select Drop-off Service"}
          </h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">
            {deliveryMethod === "mobile" ? "A mechanic will come to you." : "Bring your vehicle to the Abuja Hub."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 overflow-y-auto mb-6 pb-2 px-1">
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
        <div className="mt-auto pt-2 pb-6 bg-gradient-to-t from-[var(--surface-container-lowest)] via-[var(--surface-container-lowest)] to-transparent -mx-6 px-6">
          <button 
            onClick={handleRequest}
            disabled={loading}
            className="w-full h-14 bg-[var(--primary)] text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-[var(--primary)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : (
              <>
                <span>{deliveryMethod === "mobile" ? "Request Triage" : "Schedule Drop-off"}</span>
                <span className="material-symbols-outlined text-[20px]">{deliveryMethod === "mobile" ? "arrow_forward" : "event"}</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
