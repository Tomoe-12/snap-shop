export const getBaseUrl = ()=>{
    if(typeof window !== "undefined") return ''
    if(process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return `http://localhost:3000`
}
//  the vercel will generate vercel url 