"use client";
import { useState } from "react";
import Image from "next/image";
import AdminSideNav from "../../components/AdminSideNav";

const MECHANICS = [
  { id: "MEC-042", name: "Sarah Jenkins", role: "Master Technician", status: "Active", location: "Wuse Zone 5", rating: 4.9, jobs: 142, img: "/images/mechanic_headshot.jpg" },
  { id: "MEC-038", name: "Mike Ross", role: "Senior Mechanic", status: "On Job", location: "Gwarinpa", rating: 4.7, jobs: 89, img: "/images/mechanic_headshot.jpg" },
  { id: "MEC-055", name: "David O.", role: "Diagnostics Specialist", status: "Offline", location: "Maitama", rating: 4.8, jobs: 115, img: "/images/admin_user.jpg" },
  { id: "MEC-021", name: "Emmanuel K.", role: "Mechanic", status: "Active", location: "Garki Area 11", rating: 4.5, jobs: 43, img: "/images/mechanic_headshot.jpg" },
];

export default function AdminMechanics() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? MECHANICS : MECHANICS.filter(m => m.status === filter);

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="Mechanics" />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-[var(--outline-variant)] sticky top-0 z-30 shadow-sm p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Mechanic Fleet Management</h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage and monitor verified TushMech technicians.</p>
          </div>
          <button className="h-10 px-4 bg-[var(--secondary)] text-[var(--on-secondary)] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">person_add</span> Onboard New Mechanic
          </button>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Mechanics", value: "28", icon: "group" },
              { label: "Active Now", value: "12", icon: "my_location", color: "text-[var(--verification-green)]" },
              { label: "On Jobs", value: "8", icon: "build", color: "text-blue-600" },
              { label: "Avg Rating", value: "4.8", icon: "star", color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-[var(--outline-variant)] shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-[var(--surface-container)] flex items-center justify-center ${stat.color || "text-[var(--primary)]"}`}>
                  <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">{stat.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Roster Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
            <div className="p-4 border-b border-[var(--outline-variant)] flex flex-wrap gap-2 justify-between items-center bg-[var(--surface-container-lowest)]">
              <div className="flex gap-2">
                {["All", "Active", "On Job", "Offline"].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${filter === f ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)] text-[18px]">search</span>
                <input type="text" placeholder="Search by name or ID..." className="h-9 pl-9 pr-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm w-64 focus:border-[var(--secondary)] outline-none" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[var(--surface-container-low)]/50 border-b border-[var(--outline-variant)]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Mechanic</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Location</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)]">Metrics</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--on-surface-variant)] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)]">
                  {filtered.map(m => (
                    <tr key={m.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image src={m.img} alt={m.name} width={40} height={40} className="rounded-full object-cover border border-[var(--outline-variant)]" />
                          <div>
                            <p className="font-bold text-[var(--primary)]">{m.name}</p>
                            <p className="text-xs text-[var(--on-surface-variant)]">{m.role} • {m.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold gap-1.5 ${
                          m.status === "Active" ? "bg-[var(--verification-green)]/10 text-[var(--verification-green)] border border-[var(--verification-green)]/20" :
                          m.status === "On Job" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                          "bg-[var(--surface-container)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.status === "Active" ? "bg-[var(--verification-green)] animate-pulse" : m.status === "On Job" ? "bg-blue-600" : "bg-[var(--outline)]"}`} />
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--on-surface-variant)] font-medium">
                        {m.location}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-semibold text-[var(--primary)] mb-1">⭐ {m.rating}</div>
                        <div className="text-xs text-[var(--on-surface-variant)]">{m.jobs} jobs completed</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-[var(--secondary)] hover:bg-[var(--secondary)]/10 p-2 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
