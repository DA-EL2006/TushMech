"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function MechanicOnboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    yearsOfExperience: "",
    specialization: "",
    certifications: "",
    serviceArea: "",
    availability: "Full-time",
    accountNumber: "",
    bankName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: "MECHANIC",
        }),
      });

      if (!regRes.ok) {
        const error = await regRes.json();
        alert(`Registration failed: ${error.message}`);
        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInRes?.error) {
        alert("Failed to sign in after registration.");
        setLoading(false);
        return;
      }

      // Fallback local storage
      localStorage.setItem("tushmech_mechanic_profile", JSON.stringify(formData));
      router.push("/mechanic/dashboard");
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={64} height={64} className="rounded-xl shadow-level-2" />
          </div>
          <h2 className="text-4xl font-bold text-[var(--primary)] tracking-tight">Mechanic Profile Setup</h2>
          <p className="mt-3 text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Complete your professional profile. This information verifies your expertise, sets your service areas, and ensures seamless payouts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[var(--surface-container-lowest)] rounded-2xl shadow-level-2 border border-[var(--outline-variant)] overflow-hidden">
          
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Personal Information */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">person</span> Personal Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="mechanic@example.com" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Password *</label>
                  <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
              </div>
            </div>

            {/* Professional Expertise */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">build</span> Professional Expertise
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Years of Experience *</label>
                  <input type="number" name="yearsOfExperience" required value={formData.yearsOfExperience} onChange={handleChange} placeholder="e.g. 5" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Primary Specialization *</label>
                  <select name="specialization" required value={formData.specialization} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]">
                    <option value="">Select Specialization...</option>
                    <option value="General Maintenance">General Maintenance & Servicing</option>
                    <option value="Engine Diagnostics">Engine Diagnostics & Repair</option>
                    <option value="Electrical Systems">Electrical & Wiring Systems</option>
                    <option value="Transmission">Transmission Systems</option>
                    <option value="Suspension and Brakes">Suspension, Steering & Brakes</option>
                    <option value="HVAC">AC & Heating (HVAC)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Certifications (Optional)</label>
                  <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="e.g. ASE Certified, Manufacturer Specific Certs..." className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
              </div>
            </div>

            {/* Logistics & Payment */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">location_on</span> Logistics & Payout
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Service Area (City/Region) *</label>
                  <input type="text" name="serviceArea" required value={formData.serviceArea} onChange={handleChange} placeholder="e.g. Lekki Phase 1, Lagos" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Availability *</label>
                  <select name="availability" required value={formData.availability} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]">
                    <option value="Full-time">Full-time (Priority Dispatch)</option>
                    <option value="Part-time">Part-time (Flexible Dispatch)</option>
                    <option value="Weekends Only">Weekends Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Bank Name *</label>
                  <input type="text" name="bankName" required value={formData.bankName} onChange={handleChange} placeholder="e.g. Zenith Bank" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Account Number *</label>
                  <input type="text" name="accountNumber" required value={formData.accountNumber} onChange={handleChange} placeholder="10 Digit Account Number" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" maxLength={10} />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[var(--surface-container-low)] p-6 border-t border-[var(--outline-variant)] flex flex-col items-center">
            <p className="text-xs text-[var(--on-surface-variant)] text-center mb-4 max-w-lg">
              By completing this profile, you agree to TushMech's expert service standards and consent to background checks as required for verified mechanics.
            </p>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto px-12 h-14 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">check_circle</span>}
              {loading ? "Registering..." : "Complete Profile & Go to Dispatch"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
