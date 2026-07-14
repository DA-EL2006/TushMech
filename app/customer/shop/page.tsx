"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";
import { useCartStore } from "../../../store/cartStore";

interface GarageVehicle { make: string; model: string; year: string; [key: string]: string; }


const parts = [
  { id: "p1", img: "/images/obd2_scanner.jpg", name: "Denso Oxygen Sensor — Front", price: 18500, type: "OEM", compat: ["2016 Camry", "2019 Corolla"], category: "Sensors", rating: "4.8", reviews: "92" },
  { id: "p2", img: "/images/tire_inflator.jpg", name: "Brembo Brake Pad Set — Front", price: 32000, type: "OEM", compat: ["2016 Camry"], category: "Brakes", rating: "4.9", reviews: "210" },
  { id: "p3", img: "/images/led_interior.jpg", name: "Bosch Iridium Spark Plugs (4-pack)", price: 14500, type: "Aftermarket", compat: ["2016 Camry", "2019 Corolla"], category: "Engine", rating: "4.7", reviews: "134" },
  { id: "p4", img: "/images/charger_mount.jpg", name: "Castrol Edge 5W-30 Full Synthetic (5L)", price: 22000, type: "OEM", compat: ["2016 Camry", "2019 Corolla"], category: "Fluids", rating: "4.9", reviews: "488" },
  { id: "p5", img: "/images/obd2_scanner.jpg", name: "Toyota OEM Air Filter — Camry 2016", price: 9800, type: "OEM", compat: ["2016 Camry"], category: "Filters", rating: "4.6", reviews: "67" },
  { id: "p6", img: "/images/dashcam_hero.jpg", name: "Bosch Alternator Belt — K060882", price: 12500, type: "Aftermarket", compat: ["2016 Camry", "2019 Corolla"], category: "Engine", rating: "4.5", reviews: "44" },
  { id: "p7", img: "/images/tire_inflator.jpg", name: "Ferodo Rear Drum Brake Shoes", price: 16000, type: "Aftermarket", compat: ["2019 Corolla"], category: "Brakes", rating: "4.6", reviews: "78" },
  { id: "p8", img: "/images/led_interior.jpg", name: "Mann-Filter Cabin Air Filter", price: 7500, type: "OEM", compat: ["2016 Camry", "2019 Corolla"], category: "Filters", rating: "4.8", reviews: "155" },
];

const categories = ["All", "Brakes", "Engine", "Filters", "Sensors", "Fluids"];

export default function SparePartsShop() {
  const { cart, addToCart, updateQuantity, removeFromCart, getCartTotal, getCartCount, includeMechanicInstall, toggleMechanicInstall, clearCart } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [carFilter, setCarFilter] = useState("All Parts");
  const [typeFilter, setTypeFilter] = useState<"All" | "OEM" | "Aftermarket">("All");
  const [catFilter, setCatFilter] = useState("All");
  const [bookPart, setBookPart] = useState<string | null>(null);
  const [userCars, setUserCars] = useState<string[]>(["All Parts", "2016 Camry", "2019 Corolla"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("tushmech_garage");
      if (raw) {
        const parsed: GarageVehicle[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const labels = parsed.map((v: GarageVehicle) => `${v.year} ${v.make} ${v.model}`.trim()).filter(Boolean);
          if (labels.length > 0) { setUserCars(["All Parts", ...labels]); return; }
        }
      }
    } catch {}
  }, []);

  const filtered = parts.filter(p => {
    const carMatch = carFilter === "All Parts" || p.compat.includes(carFilter);
    const typeMatch = typeFilter === "All" || p.type === typeFilter;
    const catMatch = catFilter === "All" || p.category === catFilter;
    return carMatch && typeMatch && catMatch;
  });

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const mechanicFee = 15000;
  const grandTotal = cartTotal + (includeMechanicInstall ? mechanicFee : 0);

  return (
    <div className="min-h-screen bg-[var(--background)] antialiased pb-24">
      {/* Header */}
      <header className="sticky top-0 w-full z-40 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 md:px-8 h-[64px]">
        <h1 className="text-xl font-bold text-[var(--primary)] tracking-tight">Spare Parts</h1>
        <button onClick={() => setCartOpen(true)} className="relative w-11 h-11 flex items-center justify-center hover:bg-[var(--surface-container-low)] rounded-full transition-colors">
          <span className="material-symbols-outlined text-[var(--primary)]">shopping_cart</span>
          {mounted && cartCount > 0 && <span className="absolute top-1.5 right-1.5 bg-[var(--secondary)] text-[var(--on-secondary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-5">
        {/* Garage filter */}
        <section className="mb-4">
          <p className="text-xs font-semibold text-[var(--on-surface-variant)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">garage</span>Filter by your garage
          </p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {userCars.map(car => (
              <button key={car} onClick={() => setCarFilter(car)}
                className={`flex-shrink-0 px-4 h-9 rounded-full text-xs font-semibold border transition-all ${carFilter === car ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>
                {car}
              </button>
            ))}
          </div>
        </section>

        {/* OEM / Aftermarket toggle + categories */}
        <section className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex bg-[var(--surface-container-low)] rounded-lg p-1 border border-[var(--outline-variant)]">
            {(["All","OEM","Aftermarket"] as const).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-4 h-8 rounded-md text-xs font-semibold transition-all ${typeFilter===t ? "bg-white shadow text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`}>{t}</button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`flex-shrink-0 px-3 h-8 rounded-full text-xs font-semibold border transition-all ${catFilter===c ? "bg-[var(--secondary)] text-white border-[var(--secondary)]" : "bg-white text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"}`}>{c}</button>
            ))}
          </div>
        </section>

        {/* Results header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[var(--primary)]">{filtered.length} parts found</h2>
          {carFilter !== "All Parts" && (
            <span className="text-xs text-[var(--secondary)] bg-[var(--secondary)]/10 px-3 py-1 rounded-full font-semibold">
              Compatible with {carFilter}
            </span>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <article key={p.id} className="bg-white rounded-xl border border-[var(--outline-variant)] flex flex-col overflow-hidden hover:shadow-level-2 transition-shadow group">
              <div className="relative aspect-square bg-[var(--surface-container-low)] overflow-hidden">
                <Image src={p.img} alt={p.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${p.type === "OEM" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{p.type}</span>
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[12px] text-[var(--error)]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                  <span className="text-[10px] text-[var(--on-surface-variant)]">{p.rating} ({p.reviews})</span>
                </div>
                <h4 className="text-xs font-semibold text-[var(--primary)] mb-2 line-clamp-2 flex-grow">{p.name}</h4>
                <p className="text-sm font-bold text-[var(--primary)] mb-3">₦ {p.price.toLocaleString()}</p>
                <button 
                  onClick={() => {
                    clearCart();
                    addToCart(p);
                    toggleMechanicInstall(false);
                    setCartOpen(true);
                  }}
                  className="w-full h-9 border border-[var(--primary)] text-[var(--primary)] text-xs font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-colors flex items-center justify-center gap-1.5 mb-1.5">
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>Add to Cart
                </button>
                <button 
                  onClick={() => {
                    clearCart();
                    addToCart(p);
                    toggleMechanicInstall(true);
                    setCartOpen(true);
                  }}
                  className="w-full h-9 bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 text-[var(--secondary)] text-xs font-semibold rounded-lg hover:bg-[var(--secondary)] hover:text-[var(--on-secondary)] transition-colors flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">build</span>Buy + Book Install
                </button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-[var(--on-surface-variant)]">
              <span className="material-symbols-outlined text-5xl opacity-30 block mb-3">inventory_2</span>
              <p className="font-semibold">No parts match your filters</p>
              <p className="text-sm mt-1">Try selecting &quot;All Parts&quot; or a different category</p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex items-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full bg-[var(--surface-container-lowest)] rounded-t-3xl shadow-2xl p-6 pb-safe max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[var(--primary)]">Cart ({cartCount} items)</h3>
              <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3 mb-5">
              {cart.length === 0 ? (
                <p className="text-center text-[var(--on-surface-variant)] py-8">Your cart is empty</p>
              ) : cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)]">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[var(--surface-container-low)] flex-shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--primary)] line-clamp-2">{item.name}</p>
                    <p className="text-sm font-bold text-[var(--secondary)] mt-0.5">₦ {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => {
                        if (item.qty <= 1) removeFromCart(item.id);
                        else updateQuantity(item.id, item.qty - 1);
                      }}
                      className="w-7 h-7 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center text-[var(--on-surface-variant)] hover:bg-[var(--outline-variant)]">
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--on-secondary)] hover:opacity-90">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-[var(--outline-variant)] pt-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">build</span> Mobile Mechanic Install</h4>
                    <p className="text-xs text-blue-700 mt-0.5">Let an expert install this for you (₦15,000 flat fee)</p>
                  </div>
                  <div 
                    onClick={() => toggleMechanicInstall(!includeMechanicInstall)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${includeMechanicInstall ? "bg-[var(--secondary)]" : "bg-white border border-[var(--outline-variant)]"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${includeMechanicInstall ? "right-0.5" : "left-0.5 border border-[var(--outline-variant)]"}`} />
                  </div>
                </div>

                <div className="flex justify-between items-end pb-2">
                  <div>
                    <span className="font-semibold text-[var(--on-surface-variant)] block text-sm">Total</span>
                    {includeMechanicInstall && <span className="text-[10px] text-[var(--outline)]">Includes ₦15,000 install fee</span>}
                  </div>
                  <span className="text-2xl font-bold text-[var(--primary)]">₦ {grandTotal.toLocaleString()}</span>
                </div>
                <Link href="/customer/checkout" onClick={() => setCartOpen(false)}
                  className="w-full h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-level-2 mb-2">
                  <span className="material-symbols-outlined">shopping_bag</span>Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNavBar activeTab="Market" items={[
        { icon: "home_app_logo", label: "Home", href: "/customer/dashboard" },
        { icon: "garage", label: "Garage", href: "/customer/garage" },
        { icon: "shopping_bag", label: "Market", href: "/customer/shop" },
        { icon: "person", label: "Profile", href: "/customer/dashboard" },
      ]} />
    </div>
  );
}
