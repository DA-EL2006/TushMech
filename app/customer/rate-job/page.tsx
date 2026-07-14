"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopAppBar from "../../components/TopAppBar";

const tags = ["On time", "Explained clearly", "Clean workspace", "Professional", "Fixed the issue", "Friendly"];

export default function RateJob() {
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (t: string) =>
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/customer/dashboard"), 2500);
  };

  if (submitted) return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-[var(--verification-green)]/10 flex items-center justify-center mb-6 animate-bounce">
        <span className="material-symbols-outlined text-[var(--verification-green)] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">Thank You!</h2>
      <p className="text-[var(--on-surface-variant)]">Your rating has been submitted. David O. will be notified.</p>
      <p className="text-xs text-[var(--on-surface-variant)] mt-4 animate-pulse">Returning to dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <TopAppBar showBack backHref="/customer/dashboard" title="Rate Your Experience" centered={false} />
      <main className="pt-20 pb-12 px-4 max-w-lg mx-auto space-y-6">

        {/* Mechanic summary */}
        <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[var(--primary-container)] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            DO
          </div>
          <div>
            <p className="font-bold text-[var(--primary)]">David O.</p>
            <p className="text-sm text-[var(--on-surface-variant)]">Brake Pad Replacement · Oct 24, 2024</p>
            <p className="text-xs text-[var(--secondary)] font-semibold mt-1">Job #SH-007 · ₦ 35,000</p>
          </div>
        </div>

        {/* Star rating */}
        <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-[var(--on-surface-variant)] mb-4">How would you rate this service?</p>
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)} onClick={() => setStars(i)}
                className="transition-transform hover:scale-125 active:scale-110">
                <span className="material-symbols-outlined text-[42px]"
                  style={{ color: i <= (hovered || stars) ? "#FBBF24" : "var(--outline-variant)", fontVariationSettings: i <= (hovered || stars) ? "'FILL' 1" : "'FILL' 0" }}>
                  star
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold text-[var(--primary)] h-5">
            {stars === 5 ? "Excellent!" : stars === 4 ? "Very Good" : stars === 3 ? "Good" : stars === 2 ? "Fair" : stars === 1 ? "Poor" : ""}
          </p>
        </div>

        {/* Tags */}
        {stars > 0 && (
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)] mb-3">What stood out? (optional)</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <button key={t} onClick={() => toggleTag(t)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${selectedTags.includes(t) ? "bg-[var(--secondary)] text-white border-[var(--secondary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:border-[var(--secondary)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comment */}
        {stars > 0 && (
          <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl p-5 shadow-sm">
            <label htmlFor="comment" className="text-sm font-semibold text-[var(--primary)] block mb-2">Leave a comment (optional)</label>
            <textarea id="comment" rows={4} value={comment} onChange={e => setComment(e.target.value)}
              placeholder="Tell us more about your experience..."
              className="w-full p-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-bright)] text-sm focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all resize-none" />
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={stars === 0}
          className="w-full h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-level-2">
          <span className="material-symbols-outlined">send</span>Submit Rating
        </button>

        <button onClick={() => router.push("/customer/dashboard")}
          className="w-full text-center text-sm text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors py-2">
          Skip for now
        </button>

      </main>
    </div>
  );
}
