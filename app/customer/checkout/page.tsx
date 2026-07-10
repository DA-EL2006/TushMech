"use client";
import Image from "next/image";

export default function CheckoutFinance() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="fixed top-0 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-6 h-12">
        <a className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="/customer/dashboard"><span className="material-symbols-outlined text-[var(--primary)]">arrow_back</span><span className="text-sm font-semibold text-[var(--primary)]">Back</span></a>
        <div className="flex items-center gap-2"><Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" /><span className="text-2xl font-semibold text-[var(--primary)] tracking-tight">Checkout</span></div>
        <div className="w-16" />
      </header>
      <main className="pt-16 pb-12 px-6 md:px-8 max-w-4xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-level-1 overflow-hidden">
            <div className="bg-[var(--surface-container-low)] px-6 py-4 border-b border-[var(--outline-variant)] flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[var(--primary)]">Service Summary</h2>
              <span className="bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded-full text-xs font-semibold">Invoice #TM-4921</span>
            </div>
            <div className="p-6 space-y-6">
              {[{n:"Engine Replacement",d:"Authentic OEM Block Assembly",p:"₦380,000",id:"OEM-8942-B"},{n:"Labor (Expert Technician)",d:"24 Hours estimated",p:"₦120,000"}].map(i=>(
                <div key={i.n} className="flex justify-between items-start pb-4 border-b border-[var(--outline-variant)]">
                  <div><h3 className="text-sm font-semibold">{i.n}</h3><p className="text-base text-[var(--on-surface-variant)] mt-1">{i.d}</p>{i.id&&<p className="text-xs text-[var(--outline)] mt-1">Part #: {i.id}</p>}</div>
                  <span className="text-sm font-semibold">{i.p}</span>
                </div>
              ))}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between"><span className="text-[var(--on-surface-variant)]">Subtotal</span><span>₦500,000</span></div>
                <div className="flex justify-between"><span className="text-[var(--on-surface-variant)]">VAT (7.5%)</span><span>₦37,500</span></div>
                <div className="flex justify-between pt-4 border-t border-[var(--outline-variant)]"><span className="text-2xl font-semibold">Total Amount</span><span className="text-2xl font-semibold text-[var(--electric-blue)]">₦537,500</span></div>
              </div>
            </div>
          </section>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white rounded-xl border-2 border-[var(--electric-blue)] shadow-level-2 overflow-hidden relative">
            <div className="bg-[var(--electric-blue)] text-white px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined fill text-white">bolt</span><span className="text-sm font-semibold">Repair Now, Pay Later</span></div>
              <span className="text-xs opacity-90">Powered by ALAT</span>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center"><p className="text-[var(--on-surface-variant)] mb-1">Pay in 4 easy installments of</p><h3 className="text-3xl font-semibold text-[var(--electric-blue)]">₦134,375</h3><p className="text-xs text-[var(--outline)] mt-1">0% Interest if paid in full within 30 days.</p></div>
              <button className="w-full bg-[var(--electric-blue)] hover:bg-blue-700 text-white h-12 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-level-2 active:scale-95">Apply for Credit <span className="material-symbols-outlined">arrow_forward</span></button>
              <p className="text-xs text-center text-[var(--on-surface-variant)] flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[16px] text-[var(--electric-blue)]">lock</span>Secure, instant approval.</p>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-level-1 p-6">
            <div className="flex items-center gap-4 mb-6"><span className="material-symbols-outlined fill text-[var(--primary)] text-2xl">credit_card</span><h2 className="text-sm font-semibold">Pay in Full</h2></div>
            <button className="w-full bg-[var(--deep-navy)] text-white h-12 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 active:scale-95 hover:opacity-90">Pay ₦537,500 Now</button>
          </section>
        </div>
      </main>
    </div>
  );
}
