"use client";
import React from "react";
import FleetSideNav from "../../components/FleetSideNav";
import Link from "next/link";

const FLEET_METRICS = [
  { label: "Total Fleet Size", value: "24", icon: "directions_car", color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Active Vehicles", value: "21", icon: "check_circle", color: "text-green-600", bg: "bg-green-100" },
  { label: "In Maintenance", value: "3", icon: "build", color: "text-amber-600", bg: "bg-amber-100" },
  { label: "Monthly Retainer", value: "Active", icon: "verified", color: "text-purple-600", bg: "bg-purple-100" },
];

const RECENT_SERVICE = [
  { id: "TM-4922", plate: "ABJ-901XY", issue: "Brake Pad Replacement", status: "Completed", date: "Today, 10:30 AM", cost: "Covered" },
  { id: "TM-4923", plate: "ABJ-334ZZ", issue: "Engine Diagnostics", status: "In Progress", date: "Today, 08:15 AM", cost: "Pending" },
  { id: "TM-4910", plate: "ABJ-112QA", issue: "Routine Oil Change", status: "Completed", date: "Yesterday", cost: "Covered" },
];

export default function FleetDashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <FleetSideNav />
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">Fleet Control Center</h1>
            <p className="text-sm text-[var(--on-surface-variant)] mt-1">Abuja Logistics Co. — Enterprise Overview</p>
          </div>
          <button className="h-10 px-4 bg-[var(--electric-blue)] text-white text-sm font-semibold rounded-lg shadow-sm hover:opacity-90 flex items-center gap-2 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">add</span> Add Vehicle
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {FLEET_METRICS.map((metric) => (
            <div key={metric.label} className="bg-white border border-[var(--outline-variant)] rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color}`}>
                <span className="material-symbols-outlined text-[24px]">{metric.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider">{metric.label}</p>
                <p className="text-2xl font-black text-[var(--primary)]">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-[var(--electric-blue)] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-2">airport_shuttle</span>
              <h2 className="text-xl font-bold mb-1">Need Mobile Triage for the Fleet?</h2>
              <p className="text-sm text-blue-100 max-w-md">Deploy a TushMech unit to your depot for bulk inspections or emergency breakdown recovery anywhere in Abuja.</p>
            </div>
            <div className="relative z-10 mt-6">
              <button className="bg-white text-blue-900 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors">
                Request Fleet Dispatch
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-700 mb-2">
                <span className="material-symbols-outlined text-[20px]">warning</span>
                <h3 className="font-bold">Attention Required</h3>
              </div>
              <p className="text-sm text-amber-800 font-medium">3 vehicles are currently grounded awaiting diagnostic approval.</p>
            </div>
            <Link href="/fleet/history" className="mt-4 w-full h-10 bg-amber-600 text-white rounded-lg text-sm font-bold flex items-center justify-center hover:bg-amber-700 transition-colors">
              Review Diagnostics
            </Link>
          </div>

        </div>

        {/* Service History Table */}
        <section className="bg-white border border-[var(--outline-variant)] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--outline-variant)] flex justify-between items-center bg-[var(--surface-container-lowest)]">
            <h2 className="font-bold text-[var(--primary)]">Recent Fleet Services</h2>
            <button className="text-sm font-semibold text-[var(--electric-blue)] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--surface-container-low)] text-xs uppercase tracking-wider text-[var(--on-surface-variant)]">
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Job ID</th>
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Vehicle Plate</th>
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Service Rendered</th>
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Date</th>
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Status</th>
                  <th className="p-4 font-semibold border-b border-[var(--outline-variant)]">Cost Allocation</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[var(--primary)]">
                {RECENT_SERVICE.map((job) => (
                  <tr key={job.id} className="hover:bg-[var(--surface-container-lowest)] transition-colors border-b border-[var(--outline-variant)] last:border-0">
                    <td className="p-4 font-semibold">{job.id}</td>
                    <td className="p-4">
                      <span className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded font-mono text-xs">{job.plate}</span>
                    </td>
                    <td className="p-4">{job.issue}</td>
                    <td className="p-4 text-[var(--on-surface-variant)]">{job.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-[var(--on-surface-variant)]">{job.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
