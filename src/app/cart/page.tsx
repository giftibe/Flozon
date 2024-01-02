import { getCart } from "@/lib/db/carts"

export const metadata = {
    title: 'Your cart - Flozon'
}


export default async function CartPage() {
    const cart = await getCart()

    return (
        <div>
            <h1 className="mb-3 text-3xl font-bold">Shopping Cart</h1>
            {
                cart?.items.map(cartItem)=>{

            }
            }
        </div>
    )
}
