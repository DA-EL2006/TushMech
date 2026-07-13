"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

const vehicle = {
  make: "Toyota", model: "Camry", year: "2016", vin: "4T1BF1FK0GU234567",
  engine: "2.5L 4-Cylinder", transmission: "Automatic", fuel: "Petrol",
  mileage: "64,250 km", color: "Pearl White", plate: "ABC-1234",
  image: "/images/car_camry.jpg",
};

const history = [
  { id: "SH-009", date: "Oct 24, 2024", type: "Full Diagnostic", mechanic: "David O.", mileage: "64,250 km", cost: "₦ 18,500", codes: ["P0420"], notes: "Catalytic converter efficiency below threshold. Monitoring recommended." },
  { id: "SH-008", date: "Aug 10, 2024", type: "Oil & Filter Change", mechanic: "Sarah J.", mileage: "60,100 km", cost: "₦ 12,000", codes: [], notes: "Synthetic 5W-30. Filter replaced. No faults found." },
  { id: "SH-007", date: "May 3, 2024", type: "Brake Pad Replacement", mechanic: "Mike R.", mileage: "55,800 km", cost: "₦ 35,000", codes: [], notes: "Front and rear brake pads replaced with OEM Brembo pads." },
  { id: "SH-006", date: "Jan 15, 2024", type: "Annual Service", mechanic: "David O.", mileage: "50,200 km", cost: "₦ 45,000", codes: [], notes: "Full 50k service. Air filter, spark plugs, transmission fluid topped up." },
  { id: "SH-005", date: "Sep 20, 2023", type: "Battery Replacement", mechanic: "Emeka K.", mileage: "46,500 km", cost: "₦ 28,000", codes: ["P0562"], notes: "Low system voltage. Battery replaced with 60Ah Exide." },
];

const specs = [
  { label: "VIN", value: "4T1BF1FK0GU234567", icon: "fingerprint" },
  { label: "Engine", value: "2.5L 4-Cylinder", icon: "settings_suggest" },
  { label: "Transmission", value: "Automatic", icon: "sync_alt" },
  { label: "Fuel Type", value: "Petrol", icon: "local_gas_station" },
  { label: "Drivetrain", value: "Front-Wheel Drive (FWD)", icon: "tire_repair" },
  { label: "Current Mileage", value: "64,250 km", icon: "speed" },
  { label: "Exterior Colour", value: "Pearl White", icon: "palette" },
  { label: "License Plate", value: "ABC-1234", icon: "badge" },
];

const docs = [
  { name: "Diagnostic Report — Oct 2024", date: "Oct 24, 2024", icon: "description", type: "Report" },
  { name: "Annual Service Certificate 2024", date: "Jan 15, 2024", icon: "verified", type: "Certificate" },
  { name: "Vehicle Registration Cert.", date: "Mar 2023", icon: "badge", type: "Reg" },
  { name: "Insurance Policy Document", date: "Jun 2024", icon: "shield", type: "Insurance" },
];

export default function CustomerGarage() {
  const [tab, setTab] = useState<"history" | "specs" | "docs">("history");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <TopAppBar showBack backHref="/customer/dashboard" title="Digital Garage" centered={false} />
      <main className="pt-16 max-w-3xl mx-auto px-4">

        {/* Vehicle hero */}
        <div className="relative rounded-2xl overflow-hidden shadow-level-2 mb-5 mt-4 border border-[var(--outline-variant)]">
          <div className="relative h-44 w-full">
            <Image src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">{vehicle.plate}</p>
              <h2 className="text-2xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
              <p className="text-sm text-white/70 mt-0.5">{vehicle.mileage} · {vehicle.fuel}</p>
            </div>
            <Link href="/customer/booking" className="bg-[var(--secondary)] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[16px]">build</span> Book Service
            </Link>
          </div>
        </div>

        {/* Due soon */}
        <div className="bg-[var(--error-container)]/20 border border-[var(--error)]/30 rounded-xl p-4 mb-5 flex items-center gap-3">
          <span className="material-symbols-outlined text-[var(--error)]">warning</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--error)]">Service Due Soon</p>
            <p className="text-xs text-[var(--on-surface-variant)]">Oil Change due in 400km</p>
          </div>
          <Link href="/customer/booking" className="text-xs font-bold text-[var(--error)] flex items-center gap-1 hover:underline">
            Schedule <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--outline-variant)] mb-6">
          {(["history","specs","docs"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold capitalize relative transition-colors ${tab===t ? "text-[var(--secondary)]" : "text-[var(--on-surface-variant)]"}`}>
              {t === "history" ? "Service History" : t === "specs" ? "Specifications" : "Documents"}
              {tab===t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--secondary)] rounded-full" />}
            </button>
          ))}
        </div>

        {/* History */}
        {tab === "history" && (
          <div className="relative pb-8">
            <div className="absolute left-[19px] top-2 bottom-8 w-0.5 bg-[var(--outline-variant)]" />
            <div className="space-y-4">
              {history.map(job => (
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
          </div>
        )}

        {/* Specs */}
        {tab === "specs" && (
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl overflow-hidden mb-6">
            {specs.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-4 px-5 py-4 ${i < specs.length-1 ? "border-b border-[var(--outline-variant)]" : ""}`}>
                <span className="material-symbols-outlined text-[var(--secondary)] text-[20px] w-6 flex-shrink-0">{s.icon}</span>
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm text-[var(--on-surface-variant)]">{s.label}</span>
                  <span className="text-sm font-semibold text-[var(--primary)] font-mono">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Docs */}
        {tab === "docs" && (
          <div className="space-y-3 mb-6">
            {docs.map(d => (
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
