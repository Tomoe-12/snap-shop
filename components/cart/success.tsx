import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { PartyPopper } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { stat } from 'fs'

const Success = () => {

    const setCartPosition = useCartStore((state)=>state.setCartPosition)
    const cartPosition = useCartStore((state)=>state.cartPosition)
    const cart = useCartStore((state)=>state.cart)

    useEffect(()=>{
        setTimeout(()=>{
            setCartPosition('Order')
        },3000)

        if(cart.length === 0 ){
            setCartPosition('Order')
        }

    },[])
  return (
    <main className='max-w-4xl mx-auto my-10 text-center'>
        <PartyPopper size={60} className='mx-auto animate-bounce '/>
        <h2 className='text-4xl font-bold my-4'>Your payment was successful</h2>
        <p className='text-sm font-medium text-muted-foreground mb-4'>Thanks for your purchase</p>
        <Button className='mx-auto'>View orders</Button>
    </main>
  )
}

export default Success