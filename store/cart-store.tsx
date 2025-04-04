import { create } from "zustand";

export type Variant = {
  variantId: number;
  quantity: number;
};
export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  variant: Variant;
};

export type CartType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartType>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cItem) => cItem.variant.variantId === item.variant.variantId
      );
      if (existingItem) {
        const updatedCart = state.cart.map((cItem)=>{
            if(cItem.variant.variantId === item.variant.variantId){
                return {
                    ...cItem,
                    variant:{
                        ...cItem.variant,
                        quantity: cItem.variant.quantity + item.variant.quantity
                    }
                }
            }
            return cItem
        })
        return { cart : updatedCart}
      } else {
        return {
          cart: [
            ...state.cart,
            {
              ...item,
              variant: {
                variantId: item.variant.variantId,
                quantity: item.variant.quantity,
              },
            },
          ],
        };
      }
    }),
}));
