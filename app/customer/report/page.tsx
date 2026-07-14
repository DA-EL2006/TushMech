"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomerDiagnosticReport() {
  const router = useRouter();
  
  // Hardcoded data matching the TM-4921 invoice for the pitch demo
  const reportData = {
    invoiceId: "TM-4921",
    date: "July 14, 2026",
    mechanic: "David O.",
    vehicle: "2022 Tesla Model 3",
    status: "Requires Attention",
    codes: [
      { code: "P0A0F", desc: "Engine Failed to Start", severity: "High" },
      { code: "P0CE0", desc: "Coolant Valve Control Circuit Low", severity: "Medium" }
    ],
    notes: "The main high-voltage contractor is failing to close due to a fault in the coolant valve circuit. The coolant valve needs to be replaced and the system bled. Also topped up the washer fluid.",
    estimate: [
      { desc: "Tesla OEM Coolant Valve", type: "Part", qty: 1, price: 285000 },
      { desc: "EV Coolant Fluid (1 Gallon)", type: "Fluid", qty: 2, price: 25000 },
      { desc: "High-Voltage System Diagnostic & Labor", type: "Labor", qty: 1, price: 40000 }
    ],
    subtotal: 350000,
    tax: 26250,
    total: 376250
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 md:px-8 h-16 shadow-sm">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--surface-container-low)] transition-colors">
          <span className="material-symbols-outlined text-[var(--primary)]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-[var(--primary)] tracking-tight">Diagnostic Report</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Top Summary Card */}
        <section className="bg-white rounded-2xl shadow-level-1 border border-[var(--outline-variant)] overflow-hidden mb-6">
          <div className="bg-[var(--primary)] text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Vehicle</p>
                <h2 className="text-2xl font-bold">{reportData.vehicle}</h2>
              </div>
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {reportData.status}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/80 relative z-10">
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {reportData.date}</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">engineering</span> {reportData.mechanic}</span>
            </div>
          </div>
        </section>

        {/* OBD2 Scan Results */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--secondary)]">document_scanner</span>
            OBD-II Scan Results
          </h3>
          <div className="space-y-3">
            {reportData.codes.map((c) => (
              <div key={c.code} className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl p-4 flex items-start gap-4 shadow-sm hover:border-[var(--secondary)] transition-colors">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold tracking-wider text-sm ${c.severity === 'High' ? 'bg-red-500 shadow-md shadow-red-500/20' : 'bg-amber-500 shadow-md shadow-amber-500/20'}`}>
                  {c.code}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--primary)] mb-1">{c.desc}</h4>
                  <p className="text-xs text-[var(--on-surface-variant)] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Severity: {c.severity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mechanic's Notes */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--secondary)]">speaker_notes</span>
            Mechanic's Diagnosis
          </h3>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-blue-900 text-sm leading-relaxed shadow-sm">
            "{reportData.notes}"
          </div>
        </section>

        {/* Recommended Fix & Estimate */}
        <section className="mb-10">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--secondary)]">build</span>
            Recommended Repairs
          </h3>
          <div className="bg-white border border-[var(--outline-variant)] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 space-y-4">
              {reportData.estimate.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start pb-4 border-b border-[var(--outline-variant)] last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--primary)]">{item.desc}</h4>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Type: {item.type} | Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--primary)]">₦{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="bg-[var(--surface-container-low)] p-5 border-t border-[var(--outline-variant)] space-y-2">
              <div className="flex justify-between text-sm text-[var(--on-surface-variant)]">
                <span>Subtotal</span>
                <span>₦{reportData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--on-surface-variant)]">
                <span>VAT (7.5%)</span>
                <span>₦{reportData.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-1 border-t border-[var(--outline-variant)]">
                <span className="text-base font-bold text-[var(--primary)]">Total Estimate</span>
                <span className="text-xl font-black text-[var(--secondary)]">₦{reportData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="space-y-4">
          <Link href={`/customer/checkout?invoice_id=${reportData.invoiceId}`} className="w-full h-14 bg-[var(--electric-blue)] hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-level-2 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Approve & Proceed to Payment
          </Link>
          <button className="w-full h-12 bg-white border-2 border-[var(--outline-variant)] hover:border-[var(--primary)] text-[var(--primary)] rounded-xl font-bold transition-all">
            Decline & Pay Diagnostic Fee Only
          </button>
        </div>

      </main>
    </div>
  );
}
