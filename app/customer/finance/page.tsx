"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";

function FinanceApplicationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams?.get("invoice_id") || "TM-4921";
  
  const [bvn, setBvn] = useState("");
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alatResponse, setAlatResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/alat-bnpl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_id: invoiceId,
          bvn,
          employmentStatus: employment,
          income: parseFloat(income)
        })
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Application declined.");
      }

      setSuccess(true);
      setAlatResponse(data.alat_response);
      
      // Redirect to dashboard after 3 seconds on success
      setTimeout(() => {
        router.push("/customer/dashboard");
      }, 4000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Left side: Branding / Info */}
      <div className="hidden lg:flex lg:w-1/3 bg-[var(--electric-blue)] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--deep-navy)]/40 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <Image src="/images/tushmech_logo.jpg" alt="Logo" width={24} height={24} className="rounded" />
            </div>
            <span className="font-bold text-xl tracking-tight">TushMech Finance</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 tracking-tight">Repair Now,<br/>Pay Later.</h1>
          <p className="text-white/80 mb-12 max-w-sm leading-relaxed">
            Don't let unexpected repairs keep you off the road. Get instant approval and split your bill into 4 easy installments.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl">bolt</span>
              <div><h3 className="font-semibold">Instant Decision</h3><p className="text-sm text-white/70">Know your status in seconds.</p></div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl">money_off</span>
              <div><h3 className="font-semibold">0% Interest</h3><p className="text-sm text-white/70">If paid in full within 30 days.</p></div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl">security</span>
              <div><h3 className="font-semibold">Bank-Grade Security</h3><p className="text-sm text-white/70">Powered securely by Wema ALAT.</p></div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-auto">
          <p className="text-xs text-white/50">Subject to credit approval. Terms & conditions apply.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto">
        <button onClick={() => router.back()} className="self-start flex items-center gap-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] mb-8 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-semibold">Cancel Application</span>
        </button>

        <div className="max-w-md w-full mx-auto mt-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--primary)]">Identity & Income Verification</h2>
            <p className="text-[var(--on-surface-variant)] text-sm mt-2">Please provide your details for an instant credit decision. (Simulation Mode)</p>
          </div>

          {success ? (
            <div className="bg-[var(--verification-green)]/10 border border-[var(--verification-green)]/30 rounded-xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[var(--verification-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-white text-3xl">check</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)]">Application Approved!</h3>
              <p className="text-[var(--on-surface-variant)]">Your repair for Invoice <strong>#{invoiceId}</strong> has been successfully funded by ALAT.</p>
              
              <div className="bg-white rounded-lg p-4 text-left border border-[var(--outline-variant)]/50 mt-4">
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Loan ID</span><span className="text-sm font-semibold">{alatResponse?.loan_id}</span></div>
                <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-500">Funded Amount</span><span className="text-sm font-semibold">₦{alatResponse?.funded_amount?.toLocaleString()}</span></div>
                <div className="flex justify-between py-2"><span className="text-sm text-gray-500">Installments</span><span className="text-sm font-semibold">{alatResponse?.installments} Months</span></div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 animate-pulse">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-[var(--error-container)] border border-[var(--error)]/30 text-[var(--on-error-container)] p-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--primary)] flex justify-between">
                  Bank Verification Number (BVN)
                  <span className="text-xs text-[var(--electric-blue)] flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span> Secured</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--electric-blue)] focus:ring-1 focus:ring-[var(--electric-blue)] outline-none transition-all text-lg tracking-widest font-mono" 
                  placeholder="222019..." 
                  maxLength={11} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--primary)]">Employment Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Employed", "Self-Employed", "Student", "Unemployed"].map(status => (
                    <label key={status} className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${employment === status ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/5 ring-1 ring-[var(--electric-blue)]' : 'border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]'}`}>
                      <input 
                        type="radio" 
                        name="employment" 
                        value={status} 
                        onChange={(e) => setEmployment(e.target.value)}
                        className="text-[var(--electric-blue)] focus:ring-[var(--electric-blue)] h-4 w-4" 
                      />
                      <span className="text-sm font-medium">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--primary)]">Monthly Income (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] font-semibold">₦</span>
                  <input 
                    type="number" 
                    required
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--electric-blue)] focus:ring-1 focus:ring-[var(--electric-blue)] outline-none transition-all" 
                    placeholder="250000" 
                  />
                </div>
                <p className="text-xs text-[var(--on-surface-variant)]">This helps us determine your affordability limit.</p>
              </div>

              <div className="pt-4 border-t border-[var(--outline-variant)]">
                <button 
                  type="submit" 
                  disabled={loading || !employment || !bvn || !income}
                  className="w-full h-14 bg-[var(--electric-blue)] text-white rounded-lg text-sm font-semibold shadow-level-2 hover:bg-blue-700 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Analyzing Risk Profile...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FinanceApplication() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-4xl text-[var(--electric-blue)]">progress_activity</span></div>}>
      <FinanceApplicationContent />
    </Suspense>
  );
}
