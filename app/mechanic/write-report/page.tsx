"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WriteReportPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [reportText, setReportText] = useState("");
  const [supportStatus, setSupportStatus] = useState<"checking" | "supported" | "unsupported">("checking");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for browser support
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSupportStatus("supported");
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-NG'; // Nigerian English or fallback to 'en-US'

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          // We append final transcript to existing text, but how do we manage interim?
          // It's usually easier to just append final results, or build it carefully.
          if (finalTranscript) {
            setReportText(prev => prev + (prev.length > 0 && !prev.endsWith(" ") ? " " : "") + finalTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          // If it was supposed to be listening, it might have timed out, so we restart it
          // Or we just let it stop. For simplicity, we just set state to false.
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSupportStatus("unsupported");
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = () => {
    if (!reportText.trim()) return alert("Please dictate or type a report first.");
    alert("Report Submitted Successfully!");
    router.push("/mechanic/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <header className="px-4 h-16 flex justify-between items-center border-b border-[var(--outline-variant)] sticky top-0 bg-[var(--surface-bright)] z-10">
        <Link href="/mechanic/dispatch" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[var(--primary)]">arrow_back</span>
          <span className="font-semibold text-[var(--primary)]">Back</span>
        </Link>
        <span className="text-sm font-bold text-[var(--primary-container)]">Diagnostic QA</span>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Write Diagnostic Report</h1>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Tap the microphone to dictate your findings hands-free.</p>
        </div>

        {supportStatus === "unsupported" && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            Your browser does not support Voice-to-Text. Please type your report manually.
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex justify-center mb-8 relative">
          {isListening && (
            <>
              <div className="absolute w-24 h-24 bg-[var(--verification-green)]/20 rounded-full animate-ping pointer-events-none" />
              <div className="absolute w-24 h-24 bg-[var(--verification-green)]/30 rounded-full animate-ping pointer-events-none" style={{ animationDelay: "0.2s" }} />
            </>
          )}
          <button 
            onClick={toggleListening}
            disabled={supportStatus === "unsupported"}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${isListening ? "bg-[var(--verification-green)] text-white scale-110" : "bg-[var(--surface-container-lowest)] border-2 border-[var(--outline-variant)] text-[var(--primary)] hover:border-[var(--secondary)]"}`}
          >
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: isListening ? "'FILL' 1" : "'FILL' 0" }}>
              {isListening ? "mic" : "mic_none"}
            </span>
          </button>
        </div>

        <p className="text-center text-xs text-[var(--on-surface-variant)] uppercase tracking-widest font-bold mb-4">
          {isListening ? "Listening..." : "Tap to speak"}
        </p>

        {/* Text Area */}
        <div className="flex-1 flex flex-col mb-6">
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="e.g., The brake pads are worn down to 2mm and the rotors show heavy scoring. Recommend complete front brake replacement."
            className="w-full flex-1 min-h-[200px] p-5 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--primary)] text-base leading-relaxed focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none resize-none shadow-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex gap-4">
          <button 
            onClick={() => setReportText("")} 
            className="h-14 px-6 rounded-xl border border-[var(--outline-variant)] text-[var(--on-surface-variant)] font-bold hover:bg-[var(--surface-container-low)] transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 h-14 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl font-bold text-lg shadow-level-2 hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">send</span>
            Submit QA Report
          </button>
        </div>
      </main>
    </div>
  );
}
