"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import BottomNavBar from "../../components/BottomNavBar";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

export default function DispatchJobCard() {
  const { data: session } = useSession();
  const [activeJob, setActiveJob] = useState<any>(null);
  const [swiped, setSwiped] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    // Fetch initial active job if any (For MVP we assume none or fetch from a new GET route)
    // Here we will just rely on the WebSocket push for the demo.
    
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channelName = `mechanic-${session.user.id}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("job_assigned", (data: any) => {
      setActiveJob(data.job);
      setSwiped(false);
      setSwipeProgress(0);
      
      // Optional: Play a sound or show a system notification
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("New Job Assigned!", { body: `Job at ${data.job.address}` });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission();
        }
      }
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [session?.user?.id]);

  const handleDrag = (e: any) => {
    if (!swiped && activeJob) {
      setSwipeProgress(100);
      setTimeout(() => setSwiped(true), 300);
      // Here you would trigger an API call to update status to "IN_PROGRESS" / "DIAGNOSING"
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col pb-20">
      <header className="fixed top-0 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 h-[72px]">
        <div className="flex items-center gap-2">
          <Image src="/images/tushmech_logo.jpg" alt="Logo" width={48} height={48} className="rounded-lg border border-[var(--outline-variant)] p-1 bg-white" />
          <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">TushMech</h1>
        </div>
        <button className="w-12 h-12 flex items-center justify-center text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] rounded-full relative">
          <span className="material-symbols-outlined text-[28px]">notifications</span>
          {activeJob && !swiped && <span className="absolute top-3 right-3 w-3 h-3 bg-[var(--error)] rounded-full animate-ping" />}
        </button>
      </header>

      <main className="flex-1 flex flex-col relative w-full h-full max-w-2xl mx-auto overflow-hidden pt-[72px]">
        {/* Map Section */}
        <div className="relative w-full h-[300px] flex-shrink-0 bg-[var(--surface-container)]">
          <Image src="/images/la_map.jpg" alt="Map Route" fill className="object-cover" />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-12 h-12 bg-white rounded-full shadow-level-2 flex items-center justify-center text-[var(--primary-container)]">
              <span className="material-symbols-outlined text-[24px]">my_location</span>
            </button>
          </div>
          {activeJob && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-level-3 rounded-full px-4 py-2 flex items-center gap-2 border border-[var(--outline-variant)]/50">
              <span className="w-3 h-3 rounded-full bg-[var(--electric-blue)]" />
              <span className="font-bold text-[var(--primary-container)] text-sm">Active En-Route</span>
            </div>
          )}
        </div>

        {/* Job Card */}
        <div className="px-4 py-6 flex-1 -mt-6 relative z-10">
          {!activeJob ? (
            <div className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)]/50 p-12 flex flex-col items-center justify-center text-center h-full">
              <span className="material-symbols-outlined text-6xl text-[var(--on-surface-variant)] mb-4 opacity-50">satellite_alt</span>
              <h2 className="text-xl font-bold text-[var(--primary)]">No Active Dispatches</h2>
              <p className="text-[var(--on-surface-variant)] mt-2 text-sm">Stay online to receive incoming job requests in your area.</p>
              <div className="mt-8 flex items-center gap-2 text-[var(--verification-green)] font-semibold text-sm bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--verification-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--verification-green)]"></span>
                </span>
                You are Online
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-level-3 border-2 border-[var(--primary-container)]/10 overflow-hidden flex flex-col h-full">
              <div className="bg-[var(--primary-container)]/5 px-6 py-4 border-b-2 border-[var(--primary-container)]/10 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[var(--primary-container)] font-bold uppercase tracking-wider">Active Dispatch</span>
                  <h2 className="text-xl text-[var(--primary-container)] mt-1 font-bold">Job #{activeJob.id.substring(0,8).toUpperCase()}</h2>
                </div>
                <div className="bg-[var(--error)]/10 text-[var(--error)] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                  <span className="material-symbols-outlined text-[16px]">warning</span> Action Required
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6 flex-1 overflow-y-auto">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center text-[var(--secondary)] flex-shrink-0">
                    <span className="material-symbols-outlined text-[28px]">person</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-[var(--primary-container)] font-bold">{activeJob.customer_name}</h3>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 h-12 border-2 border-[var(--outline-variant)] rounded-lg flex items-center justify-center gap-2 text-[var(--primary-container)] hover:bg-[var(--surface-container-low)] font-bold shadow-sm">
                        <span className="material-symbols-outlined">call</span> Call
                      </button>
                      <button className="flex-1 h-12 border-2 border-[var(--outline-variant)] rounded-lg flex items-center justify-center gap-2 text-[var(--primary-container)] hover:bg-[var(--surface-container-low)] font-bold shadow-sm">
                        <span className="material-symbols-outlined">chat</span> Message
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-[var(--outline-variant)]/50" />

                <div>
                  <div className="flex items-center gap-2 mb-2 text-[var(--on-surface-variant)]">
                    <span className="material-symbols-outlined">directions_car</span>
                    <span className="text-xs uppercase tracking-wider font-bold">Vehicle Details</span>
                  </div>
                  <h4 className="text-base text-[var(--primary-container)] font-bold">{activeJob.vehicle}</h4>
                  <p className="text-sm text-[var(--on-surface-variant)] mt-1">License: <span className="font-mono bg-[var(--surface-container-low)] px-2 py-1 rounded border border-[var(--outline-variant)]/30 font-bold">{activeJob.license_plate}</span></p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 text-[var(--on-surface-variant)]">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="text-xs uppercase tracking-wider font-bold">Location</span>
                  </div>
                  <h4 className="text-base text-[var(--primary-container)] font-medium">{activeJob.address || "Location provided via GPS"}</h4>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 text-[var(--on-surface-variant)]">
                    <span className="material-symbols-outlined">build</span>
                    <span className="text-xs uppercase tracking-wider font-bold">Reported Issue</span>
                  </div>
                  <div className="bg-[var(--error-container)]/20 p-4 rounded-lg border border-[var(--error)]/20">
                    <p className="text-sm text-[var(--primary-container)] font-medium leading-relaxed">{activeJob.issue}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Swipe to Confirm */}
        {activeJob && (
          <div className="mt-auto px-6 pb-6 pt-2">
            <div className="swipe-track shadow-level-2 border-2 border-[var(--outline-variant)]/50 cursor-pointer" onClick={handleDrag}>
              <div className="swipe-progress" style={{ width: `${swipeProgress}%` }} />
              <div className="swipe-text opacity-100 transition-opacity" style={{ opacity: swiped ? 0 : 1 }}>{swiped ? "" : "TAP TO START DIAGNOSTICS"}</div>
              <div className={`swipe-thumb shadow-level-1 transition-all ${swiped ? 'bg-[var(--electric-blue)] translate-x-[calc(100vw-112px)] md:translate-x-[552px]' : ''}`}>
                <span className="material-symbols-outlined text-[32px]">{swiped ? "check" : "chevron_right"}</span>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <BottomNavBar activeTab="Jobs" items={[
        { icon: "assignment", label: "Jobs", href: "/mechanic/dispatch" },
        { icon: "account_balance_wallet", label: "Wallet", href: "/mechanic/wallet" },
        { icon: "person", label: "Profile", href: "/mechanic/profile" },
      ]} />
    </div>
  );
}
