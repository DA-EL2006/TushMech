"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface CarDetails {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  mileage: string;
  licensePlate: string;
  color: string;
  knownIssues: string;
}

export default function CustomerOnboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [cars, setCars] = useState<CarDetails[]>([{
    id: "1", make: "", model: "", year: "", vin: "", engine: "", transmission: "",
    drivetrain: "", fuelType: "", mileage: "", licensePlate: "", color: "", knownIssues: ""
  }]);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("tushmech_customer_draft_profile");
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      
      const savedCars = localStorage.getItem("tushmech_customer_draft_cars");
      if (savedCars) setCars(JSON.parse(savedCars));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tushmech_customer_draft_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("tushmech_customer_draft_cars", JSON.stringify(cars));
  }, [cars]);

  const addAnotherCar = () => {
    setCars([
      ...cars,
      {
        id: Math.random().toString(36).substring(7),
        make: "", model: "", year: "", vin: "", engine: "", transmission: "",
        drivetrain: "", fuelType: "", mileage: "", licensePlate: "", color: "", knownIssues: ""
      }
    ]);
  };

  const removeCar = (id: string) => {
    if (cars.length > 1) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const updateCar = (id: string, field: keyof CarDetails, value: string) => {
    setCars(cars.map(car => car.id === id ? { ...car, [field]: value } : car));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Register User
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, role: "CUSTOMER" }),
      });
      
      if (!regRes.ok) {
        const error = await regRes.json();
        alert(`Registration failed: ${error.message}${error.details ? ' - ' + error.details : ''}`);
        setLoading(false);
        return;
      }

      // 2. Log in User
      const signInRes = await signIn("credentials", {
        email: profile.email,
        password: profile.password,
        redirect: false,
      });

      if (signInRes?.error) {
        alert("Failed to sign in after registration.");
        setLoading(false);
        return;
      }

      // 3. Save Vehicles
      for (const car of cars) {
        if (!car.make || !car.model) continue;
        const vehicleRes = await fetch("/api/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            make: car.make,
            model: car.model,
            year: car.year,
            licensePlate: car.licensePlate || "PENDING",
            vin: car.vin,
            currentMileage: car.mileage,
          }),
        });
        if (!vehicleRes.ok) {
          const vErr = await vehicleRes.json();
          alert(`Failed to save vehicle: ${vErr.message}${vErr.details ? ' - ' + vErr.details : ''}`);
        }
      }

      // Fallback for demo UX
      localStorage.setItem("tushmech_garage", JSON.stringify(cars));
      // Clear drafts on success
      localStorage.removeItem("tushmech_customer_draft_profile");
      localStorage.removeItem("tushmech_customer_draft_cars");
      router.push("/customer/dashboard");
    } catch (err: any) {
      console.error("Caught unexpected error:", err);
      alert(`An unexpected error occurred: ${err?.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image src="/images/tushmech_logo.jpg" alt="TushMech Logo" width={64} height={64} className="rounded-xl shadow-level-2" />
          </div>
          <h2 className="text-4xl font-bold text-[var(--primary)] tracking-tight">Set up your Digital Garage</h2>
          <p className="mt-3 text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto">
            Provide detailed specifications for your vehicles. This allows our expert mechanics to bring the right tools, parts, and diagnostics for your exact make and model.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Personal Details Section */}
          <div className="bg-[var(--surface-container-lowest)] rounded-2xl shadow-level-2 border border-[var(--outline-variant)] overflow-hidden">
            <div className="bg-[var(--deep-navy)] px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--secondary)]">person</span>
                Personal Details
              </h3>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Full Name *</label>
                <input type="text" required value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} placeholder="e.g. John Doe" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Phone Number *</label>
                <input type="tel" required value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="0800 000 0000" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Email Address *</label>
                <input type="email" required value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="you@example.com" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Password *</label>
                <input type="password" required value={profile.password} onChange={e => setProfile({...profile, password: e.target.value})} placeholder="••••••••" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
              </div>
            </div>
          </div>

          {cars.map((car, index) => (
            <div key={car.id} className="bg-[var(--surface-container-lowest)] rounded-2xl shadow-level-2 border border-[var(--outline-variant)] overflow-hidden relative transition-all">
              
              <div className="bg-[var(--primary-container)] px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--secondary)]">directions_car</span>
                  Vehicle {index + 1}
                </h3>
                {cars.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeCar(car.id)}
                    className="text-[var(--on-primary-container)] hover:text-[var(--error)] transition-colors flex items-center gap-1 text-sm font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    Remove
                  </button>
                )}
              </div>

              <div className="p-6 md:p-8 space-y-8">
                
                {/* Basic Identification */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">badge</span> Basic Identification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Make</label>
                      <input type="text" required value={car.make} onChange={e => updateCar(car.id, 'make', e.target.value)} placeholder="e.g. Toyota" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Model</label>
                      <input type="text" required value={car.model} onChange={e => updateCar(car.id, 'model', e.target.value)} placeholder="e.g. Camry" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Year</label>
                      <input type="number" required value={car.year} onChange={e => updateCar(car.id, 'year', e.target.value)} placeholder="e.g. 2018" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">settings_suggest</span> Technical Specifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">VIN (Vehicle Identification Number) *</label>
                      <input type="text" required value={car.vin} onChange={e => updateCar(car.id, 'vin', e.target.value)} placeholder="17-character VIN" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)] uppercase" maxLength={17} />
                      <p className="text-xs text-[var(--on-surface-variant)] mt-1">Crucial for exact OEM part matching.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Engine</label>
                      <input type="text" value={car.engine} onChange={e => updateCar(car.id, 'engine', e.target.value)} placeholder="e.g. 2.5L 4-Cyl" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Fuel Type</label>
                      <select value={car.fuelType} onChange={e => updateCar(car.id, 'fuelType', e.target.value)} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]">
                        <option value="">Select...</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric (EV)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Transmission</label>
                      <select value={car.transmission} onChange={e => updateCar(car.id, 'transmission', e.target.value)} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]">
                        <option value="">Select...</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="DCT">DCT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Drivetrain</label>
                      <select value={car.drivetrain} onChange={e => updateCar(car.id, 'drivetrain', e.target.value)} className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]">
                        <option value="">Select...</option>
                        <option value="FWD">Front-Wheel Drive (FWD)</option>
                        <option value="RWD">Rear-Wheel Drive (RWD)</option>
                        <option value="AWD">All-Wheel Drive (AWD)</option>
                        <option value="4WD">Four-Wheel Drive (4WD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Current Mileage</label>
                      <div className="relative">
                        <input type="number" required value={car.mileage} onChange={e => updateCar(car.id, 'mileage', e.target.value)} placeholder="e.g. 65000" className="w-full h-12 px-4 pr-12 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--on-surface-variant)] font-medium">km</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Color</label>
                      <input type="text" value={car.color} onChange={e => updateCar(car.id, 'color', e.target.value)} placeholder="e.g. Midnight Blue" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)]" />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">info</span> Additional Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">License Plate Number</label>
                      <input type="text" value={car.licensePlate} onChange={e => updateCar(car.id, 'licensePlate', e.target.value)} placeholder="e.g. ABC-1234" className="w-full h-12 px-4 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)] uppercase" />
                    </div>
                    <div className="md:row-span-2">
                      <label className="block text-sm font-semibold text-[var(--primary)] mb-1">Current Issues / Dashboard Lights</label>
                      <textarea value={car.knownIssues} onChange={e => updateCar(car.id, 'knownIssues', e.target.value)} placeholder="e.g. Check engine light is on, hearing a squeaking noise when braking..." className="w-full h-32 px-4 py-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none transition-all text-sm bg-[var(--surface)] resize-none" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--outline-variant)]">
            <button 
              type="button" 
              onClick={addAnotherCar}
              className="h-14 px-6 bg-[var(--surface-container-low)] text-[var(--primary)] border border-[var(--outline-variant)] rounded-xl text-lg font-semibold shadow-sm hover:bg-[var(--surface-variant)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] w-full sm:w-auto"
            >
              <span className="material-symbols-outlined">add</span>
              Add Another Car
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="h-14 px-8 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-lg font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-[0.98] flex-grow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">garage</span>}
              {loading ? "Saving Garage..." : "Save Garage & Continue to Dashboard"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
