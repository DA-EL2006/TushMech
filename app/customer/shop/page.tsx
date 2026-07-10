"use client";
import Image from "next/image";
import TopAppBar from "../../components/TopAppBar";
import BottomNavBar from "../../components/BottomNavBar";

const products = [
  { img: "/images/obd2_scanner.jpg", name: "ProDiag X1 - Advanced OBD2 Scanner", price: "₦ 45,000", rating: "4.9", reviews: "128", badge: "NEW" },
  { img: "/images/tire_inflator.jpg", name: "AirPump Pro - Smart Tire Inflator", price: "₦ 32,500", rating: "4.7", reviews: "84" },
  { img: "/images/led_interior.jpg", name: "Aura Ambient Interior LED Kit", price: "₦ 15,000", oldPrice: "₦ 18,000", rating: "4.5", reviews: "210" },
  { img: "/images/charger_mount.jpg", name: "MagCharge Auto - Vent Mount Charger", price: "₦ 22,000", rating: "4.8", reviews: "312" },
];

export default function GadgetShop() {
  return (
    <div className="min-h-screen bg-[var(--background)] antialiased pb-20">
      <header className="sticky top-0 w-full z-40 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)] flex justify-between items-center px-4 md:px-10 h-[72px]">
        <h1 className="text-2xl font-semibold text-[var(--primary)] tracking-tight">TushMech</h1>
        <nav className="hidden md:flex items-center gap-6">
          {["Home","Garage","Market","Profile"].map(l=>(
            <a key={l} className={`text-sm font-semibold ${l==="Market"?"text-[var(--secondary)]":"text-[var(--on-surface-variant)] hover:text-[var(--secondary)]"} transition-colors`} href="#">{l}</a>
          ))}
        </nav>
        <button className="relative w-12 h-12 flex items-center justify-center hover:bg-[var(--surface-container-low)] rounded-full transition-colors">
          <span className="material-symbols-outlined text-[var(--primary)]">shopping_cart</span>
          <span className="absolute top-2 right-2 bg-[var(--secondary)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[var(--surface-bright)]">3</span>
        </button>
      </header>
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <section className="mb-6">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--outline)]">search</span>
            <input className="w-full h-12 pl-12 pr-4 rounded-lg border border-[var(--outline-variant)] bg-white text-base placeholder:text-[var(--outline)]" placeholder="Search gadgets, scanners, tools..." />
          </div>
        </section>
        <section className="mb-8 rounded-xl overflow-hidden shadow-sm relative group cursor-pointer border border-[var(--outline-variant)] h-[300px] md:h-[400px]">
          <Image src="/images/dashcam_hero.jpg" alt="Dashcam" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-2 py-1 bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)] text-xs font-semibold rounded mb-2">FEATURED</span>
              <h2 className="text-xl md:text-3xl font-semibold text-white mb-1">Ultra-HD AI Dashcam Pro</h2>
              <p className="text-base text-gray-200 max-w-md line-clamp-2">360° recording, AI incident detection, and cloud sync.</p>
            </div>
            <button className="h-12 px-6 bg-[var(--secondary)] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[var(--secondary-container)] transition-colors active:scale-95 flex items-center gap-1 whitespace-nowrap">
              Shop Now <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-[var(--primary)] mb-4">Categories</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1 snap-x">
            {["All Gear","Diagnostics","Security","Maintenance","Interior"].map((c,i)=>(
              <button key={c} className={`flex-shrink-0 snap-start ${i===0?"bg-[var(--primary)] text-white":"bg-white text-[var(--on-surface)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]"} border px-6 h-12 rounded-full text-sm font-semibold flex items-center gap-1 shadow-sm`}>{c}</button>
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-semibold text-[var(--primary)]">Trending Gadgets</h3>
            <a className="text-sm font-semibold text-[var(--secondary)] hover:underline" href="#">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(p=>(
              <article key={p.name} className="bg-white rounded-xl border border-[var(--outline-variant)] flex flex-col overflow-hidden hover:shadow-level-2 transition-shadow group">
                <div className="relative aspect-square bg-[var(--surface-container-low)] w-full overflow-hidden p-4">
                  <Image src={p.img} alt={p.name} fill className="object-contain group-hover:scale-105 transition-transform duration-300 p-4" />
                  {p.badge && <span className="absolute top-2 left-2 px-2 py-1 bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)] rounded text-[10px] font-semibold">{p.badge}</span>}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-1"><span className="material-symbols-outlined fill text-[14px] text-[var(--error)]">star</span><span className="text-xs text-[var(--on-surface-variant)]">{p.rating} ({p.reviews})</span></div>
                  <h4 className="text-sm font-semibold text-[var(--primary)] mb-1 line-clamp-2">{p.name}</h4>
                  <div className="mt-auto pt-2">
                    {p.oldPrice && <span className="text-xs text-[var(--outline)] line-through block">{p.oldPrice}</span>}
                    <span className={`text-xl font-semibold ${p.oldPrice?"text-[var(--error)]":"text-[var(--primary)]"}`}>{p.price}</span>
                  </div>
                  <button className="mt-3 w-full h-12 border border-[var(--primary)] text-[var(--primary)] text-sm font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center justify-center gap-2 active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <BottomNavBar activeTab="Market" />
    </div>
  );
}
