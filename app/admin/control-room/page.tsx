"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import AdminSideNav from "../../components/AdminSideNav";
import dynamic from "next/dynamic";
import Pusher from "pusher-js";

// Dynamically import Leaflet map
const MapComponent = dynamic(() => import("../../components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 flex items-center justify-center animate-pulse"><span className="material-symbols-outlined text-[var(--secondary)] text-4xl animate-spin">progress_activity</span></div>
});

export default function AdminControlRoom() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial map center
  const mapCenter: [number, number] = [6.5244, 3.3792]; // Lagos

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (data.success) {
          // Flatten structure for the UI
          const mappedJobs = data.jobs.map((j: any) => ({
            id: j.id,
            customer_name: `${j.customer.first_name} ${j.customer.last_name}`,
            vehicle: `${j.vehicle.year} ${j.vehicle.make} ${j.vehicle.model}`,
            license_plate: j.vehicle.license_plate,
            issue: j.reported_issue,
            address: j.address,
            latitude: j.latitude,
            longitude: j.longitude,
            status: j.status,
            created_at: j.created_at
          }));
          setJobs(mappedJobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();

    // Setup Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("admin-channel");

    // Listen for new jobs
    channel.bind("job_created", (data: any) => {
      setJobs((prev) => [data.job, ...prev]);
    });

    // Listen for job assignments
    channel.bind("job_status_update", (data: any) => {
      setJobs((prev) => 
        prev.map(j => j.id === data.job_id ? { ...j, status: data.status } : j)
      );
    });

    return () => {
      pusher.unsubscribe("admin-channel");
    };
  }, []);

  const handleAssign = async (jobId: string) => {
    try {
      // For MVP, we auto-assign to a dummy mechanic ID. In a real app, this opens a modal to select a mechanic.
      // We will look up the mechanic we seeded.
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          // HACK: Hardcoded mechanic email for the hackathon MVP pitch to ensure it works.
          // The API needs a mechanic ID, but we can pass the email and let the API find them,
          // or just assume we know the ID. Let's pass the email and update the API to handle it.
          mechanic_email: "mechanic@test.com"
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("Mechanic dispatched successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to dispatch mechanic");
    }
  };

  // Convert jobs to map markers
  const markers = useMemo(() => {
    return jobs.filter(j => j.latitude && j.longitude).map(j => ({
      lat: j.latitude,
      lng: j.longitude,
      title: `${j.customer_name} - ${j.issue}`,
      isMechanic: false // Customers are blue pins
    }));
  }, [jobs]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSideNav activeItem="Control Room" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center px-4 h-16 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)]">
          <div className="flex items-center gap-2">
            <Image src="/images/tushmech_logo.jpg" alt="Logo" width={24} height={24} className="rounded object-cover" />
            <h1 className="text-xl font-semibold text-[var(--primary)]">TushMech</h1>
          </div>
          <Image src="/images/customer_profile.jpg" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Left Panel: Active Operations */}
          <div className="w-full md:w-96 bg-white border-r border-[var(--outline-variant)]/50 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 md:relative absolute top-0 left-0 transform md:translate-x-0 -translate-x-full transition-transform">
            <div className="p-5 border-b border-[var(--outline-variant)]/50 bg-gradient-to-b from-[var(--surface-container-lowest)] to-white">
              <h2 className="text-xl font-bold text-[var(--primary)] tracking-tight">Active Operations</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--verification-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--verification-green)]"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide text-[var(--on-surface-variant)] uppercase">Live Feed</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--surface-container-lowest)]/30">
              {loading ? (
                <div className="flex items-center justify-center h-32"><span className="material-symbols-outlined animate-spin text-[var(--secondary)] text-3xl">progress_activity</span></div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-10 text-[var(--on-surface-variant)] text-sm">No active operations.</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white border border-[var(--outline-variant)]/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    {job.status === "PENDING" && <div className="absolute top-0 left-0 w-1 h-full bg-[var(--warning-orange)]" />}
                    {job.status === "ASSIGNED" && <div className="absolute top-0 left-0 w-1 h-full bg-[var(--electric-blue)]" />}
                    
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${job.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{job.status}</span>
                        <h3 className="text-sm font-bold text-[var(--primary)] mt-1">{job.customer_name}</h3>
                      </div>
                      <span className="text-[10px] text-[var(--on-surface-variant)] font-semibold">{new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]"><span className="material-symbols-outlined text-[14px]">directions_car</span><span className="font-medium text-[var(--on-surface)]">{job.vehicle}</span> <span className="bg-[var(--surface-variant)] px-1 rounded text-[9px]">{job.license_plate}</span></div>
                      <div className="flex items-start gap-2 text-xs text-[var(--on-surface-variant)]"><span className="material-symbols-outlined text-[14px] mt-0.5">build</span><span className="line-clamp-2">{job.issue}</span></div>
                      <div className="flex items-start gap-2 text-xs text-[var(--on-surface-variant)]"><span className="material-symbols-outlined text-[14px] mt-0.5">location_on</span><span className="line-clamp-1">{job.address || "Unknown Location"}</span></div>
                    </div>
                    
                    {job.status === "PENDING" && (
                      <button 
                        onClick={() => handleAssign(job.id)}
                        className="w-full bg-[var(--deep-navy)] text-white text-xs font-semibold py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
                      >
                        Dispatch Mechanic
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel: Live Map */}
          <div className="flex-1 relative bg-[var(--surface-container-lowest)] h-full">
            <div className="absolute inset-0 w-full h-full z-0">
              <MapComponent center={mapCenter} zoom={13} markers={markers} />
            </div>
            
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
              <button className="w-10 h-10 bg-white rounded-xl shadow-level-2 flex items-center justify-center text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"><span className="material-symbols-outlined">layers</span></button>
              <button className="w-10 h-10 bg-white rounded-xl shadow-level-2 flex items-center justify-center text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"><span className="material-symbols-outlined">my_location</span></button>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-level-2 border border-[var(--outline-variant)]/50 hidden md:block">
              <h4 className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide mb-2">Map Legend</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--secondary)] shadow-sm"></div><span className="text-xs font-medium text-[var(--on-surface-variant)]">Customer Request</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--error)] shadow-sm"></div><span className="text-xs font-medium text-[var(--on-surface-variant)]">Active Mechanic</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.02)] border-t border-[var(--outline-variant)]/30 rounded-t-xl">
        {["Map", "Queue", "Review", "More"].map((n, i) => (
          <button key={n} className={`flex flex-col items-center justify-center ${n === "Map" ? "text-[var(--secondary)] bg-[var(--secondary)]/10 rounded-full px-4 py-1" : "text-[var(--on-surface-variant)]"}`}>
            <span className={`material-symbols-outlined ${n === "Map" ? "fill" : ""}`}>{['map', 'list_alt', 'fact_check', 'more_horiz'][i]}</span>
            <span className={`text-[10px] ${n === "Map" ? "font-bold" : ""}`}>{n}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
