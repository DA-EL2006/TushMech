"use client";
import Image from "next/image";
import Link from "next/link";
import AdminSideNav from "../../components/AdminSideNav";

export default function QAQueue() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="QA Queue" />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen">
        <div className="bg-white border-b border-[var(--outline-variant)] sticky top-0 z-30 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-[var(--primary)]">QA Approval Queue</h1>
                <span className="bg-[var(--warning-orange)]/10 text-[var(--warning-orange)] border border-[var(--warning-orange)]/20 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning-orange)] animate-pulse" />
                  15 Pending
                </span>
              </div>
              <p className="text-sm text-[var(--on-surface-variant)]">Review and approve diagnostic reports from the field.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">search</span>
                <input type="text" placeholder="Search vehicle or mechanic..." className="h-10 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm w-full md:w-64 focus:border-[var(--secondary)] outline-none transition-all" />
              </div>
              <button className="h-10 px-4 border border-[var(--outline-variant)] rounded-lg flex items-center gap-2 hover:bg-[var(--surface-container-low)] transition-colors bg-white">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span className="text-sm font-semibold">Filters</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 hide-scrollbar">
            <button className="px-4 py-1.5 rounded-full border border-[var(--primary)] bg-[var(--primary)] text-[var(--on-primary)] text-xs font-semibold whitespace-nowrap">All Reports</button>
            <button className="px-4 py-1.5 rounded-full border border-[var(--outline-variant)] bg-white text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] text-xs font-semibold whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--warning-orange)]" /> Urgent (3)
            </button>
            <button className="px-4 py-1.5 rounded-full border border-[var(--outline-variant)] bg-white text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] text-xs font-semibold whitespace-nowrap">EV Fleet</button>
            <button className="px-4 py-1.5 rounded-full border border-[var(--outline-variant)] bg-white text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] text-xs font-semibold whitespace-nowrap">Heavy Duty</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Urgent Card */}
            <div className="bg-white rounded-xl border-l-4 border-l-[var(--warning-orange)] border border-[var(--outline-variant)] shadow-sm flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[var(--surface-container)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                      <span className="material-symbols-outlined text-[24px]">directions_car</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--primary)]">2022 Tesla Model 3</h3>
                      <p className="text-sm text-[var(--on-surface-variant)]">VIN: 5YJ3E1EA3NF******</p>
                    </div>
                  </div>
                  <span className="bg-[var(--warning-orange)]/10 text-[var(--warning-orange)] text-xs px-2 py-1 rounded-full uppercase font-bold">Urgent</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--surface-variant)]">
                    <span className="block text-xs text-[var(--on-surface-variant)] mb-1">Mechanic</span>
                    <div className="flex items-center gap-2">
                      <Image src="/images/mechanic_headshot.jpg" alt="Mechanic" width={24} height={24} className="rounded-full object-cover" />
                      <span className="text-sm font-semibold">Sarah Jenkins</span>
                    </div>
                  </div>
                  <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--surface-variant)]">
                    <span className="block text-xs text-[var(--on-surface-variant)] mb-1">Time Logged</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span className="text-sm font-semibold">45 mins ago</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[var(--primary)] mb-2">Key Findings</span>
                  <div className="bg-[var(--surface-container-low)] rounded-lg p-4 border border-[var(--outline-variant)]/50 text-sm text-[var(--on-surface-variant)] leading-relaxed">
                    High voltage battery cooling system showing abnormal pressure drops. Thermal management module flagged for immediate review.
                  </div>
                </div>
              </div>
              <div className="border-t border-[var(--outline-variant)] p-4 bg-[var(--surface-bright)] flex gap-3">
                <Link href="/admin/review" className="flex-1 h-12 bg-[var(--secondary)] hover:bg-blue-700 text-[var(--on-secondary)] text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">visibility</span> Review Full Report
                </Link>
                <button className="w-12 h-12 border border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:text-[var(--verification-green)] hover:border-[var(--verification-green)] hover:bg-[var(--verification-green)]/10 rounded-lg transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>
            </div>

            {/* Normal Card */}
            <div className="bg-white rounded-xl border-l-4 border-l-[var(--primary-fixed-dim)] border border-[var(--outline-variant)] shadow-sm flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[var(--surface-container)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                      <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--primary)]">2019 Ford F-150 Fleet</h3>
                      <p className="text-sm text-[var(--on-surface-variant)]">Unit: #402</p>
                    </div>
                  </div>
                  <span className="bg-[var(--surface-variant)] text-[var(--on-surface-variant)] text-xs px-2 py-1 rounded-full uppercase font-bold">Pending Review</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--surface-variant)]">
                    <span className="block text-xs text-[var(--on-surface-variant)] mb-1">Mechanic</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center text-[10px] font-bold">MR</div>
                      <span className="text-sm font-semibold">Mike Ross</span>
                    </div>
                  </div>
                  <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--surface-variant)]">
                    <span className="block text-xs text-[var(--on-surface-variant)] mb-1">Time Logged</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span className="text-sm font-semibold">2 hrs ago</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[var(--primary)] mb-2">Key Findings</span>
                  <div className="bg-[var(--surface-container-low)] rounded-lg p-4 border border-[var(--outline-variant)]/50 text-sm text-[var(--on-surface-variant)] leading-relaxed">
                    Routine 50k mile service completed. Brake pads at 4mm, recommended replacement on next cycle. No critical faults detected in OBD2 scan.
                  </div>
                </div>
              </div>
              <div className="border-t border-[var(--outline-variant)] p-4 bg-[var(--surface-bright)] flex gap-3">
                <Link href="/admin/review" className="flex-1 h-12 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--surface-container)] text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">visibility</span> Review Full Report
                </Link>
                <button className="w-12 h-12 border border-[var(--outline-variant)] text-[var(--on-surface-variant)] hover:text-[var(--verification-green)] hover:border-[var(--verification-green)] hover:bg-[var(--verification-green)]/10 rounded-lg transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
