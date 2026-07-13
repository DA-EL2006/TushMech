"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VendorOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    businessType: "",
    registrationNumber: "",
    address: "",
    state: "",
    productCategories: "",
    accountNumber: "",
    bankName: "",
    taxId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/vendor/inventory");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/tushmech_logo.jpg"
              alt="TushMech Logo"
              width={64}
              height={64}
              className="rounded-xl shadow-level-2"
            />
          </div>
          <h2 className="text-4xl font-bold text-[var(--primary)] tracking-tight">
            Vendor Onboarding
          </h2>
          <p className="mt-3 text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Set up your supplier profile to list spare parts, accessories, and
            automotive products on the TushMech marketplace.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--surface-container-lowest)] rounded-2xl shadow-level-2 border border-[var(--outline-variant)] overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-8">

            {/* Business Identity */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">storefront</span>
                Business Identity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Business / Company Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. AutoParts Pro Ltd."
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Samuel Adeyemi"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  >
                    <option value="">Select Type...</option>
                    <option value="OEM Parts Supplier">OEM Parts Supplier</option>
                    <option value="Aftermarket Parts Dealer">Aftermarket Parts Dealer</option>
                    <option value="Accessories & Lubricants">Accessories &amp; Lubricants</option>
                    <option value="Tyres & Wheels">Tyres &amp; Wheels</option>
                    <option value="Electronics & Diagnostics">Electronics &amp; Diagnostics</option>
                    <option value="Multi-category Distributor">Multi-category Distributor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    CAC Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    required
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. RC-1234567"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)] uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Tax Identification Number (TIN)
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="e.g. 12345678-0001"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                Contact &amp; Location
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="info@yourcompany.com"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Warehouse / Business Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 14 Ladipo Street, Mushin, Lagos"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  >
                    <option value="">Select State...</option>
                    <option>Lagos</option>
                    <option>Abuja (FCT)</option>
                    <option>Rivers</option>
                    <option>Kano</option>
                    <option>Oyo</option>
                    <option>Delta</option>
                    <option>Anambra</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Product Categories
                  </label>
                  <input
                    type="text"
                    name="productCategories"
                    value={formData.productCategories}
                    onChange={handleChange}
                    placeholder="e.g. Filters, Brake pads, Engine oil..."
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
              </div>
            </div>

            {/* Payout Details */}
            <div>
              <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                Payout Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    required
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="e.g. Access Bank"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    required
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="10 Digit Account Number"
                    className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[var(--surface-container-low)] p-6 border-t border-[var(--outline-variant)] flex flex-col items-center">
            <p className="text-xs text-[var(--on-surface-variant)] text-center mb-4 max-w-lg">
              By submitting, you confirm that all business information provided is accurate
              and agree to TushMech&apos;s Vendor Partnership Agreement and anti-counterfeiting policies.
            </p>
            <button
              type="submit"
              className="w-full md:w-auto px-12 h-14 bg-[var(--secondary)] text-white rounded-xl text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">local_shipping</span>
              Launch Vendor Dashboard
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
