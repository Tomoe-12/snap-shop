import { loadStripe, Stripe } from "@stripe/stripe-js"

let stripePromise : Promise<Stripe | null>
const stripeInit = () => {
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!)
    }
    return stripePromise
}

export default stripeInit;