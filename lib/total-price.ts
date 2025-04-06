import { CartItem } from "@/store/cart-store";

export const totalPriceCale = (cart: CartItem[]):number => {
  return cart.reduce((tot, item) => {
    const price = Number(item.price);
    const total = price * item.variant.quantity;
    return total + tot;
  }, 0);
};
