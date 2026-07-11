"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Suspense } from "react";

function CheckoutFinanceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState("");

  const invoiceId = searchParams?.get("invoice_id") || "TM-4921"; // Default to seeded invoice

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/invoices/${invoiceId}`);
        if (!res.ok) throw new Error("Invoice not found");
        const data = await res.json();
        setInvoice(data.invoice);
      } catch (err) {
        setError("Could not load invoice details.");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  const handlePaystack = async () => {
    if (!session?.user?.email) {
      alert("Please sign in to proceed with payment.");
      router.push("/login");
      return;
    }
    
    setPayLoading(true);
    try {
      const res = await fetch("/api/checkout/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_id: invoice.id,
          email: session.user.email
        })
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      // Redirect to Paystack (or simulated success page)
      window.location.href = data.authorization_url;
    } catch (err: any) {
      alert(err.message || "Payment initialization failed.");
      setPayLoading(false);
    }
  };

  const handleBNPL = () => {
    // Navigate to the finance application flow
    router.push(`/customer/finance?invoice_id=${invoice.id}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-4xl text-[var(--electric-blue)]">progress_activity</span></div>;
  
  if (error || !invoice) return <div className="min-h-screen flex items-center justify-center flex-col gap-4"><p className="text-red-500 font-semibold">{error}</p><button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded">Go Back</button></div>;

  const estimateItems = invoice.job?.diagnostic_report?.estimate_items || [];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="fixed top-0 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-6 h-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 hover:opacity-80 transition-opacity"><span className="material-symbols-outlined text-[var(--primary)]">arrow_back</span><span className="text-sm font-semibold text-[var(--primary)]">Back</span></button>
        <div className="flex items-center gap-2"><Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" /><span className="text-2xl font-semibold text-[var(--primary)] tracking-tight">Checkout</span></div>
        <div className="w-16" />
      </header>

      <main className="pt-16 pb-12 px-6 md:px-8 max-w-4xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-level-1 overflow-hidden">
            <div className="bg-[var(--surface-container-low)] px-6 py-4 border-b border-[var(--outline-variant)] flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[var(--primary)]">Service Summary</h2>
              <span className="bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded-full text-xs font-semibold">Invoice #{invoice.id}</span>
            </div>
            
            <div className="p-6 space-y-6">
              {estimateItems.length > 0 ? estimateItems.map((i: any) => (
                <div key={i.id} className="flex justify-between items-start pb-4 border-b border-[var(--outline-variant)]">
                  <div>
                    <h3 className="text-sm font-semibold">{i.description}</h3>
                    <p className="text-xs text-[var(--outline)] mt-1">Type: {i.type} | Qty: {i.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">₦{i.total_price.toLocaleString()}</span>
                </div>
              )) : (
                <p className="text-sm text-gray-500 italic">No line items found.</p>
              )}
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between"><span className="text-[var(--on-surface-variant)]">Subtotal</span><span>₦{invoice.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--on-surface-variant)]">VAT (7.5%)</span><span>₦{invoice.tax.toLocaleString()}</span></div>
                <div className="flex justify-between pt-4 border-t border-[var(--outline-variant)]">
                  <span className="text-2xl font-semibold">Total Amount</span>
                  <span className="text-2xl font-semibold text-[var(--electric-blue)]">₦{invoice.total_amount.toLocaleString()}</span>
                </div>
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
              <div className="text-center">
                <p className="text-[var(--on-surface-variant)] mb-1">Pay in 4 easy installments of</p>
                <h3 className="text-3xl font-semibold text-[var(--electric-blue)]">₦{(invoice.total_amount / 4).toLocaleString()}</h3>
                <p className="text-xs text-[var(--outline)] mt-1">0% Interest if paid in full within 30 days.</p>
              </div>
              <button 
                onClick={handleBNPL}
                className="w-full bg-[var(--electric-blue)] hover:bg-blue-700 text-white h-12 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-level-2 active:scale-95"
              >
                Apply for Credit <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-xs text-center text-[var(--on-surface-variant)] flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[16px] text-[var(--electric-blue)]">lock</span>Secure, instant approval.</p>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-level-1 p-6">
            <div className="flex items-center gap-4 mb-6"><span className="material-symbols-outlined fill text-[var(--primary)] text-2xl">credit_card</span><h2 className="text-sm font-semibold">Pay in Full</h2></div>
            <button 
              onClick={handlePaystack}
              disabled={payLoading}
              className="w-full bg-[var(--deep-navy)] text-white h-12 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 active:scale-95 hover:opacity-90 disabled:opacity-70"
            >
              {payLoading ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : `Pay ₦${invoice.total_amount.toLocaleString()} Now`}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutFinance() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-4xl text-[var(--electric-blue)]">progress_activity</span></div>}>
      <CheckoutFinanceContent />
    </Suspense>
  );
}

