"use client";
import { useState } from "react";
import AdminSideNav from "../../components/AdminSideNav";

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoDispatch, setAutoDispatch] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="Settings" />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-[var(--outline-variant)] sticky top-0 z-30 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Platform Settings</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage global configurations, pricing, and system policies.</p>
        </header>

        <div className="p-6 max-w-5xl mx-auto w-full space-y-8">
          
          {/* General Platform Config */}
          <section className="bg-white rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)]">
              <h2 className="text-lg font-bold text-[var(--primary)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--secondary)]">tune</span> Global Configurations
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[var(--primary)]">Maintenance Mode</h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Suspend all customer bookings (mechanics already on jobs are unaffected).</p>
                </div>
                <div 
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${maintenanceMode ? "bg-[var(--secondary)]" : "bg-[var(--surface-container-high)] border border-[var(--outline-variant)]"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${maintenanceMode ? "right-0.5" : "left-0.5 border border-[var(--outline-variant)]"}`} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[var(--primary)]">Auto-Dispatch SOS</h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">Automatically assign the nearest mechanic for emergency requests.</p>
                </div>
                <div 
                  onClick={() => setAutoDispatch(!autoDispatch)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${autoDispatch ? "bg-[var(--secondary)]" : "bg-[var(--surface-container-high)] border border-[var(--outline-variant)]"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${autoDispatch ? "right-0.5" : "left-0.5 border border-[var(--outline-variant)]"}`} />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing & Fees */}
          <section className="bg-white rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)]">
              <h2 className="text-lg font-bold text-[var(--primary)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--secondary)]">payments</span> Pricing &amp; Fees
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Standard Diagnostic Fee (₦)</label>
                <input type="number" defaultValue={15000} className="w-full h-10 px-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm focus:border-[var(--secondary)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">SOS Emergency Surcharge (₦)</label>
                <input type="number" defaultValue={10000} className="w-full h-10 px-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm focus:border-[var(--secondary)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Vendor Platform Fee (%)</label>
                <input type="number" defaultValue={10} className="w-full h-10 px-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm focus:border-[var(--secondary)] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Mechanic Commission (%)</label>
                <input type="number" defaultValue={75} className="w-full h-10 px-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm focus:border-[var(--secondary)] outline-none" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4 border-t border-[var(--outline-variant)] pt-6">
            <button className="px-6 py-2.5 border border-[var(--outline-variant)] rounded-lg text-sm font-semibold text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] transition-colors">Discard Changes</button>
            <button className="px-6 py-2.5 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span> Save Settings
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
