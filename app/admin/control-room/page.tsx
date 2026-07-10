"use client";
import Image from "next/image";
import AdminSideNav from "../../components/AdminSideNav";

export default function AdminControlRoom() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="Live Control" />
      
      <main className="flex-1 md:ml-64 flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Left: Live Map */}
        <div className="w-full md:w-3/5 h-1/2 md:h-full relative border-r border-[var(--outline-variant)]">
          <Image src="/images/city_map.jpg" alt="Live Map" fill className="object-cover saturate-[0.8]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-container-lowest)]/80 to-transparent pointer-events-none" />
          
          <div className="absolute top-4 left-4 right-4 md:right-auto flex gap-2 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-[var(--outline-variant)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--verification-green)]" />
              <span className="text-xs font-semibold text-[var(--primary)]">24 Active Units</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-[var(--outline-variant)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--warning-orange)] animate-pulse" />
              <span className="text-xs font-semibold text-[var(--primary)]">3 Urgent</span>
            </div>
          </div>

          {/* Mechanic Pins */}
          {[
            { top: "40%", left: "30%", status: "active" },
            { top: "60%", left: "70%", status: "busy" },
            { top: "25%", left: "55%", status: "urgent" },
          ].map((pos, i) => (
            <div key={i} className="absolute z-20 group cursor-pointer" style={pos}>
              <div className="relative">
                {pos.status === 'urgent' && <div className="absolute inset-0 bg-[var(--error)] rounded-full animate-ping opacity-75" />}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md relative z-10 ${
                  pos.status === 'active' ? 'bg-[var(--verification-green)]' : 
                  pos.status === 'busy' ? 'bg-[var(--secondary)]' : 'bg-[var(--error)]'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">build</span>
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-level-2 border border-[var(--outline-variant)] p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                <p className="text-sm font-semibold text-[var(--primary)]">Unit #{100+i}</p>
                <p className="text-xs text-[var(--on-surface-variant)]">{pos.status === 'active' ? 'Idle' : 'On Route'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Operations Feed */}
        <div className="w-full md:w-2/5 h-1/2 md:h-full bg-[var(--surface-bright)] flex flex-col">
          <div className="p-4 border-b border-[var(--outline-variant)] bg-white z-10">
            <h2 className="text-lg font-semibold text-[var(--primary)]">Live Feed</h2>
            <div className="flex gap-2 mt-2">
              <input type="text" placeholder="Search ID or Mechanic..." className="flex-1 h-10 px-3 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] text-sm focus:border-[var(--secondary)] outline-none" />
              <button className="h-10 px-3 rounded-lg border border-[var(--outline-variant)] bg-white text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Urgent Job */}
            <div className="bg-white rounded-xl border-l-4 border-l-[var(--error)] border border-[var(--outline-variant)] shadow-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-[var(--error-container)] text-[var(--on-error-container)] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Critical</span>
                <span className="text-xs text-[var(--on-surface-variant)]">Just now</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">Job #8824 - Engine Stall</h3>
              <p className="text-xs text-[var(--on-surface-variant)] mb-3">Unit #142 (S. Jenkins) en route.</p>
              <button className="text-xs font-semibold text-[var(--secondary)] border border-[var(--secondary)] rounded px-3 py-1.5 hover:bg-[var(--secondary-container)]/10 transition-colors">Track Unit</button>
            </div>
            
            {/* Normal Jobs */}
            {[
              { id: "8823", title: "Routine Diagnostic", mechanic: "M. Ross", time: "10m ago" },
              { id: "8822", title: "Brake Pad Replacement", mechanic: "J. Doe", time: "25m ago" },
              { id: "8821", title: "Battery Swap", mechanic: "A. Smith", time: "45m ago" },
            ].map(job => (
              <div key={job.id} className="bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm p-4 hover:border-[var(--secondary)] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-[var(--on-surface-variant)]">Job #{job.id}</span>
                  <span className="text-xs text-[var(--on-surface-variant)]">{job.time}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">{job.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--surface-container)] flex items-center justify-center text-[10px] font-bold text-[var(--primary)]">{job.mechanic.charAt(0)}</div>
                  <span className="text-xs text-[var(--on-surface-variant)]">{job.mechanic} assigned</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
