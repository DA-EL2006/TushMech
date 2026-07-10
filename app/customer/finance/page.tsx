"use client";

export default function FinanceApplication() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col pt-16 items-center">
      <header className="fixed top-0 w-full z-50 bg-[var(--surface)] border-b border-[var(--outline-variant)] shadow-sm flex justify-between items-center h-16 px-4 md:px-10 max-w-[1280px] mx-auto">
        <a href="/customer/checkout" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--surface-container-high)] transition-colors"><span className="material-symbols-outlined">arrow_back</span></a>
        <span className="text-2xl font-semibold text-[var(--primary)] tracking-tight">TushMech</span>
        <div className="w-10" />
      </header>
      <main className="flex-grow w-full max-w-md mx-auto px-4 pb-32 pt-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-medium text-[var(--secondary)]">Step 1 of 3</span><span className="text-xs font-medium text-[var(--on-surface-variant)]">Identity Verification</span></div>
          <div className="h-2 bg-[var(--surface-container-high)] rounded-full overflow-hidden flex gap-1">
            <div className="h-full bg-[var(--secondary)] w-1/3 rounded-full transition-all duration-500" /><div className="h-full bg-[var(--surface-container)] w-1/3 rounded-full" /><div className="h-full bg-[var(--surface-container)] w-1/3 rounded-full" />
          </div>
        </div>
        <div className="mb-8"><h1 className="text-2xl font-semibold text-[var(--on-surface)] mb-2">Repair Financing</h1><p className="text-base text-[var(--on-surface-variant)]">Complete your application to spread your repair bill over manageable monthly payments.</p></div>
        <div className="bg-white border border-[var(--outline-variant)] rounded-xl p-6 mb-8 shadow-level-1 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--secondary)]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-4"><span className="material-symbols-outlined fill text-[var(--secondary)]">calculate</span><h2 className="text-sm font-semibold">Estimated Installment</h2></div>
          <div className="flex items-end gap-2 mb-2"><span className="text-5xl font-bold text-[var(--primary)] tracking-tight">₦134,375</span><span className="text-base text-[var(--on-surface-variant)] mb-2">/month</span></div>
          <div className="flex items-center gap-2 text-sm"><div className="w-2 h-2 rounded-full bg-[var(--tertiary-fixed-dim)]" /><span className="text-xs font-medium text-[var(--on-surface-variant)]">Based on 4-month plan for ₦537,500 total bill</span></div>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">BVN / National Identity Number</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-symbols-outlined text-[var(--outline)]">badge</span></div><input className="block w-full pl-10 pr-3 py-3 border border-[var(--outline-variant)] rounded-lg bg-white text-[var(--on-surface)] placeholder-[var(--outline-variant)] min-h-12" placeholder="Enter your 11-digit BVN" type="text" /></div>
            <p className="text-xs font-medium text-[var(--on-surface-variant)] flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">info</span>Used solely for identity verification.</p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Employment Status</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-symbols-outlined text-[var(--outline)]">work</span></div><select className="block w-full pl-10 pr-10 py-3 border border-[var(--outline-variant)] rounded-lg bg-white appearance-none min-h-12"><option disabled selected value="">Select your status</option><option>Employed (Full-time)</option><option>Self-Employed / Business Owner</option><option>Contractor / Freelance</option></select><div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="material-symbols-outlined text-[var(--outline)]">expand_more</span></div></div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Net Monthly Income</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="material-symbols-outlined text-[var(--outline)]">payments</span></div><input className="block w-full pl-10 pr-12 py-3 border border-[var(--outline-variant)] rounded-lg bg-white placeholder-[var(--outline-variant)] min-h-12" placeholder="e.g. 500000" type="number" /><div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-sm font-semibold text-[var(--outline)]">NGN</span></div></div>
          </div>
          <div className="bg-[var(--surface-container-low)] rounded-lg p-4 flex items-center gap-3 border border-[var(--surface-container)] mt-8">
            <div className="w-10 h-10 rounded-full bg-[var(--tertiary-fixed)]/20 flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined fill text-[var(--tertiary-container)]">lock</span></div>
            <div><h3 className="text-sm font-semibold">Bank-Grade Security</h3><p className="text-xs text-[var(--on-surface-variant)]">Your data is encrypted via PCI-DSS compliant channels.</p></div>
          </div>
          <div className="fixed bottom-0 left-0 w-full bg-[var(--surface)] border-t border-[var(--outline-variant)] p-4 pb-safe z-40 md:relative md:bg-transparent md:border-none md:p-0 md:pt-6">
            <button className="w-full bg-[var(--primary)] text-white text-sm font-semibold py-3 rounded-lg min-h-12 hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-level-1" type="button">Verify &amp; Continue <span className="material-symbols-outlined text-[20px]">arrow_forward</span></button>
          </div>
        </form>
      </main>
    </div>
  );
}
