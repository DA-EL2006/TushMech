"use client";
import TopAppBar from "../../components/TopAppBar";

export default function DiagnosticReport() {
  return (
    <div className="min-h-screen bg-[var(--surface-bright)] antialiased">
      <TopAppBar showBack backHref="/customer/dashboard" title="TushMech" centered={false} />
      
      <main className="pt-20 pb-32 px-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[var(--primary)] mb-1">Diagnostic Report</h1>
          <p className="text-base text-[var(--on-surface-variant)]">Vehicle: 2019 Ford F-150 (Plate: ABC-1234)</p>
        </div>

        <section className="mb-12">
          <h2 className="text-sm font-semibold text-[var(--on-surface)] mb-4">Multi-Point Inspection</h2>
          <div className="flex flex-col gap-2">
            {[
              { title: "Brakes & Rotors", status: "Passed Inspection", done: true },
              { title: "Electrical System", status: "Battery 12.6V - Good", done: true },
              { title: "Engine & Drivetrain", status: "Pending inspection", done: false }
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center justify-between p-4 bg-white border ${item.done ? 'border-[var(--outline-variant)]' : 'border-[var(--secondary-container)]/30 ring-1 ring-[var(--secondary-container)]/10'} rounded-xl shadow-sm active:shadow-none active:scale-[0.99] transition-all text-left`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-[var(--tertiary-fixed-dim)]/20' : 'border-2 border-[var(--outline-variant)]'}`}>
                    {item.done && <span className="material-symbols-outlined fill text-[var(--on-tertiary-container)]">check_circle</span>}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--on-surface)] block">{item.title}</span>
                    <span className={`text-xs font-medium ${item.done ? 'text-[var(--on-tertiary-container)]' : 'text-[var(--outline)]'}`}>{item.status}</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined ${item.done ? 'text-[var(--outline-variant)]' : 'text-[var(--secondary)]'}`}>{item.done ? 'chevron_right' : 'arrow_forward'}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-semibold text-[var(--on-surface)] mb-4">Diagnostic Data</h2>
          <div className="bg-white p-4 border border-[var(--outline-variant)] rounded-xl shadow-sm">
            <label className="block text-sm font-semibold text-[var(--on-surface-variant)] mb-1" htmlFor="obd2-input">OBD2 Error Codes</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--outline)]">memory</span>
              <input id="obd2-input" type="text" placeholder="e.g. P0300, P0420" className="w-full h-12 pl-12 pr-4 bg-[var(--surface-bright)] border border-[var(--outline-variant)] rounded-lg text-base text-[var(--on-surface)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/10 outline-none transition-all uppercase placeholder:normal-case placeholder:text-[var(--outline)] shadow-inner" />
            </div>
            <p className="text-xs font-medium text-[var(--outline)] mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">info</span> Separate multiple codes with commas
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--on-surface)]">Photo Evidence</h2>
            <span className="text-xs font-medium text-[var(--secondary)] bg-[var(--secondary-container)]/10 px-2 py-1 rounded-full">Required</span>
          </div>
          <button className="w-full h-40 border-2 border-dashed border-[var(--outline-variant)] rounded-xl bg-[var(--surface-container-low)] flex flex-col items-center justify-center hover:bg-[var(--surface-variant)] active:bg-[var(--surface-variant)] transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[var(--secondary-container)]/10 flex items-center justify-center mb-2 group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined fill text-[var(--secondary)]">add_a_photo</span>
            </div>
            <span className="text-sm font-semibold text-[var(--secondary)]">Upload Photo of Damaged Part</span>
            <span className="text-xs font-medium text-[var(--on-surface-variant)] mt-1">Tap to open camera</span>
          </button>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-[var(--surface-bright)]/95 backdrop-blur-sm border-t border-[var(--outline-variant)] z-40 pb-safe shadow-[0_-8px_16px_rgba(0,0,0,0.02)]">
        <button className="w-full h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:shadow-sm active:scale-[0.98] transition-all relative overflow-hidden group">
          <div className="absolute inset-0 border border-white/20 rounded-xl group-active:border-transparent transition-colors" />
          <span className="material-symbols-outlined text-[20px]">send</span>
          Generate &amp; Send Report
        </button>
      </div>
    </div>
  );
}
