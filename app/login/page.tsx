"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sign up states
  const [signUpRole, setSignUpRole] = useState("CUSTOMER");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = (session.user as any).role || loginRole;
      redirectToDashboard(role);
    }
  }, [status, session, router, loginRole]);

  const redirectToDashboard = (role: string) => {
    if (role === "MECHANIC") router.push("/mechanic/dashboard");
    else if (role === "ADMIN") router.push("/admin/control-room");
    else if (role === "VENDOR") router.push("/vendor/overview");
    else router.push("/customer/dashboard");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid email or password.");
        setLoading(false);
      } else {
        // Successful login, wait for useEffect to trigger or push immediately
        redirectToDashboard(loginRole);
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    if (signUpRole === "MECHANIC") router.push("/mechanic/onboarding");
    else if (signUpRole === "ADMIN") router.push("/admin/onboarding");
    else if (signUpRole === "VENDOR") router.push("/vendor/onboarding");
    else router.push("/customer/onboarding");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--surface-container-lowest)] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-[var(--primary)]">progress_activity</span>
      </div>
    );
  }

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

      {/* Right side: Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
          <Image src="/images/tushmech_logo.jpg" alt="Logo" width={32} height={32} className="rounded-md" />
          <span className="font-bold text-[var(--primary)] text-xl tracking-tight">TushMech</span>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 md:mt-0">
          <div>
            <h2 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h2>
            <p className="text-[var(--on-surface-variant)] mt-2">
              {isSignUp ? "Select your role to start the onboarding process." : "Log in to access your TushMech portal."}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-[var(--error)]/10 text-[var(--error)] p-4 rounded-lg text-sm font-semibold border border-[var(--error)]/20">
              {errorMsg}
            </div>
          )}

          {!isSignUp ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Portal / Role</label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all"
                >
                  <option value="CUSTOMER">Client (Customer)</option>
                  <option value="MECHANIC">Mechanic</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VENDOR">Vendor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[var(--primary)] text-white rounded-lg text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[24px]">login</span>
                )}
                Log In
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Select your Role</label>
                <select
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value)}
                  className="w-full h-14 px-4 rounded-lg border-2 border-[var(--primary)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-lg bg-[var(--surface-container-low)]"
                >
                  <option value="CUSTOMER">Client (Customer)</option>
                  <option value="MECHANIC">Mechanic</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VENDOR">Vendor</option>
                </select>
              </div>
              
              <button
                onClick={handleSignUpRedirect}
                className="w-full h-14 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continue to Sign Up
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          )}

          <div className="pt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg("");
              }}
              className="text-sm font-semibold text-[var(--secondary)] hover:underline"
            >
              {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
