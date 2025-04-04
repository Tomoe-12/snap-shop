'use client';

import React from 'react'
import CartDrawer from './cart-drawer'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart-store';

const CartBtn = () => {
    const cartLength = useCartStore((state) => state.cart.length);

  return (
    <CartDrawer >
    <div className="relative">
      <ShoppingCart size={30} strokeWidth="2" />
      <span className="absolute -top-2 -right-3 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center">
        {cartLength}
      </span>
    </div>
  </CartDrawer>
  )
}

export default CartBtn