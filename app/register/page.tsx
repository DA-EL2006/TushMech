"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-container-lowest)] flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[var(--primary-container)] relative flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--deep-navy)] to-[var(--electric-blue)] opacity-90" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={100} height={100} className="rounded-2xl shadow-level-3 border-2 border-white/10 mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Join the Ecosystem</h1>
          <p className="text-[var(--primary-fixed-dim)] text-lg max-w-md">
            Create an account to track your vehicles, request top-rated mechanics, and manage everything from one dashboard.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-[var(--primary)] text-xl tracking-tight">TushMech</span>
        </div>

        <div className="w-full max-w-md space-y-8 mt-16 md:mt-0 py-8">
          <div>
            <h2 className="text-3xl font-bold text-[var(--primary)] tracking-tight">Create an account</h2>
            <p className="text-[var(--on-surface-variant)] mt-2">Get started with TushMech today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-[var(--error-container)] border border-[var(--error)]/30 text-[var(--on-error-container)] p-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--primary)]">First name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">person</span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[var(--primary)]">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--primary)]">Email address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">mail</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--primary)]">Phone number <span className="text-[var(--on-surface-variant)] font-normal">(Optional)</span></label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">call</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  placeholder="+234..."
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[var(--primary)]">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">lock</span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm"
                  placeholder="Create a strong password"
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--on-surface-variant)] mt-6">
            Already have an account? <Link href="/login" className="font-semibold text-[var(--secondary)] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
