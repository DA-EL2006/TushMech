"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import VendorSideNav from "../../components/VendorSideNav";
import { useSession } from "next-auth/react";
import BottomNavBar from "../../components/BottomNavBar";

export default function VendorInventory() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", type: "OEM", category: "Engine", compat: "", stock: ""
  });

  const fetchProducts = async () => {
    if (!session?.user) return;
    try {
      const res = await fetch(`/api/products?vendorId=${(session.user as any).id}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [session]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          compat: newProduct.compat.split(",").map(s => s.trim())
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setNewProduct({ name: "", price: "", type: "OEM", category: "Engine", compat: "", stock: "" });
        fetchProducts(); // Refresh list
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <VendorSideNav activeItem="Inventory" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center px-4 h-16 w-full z-50 bg-[var(--surface-bright)] border-b border-[var(--outline-variant)]">
          <div className="flex items-center gap-2">
            <Image src="/images/tushmech_logo.jpg" alt="Logo" width={24} height={24} className="rounded object-cover" />
            <h1 className="text-xl font-semibold text-[var(--primary)]">TushMech</h1>
          </div>
          <Image src="/images/vendor_manager.jpg" alt="Profile" width={32} height={32} className="rounded-full object-cover" />
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--on-surface)] tracking-tight">Vendor Inventory</h2>
              <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage and track spare parts across all active vendors.</p>
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 h-10 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-md text-sm font-semibold shadow-sm hover:bg-[var(--secondary)]/90 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span> Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Total Parts Sold</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">12,482</div>
              <div className="text-xs font-semibold text-[var(--verification-green)] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% from last month
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Revenue in Escrow</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">$142.5K</div>
              <div className="text-xs font-semibold text-[var(--on-surface-variant)] mt-2">Pending clearance</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-level-1 border border-[var(--outline-variant)]/30 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[var(--on-surface-variant)]">Active Orders</span>
                <div className="w-8 h-8 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">843</div>
              <div className="text-xs font-semibold text-[var(--warning-orange)] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span> 24 require attention
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-level-1 border border-[var(--outline-variant)]/30 overflow-hidden">
            <div className="p-4 border-b border-[var(--outline-variant)]/30 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[var(--on-surface)]">Current Stock</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] text-[18px]">search</span>
                <input className="pl-9 pr-4 py-2 rounded-md border border-[var(--outline-variant)]/50 bg-white text-sm focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none w-64 shadow-sm" placeholder="Search inventory..." type="text" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--outline-variant)]/30 bg-[var(--surface-container-low)]/50">
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Part Name</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Type</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Compatibility</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold text-right">Price</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold">Stock Level</th>
                    <th className="p-4 text-xs uppercase tracking-wider text-[var(--on-surface-variant)] font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[var(--outline-variant)]/30">
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
                  ) : products.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-8 text-[var(--on-surface-variant)]">No products listed. Add one to start selling.</td></tr>
                  ) : products.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--surface-container-low)]/30 transition-colors group cursor-pointer">
                      <td className="p-4 font-semibold text-[var(--on-surface)]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-[var(--surface-container-low)] overflow-hidden relative">
                            <Image src={p.image_url || "/images/tire_inflator.jpg"} alt={p.name} fill className="object-cover" />
                          </div>
                          {p.name}
                        </div>
                      </td>
                      <td className="p-4 text-[var(--on-surface-variant)]">{p.type}</td>
                      <td className="p-4 text-[var(--on-surface-variant)]">{p.compat.join(", ")}</td>
                      <td className="p-4 text-right font-semibold text-[var(--on-surface)]">₦{p.price.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[var(--on-surface-variant)] font-bold">{p.stock}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${p.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {p.stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-24 md:hidden" />
        </div>
      </main>

      {/* Mobile Nav */}
      <BottomNavBar activeTab="Inventory" items={[
  { icon: "grid_view", label: "Overview", href: "/vendor/overview" },
  { icon: "inventory_2", label: "Inventory", href: "/vendor/inventory" },
  { icon: "receipt_long", label: "Orders", href: "/vendor/orders" },
  { icon: "account_balance", label: "Payouts", href: "/vendor/payouts" },
  { icon: "fact_check", label: "QA Reports", href: "/vendor/qa-reports" },
]} />
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleAddProduct} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-[var(--outline-variant)]/50 flex justify-between items-center bg-[var(--surface-container-lowest)]">
              <h3 className="text-lg font-bold text-[var(--primary)]">Log New Product</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center hover:bg-[var(--outline-variant)] text-[var(--on-surface-variant)]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Product Name</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none text-sm bg-[var(--surface)]" placeholder="e.g. Bosch Spark Plugs" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Price (₦)</label>
                  <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none text-sm bg-[var(--surface)]" placeholder="15000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Stock Level</label>
                  <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none text-sm bg-[var(--surface)]" placeholder="50" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Type</label>
                  <select value={newProduct.type} onChange={e => setNewProduct({...newProduct, type: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] outline-none text-sm bg-[var(--surface)]">
                    <option value="OEM">OEM</option>
                    <option value="Aftermarket">Aftermarket</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] outline-none text-sm bg-[var(--surface)]">
                    <option value="Brakes">Brakes</option>
                    <option value="Engine">Engine</option>
                    <option value="Filters">Filters</option>
                    <option value="Sensors">Sensors</option>
                    <option value="Fluids">Fluids</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[var(--on-surface-variant)] mb-1">Compatibility (comma-separated)</label>
                <input required type="text" value={newProduct.compat} onChange={e => setNewProduct({...newProduct, compat: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-[var(--outline-variant)] focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] outline-none text-sm bg-[var(--surface)]" placeholder="2016 Camry, Universal" />
              </div>
            </div>
            
            <div className="p-5 border-t border-[var(--outline-variant)]/50 bg-[var(--surface-container-low)]">
              <button type="submit" className="w-full h-12 bg-[var(--deep-navy)] text-white rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-[0.98]">
                <span className="material-symbols-outlined text-[20px]">inventory</span> Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
