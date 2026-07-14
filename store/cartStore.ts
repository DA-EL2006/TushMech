import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  includeMechanicInstall: boolean;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleMechanicInstall: (val: boolean) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      includeMechanicInstall: false,
      
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
        }
        return { cart: [...state.cart, { ...item, qty: 1 }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(i => i.id !== id)
      })),

      updateQuantity: (id, qty) => set((state) => ({
        cart: state.cart.map(i => i.id === id ? { ...i, qty } : i)
      })),

      toggleMechanicInstall: (val) => set({ includeMechanicInstall: val }),

      clearCart: () => set({ cart: [], includeMechanicInstall: false }),

      getCartTotal: () => get().cart.reduce((total, item) => total + (item.price * item.qty), 0),
      
      getCartCount: () => get().cart.reduce((count, item) => count + item.qty, 0),
    }),
    {
      name: 'tushmech_cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
