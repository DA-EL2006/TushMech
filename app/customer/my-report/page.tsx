"use client";
import TopAppBar from "../../components/TopAppBar";

const report = {
  vehicle: "2016 Toyota Camry",
  plate: "ABC-1234",
  date: "Oct 24, 2024",
  mechanic: "David O.",
  healthScore: 78,
  summary: "Your vehicle is in generally good condition. One fault code was detected related to the catalytic converter. Routine maintenance items are approaching their service intervals.",
  codes: [
    { code: "P0420", title: "Catalyst System Efficiency Below Threshold (Bank 1)", severity: "warning", plain: "Your exhaust catalyst (catalytic converter) isn't cleaning exhaust gases as efficiently as it should. This won't stop the car but will cause it to fail emissions testing and reduce fuel efficiency over time." },
  ],
  checks: [
    { name: "Brakes & Rotors", result: "Good", icon: "check_circle", ok: true },
    { name: "Electrical System", result: "Battery 12.6V — Healthy", icon: "check_circle", ok: true },
    { name: "Engine & Drivetrain", result: "1 fault code detected", icon: "warning", ok: false },
    { name: "Tires & Pressure", result: "All within spec", icon: "check_circle", ok: true },
    { name: "Fluid Levels", result: "All OK", icon: "check_circle", ok: true },
    { name: "Transmission", result: "Good", icon: "check_circle", ok: true },
  ],
  estimate: [
    { desc: "Catalytic Converter Replacement", type: "Parts", qty: 1, price: 185000 },
    { desc: "Labor — Installation", type: "Labor", qty: "3 hrs", price: 45000 },
  ],
};

const healthColor = report.healthScore >= 80 ? "var(--verification-green)" : report.healthScore >= 60 ? "var(--warning-orange)" : "var(--error)";
const healthLabel = report.healthScore >= 80 ? "Good" : report.healthScore >= 60 ? "Fair" : "Needs Attention";

export default function MyReport() {
  const total = report.estimate.reduce((s, i) => s + i.price, 0);
  const vat = Math.round(total * 0.075);

  return (
    <div className="min-h-screen bg-[var(--surface-bright)]">
      <TopAppBar showBack backHref="/customer/garage" title="Diagnostic Report" centered={false} />

      <main className="pt-20 pb-32 px-4 max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white border border-[var(--outline-variant)] rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-bold text-[var(--primary)]">Diagnostic Report</h1>
              <p className="text-sm text-[var(--on-surface-variant)] mt-0.5">{report.vehicle} · {report.plate}</p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">Inspected by {report.mechanic} · {report.date}</p>
            </div>
            {/* Health Score ring */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--surface-container-low)" strokeWidth="8" />
                <circle cx="36" cy="36" r="30" fill="none" stroke={healthColor} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - report.healthScore / 100)}`}
                  strokeLinecap="round" transform="rotate(-90 36 36)" />
                <text x="36" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill={healthColor}>{report.healthScore}</text>
              </svg>
              <span className="text-xs font-bold mt-1" style={{ color: healthColor }}>{healthLabel}</span>
            </div>
          </div>
          <p className="text-sm text-[var(--on-surface)] leading-relaxed bg-[var(--surface-container-lowest)] rounded-xl p-4 border border-[var(--outline-variant)]">{report.summary}</p>
        </div>

        {/* Multi-point checklist */}
        <div className="bg-white border border-[var(--outline-variant)] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <h2 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Multi-Point Inspection</h2>
          </div>
          <div className="divide-y divide-[var(--outline-variant)]">
            {report.checks.map(c => (
              <div key={c.name} className="flex items-center gap-4 px-5 py-3.5">
                <span className="material-symbols-outlined text-[20px] flex-shrink-0"
                  style={{ color: c.ok ? "var(--verification-green)" : "var(--warning-orange)", fontVariationSettings: "'FILL' 1" }}>
                  {c.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--on-surface)]">{c.name}</p>
                  <p className={`text-xs mt-0.5 ${c.ok ? "text-[var(--on-surface-variant)]" : "text-[var(--warning-orange)] font-semibold"}`}>{c.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fault codes */}
        {report.codes.length > 0 && (
          <div className="bg-white border border-[var(--outline-variant)] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[var(--outline-variant)] bg-[var(--warning-orange)]/10">
              <h2 className="text-sm font-bold text-[var(--warning-orange)] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">warning</span>Fault Codes Detected
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {report.codes.map(fc => (
                <div key={fc.code} className="border border-[var(--outline-variant)] rounded-xl overflow-hidden">
                  <div className="bg-[var(--surface-container-low)] px-4 py-3 flex items-center gap-3">
                    <span className="bg-[var(--warning-orange)]/10 text-[var(--warning-orange)] font-mono text-sm font-bold px-3 py-1 rounded-lg">{fc.code}</span>
                    <p className="text-sm font-semibold text-[var(--primary)] flex-1">{fc.title}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1">What this means for you</p>
                    <p className="text-sm text-[var(--on-surface)] leading-relaxed">{fc.plain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Itemized estimate */}
        <div className="bg-white border border-[var(--outline-variant)] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <h2 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">Repair Estimate</h2>
          </div>
          <div className="divide-y divide-[var(--outline-variant)]">
            {report.estimate.map((e, i) => (
              <div key={i} className="flex justify-between items-center px-5 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-[var(--on-surface)]">{e.desc}</p>
                  <p className="text-xs text-[var(--on-surface-variant)]">{e.type} · Qty: {e.qty}</p>
                </div>
                <span className="text-sm font-bold text-[var(--primary)]">₦ {e.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-[var(--surface-container-low)] space-y-2">
            <div className="flex justify-between text-sm text-[var(--on-surface-variant)]">
              <span>Subtotal</span><span>₦ {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--on-surface-variant)]">
              <span>VAT (7.5%)</span><span>₦ {vat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--outline-variant)]">
              <span className="font-bold text-[var(--primary)]">Total</span>
              <span className="text-lg font-bold text-[var(--secondary)]">₦ {(total + vat).toLocaleString()}</span>
            </div>
          </div>
        </div>

      </main>

      {/* Fixed CTAs */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[var(--surface-bright)]/95 backdrop-blur-sm border-t border-[var(--outline-variant)] z-40 flex gap-3">
        <button className="flex-1 h-12 border-2 border-[var(--primary)] text-[var(--primary)] rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[var(--surface-container-low)] transition-colors">
          <span className="material-symbols-outlined text-[18px]">help</span>Second Opinion
        </button>
        <a href="/customer/checkout" className="flex-1 h-12 bg-[var(--primary)] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]">payments</span>Approve &amp; Pay
        </a>
      </div>
    </div>
  );
}
