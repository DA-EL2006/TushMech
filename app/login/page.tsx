"use client";
import Image from "next/image";

const ROLE_COOKIE = "tushmech_role";

function selectRole(role: string, href: string) {
  // Set the demo role cookie (expires in 24 hours)
  document.cookie = `${ROLE_COOKIE}=${role}; path=/; max-age=86400; SameSite=Lax`;
  window.location.href = href;
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-container-lowest)] flex flex-col md:flex-row">
      {/* Left side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-[var(--primary-container)] relative flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--deep-navy)] to-[var(--electric-blue)] opacity-90" />
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-20" />

        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={100} height={100} className="rounded-2xl shadow-level-3 border-2 border-white/10 mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">TushMech O2O Platform</h1>
          <p className="text-[var(--primary-fixed-dim)] text-lg max-w-md">
            The precision autocare ecosystem. Connect with expert mechanics, verify spare parts, and manage your fleet seamlessly.
          </p>
        </div>
      </div>

      {/* Right side: Role selector */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-[var(--primary)] text-xl tracking-tight">TushMech</span>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 md:mt-0">
          <div>
            <h2 className="text-3xl font-bold text-[var(--primary)] tracking-tight">Select Account</h2>
            <p className="text-[var(--on-surface-variant)] mt-2">What account would you like to login to?</p>
          </div>

          <div className="space-y-4">
            {/* CLIENT */}
            <button
              onClick={() => selectRole("CUSTOMER", "/customer/onboarding")}
              className="w-full h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">person</span>
              Client
            </button>

            {/* MECHANIC */}
            <button
              onClick={() => selectRole("MECHANIC", "/mechanic/onboarding")}
              className="w-full h-14 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">build</span>
              Mechanic
            </button>

            {/* ADMIN */}
            <button
              onClick={() => selectRole("ADMIN", "/admin/onboarding")}
              className="w-full h-14 bg-[var(--deep-navy)] text-white rounded-lg text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
              Admin
            </button>

            {/* VENDOR */}
            <button
              onClick={() => selectRole("VENDOR", "/vendor/onboarding")}
              className="w-full h-14 border-2 border-[var(--deep-navy)] text-[var(--deep-navy)] dark:border-white dark:text-white rounded-lg text-lg font-semibold shadow-sm hover:bg-[var(--deep-navy)] hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              Vendor
            </button>
          </div>

          <p className="text-center text-xs text-[var(--on-surface-variant)] pt-2">
            Demo mode — role selection grants access to the corresponding portal
          </p>
        </div>
      </div>
    </div>
  );
}
