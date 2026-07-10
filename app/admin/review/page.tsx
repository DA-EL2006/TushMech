"use client";
import Image from "next/image";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";

export default function DetailedReview() {
  return (
    <div className="min-h-screen bg-[var(--surface-bright)]">
      <TopAppBar title="TushMech" />
      
      <main className="max-w-7xl mx-auto pt-20 pb-12 px-4 md:px-8 w-full">
        <div className="mb-8">
          <Link href="/admin/qa-queue" className="inline-flex items-center gap-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] text-sm font-semibold mb-4 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to QA Queue
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--primary)] flex items-center gap-3 flex-wrap">
                Review Report #8892
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--outline-variant)]/30 text-[var(--on-surface-variant)] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[var(--outline)] mr-2" /> Pending Approval
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 mt-3 text-[var(--on-surface-variant)] text-sm">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">directions_car</span><span className="font-semibold">BMW X5</span></div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">engineering</span><span className="font-semibold">Mechanic: Michael T.</span></div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">calendar_today</span><span className="font-semibold">Oct 24, 2023 - 10:42 AM</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="bg-white border border-[var(--outline-variant)] rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-[var(--outline-variant)] px-6 py-4 bg-[var(--surface-container-low)] flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[var(--primary)]">Technician Observations</h2>
                <span className="material-symbols-outlined text-[var(--on-surface-variant)]">build_circle</span>
              </div>
              <div className="p-6">
                <div className="mb-6 rounded-lg overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-container)] relative h-72">
                  <Image src="/images/transmission_gear.jpg" alt="Gearbox" fill className="object-cover" />
                </div>
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-[var(--on-surface-variant)] mb-3 uppercase tracking-wider">Diagnostic Codes</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--error-container)]/50 border border-[var(--error-container)] text-[var(--on-error-container)] text-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px] mr-1.5">warning</span> P0734 - Gear 4 Incorrect Ratio
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--error-container)]/50 border border-[var(--error-container)] text-[var(--on-error-container)] text-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px] mr-1.5">warning</span> P0735 - Gear 5 Incorrect Ratio
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--surface-container-high)] border border-[var(--outline-variant)] text-[var(--primary)] text-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px] mr-1.5">info</span> P0700 - Transmission Control System
                    </div>
                  </div>
                </div>
                <div className="pl-4 border-l-4 border-[var(--on-tertiary-container)] mb-2">
                  <h3 className="text-xs font-semibold text-[var(--on-surface-variant)] mb-1 uppercase tracking-wider">Primary Recommendation</h3>
                  <p className="text-xl font-semibold text-[var(--primary)] mb-3">Complete Gearbox Overhaul</p>
                  <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
                    Inspected the transmission fluid and found heavy metal shavings. Removed the pan and identified significant wear on the 4th and 5th gear assemblies. The synchros are severely degraded. A complete gearbox overhaul is required.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-[var(--outline-variant)] rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-[var(--outline-variant)] px-6 py-4 bg-[var(--surface-container-low)] flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[var(--primary)]">Itemized Estimate</h2>
                <span className="material-symbols-outlined text-[var(--on-surface-variant)]">receipt_long</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--surface-container)] border-b border-[var(--outline-variant)]">
                      <th className="py-3 px-6 text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Item Description</th>
                      <th className="py-3 px-6 text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold">Type</th>
                      <th className="py-3 px-6 text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold text-right">Qty</th>
                      <th className="py-3 px-6 text-xs text-[var(--on-surface-variant)] uppercase tracking-wider font-semibold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--outline-variant)]">
                    {[
                      {n:"OEM Transmission Rebuild Kit",t:"Parts",q:"1",p:"$1,250.00"},
                      {n:"Synthetic Transmission Fluid",t:"Consumables",q:"7 L",p:"$185.50"},
                      {n:"Transmission Overhaul Labor",t:"Labor",q:"12 hrs",p:"$1,800.00"}
                    ].map(i=>(
                      <tr key={i.n} className="hover:bg-[var(--surface-container-low)]">
                        <td className="py-4 px-6 text-sm">{i.n}</td>
                        <td className="py-4 px-6 text-sm text-[var(--on-surface-variant)]">{i.t}</td>
                        <td className="py-4 px-6 text-sm text-[var(--on-surface-variant)] text-right">{i.q}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-right">{i.p}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[var(--surface-container-low)]">
                      <td colSpan={3} className="py-4 px-6 text-sm text-[var(--on-surface-variant)] text-right uppercase tracking-wider font-semibold">Subtotal</td>
                      <td className="py-4 px-6 text-sm font-semibold text-right">$3,235.50</td>
                    </tr>
                    <tr className="bg-[var(--surface-container-low)] border-b border-[var(--outline-variant)]">
                      <td colSpan={3} className="py-4 px-6 text-sm text-[var(--on-surface-variant)] text-right uppercase tracking-wider font-semibold">Tax (8%)</td>
                      <td className="py-4 px-6 text-sm font-semibold text-right">$258.84</td>
                    </tr>
                    <tr className="bg-[var(--surface-container)]">
                      <td colSpan={3} className="py-5 px-6 text-xl font-semibold text-right">Estimated Total</td>
                      <td className="py-5 px-6 text-xl font-semibold text-[var(--on-tertiary-container)] text-right">$3,494.34</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white border border-[var(--outline-variant)] rounded-xl shadow-sm flex flex-col">
              <div className="border-b border-[var(--outline-variant)] px-6 py-4 bg-[var(--surface-container-low)]">
                <h2 className="text-xl font-semibold text-[var(--primary)]">Review Actions</h2>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[var(--primary)]" htmlFor="admin-comments">Internal QA Comments</label>
                  <textarea id="admin-comments" rows={4} placeholder="Add notes for the mechanic..." className="w-full p-4 bg-[var(--surface-bright)] rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/20 text-sm resize-none outline-none transition-all" />
                  <p className="text-xs text-[var(--on-surface-variant)]">These notes will be attached to the job record.</p>
                </div>
                <div className="flex flex-col gap-3 mt-4 border-t border-[var(--outline-variant)] pt-6">
                  <button className="w-full h-12 flex items-center justify-center gap-2 bg-[var(--on-tertiary-container)] hover:bg-[var(--on-tertiary-fixed-variant)] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span> Approve &amp; Send to Customer
                  </button>
                  <button className="w-full h-12 flex items-center justify-center gap-2 bg-white hover:bg-[var(--error-container)]/20 border-2 border-[var(--error)] text-[var(--error)] rounded-lg text-sm font-semibold transition-colors active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[18px]">help</span> Request Clarification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
