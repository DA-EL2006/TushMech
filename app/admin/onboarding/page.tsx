"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    employeeId: "",
    department: "",
    roleLevel: "",
    phone: "",
    emergencyContact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Persist admin profile data so /admin/control-room and sidebar can read it
    localStorage.setItem("tushmech_admin_profile", JSON.stringify(formData));
    router.push("/admin/control-room");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={64} height={64} className="rounded-xl shadow-level-2 border-2 border-[var(--deep-navy)]" />
          </div>
          <h2 className="text-4xl font-bold text-[var(--primary)] tracking-tight">Admin Operations Setup</h2>
          <p className="mt-3 text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Configure your internal systems profile to access the Control Room and command center modules.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[var(--surface-container-lowest)] rounded-2xl shadow-level-2 border border-[var(--outline-variant)] overflow-hidden">
          
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Corporate Identity */}
            <div>
              <h4 className="text-sm font-bold text-[var(--deep-navy)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">badge</span> Corporate Identity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="e.g. Jane Smith" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Work Email *</label>
                  <input type="email" name="workEmail" required value={formData.workEmail} onChange={handleChange} placeholder="jane.smith@tushmech.com" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Employee ID *</label>
                  <input type="text" name="employeeId" required value={formData.employeeId} onChange={handleChange} placeholder="TM-0000" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)] uppercase" />
                </div>
              </div>
            </div>

            {/* Department Access */}
            <div>
              <h4 className="text-sm font-bold text-[var(--deep-navy)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span> System Access
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Department *</label>
                  <select name="department" required value={formData.department} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]">
                    <option value="">Select Department...</option>
                    <option value="Operations & Dispatch">Operations & Dispatch</option>
                    <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
                    <option value="Finance & Auditing">Finance & Auditing</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Systems/Tech">Systems/Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Role Level *</label>
                  <select name="roleLevel" required value={formData.roleLevel} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]">
                    <option value="">Select Level...</option>
                    <option value="Executive / Super Admin">Executive / Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Analyst / Agent">Analyst / Agent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-sm font-bold text-[var(--deep-navy)] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[var(--outline-variant)] pb-2">
                <span className="material-symbols-outlined text-[18px]">contact_phone</span> Contact Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Emergency Contact</label>
                  <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="+234 800 000 0000" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--deep-navy)] focus:ring-1 focus:ring-[var(--deep-navy)] outline-none transition-all text-sm bg-[var(--surface)]" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#0f172a] p-6 flex flex-col items-center border-t border-[var(--outline-variant)]">
            <p className="text-xs text-white/70 text-center mb-4 max-w-lg">
              System access is heavily monitored. By proceeding, you agree to abide by the TushMech Data Protection & Privacy policies.
            </p>
            <button 
              type="submit" 
              className="w-full md:w-auto px-12 h-14 bg-white text-[#0f172a] rounded-xl text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              Initialize Control Room
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
