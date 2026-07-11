"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      // Fetch session to determine role
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const role = (session?.user as any)?.role || "CUSTOMER";
      
      let redirectUrl = "/customer/dashboard";
      if (role === "ADMIN") redirectUrl = "/admin/control-room";
      else if (role === "MECHANIC") redirectUrl = "/mechanic/dispatch";
      else if (role === "VENDOR") redirectUrl = "/vendor/inventory";

      router.push(redirectUrl);
      router.refresh();
    }
  };

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

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-[var(--primary)] text-xl tracking-tight">TushMech</span>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 md:mt-0">
          <div>
            <h2 className="text-3xl font-bold text-[var(--primary)] tracking-tight">Welcome back</h2>
            <p className="text-[var(--on-surface-variant)] mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-[var(--error-container)] border border-[var(--error)]/30 text-[var(--on-error-container)] p-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--primary)]">Email address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[var(--primary)]">Password</label>
                <Link href="#" className="text-xs font-semibold text-[var(--secondary)] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">lock</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[var(--primary)] text-white rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[var(--outline-variant)]"></div>
            <span className="flex-shrink-0 mx-4 text-[var(--on-surface-variant)] text-xs font-semibold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-[var(--outline-variant)]"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full h-12 bg-white border border-[var(--outline-variant)] text-[var(--primary)] rounded-lg text-sm font-semibold shadow-sm hover:bg-[var(--surface-container-low)] transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" width="18" height="18" className="inline-block" />
            Google
          </button>

          <p className="text-center text-sm text-[var(--on-surface-variant)]">
            Don't have an account? <Link href="/register" className="font-semibold text-[var(--secondary)] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
