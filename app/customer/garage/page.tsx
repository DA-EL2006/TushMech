"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";
import { findMatchingCarImage } from "../../lib/carDatabase";

interface CarDetails {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  mileage: string;
  licensePlate: string;
  color: string;
  knownIssues: string;
}

// Fallback demo data if the user hasn't gone through onboarding yet
const DEMO_CAR: CarDetails = {
  id: "demo",
  make: "Toyota",
  model: "Camry",
  year: "2016",
  vin: "4T1BF1FK0GU234567",
  engine: "2.5L 4-Cylinder",
  transmission: "Automatic",
  drivetrain: "FWD",
  fuelType: "Petrol",
  mileage: "64250",
  licensePlate: "ABC-1234",
  color: "Pearl White",
  knownIssues: "",
};

const HISTORY = [
  { id: "SH-009", date: "Oct 24, 2024", type: "Full Diagnostic", mechanic: "David O.", mileage: "64,250 km", cost: "₦ 18,500", codes: ["P0420"], notes: "Catalytic converter efficiency below threshold. Monitoring recommended." },
  { id: "SH-008", date: "Aug 10, 2024", type: "Oil & Filter Change", mechanic: "Sarah J.", mileage: "60,100 km", cost: "₦ 12,000", codes: [], notes: "Synthetic 5W-30. Filter replaced. No faults found." },
  { id: "SH-007", date: "May 3, 2024", type: "Brake Pad Replacement", mechanic: "Mike R.", mileage: "55,800 km", cost: "₦ 35,000", codes: [], notes: "Front and rear brake pads replaced with OEM Brembo pads." },
  { id: "SH-006", date: "Jan 15, 2024", type: "Annual Service", mechanic: "David O.", mileage: "50,200 km", cost: "₦ 45,000", codes: [], notes: "Full 50k service. Air filter, spark plugs, transmission fluid topped up." },
  { id: "SH-005", date: "Sep 20, 2023", type: "Battery Replacement", mechanic: "Emeka K.", mileage: "46,500 km", cost: "₦ 28,000", codes: ["P0562"], notes: "Low system voltage. Battery replaced with 60Ah Exide." },
];

const DOCS = [
  { name: "Diagnostic Report — Oct 2024", date: "Oct 24, 2024", icon: "description", type: "Report" },
  { name: "Annual Service Certificate 2024", date: "Jan 15, 2024", icon: "verified", type: "Certificate" },
  { name: "Vehicle Registration Cert.", date: "Mar 2023", icon: "badge", type: "Reg" },
  { name: "Insurance Policy Document", date: "Jun 2024", icon: "shield", type: "Insurance" },
];

function formatMileage(raw: string) {
  const n = parseInt(raw.replace(/\D/g, ""), 10);
  return isNaN(n) ? raw : `${n.toLocaleString()} km`;
}

function drivetrainLabel(dt: string) {
  const map: Record<string, string> = { FWD: "Front-Wheel Drive (FWD)", RWD: "Rear-Wheel Drive (RWD)", AWD: "All-Wheel Drive (AWD)", "4WD": "Four-Wheel Drive (4WD)" };
  return map[dt] || dt || "—";
}

export default function CustomerGarage() {
  const [cars, setCars] = useState<CarDetails[]>([]);
  const [activeCarIdx, setActiveCarIdx] = useState(0);
  const [tab, setTab] = useState<"history" | "specs" | "docs">("history");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tushmech_garage");
      if (raw) {
        const parsed: CarDetails[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCars(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setCars([DEMO_CAR]);
    setLoaded(true);
  }, []);

  if (!loaded) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="material-symbols-outlined animate-spin text-4xl text-[var(--secondary)]">progress_activity</span>
    </div>
  );

  const car = cars[activeCarIdx] || DEMO_CAR;
  const displayName = `${car.year} ${car.make} ${car.model}`.trim();
  const plate = car.licensePlate || "—";

  const carImageUrl = findMatchingCarImage({
    make: car.make,
    model: car.model,
    year: car.year,
    transmission: car.transmission,
    fuelType: car.fuelType,
    engine: car.engine
  });

  const specs = [
    { label: "VIN", value: car.vin || "—", icon: "fingerprint" },
    { label: "Engine", value: car.engine || "—", icon: "settings_suggest" },
    { label: "Transmission", value: car.transmission || "—", icon: "sync_alt" },
    { label: "Fuel Type", value: car.fuelType || "—", icon: "local_gas_station" },
    { label: "Drivetrain", value: drivetrainLabel(car.drivetrain), icon: "tire_repair" },
    { label: "Current Mileage", value: formatMileage(car.mileage), icon: "speed" },
    { label: "Exterior Colour", value: car.color || "—", icon: "palette" },
    { label: "License Plate", value: plate, icon: "badge" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopAppBar showBack backHref="/customer/dashboard" title="Digital Garage" centered={false} />

      <main className="pt-16 max-w-3xl mx-auto px-4">

        {/* Multi-vehicle tab (if user added more than one car) */}
        {cars.length > 1 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-3">
            {cars.map((c, i) => (
              <button key={c.id} onClick={() => setActiveCarIdx(i)}
                className={`flex-shrink-0 px-4 h-9 rounded-full text-xs font-semibold border transition-all ${activeCarIdx === i ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>
                {c.year} {c.make} {c.model}
              </button>
            ))}
          </div>
        )}

        {/* Vehicle hero card */}
        <div className="relative rounded-2xl overflow-hidden shadow-level-2 mb-5 mt-4 border border-[var(--outline-variant)] bg-[var(--deep-navy)]">
          {carImageUrl && (
            <div className="absolute inset-0 opacity-40 mix-blend-screen bg-center bg-cover pointer-events-none" style={{ backgroundImage: `url(${carImageUrl})` }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-navy)] to-transparent pointer-events-none" />
          
          <div className="relative z-10 p-6 text-white flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {!carImageUrl && <span className="material-symbols-outlined text-[var(--secondary)] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>}
                {plate !== "—" && (
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{plate}</span>
                )}
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-1">
                {displayName || "Your Vehicle"}
              </h2>
              <p className="text-sm text-white/70">
                {car.fuelType || "Petrol"} · {formatMileage(car.mileage)}
                {car.engine ? ` · ${car.engine}` : ""}
              </p>
            </div>
            <Link href="/customer/booking"
              className="flex-shrink-0 bg-[var(--secondary)] text-[var(--on-secondary)] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 hover:opacity-90 transition-opacity mt-1">
              <span className="material-symbols-outlined text-[16px]">build</span>Book Service
            </Link>
          </div>

          {/* Health bar */}
          <div className="relative z-10 px-6 pb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Vehicle Health</span>
              <span className="text-xs font-bold text-green-300">
                {car.knownIssues ? "Check Required" : "Optimal"}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className={`h-2 rounded-full transition-all ${car.knownIssues ? "bg-amber-400 w-[65%]" : "bg-green-400 w-[92%]"}`} />
            </div>
          </div>
        </div>

        {/* Known issues alert if filled in */}
        {car.knownIssues && (
          <div className="bg-[var(--error-container)]/20 border border-[var(--error)]/30 rounded-xl p-4 mb-5 flex items-start gap-3">
            <span className="material-symbols-outlined text-[var(--error)] mt-0.5">warning</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--error)]">Reported Issues</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-0.5 leading-relaxed">{car.knownIssues}</p>
            </div>
            <Link href="/customer/booking" className="text-xs font-bold text-[var(--error)] hover:underline flex items-center gap-1 flex-shrink-0">
              Book <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[var(--outline-variant)] mb-6">
          {(["history", "specs", "docs"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold capitalize relative transition-colors ${tab === t ? "text-[var(--secondary)]" : "text-[var(--on-surface-variant)]"}`}>
              {t === "history" ? "Service History" : t === "specs" ? "Specifications" : "Documents"}
              {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--secondary)] rounded-full" />}
            </button>
          ))}
        </div>

        {/* Service History */}
        {tab === "history" && (
          <div className="relative pb-8">
            <div className="absolute left-[19px] top-2 bottom-8 w-0.5 bg-[var(--outline-variant)]" />
            <div className="space-y-4">
              {HISTORY.map(job => (
                <div key={job.id} className="relative pl-10">
                  <div className="absolute left-0 top-4 w-10 h-10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[var(--secondary)] border-4 border-[var(--background)] shadow-sm" />
                  </div>
                  <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl overflow-hidden shadow-sm cursor-pointer"
                    onClick={() => setExpanded(expanded === job.id ? null : job.id)}>
                    <div className="p-4 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[var(--secondary)]">{job.id}</span>
                          <span className="text-xs text-[var(--on-surface-variant)]">· {job.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[var(--primary)]">{job.type}</h4>
                        <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Mechanic: {job.mechanic} · {job.mileage}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-[var(--primary)]">{job.cost}</p>
                        <span className="material-symbols-outlined text-[var(--on-surface-variant)] text-[18px] mt-1 block transition-transform"
                          style={{ transform: expanded === job.id ? "rotate(180deg)" : "rotate(0deg)" }}>expand_more</span>
                      </div>
                    </div>
                    {expanded === job.id && (
                      <div className="border-t border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 space-y-3">
                        {job.codes.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2">OBD2 Codes</p>
                            <div className="flex gap-2">{job.codes.map(c => (
                              <span key={c} className="bg-[var(--error-container)]/40 border border-[var(--error)]/20 text-[var(--error)] text-xs font-bold px-2 py-1 rounded">{c}</span>
                            ))}</div>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1">Technician Notes</p>
                          <p className="text-sm text-[var(--on-surface)] leading-relaxed">{job.notes}</p>
                        </div>
                        <Link href="/customer/my-report" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--secondary)] hover:underline">
                          <span className="material-symbols-outlined text-[16px]">description</span>View Full Report
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative pl-10 mt-4">
              <div className="absolute left-0 top-4 w-10 h-10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[var(--outline-variant)] border-4 border-[var(--background)]" />
              </div>
              <div className="bg-[var(--surface-container-lowest)] border border-dashed border-[var(--outline-variant)] rounded-xl p-4 text-center">
                <p className="text-xs text-[var(--on-surface-variant)]">Vehicle registered — {car.year || "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Specs — from form data */}
        {tab === "specs" && (
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl overflow-hidden mb-6">
            {specs.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-4 px-5 py-4 ${i < specs.length - 1 ? "border-b border-[var(--outline-variant)]" : ""}`}>
                <span className="material-symbols-outlined text-[var(--secondary)] text-[20px] w-6 flex-shrink-0">{s.icon}</span>
                <div className="flex-1 flex justify-between items-center gap-4">
                  <span className="text-sm text-[var(--on-surface-variant)]">{s.label}</span>
                  <span className="text-sm font-semibold text-[var(--primary)] font-mono text-right">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Docs */}
        {tab === "docs" && (
          <div className="space-y-3 mb-6">
            {DOCS.map(d => (
              <div key={d.name} className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4 flex items-center gap-4 hover:border-[var(--secondary)] transition-colors cursor-pointer group shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--secondary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[var(--secondary)] text-[20px]">{d.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--primary)] truncate">{d.name}</p>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">{d.type} · {d.date}</p>
                </div>
                <span className="material-symbols-outlined text-[var(--on-surface-variant)] group-hover:text-[var(--secondary)] transition-colors">download</span>
              </div>
            ))}
            <button className="w-full py-3 border border-dashed border-[var(--outline-variant)] rounded-xl text-sm font-semibold text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">upload_file</span>Upload Document
            </button>
          </div>
        )}

      </main>

      <BottomNavBar activeTab="Garage" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/dashboard" },
      ]} />
    </div>
  );
}
