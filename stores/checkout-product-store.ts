import { create } from "zustand";

interface CheckoutProduct {
  name: string;
  id: string;
  variant: string;
  image: string;
  userId: string;
}

interface CheckoutProductStore {
  product: CheckoutProduct | null;
  setProduct: (product: CheckoutProduct) => void;
}

export const useCheckoutProductStore = create<CheckoutProductStore>((set) => ({
  product: null,
  setProduct: (product: CheckoutProduct) => set({ product }),
}));
